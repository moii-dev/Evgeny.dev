import React, { useRef } from 'react';
import { NAVIGATION_SECTIONS } from '../../config/navigationSections';
import { splitCharacters } from '../../utils/splitCharacters';
import { ScrollProgressRuler, ScrollProgressRulerHandle } from './ScrollProgressRuler';
import { CharacterMotionPath } from './CharacterMotionPath';
import { useScrollNavigation } from '../../hooks/useScrollNavigation';
import './scrollNavigation.css';

export const ScrollNavigationHUD: React.FC = () => {
  const rulerRef = useRef<ScrollProgressRulerHandle>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const {
    geometry,
    activeSection,
    visitedIds,
    nextSection,
    debugMode,
    toggleDebug,
    scrollToSection,
  } = useScrollNavigation(rulerRef, pathRef);

  const isMobile = geometry.isMobile;

  return (
    <div
      className="hud-overlay"
      aria-label="Floating navigation HUD"
    >
      <CharacterMotionPath
        ref={pathRef}
        geometry={geometry}
        debugMode={debugMode}
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
                className="hud-char-transit opacity-0"
                style={{
                  transform: `translate3d(${geometry.startPoint.x}px, ${geometry.startPoint.y}px, 0px)`,
                }}
              >
                {token.displayChar}
              </span>
            ))}
          </div>
        ))}
      </div>

      <nav
        className="hud-panel"
        aria-label="Section shortcuts"
      >
        <div className="hud-active-slot">
          {NAVIGATION_SECTIONS.map((sec) => {
            const isActive = activeSection.id === sec.id;
            return (
              <button
                key={sec.id}
                data-active-header={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`font-sans text-[13px] sm:text-sm font-semibold tracking-[-0.02em] text-[#111111] transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-2 pointer-events-none absolute'
                }`}
                aria-label={`Current section: ${sec.label}`}
              >
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        <ScrollProgressRuler
          ref={rulerRef}
          isMobile={isMobile}
          activeSectionId={activeSection.id}
          visitedIds={visitedIds}
          onSelectSection={scrollToSection}
        />

        <div className="hud-next-slot hidden sm:flex">
          {nextSection ? (
            <button
              type="button"
              data-next-label={nextSection.id}
              onClick={() => scrollToSection(nextSection.id)}
              className="font-mono text-[11px] text-[#777777] hover:text-[#111111] transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1"
              aria-label={`Jump to next section ${nextSection.label}`}
            >
              <span>NEXT / {nextSection.label}</span>
              <span className="text-[10px]">↗</span>
            </button>
          ) : (
            <span className="font-mono text-[10px] text-neutral-400 select-none">
              04 / END
            </span>
          )}
        </div>
      </nav>

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
