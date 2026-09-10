import './grain.css';

/**
 * A very light film grain over the whole page.
 *
 * Large flat areas of cream can band on cheaper panels, and grain both hides
 * that and gives the page a printed quality that suits the editorial tone.
 *
 * It is a single small tiling SVG turned into a data URI rather than a live
 * `feTurbulence` filter over the viewport — a filter that size repaints on
 * every scroll frame and is exactly the kind of thing that makes a page feel
 * heavy on a mid-range phone.
 */
export function Grain() {
  return <div className="grain" aria-hidden="true" />;
}
