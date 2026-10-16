import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { lockPageScroll } from '../utils/scrollController';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
}

// Native modal dialogs provide a top-layer stack, inert background, focus containment
// and focus restoration, including catalog → details → catalog transitions.
export function Modal({ isOpen, onClose, label, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  useLayoutEffect(() => {
    const dialog = ref.current;
    if (!isOpen || !dialog) return;
    const unlock = lockPageScroll();
    dialog.showModal();
    return () => { dialog.close(); unlock(); };
  }, [isOpen]);

  return (
    <dialog ref={ref} aria-label={label} data-lenis-prevent
      className="app-dialog" onCancel={event => { event.preventDefault(); onClose(); }}
      onKeyDown={event => {
        if (event.key !== 'Tab') return;
        const elements = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
          'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
        )).filter(el => el.tabIndex >= 0 && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden');
        const first = elements[0];
        const last = elements.at(-1);
        if (!first) { event.preventDefault(); event.currentTarget.focus(); }
        else if (event.shiftKey && (document.activeElement === first || document.activeElement === event.currentTarget)) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }}>
      {isOpen && children}
    </dialog>
  );
}
