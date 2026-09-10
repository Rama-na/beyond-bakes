import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Figure } from '../common/Figure';
import { prefersReducedMotion } from '../../hooks/useReducedMotion';
import './scroll-expand.css';

/**
 * The WOW beat.
 *
 * A single photograph begins as a small contained frame and opens to full
 * bleed as the section is pinned, then the caption settles over it. One image,
 * one gesture, no competing motion — this is the moment the page hands over to
 * the photography.
 *
 * Under reduced motion the section is simply the finished state: a full-bleed
 * photograph with its caption, no pin and no scrub.
 */
export function ScrollExpand() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el.querySelector('.expand__frame'), {
        width: '100%',
        height: '100%',
        borderRadius: 0,
      });
      gsap.set(el.querySelectorAll('[data-expand-caption]'), { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        '.expand__frame',
        { width: '46%', height: '52%', borderRadius: '2px' },
        { width: '100%', height: '100%', borderRadius: '0px', ease: 'power2.inOut' },
      )
        // The photograph settles back to its true scale as the frame catches up.
        .fromTo(
          '.expand__frame .figure',
          { scale: 1.25 },
          { scale: 1, ease: 'power2.inOut' },
          0,
        )
        .fromTo(
          '[data-expand-caption]',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, stagger: 0.1, ease: 'power2.out' },
          0.55,
        );
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section className="expand" ref={root} aria-labelledby="expand-heading">
      <div className="expand__stage">
        <div className="expand__frame">
          <Figure
            src="/images/floral-event-cake.jpg"
            alt="A tiered cake set on a white arched plinth inside a florist's glasshouse, surrounded by hydrangea, roses and wildflowers"
            objectPosition="50% 46%"
            placeholderLabel="Add floral-event-cake.jpg"
          />
          <div className="expand__veil" aria-hidden="true" />
        </div>

        <div className="expand__caption">
          <p className="micro" data-expand-caption>
            A morning in a glasshouse
          </p>
          <h2 className="expand__title display" id="expand-heading" data-expand-caption>
            Made for the moments
            <br />
            <em>worth remembering.</em>
          </h2>
        </div>
      </div>
    </section>
  );
}
