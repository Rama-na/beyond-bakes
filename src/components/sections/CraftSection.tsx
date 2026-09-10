import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { craft } from '../../data/craft';
import { RevealText } from '../motion/RevealText';
import { ParallaxImage } from '../motion/ParallaxImage';
import { revealUp, clipReveal, backgroundShift } from '../../lib/animations';
import './craft-section.css';

export function CraftSection() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      revealUp('.craft__standfirst', { y: 28, start: 'top 84%' });

      // Each row: the frame opens, then the word and copy arrive.
      el.querySelectorAll('.craft__row').forEach((row) => {
        const frame = row.querySelector('.craft__frame');
        if (frame) clipReveal(frame, { start: 'top 78%' });

        revealUp(row.querySelectorAll('[data-craft-reveal]'), {
          y: 30,
          start: 'top 78%',
          stagger: 0.08,
        });
      });

      backgroundShift(el, '#fdf3f1');
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section craft" id="craft" ref={root}>
      <div className="shell">
        <header className="craft__head">
          <p className="micro">The craft</p>
          <RevealText
            lines={['Made with', 'intention.']}
            as="h2"
            className="craft__headline display"
          />
          <p className="craft__standfirst lede">{craft.standfirst}</p>
        </header>

        <div className="craft__rows">
          {craft.sections.map((s, i) => (
            <article className="craft__row" key={s.title} data-flip={i % 2 === 1}>
              <div className="craft__frame">
                {s.image && (
                  <ParallaxImage
                    src={s.image}
                    alt=""
                    objectPosition={s.objectPosition}
                    ratio="4 / 5"
                    strength={10}
                    placeholderLabel={`Add ${s.image.split('/').pop()}`}
                  />
                )}
              </div>

              <div className="craft__text">
                <span className="craft__label micro" data-craft-reveal>
                  {s.label}
                </span>
                <h3 className="craft__word display" data-craft-reveal>
                  {s.title}
                </h3>
                <p className="craft__body body-muted" data-craft-reveal>
                  {s.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
