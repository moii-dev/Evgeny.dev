import React from 'react';
import { ArrowUpRight, RefreshCw, Sparkles } from 'lucide-react';
import { Project } from '../types/project';
import { ProjectCard } from './ProjectCard';
import { FEATURED_PROJECTS } from '../data/featuredProjects';

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
  // Always prioritize the 4 top curated featured projects: FreeChat, WorldBox-React, Figmint, Luma
  const featuredIds = ['freechat', 'worldbox-react', 'figmint', 'luma'];
  
  const displayedProjects: Project[] = featuredIds.map((id) => {
    return projects.find((p) => p.id === id) || FEATURED_PROJECTS.find((p) => p.id === id)!;
  }).filter(Boolean);

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
            A curated showcase of verified production mobile applications, interactive simulation systems, and vector design tools from GitHub.
          </p>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-neutral-200/60 rounded-full text-xs font-mono text-neutral-700">
            <Sparkles size={13} className="text-neutral-900" />
            <span>4 Selected Works</span>
          </div>

          <button
            onClick={onRefreshGitHub}
            disabled={isLoading}
            title={fromCache ? 'Data loaded from cache. Click to sync with GitHub API.' : 'Sync with GitHub'}
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

      {/* 2-Column Grid with 4 Curated Project Cards */}
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
