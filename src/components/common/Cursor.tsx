import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './cursor.css';

/**
 * A small trailing cursor that shows "View" over signature cards.
 *
 * Desktop pointers only. It is decorative and additive — every affordance it
 * hints at is also a real, focusable control, so nothing is lost without it.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const reduced = useReducedMotion();

  // Read once at mount rather than from an effect — a pointing device does not
  // change mid-session, and this avoids a second render on load.
  const [finePointer] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  );

  const enabled = finePointer && !reduced;

  useEffect(() => {
    if (!enabled) return;
    const el = dot.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.42, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.42, ease: 'power3' });

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      // data-cursor="view" anywhere up the tree turns the label on.
      const target = e.target as HTMLElement | null;
      setActive(Boolean(target?.closest('[data-cursor="view"]')));
    };

    const onLeave = () => setActive(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={dot} className="cursor" data-active={active} aria-hidden="true">
      <span className="cursor__label">View</span>
    </div>
  );
}
