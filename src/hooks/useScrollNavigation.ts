import { useEffect, useRef, useState, useCallback, type RefObject } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import Lenis from 'lenis';
import { NAVIGATION_SECTIONS } from '../config/navigationSections';
import { computePathGeometry } from '../utils/motionPathGeometry';
import type { ScrollProgressRulerHandle } from '../components/scroll-navigation/ScrollProgressRuler';
import { setScrollController, scrollToSection } from '../utils/scrollController';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export function useScrollNavigation(
  rulerRef: RefObject<ScrollProgressRulerHandle | null>,
  pathRef: RefObject<SVGPathElement | null>
) {
  const [geometry, setGeometry] = useState(() => computePathGeometry(window.innerWidth, window.innerHeight));
  const [activeSection, setActiveSection] = useState(NAVIGATION_SECTIONS[0]);
  const [layoutVersion, setLayoutVersion] = useState(0);
  const [debugMode, setDebugMode] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const resizeFrame = useRef(0);

  useEffect(() => {
    const resize = () => {
      cancelAnimationFrame(resizeFrame.current);
      resizeFrame.current = requestAnimationFrame(() => setGeometry(computePathGeometry(window.innerWidth, window.innerHeight)));
    };
    const keyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement && (event.target.isContentEditable || event.target.closest('input, textarea, dialog'))) return;
      if (!event.ctrlKey && !event.metaKey && !event.altKey && event.key.toLowerCase() === 'd') setDebugMode(previous => !previous);
    };
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('keydown', keyDown);
    let frame = 0;
    let disposed = false;
    const refreshLayout = () => {
      if (disposed) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setLayoutVersion(version => version + 1));
    };
    const observer = new ResizeObserver(refreshLayout);
    for (const section of NAVIGATION_SECTIONS) {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    }
    observer.observe(document.body);
    void document.fonts.ready.then(refreshLayout);
    return () => {
      disposed = true; observer.disconnect(); cancelAnimationFrame(frame); cancelAnimationFrame(resizeFrame.current);
      window.removeEventListener('resize', resize); window.removeEventListener('keydown', keyDown);
    };
  }, []);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, syncTouch: false });
    setScrollController(lenis);
    const update = () => ScrollTrigger.update();
    lenis.on('scroll', update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); lenis.off('scroll', update); lenis.destroy(); setScrollController(null); };
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const ranges = NAVIGATION_SECTIONS.map(section => {
      const element = document.getElementById(section.id);
      return element ? Math.max(0, Math.min(1, (window.scrollY + element.getBoundingClientRect().top - 140) / maxScroll)) : 0;
    });
    const updateUI = (progress: number) => {
      rulerRef.current?.updateProgress(progress);
      let current = 0;
      for (let i = ranges.length - 1; i >= 0; i--) {
        if (progress + 1 / maxScroll >= ranges[i]) { current = i; break; }
      }
      setActiveSection(previous => previous.id === NAVIGATION_SECTIONS[current].id ? previous : NAVIGATION_SECTIONS[current]);
    };
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ paused: true, defaults: { ease: 'none' } });
      // Keep normalized timeline time equal to document progress, including the tail after CONTACT.
      timeline.to({}, { duration: 1 }, 0);
      NAVIGATION_SECTIONS.slice(1).forEach((section, index) => {
        const chars = document.querySelectorAll<HTMLElement>(`[data-transit-section="${section.id}"] .hud-char-transit`);
        gsap.set(chars, { opacity: 0 });
        if (reducedMotion) return;
        const end = ranges[index + 1];
        const start = Math.max(0, end - 0.1);
        const duration = end - start;
        if (duration <= 0) return;
        chars.forEach((char, charIndex) => {
          const charStart = start + charIndex / chars.length * duration * 0.3;
          const charDuration = duration * 0.65;
          timeline.to(char, { opacity: 1, duration: duration * 0.08 }, charStart);
          timeline.to(char, { motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: true, start: 0, end: 1 }, duration: charDuration }, charStart);
          timeline.to(char, { rotation: 0, duration: charDuration * 0.3 }, charStart + charDuration * 0.7);
          timeline.to(char, { opacity: 0, duration: Math.min(duration * 0.08, Math.max(0, end - charStart - charDuration)) }, charStart + charDuration);
        });
      });
      const trigger = ScrollTrigger.create({
        trigger: document.body, start: 'top top', end: 'bottom bottom',
        scrub: reducedMotion ? true : 0.5, animation: timeline,
        onUpdate: self => updateUI(self.progress),
      });
      trigger.refresh();
      const progress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
      timeline.progress(progress);
      updateUI(progress);
    });
    return () => context.revert();
  }, [geometry, layoutVersion, reducedMotion, pathRef, rulerRef]);

  const activeIndex = NAVIGATION_SECTIONS.findIndex(section => section.id === activeSection.id);
  const toggleDebug = useCallback(() => setDebugMode(previous => !previous), []);
  return { geometry, activeSection, visitedIds: NAVIGATION_SECTIONS.slice(0, activeIndex).map(section => section.id),
    nextSection: NAVIGATION_SECTIONS[activeIndex + 1] || null, debugMode, toggleDebug, scrollToSection, reducedMotion };
}
