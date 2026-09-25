/**
 * How an order enquiry ends.
 *
 * ────────────────────────────────────────────────────────────────────
 *  ORDER_MODE
 *
 *  'preview'    The proof of concept. Every step plays through to the
 *               confirmation and nothing is sent: no message, no Instagram,
 *               no clipboard. The last screen says so plainly, so no one
 *               leaves thinking they have placed a real order.
 *
 *  'instagram'  Launch. The enquiry is copied and BeyondBakes' Instagram
 *               DMs open, for the customer to paste and send.
 *
 *  Checkout comes later, per bake — see `orderingMode` in bakes.ts.
 * ────────────────────────────────────────────────────────────────────
 */

export type OrderMode = 'preview' | 'instagram';

export const ORDER_MODE: OrderMode = 'preview';

/** The three steps, as the progress line in the panel names them. */
export const ORDER_STEPS = ['Details', 'Review', 'Sent'] as const;

/**
 * SAMPLE COPY — what happens after an enquiry is sent. Drafted from the brief
 * (orders are taken personally, over Instagram), not confirmed with Girvani
 * and Swapna. See CONTENT_TODO.md.
 */
export const AFTER_ENQUIRY_IS_SAMPLE = true;

export const afterEnquiry: string[] = [
  'We reply on Instagram.',
  'We talk it through — flavour, design, your date.',
  'Then it’s made, for your day.',
];
