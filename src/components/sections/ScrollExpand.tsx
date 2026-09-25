import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { brand } from '../../data/brand';
import { Figure } from '../common/Figure';
import './scroll-expand.css';

/**
 * WOW.
 *
 * The same arch the hero opened with, now opening all the way. It begins as a
 * small arched window onto the cake and, pinned, widens until the whole
 * celebration fills the screen — the arch flattening into the edges of the
 * viewport as it goes. One line of type arrives only once the room is visible.
 */
export function ScrollExpand() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia(el);

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const frame = el.querySelector<HTMLElement>('.expand__frame');
      if (!frame) return;

      // A true semicircle on top needs a radius of half the starting width.
      const startW = () => Math.min(window.innerWidth * (window.innerWidth > 720 ? 0.3 : 0.7), 470);
      const startH = () => window.innerHeight * (window.innerWidth > 720 ? 0.64 : 0.56);

      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 1.2,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })
        .fromTo(
          frame,
          {
            width: startW,
            height: startH,
            borderTopLeftRadius: () => startW() / 2,
            borderTopRightRadius: () => startW() / 2,
          },
          {
            width: () => window.innerWidth,
            height: () => window.innerHeight,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            ease: 'power2.inOut',
          },
        )
        .fromTo('.expand__frame .figure', { scale: 1.3 }, { scale: 1, ease: 'power2.inOut' }, 0)
        .fromTo('.expand__veil', { opacity: 0 }, { opacity: 1, ease: 'none' }, 0.45)
        // `y: 0` clears the pixel offset GSAP parses from the CSS translateY.
        .fromTo(
          '.expand__line > span',
          { yPercent: 110, y: 0 },
          { yPercent: 0, y: 0, stagger: 0.12, ease: 'power3.out' },
          0.62,
        );
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('.expand__line > span', { yPercent: 0, y: 0 });
      gsap.set('.expand__veil', { opacity: 1 });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="expand" ref={root} aria-labelledby="expand-caption">
      <div className="expand__stage">
        <div className="expand__frame">
          <Figure
            src="/images/floral-event-cake.jpg"
            alt="A tiered cake on a white arched plinth inside a glasshouse, surrounded by hydrangea, roses and wildflowers"
            objectPosition="50% 52%"
          />
          <div className="expand__veil" aria-hidden="true" />
        </div>

        <h2 className="expand__caption display" id="expand-caption">
          {brand.momentLine.map((line, i) => (
            <span className="mask expand__line" key={i}>
              <span>{i === 1 ? <em>{line}</em> : line}</span>
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
