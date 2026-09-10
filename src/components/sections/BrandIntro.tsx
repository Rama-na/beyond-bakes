import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { brand } from '../../data/brand';
import { RevealText } from '../motion/RevealText';
import { revealUp, backgroundShift } from '../../lib/animations';
import { prefersReducedMotion } from '../../hooks/useReducedMotion';
import './brand-intro.css';

const HEADLINE = ["There's more", 'behind every bake.'] as const;

export function BrandIntro() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      revealUp('.intro__body', { y: 30, start: 'top 84%' });
      revealUp('.intro__aside', { y: 24, delay: 0.12, start: 'top 84%' });

      // Warm white → blush as this section takes over the viewport.
      backgroundShift(el, '#fdf3f1');

      // A single hairline that draws itself down the page beside the text.
      if (!prefersReducedMotion()) {
        // pathLength=1 normalises the path so dashoffset 1 → 0 draws it fully,
        // which avoids needing the paid DrawSVG plugin.
        gsap.fromTo(
          '.intro__curve path',
          { strokeDasharray: 1, strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 70%',
              end: 'bottom 60%',
              scrub: 0.6,
            },
          },
        );
      } else {
        gsap.set('.intro__curve path', { strokeDashoffset: 0 });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section intro" id="intro" ref={root}>
      <div className="shell intro__grid">
        <RevealText lines={HEADLINE} as="h2" className="intro__headline display" />

        <div className="intro__col">
          <p className="intro__body lede">{brand.intro}</p>
          <p className="intro__aside body-muted">{brand.introSecondary}</p>
        </div>
      </div>

      {/* Decorative hairline — drawn on scroll, hidden from assistive tech. */}
      <svg
        className="intro__curve"
        viewBox="0 0 2 400"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M1 0 L1 400"
          stroke="var(--pink)"
          strokeWidth="1"
          fill="none"
          pathLength={1}
        />
      </svg>
    </section>
  );
}
