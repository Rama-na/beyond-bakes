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

> **Before it looks right:** six photographs are missing from `public/images/`.
> See [`CONTENT_TODO.md`](./CONTENT_TODO.md). Until they are added, each frame shows
> a blush placeholder naming the file it needs.

---

## Content is data, not markup

Every word and image on the page comes from `src/data/`. Nothing needs a component
edit to change.

| File | Holds |
| --- | --- |
| `brand.ts` | Name, location, tagline, Instagram handle + URL, intro copy |
| `bakes.ts` | The four signatures — names, flavours, ingredients, sizes, lead times |
| `craft.ts` | Detail / Time / Texture / Balance |
| `story.ts` | Girvani + Swapna — the journey, the founder paragraphs, signatures |
| `socialGallery.ts` | The Instagram grid (hand-maintained, never scraped at runtime) |

**Much of this is sample copy.** It reads as finished, but it has not been approved.
`CONTENT_TODO.md` lists exactly which strings are invented and which facts were
supplied by the client.

The Instagram handle lives in **one** place — `brand.instagramHandle` — and is read
from there by the nav, footer, social section and DM handoff.

---

## How the motion works

Three layers, deliberately kept apart.

**Lenis** owns smooth scrolling. One shared instance (`hooks/useLenis.ts`), driven by
the GSAP ticker so Lenis and ScrollTrigger stay on the same clock. It is not created
at all when the visitor prefers reduced motion — native scrolling is the accessible
default.

**GSAP + ScrollTrigger** own everything scroll-linked: the hero entrance and exit, the
pinned horizontal signature gallery, image parallax, clip reveals, and the two
background transitions. Shared helpers live in `lib/animations.ts` so the vocabulary
stays consistent; every section wraps its work in `gsap.context()` and reverts on
unmount.

**A small set of custom components** (`components/motion/`) cover masked text reveals,
parallax frames and the magnetic button. There is no component library — the site
should look built, not assembled.

### Reduced motion

`prefers-reduced-motion: reduce` is honoured throughout, not just as a CSS blanket:

- Lenis is never instantiated
- The brand preloader is skipped entirely
- The pinned horizontal gallery becomes a normal swipe rail
- Parallax and clip reveals are dropped
- Reveals degrade to a short fade

### Rhythm

Sections deliberately alternate motion and quiet. `SignatureMessage` — "From us, to
you" — is the least designed thing on the page, and should stay that way.

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
    sections/    BrandIntro, SignatureShowcase, SignatureCard, BakeDetail,
                 CraftSection, StorySection, SignatureMessage, SocialGallery, OrderCTA
    ordering/    OrderPanel, EnquiryForm, InstagramHandoff
    motion/      RevealText, ParallaxImage, MagneticButton
    common/      Figure, Cursor
  data/          brand, bakes, craft, story, socialGallery
  hooks/         useLenis, useReducedMotion
  lib/           animations, instagram
  styles/        globals.css
```

Each component keeps its own CSS file beside it. Tokens, resets and the shared
button/type primitives are in `styles/globals.css`.
