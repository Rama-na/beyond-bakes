import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { testimonials, TESTIMONIALS_ARE_SAMPLE } from '../../data/testimonials';
import { backgroundShift } from '../../lib/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './testimonials.css';

/** Long enough to read the longest quote twice. */
const HOLD_MS = 6500;

/**
 * QUIET — kind words.
 *
 * One quote at a time, set large, crossfading on its own. The thread runs
 * along a short line under it as the timer, so the next quote never arrives
 * as a surprise. It rests while the pointer or focus is on it, while it is
 * off-screen, and entirely under reduced motion — the arrows always work.
 */
export function Testimonials() {
  const root = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  // Announce changes only when the visitor made them; autoplay stays silent.
  const [userDriven, setUserDriven] = useState(false);
  const reduced = useReducedMotion();
  const count = testimonials.length;

  const go = (dir: number, byUser = true) => {
    if (byUser) setUserDriven(true);
    setIndex((i) => (i + dir + count) % count);
  };

  const paused = hovered || !inView;
  const autoplay = !reduced && !userDriven;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      backgroundShift(el, '#fbeeed');
    });
    return () => mm.revert();
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    }
  };

  return (
    <section
      className="section words"
      id="reviews"
      ref={root}
      aria-labelledby="words-title"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      <div className="shell words__inner">
        <h2 className="micro eyebrow" id="words-title">
          Kind words
        </h2>

        <div
          className="words__stage"
          role="group"
          aria-roledescription="carousel"
          aria-label="Kind words from customers"
          onKeyDown={onKey}
        >
          <span className="words__mark display" aria-hidden="true">
            &ldquo;
          </span>

          <div className="words__slides" aria-live={userDriven ? 'polite' : 'off'}>
            {testimonials.map((t, i) => (
              <figure
                className="words__slide"
                key={t.quote}
                data-active={i === index}
                aria-hidden={i !== index}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
              >
                <blockquote className="words__quote display halo">
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption className="words__by micro">— {t.occasion}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="words__controls">
          <button className="words__arrow" onClick={() => go(-1)} aria-label="Previous quote">
            <span aria-hidden="true">←</span>
          </button>

          <span className="words__count micro" aria-hidden="true">
            {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>

          {/* The timer. Its animation ending is what moves to the next quote. */}
          <span className="words__line" aria-hidden="true">
            {autoplay && (
              <span
                className="words__fill"
                key={index}
                data-paused={paused}
                style={{ animationDuration: `${HOLD_MS}ms` }}
                onAnimationEnd={() => go(1, false)}
              />
            )}
          </span>

          <button className="words__arrow" onClick={() => go(1)} aria-label="Next quote">
            <span aria-hidden="true">→</span>
          </button>
        </div>

        {TESTIMONIALS_ARE_SAMPLE && (
          <p className="words__sample">
            Sample words for the preview — to be replaced with real ones from customers.
          </p>
        )}
      </div>
    </section>
  );
}
