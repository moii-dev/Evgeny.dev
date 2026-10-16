import { t } from '../i18n';
import React, { useState } from 'react';
import { X, Search, ExternalLink, Star, ArrowUpRight, RefreshCw } from 'lucide-react';
import { Project } from '../types/project';
import { Modal } from './Modal';

interface Props {
  githubNotice: string;
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onRefresh: () => void;
  isLoading: boolean;
}

export const AllProjectsModal: React.FC<Props> = ({
  githubNotice,
  isOpen,
  onClose,
  projects,
  onSelectProject,
  onRefresh,
  isLoading,
}) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'mobile' | 'web' | 'tools'>('all');

  if (!isOpen) return null;

  const filtered = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      t(project.description).toLowerCase().includes(search.toLowerCase()) ||
      project.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    if (!matchesSearch) return false;

    if (filter === 'all') return true;
    if (filter === 'mobile') {
      return (
        project.category.toLowerCase().includes('android') ||
        project.tags.some((t) => ['kotlin', 'android', 'compose', 'java'].includes(t.toLowerCase()))
      );
    }
    if (filter === 'web') {
      return (
        project.category.toLowerCase().includes('web') ||
        project.tags.some((t) => ['react', 'typescript', 'canvas', 'javascript'].includes(t.toLowerCase()))
      );
    }
    if (filter === 'tools') {
      return (
        project.category.toLowerCase().includes('extension') ||
        project.category.toLowerCase().includes('tool') ||
        project.category.toLowerCase().includes('cli')
      );
    }
    return true;
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} label={t("All Projects & Repositories")}>
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl h-[88dvh] bg-[#fbfbfb] rounded-[28px] sm:rounded-[36px] shadow-2xl border border-neutral-200 overflow-y-auto overscroll-contain flex flex-col">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-neutral-200/80 bg-white flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider font-mono text-neutral-400">{t("moii-dev • GitHub Repositories")}</span>
              <h2 className="text-2xl sm:text-3xl font-serif text-neutral-950 font-normal">{t("All Projects & Repositories")}</h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onRefresh}
                disabled={isLoading}
                title={t("Sync from GitHub API")}
                aria-label={t("Refresh catalog")}
                className="p-2.5 rounded-full border border-neutral-200 hover:bg-neutral-100 text-neutral-600 hover:text-black transition-colors"
              >
                <RefreshCw size={15} className={isLoading ? 'animate-spin' : ''} />
              </button>
              <button
                onClick={onClose}
                aria-label={t("Close catalog")}
                className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Search & Filter bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search size={15} className="absolute left-3.5 top-3 text-neutral-400" />
              <input
                type="text"
                aria-label={t("Search projects")}
                placeholder={t("Search projects by name, tech...")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-full text-xs sm:text-sm focus:outline-none focus:border-black"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex max-w-full shrink-0 items-center gap-1.5 p-1 bg-neutral-100 rounded-full text-xs font-medium self-start sm:self-auto overflow-x-auto">
              <button
                onClick={() => setFilter('all')}
                className={`px-3.5 py-1.5 rounded-full transition-colors ${
                  filter === 'all' ? 'bg-black text-white shadow-xs' : 'text-neutral-600 hover:text-black'
                }`}
              >{t("All (")}{projects.length})
              </button>
              <button
                onClick={() => setFilter('mobile')}
                className={`px-3.5 py-1.5 rounded-full transition-colors ${
                  filter === 'mobile' ? 'bg-black text-white shadow-xs' : 'text-neutral-600 hover:text-black'
                }`}
              >{t("Android / Mobile")}</button>
              <button
                onClick={() => setFilter('web')}
                className={`px-3.5 py-1.5 rounded-full transition-colors ${
                  filter === 'web' ? 'bg-black text-white shadow-xs' : 'text-neutral-600 hover:text-black'
                }`}
              >{t("Web & Frontend")}</button>
              <button
                onClick={() => setFilter('tools')}
                className={`px-3.5 py-1.5 rounded-full transition-colors ${
                  filter === 'tools' ? 'bg-black text-white shadow-xs' : 'text-neutral-600 hover:text-black'
                }`}
              >{t("Extensions & Tools")}</button>
            </div>
          </div>
        </div>

        {/* Repositories Grid Container */}
        <p role="status" className="px-6 pt-3 text-xs text-neutral-500 sm:px-8">{githubNotice}</p>
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-6 sm:p-8" data-catalog-scroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((proj) => (
              <div
                key={proj.id}
                onClick={() => {
                  onSelectProject(proj);
                }}
                className="bg-white rounded-2xl p-5 border border-neutral-200/80 hover:border-black hover:shadow-lg transition-all duration-200 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-mono text-neutral-400">{proj.number}</span>
                    <div className="flex items-center gap-2">
                      {proj.stars !== undefined && proj.stars > 0 && (
                        <span className="flex items-center gap-1 text-[11px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                          <Star size={11} fill="currentColor" />
                          <span>{proj.stars}</span>
                        </span>
                      )}
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-neutral-400 hover:text-black p-1"
                        aria-label={t("Open source repo")}
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 group-hover:text-black transition-colors mb-1">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-neutral-500 font-medium mb-2">{t(proj.category)}</p>

                  <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed mb-4">
                    {t(proj.description)}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {proj.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                    {proj.tags.length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5 text-neutral-400">
                        +{proj.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-2 border-t border-neutral-100">
                    <span>{t(proj.language || 'Code')}</span>
                    <button type="button" onClick={event => { event.stopPropagation(); onSelectProject(proj); }} aria-label={t('View {title} details', { title: proj.title })} className="flex items-center gap-1 text-black font-medium group-hover:translate-x-0.5 transition-transform">
                      <span>{t("Details")}</span>
                      <ArrowUpRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-neutral-400">
              <p className="text-sm">{t("No projects matching your search.")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </Modal>
  );
};
