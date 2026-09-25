import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './cursor.css';

const LABELS: Record<string, string> = { view: 'View', drag: 'Drag', open: 'Open' };

/**
 * A small trailing cursor that names what a pointer can do: "View" over a
 * card, "Drag" over the carousel, "Open" over the gallery.
 *
 * Desktop pointers only, and purely additive — everything it hints at is also
 * a real, focusable, labelled control.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const reduced = useReducedMotion();

  // A pointing device does not change mid-session; read it once.
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

    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const host = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor]');
      setLabel(host ? (LABELS[host.dataset.cursor ?? ''] ?? null) : null);
    };

    const onLeave = () => setLabel(null);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={dot} className="cursor" data-active={Boolean(label)} aria-hidden="true">
      <span className="cursor__label">{label}</span>
    </div>
  );
}
