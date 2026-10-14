import React from 'react';
import { ArrowUpRight, RefreshCw } from 'lucide-react';
import { Project } from '../types/project';
import { ProjectCard } from './ProjectCard';

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
  // Only display the 4 featured projects on the main page grid, matching the screenshot
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
        <div>
          {/* Section Kicker matching Reference */}
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
            A collection of applications, experiments and digital experiences I've brought to life.
          </p>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
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

      {/* 2-Column Grid matching Reference Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {featured.map((project) => (
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
