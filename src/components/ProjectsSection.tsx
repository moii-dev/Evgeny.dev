import { t } from '../i18n';
import React from 'react';
import { ArrowUpRight, RefreshCw, Sparkles } from 'lucide-react';
import { Project } from '../types/project';
import { ProjectCard } from './ProjectCard';
import { FEATURED_PROJECTS } from '../data/featuredProjects';
import { repositoryIdentity } from '../services/githubService';

interface Props {
  githubNotice: string;
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenAllProjects: () => void;
  onRefreshGitHub: () => void;
  isLoading: boolean;
  fromCache?: boolean;
}

export const ProjectsSection: React.FC<Props> = ({
  githubNotice,
  projects,
  onSelectProject,
  onOpenAllProjects,
  onRefreshGitHub,
  isLoading,
  fromCache,
}) => {
  const displayedProjects = FEATURED_PROJECTS.map((curated) => {
    const synced = projects.find((project) => repositoryIdentity(project.githubUrl) === repositoryIdentity(curated.githubUrl));
    return { ...curated, stars: synced?.stars ?? curated.stars, forks: synced?.forks ?? curated.forks,
      updatedAt: synced?.updatedAt ?? curated.updatedAt, demoUrl: synced?.demoUrl ?? curated.demoUrl };
  });

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
        <div>
          {/* Section Kicker */}
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-neutral-400 uppercase font-mono block mb-3">{t("01 / SELECTED WORK")}</span>

          {/* Heading */}
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight font-normal text-neutral-950 mb-4">
            <span>{t("Selected")}</span>
            <br />
            <span className="text-[#9ca3af]">{t("Projects.")}</span>
          </h2>

          {/* Subtitle */}
          <p className="text-neutral-600 text-sm sm:text-base max-w-lg leading-relaxed font-normal">{t("A curated showcase of an Android AI assistant, a browser animation studio, a search extension, and a world simulation sandbox.")}</p>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-neutral-200/60 rounded-full text-xs font-mono text-neutral-700">
            <Sparkles size={13} className="text-neutral-900" />
            <span>{t("4 Selected Works")}</span>
          </div>

          <button
            onClick={onRefreshGitHub}
            disabled={isLoading}
            title={t(fromCache ? 'Data loaded from cache. Click to sync with GitHub API.' : 'Sync with GitHub')}
            className="p-2.5 rounded-full border border-neutral-300 hover:border-black hover:bg-neutral-100 text-neutral-600 hover:text-black transition-colors"
            aria-label={t("Refresh GitHub projects")}
          >
            <RefreshCw size={15} className={isLoading ? 'animate-spin' : ''} />
          </button>

          <button
            onClick={onOpenAllProjects}
            className="px-5 py-2.5 rounded-full border border-neutral-300 hover:border-black hover:bg-neutral-900 hover:text-white text-neutral-900 text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 group shadow-2xs"
          >
            <span>{t("All projects")}</span>
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* 2-Column Grid with 4 Curated Project Cards */}
      <p role="status" className="mb-5 max-w-3xl text-xs text-neutral-500">{githubNotice}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {displayedProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelect={onSelectProject}
          />
        ))}
      </div>
    </section>
  );
};
