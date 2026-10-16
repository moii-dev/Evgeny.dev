import type Lenis from 'lenis';

let instance: Lenis | null = null;
let locks = 0;
export const getScrollController = () => instance;
export const isScrollLocked = () => locks > 0;
export function setScrollController(next: Lenis | null) {
  instance = next;
  if (locks) instance?.stop();
}

export function lockPageScroll(): () => void {
  const body = document.body;
  const html = document.documentElement;
  if (locks++ === 0) {
    body.dataset.previousOverflow = body.style.overflow;
    html.dataset.previousOverflow = html.style.overflow;
    body.style.overflow = html.style.overflow = 'hidden';
    instance?.stop();
  }
  let released = false;
  return () => {
    if (released) return;
    released = true;
    if (--locks === 0) {
      body.style.overflow = body.dataset.previousOverflow || '';
      html.style.overflow = html.dataset.previousOverflow || '';
      delete body.dataset.previousOverflow;
      delete html.dataset.previousOverflow;
      instance?.start();
    }
  };
}

export function scrollToElement(element: HTMLElement, center = false) {
  if (locks) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const offset = center ? -(window.innerHeight - element.offsetHeight) / 2 : -40;
  if (instance) instance.scrollTo(element, { offset, duration: 1.2, immediate: reduced });
  else window.scrollTo({ top: window.scrollY + element.getBoundingClientRect().top + offset, behavior: reduced ? 'instant' : 'smooth' });
}

export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) scrollToElement(element);
}
