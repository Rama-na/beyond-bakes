/**
 * Kind words.
 *
 * ────────────────────────────────────────────────────────────────────
 *  SAMPLE — NOT REAL CUSTOMERS
 *
 *  These quotes are written for the preview so the section can be seen
 *  and judged. None of them was said by a customer, and none carries a
 *  name. While TESTIMONIALS_ARE_SAMPLE is true the section says so on
 *  the page, in plain sight.
 *
 *  Replace with real words (with the customer's permission — Instagram
 *  DMs and comments are the obvious source), then set the flag to false.
 *  See CONTENT_TODO.md.
 * ────────────────────────────────────────────────────────────────────
 */

export interface Testimonial {
  quote: string;
  /** What it was for. A first name can go here once real quotes arrive. */
  occasion: string;
}

export const TESTIMONIALS_ARE_SAMPLE = true;

export const testimonials: Testimonial[] = [
  {
    quote: 'Everyone wanted to know who made the cake. It tasted even better than it looked.',
    occasion: 'A birthday',
  },
  {
    quote: 'We described a feeling, not a design — and they understood it completely.',
    occasion: 'An engagement',
  },
  {
    quote: 'The dessert table was empty in twenty minutes. People are still asking about it.',
    occasion: 'A garden party',
  },
  {
    quote: 'Not too sweet, beautifully light, and so thoughtfully made.',
    occasion: 'An anniversary',
  },
];
