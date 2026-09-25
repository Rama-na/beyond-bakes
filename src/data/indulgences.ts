/**
 * Sweet Indulgences — the dessert-table menu.
 *
 * ────────────────────────────────────────────────────────────────────
 *  SUPPLIED, NOT SAMPLE
 *
 *  Every name and line below is copied word for word from BeyondBakes' own
 *  "Sweet Indulgences" menu card, as it stands on their dessert table in the
 *  event photographs. The card sets its lines without full stops; so does
 *  this file.
 *
 *  The one inference is which photograph goes with which name — see
 *  CONTENT_TODO.md. Nothing else is filled in (no flavour notes, ingredients,
 *  sizes or lead times) because none was supplied, and the detail panel only
 *  shows what is set.
 * ────────────────────────────────────────────────────────────────────
 */

import type { Bake } from './bakes';

/** The name printed at the top of the card. */
export const INDULGENCES_TITLE = 'Sweet Indulgences';

export const indulgences: Bake[] = [
  {
    id: 'sweet-01',
    slug: 'cupcake-royale',
    name: 'Cupcake Royale',
    referenceLabel: INDULGENCES_TITLE,
    shortDescription: "Cupcakes swirled with white and chocolate buttercream, dressed with sprigs of baby's breath",
    description: 'Delightful vanilla cupcakes with buttercream frosting',
    images: ['/images/cupcake-royale.jpg'],
    categories: ['Dessert table'],
    available: true,
    orderingMode: 'enquiry',
    isSample: false,
  },
  {
    id: 'sweet-02',
    slug: 'strawberry-dream',
    name: 'Strawberry Dream',
    referenceLabel: INDULGENCES_TITLE,
    shortDescription: 'Stemmed cups of pale pink strawberry mousse, each topped with a berry layer and small purple flowers',
    description: 'Light and airy strawberry mousse, perfect for a summer day',
    images: ['/images/strawberry-dream.jpg'],
    categories: ['Dessert table'],
    available: true,
    orderingMode: 'enquiry',
    isSample: false,
  },
  {
    id: 'sweet-03',
    slug: 'blueberry-bliss',
    name: 'Blueberry Bliss',
    referenceLabel: INDULGENCES_TITLE,
    shortDescription: 'Glasses of cheesecake layered with blueberry, beside a white vase holding a pink rose',
    description: 'A creamy no-bake cheesecake with a burst of blueberries',
    images: ['/images/blueberry-bliss.jpg'],
    categories: ['Dessert table'],
    available: true,
    orderingMode: 'enquiry',
    isSample: false,
  },
  {
    id: 'sweet-04',
    slug: 'chocoholics-dream',
    name: "Chocoholic's Dream",
    referenceLabel: INDULGENCES_TITLE,
    shortDescription: 'Small chocolate layer cakes with bare sides, crowned with piped chocolate and edible flowers',
    description: 'Rich, moist chocolate cake with a rustic naked finish',
    images: ['/images/chocoholics-dream.jpg'],
    categories: ['Dessert table'],
    available: true,
    orderingMode: 'enquiry',
    isSample: false,
  },
];
