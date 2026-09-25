/**
 * Brand-level facts and configuration.
 *
 * SUPPLIED fields come from the client's Instagram profile. SAMPLE fields are
 * working copy for the draft — see CONTENT_TODO.md.
 */

export const brand = {
  /** SUPPLIED */
  name: 'BeyondBakes',
  /** SUPPLIED */
  location: 'Anna Nagar, Chennai',
  /** SUPPLIED — profile positioning line */
  tagline: 'Where every bite is a work of art.',
  /** SUPPLIED */
  instagramHandle: 'beyondbakes.co',
  /** Confirm before launch. The single source of truth for the handle. */
  instagramUrl: 'https://instagram.com/beyondbakes.co',

  /**
   * SAMPLE — the one statement the page makes about itself. Kept to a single
   * sentence on purpose: the photography does the persuading.
   */
  manifesto: 'Every celebration has a feeling. We turn it into something you can taste.',

  /** SAMPLE — the caption over the full-bleed photograph. */
  momentLine: ['Made for the moments', 'worth remembering.'],
} as const;

export const INSTAGRAM_HANDLE = brand.instagramHandle;
export const INSTAGRAM_URL = brand.instagramUrl;
