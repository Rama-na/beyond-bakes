import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../data/brand';

export interface EnquiryPayload {
  name: string;
  request: string;
  date: string;
  size: string;
  message: string;
  instagram?: string;
  phone?: string;
}

/**
 * The message the customer carries into the DM.
 *
 * Kept as plain text on purpose — it has to survive being pasted into
 * Instagram's composer, which strips almost everything else.
 */
export function buildEnquiryMessage(p: EnquiryPayload): string {
  const lines = [
    `Hi ${INSTAGRAM_HANDLE}! I'd love to enquire about an order.`,
    '',
    `Name: ${p.name}`,
    `Looking for: ${p.request}`,
  ];

  if (p.date) lines.push(`Date: ${formatDate(p.date)}`);
  if (p.size) lines.push(`Size / servings: ${p.size}`);
  if (p.message) lines.push(`Message: ${p.message}`);
  if (p.phone) lines.push(`Phone: ${p.phone}`);

  return lines.join('\n');
}

function formatDate(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

/**
 * Instagram's documented "message us" link. It opens a DM thread with the
 * account — in the app on mobile, on the web otherwise.
 *
 * It cannot carry a prefilled body: Instagram exposes no supported parameter
 * for that on either surface. So the flow is deliberately *copy, then open* —
 * the customer pastes one message rather than retyping their whole enquiry.
 * That is why `copyEnquiry` runs before the window opens.
 */
export function instagramDmUrl(): string {
  return `https://ig.me/m/${INSTAGRAM_HANDLE}`;
}

export function instagramProfileUrl(): string {
  return INSTAGRAM_URL || `https://instagram.com/${INSTAGRAM_HANDLE}`;
}

/** Clipboard write with a fallback for browsers that block the async API. */
export async function copyEnquiry(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }

  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

/** Opens the DM in a new tab, with noopener for safety. */
export function openInstagramDm() {
  window.open(instagramDmUrl(), '_blank', 'noopener,noreferrer');
}
