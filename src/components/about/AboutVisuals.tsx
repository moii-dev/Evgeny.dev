import { t } from '../../i18n';
import React, { useState } from 'react';

/**
 * Geometric 8-pointed star matching reference design in Card 3
 */
export const GeometricStar: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      {/* 8-pointed star with elongated cardinal rays and shorter diagonal rays */}
      <path
        d="M20 0 
           L22 14 
           L36 10 
           L25 20 
           L40 20 
           L25 20 
           L36 30 
           L22 26 
           L20 40 
           L18 26 
           L4 30 
           L15 20 
           L0 20 
           L15 20 
           L4 10 
           L18 14 
           Z"
      />
    </svg>
  );
};

/**
 * Editorial Quote marks
 */
export const EditorialQuoteMarks: React.FC<{
  type: 'open' | 'close';
  className?: string;
}> = ({ type, className = 'w-8 h-8 text-neutral-300' }) => {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      {type === 'open' ? (
        <path d="M7 18h4c0-4 1-7 5-8V6c-6 0-9 4-9 12zm10 0h4c0-4 1-7 5-8V6c-6 0-9 4-9 12z" />
      ) : (
        <path d="M11 14H7c0 4-1 7-5 8v4c6 0 9-4 9-12zm10 0h-4c0 4-1 7-5 8v4c6 0 9-4 9-12z" />
      )}
    </svg>
  );
};

/**
 * Workspace Developer Setup Visual for Card 1 (Who I Am)
 * High-resolution monochrome photo with seamless gradient fade and SVG fallback
 */
