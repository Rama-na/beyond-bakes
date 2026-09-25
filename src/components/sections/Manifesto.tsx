import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { brand } from '../../data/brand';
import { backgroundShift } from '../../lib/animations';
import './manifesto.css';

/**
 * MOVEMENT.
 *
 * One sentence, and nothing else. Each word starts faint and fills in as the
 * reader scrolls past it, so the statement is read at the pace it is drawn —
 * the page's only real paragraph is also its slowest moment.
 */
export function Manifesto() {
  const root = useRef<HTMLElement>(null);

  // Split by sentence first, so the second sentence can be set apart however
  // the copy is edited — styling must not depend on a word count.
  const sentences = brand.manifesto.match(/[^.!?]+[.!?]*/g)?.map((s) => s.trim()) ?? [
    brand.manifesto,
  ];

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia(el);
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        '.manifesto__word',
        { opacity: 0.12, y: 12 },
        {
          opacity: 1,
          y: 0,
          ease: 'none',
          stagger: 0.06,
          scrollTrigger: {
            trigger: '.manifesto__text',
            start: 'top 78%',
            end: 'bottom 45%',
            scrub: 0.8,
          },
        },
      );

      backgroundShift(el, '#fbf0ef');
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('.manifesto__word', { opacity: 1, y: 0 });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="section manifesto" id="manifesto" ref={root}>
      <div className="shell manifesto__inner">
        <p className="manifesto__text display halo">
          {sentences.map((sentence, si) => (
            <span className={`manifesto__sentence manifesto__sentence--${si}`} key={si}>
              {sentence.split(' ').map((w, wi) => (
                <span className="manifesto__word" key={wi}>
                  {w}{' '}
                </span>
              ))}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
