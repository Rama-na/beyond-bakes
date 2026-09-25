import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { RevealText } from '../motion/RevealText';
import { MagneticButton } from '../motion/MagneticButton';
import { backgroundShift } from '../../lib/animations';
import './order-cta.css';

interface OrderCTAProps {
  onStartOrder: () => void;
}

/**
 * QUIET — the ask.
 *
 * A headline and a button. How ordering works is explained inside the panel
 * the button opens, at the moment it is relevant, not here.
 */
export function OrderCTA({ onStartOrder }: OrderCTAProps) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia(el);
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        '.cta__action',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 60%', once: true },
        },
      );
      backgroundShift(el, '#f8e7e9');
    });
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('.cta__action', { opacity: 1 });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="section cta" id="order" ref={root} aria-labelledby="cta-title">
      <div className="shell cta__inner">
        <p className="micro eyebrow">Made to order</p>
        <RevealText lines={["Let's make", 'it personal.']} as="h2" id="cta-title" className="cta__title display halo" />
        <div className="cta__action">
          <MagneticButton className="btn--solid cta__btn" onClick={onStartOrder}>
            Start an order
            <span className="btn-arrow" aria-hidden="true">
              →
            </span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
