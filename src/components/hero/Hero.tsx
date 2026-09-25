import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { brand } from '../../data/brand';
import { Figure } from '../common/Figure';
import { scrollTo } from '../../hooks/useLenis';
import './hero.css';

interface HeroProps {
  /** Held until the preloader has released the page. */
  ready: boolean;
}

/** One span per letter, so the wordmark can rise a character at a time. */
function Chars({ text }: { text: string }) {
  return (
    <>
      {text.split('').map((c, i) => (
        <span className="hero__char-mask" key={i}>
          <span className="hero__char">{c}</span>
        </span>
      ))}
    </>
  );
}

/**
 * QUIET.
 *
 * The wordmark flanks a single arched photograph rather than sitting on top of
 * it, so the cake keeps its colour and the type needs no scrim. On load the
 * arch rises out of the page and the letters follow it up; on scroll the two
 * words part and the photograph leans in.
 */
export function Hero({ ready }: HeroProps) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!ready) return;
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia(el);

    mm.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        wide: '(min-width: 721px)',
      },
      (ctx) => {
        const { motion, wide } = ctx.conditions as { motion: boolean; wide: boolean };

        if (!motion) {
          gsap.set('[data-hero-in]', { opacity: 1 });
          gsap.set('.hero__char', { yPercent: 0, y: 0 });
          gsap.set('.hero__arch', { clipPath: 'inset(0% 0% 0% 0%)' });
          return;
        }

        // ---- Entrance ----
        gsap
          .timeline({ defaults: { ease: 'expo.out' } })
          .fromTo(
            '.hero__arch',
            { clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.7, ease: 'expo.inOut' },
            0,
          )
          .fromTo('.hero__arch .figure', { scale: 1.35 }, { scale: 1, duration: 2.4 }, 0.2)
          // `y: 0` on both ends matters: GSAP reads the CSS translateY(115%)
          // back as a pixel `y`, which would otherwise survive a yPercent-only
          // tween and leave every letter hidden below its mask.
          .fromTo(
            '.hero__word--l .hero__char',
            { yPercent: 115, y: 0 },
            { yPercent: 0, y: 0, duration: 1.5, stagger: 0.045 },
            0.55,
          )
          .fromTo(
            '.hero__word--r .hero__char',
            { yPercent: 115, y: 0 },
            { yPercent: 0, y: 0, duration: 1.5, stagger: 0.045 },
            0.75,
          )
          .fromTo(
            '[data-hero-in]',
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 1.3, stagger: 0.1 },
            1.2,
          );

        // ---- Exit, scrubbed against the scroll ----
        const exit = {
          trigger: el,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        };

        gsap.to('.hero__word--l', { xPercent: wide ? -38 : -12, opacity: 0, ease: 'none', scrollTrigger: exit });
        gsap.to('.hero__word--r', { xPercent: wide ? 38 : 12, opacity: 0, ease: 'none', scrollTrigger: exit });
        gsap.to('.hero__arch', { yPercent: wide ? -6 : -4, scale: 1.08, ease: 'none', scrollTrigger: exit });
        gsap.to('.hero__arch .figure', { scale: 1.14, ease: 'none', scrollTrigger: exit });
        gsap.to('[data-hero-in]', {
          opacity: 0,
          ease: 'none',
          scrollTrigger: { ...exit, end: '35% top' },
        });
      },
    );

    ScrollTrigger.refresh();
    return () => mm.revert();
  }, [ready]);

  return (
    <section className="hero" ref={root} id="top">
      <div className="hero__arch">
        <Figure
          src="/images/signature-art-cake.jpg"
          alt="A pastel palette-knife cake finished with cakesicles, a waffle cone and cocoa spheres"
          objectPosition="50% 46%"
          priority
          placeholderAlign="bottom"
        />
      </div>

      <h1 className="hero__title">
        <span className="sr-only">BeyondBakes</span>
        <span className="hero__word hero__word--l display" aria-hidden="true">
          <Chars text="Beyond" />
        </span>
        <span className="hero__word hero__word--r display" aria-hidden="true">
          <em>
            <Chars text="Bakes" />
          </em>
        </span>
      </h1>

      <p className="hero__tagline display" data-hero-in>
        {brand.tagline}
      </p>

      <div className="hero__foot shell">
        <span className="micro" data-hero-in>
          {brand.location}
        </span>
        <button
          className="hero__cue micro"
          data-hero-in
          onClick={() => scrollTo('#manifesto', -40)}
          aria-label="Scroll to discover"
        >
          Scroll
          <span className="hero__cue-line" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
