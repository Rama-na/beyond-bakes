import { brand } from '../../data/brand';
import { ORDER_MODE, afterEnquiry } from '../../data/ordering';
import { instagramProfileUrl } from '../../lib/instagram';

interface EnquirySentProps {
  /** As typed in the form; the thank-you uses the first name only. */
  name: string;
  onDone: () => void;
  onAgain: () => void;
}

/**
 * The end of the journey.
 *
 * The thread draws a circle and a tick, the customer is thanked by name, and
 * what happens next is set out in three lines. In 'preview' mode the screen
 * also says, in the reading order rather than in small print, that nothing
 * was actually sent.
 */
export function EnquirySent({ name, onDone, onAgain }: EnquirySentProps) {
  const live = ORDER_MODE === 'instagram';
  const first = name.trim().split(/\s+/)[0];

  return (
    <div className="order__step sent">
      <svg className="sent__mark" viewBox="0 0 64 64" aria-hidden="true">
        <circle className="sent__ring" cx="32" cy="32" r="30" pathLength={1} />
        <path className="sent__tick" d="M20.5 33 L28.5 41 L44 24.5" pathLength={1} />
      </svg>

      <p className="micro">{live ? 'Nearly there' : 'Enquiry sent'}</p>

      <h2 className="sent__title display" id="order-heading" data-step-heading tabIndex={-1}>
        Thank you,
        <br />
        <em>{first}.</em>
      </h2>

      <p className="sent__lede body-muted">
        {live ? (
          <>
            Your enquiry is copied. Paste it into the chat that just opened and send it —
            we&rsquo;ll reply there. If Instagram didn&rsquo;t open,{' '}
            <a
              href={instagramProfileUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              visit @{brand.instagramHandle}
            </a>
            .
          </>
        ) : (
          <>Your enquiry is with us. We&rsquo;ll reply on Instagram.</>
        )}
      </p>

      {!live && (
        <p className="sent__preview">
          <span className="micro">Preview</span>
          Nothing was sent. On the live site, this is the moment your enquiry reaches
          @{brand.instagramHandle} on Instagram.
        </p>
      )}

      <div className="sent__next">
        <h3 className="micro">What happens next</h3>
        <ol>
          {afterEnquiry.map((line, i) => (
            <li key={line}>
              <span className="sent__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="sent__actions">
        <button className="btn btn--solid" onClick={onDone}>
          Done
        </button>
        <button className="sent__again micro link-underline" onClick={onAgain}>
          Start another enquiry
        </button>
      </div>
    </div>
  );
}
