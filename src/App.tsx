import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TechMarquee } from './components/TechMarquee';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { StackSection } from './components/StackSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { AllProjectsModal } from './components/AllProjectsModal';
import { PhotoChangeModal } from './components/PhotoChangeModal';
import { ALL_LOCAL_PROJECTS } from './data/featuredProjects';
import { TECH_STACK } from './data/techStack';
import { fetchGitHubRepos } from './services/githubService';
import { Project } from './types/project';
import { ScrollNavigationHUD } from './components/scroll-navigation/ScrollNavigationHUD';
import { scrollToSection } from './hooks/useScrollNavigation';

// Personal portrait bundled with the site.
const DEFAULT_PORTRAIT_URL = `${import.meta.env.BASE_URL}assets/my-photo.png`;
const GITHUB_AVATAR_URL = 'https://avatars.githubusercontent.com/u/140349762?v=4';
const DEFAULT_EMAIL = 'hnansaed71@gmail.com';

export default function App() {
  const [projects, setProjects] = useState<Project[]>(ALL_LOCAL_PROJECTS);
  const [isLoading, setIsLoading] = useState(false);
  const [fromCache, setFromCache] = useState(true);

  // Modals state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [allProjectsOpen, setAllProjectsOpen] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);

  // Photo customization state with localStorage persistence
  const [photoUrl, setPhotoUrl] = useState<string>(() => {
    return localStorage.getItem('evgeny_custom_avatar') || DEFAULT_PORTRAIT_URL;
  });
  const [isMonochrome, setIsMonochrome] = useState<boolean>(() => {
    const saved = localStorage.getItem('evgeny_custom_avatar_mono');
    return saved !== null ? saved === 'true' : true;
  });

  // Load GitHub repos on mount
  useEffect(() => {
    const loadRepos = async () => {
      setIsLoading(true);
      const res = await fetchGitHubRepos('moii-dev', false);
      if (res.repos && res.repos.length > 0) {
        setProjects(res.repos);
        setFromCache(res.fromCache);
      }
      setIsLoading(false);
    };

    loadRepos();
  }, []);

  const handleRefreshGitHub = async () => {
    setIsLoading(true);
    const res = await fetchGitHubRepos('moii-dev', true);
    if (res.repos && res.repos.length > 0) {
      setProjects(res.repos);
      setFromCache(false);
    }
    setIsLoading(false);
  };

  const handleSavePhoto = (newUrl: string, monochrome: boolean) => {
    setPhotoUrl(newUrl);
    setIsMonochrome(monochrome);
    localStorage.setItem('evgeny_custom_avatar', newUrl);
    localStorage.setItem('evgeny_custom_avatar_mono', monochrome.toString());
  };

  const handleResetPhoto = () => {
    setPhotoUrl(DEFAULT_PORTRAIT_URL);
    setIsMonochrome(true);
    localStorage.removeItem('evgeny_custom_avatar');
    localStorage.removeItem('evgeny_custom_avatar_mono');
  };

  const handleScrollTo = (id: string) => {
    scrollToSection(id);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#111111] font-sans subtle-grain">
      <ScrollNavigationHUD />

      {/* Header */}
      <Header onOpenContact={() => handleScrollTo('contact')} />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero
          photoUrl={photoUrl}
          isMonochrome={isMonochrome}
          onOpenPhotoChange={() => setPhotoModalOpen(true)}
          onOpenProjects={() => scrollToSection('projects')}
          onOpenAbout={() => scrollToSection('about')}
          onOpenContact={() => scrollToSection('contact')}
          projectCount={projects.length}
          techCount={TECH_STACK.length}
        />

        {/* Tech Marquee Strip */}
        <TechMarquee />

        {/* 01 / SELECTED WORK - Featured Projects */}
        <ProjectsSection
          projects={projects}
          onSelectProject={(project) => setSelectedProject(project)}
          onOpenAllProjects={() => setAllProjectsOpen(true)}
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
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* All Projects Modal */}
      <AllProjectsModal
        isOpen={allProjectsOpen}
        onClose={() => setAllProjectsOpen(false)}
        projects={projects}
        onSelectProject={(project) => {
          setSelectedProject(project);
        }}
        onRefresh={handleRefreshGitHub}
        isLoading={isLoading}
      />

      {/* Photo Customization Modal */}
      <PhotoChangeModal
        isOpen={photoModalOpen}
        onClose={() => setPhotoModalOpen(false)}
        currentPhoto={photoUrl}
        isMonochrome={isMonochrome}
        onSavePhoto={handleSavePhoto}
        onReset={handleResetPhoto}
        defaultPhoto={DEFAULT_PORTRAIT_URL}
        githubAvatar={GITHUB_AVATAR_URL}
      />
    </div>
  );
}
