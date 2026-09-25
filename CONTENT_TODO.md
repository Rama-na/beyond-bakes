# Content to replace before launch

Everything in `src/data/` is designed to be edited without touching a component.
This is the list of what is currently **sample copy** and what is still **missing**.

---

## 1. Photographs

Twenty-three photographs are in `public/images/`; eighteen are in use, four of
them the dessert-table crops. The full inventory — what each one is and where
it appears — is in `public/images/README.md`.

The thirteen event photographs show something the site did not say before:
BeyondBakes does whole dessert tables, not just cakes. The white dessert cart
is the full-bleed reveal, their dessert menu has its own section, and the
event work fills the filmstrip's second row.

### Sweet Indulgences — shown as the Best sellers

The event photographs show BeyondBakes' own **"Sweet Indulgences"** menu card.
It is the **Best sellers** section (and nav link), in `src/data/indulgences.ts`,
copied word for word:

- **Cupcake Royale** — Delightful vanilla cupcakes with buttercream frosting
- **Strawberry Dream** — Light and airy strawberry mousse, perfect for a summer day
- **Blueberry Bliss** — A creamy no-bake cheesecake with a burst of blueberries
- **Chocoholic's Dream** — Rich, moist chocolate cake with a rustic naked finish

**A correction:** an earlier version of this note had the last line as
"rustic *baked* finish". Read at full resolution, the card says "rustic
*naked* finish", and the site uses the card's wording.

This is supplied, not sample (`isSample: false`). Three things are still to
confirm:

- [ ] **Are these the best sellers?** The section is labelled that way because
      it was asked for; the label is ours, not theirs. If other bakes sell
      more, swap them in.
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
chef's specials carousel.

---

## 2. Sample copy — written for the draft, needs approval

It reads as finished, but **none of it has been confirmed with Girvani and
Swapna.** There is now very little of it — about a hundred words on the page —
so approving it is a short job.

### `src/data/brand.ts`

- [ ] `momentLine` — "Made for the moments worth remembering." (over the full-bleed reveal)
- `manifesto` — not shown since the page was shortened; kept in the data for later

### `src/data/story.ts`

Built on the one supplied fact: *they met in a baking class, became friends
straight away, and started BeyondBakes together.* "Over a sponge that refused
to rise" is invented for the draft.

- [ ] `headline` — "Two friends. One kitchen."
- [ ] `line` — the one-sentence origin
- [ ] `founders[].role` — used for screen readers and alt text only; the
      visible roles are inside the portraits themselves
- [ ] Set `STORY_IS_SAMPLE = false` once approved

### `src/data/testimonials.ts` — Kind words

**Four sample quotes, written for the preview. No customer said them.** They
carry no names, only an occasion, and while `TESTIMONIALS_ARE_SAMPLE` is true
the section says on the page that they are samples.

- [ ] Collect three or four real ones — Instagram DMs and comments are the
      obvious source — **with the customer's permission to quote them**
- [ ] Replace the quotes; add a first name to `occasion` if the customer agrees
- [ ] Set `TESTIMONIALS_ARE_SAMPLE = false` — the sample note disappears

The pinned craft section (Detail, Texture, Time, Balance) was cut when the page
was shortened; its copy is in git history if it is wanted again.

### `src/data/ordering.ts` — after an enquiry

The confirmation at the end of *Start an order* says what happens next. It is
drafted from the brief (orders are taken personally, over Instagram), not
confirmed:

- [ ] "We reply on Instagram."
- [ ] "We talk it through — flavour, design, your date."
- [ ] "Then it's made, for your day."
- [ ] Set `AFTER_ENQUIRY_IS_SAMPLE = false` once approved

### `src/data/bakes.ts` — the chef's specials

Shown as **Chef's specials** — the label is ours, as asked for; confirm it suits.
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

- [ ] **Go live: `ORDER_MODE`** — the proof of concept runs the order journey in
      `'preview'`: it plays through to the confirmation and sends nothing. Before
      launch, set it to `'instagram'` in `src/data/ordering.ts` so *Send* copies
      the enquiry and opens the DMs.
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
