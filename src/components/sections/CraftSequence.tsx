import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { craft } from '../../data/craft';
import { Figure } from '../common/Figure';
import { backgroundShift } from '../../lib/animations';
import './craft-sequence.css';

/**
 * The craft, as a sequence rather than a list.
 *
 * Pinned on larger screens: four words take turns in the same place while
 * their photographs wipe up one over another, and the scroll snaps to each
 * step so nothing is ever caught half-way. Four words and four short lines
 * carry what used to take four paragraphs.
 *
 * On phones and under reduced motion the same markup simply stacks.
 */
export function CraftSequence() {
  const root = useRef<HTMLElement>(null);
  const steps = craft.steps;

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia(el);

    mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(el);
      const stepEls = q('.craft__step');
      const n = stepEls.length;

      // Initial state: step one showing, the rest waiting below their masks.
      stepEls.forEach((step, i) => {
        if (i === 0) return;
        gsap.set(step.querySelector('.craft__media'), { clipPath: 'inset(100% 0% 0% 0%)' });
        gsap.set(step.querySelectorAll('.craft__rise'), { yPercent: 115 });
        gsap.set(step.querySelector('.craft__line'), { opacity: 0, y: 16 });
      });
      gsap.set(q('.craft__bar-fill'), { scaleX: 0 });
      gsap.set(q('.craft__bar-fill')[0], { scaleX: 1 });

      const tl = gsap.timeline({
        defaults: { ease: 'power3.inOut', duration: 1 },
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: () => `+=${window.innerHeight * (n - 1) * 1.1}`,
          pin: true,
          scrub: 0.9,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          snap: {
            snapTo: 'labelsDirectional',
            duration: { min: 0.25, max: 0.7 },
            delay: 0.05,
            ease: 'power2.inOut',
          },
        },
      });

      tl.addLabel('step-0');
      for (let i = 1; i < n; i++) {
        const prev = stepEls[i - 1];
        const next = stepEls[i];
        const at = `step-${i - 1}+=0.15`;

        tl.to(prev.querySelectorAll('.craft__rise'), { yPercent: -115, stagger: 0.04 }, at)
          .to(prev.querySelector('.craft__line'), { opacity: 0, y: -12, duration: 0.5 }, at)
          .to(prev.querySelector('.craft__media .figure'), { scale: 1.12 }, at)
          .to(next.querySelector('.craft__media'), { clipPath: 'inset(0% 0% 0% 0%)' }, at)
          .fromTo(next.querySelector('.craft__media .figure'), { scale: 1.3 }, { scale: 1 }, at)
          .to(next.querySelectorAll('.craft__rise'), { yPercent: 0, stagger: 0.05 }, `${at}+=0.25`)
          .to(next.querySelector('.craft__line'), { opacity: 1, y: 0, duration: 0.6 }, `${at}+=0.45`)
          .to(q('.craft__bar-fill')[i], { scaleX: 1, ease: 'power2.out' }, at)
          .addLabel(`step-${i}`);
      }

      backgroundShift(el, '#fbf1ef');
    });

    // Stacked layout: a plain reveal per step, no pin.
    mm.add('(max-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>(el.querySelectorAll('.craft__step')).forEach((step) => {
        gsap.fromTo(
          step.querySelector('.craft__media'),
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.4,
            ease: 'expo.inOut',
            scrollTrigger: { trigger: step, start: 'top 82%', once: true },
          },
        );
        gsap.fromTo(
          step.querySelectorAll('.craft__rise'),
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 1.2,
            ease: 'expo.out',
            stagger: 0.06,
            scrollTrigger: { trigger: step, start: 'top 70%', once: true },
          },
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="craft" id="craft" ref={root} aria-labelledby="craft-title">
      <div className="craft__pin">
        <header className="craft__head">
          <p className="micro eyebrow">The craft</p>
          <h2 className="craft__title display halo" id="craft-title">
            {craft.headline[0]} <em>{craft.headline[1]}</em>
          </h2>
        </header>

        <div className="craft__steps">
          {steps.map((step, i) => (
            <article className="craft__step" key={step.title}>
              <div className="craft__copy">
                <span className="mask craft__num">
                  <span className="craft__rise micro">
                    {String(i + 1).padStart(2, '0')} — {String(steps.length).padStart(2, '0')}
                  </span>
                </span>
                <h3 className="mask craft__word display halo">
                  <span className="craft__rise">{step.title}</span>
                </h3>
                <p className="craft__line display halo">{step.line}</p>
              </div>

              <div className="craft__media">
                <Figure src={step.image} alt={step.alt} objectPosition={step.objectPosition} />
              </div>
            </article>
          ))}
        </div>

        <div className="craft__progress" aria-hidden="true">
          {steps.map((s) => (
            <span className="craft__bar" key={s.title}>
              <span className="craft__bar-fill" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
