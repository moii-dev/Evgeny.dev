import { t, useLocale, formatDate } from './i18n';
import { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TechMarquee } from './components/TechMarquee';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { StackSection } from './components/StackSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ALL_LOCAL_PROJECTS } from './data/featuredProjects';
import { TECH_STACK } from './data/techStack';
import { fetchGitHubRepos, type GitHubResult } from './services/githubService';
import { Project } from './types/project';
import { scrollToSection } from './utils/scrollController';
import { readPortrait, savePortrait } from './utils/portrait';
import { useProjectCovers } from './hooks/useProjectCovers';
import { FeatureBoundary } from './components/FeatureBoundary';
import { CustomCursor } from './components/CustomCursor';

const ProjectModal = lazy(() => import('./components/ProjectModal').then(module => ({ default: module.ProjectModal })));
const AllProjectsModal = lazy(() => import('./components/AllProjectsModal').then(module => ({ default: module.AllProjectsModal })));
const PhotoChangeModal = lazy(() => import('./components/PhotoChangeModal').then(module => ({ default: module.PhotoChangeModal })));
const ScrollNavigationHUD = lazy(() => import('./components/scroll-navigation/ScrollNavigationHUD').then(module => ({ default: module.ScrollNavigationHUD })));

// Personal portrait bundled with the site.
const DEFAULT_PORTRAIT_URL = `${import.meta.env.BASE_URL}assets/my-photo.webp`;
const GITHUB_AVATAR_URL = 'https://avatars.githubusercontent.com/u/140349762?v=4';
const DEFAULT_EMAIL = 'hnansaed71@gmail.com';

