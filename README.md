# BeyondBakes

The launch site for BeyondBakes — a Chennai-based pastry brand by Girvani and Swapna.

A single cinematic page built around one journey:

> Discover → fall for the work → meet Girvani & Swapna → understand the craft →
> choose a bake → *let's make it personal* → enquiry → Instagram DM

There is no cart and no checkout, by design. Orders are taken personally at launch.
The product model is already shaped for checkout, so adding it later does not mean
rebuilding the brand — see [Future e-commerce](#future-e-commerce).

---

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build
npm run preview  # serve the build locally
npm run lint
```

> All six photographs are in `public/images/`. The written copy is still a
> draft — see [`CONTENT_TODO.md`](./CONTENT_TODO.md).

---

## Deployment (GitHub Pages)

Live at **https://rama-na.github.io/beyond-bakes/**

Pages serves this from a subpath, not a domain root, so `vite.config.ts` sets:

```ts
base: '/beyond-bakes/'   // build only; dev stays on '/'
```

Without it the built HTML asks for `/assets/index.js`, which resolves to
`rama-na.github.io/assets/index.js`, 404s, and renders a blank page.

**Anything in `public/` must go through `asset()`** (`src/lib/asset.ts`). Files
there are copied verbatim and are *not* rewritten by the bundler, so a literal
`"/brand/logo.png"` stays absolute and breaks on a subpath. Paths are stored
with a leading slash in `src/data/` because it reads better; `asset()` joins
them to `import.meta.env.BASE_URL` at the point of use. `Figure` already does
this, so every photograph is covered — only add it if you reference `public/`
somewhere new.

In `index.html`, use `%BASE_URL%` (Vite substitutes it). Open Graph and
`canonical` tags are the exception: social scrapers do not resolve relative
URLs, so those are fully qualified and must be updated by hand if the domain
changes.

### How it deploys

`.github/workflows/deploy-pages.yml` builds on push and publishes `dist/`.

> **One-time setup:** repo Settings → Pages → Build and deployment →
> Source: **GitHub Actions**. If it is set to "Deploy from a branch", the
> workflow's output is ignored and Pages serves the repo root — which holds the
> Vite *source* `index.html` pointing at `/src/main.tsx`, a file no browser can
> execute. That produces the same blank page.

### Moving to a custom domain

```bash
VITE_BASE=/ npm run build
```

Then update the absolute `og:`/`canonical` URLs in `index.html`.

---

## Content is data, not markup

Every word and image on the page comes from `src/data/`. Nothing needs a component
edit to change.

| File | Holds |
| --- | --- |
| `brand.ts` | Name, location, tagline, Instagram handle + URL, the manifesto line |
| `bakes.ts` | The four signatures — names, flavours, ingredients, sizes, lead times |
| `craft.ts` | Four steps — a word, a line and a photograph each |
| `story.ts` | Girvani + Swapna — the headline, one sentence, the portraits |
| `socialGallery.ts` | The filmstrip (hand-maintained, never scraped at runtime) |

**Much of this is sample copy.** It reads as finished, but it has not been approved.
`CONTENT_TODO.md` lists exactly which strings are invented and which facts were
supplied by the client.

The Instagram handle lives in **one** place — `brand.instagramHandle` — and is read
from there by the nav, footer, social section and DM handoff.

---

## How the motion works

Three layers, deliberately kept apart, plus one motif that ties them together.

### The thread

`components/motion/BrandThread.tsx` is the spine of the page: a single piped
line, drawn from the very top to the very bottom, that the visitor draws as
they scroll. It weaves left and right behind the sections so the page reads as
one continuous gesture rather than a stack of blocks.

It is one `<path>` in a normalised `0 0 100 100` viewBox stretched over the
whole document (`preserveAspectRatio="none"`), with `pathLength={1}` so drawing
is just `strokeDashoffset` 1 → 0 scrubbed against page scroll — which is what
DrawSVG does, without the paid plugin. `vector-effect="non-scaling-stroke"`
keeps the line hairline-thin under that very non-uniform scale.

It has fifteen oscillations, not three. The page is fifteen viewports tall, so
a gentle whole-page S-curve presents as a dead-straight vertical line on any
single screen — the curvature has to repeat often enough to be visible in the
window you are actually looking through.

`components/motion/Swoosh.tsx` is the same gesture at heading scale: it draws
itself under a heading as the heading arrives. Used on three headings only —
under every heading it would stop being a motif and become a rule.

### The rest

**Lenis** owns smooth scrolling. One shared instance (`hooks/useLenis.ts`),
driven by the GSAP ticker so Lenis and ScrollTrigger stay on the same clock. It
is not created at all when the visitor prefers reduced motion.

**GSAP + ScrollTrigger** conduct everything scroll-linked: the hero, the thread,
the full-bleed reveal, the carousel arrangement, the portraits converging, the
gallery drift, and the two background transitions. Shared helpers live in
`lib/animations.ts`; every section wraps its work in `gsap.context()` and
reverts on unmount.

**No component library.** The depth carousel, the scroll-expand reveal and the
drifting wall are built here rather than installed — the brief was for a site
that feels designed rather than assembled, and these needed brand-specific
tuning (2px corners, blush palette, restrained travel) that would have meant
rewriting a dependency anyway.

### Rhythm

The page alternates deliberately, because if everything moves nothing is
special:

```
QUIET      hero — the arch rises out of the page, the name follows it up
MOVEMENT   one sentence, each word filled in as it is read
WOW        the arch opens all the way to the whole celebration
PLAY       the signatures, turned by hand in real depth
SEQUENCE   the craft — four words, pinned, snapping step to step
INTIMATE   two friends drift together; an ampersand settles between them
MOVEMENT   the filmstrip drifts, faster when you scroll
QUIET      the ask, then the name set as wide as the page
```

### Words

The page carries roughly a hundred words of its own. That is deliberate: the
photography persuades, and the type only names things. Detail lives one click
away, in the bake panel — where someone looking for it will find it — rather
than on the page, where everyone else has to scroll past it.

### The arch

Their own photography is full of arches — the plinths, the backdrops, the
doorway behind both portraits — so it became the page's frame shape
(`--arch` in `globals.css`). The hero opens in an arch, the full-bleed reveal
starts as one, the portraits sit in them, and the filmstrip alternates them
with plain frames.

### Reduced motion

`prefers-reduced-motion: reduce` is honoured throughout, not as a CSS blanket:

- Lenis is never instantiated
- The brand preloader is skipped entirely
- The thread is present but already drawn — no scroll-linked motion
- The hero shows its finished composition; nothing rises
- The manifesto is simply set, not filled in word by word
- The full-bleed reveal renders as its finished state, unpinned
- The depth carousel becomes a plain, readable grid of labelled cards
- The craft sequence unpins and stacks its four steps
- The portraits do not travel; the filmstrip does not drift, and renders each
  photograph once rather than as a looping strip

---

## The enquiry flow

`START AN ORDER` and `LET'S MAKE IT PERSONAL` open the same panel: a side sheet on
desktop, a full-height sheet on mobile. Opening it from a bake pre-fills what they are
looking for.

The form asks for five things, two of them required. Nothing is sent to a server —
there is no backend.

**The Instagram handoff is deliberately copy-then-open.** Instagram exposes no
supported way to pre-fill a DM body on web or in-app, so rather than rely on
undocumented behaviour the flow:

1. builds the enquiry as plain text,
2. copies it to the clipboard,
3. opens `https://ig.me/m/<handle>` — Instagram's documented "message us" link.

The customer pastes once. The message is also shown on screen, with a separate
**Copy enquiry** button and a direct profile link, so the flow still works if the
clipboard API is blocked or the DM link fails to open. All of it lives in
`lib/instagram.ts`.

---

## Future e-commerce

`Bake` already carries `sizes[]`, optional `price`, `available`, and:

```ts
orderingMode: 'enquiry' | 'checkout'
```

Every bake is `'enquiry'` today. Flipping a bake to `'checkout'` and populating
`price` is the seam for adding cart → delivery → payment → confirmation later,
without touching the brand architecture or the product UI.

---

## Accessibility

- Semantic headings, one `h1`
- Skip link to `#main`
- Both overlays are real dialogs: `aria-modal`, focus trapped, Escape closes, focus
  restored to whatever opened them, page scroll locked behind them
- Every control is keyboard reachable with a visible focus ring
- No information exists only on hover — the cursor label and card hover states are
  enhancements over controls that are already labelled
- Form fields have real labels, `aria-invalid`, and errors linked by
  `aria-describedby`; the clipboard result is announced via a live region
- Touch targets are at least 44px

---

## Assets

`public/brand/` is generated from the supplied logo animation (`brand_logo_animate.MOV`):

| File | Made with | Used for |
| --- | --- | --- |
| `logo-mark.png` | final frame, 512×512 | OG / Twitter card, apple-touch-icon, video poster |
| `logo-mark-small.png` | final frame, 128×128 | Nav mark, favicon |
| `logo-animation.mp4` | H.264, 720×720, no audio | Preloader |
| `logo-animation.webm` | VP9, 720×720, no audio | Preloader (preferred) |

The preloader plays the monogram being piped in icing. It shows **once per session**,
never under reduced motion, and always releases the page — on video end, on error, or
after a 4.2s ceiling — so a slow connection cannot trap anyone behind it.

### Image optimisation

Export photographs at ~1600px on the long edge before adding them. The layout reserves
space via `aspect-ratio` so nothing shifts as they load; the hero is eager and
high-priority, everything else is lazy.

If you want responsive srcsets later, generate 480/768/1200/1600 variants and extend
`components/common/Figure.tsx` — it is the single place every photograph passes
through.

---

## Structure

```
src/
  components/
    layout/      Navbar, Footer, Preloader
    hero/        Hero
    sections/    Manifesto, ScrollExpand, SignatureShowcase, DepthCarousel,
                 BakeDetail, CraftSequence, StorySection, Gallery, OrderCTA
    ordering/    OrderPanel, EnquiryForm, InstagramHandoff
    motion/      BrandThread, Swoosh, RevealText, MagneticButton
    common/      Figure, Cursor, Grain
  data/          brand, bakes, craft, story, socialGallery
  hooks/         useLenis, useReducedMotion
  lib/           animations, instagram, asset
  styles/        fonts, globals
```

Each component keeps its own CSS file beside it. Tokens, resets and the shared
button/type primitives are in `styles/globals.css`, which `main.tsx` imports
*before* `App` — so the base lands first in the bundle and a component rule
wins any specificity tie with a global one. (Imported after, the globals won
instead, and silently overrode every component's line-height on display type.)

## Type

Cormorant Garamond for display, Manrope for interface — both self-hosted from
`@fontsource`, Latin subset only, declared in `styles/fonts.css`. There is no
request to Google: no third-party round trip, no flash of fallback type, and
the page renders identically behind networks that block Google Fonts.

## Colour

Roughly 80% cream/white, 15% blush, 5% deep rose and gold. The site is not
pink — pink is the accent that lets the photography and the portraits carry the
colour. All of it is defined once at the top of `styles/globals.css`; the older
token names (`--background`, `--deep-pink`, `--muted-ink`) are mapped onto the
palette rather than duplicated.

## A note on `npm run build`

The build runs `scripts/check-css.mjs` first, which fails on unbalanced braces
in any stylesheet. A stray `{` does not stop CSS bundling — the parser silently
nests every following rule inside the unterminated block. When that block is a
media query, the entire site loses its styling outside that one breakpoint
while looking perfect inside it. That shipped here once; the check exists so it
cannot happen quietly again.
