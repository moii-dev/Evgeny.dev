import { t } from '../i18n';
import React, { useState } from 'react';
import { Project, ProjectCoverConfig } from '../types/project';
import { assetUrl } from '../utils/urls';

interface ProjectCoverProps {
  project: Project;
  size?: 'card' | 'modal' | 'compact';
}

export const ProjectCover: React.FC<ProjectCoverProps> = ({
  project,
  size = 'card',
}) => {
  const [failedSource, setFailedSource] = useState<string | null>(null);

  const cover: ProjectCoverConfig = project.cover || {
    variant: 'single',
    backgroundTheme: 'silver',
    badgeText: project.category,
    caption: project.description,
  };

  const effectivePrimaryImage = cover.primaryImage ? assetUrl(cover.primaryImage) : undefined;
  const imageError = failedSource === effectivePrimaryImage;
  const isModal = size === 'modal';
  const isCompact = size === 'compact';

  const containerHeight = isModal
    ? 'min-h-[340px] sm:min-h-[420px]'
    : isCompact
    ? 'min-h-[160px]'
    : 'min-h-[270px] sm:min-h-[310px]';

  // -------------------------------------------------------------
  // 1. FRECHAT: FLAGSHIP ANDROID AI ASSISTANT & CLOUD ROUTING
  // Minimalist, premium product identity showcase with authentic logo
  // -------------------------------------------------------------
  if (project.id === 'freechat') {
    return (
      <div
        className={`relative w-full ${containerHeight} bg-gradient-to-br from-[#f6f7f9] via-[#edf0f4] to-[#e2e6ec] overflow-hidden flex flex-col items-center justify-center p-6 sm:p-8 select-none`}
      >
        {/* Subtle radial dot texture */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />

        {/* Concentric AI Neural / Audio Resonance Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-neutral-300/40" />
          <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-neutral-300/25" />
          <div className="absolute w-96 h-96 sm:w-104 sm:h-104 rounded-full border border-neutral-300/15" />
        </div>

        {/* Elevated Product Plaque */}
        <div className="relative z-10 flex flex-col items-center text-center transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          {/* Glassmorphic Brand Emblem */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/95 backdrop-blur-md border border-white/80 shadow-[0_16px_40px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.03)] flex items-center justify-center p-4 sm:p-5 mb-4">
            <img
              src={assetUrl('/assets/projects/freechat/logo_transparent.png')}
              alt={t("FreeChat Brand Mark")}
              className="w-full h-full object-contain filter drop-shadow-xs"
              loading="lazy"
            />
          </div>

          {/* Large Expressive Typography */}
          <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 font-sans">
            FreeChat
          </h4>
          <p className="text-xs sm:text-sm text-neutral-500 font-medium tracking-wide mt-1">{t("Intelligent AI Assistant & Platform")}</p>
        </div>

        {/* Corner Badge */}
        <div className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 z-10 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-neutral-200/80 text-[10px] sm:text-[11px] font-mono text-neutral-600 shadow-2xs">
          Kotlin · Compose · Express
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. WORLDBOX-REACT: REAL 1672x941 HIGH-RES SIMULATION SCREENSHOT
  // -------------------------------------------------------------
  if (project.id === 'worldbox-react' && effectivePrimaryImage && !imageError) {
    return (
      <div
        className={`relative w-full ${containerHeight} bg-gradient-to-br from-[#f0f3f7] via-[#e6ebf2] to-[#dce2ec] overflow-hidden flex items-center justify-center p-4 sm:p-6 select-none`}
      >
        {/* Subtle grid backdrop */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />

        {/* Real Game Screenshot Showcase Viewport */}
        <div className="relative w-full max-w-[480px] flex items-center justify-center">
          <div className="relative w-full rounded-2xl overflow-hidden border border-neutral-300/80 shadow-[0_16px_40px_rgba(15,23,42,0.12),0_2px_8px_rgba(0,0,0,0.04)] bg-slate-950 transition-all duration-500 ease-out group-hover:scale-[1.025] group-hover:shadow-[0_22px_48px_rgba(15,23,42,0.18)]">
            <img
              src={effectivePrimaryImage}
              srcSet={`${assetUrl('/assets/projects/worldbox/world-menu-background-480.webp')} 480w, ${assetUrl('/assets/projects/worldbox/world-menu-background-960.webp')} 960w, ${effectivePrimaryImage} 1672w`}
              sizes="(min-width: 768px) 480px, calc(100vw - 80px)"
              alt={t("WorldBox-React Procedural Generation Screenshot")}
              loading="lazy"
              onError={() => setFailedSource(effectivePrimaryImage || null)}
              className="w-full max-h-[220px] sm:max-h-[255px] object-cover object-center"
            />
          </div>
        </div>

        {/* Corner Badge */}
        <div className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 z-10 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-neutral-200/80 text-[10px] sm:text-[11px] font-mono text-neutral-700 shadow-2xs">{t("React 19 · Simulation Engine")}</div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 3. FIGMINT: LOCAL-FIRST VECTOR & PROTOTYPING STUDIO SHOWCASE
  // Minimalist, geometric vector studio showcase with authentic logo
  // -------------------------------------------------------------
  if (project.id === 'figmint') {
    return (
      <div
        className={`relative w-full ${containerHeight} bg-gradient-to-br from-[#f4f5f8] via-[#eaedf2] to-[#e1e4ea] overflow-hidden flex flex-col items-center justify-center p-6 sm:p-8 select-none`}
      >
        {/* Subtle vector grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Floating Architectural Studio Showcase */}
        <div className="relative z-10 w-full max-w-[390px] bg-white/95 backdrop-blur-md rounded-2xl border border-neutral-200/90 shadow-[0_16px_40px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.03)] p-6 sm:p-7 flex flex-col items-center justify-center text-center transition-transform duration-500 ease-out group-hover:scale-[1.025]">
          {/* Vector Construction Arc Guide */}
          <div className="relative w-full flex items-center justify-center mb-4">
            <svg
              width="240"
              height="40"
              viewBox="0 0 240 40"
              fill="none"
              className="absolute pointer-events-none opacity-40 text-neutral-400"
            >
              <path
                d="M 20 30 Q 120 5 220 30"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
              <rect x="18" y="28" width="4" height="4" fill="white" stroke="#0D99FF" strokeWidth="1" />
              <rect x="118" y="15" width="4" height="4" fill="#0D99FF" />
              <rect x="218" y="28" width="4" height="4" fill="white" stroke="#0D99FF" strokeWidth="1" />
            </svg>

            {/* Official Figmint Logo Mark */}
            <div className="relative z-10 w-16 h-16 rounded-2xl bg-neutral-900 shadow-md flex items-center justify-center p-2.5">
              <svg width="40" height="40" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="28" height="28" rx="9" fill="#111827" />
                <path
                  d="M9 9.5C9 8.67 9.67 8 10.5 8H21.5C22.33 8 23 8.67 23 9.5V12H14V15H21V19H14V24H10.5C9.67 24 9 23.33 9 22.5V9.5Z"
                  fill="#71E6BE"
                />
                <circle cx="22.5" cy="22.5" r="2.5" fill="#0D99FF" />
              </svg>
            </div>
          </div>

          {/* Expressive Editorial Typography */}
          <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 font-sans">
            Figmint
          </h4>
          <p className="text-xs sm:text-sm text-neutral-500 font-medium tracking-wide mt-1">{t("Local-First Vector & Prototyping Studio")}</p>
        </div>

        {/* Corner Badge */}
        <div className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 z-10 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-neutral-200/80 text-[10px] sm:text-[11px] font-mono text-neutral-700 shadow-2xs">{t("Canvas · Bezier · Prototyping")}</div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 4. LUMA: REAL 1280x2856 SCREENSHOT FROM MOII-DEV/LUMA REPO
  // -------------------------------------------------------------
  if (project.id === 'luma' && effectivePrimaryImage && !imageError) {
    return (
      <div
        className={`relative w-full ${containerHeight} bg-gradient-to-br from-[#f4f6f8] via-[#ebedf1] to-[#dfe3e9] overflow-hidden flex items-center justify-center p-4 sm:p-6 select-none`}
      >
        {/* Subtle grid backdrop */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />

        {/* Real Aura Screen Frame with restrained shadow */}
        <div className="relative w-full max-w-[420px] flex items-center justify-center">
          <div className="relative max-h-[230px] sm:max-h-[265px] rounded-2xl overflow-hidden border border-neutral-300/80 shadow-[0_16px_40px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.03)] bg-white transition-all duration-500 ease-out group-hover:scale-[1.025] group-hover:shadow-[0_20px_48px_rgba(0,0,0,0.12)]">
            <img
              src={effectivePrimaryImage}
              alt={t("Luma Pulse Aura Real Screenshot")}
              loading="lazy"
              onError={() => setFailedSource(effectivePrimaryImage || null)}
              className="w-full max-h-[230px] sm:max-h-[265px] object-contain"
            />
          </div>
        </div>

        {/* Corner Badge */}
        <div className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 z-10 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-neutral-200/80 text-[10px] sm:text-[11px] font-mono text-neutral-700 shadow-2xs">
          Pulse Aura · Room · Widgets
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 5. GENERIC / ALL-PROJECTS MODAL SHOWCASE (OnePass, Yandex AdBlocker, etc.)
  // Clean, museum-grade minimal editorial card
  // -------------------------------------------------------------
  return (
    <div
      className={`relative w-full ${containerHeight} bg-gradient-to-br from-[#f5f6f8] via-[#eceef2] to-[#e2e5eb] overflow-hidden flex flex-col items-center justify-center p-5 sm:p-7 select-none`}
    >
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />

      {/* If an image exists, show image showcase */}
      {effectivePrimaryImage && !imageError ? (
        <div className="relative w-full max-w-[420px] flex items-center justify-center">
          <div className="relative max-h-[220px] sm:max-h-[250px] rounded-2xl overflow-hidden border border-neutral-300/80 shadow-[0_12px_36px_rgba(0,0,0,0.08)] bg-white transition-all duration-300 group-hover:scale-[1.02]">
            <img
              src={effectivePrimaryImage}
              alt={project.title}
              loading="lazy"
              onError={() => setFailedSource(effectivePrimaryImage || null)}
              className="w-full max-h-[220px] sm:max-h-[250px] object-contain"
            />
          </div>
        </div>
      ) : (
        /* Minimalist product identity plaque */
        <div className="relative z-10 w-full max-w-[380px] bg-white/90 backdrop-blur-md rounded-2xl border border-neutral-200/90 shadow-[0_14px_36px_rgba(0,0,0,0.05)] p-5 sm:p-6 flex flex-col items-center text-center transition-transform duration-300 group-hover:scale-[1.02]">
          <div className="w-16 h-16 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center p-3 mb-3 shadow-2xs overflow-hidden">
            {cover.logoUrl ? (
              <img
                src={assetUrl(cover.logoUrl)}
                alt={t('{title} logo', { title: project.title })}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            ) : (
              <span className="text-lg font-bold text-neutral-800 font-mono">
                {project.title.slice(0, 2).toUpperCase()}
              </span>
            )}
          </div>

          <h4 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 font-sans">
            {project.title}
          </h4>
          <p className="text-xs text-neutral-500 font-medium mt-1">
            {t(project.category)}
          </p>
        </div>
      )}

      {/* Minimal Corner Badge */}
      <div className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 z-10 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-neutral-200/80 text-[10px] sm:text-[11px] font-mono text-neutral-600 shadow-2xs">
        {t(cover.badgeText || project.language || 'Production')}
      </div>
    </div>
  );
};
