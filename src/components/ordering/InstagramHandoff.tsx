import { useEffect, useState } from 'react';
import {
  buildEnquiryMessage,
  copyEnquiry,
  openInstagramDm,
  instagramProfileUrl,
  type EnquiryPayload,
} from '../../lib/instagram';
import { brand } from '../../data/brand';

interface InstagramHandoffProps {
  payload: EnquiryPayload;
  onBack: () => void;
}

/**
 * The handoff.
 *
 * Instagram has no supported way to prefill a DM body, so rather than pretend
 * otherwise the flow copies the enquiry to the clipboard and then opens the
 * conversation — the customer pastes once. If the clipboard is blocked, the
 * message is on screen to copy by hand, and both actions stay available.
 */
export function InstagramHandoff({ payload, onBack }: InstagramHandoffProps) {
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

  const handleContinue = async () => {
    // Copy first — the paste is the whole point of the handoff.
    await copyEnquiry(message);
    openInstagramDm();
  };

  return (
    <div className="handoff">
      <p className="micro">Almost there</p>

      <h2 className="handoff__title display">
        We take orders
        <br />
        <em>personally.</em>
      </h2>

      <p className="handoff__lede body-muted">
        It is the only way we can understand exactly what you&rsquo;re looking for. Your
        enquiry is ready below — send it to us on Instagram and we&rsquo;ll reply there.
      </p>

      <div className="handoff__preview">
        <label className="micro" htmlFor="handoff-message">
          Ready to send
        </label>
        <pre className="handoff__message" id="handoff-message">
          {message}
        </pre>
      </div>

      <div className="handoff__actions">
        <button className="btn btn--solid" onClick={handleContinue}>
          Continue on Instagram
          <span className="btn-arrow" aria-hidden="true">
            ↗
          </span>
        </button>

        <button className="btn" onClick={handleCopy}>
          {copied === true ? 'Copied' : copied === false ? 'Press ⌘C to copy' : 'Copy enquiry'}
        </button>
      </div>

      {/* Live region so the copy result is announced, not just shown. */}
      <p className="sr-only" role="status">
        {copied === true ? 'Enquiry copied to clipboard' : ''}
        {copied === false ? 'Could not copy automatically. Please copy the message manually.' : ''}
      </p>

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

      <button className="handoff__back micro link-underline" onClick={onBack}>
        ← Change something
      </button>
    </div>
  );
}
