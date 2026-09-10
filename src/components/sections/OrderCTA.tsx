import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { RevealText } from '../motion/RevealText';
import { MagneticButton } from '../motion/MagneticButton';
import { revealUp, backgroundShift } from '../../lib/animations';
import './order-cta.css';

interface OrderCTAProps {
  onStartOrder: () => void;
}

/**
 * The ask. Phrased as an invitation rather than a transaction — orders are
 * taken personally at launch, and the copy says so plainly.
 */
export function OrderCTA({ onStartOrder }: OrderCTAProps) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      revealUp('.cta__body', { y: 26, start: 'top 84%' });
      revealUp('.cta__action', { y: 26, delay: 0.1, start: 'top 84%' });
      backgroundShift(el, '#f7e6e8');
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section cta" id="order" ref={root}>
      <div className="shell cta__inner">
        <RevealText
          lines={["Let's make", 'it personal.']}
          as="h2"
          className="cta__headline display"
        />

        <p className="cta__body lede">
          Tell us what you&rsquo;re celebrating and we&rsquo;ll take it from there. Every
          order starts as a conversation — it is the only way we know how to get it right.
        </p>

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
