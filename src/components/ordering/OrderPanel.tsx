import { useEffect, useRef, useState } from 'react';
import { EnquiryForm } from './EnquiryForm';
import { InstagramHandoff } from './InstagramHandoff';
import type { EnquiryPayload } from '../../lib/instagram';
import { setScrollLocked } from '../../hooks/useLenis';
import './order-panel.css';

interface OrderPanelProps {
  /** Pre-fills the request line when opened from a specific bake. */
  initialRequest?: string;
  onClose: () => void;
}

/**
 * The enquiry panel: a side sheet on desktop, a full-height sheet on mobile.
 *
 * Two steps — the short form, then the Instagram handoff. Modal semantics
 * throughout: focus trapped, page locked, Escape closes, focus restored.
 *
 * Mounted only while open, so each visit starts from a clean form.
 */
export function OrderPanel({ initialRequest, onClose }: OrderPanelProps) {
  const [payload, setPayload] = useState<EnquiryPayload | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    restoreTo.current = document.activeElement as HTMLElement;
    setScrollLocked(true);

    // Let the entrance transition start before pulling focus in.
    const focusTimer = window.setTimeout(() => closeBtn.current?.focus(), 80);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusables = panel.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea, select, summary, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables?.length) return;

      const list = Array.from(focusables).filter((el) => el.offsetParent !== null);
      const first = list[0];
      const last = list[list.length - 1];

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
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', onKey);
      setScrollLocked(false);
      restoreTo.current?.focus();
    };
  }, [onClose]);

  return (
    <div className="order" role="presentation">
      <button className="order__backdrop" onClick={onClose} tabIndex={-1} aria-hidden="true" />

      <div
        className="order__panel"
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-heading"
      >
        <div className="order__bar">
          <span className="micro" id="order-heading">
            {payload ? 'Your enquiry' : "Let's make it personal"}
          </span>
          <button
            ref={closeBtn}
            className="order__close"
            onClick={onClose}
            aria-label="Close enquiry"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className="order__scroll">
          {payload ? (
            <InstagramHandoff payload={payload} onBack={() => setPayload(null)} />
          ) : (
            <>
              <div className="order__intro">
                <h2 className="order__title display">
                  Tell us what
                  <br />
                  you&rsquo;re <em>celebrating.</em>
                </h2>
                <p className="body-muted order__lede">
                  A few lines is plenty. We&rsquo;ll ask the rest when we talk.
                </p>
              </div>

              <EnquiryForm initialRequest={initialRequest} onSubmit={setPayload} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
