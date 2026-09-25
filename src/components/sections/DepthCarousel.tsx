import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { bakes, type Bake } from '../../data/bakes';
import { Figure } from '../common/Figure';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './depth-carousel.css';

interface DepthCarouselProps {
  onOpenBake: (bake: Bake) => void;
}

/** Tuned so the photography reads as physical, not as a widget. */
const SPREAD = 58; // % of card width each step moves sideways
const DEPTH = 170; // px pushed back per step
const TILT = 12; // deg of Y-rotation per step
const FALLOFF = 0.12; // scale lost per step
const BLUR = 3; // px of blur per step
const VISIBLE = 3; // steps either side still drawn
const AUTOPLAY_MS = 4200;

export function DepthCarousel({ onOpenBake }: DepthCarouselProps) {
  const stage = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const count = bakes.length;

  /** Shortest signed distance from the active card, wrapping around the loop. */
  const offsetOf = useCallback(
    (i: number) => {
      let d = i - index;
      if (d > count / 2) d -= count;
      if (d < -count / 2) d += count;
      return d;
    },
    [index, count],
  );

  const go = useCallback((dir: number) => setIndex((i) => (i + dir + count) % count), [count]);

  // Lay the ring out. GSAP animates between arrangements so a step reads as
  // the stack physically turning rather than cards teleporting.
  useLayoutEffect(() => {
    if (reduced) return;

    cards.current.forEach((card, i) => {
      if (!card) return;
      const o = offsetOf(i);
      const away = Math.abs(o);

      gsap.to(card, {
        xPercent: o * SPREAD,
        z: -away * DEPTH,
        rotateY: -o * TILT,
        scale: Math.max(0.4, 1 - away * FALLOFF),
        opacity: away > VISIBLE ? 0 : 1,
        filter: `blur(${Math.min(away * BLUR, 10)}px)`,
        zIndex: 100 - Math.round(away * 10),
        duration: 0.9,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    });
  }, [index, reduced, offsetOf]);

  // Autoplay, held while the visitor is interacting — and while the section is
  // off-screen, so nothing animates where it cannot be seen.
  useEffect(() => {
    if (reduced || paused) return;

    const el = stage.current;
    if (!el) return;

    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        window.clearInterval(timer);
        if (entry.isIntersecting) timer = window.setInterval(() => go(1), AUTOPLAY_MS);
      },
      { threshold: 0.25 },
    );
    observer.observe(el);

    return () => {
      window.clearInterval(timer);
      observer.disconnect();
    };
  }, [reduced, paused, go]);

  // Drag / swipe
  useEffect(() => {
    const el = stage.current;
    if (!el || reduced) return;

    let startX = 0;
    let dragging = false;

    const down = (e: PointerEvent) => {
      dragging = true;
      startX = e.clientX;
      setPaused(true);
    };

    const up = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      const dx = e.clientX - startX;
      // Past this, it was a drag rather than a click on a card.
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      setPaused(false);
    };

    el.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    return () => {
      el.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
    };
  }, [go, reduced]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    }
  };

  const active = bakes[index];

  return (
    <div
      className="depth"
      data-reduced={reduced}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="depth__stage"
        ref={stage}
        onKeyDown={onKey}
        role="group"
        aria-roledescription="carousel"
        aria-label="Signature bakes"
        tabIndex={reduced ? -1 : 0}
        data-cursor="drag"
      >
        {bakes.map((bake, i) => {
          const isActive = i === index;
          return (
            <div className="depth__card" key={bake.id} ref={(n) => { cards.current[i] = n; }}>
              <button
                className="depth__hit"
                data-cursor="view"
                // A card off-centre turns the stack; the centre one opens.
                onClick={() => (isActive ? onOpenBake(bake) : setIndex(i))}
                onFocus={() => setIndex(i)}
                aria-label={
                  isActive
                    ? `View details for ${bake.name}`
                    : `Bring ${bake.name} to the front`
                }
                // Off-centre cards are blurred and partly hidden; keeping them
                // out of the tab order avoids focusing something unreadable.
                tabIndex={isActive || reduced ? 0 : -1}
              >
                <span className="depth__frame">
                  <Figure
                    src={bake.images[0]}
                    alt={bake.shortDescription}
                    objectPosition={bake.objectPosition}
                    ratio="3 / 4"
                    placeholderLabel={`Add ${bake.images[0].split('/').pop()}`}
                  />
                </span>

                {/* In the reduced-motion list every card carries its own label. */}
                <span className="depth__card-meta">
                  <span className="micro">{String(i + 1).padStart(2, '0')}</span>
                  <span className="depth__card-name display">{bake.name}</span>
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Caption for the active card, outside the 3D space so it stays crisp. */}
      {!reduced && (
        <div className="depth__readout">
          <div className="depth__label">
            <p className="depth__index micro">
              {String(index + 1).padStart(2, '0')} — {String(count).padStart(2, '0')}
            </p>
            <h3 className="depth__name display halo" key={active.id}>
              {active.name}
            </h3>
          </div>

          <div className="depth__actions">
            <button className="depth__explore micro link-underline" onClick={() => onOpenBake(active)}>
              Explore <span aria-hidden="true">→</span>
            </button>
            <div className="depth__controls">
              <button className="depth__arrow" onClick={() => go(-1)} aria-label="Previous bake">
                <span aria-hidden="true">←</span>
              </button>
              <button className="depth__arrow" onClick={() => go(1)} aria-label="Next bake">
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          <p className="sr-only" role="status">
            {active.name}. {index + 1} of {count}.
          </p>
        </div>
      )}
    </div>
  );
}
