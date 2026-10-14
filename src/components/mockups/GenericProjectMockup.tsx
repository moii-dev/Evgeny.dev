import React from 'react';
import { Project } from '../../types/project';

interface Props {
  project: Project;
}

export const GenericProjectMockup: React.FC<Props> = ({ project }) => {
  return (
    <div className="relative w-full h-full min-h-[280px] sm:min-h-[320px] bg-gradient-to-b from-[#1e2025] via-[#141518] to-[#0c0d0f] rounded-[22px] overflow-hidden flex flex-col items-center justify-center p-6 select-none border border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.05),transparent_70%)] pointer-events-none" />

      {/* Editor / Terminal Card */}
      <div className="relative w-full max-w-[420px] bg-[#121317] rounded-2xl border border-white/10 p-5 shadow-2xl flex flex-col">
        {/* Title bar */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
            <span className="text-xs font-mono text-neutral-300 ml-2">{project.title}</span>
          </div>
          <span className="text-[10px] text-neutral-500 font-mono">github.com/moii-dev</span>
        </div>

        {/* Center Canvas / Code Area */}
        <div className="py-4 px-2 space-y-2">
          <div className="text-sm font-semibold text-white tracking-tight">{project.title}</div>
          <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">{project.description}</p>

          <div className="flex flex-wrap gap-1.5 pt-3">
            {project.tags.map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-neutral-300 border border-white/5">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400">
          <span>★ {project.stars ?? 0} stars</span>
          <span className="text-neutral-500">{project.language || 'Code'}</span>
        </div>
      </div>
    </div>
  );
};
