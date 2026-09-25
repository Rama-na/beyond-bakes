import { useEffect, useState } from 'react';
import {
  buildEnquiryMessage,
  copyEnquiry,
  openInstagramDm,
  instagramProfileUrl,
  type EnquiryPayload,
} from '../../lib/instagram';
import { brand } from '../../data/brand';
import { ORDER_MODE } from '../../data/ordering';

interface InstagramHandoffProps {
  payload: EnquiryPayload;
  /** True while a preview send plays out. */
  sending: boolean;
  onBack: () => void;
  /** Moves the panel on to the last step. */
  onSend: () => void;
}

/**
 * The review — the enquiry exactly as BeyondBakes will receive it — and the
 * handoff.
 *
 * In 'instagram' mode: Instagram has no supported way to prefill a DM body, so
 * rather than pretend otherwise the flow copies the enquiry to the clipboard
 * and then opens the conversation — the customer pastes once. If the
 * clipboard is blocked, the message is on screen to copy by hand, and both
 * actions stay available.
 *
 * In 'preview' mode the send is played out and nothing leaves the page.
 */
export function InstagramHandoff({ payload, sending, onBack, onSend }: InstagramHandoffProps) {
  const live = ORDER_MODE === 'instagram';
  const message = buildEnquiryMessage(payload);
  const [copied, setCopied] = useState<boolean | null>(null);

  // Reset the confirmation after a moment so the button reads true.
  useEffect(() => {
    if (copied === null) return;
    const t = window.setTimeout(() => setCopied(null), 3200);
    return () => window.clearTimeout(t);
  }, [copied]);

  const handleCopy = async () => {
    setCopied(await copyEnquiry(message));
  };

  const handleSend = async () => {
    if (sending) return;
    if (live) {
      // Copy first — the paste is the whole point of the handoff.
      await copyEnquiry(message);
      openInstagramDm();
    }
    onSend();
  };

  return (
    <div className="order__step handoff">
      <p className="micro">Almost there</p>

      <h2 className="handoff__title display" id="order-heading" data-step-heading tabIndex={-1}>
        We take orders
        <br />
        <em>personally.</em>
      </h2>

      <p className="handoff__lede body-muted">
        {live ? (
          <>
            It is the only way we can understand exactly what you&rsquo;re looking for. Your
            enquiry is ready below — send it to us on Instagram and we&rsquo;ll reply there.
          </>
        ) : (
          <>
            It is the only way we can understand exactly what you&rsquo;re looking for. This is
            your enquiry as it will reach us — send it, and we&rsquo;ll reply on Instagram.
          </>
        )}
      </p>

      <figure className="handoff__preview">
        <figcaption className="micro">To @{brand.instagramHandle}</figcaption>
        <pre className="handoff__message" id="handoff-message">
          {message}
        </pre>
      </figure>

      <div className="handoff__actions">
        <button
          className="btn btn--solid handoff__send"
          onClick={handleSend}
          // aria-disabled rather than disabled: a disabled button drops focus
          // to the page, outside the dialog, for the length of the send.
          aria-disabled={sending}
          aria-busy={sending}
        >
          {live ? (
            <>
              Continue on Instagram
              <span className="btn-arrow" aria-hidden="true">
                ↗
              </span>
            </>
          ) : sending ? (
            <>
              Sending
              <span className="handoff__dots" aria-hidden="true">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
            </>
          ) : (
            <>
              Send enquiry
              <span className="btn-arrow" aria-hidden="true">
                →
              </span>
            </>
          )}
        </button>

        {live && (
          <button className="btn" onClick={handleCopy}>
            {copied === true ? 'Copied' : copied === false ? 'Press ⌘C to copy' : 'Copy enquiry'}
          </button>
        )}
      </div>

      {/* Live region so the copy result and the send are announced, not just shown. */}
      <p className="sr-only" role="status">
        {copied === true ? 'Enquiry copied to clipboard' : ''}
        {copied === false ? 'Could not copy automatically. Please copy the message manually.' : ''}
        {sending ? 'Sending your enquiry' : ''}
      </p>

      {live && (
        <p className="handoff__fallback">
          The button copies your enquiry and opens our DMs — just paste it in. If Instagram
          doesn&rsquo;t open,{' '}
          <a
            href={instagramProfileUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
          >
            visit @{brand.instagramHandle}
          </a>{' '}
          directly.
        </p>
      )}

      <button
        className="handoff__back micro link-underline"
        onClick={() => !sending && onBack()}
        aria-disabled={sending}
      >
        ← Change something
      </button>
    </div>
  );
}
