import React, { forwardRef, useImperativeHandle, useRef } from 'react';

export interface ScrollProgressRulerHandle {
  updateProgress: (progress: number) => void;
}

interface Props {
  isMobile?: boolean;
  onSeek?: (percentage: number) => void;
}

const TICKS = [
  { pct: 0, label: '00' },
  { pct: 10 },
  { pct: 20 },
  { pct: 25, label: '25' },
  { pct: 30 },
  { pct: 40 },
  { pct: 50, label: '50' },
  { pct: 60 },
  { pct: 70 },
  { pct: 75, label: '75' },
  { pct: 80 },
  { pct: 90 },
  { pct: 100, label: '100' },
];

export const ScrollProgressRuler = forwardRef<ScrollProgressRulerHandle, Props>(
  ({ isMobile = false, onSeek }, ref) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const needleRef = useRef<HTMLDivElement>(null);
    const percentTextRef = useRef<HTMLSpanElement>(null);

    const rulerHeight = isMobile ? 180 : 240;

    useImperativeHandle(ref, () => ({
      updateProgress: (progress: number) => {
        const clamped = Math.max(0, Math.min(1, progress));
        const yPos = clamped * rulerHeight;

        if (needleRef.current) {
          needleRef.current.style.transform = `translateY(${yPos}px)`;
        }

        if (percentTextRef.current) {
          const pct = Math.round(clamped * 100);
          percentTextRef.current.textContent = `${String(pct).padStart(3, '0')}%`;
        }
      },
    }));

    const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!trackRef.current || !onSeek) return;
      const rect = trackRef.current.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      const ratio = Math.max(0, Math.min(1, clickY / rect.height));
      onSeek(ratio);
    };

    return (
      <aside
        className={`fixed top-1/2 -translate-y-1/2 z-50 flex items-center select-none ${
          isMobile ? 'right-2' : 'right-5'
        }`}
        aria-label="Scroll progress ruler"
      >
        <div className="flex flex-col items-end mr-2.5">
          <span
            ref={percentTextRef}
            className="font-mono text-[10px] sm:text-[11px] font-medium tracking-wider text-[#111111] tabular-nums"
            aria-live="polite"
          >
            000%
          </span>
          <span className="font-mono text-[8px] uppercase tracking-widest text-[#929292] mt-0.5">
            PAGE
          </span>
        </div>

        <div
          ref={trackRef}
          onClick={handleTrackClick}
          style={{ height: `${rulerHeight}px` }}
          className="relative w-7 flex justify-center cursor-pointer hud-interactive group py-1"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-black/10 group-hover:bg-black/25 transition-colors" />

          {TICKS.map((tick) => {
            const hasLabel = Boolean(tick.label);
            return (
              <div
                key={tick.pct}
                style={{ top: `${(tick.pct / 100) * rulerHeight}px` }}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center pointer-events-none"
              >
                <div
                  className={`bg-black/20 ${
                    hasLabel ? 'w-2.5 h-[1px] bg-black/40' : 'w-1.5 h-[1px]'
                  }`}
                />
                {!isMobile && tick.label && (
                  <span className="absolute left-3.5 font-mono text-[8px] text-[#929292] tabular-nums">
                    {tick.label}
                  </span>
                )}
              </div>
            );
          })}

          <div
            ref={needleRef}
            className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-10 transition-transform duration-75 ease-out"
            style={{ transform: 'translateY(0px)' }}
          >
            <div className="w-3.5 h-[1.5px] bg-[#111111] rounded-xs shadow-2xs" />
          </div>
        </div>
      </aside>
    );
  }
);

ScrollProgressRuler.displayName = 'ScrollProgressRuler';
