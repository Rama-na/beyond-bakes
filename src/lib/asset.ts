/**
 * Resolves a path in `public/` against the deployment base.
 *
 * Files under `public/` are copied verbatim and are *not* rewritten by the
 * bundler, so a literal "/brand/logo.png" stays absolute and breaks the moment
 * the site is served from a subpath — which is exactly how GitHub Pages serves
 * it (/beyond-bakes/). Everything that points at `public/` goes through here.
 *
 * `import.meta.env.BASE_URL` is Vite's `base`, always with a trailing slash:
 *   dev            → "/"                → "/brand/logo.png"
 *   GitHub Pages   → "/beyond-bakes/"   → "/beyond-bakes/brand/logo.png"
 *
 * Paths are stored with a leading slash in `src/data/` because that reads
 * naturally; the slash is stripped here before joining.
 */
export function asset(path: string): string {
  if (!path) return path;
  // Already absolute (http://, https://, data:, //cdn) — leave it alone.
  if (/^([a-z]+:)?\/\//i.test(path) || path.startsWith('data:')) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
