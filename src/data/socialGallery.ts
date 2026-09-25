/**
 * The Instagram wall — a filmstrip that drifts across the page.
 *
 * Hand-maintained, never scraped at runtime. To add photographs: drop them in
 * /public/images and add an entry. The strip is one row of *distinct* views on
 * purpose — with only a handful of photographs, a second row would put the
 * same cake on screen twice at once. Add a second row to `galleryRows` once
 * there are enough photographs to fill two without repeats.
 *
 * `zoom` + `focus` make a genuine close-up crop. `objectPosition` alone cannot:
 * every photograph here is portrait and so is every tile, so there is no slack
 * for it to move the image into.
 */

export interface GalleryItem {
  src: string;
  alt: string;
  /** Alternating shapes give the strip its rhythm. */
  shape: 'arch' | 'rect';
  /** Magnification for a detail crop. 1 = the whole photograph. */
  zoom?: number;
  /** Point to zoom towards, as a CSS position, e.g. '30% 70%'. */
  focus?: string;
  /** Optional deep link to the specific post */
  href?: string;
}

export const galleryRows: GalleryItem[][] = [
  [
    {
      src: '/images/signature-art-cake.jpg',
      alt: 'Pastel palette-knife cake topped with cakesicles and a waffle cone',
      shape: 'arch',
    },
    {
      src: '/images/portrait-swapna.jpg',
      alt: 'Swapna, co-founder of BeyondBakes',
      shape: 'rect',
    },
    {
      src: '/images/garden-floral-cake.jpg',
      alt: 'Close detail of pressed violas and statice set into buttercream',
      shape: 'arch',
      zoom: 2.1,
      focus: '42% 62%',
    },
    {
      src: '/images/floral-event-cake.jpg',
      alt: 'A floral celebration with the cake on a white arched plinth',
      shape: 'rect',
    },
    {
      src: '/images/signature-red-rose-cake.jpg',
      alt: 'Close detail of red garden roses against combed buttercream',
      shape: 'arch',
      zoom: 1.9,
      focus: '38% 74%',
    },
    {
      src: '/images/portrait-girvani.jpg',
      alt: 'Girvani, co-founder of BeyondBakes',
      shape: 'rect',
    },
    {
      src: '/images/garden-floral-cake.jpg',
      alt: 'A tiered cake set with pressed edible flowers',
      shape: 'arch',
    },
    {
      src: '/images/signature-art-cake.jpg',
      alt: 'Close detail of palette-knife buttercream and a drizzled cakesicle',
      shape: 'rect',
      zoom: 2,
      focus: '30% 70%',
    },
  ],
];
