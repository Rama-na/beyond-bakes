import { useRef, type ReactNode, type MouseEvent } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
  /** How far the button leans toward the cursor, in px. */
  strength?: number;
  ariaLabel?: string;
  type?: 'button' | 'submit';
}

/**
 * A button that leans very slightly toward the cursor.
 *
 * Pointer-driven only — disabled for touch (no cursor to follow) and for
 * reduced motion. The lean is deliberately small; past a few pixels it stops
 * feeling refined and starts feeling like a toy.
 */
export function MagneticButton({
  children,
  onClick,
  className = '',
  href,
  strength = 9,
  ariaLabel,
  type = 'button',
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || reduced) return;
    // Coarse pointers have no hover position worth tracking.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.6,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' });
  };

  const shared = {
    className: `btn ${className}`,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    'aria-label': ariaLabel,
  };

  if (href) {
    return (
      <a
        {...shared}
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button {...shared} ref={ref as React.Ref<HTMLButtonElement>} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
