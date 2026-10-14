import React, { useRef } from 'react';
import { NAVIGATION_SECTIONS } from '../../config/navigationSections';
import { splitCharacters } from '../../utils/splitCharacters';
import { ScrollProgressRuler, ScrollProgressRulerHandle } from './ScrollProgressRuler';
import { CharacterMotionPath } from './CharacterMotionPath';
import { SectionTitle } from './SectionTitle';
import { useScrollNavigation } from '../../hooks/useScrollNavigation';
import './scrollNavigation.css';

export const ScrollNavigationHUD: React.FC = () => {
  const rulerRef = useRef<ScrollProgressRulerHandle>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const {
    geometry,
    activeSection,
    visitedIds,
    upcomingIds,
    debugMode,
    toggleDebug,
    scrollToSection,
    scrollToPercent,
  } = useScrollNavigation(rulerRef, pathRef);

  const isMobile = geometry.isMobile;

  return (
    <div
      className="hud-overlay"
      aria-label="Interactive scroll navigation HUD"
    >
      <CharacterMotionPath
        ref={pathRef}
        geometry={geometry}
        debugMode={debugMode}
        transitTokens={[]}
        transitSectionLabel=""
      />

      <div className="fixed inset-0 pointer-events-none z-50 overflow-visible" aria-hidden="true">
        {NAVIGATION_SECTIONS.slice(1).map((sec) => (
          <div
            key={sec.id}
            data-transit-section={sec.id}
            className="hud-transit-group"
          >
            {splitCharacters(sec.label, sec.id).map((token) => (
              <span
                key={token.id}
                data-transit-char={token.index}
                className="hud-char-transit text-2xl sm:text-3xl opacity-0"
              >
                {token.displayChar}
              </span>
            ))}
          </div>
        ))}
      </div>

      <div
        className={`fixed z-50 flex flex-col items-end text-right transition-all duration-200 ${
          isMobile ? 'top-16 right-10 max-w-[200px]' : 'top-20 right-16 max-w-sm'
        }`}
      >
        <div
          className="flex flex-col items-end gap-1 mb-2 pointer-events-auto"
          aria-label="Visited sections"
        >
          {NAVIGATION_SECTIONS.map((sec) => {
            const isVisited = visitedIds.includes(sec.id);
            return (
              <button
                key={sec.id}
                data-visited-item={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`hud-visited-item group flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] tracking-wider transition-opacity duration-200 cursor-pointer ${
                  isVisited ? 'opacity-60 hover:opacity-100 text-[#111111]' : 'opacity-0 pointer-events-none hidden'
                }`}
                aria-label={`Jump back to ${sec.label}`}
              >
                <span className="text-[#929292] group-hover:text-[#111111]">{sec.index}</span>
                <span className="line-through decoration-neutral-300 text-[#929292] group-hover:text-[#111111]">
                  {sec.shortLabel || sec.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative min-h-[56px] flex flex-col items-end pointer-events-auto">
          {NAVIGATION_SECTIONS.map((sec) => {
            const isActive = activeSection.id === sec.id;
            return (
              <div
                key={sec.id}
                data-active-header={sec.id}
                className={`flex flex-col items-end transition-all duration-300 ${
                  isActive ? 'relative opacity-100' : 'absolute top-0 right-0 opacity-0 pointer-events-none'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="w-1.5 h-[1.5px] bg-[#111111]" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#929292]">
                    SEC {sec.index} / 04 · {sec.kicker}
                  </span>
                </div>

                <button
                  onClick={() => scrollToSection(sec.id)}
                  className="font-serif text-2xl sm:text-3xl text-[#111111] font-normal tracking-wide hover:opacity-75 transition-opacity text-right cursor-pointer"
                  aria-label={`Current section: ${sec.label}`}
                >
                  <SectionTitle text={sec.label} prefixId={`active-${sec.id}`} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className={`fixed z-50 flex flex-col items-end text-right transition-all duration-200 ${
          isMobile ? 'bottom-5 right-10' : 'bottom-9 right-16'
        }`}
        aria-label="Upcoming sections queue"
      >
        <span className="font-mono text-[9px] uppercase tracking-widest text-[#929292] mb-1.5 select-none">
          QUEUE / NEXT
        </span>

        <div className="flex flex-col items-end gap-1.5 pointer-events-auto">
          {NAVIGATION_SECTIONS.map((sec) => {
            const isUpcoming = upcomingIds.includes(sec.id);
            const isNext = upcomingIds[0] === sec.id;

            if (!isUpcoming) return null;

            return (
              <button
                key={sec.id}
                data-queue-item={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`hud-queue-item flex items-center gap-2 text-xs sm:text-[13px] tracking-wide transition-all cursor-pointer ${
                  isNext
                    ? 'text-[#111111] font-medium opacity-90 hover:opacity-100'
                    : 'text-[#929292] opacity-65 hover:opacity-90'
                }`}
                aria-label={`Jump to upcoming section ${sec.label}`}
              >
                {isNext && (
                  <span className="w-1 h-1 rounded-full bg-[#111111]" aria-hidden="true" />
                )}
                <span className="font-mono text-[10px] text-[#929292]">{sec.index}</span>
                <span className="font-serif sm:text-sm">{sec.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <ScrollProgressRuler
        ref={rulerRef}
        isMobile={isMobile}
        onSeek={scrollToPercent}
      />

      <div className="fixed bottom-3 left-4 z-50 pointer-events-auto hidden sm:block">
        <button
          onClick={toggleDebug}
          className={`px-2 py-1 rounded text-[10px] font-mono tracking-wider transition-colors border cursor-pointer ${
            debugMode
              ? 'bg-[#111111] text-white border-[#111111]'
              : 'bg-white/80 backdrop-blur-sm text-[#929292] border-neutral-200/80 hover:text-[#111111] hover:border-neutral-400'
          }`}
          title="Toggle SVG Motion-Path Debug Visualization (or press 'D')"
        >
          {debugMode ? 'HUD PATH: VISIBLE' : 'HUD PATH: [D]'}
        </button>
      </div>
    </div>
  );
};
