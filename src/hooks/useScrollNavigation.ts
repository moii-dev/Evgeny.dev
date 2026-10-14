import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import Lenis from 'lenis';
import { NAVIGATION_SECTIONS, NavigationSection } from '../config/navigationSections';
import { computePathGeometry, PathGeometry } from '../utils/motionPathGeometry';
import { ScrollProgressRulerHandle } from '../components/scroll-navigation/ScrollProgressRuler';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

let activeLenisInstance: Lenis | null = null;

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (activeLenisInstance) {
    activeLenisInstance.scrollTo(el, { offset: -40, duration: 1.2 });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

export function scrollToPercent(pct: number) {
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const targetY = pct * maxScroll;
  if (activeLenisInstance) {
    activeLenisInstance.scrollTo(targetY, { duration: 1.0 });
  } else {
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }
}

export function useScrollNavigation(
  rulerRef: React.RefObject<ScrollProgressRulerHandle | null>,
  pathRef: React.RefObject<SVGPathElement | null>
) {
  const [geometry, setGeometry] = useState<PathGeometry>(() =>
    computePathGeometry(
      typeof window !== 'undefined' ? window.innerWidth : 1440,
      typeof window !== 'undefined' ? window.innerHeight : 900
    )
  );

  const [activeSection, setActiveSection] = useState<NavigationSection>(NAVIGATION_SECTIONS[0]);
  const [visitedIds, setVisitedIds] = useState<string[]>([]);
  const [nextSection, setNextSection] = useState<NavigationSection | null>(NAVIGATION_SECTIONS[1]);
  const [debugMode, setDebugMode] = useState(false);

  const activeSectionRef = useRef<NavigationSection>(NAVIGATION_SECTIONS[0]);

  useEffect(() => {
    const handleResize = () => {
      const geo = computePathGeometry(window.innerWidth, window.innerHeight);
      setGeometry(geo);
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'd' || e.key === 'D') {
        setDebugMode((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      syncTouch: false,
    });
    activeLenisInstance = lenis;

    const onScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', onScroll);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const pathEl = pathRef.current;
      if (!pathEl) return;

      const masterTl = gsap.timeline({
        paused: true,
        defaults: { ease: 'none' },
      });

      const computeRanges = () => {
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        return NAVIGATION_SECTIONS.map((sec) => {
          const el = document.getElementById(sec.id);
          if (!el) return 0;
          const rect = el.getBoundingClientRect();
          const top = window.scrollY + rect.top;
          return Math.max(0, Math.min(1, (top - 80) / maxScroll));
        });
      };

      const sectionProgress = computeRanges();

      NAVIGATION_SECTIONS.forEach((sec, idx) => {
        if (idx === 0) return;

        const prevSec = NAVIGATION_SECTIONS[idx - 1];
        const targetProgress = sectionProgress[idx] || (idx / 4);
        const startTransit = Math.max(0, targetProgress - 0.10);
        const transitDuration = targetProgress - startTransit;

        const transitChars = document.querySelectorAll(
          `[data-transit-section="${sec.id}"] .hud-char-transit`
        );
        const activeHeaderPrev = document.querySelector(
          `[data-active-header="${prevSec.id}"]`
        );
        const activeHeaderCur = document.querySelector(
          `[data-active-header="${sec.id}"]`
        );
        const nextLabelCur = document.querySelector(
          `[data-next-label="${sec.id}"]`
        );

        if (activeHeaderCur) {
          gsap.set(activeHeaderCur, { opacity: 0, y: 8 });
        }

        if (activeHeaderPrev) {
          masterTl.to(
            activeHeaderPrev,
            {
              opacity: 0,
              y: -8,
              duration: transitDuration * 0.35,
            },
            startTransit
          );
        }

        if (nextLabelCur) {
          masterTl.to(
            nextLabelCur,
            {
              opacity: 0,
              duration: transitDuration * 0.25,
            },
            startTransit
          );
        }

        transitChars.forEach((charEl, cIdx) => {
          const charCount = Math.max(1, transitChars.length);
          const stagger = (cIdx / charCount) * (transitDuration * 0.3);
          const charStart = startTransit + stagger;
          const charDuration = transitDuration * 0.65;

          masterTl.to(
            charEl,
            {
              opacity: 1,
              duration: transitDuration * 0.08,
            },
            charStart
          );

          masterTl.to(
            charEl,
            {
              motionPath: {
                path: pathEl,
                align: pathEl,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 1,
              },
              duration: charDuration,
            },
            charStart
          );

          masterTl.to(
            charEl,
            {
              rotation: 0,
              duration: charDuration * 0.3,
            },
            charStart + charDuration * 0.7
          );

          masterTl.to(
            charEl,
            {
              opacity: 0,
              duration: transitDuration * 0.08,
            },
            charStart + charDuration + 0.01
          );
        });

        if (activeHeaderCur) {
          masterTl.to(
            activeHeaderCur,
            {
              opacity: 1,
              y: 0,
              duration: transitDuration * 0.3,
            },
            startTransit + transitDuration * 0.7
          );
        }
      });

      const trigger = ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        animation: masterTl,
        onUpdate: (self) => {
          const progress = self.progress;

          if (rulerRef.current) {
            rulerRef.current.updateProgress(progress);
          }

          const total = NAVIGATION_SECTIONS.length;
          let currentIdx = 0;
          for (let i = total - 1; i >= 0; i--) {
            const threshold = sectionProgress[i] || (i / (total - 1));
            if (progress >= threshold - 0.04) {
              currentIdx = i;
              break;
            }
          }

          const curSec = NAVIGATION_SECTIONS[currentIdx];
          if (activeSectionRef.current.id !== curSec.id) {
            activeSectionRef.current = curSec;
            setActiveSection(curSec);

            const visited = NAVIGATION_SECTIONS.slice(0, currentIdx).map((s) => s.id);
            setVisitedIds(visited);

            const next = currentIdx < total - 1 ? NAVIGATION_SECTIONS[currentIdx + 1] : null;
            setNextSection(next);
          }
        },
      });

      const refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);

      return () => {
        clearTimeout(refreshTimeout);
        trigger.kill();
      };
    });

    return () => {
      ctx.revert();
      lenis.destroy();
      activeLenisInstance = null;
      gsap.ticker.remove(tickerCb);
    };
  }, [geometry, pathRef, rulerRef]);

  const toggleDebug = useCallback(() => {
    setDebugMode((prev) => !prev);
  }, []);

  return {
    geometry,
    activeSection,
    visitedIds,
    nextSection,
    debugMode,
    toggleDebug,
    scrollToSection,
    scrollToPercent,
  };
}
