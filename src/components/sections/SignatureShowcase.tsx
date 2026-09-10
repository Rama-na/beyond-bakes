import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { bakes, type Bake } from '../../data/bakes';
import { SignatureCard } from './SignatureCard';
import { RevealText } from '../motion/RevealText';
import { prefersReducedMotion } from '../../hooks/useReducedMotion';
import './signature-showcase.css';

/** Below this width the pinned horizontal scroll is replaced by a swipe rail. */
const PIN_MIN_WIDTH = 901;

interface SignatureShowcaseProps {
  onOpenBake: (bake: Bake) => void;
}

export function SignatureShowcase({ onOpenBake }: SignatureShowcaseProps) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [canPin, setCanPin] = useState(false);

  // Decide the mode from the viewport, and re-decide if it changes.
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${PIN_MIN_WIDTH}px)`);
    const update = () => setCanPin(mq.matches && !prefersReducedMotion());
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useLayoutEffect(() => {
    const section = root.current;
    const el = track.current;
    if (!section || !el || !canPin) return;

    const ctx = gsap.context(() => {
      // Distance is measured, never hardcoded, and re-measured on refresh.
      const distance = () => Math.max(0, el.scrollWidth - window.innerWidth);

      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${distance()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Progress rail, driven by the same scroll.
      gsap.to('.sigs__progress-bar', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.kill();
      };
    }, section);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [canPin]);

  const intro = (
    <div className="sigs__intro">
      <p className="micro">Our signatures</p>
      <RevealText
        lines={['Four we', 'come back to.']}
        as="h2"
        className="sigs__headline display"
      />
      <p className="body-muted sigs__note">
        Everything is made to order, so nothing here is a fixed menu — these are simply
        the ones people ask for most.
      </p>
      <p className="sigs__hint micro" aria-hidden="true">
        {canPin ? 'Scroll →' : 'Swipe →'}
      </p>
    </div>
  );

  return (
    <section
      className="sigs"
      id="signatures"
      ref={root}
      data-mode={canPin ? 'pinned' : 'rail'}
    >
      {/* In rail mode the intro is a normal block above the swipe track, so it
          never becomes a slide the reader has to scroll past. */}
      {!canPin && <div className="shell sigs__intro-block">{intro}</div>}

      <div className="sigs__viewport">
        <div className="sigs__track" ref={track}>
          {canPin && intro}

          {bakes.map((bake, i) => (
            <SignatureCard key={bake.id} bake={bake} index={i} onOpen={onOpenBake} />
          ))}
        </div>
      </div>

      {canPin && (
        <div className="sigs__progress" aria-hidden="true">
          <span className="sigs__progress-bar" />
        </div>
      )}
    </section>
  );
}
