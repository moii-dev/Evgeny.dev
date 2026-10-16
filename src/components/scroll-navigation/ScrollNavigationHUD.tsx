import { t } from '../../i18n';
import React, { useRef } from 'react';
import { motion } from 'motion/react';
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
    scrollToSection,
    reducedMotion,
  } = useScrollNavigation(rulerRef, pathRef);

  const isMobile = geometry.isMobile;

  return (
    <div
      className="hud-overlay"
      aria-label={t("Floating navigation HUD")}
    >
      <CharacterMotionPath
        ref={pathRef}
        geometry={geometry}
      />

      <div className="fixed inset-0 pointer-events-none z-50 overflow-visible" aria-hidden="true">
        {NAVIGATION_SECTIONS.slice(1).map((sec) => (
          <div
            key={sec.id}
            data-transit-section={sec.id}
            className="hud-transit-group"
          >
            {splitCharacters(t(sec.label), sec.id).map((token) => (
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
        aria-label={t("Section shortcuts")}
      >
        <div className="hud-active-slot">
          <button data-active-header={activeSection.id} onClick={() => scrollToSection(activeSection.id)}
            className="font-sans text-[13px] sm:text-sm font-semibold tracking-[-0.02em] text-[#111111] cursor-pointer"
            aria-label={t('Current section: {section}', { section: t(activeSection.label) })} aria-current="location">
            <motion.span key={activeSection.id} className="inline-block"
              initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}>{t(activeSection.label)}</motion.span>
          </button>
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
              aria-label={t('Jump to next section {section}', { section: t(nextSection.label) })}
            >
              <span>{t("NEXT /")}{" "}{t(nextSection.label)}</span>
              <span className="text-[10px]">↗</span>
            </button>
          ) : (
            <span className="font-mono text-[10px] text-neutral-400 select-none">{t("04 / END")}</span>
          )}
        </div>
      </nav>

    </div>
  );
};
