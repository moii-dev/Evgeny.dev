import { t } from '../i18n';
import { useEffect, useLayoutEffect, useRef, useState, useCallback, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import './CustomCursor.css';
import { getActiveModal, subscribeModalLayers } from '../utils/modalLayers';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isFinPointer, setIsFinPointer] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const activeModal = useSyncExternalStore(subscribeModalLayers, getActiveModal, () => null);
  const position = useRef({ x: 0, y: 0 });

  const xTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const yTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const activeMagnetic = useRef<HTMLElement | null>(null);

  const handleMouseEnterDoc = useCallback(() => setIsVisible(true), []);
  const handleMouseLeaveDoc = useCallback(() => setIsVisible(false), []);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    setIsFinPointer(finePointer);
  }, []);

  useLayoutEffect(() => {
    if (!isFinPointer || prefersReducedMotion) return;

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!cursor || !ring || !dot || !label) return;

    document.documentElement.classList.add('custom-cursor-active');

    gsap.set(cursor, { xPercent: -50, yPercent: -50, x: position.current.x, y: position.current.y });

    xTo.current = gsap.quickTo(cursor, 'x', { duration: 0.5, ease: 'power3' });
    yTo.current = gsap.quickTo(cursor, 'y', { duration: 0.5, ease: 'power3' });

    const onMouseMove = (e: MouseEvent) => {
      position.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
      xTo.current?.(e.clientX);
      yTo.current?.(e.clientY);

      if (activeMagnetic.current) {
        const el = activeMagnetic.current;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.max(rect.width, rect.height) * 1.5;

        if (dist < maxDist) {
          const strength = 0.3;
          gsap.to(el, {
            x: dx * strength,
            y: dy * strength,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const viewTarget = target.closest('[data-cursor="view"]');
      if (viewTarget) {
        gsap.to(ring, { scale: 2, duration: 0.3, ease: 'power2.out' });
        gsap.to(dot, { scale: 0, duration: 0.3, ease: 'power2.out' });
        gsap.to(label, { opacity: 1, duration: 0.2 });
        return;
      }

      const interactive = target.closest('a, button, [data-cursor]');
      if (interactive) {
        gsap.to(ring, { scale: 1.5, duration: 0.3, ease: 'power2.out' });
        gsap.to(dot, { scale: 0.5, duration: 0.3, ease: 'power2.out' });
      }

      const magnetic = target.closest('[data-magnetic]') as HTMLElement | null;
      if (magnetic) {
        activeMagnetic.current = magnetic;
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const viewTarget = target.closest('[data-cursor="view"]');
      if (viewTarget) {
        gsap.to(ring, { scale: 1, duration: 0.3, ease: 'power2.out' });
        gsap.to(dot, { scale: 1, duration: 0.3, ease: 'power2.out' });
        gsap.to(label, { opacity: 0, duration: 0.2 });
        return;
      }

      const interactive = target.closest('a, button, [data-cursor]');
      if (interactive) {
        gsap.to(ring, { scale: 1, duration: 0.3, ease: 'power2.out' });
        gsap.to(dot, { scale: 1, duration: 0.3, ease: 'power2.out' });
      }

      const magnetic = target.closest('[data-magnetic]') as HTMLElement | null;
      if (magnetic) {
        gsap.to(magnetic, {
          x: 0,
          y: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.4)',
        });
        activeMagnetic.current = null;
      }
    };

    document.addEventListener('mouseenter', handleMouseEnterDoc);
    document.addEventListener('mouseleave', handleMouseLeaveDoc);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      document.removeEventListener('mouseenter', handleMouseEnterDoc);
      document.removeEventListener('mouseleave', handleMouseLeaveDoc);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      xTo.current = null;
      yTo.current = null;
      activeMagnetic.current = null;
      gsap.killTweensOf(cursor);
      gsap.killTweensOf(ring);
      gsap.killTweensOf(dot);
      gsap.killTweensOf(label);
    };
  }, [isFinPointer, prefersReducedMotion, activeModal, handleMouseEnterDoc, handleMouseLeaveDoc]);

  if (!isFinPointer || prefersReducedMotion) return null;

  return createPortal(
    <div
      ref={cursorRef}
      data-custom-cursor
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div
        ref={ringRef}
        className="pointer-events-none flex h-10 w-10 items-center justify-center rounded-full border border-white/50"
      >
        <span
          ref={labelRef}
          className="pointer-events-none select-none text-xs font-medium text-white opacity-0"
        >{t("View")}</span>
      </div>
      <div
        ref={dotRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
      />
    </div>,
    activeModal ?? document.body
  );
};
