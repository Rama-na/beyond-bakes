import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { Bake } from '../../data/bakes';
import { Figure } from '../common/Figure';
import { setScrollLocked } from '../../hooks/useLenis';
import { prefersReducedMotion } from '../../hooks/useReducedMotion';
import './bake-detail.css';

interface BakeDetailProps {
  bake: Bake | null;
  onClose: () => void;
  onEnquire: (bake: Bake) => void;
}

/**
 * Full-screen detail panel for a signature.
 *
 * Behaves as a modal dialog: it locks the page behind it, traps focus, closes
 * on Escape or backdrop click, and restores focus to whatever opened it.
 */
export function BakeDetail({ bake, onClose, onEnquire }: BakeDetailProps) {
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  const open = Boolean(bake);

  useEffect(() => {
    if (!open) return;

    restoreTo.current = document.activeElement as HTMLElement;
    setScrollLocked(true);
    closeBtn.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      // Keep Tab inside the dialog.
      const focusables = panel.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      setScrollLocked(false);
      restoreTo.current?.focus();
    };
  }, [open, onClose]);

  // Entrance
  useEffect(() => {
    if (!open || !panel.current) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('.detail__media', { clipPath: 'inset(12% 8% 12% 8%)', opacity: 0 }, {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1,
        })
        .fromTo(
          '[data-detail-stagger]',
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.06 },
          0.15,
        );
    }, panel);

    return () => ctx.revert();
  }, [open, bake?.id]);

  if (!bake) return null;

  return (
    <div className="detail" role="presentation">
      <button className="detail__backdrop" onClick={onClose} tabIndex={-1} aria-hidden="true" />

      <div
        className="detail__panel"
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
      >
        <button
          ref={closeBtn}
          className="detail__close"
          onClick={onClose}
          aria-label="Close details"
        >
          <span aria-hidden="true">✕</span>
        </button>

        <div className="detail__scroll">
          <div className="detail__grid">
            <div className="detail__media">
              <Figure
                src={bake.images[0]}
                alt={bake.shortDescription}
                objectPosition={bake.objectPosition}
                placeholderLabel={`Add ${bake.images[0].split('/').pop()}`}
                priority
              />
            </div>

            <div className="detail__body">
              <p className="micro" data-detail-stagger>
                {bake.referenceLabel}
              </p>

              <h2 className="detail__title display" id="detail-title" data-detail-stagger>
                {bake.name}
              </h2>

              <p className="lede detail__desc" data-detail-stagger>
                {bake.description}
              </p>

              {bake.flavour && (
                <div className="detail__block" data-detail-stagger>
                  <h3 className="micro">Flavour</h3>
                  <p>{bake.flavour}</p>
                </div>
              )}

              {bake.ingredients?.length ? (
                <div className="detail__block" data-detail-stagger>
                  <h3 className="micro">What goes in</h3>
                  <ul className="detail__list">
                    {bake.ingredients.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {bake.details?.length ? (
                <div className="detail__block" data-detail-stagger>
                  <h3 className="micro">The details</h3>
                  <ul className="detail__list">
                    {bake.details.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {bake.sizes?.length ? (
                <div className="detail__block" data-detail-stagger>
                  <h3 className="micro">Sizes</h3>
                  <ul className="detail__sizes">
                    {bake.sizes.map((s) => (
                      <li key={s.label}>
                        <span>{s.label}</span>
                        {s.serves && <span className="detail__serves">Serves {s.serves}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="detail__block" data-detail-stagger>
                <h3 className="micro">Made for</h3>
                <p>{bake.madeFor.join(' · ')}</p>
              </div>

              {bake.leadTime && (
                <p className="detail__lead" data-detail-stagger>
                  {bake.leadTime}
                </p>
              )}

              <div className="detail__cta" data-detail-stagger>
                <button className="btn btn--solid" onClick={() => onEnquire(bake)}>
                  Let&rsquo;s make it personal
                  <span className="btn-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
