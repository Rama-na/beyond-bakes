import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { brand } from '../../data/brand';
import { RevealText } from '../motion/RevealText';
import { Swoosh } from '../motion/Swoosh';
import { revealUp, backgroundShift } from '../../lib/animations';
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

    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section intro" id="intro" ref={root}>
      <div className="shell intro__grid">
        <div className="intro__headwrap">
          <RevealText lines={HEADLINE} as="h2" className="intro__headline display" />
          <Swoosh width={7} />
        </div>

        <div className="intro__col">
          <p className="intro__body lede">{brand.intro}</p>
          <p className="intro__aside body-muted">{brand.introSecondary}</p>
        </div>
      </div>

    </section>
  );
}
