import { t, formatDate, statLabel } from '../i18n';
import React from 'react';
import { X, ExternalLink, Star, GitFork, Calendar, Code2, Upload, RotateCcw } from 'lucide-react';
import { Project } from '../types/project';
import { ProjectCover } from './ProjectCover';
import { Modal } from './Modal';
import { useImageUpload } from '../hooks/useImageUpload';
import { repositoryIdentity } from '../services/githubService';

interface Props {
  project: Project | null;
  onClose: () => void;
  customScreenshot: string | null;
  onChangeCover: (value: string | null) => void;
}

export const ProjectModal: React.FC<Props> = ({ project, onClose, customScreenshot, onChangeCover }) => {
  const upload = useImageUpload(onChangeCover);

  if (!project) return null;
  const isRepository = Boolean(repositoryIdentity(project.githubUrl));

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (file) void upload.file(file);
  };

  const handleResetScreenshot = () => {
    upload.cancel();
    onChangeCover(null);
  };

  return (
    <Modal isOpen={Boolean(project)} onClose={onClose} label={t('{title} details', { title: project.title })}>
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90dvh] bg-[#fbfbfb] rounded-[28px] sm:rounded-[36px] shadow-2xl border border-neutral-200 overflow-y-auto overscroll-contain p-5 sm:p-8 flex flex-col justify-between">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-neutral-200 border border-neutral-200 flex items-center justify-center text-neutral-800 transition-colors shadow-xs"
          aria-label={t("Close modal")}
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
                <span>{t("Upload screenshot")}</span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
                  onChange={handleFileUpload}
                  className="sr-only"
                />
              </label>
              {customScreenshot && (
                <button
                  onClick={handleResetScreenshot}
                  title={t("Reset to original")}
                  aria-label={t("Reset project cover")}
                  className="ml-1 text-neutral-400 hover:text-red-600 transition-colors"
                >
                  <RotateCcw size={11} />
                </button>
              )}
            </div>
          </div>
          <p role="status" className="mb-3 text-xs text-neutral-600">{t(upload.busy ? 'Processing image…' : upload.error)}</p>

          {/* Meta & Title */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-1.5">
              <span>{project.number}</span>
              <span>/</span>
              <span>{t(project.category)}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif text-neutral-950 tracking-tight font-normal">
              {project.title}
            </h2>
          </div>

          {/* Description */}
          <div className="prose text-neutral-700 text-sm sm:text-base leading-relaxed mb-6 font-normal">
            <p>{t(project.longDescription || project.description)}</p>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block mb-2 font-mono">{t("Technologies & Architecture")}</span>
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
              <span>{t(project.language || 'Multi-tech')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={15} className="text-amber-500" />
              <span>{project.stars ?? 0}{" "}{statLabel('stars', project.stars ?? 0)}</span>
            </div>
            <div className="flex items-center gap-2">
              <GitFork size={15} className="text-neutral-500" />
              <span>{project.forks ?? 0}{" "}{statLabel('forks', project.forks ?? 0)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={15} className="text-neutral-500" />
              <span>{project.updatedAt ? formatDate(project.updatedAt) : t('Recent')}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-neutral-200/80 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-neutral-500">
            {t(isRepository ? 'Source repository on GitHub' : 'Developer profile on GitHub')}
          </div>

          <div className="flex items-center gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-900 text-xs sm:text-sm font-medium transition-colors flex items-center gap-2"
              >
                <span>{t("Live Demo")}</span>
                <ExternalLink size={14} />
              </a>
            )}

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-2.5 rounded-full bg-neutral-950 hover:bg-black text-white text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
            >
              <span>{t("Open in GitHub")}</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
    </Modal>
  );
};