export const WorkspaceVisual: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  // Reliable monochrome developer setup photography
  const photoUrl =
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=85';

  return (
    <div className="relative w-full h-full min-h-[320px] lg:min-h-full overflow-hidden select-none">
      {!imgError ? (
        <img
          src={photoUrl}
          alt={t("Monochrome Developer Workspace")}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-center grayscale contrast-115 brightness-95 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          loading="lazy"
        />
      ) : (
        /* Crafted Vector Fallback matching the reference monitor/keyboard setup */
        <div className="w-full h-full bg-[#18191c] flex items-center justify-center p-6 text-neutral-400">
          <svg viewBox="0 0 600 450" className="w-full h-full max-h-[380px]" fill="none">
            {/* Ambient desk back-lighting */}
            <radialGradient id="deskGlow" cx="50%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#3f3f46" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#18191c" stopOpacity="0" />
            </radialGradient>
            <rect width="600" height="450" fill="url(#deskGlow)" />

            {/* Desk Surface Line */}
            <path d="M0 340 L600 340" stroke="#27272a" strokeWidth="2" />

            {/* Left Studio Speaker */}
            <rect x="50" y="160" width="70" height="150" rx="6" fill="#1f2024" stroke="#2e3036" strokeWidth="2" />
            <circle cx="85" cy="205" r="16" fill="#141518" stroke="#383a42" strokeWidth="2" />
            <circle cx="85" cy="265" r="24" fill="#141518" stroke="#383a42" strokeWidth="2" />
            <circle cx="85" cy="265" r="9" fill="#26282e" />

            {/* Right Studio Speaker */}
            <rect x="480" y="160" width="70" height="150" rx="6" fill="#1f2024" stroke="#2e3036" strokeWidth="2" />
            <circle cx="515" cy="205" r="16" fill="#141518" stroke="#383a42" strokeWidth="2" />
            <circle cx="515" cy="265" r="24" fill="#141518" stroke="#383a42" strokeWidth="2" />
            <circle cx="515" cy="265" r="9" fill="#26282e" />

            {/* Central Monitor Stand */}
            <rect x="285" y="270" width="30" height="70" fill="#2a2c32" rx="3" />
            <rect x="240" y="335" width="120" height="8" rx="4" fill="#1e2025" stroke="#33363f" />

            {/* Widescreen Curved Coding Monitor */}
            <rect x="140" y="80" width="320" height="200" rx="10" fill="#0c0d0f" stroke="#363942" strokeWidth="3" />
            {/* Screen Inner Bezel */}
            <rect x="146" y="86" width="308" height="188" rx="6" fill="#121316" />

            {/* Code IDE Window Header */}
            <rect x="146" y="86" width="308" height="20" fill="#1a1c22" />
            <circle cx="160" cy="96" r="3" fill="#3f3f46" />
            <circle cx="170" cy="96" r="3" fill="#3f3f46" />
            <circle cx="180" cy="96" r="3" fill="#3f3f46" />
            <rect x="200" y="91" width="60" height="10" rx="2" fill="#262830" />

            {/* Simulated Code Lines */}
            <g opacity="0.85">
              <rect x="160" y="120" width="80" height="6" rx="2" fill="#71717a" />
              <rect x="248" y="120" width="60" height="6" rx="2" fill="#a1a1aa" />
              <rect x="175" y="134" width="110" height="6" rx="2" fill="#52525b" />
              <rect x="292" y="134" width="70" height="6" rx="2" fill="#71717a" />
              <rect x="190" y="148" width="95" height="6" rx="2" fill="#a1a1aa" />
              <rect x="175" y="162" width="140" height="6" rx="2" fill="#52525b" />
              <rect x="160" y="176" width="45" height="6" rx="2" fill="#71717a" />

              <rect x="160" y="196" width="90" height="6" rx="2" fill="#a1a1aa" />
              <rect x="175" y="210" width="130" height="6" rx="2" fill="#52525b" />
              <rect x="190" y="224" width="85" height="6" rx="2" fill="#71717a" />
              <rect x="190" y="238" width="115" height="6" rx="2" fill="#a1a1aa" />
              <rect x="160" y="252" width="40" height="6" rx="2" fill="#52525b" />
            </g>

            {/* Mechanical Keyboard */}
            <rect x="200" y="320" width="200" height="60" rx="6" fill="#1b1c20" stroke="#333640" strokeWidth="2" />
            {/* Keycap grid lines */}
            <g opacity="0.6">
              <rect x="208" y="326" width="184" height="10" rx="2" fill="#282a32" />
              <rect x="208" y="339" width="184" height="10" rx="2" fill="#282a32" />
              <rect x="208" y="352" width="184" height="10" rx="2" fill="#282a32" />
              <rect x="208" y="365" width="184" height="10" rx="2" fill="#282a32" />
            </g>

            {/* Mouse */}
            <ellipse cx="430" cy="350" rx="14" ry="22" fill="#22242a" stroke="#3a3d46" strokeWidth="1.5" />

            {/* Plant Pot */}
            <rect x="100" y="305" width="30" height="35" rx="3" fill="#2a2b30" />
            <path d="M115 305 Q125 280 120 270 Q112 285 115 305" fill="#3f3f46" />
            <path d="M115 305 Q105 285 110 275 Q118 290 115 305" fill="#52525b" />
          </svg>
        </div>
      )}

      {/* Multi-layered gradient fade masking:
          Melts the photo seamlessly into the card background (#f2f2f3) */}
      <div className="absolute inset-y-0 left-0 w-32 sm:w-48 lg:w-64 bg-gradient-to-r from-[#f2f2f3] via-[#f2f2f3]/80 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f2f2f3] via-[#f2f2f3]/40 to-transparent pointer-events-none lg:hidden" />
      <div className="absolute inset-0 bg-neutral-900/5 pointer-events-none mix-blend-multiply" />
    </div>
  );
};

/**
 * Mountain & Cosmic Night Visual for Card 2 (Mindset)
 */
