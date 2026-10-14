import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Star, GitFork, Calendar, Code2, Upload, RotateCcw, Image as ImageIcon } from 'lucide-react';
import { Project } from '../types/project';
import { ProjectCover } from './ProjectCover';

interface Props {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<Props> = ({ project, onClose }) => {
  const [customScreenshot, setCustomScreenshot] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (project) {
      try {
        const saved = localStorage.getItem(`evgeny_project_cover_${project.id}`);
        setCustomScreenshot(saved || null);
      } catch {
        // ignore
      }
    }
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setCustomScreenshot(reader.result);
          try {
            localStorage.setItem(`evgeny_project_cover_${project.id}`, reader.result);
          } catch {
            // ignore
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetScreenshot = () => {
    setCustomScreenshot(null);
    try {
      localStorage.removeItem(`evgeny_project_cover_${project.id}`);
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#fbfbfb] rounded-[28px] sm:rounded-[36px] shadow-2xl border border-neutral-200 overflow-y-auto p-5 sm:p-8 flex flex-col justify-between">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-neutral-200 border border-neutral-200 flex items-center justify-center text-neutral-800 transition-colors shadow-xs"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div>
          {/* Cover Banner */}
          <div className="relative w-full rounded-[20px] sm:rounded-[24px] overflow-hidden border border-neutral-200/80 bg-[#edf0f3] mb-6 shadow-2xs">
            <ProjectCover
              project={project}
              size="modal"
              customScreenshotUrl={customScreenshot || undefined}
            />

            {/* In-app screenshot preview tester */}
            <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-xl border border-neutral-200/80 text-[11px] font-mono shadow-2xs">
              <label className="flex items-center gap-1 text-neutral-700 hover:text-black cursor-pointer font-medium">
                <Upload size={12} />
                <span>Загрузить скриншот</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              {customScreenshot && (
                <button
                  onClick={handleResetScreenshot}
                  title="Сбросить на оригинал"
                  className="ml-1 text-neutral-400 hover:text-red-600 transition-colors"
                >
                  <RotateCcw size={11} />
                </button>
              )}
            </div>
          </div>

          {/* Meta & Title */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-1.5">
              <span>{project.number}</span>
              <span>/</span>
              <span>{project.category}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif text-neutral-950 tracking-tight font-normal">
              {project.title}
            </h2>
          </div>

          {/* Description */}
          <div className="prose text-neutral-700 text-sm sm:text-base leading-relaxed mb-6 font-normal">
            <p>{project.longDescription || project.description}</p>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block mb-2 font-mono">
              Technologies & Architecture
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs bg-neutral-200/70 text-neutral-800 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* GitHub Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-neutral-100 rounded-2xl text-xs text-neutral-600 mb-6">
            <div className="flex items-center gap-2">
              <Code2 size={15} className="text-neutral-500" />
              <span>{project.language || 'Multi-tech'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={15} className="text-amber-500" />
              <span>{project.stars ?? 0} stars</span>
            </div>
            <div className="flex items-center gap-2">
              <GitFork size={15} className="text-neutral-500" />
              <span>{project.forks ?? 0} forks</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={15} className="text-neutral-500" />
              <span>{project.updatedAt || 'Recent'}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-neutral-200/80 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-neutral-500">
            Source repository on GitHub
          </div>

          <div className="flex items-center gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-900 text-xs sm:text-sm font-medium transition-colors flex items-center gap-2"
              >
                <span>Live Demo</span>
                <ExternalLink size={14} />
              </a>
            )}

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-2.5 rounded-full bg-neutral-950 hover:bg-black text-white text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
            >
              <span>Open in GitHub</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
