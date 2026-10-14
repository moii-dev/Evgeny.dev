import React, { useState, useEffect } from 'react';
import { Project, ProjectCoverConfig } from '../types/project';
import { Globe, Scan, Sparkles, Check, Layers, Square, MousePointer, Sliders, AlertCircle, FileCode } from 'lucide-react';

interface ProjectCoverProps {
  project: Project;
  size?: 'card' | 'modal' | 'compact';
  customScreenshotUrl?: string;
  onUploadRequest?: () => void;
}

export const ProjectCover: React.FC<ProjectCoverProps> = ({
  project,
  size = 'card',
  customScreenshotUrl,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [localCustomImage, setLocalCustomImage] = useState<string | null>(null);

  // Check localStorage for user-uploaded custom screenshot
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`evgeny_project_cover_${project.id}`);
      if (saved) {
        setLocalCustomImage(saved);
      }
    } catch {
      // ignore
    }
  }, [project.id]);

  const cover: ProjectCoverConfig = project.cover || {
    variant: 'editorial',
    backgroundTheme: 'silver',
    badgeText: project.category,
    caption: project.description,
  };

  const effectivePrimaryImage = customScreenshotUrl || localCustomImage || cover.primaryImage;
  const isModal = size === 'modal';
  const isCompact = size === 'compact';

  // Monochrome editorial backgrounds (strictly silver, cool-gray, warm-gray, slate)
  const getBackgroundClass = () => {
    switch (cover.backgroundTheme) {
      case 'silver':
        return 'bg-gradient-to-br from-[#f1f3f6] via-[#eceff2] to-[#e2e6eb] text-neutral-800';
      case 'warm-gray':
        return 'bg-gradient-to-br from-[#f7f6f3] via-[#f2efe9] to-[#ebe7df] text-neutral-800';
      case 'slate':
        return 'bg-gradient-to-br from-[#f2f5f8] via-[#e9edf2] to-[#dfe5ec] text-neutral-800';
      case 'gray':
      default:
        return 'bg-gradient-to-br from-[#f4f5f7] via-[#ebedf0] to-[#e4e7ea] text-neutral-800';
    }
  };

  const containerHeight = isModal
    ? 'min-h-[340px] sm:min-h-[420px]'
    : isCompact
    ? 'min-h-[160px]'
    : 'min-h-[260px] sm:min-h-[300px]';

  // -------------------------------------------------------------
  // 1. LUMA: REAL 1280x2856 SCREENSHOT FROM MOII-DEV/LUMA REPO
  // -------------------------------------------------------------
  if (project.id === 'luma' && effectivePrimaryImage && !imageError) {
    return (
      <div
        className={`relative w-full ${containerHeight} ${getBackgroundClass()} overflow-hidden flex items-center justify-center p-3 sm:p-5 select-none`}
      >
        {/* Subtle grid backdrop */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />

        {/* Real Aura Screen from GitHub with subtle flat elevation */}
        <div className="relative w-full max-w-[420px] flex items-center justify-center">
          <div className="relative max-h-[240px] sm:max-h-[275px] rounded-2xl overflow-hidden border border-neutral-300/80 shadow-[0_6px_24px_rgba(0,0,0,0.06)] bg-white transition-all duration-500 ease-out group-hover:scale-[1.025] group-hover:shadow-[0_10px_32px_rgba(0,0,0,0.1)]">
            <img
              src={effectivePrimaryImage}
              alt="Luma Pulse Aura Real Screenshot"
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full max-h-[240px] sm:max-h-[275px] object-contain transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-90'
              }`}
            />
          </div>
        </div>

        {/* Minimal Badge */}
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-sm border border-neutral-200/80 text-[10px] font-mono text-neutral-600 shadow-2xs">
          {cover.badgeText || 'Real App Screenshot'}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. QR-SCANNER: REAL RUSTORE 512x512 ICON & CAMERAX VIEWFINDER
  // -------------------------------------------------------------
  if (project.id === 'qr-scanner') {
    return (
      <div
        className={`relative w-full ${containerHeight} ${getBackgroundClass()} overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6 select-none`}
      >
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />

        {/* CameraX Viewfinder reticle in Monochrome Editorial Style */}
        <div className="relative w-full max-w-[360px] bg-white/90 backdrop-blur-sm rounded-2xl border border-neutral-300/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-4 sm:p-5 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
          {/* Header Row */}
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 text-xs">
            <div className="flex items-center gap-1.5 font-mono text-neutral-500">
              <Scan size={13} className="text-neutral-700" />
              <span>CameraX Viewfinder</span>
            </div>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 border border-neutral-200/60">
              ML Kit Ready
            </span>
          </div>

          {/* Central QR Viewfinder Area */}
          <div className="my-3 relative py-4 flex flex-col items-center justify-center bg-neutral-50/70 rounded-xl border border-dashed border-neutral-200">
            {/* Viewfinder corner brackets */}
            <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-neutral-400" />
            <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-neutral-400" />
            <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-neutral-400" />
            <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-neutral-400" />

            {/* Official RuStore App Icon from Repo */}
            <div className="w-16 h-16 rounded-2xl bg-white border border-neutral-200 shadow-sm p-1.5 mb-2 overflow-hidden flex items-center justify-center">
              {cover.logoUrl ? (
                <img
                  src={cover.logoUrl}
                  alt="QR-Scanner RuStore Icon"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              ) : (
                <Scan size={28} className="text-neutral-800" />
              )}
            </div>

            {/* Scanner line indicator */}
            <div className="w-32 h-0.5 bg-neutral-400/80 rounded-full mb-1" />
            <span className="text-[10px] font-mono text-neutral-400">
              Instant Barcode & QR Detection
            </span>
          </div>

          {/* Bottom Architecture Specs */}
          <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-neutral-500">
            <span>Compose · Room DB</span>
            <span>v1.0.0 RuStore</span>
          </div>
        </div>

        <div className="mt-3 text-[11px] font-mono text-neutral-500 flex items-center gap-2">
          <span>Real Android CameraX Project</span>
          <span className="text-neutral-300">/</span>
          <span>Google ML Kit</span>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 3. FIGMINT: REAL VECTOR & CANVAS EDITOR UI MOCKUP
  // -------------------------------------------------------------
  if (project.id === 'figmint') {
    return (
      <div
        className={`relative w-full ${containerHeight} ${getBackgroundClass()} overflow-hidden flex flex-col items-center justify-center p-3 sm:p-5 select-none`}
      >
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />

        {/* Minimal Browser Frame with Vector Canvas UI */}
        <div className="relative w-full max-w-[420px] bg-white rounded-xl sm:rounded-2xl border border-neutral-300/80 shadow-[0_6px_28px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_10px_34px_rgba(0,0,0,0.08)]">
          {/* Top Browser Bar */}
          <div className="flex items-center justify-between px-3 py-2 bg-[#f6f7f9] border-b border-neutral-200/80 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-neutral-300" />
              <div className="w-2 h-2 rounded-full bg-neutral-300" />
              <div className="w-2 h-2 rounded-full bg-neutral-300" />
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-white border border-neutral-200 rounded text-[10px] text-neutral-500 font-mono">
              <Globe size={10} className="text-neutral-400" />
              <span>https://figmint.web.app</span>
            </div>

            <div className="w-6" />
          </div>

          {/* Minimal Vector Editor Workspace */}
          <div className="bg-[#fcfcfc] p-3 text-neutral-800">
            {/* Editor Toolbar */}
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100 text-[11px]">
              <div className="flex items-center gap-2 text-neutral-600">
                <span className="p-1 rounded bg-neutral-100 text-neutral-900 font-medium flex items-center gap-1">
                  <MousePointer size={11} />
                  <span>Select</span>
                </span>
                <span className="p-1 text-neutral-400 flex items-center gap-1">
                  <Square size={11} />
                  <span>Frame</span>
                </span>
                <span className="p-1 text-neutral-400 flex items-center gap-1">
                  <Layers size={11} />
                  <span>Layers</span>
                </span>
              </div>
              <span className="font-mono text-[9px] text-neutral-400">100%</span>
            </div>

            {/* Canvas Artboard Representation */}
            <div className="my-2.5 h-24 bg-[#f3f4f6] rounded-lg border border-neutral-200 relative overflow-hidden flex items-center justify-center">
              {/* Grid dots */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                  backgroundSize: '12px 12px',
                }}
              />

              {/* Vector Artboard with selection handles */}
              <div className="relative w-36 h-16 bg-white rounded-md border border-neutral-900/40 shadow-xs flex flex-col justify-between p-1.5">
                {/* Bounding box handles */}
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-neutral-900" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-neutral-900" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-neutral-900" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-neutral-900" />

                <div className="w-12 h-1.5 bg-neutral-200 rounded" />
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded bg-neutral-100 border border-neutral-300" />
                  <div className="w-16 h-1 bg-neutral-150 rounded" />
                </div>
              </div>
            </div>

            {/* Footer Properties */}
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] font-mono text-neutral-400">
              <span className="flex items-center gap-1">
                <Sliders size={11} /> W: 1440 · H: 900
              </span>
              <span>React · TypeScript</span>
            </div>
          </div>
        </div>

        <div className="mt-3 text-[11px] font-mono text-neutral-500 flex items-center gap-2">
          <span>Vector & Canvas Editor</span>
          <span className="text-neutral-300">/</span>
          <span>Infinite Canvas</span>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 4. FREECHAT: OFFICIAL LOGO & ANDROID ARCHITECTURE SHOWCASE
  // -------------------------------------------------------------
  if (project.id === 'freechat') {
    return (
      <div
        className={`relative w-full ${containerHeight} ${getBackgroundClass()} overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6 select-none`}
      >
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />

        {/* Minimal Editorial Card for FreeChat */}
        <div className="relative w-full max-w-[390px] bg-white/90 backdrop-blur-sm rounded-2xl border border-neutral-300/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-5 sm:p-6 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
          {/* Header Row */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-neutral-100 border border-neutral-200/80 flex items-center justify-center p-2 shadow-2xs shrink-0 overflow-hidden">
                {cover.logoUrl ? (
                  <img
                    src={cover.logoUrl}
                    alt="FreeChat logo"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <FileCode size={22} className="text-neutral-800" />
                )}
              </div>
              <div>
                <h4 className="text-base font-semibold text-neutral-900 tracking-tight leading-tight">
                  FreeChat
                </h4>
                <span className="text-[11px] font-mono text-neutral-500 block mt-0.5">
                  Android AI Assistant · v0.5.1 beta
                </span>
              </div>
            </div>

            <span className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-emerald-700 bg-emerald-50 rounded-md border border-emerald-200/60">
              Verified
            </span>
          </div>

          {/* Architecture Matrix */}
          <div className="my-2.5 p-3 bg-neutral-50/80 rounded-xl border border-neutral-200/60 space-y-2 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-neutral-500 font-mono text-[10px]">Client</span>
              <span className="font-medium text-neutral-800">Kotlin · Jetpack Compose</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500 font-mono text-[10px]">Backend</span>
              <span className="font-medium text-neutral-800">Node.js · PostgreSQL</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500 font-mono text-[10px]">Auth</span>
              <span className="font-medium text-neutral-800">Telegram / VK ID</span>
            </div>
          </div>

          {/* Footer Features */}
          <div className="pt-2.5 border-t border-neutral-100 flex items-center justify-between text-[10px] font-mono text-neutral-400">
            <span>Screen Capture · Stream AI</span>
            <span>Android 34</span>
          </div>
        </div>

        <div className="mt-3 text-[11px] font-mono text-neutral-500 flex items-center gap-2">
          <span>Production AI Client</span>
          <span className="text-neutral-300">/</span>
          <span>moii-dev/FreeChat</span>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 5. GENERIC / DRAFT / PLACEHOLDER SHOWCASE (EverUs, Runa, etc.)
  // -------------------------------------------------------------
  const isDraftPending = project.tags.includes('Pending Repo') || cover.fallbackNotice;

  return (
    <div
      className={`relative w-full ${containerHeight} ${getBackgroundClass()} overflow-hidden flex flex-col items-center justify-center p-4 sm:p-7 select-none`}
    >
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />

      <div className="relative w-full max-w-[390px] bg-white/90 backdrop-blur-sm rounded-2xl border border-neutral-300/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        {/* Top Identity Row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-neutral-100 border border-neutral-200/80 flex items-center justify-center p-1.5 shadow-2xs shrink-0 overflow-hidden">
              {cover.logoUrl ? (
                <img
                  src={cover.logoUrl}
                  alt={`${project.title} logo`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              ) : (
                <span className="text-sm font-semibold text-neutral-800 font-mono">
                  {project.title.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>

            <div>
              <h4 className="text-base font-semibold text-neutral-900 tracking-tight leading-tight">
                {project.title}
              </h4>
              <span className="text-[11px] font-mono text-neutral-400 block mt-0.5">
                {project.category}
              </span>
            </div>
          </div>

          <span
            className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider rounded-md border ${
              isDraftPending
                ? 'text-amber-700 bg-amber-50 border-amber-200/60'
                : 'text-neutral-500 bg-neutral-100 border-neutral-200/60'
            }`}
          >
            {isDraftPending ? 'Draft' : project.language || 'Production'}
          </span>
        </div>

        {/* Center Editorial Showcase Details */}
        <div className="my-2 p-3 bg-neutral-50/80 rounded-xl border border-neutral-200/60">
          <div className="flex items-center gap-2 mb-1.5 text-[11px] font-medium text-neutral-700">
            {isDraftPending ? (
              <AlertCircle size={12} className="text-amber-600" />
            ) : (
              <Sparkles size={12} className="text-neutral-500" />
            )}
            <span>{cover.badgeText || 'Product Showcase'}</span>
          </div>
          <p className="text-[11px] text-neutral-500 leading-relaxed">
            {cover.caption || project.description}
          </p>
        </div>

        {/* Notice of Missing Data / Manual Filling if draft */}
        {isDraftPending && (
          <div className="mt-2 text-[10px] font-mono text-amber-800 bg-amber-50/80 p-2 rounded-lg border border-amber-200/50">
            <span>Репозиторий пока не найден на GitHub moii-dev. Требуется ручное указание данных.</span>
          </div>
        )}

        {/* Required Screenshot Guidance */}
        {cover.requiredScreenshots && cover.requiredScreenshots.length > 0 && (
          <div className="mt-2 pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] font-mono text-neutral-400">
            <span className="truncate">Требуется: {cover.requiredScreenshots[0]}</span>
            <span className="shrink-0 text-neutral-400 ml-1">PNG</span>
          </div>
        )}
      </div>

      <div className="mt-3 text-[11px] font-mono text-neutral-400 flex items-center gap-2">
        <span>Editorial Showcase</span>
        <span>·</span>
        <span>Anti-AI Slop</span>
      </div>
    </div>
  );
};