export const MountainVisual: React.FC<{ scrollOffset?: number }> = () => {
  const [imgError, setImgError] = useState(false);

  // Atmospheric black & white rugged mountain landscape
  const photoUrl =
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=85';

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
      {!imgError ? (
        <img
          src={photoUrl}
          alt={t("Atmospheric Mountain Landscape")}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-right-bottom grayscale contrast-125 brightness-75 scale-105 transition-transform duration-1000 ease-out group-hover:scale-110"
          loading="lazy"
        />
      ) : (
        /* Vector Night Mountain Peaks with Crescent Moon */
        <div className="w-full h-full bg-[#0a0a0d] relative">
          <svg viewBox="0 0 500 350" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" fill="none">
            {/* Celestial stars */}
            <circle cx="80" cy="50" r="1" fill="#fff" opacity="0.6" />
            <circle cx="160" cy="80" r="1.5" fill="#fff" opacity="0.8" />
            <circle cx="280" cy="40" r="1" fill="#fff" opacity="0.5" />
            <circle cx="390" cy="70" r="1.2" fill="#fff" opacity="0.7" />
            <circle cx="430" cy="110" r="1" fill="#fff" opacity="0.4" />

            {/* Glowing Crescent Planet / Moon */}
            <circle cx="420" cy="90" r="45" fill="#20222b" opacity="0.4" />
            <path
              d="M420 50 A 40 40 0 0 1 455 115 A 42 42 0 0 0 420 50 Z"
              fill="#e4e4e7"
              opacity="0.9"
            />

            {/* Mountain Ridges */}
            {/* Distant Ridge */}
            <path
              d="M100 350 L220 210 L310 260 L410 180 L500 240 L500 350 Z"
              fill="#181920"
            />
            {/* Middle Sharp Ridge */}
            <path
              d="M240 350 L350 170 L420 220 L500 150 L500 350 Z"
              fill="#22242e"
            />
            {/* High-contrast Snowy Crag Highlights */}
            <path
              d="M350 170 L358 190 L345 220 L365 240 L350 280 L340 350 L350 170 Z"
              fill="#52525b"
              opacity="0.6"
            />
            <path
              d="M350 170 L380 205 L370 230 L400 260 L385 350 L350 170 Z"
              fill="#3f3f46"
              opacity="0.5"
            />
          </svg>
        </div>
      )}

      {/* Atmospheric Contrast Overlays for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/30 pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />
    </div>
  );
};

/**
 * Creative Desk Gear Visual for Card 5 (Beyond the Screen)
 * Headphones, camera, keyboard, notebook with gradient melt
 */
export const GearVisual: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  // High-contrast monochrome creative objects photography
  const photoUrl =
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=85';

  return (
    <div className="relative w-full h-full min-h-[220px] overflow-hidden select-none">
      {!imgError ? (
        <img
          src={photoUrl}
          alt={t("Creative Gear: Headphones, Camera, Notebook")}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-center grayscale contrast-120 brightness-90 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          loading="lazy"
        />
      ) : (
        /* Vector Gear Composition Fallback */
        <div className="w-full h-full bg-[#1c1d22] flex items-center justify-center p-4">
          <svg viewBox="0 0 400 260" className="w-full h-full" fill="none">
            {/* Headphones */}
            <path
              d="M100 130 C100 80, 180 80, 180 130"
              stroke="#52525b"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Left Earcup */}
            <rect x="85" y="120" width="26" height="42" rx="13" fill="#27272a" stroke="#3f3f46" strokeWidth="2" />
            {/* Right Earcup */}
            <rect x="170" y="120" width="26" height="42" rx="13" fill="#27272a" stroke="#3f3f46" strokeWidth="2" />

            {/* Camera Body */}
            <rect x="230" y="110" width="90" height="60" rx="8" fill="#27272a" stroke="#3f3f46" strokeWidth="2" />
            <circle cx="275" cy="140" r="22" fill="#18181b" stroke="#52525b" strokeWidth="3" />
            <circle cx="275" cy="140" r="14" fill="#09090b" />
            <rect x="245" y="100" width="20" height="10" rx="2" fill="#3f3f46" />

            {/* Notebook & Pen */}
            <rect x="140" y="180" width="120" height="70" rx="4" fill="#e4e4e7" transform="rotate(-6 140 180)" />
            <line x1="155" y1="200" x2="235" y2="190" stroke="#a1a1aa" strokeWidth="1.5" />
            <line x1="155" y1="215" x2="235" y2="205" stroke="#a1a1aa" strokeWidth="1.5" />
            <line x1="155" y1="230" x2="215" y2="220" stroke="#a1a1aa" strokeWidth="1.5" />
            {/* Pen */}
            <rect x="260" y="170" width="8" height="75" rx="3" fill="#18181b" transform="rotate(35 260 170)" />
          </svg>
        </div>
      )}

      {/* Seamless gradient fade mask melting into the card background (#f2f2f3) */}
      <div className="absolute inset-y-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-[#f2f2f3] via-[#f2f2f3]/80 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-neutral-900/5 pointer-events-none mix-blend-multiply" />
    </div>
  );
};
