/**
 * Instagram / social section.
 *
 * Deliberately a hand-maintained list, not a runtime scrape of Instagram.
 * Add website-ready exports to /public/images and list them here.
 */

export interface SocialItem {
  src: string;
  alt: string;
  objectPosition?: string;
  /** Optional deep link to the specific post */
  href?: string;
}

export const socialGallery: SocialItem[] = [
  {
    src: '/images/signature-red-rose-cake.jpg',
    alt: 'Three-tier ivory buttercream cake dressed with deep red garden roses',
    objectPosition: '50% 45%',
  },
  {
    src: '/images/garden-floral-cake.jpg',
    alt: 'Tiered cake set with pressed edible flowers in soft ivory buttercream',
    objectPosition: '50% 50%',
  },
  {
    src: '/images/signature-art-cake.jpg',
    alt: 'Pastel palette-knife cake topped with cakesicles, a waffle cone and cocoa spheres',
    objectPosition: '50% 40%',
  },
  {
    src: '/images/floral-event-cake.jpg',
    alt: 'Floral celebration setup with the cake displayed on a white arched plinth',
    objectPosition: '50% 45%',
  },
];

export const socialCta = {
  headline: 'See more of our work',
  body: 'Everything we make ends up here first. It is also where we talk to almost everyone who orders from us.',
} as const;
