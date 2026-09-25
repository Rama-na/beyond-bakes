import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { EnquiryForm } from './EnquiryForm';
import { InstagramHandoff } from './InstagramHandoff';
import { EnquirySent } from './EnquirySent';
import type { EnquiryPayload } from '../../lib/instagram';
import { ORDER_STEPS } from '../../data/ordering';
import { setScrollLocked } from '../../hooks/useLenis';
import './order-panel.css';

interface OrderPanelProps {
  /** Pre-fills the request line when opened from a specific bake. */
  initialRequest?: string;
  onClose: () => void;
}

type Step = 0 | 1 | 2;

/** Long enough to read as something happening, short enough not to wait on. */
const SEND_MS = 1300;

/**
 * The enquiry panel: a side sheet on desktop, a full-height sheet on mobile.
 *
 * Three steps, named in a progress line along the top — the details, a
 * review of the message exactly as it will arrive, and the confirmation.
 * How the last step behaves depends on ORDER_MODE (data/ordering.ts).
 *
 * Modal semantics throughout: focus trapped, page locked, Escape closes,
 * focus restored. Each step opens at its top with focus on its heading, so a
 * screen reader announces where you are. Mounted only while open, so each
 * visit starts from a clean form.
 */
export function OrderPanel({ initialRequest, onClose }: OrderPanelProps) {
  const [step, setStep] = useState<Step>(0);
  const [payload, setPayload] = useState<EnquiryPayload | null>(null);
  const [sending, setSending] = useState(false);
  // Bumped to start a fresh form after a finished enquiry.
  const [round, setRound] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);
  const shownStep = useRef<Step>(0);
  const sendTimer = useRef(0);

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
      window.clearTimeout(sendTimer.current);
      window.removeEventListener('keydown', onKey);
      setScrollLocked(false);
      restoreTo.current?.focus();
    };
  }, [onClose]);

  // A new step starts at its top, with focus on its heading.
  useEffect(() => {
    if (shownStep.current === step) return;
    shownStep.current = step;
    scroller.current?.scrollTo({ top: 0 });
    panel.current?.querySelector<HTMLElement>('[data-step-heading]')?.focus({ preventScroll: true });
  }, [step, round]);

  const review = (values: EnquiryPayload) => {
    setPayload(values);
    setStep(1);
  };

  const send = () => {
    setSending(true);
    sendTimer.current = window.setTimeout(() => {
      setSending(false);
      setStep(2);
    }, SEND_MS);
  };

  const startAgain = () => {
    setPayload(null);
    setRound((r) => r + 1);
    setStep(0);
  };

  // The line fills a third per step, and runs to the end while sending.
  const progress = sending ? 1 : (step + 1) / ORDER_STEPS.length;

  return (
    <div className="order" role="presentation">
      <button className="order__backdrop" onClick={onClose} tabIndex={-1} aria-hidden="true" />

      <div
        className="order__panel"
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-heading"
        // Lenis cancels wheel and touch scrolling while the page is locked;
        // this lets the panel scroll natively underneath it.
        data-lenis-prevent
      >
        <div className="order__bar">
          <ol className="order__steps" aria-label="Your enquiry">
            {ORDER_STEPS.map((label, i) => (
              <li
                key={label}
                data-state={i < step || (sending && i === step) ? 'done' : i === step ? 'current' : 'next'}
                aria-current={i === step ? 'step' : undefined}
              >
                {label}
              </li>
            ))}
          </ol>

          <button
            ref={closeBtn}
            className="order__close"
            onClick={onClose}
            aria-label="Close enquiry"
          >
            <span aria-hidden="true">✕</span>
          </button>

          <span
            className="order__progress"
            style={{ '--progress': progress } as CSSProperties}
            aria-hidden="true"
          />
        </div>

        <div className="order__scroll" ref={scroller}>
          {step === 0 && (
            <div className="order__step" key={`details-${round}`}>
              <div className="order__intro">
                <h2 className="order__title display" id="order-heading" data-step-heading tabIndex={-1}>
                  Tell us what
                  <br />
                  you&rsquo;re <em>celebrating.</em>
                </h2>
                <p className="body-muted order__lede">
                  A few lines is plenty. We&rsquo;ll ask the rest when we talk.
                </p>
              </div>

              <EnquiryForm
                initialRequest={round === 0 ? initialRequest : ''}
                initialValues={payload ?? undefined}
                onSubmit={review}
              />
            </div>
          )}

          {step === 1 && payload && (
            <InstagramHandoff
              payload={payload}
              sending={sending}
              onBack={() => setStep(0)}
              onSend={send}
            />
          )}

          {step === 2 && payload && (
            <EnquirySent name={payload.name} onDone={onClose} onAgain={startAgain} />
          )}
        </div>
      </div>
    </div>
  );
}
