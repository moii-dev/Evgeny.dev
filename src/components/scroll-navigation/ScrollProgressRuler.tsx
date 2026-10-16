import { t } from '../../i18n';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { NAVIGATION_SECTIONS } from '../../config/navigationSections';

export interface ScrollProgressRulerHandle {
  updateProgress: (progress: number) => void;
}

interface Props {
  isMobile?: boolean;
  activeSectionId: string;
  visitedIds: string[];
  onSelectSection: (id: string) => void;
}

export const ScrollProgressRuler = forwardRef<ScrollProgressRulerHandle, Props>(
  ({ isMobile = false, activeSectionId, visitedIds, onSelectSection }, ref) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const needleRef = useRef<HTMLDivElement>(null);
    const percentTextRef = useRef<HTMLSpanElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    const railHeight = isMobile ? 160 : 200;

    useImperativeHandle(ref, () => ({
      updateProgress: (progress: number) => {
        const clamped = Math.max(0, Math.min(1, progress));
        progressRef.current?.setAttribute('aria-valuenow', String(Math.round(clamped * 100)));
        const yPos = clamped * railHeight;

        if (needleRef.current) {
          needleRef.current.style.transform = `translateY(${yPos}px)`;
        }

        if (percentTextRef.current) {
          const pct = Math.round(clamped * 100);
          percentTextRef.current.textContent = `${String(pct).padStart(2, '0')}%`;
        }
      },
    }));

    const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      const ratio = Math.max(0, Math.min(1, clickY / rect.height));

      const total = NAVIGATION_SECTIONS.length;
      const targetIndex = Math.min(total - 1, Math.max(0, Math.round(ratio * (total - 1))));
      onSelectSection(NAVIGATION_SECTIONS[targetIndex].id);
    };

    return (
      <div className="flex flex-col items-center select-none" aria-label={t("Section navigation rail")}>
        <div
          ref={trackRef}
          onClick={handleTrackClick}
          style={{ height: `${railHeight}px` }}
          className="relative w-6 flex justify-center cursor-pointer hud-interactive group"
        >
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-black/10 group-hover:bg-black/25 transition-colors" />

          {NAVIGATION_SECTIONS.map((sec, index) => {
            const isActive = activeSectionId === sec.id;
            const isVisited = visitedIds.includes(sec.id);
            const topPct = (index / (NAVIGATION_SECTIONS.length - 1)) * 100;

            let markerColor = '#DDDDDD';
            if (isActive) {
              markerColor = '#111111';
            } else if (isVisited) {
              markerColor = '#999999';
            }

            return (
              <div
                key={sec.id}
                style={{ top: `${topPct}%` }}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 group/marker"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectSection(sec.id);
                  }}
                  className="relative p-1.5 flex items-center justify-center cursor-pointer transition-transform duration-150 hover:scale-125 focus:outline-none"
                  aria-label={t('Go to section {section}', { section: t(sec.label) })}
                  aria-current={isActive ? 'location' : undefined}
                >
                  <span
                    style={{ backgroundColor: markerColor }}
                    className={`block rounded-full transition-all duration-200 ${
                      isActive ? 'w-2 h-2 ring-2 ring-black/20 ring-offset-1' : 'w-1.5 h-1.5'
                    }`}
                  />

                  <span className="absolute right-6 opacity-0 group-hover/marker:opacity-100 pointer-events-none transition-all duration-150 translate-x-1 group-hover/marker:translate-x-0 whitespace-nowrap px-2 py-0.5 rounded bg-white/95 backdrop-blur-sm border border-neutral-200/90 shadow-2xs font-mono text-[10px] text-[#111111] z-30 font-medium">
                    {sec.index}. {t(sec.label)}
                  </span>
                </button>
              </div>
            );
          })}

          <div
            ref={needleRef}
            className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-10 will-change-transform"
            style={{ transform: 'translateY(0px)' }}
          >
            <div ref={progressRef} role="progressbar" aria-label={t("Page scroll progress")} aria-valuemin={0} aria-valuemax={100} aria-valuenow={0} className="w-2.5 h-[1.5px] bg-[#111111] -translate-x-1/2 rounded-xs" />
          </div>
        </div>

        <div className="mt-2.5 flex items-center justify-center">
          <span
            ref={percentTextRef}
            className="font-mono text-[10px] font-medium tracking-tight text-[#111111] tabular-nums"
            aria-hidden="true"
          >
            00%
          </span>
        </div>
      </div>
    );
  }
);

ScrollProgressRuler.displayName = 'ScrollProgressRuler';
