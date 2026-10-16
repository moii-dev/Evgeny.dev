import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types/project';
import { ProjectCover } from './ProjectCover';

interface Props {
  customScreenshotUrl?: string;
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<Props> = ({ project, onSelect, customScreenshotUrl }) => {
  return (
    <div
      data-cursor="view"
      onClick={() => onSelect(project)}
      className="group relative bg-[#f6f6f6] rounded-[28px] sm:rounded-[32px] p-3 sm:p-4 border border-neutral-200/80 hover:border-neutral-300 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-xl"
    >
      {/* Top Preview Canvas with Minimal Product Showcase */}
      <div className="relative w-full overflow-hidden rounded-[20px] sm:rounded-[24px] border border-neutral-200/70 bg-[#eceef1] transition-all duration-500 ease-out">
        <ProjectCover project={project} size="card" customScreenshotUrl={customScreenshotUrl} />
      </div>

      {/* Bottom Content Area matching Reference */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Project Number */}
          <span className="text-xs font-semibold text-neutral-400 font-mono tracking-wider block mb-1">
            {project.number}
          </span>

          {/* Title & Arrow Button Row */}
          <div className="flex items-start justify-between gap-4 mb-1.5">
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight group-hover:text-black transition-colors font-sans">
              {project.title}
            </h3>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(project);
              }}
              className="w-10 h-10 rounded-xl bg-white border border-neutral-200/80 flex items-center justify-center text-neutral-800 group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300 shrink-0 shadow-xs"
              aria-label={`View ${project.title} details`}
            >
              <ArrowUpRight size={18} strokeWidth={2.2} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Category */}
          <div className="text-xs sm:text-sm font-medium text-neutral-500 mb-3">
            {project.category}
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-2 mb-5 font-normal">
            {project.description}
          </p>
        </div>

        {/* Tech Tags */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-neutral-200/60">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[11px] font-medium bg-neutral-200/70 text-neutral-700 rounded-full select-none transition-colors group-hover:bg-neutral-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