export default function App() {
  useLocale();
  const [projects, setProjects] = useState<Project[]>(ALL_LOCAL_PROJECTS);
  const [isLoading, setIsLoading] = useState(false);
  const [githubStatus, setGitHubStatus] = useState<GitHubResult | null>(null);
  const githubRequest = useRef<AbortController | null>(null);
  const fromCache = githubStatus?.source !== 'live';
  const githubNotice = isLoading ? t('Syncing with GitHub…') : githubStatus
    ? [t(githubStatus.error), t(githubStatus.warning), t('Showing {source}.', { source: t(githubStatus.source === 'local' ? 'local projects' : githubStatus.source === 'cache' ? 'saved projects' : 'GitHub projects') }), githubStatus.lastUpdated ? t('Last synced {date}.', { date: formatDate(githubStatus.lastUpdated, true) }) : ''].filter(Boolean).join(' ')
    : t('Showing local projects.');

  // Modals state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [allProjectsOpen, setAllProjectsOpen] = useState(false);
  const [catalogMounted, setCatalogMounted] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);

  // Photo customization state with localStorage persistence
  const [portrait, setPortrait] = useState(() => readPortrait(DEFAULT_PORTRAIT_URL));
  const [storageWarning, setStorageWarning] = useState('');
  const { url: photoUrl, monochrome: isMonochrome } = portrait;
  const { covers, saveCover } = useProjectCovers(projects, saved => setStorageWarning(saved ? '' : 'Cover applied for this visit. Browser storage is unavailable or full; changes will not survive a reload.'));

  const loadGitHub = useCallback(async (force: boolean) => {
    githubRequest.current?.abort();
    const controller = new AbortController();
    githubRequest.current = controller;
    setIsLoading(true);
    const res = await fetchGitHubRepos('moii-dev', force, { signal: controller.signal });
    if (controller.signal.aborted) return;
    setProjects(res.repos);
    setGitHubStatus(res);
    setIsLoading(false);
  }, []);
  useEffect(() => {
    void loadGitHub(false);
    return () => githubRequest.current?.abort();
  }, [loadGitHub]);
  const handleRefreshGitHub = () => { void loadGitHub(true); };

  const handleSavePhoto = (newUrl: string, monochrome: boolean) => {
    const next = { url: newUrl, monochrome };
    setPortrait(next);
    setStorageWarning(savePortrait(next) ? '' : 'Photo applied for this visit. Browser storage is unavailable or full; changes will not survive a reload.');
  };

  const handleResetPhoto = () => {
    handleSavePhoto(DEFAULT_PORTRAIT_URL, true);
  };

  const handleScrollTo = (id: string) => {
    scrollToSection(id);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#111111] font-sans subtle-grain">
      <FeatureBoundary label={t("Custom cursor")}><CustomCursor /></FeatureBoundary>
      <FeatureBoundary label={t("Section animation")}><Suspense fallback={null}><ScrollNavigationHUD /></Suspense></FeatureBoundary>

      {/* Header */}
      <Header onOpenContact={() => handleScrollTo('contact')} />
      {storageWarning && <p role="status" className="fixed bottom-4 left-4 right-4 z-[80] max-w-lg rounded-xl border border-neutral-300 bg-white p-3 text-xs shadow-lg">{t(storageWarning)}<button className="ml-3 underline" onClick={() => setStorageWarning('')}>{t("Dismiss")}</button></p>}

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero
          defaultPhoto={DEFAULT_PORTRAIT_URL}
          photoUrl={photoUrl}
          isMonochrome={isMonochrome}
          onOpenPhotoChange={() => setPhotoModalOpen(true)}
          onOpenProjects={() => scrollToSection('projects')}
          onOpenAbout={() => scrollToSection('about')}
          projectCount={projects.length}
          techCount={TECH_STACK.length}
        />

        {/* Tech Marquee Strip */}
        <TechMarquee />

        {/* 01 / SELECTED WORK - Featured Projects */}
        <ProjectsSection
          githubNotice={githubNotice}
          covers={covers}
          projects={projects}
          onSelectProject={(project) => setSelectedProject(project)}
          onOpenAllProjects={() => { setCatalogMounted(true); setAllProjectsOpen(true); }}
          onRefreshGitHub={handleRefreshGitHub}
          isLoading={isLoading}
          fromCache={fromCache}
        />

        {/* 02 / ABOUT ME - Narrative & Principles */}
        <AboutSection />

        {/* 03 / EXPERTISE - Interactive Stack Grid */}
        <StackSection />

        {/* 04 / CONTACT - CTA & Direct Contact */}
        <ContactSection email={DEFAULT_EMAIL} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Project Detail Modal */}
      {selectedProject && <FeatureBoundary label={t("Project details")} onDismiss={() => setSelectedProject(null)}><Suspense fallback={<span className="sr-only" role="status">{t("Loading dialog…")}</span>}><ProjectModal
        key={selectedProject?.id || 'closed'}
        project={selectedProject}
        customScreenshot={selectedProject ? covers[selectedProject.id] || null : null}
        onChangeCover={value => { if (selectedProject) saveCover(selectedProject.id, value); }}
        onClose={() => setSelectedProject(null)}
      /></Suspense></FeatureBoundary>}

      {/* All Projects Modal */}
      {catalogMounted && <FeatureBoundary label={t("Project catalog")} onDismiss={() => { setCatalogMounted(false); setAllProjectsOpen(false); }}><Suspense fallback={<span className="sr-only" role="status">{t("Loading catalog…")}</span>}><AllProjectsModal
        githubNotice={githubNotice}
        isOpen={allProjectsOpen}
        onClose={() => setAllProjectsOpen(false)}
        projects={projects}
        onSelectProject={(project) => {
          setSelectedProject(project);
        }}
        onRefresh={handleRefreshGitHub}
        isLoading={isLoading}
      /></Suspense></FeatureBoundary>}

      {/* Photo Customization Modal */}
      {photoModalOpen && <FeatureBoundary label={t("Portrait editor")} onDismiss={() => setPhotoModalOpen(false)}><Suspense fallback={<span className="sr-only" role="status">{t("Loading editor…")}</span>}><PhotoChangeModal
        isOpen={photoModalOpen}
        onClose={() => setPhotoModalOpen(false)}
        currentPhoto={photoUrl}
        isMonochrome={isMonochrome}
        onSavePhoto={handleSavePhoto}
        onReset={handleResetPhoto}
        defaultPhoto={DEFAULT_PORTRAIT_URL}
        githubAvatar={GITHUB_AVATAR_URL}
      /></Suspense></FeatureBoundary>}
    </div>
  );
}
