import React, { useState } from 'react';
import { ArrowUpRight, RefreshCw, CheckCircle2, FileQuestion } from 'lucide-react';
import { Project } from '../types/project';
import { ProjectCard } from './ProjectCard';
import { FEATURED_PROJECTS, DRAFT_REQUESTED_PROJECTS } from '../data/featuredProjects';

interface Props {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenAllProjects: () => void;
  onRefreshGitHub: () => void;
  isLoading: boolean;
  fromCache?: boolean;
}

export const ProjectsSection: React.FC<Props> = ({
  projects,
  onSelectProject,
  onOpenAllProjects,
  onRefreshGitHub,
  isLoading,
  fromCache,
}) => {
  const [viewMode, setViewMode] = useState<'verified' | 'draft'>('verified');

  // Mode 1 (Default): 4 verified, production-ready repos from GitHub (FreeChat, Luma, QR-Scanner, Figmint)
  // Mode 2: User's requested draft list (FreeChat, EverUs, Runa, Где мой носок?)
  const verifiedProjects = projects.filter((p) => p.featured).slice(0, 4);

  const draftProjects: Project[] = [
    projects.find((p) => p.id === 'freechat') || FEATURED_PROJECTS[0],
    DRAFT_REQUESTED_PROJECTS.find((p) => p.id === 'everus') || DRAFT_REQUESTED_PROJECTS[0],
    DRAFT_REQUESTED_PROJECTS.find((p) => p.id === 'runa') || DRAFT_REQUESTED_PROJECTS[1],
    DRAFT_REQUESTED_PROJECTS.find((p) => p.id === 'gde-moy-nosok') || DRAFT_REQUESTED_PROJECTS[2],
  ];

  const displayedProjects = viewMode === 'verified' ? verifiedProjects : draftProjects;

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
        <div>
          {/* Section Kicker */}
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-neutral-400 uppercase font-mono block mb-3">
            01 / SELECTED WORK
          </span>

          {/* Heading */}
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight font-normal text-neutral-950 mb-4">
            <span>Selected</span>
            <br />
            <span className="text-[#9ca3af]">Projects.</span>
          </h2>

          {/* Subtitle */}
          <p className="text-neutral-600 text-sm sm:text-base max-w-lg leading-relaxed font-normal">
            A curated collection of mobile applications, developer tools and digital experiences from GitHub.
          </p>
        </div>

        {/* Right Controls: Collection Switcher + All projects */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Segmented Switcher */}
          <div className="flex items-center gap-1 p-1 bg-neutral-200/60 rounded-full text-xs font-mono">
            <button
              onClick={() => setViewMode('verified')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 ${
                viewMode === 'verified'
                  ? 'bg-white text-neutral-950 shadow-xs font-medium'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              <CheckCircle2 size={12} className={viewMode === 'verified' ? 'text-emerald-600' : 'text-neutral-400'} />
              <span>Репозитории GitHub (4)</span>
            </button>

            <button
              onClick={() => setViewMode('draft')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 ${
                viewMode === 'draft'
                  ? 'bg-white text-neutral-950 shadow-xs font-medium'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              <FileQuestion size={12} className={viewMode === 'draft' ? 'text-amber-600' : 'text-neutral-400'} />
              <span>Запрошенный драфт</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onRefreshGitHub}
              disabled={isLoading}
              title={fromCache ? 'Data loaded from local cache. Click to sync with GitHub API.' : 'Sync with GitHub'}
              className="p-2.5 rounded-full border border-neutral-300 hover:border-black hover:bg-neutral-100 text-neutral-600 hover:text-black transition-colors"
              aria-label="Refresh GitHub projects"
            >
              <RefreshCw size={15} className={isLoading ? 'animate-spin' : ''} />
            </button>

            <button
              onClick={onOpenAllProjects}
              className="px-5 py-2.5 rounded-full border border-neutral-300 hover:border-black hover:bg-neutral-900 hover:text-white text-neutral-900 text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 group shadow-2xs"
            >
              <span>All projects</span>
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2-Column Grid with 4 Project Cards */}
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
