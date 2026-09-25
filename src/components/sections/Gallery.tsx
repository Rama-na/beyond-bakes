import { useLayoutEffect, useRef, type CSSProperties } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { galleryRows } from '../../data/socialGallery';
import { brand } from '../../data/brand';
import { Figure } from '../common/Figure';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './gallery.css';

/** Copies of each row laid end to end — enough to cover a very wide screen twice. */
const REPEAT = 2;
/** Seconds for one full loop at rest. Slow enough to read as drift, not motion. */
const LOOP_SECONDS = 60;

/**
 * MOVEMENT.
 *
 * A filmstrip of photographs drifting across the page. Scrolling speeds it up
 * and it eases back to a drift when you stop; resting the pointer on it slows
 * it almost to a halt so a single photograph can be looked at. Further rows
 * drift the opposite way.
 *
 * Each row is rendered several times end to end and moved by exactly half its
 * width, which is what makes the loop seamless. Only the first copy is exposed
 * to assistive tech; the rest are decoration.
 */
export function Gallery() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  // Still, there is nothing to loop — render each photograph once.
  const copies = reduced ? 1 : REPEAT * 2;

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia(el);

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tracks = gsap.utils.toArray<HTMLElement>(el.querySelectorAll('.gallery__track'));

      const loops = tracks.map((track, i) =>
        gsap.fromTo(
          track,
          { xPercent: i % 2 === 0 ? 0 : -50 },
          { xPercent: i % 2 === 0 ? -50 : 0, duration: LOOP_SECONDS, ease: 'none', repeat: -1 },
        ),
      );

      let hovering = false;
      const settle = (scale: number, duration = 0.8) =>
        loops.forEach((t) => gsap.to(t, { timeScale: scale, duration, ease: 'power2.out', overwrite: true }));

      // One debounced relax, restarted on every scroll frame, rather than a new
      // delayed call per frame piling up during a long scroll.
      const relax = gsap.delayedCall(0.3, () => !hovering && settle(1, 1.2)).pause();

      // Scroll velocity pushes the drift; it relaxes back on its own.
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          if (hovering) return;
          const boost = gsap.utils.clamp(1, 7, 1 + Math.abs(self.getVelocity()) / 260);
          loops.forEach((t) => gsap.to(t, { timeScale: boost, duration: 0.25, overwrite: true }));
          relax.restart(true);
        },
        // Nothing animates while the section is out of sight.
        onToggle: (self) => loops.forEach((t) => (self.isActive ? t.play() : t.pause())),
      });

      const wall = el.querySelector('.gallery__wall');
      const enter = () => {
        hovering = true;
        settle(0.12);
      };
      const leave = () => {
        hovering = false;
        settle(1);
      };
      wall?.addEventListener('pointerenter', enter);
      wall?.addEventListener('pointerleave', leave);

      return () => {
        relax.kill();
        st.kill();
        wall?.removeEventListener('pointerenter', enter);
        wall?.removeEventListener('pointerleave', leave);
      };
    });

    return () => mm.revert();
  }, [reduced]);

  return (
    <section className="gallery" id="gallery" ref={root} aria-labelledby="gallery-title">
      <div className="shell gallery__head">
        <p className="micro eyebrow">On Instagram</p>
        <h2 className="gallery__title display halo" id="gallery-title">
          <a
            className="gallery__handle"
            href={brand.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <em>@{brand.instagramHandle}</em>
            <span className="gallery__arrow" aria-hidden="true">
              ↗
            </span>
            <span className="sr-only"> (opens Instagram)</span>
          </a>
        </h2>
      </div>

      <div className="gallery__wall">
        {galleryRows.map((row, r) => (
          <div className="gallery__row" key={r}>
            <div className="gallery__track">
              {Array.from({ length: copies }).flatMap((_, copy) =>
                row.map((item, i) => {
                  const decorative = copy > 0;
                  return (
                    <div
                      className={`gallery__tile gallery__tile--${item.shape}`}
                      key={`${copy}-${i}`}
                      aria-hidden={decorative || undefined}
                      style={
                        item.zoom
                          ? ({ '--zoom': item.zoom, '--focus': item.focus ?? '50% 50%' } as CSSProperties)
                          : undefined
                      }
                    >
                      <Figure src={item.src} alt={decorative ? '' : item.alt} />
                    </div>
                  );
                }),
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
