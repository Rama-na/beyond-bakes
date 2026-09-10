import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { brand } from '../../data/brand';
import { Figure } from '../common/Figure';
import { scrollTo } from '../../hooks/useLenis';
import { prefersReducedMotion } from '../../hooks/useReducedMotion';
import './hero.css';

interface HeroProps {
  /** Held until the preloader has released the page. */
  ready: boolean;
}

export function Hero({ ready }: HeroProps) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!ready) return;
    const el = root.current;
    if (!el) return;

    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      // ---- Entrance ----
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      if (reduced) {
        tl.to('[data-hero-fade]', { opacity: 1, duration: 0.5, stagger: 0.05 });
      } else {
        tl.to('.hero__frame', { opacity: 1, duration: 0.6 }, 0)
          .fromTo(
            '.hero__frame .figure',
            { scale: 1.09 },
            { scale: 1, duration: 2.2, ease: 'power2.out' },
            0,
          )
          .fromTo(
            '.hero__word--one .hero__word-inner',
            { yPercent: 112 },
            { yPercent: 0, duration: 1.35 },
            0.15,
          )
          .fromTo(
            '.hero__word--two .hero__word-inner',
            { yPercent: 112 },
            { yPercent: 0, duration: 1.35 },
            0.29,
          )
          .fromTo(
            '.hero__tagline',
            { y: 22, opacity: 0 },
            { y: 0, opacity: 1, duration: 1 },
            0.75,
          )
          .fromTo('.hero__meta', { opacity: 0 }, { opacity: 1, duration: 0.9 }, 0.9)
          .fromTo('.hero__cue', { opacity: 0 }, { opacity: 1, duration: 0.9 }, 1.05);
      }

      // ---- Exit on scroll ----
      if (!reduced) {
        gsap.to('.hero__type', {
          yPercent: -18,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        gsap.to('.hero__frame', {
          yPercent: 6,
          scale: 1.04,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        gsap.to('.hero__cue', {
          opacity: 0,
          scrollTrigger: { trigger: el, start: 'top top', end: '+=200', scrub: true },
        });
      }
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [ready]);

  return (
    <section className="hero" ref={root} id="top">
      <div className="hero__frame">
        <Figure
          src="/images/signature-art-cake.jpg"
          alt="A pastel palette-knife cake finished with cakesicles, a waffle cone and cocoa spheres"
          objectPosition="50% 42%"
          priority
          placeholderLabel="Hero photograph — add signature-art-cake.jpg"
          placeholderAlign="bottom"
        />
        <div className="hero__scrim" aria-hidden="true" />
      </div>

      <div className="hero__type shell">
        <h1 className="hero__title display">
          <span className="hero__word hero__word--one" data-hero-fade>
            <span className="hero__word-inner">Beyond</span>
          </span>
          <span className="hero__word hero__word--two" data-hero-fade>
            <span className="hero__word-inner">Bakes</span>
          </span>
        </h1>

        <p className="hero__tagline display" data-hero-fade>
          {brand.tagline}
        </p>
      </div>

      <div className="hero__foot shell">
        <span className="hero__meta micro" data-hero-fade>
          {brand.location}
        </span>

        <button
          className="hero__cue"
          data-hero-fade
          onClick={() => scrollTo('#intro', -60)}
          aria-label="Scroll to discover"
        >
          <span className="micro">Scroll to discover</span>
          <span className="hero__cue-line" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
