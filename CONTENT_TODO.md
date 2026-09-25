# Content to replace before launch

Everything in `src/data/` is designed to be edited without touching a component.
This is the list of what is currently **sample copy** and what is still **missing**.

---

## 1. Photographs

Twenty-three photographs are in `public/images/`; nineteen are in use, four of
them the dessert-table crops. The full inventory — what each one is and where
it appears — is in `public/images/README.md`.

The thirteen event photographs show something the site did not say before:
BeyondBakes does whole dessert tables, not just cakes. The white dessert cart
is the full-bleed reveal, their dessert menu has its own section, and the
event work fills the filmstrip's second row.

### Sweet Indulgences — the dessert-table menu, now on the site

The event photographs show BeyondBakes' own **"Sweet Indulgences"** menu card.
It now has its own section straight after the signatures (and a *Dessert
table* link in the nav), in `src/data/indulgences.ts`, copied word for word:

- **Cupcake Royale** — Delightful vanilla cupcakes with buttercream frosting
- **Strawberry Dream** — Light and airy strawberry mousse, perfect for a summer day
- **Blueberry Bliss** — A creamy no-bake cheesecake with a burst of blueberries
- **Chocoholic's Dream** — Rich, moist chocolate cake with a rustic naked finish

**A correction:** an earlier version of this note had the last line as
"rustic *baked* finish". Read at full resolution, the card says "rustic
*naked* finish", and the site uses the card's wording.

This is supplied, not sample (`isSample: false`). Two things are still to
confirm:

- [ ] **Which photograph goes with which name.** The pairing is read from the
      table — cupcakes, pink mousse, blueberry cheesecake glasses, chocolate
      naked cakes — not supplied.
- [ ] **How they are ordered.** Individually, by the box, or only as part of a
      dessert table? The site says nothing about quantities, sizes, lead time
      or price, because none was supplied. Each item opens the detail panel and
      goes straight into an enquiry.

### The red-rose topper

The red-rose cake carries a "Durai ♥ Monisha" topper. It is real commissioned
work and fine to show; it is no longer the hero, but it is still visible in the
carousel and the craft sequence.

---

## 2. Sample copy — written for the draft, needs approval

It reads as finished, but **none of it has been confirmed with Girvani and
Swapna.** There is now very little of it — about a hundred words on the page —
so approving it is a short job.

### `src/data/brand.ts`

- [ ] `manifesto` — "Every celebration has a feeling. We turn it into something you can taste."
- [ ] `momentLine` — "Made for the moments worth remembering."

### `src/data/story.ts`

Built on the one supplied fact: *they met in a baking class, became friends
straight away, and started BeyondBakes together.* "Over a sponge that refused
to rise" is invented for the draft.

- [ ] `headline` — "Two friends. One kitchen."
- [ ] `line` — the one-sentence origin
- [ ] `founders[].role` — used for screen readers and alt text only; the
      visible roles are inside the portraits themselves
- [ ] Set `STORY_IS_SAMPLE = false` once approved

### `src/data/craft.ts`

Four steps, a word and a line each. They describe a real pastry process, but
not necessarily *this* kitchen's.

- [ ] Detail — "Every flower, placed by hand."
- [ ] Texture — "Buttercream combed in a single pass."
- [ ] Time — "Set overnight. Never rushed."
- [ ] Balance — "It should taste as good as it looks."
- [ ] Set `CRAFT_IS_SAMPLE = false` once approved

### `src/data/bakes.ts` — the menu

The photographs are real work. The **names, flavours, ingredients, sizes and lead
times are invented.** Every bake carries `isSample: true`. On the page only the
name shows; the rest lives in the detail panel that opens from the carousel.

- [ ] Cake names — currently *The Vow*, *Sundae Afternoon*, *Wildflower Season*,
      *The Glasshouse*
- [ ] `flavour` for each
- [ ] `ingredients[]` — the quality details (these make specific claims: Madagascar
      vanilla, 82% cultured butter, single-origin white chocolate, no artificial
      colour). **Confirm or replace each one.**
- [ ] `details[]` — kept in the data for a future product page; not shown at present
- [ ] `sizes[]` — labels and serving counts
- [ ] `leadTime` — currently 5 days / 3 weeks / 4–6 weeks
- [ ] Set `isSample: false` per bake once approved

---

## 3. Signatures

The page no longer shows signatures — the two portraits already carry each
founder's name in their own lettering, and a typeset stand-in beside them read
as redundant. If scanned signatures are supplied, they would sit well under the
portraits in the story section.

---

## 4. Still to confirm

- [ ] **Instagram URL** — `brand.instagramUrl` is set to
      `https://instagram.com/beyondbakes.co`. Confirm this is the right account.
- [ ] **Domain** — currently `rama-na.github.io/beyond-bakes/`. If it moves, update
      `canonical` / `og:url` in `index.html` and build with `VITE_BASE=/`.
- [ ] **Logo** — the current mark is a frame extracted from the supplied animation
      (`public/brand/logo-mark.png`, 512×512). If a vector or high-resolution original
      exists, use that instead.
- [ ] **Delivery / service area** — not stated anywhere on the site. Add if wanted.
- [ ] **Lead time** — currently stated per cake. Confirm the real minimums.
- [ ] Anything the client wants said about allergens or dietary options.

---

## 5. Deliberately absent

Per the brief, the site contains **no** prices, reviews, testimonials, ratings,
statistics, awards, stock photography, or invented customer names. Please keep it
that way unless the client supplies the real thing.
