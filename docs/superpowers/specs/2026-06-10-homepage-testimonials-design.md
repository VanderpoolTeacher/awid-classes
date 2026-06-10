# Homepage testimonials — design

**Date:** 2026-06-10
**Status:** Approved

## Goal

Add a testimonials section to the AWID Classes homepage so social proof from
past workshop participants appears alongside the class catalog. Seed it with the
first testimonial (from a charter-school educator who attended the May 29
*Applied AI in Design Thinking* workshop).

## Approach

Mirror the existing `classes.json` → JS module → `index.html` section pattern.
No new dependencies, no build step — static JSON fetched and rendered client-side,
consistent with `catalog.js`.

## Components

### Data — `assets/data/testimonials.json`

An array of testimonial objects:

```json
[
  {
    "id": "testimonial-001",
    "quote": "<full verbatim text, may contain multiple paragraphs>",
    "attribution": "A newly exuberant AI student",
    "class": "applied-ai-design-thinking"
  }
]
```

- `id` — stable, immutable identifier (`testimonial-NNN`).
- `quote` — the testimonial text, verbatim. Multi-paragraph quotes are stored as
  a single string with `\n\n` paragraph breaks (renderer splits on blank lines).
- `attribution` — display name/signature. Anonymous for the seed entry.
- `class` — class id from `classes.json` (informational link; not required to
  render). Omit or `null` for a general testimonial.

### Render — `assets/js/testimonials.js`

An ES module matching the shape of `catalog.js`:

- Constant `DATA_URL = "assets/data/testimonials.json"`.
- Reuse the same `escapeHtml` helper (copied; the two modules don't share a lib
  today, so duplicating one small function keeps each self-contained).
- `init()`: locate `[data-testimonials]`; if absent, return. Fetch with
  `{ cache: "no-cache" }`; on `!res.ok` throw.
- Render: build one `<figure class="testimonial">` per entry — `<blockquote>`
  with one `<p>` per paragraph (split the quote on `\n\n`, escape each), plus a
  `<figcaption class="testimonial__attribution">` with the attribution.
- **Single-item behavior:** render whenever there is ≥1 testimonial (per decision).
- Empty state: if the array is empty, hide the section (set the section's
  `hidden` attribute) rather than showing a placeholder — an empty "what people
  say" heading reads worse than no section.
- Error state: log to console and leave a quiet fallback message, matching
  `catalog.js`'s error handling.

### Markup — `index.html`

A new section placed **between** the `catalog` section and the "Free,
self-paced course" strip:

```html
<section class="testimonials section section--tinted" id="testimonials"
         aria-labelledby="testimonials-heading" hidden>
  <div class="container">
    <h2 id="testimonials-heading">What people are saying</h2>
    <div class="testimonials__list" data-testimonials></div>
  </div>
</section>
```

- Starts `hidden`; the script removes `hidden` once at least one testimonial
  renders, so users with JS disabled / a failed fetch never see an empty shell.
- Add `<script type="module" src="assets/js/testimonials.js"></script>` next to
  the existing catalog script tag.

### Styles — `assets/css/styles.css`

A small `.testimonials` / `.testimonial` block reusing existing tokens
(`--space-*`, `.container`, `.section`, `.section--tinted`, card styling).
`.testimonials__list` centered, comfortable max-width for readable line length;
`.testimonial` styled as a quote card; `.testimonial__attribution` de-emphasized.

## Out of scope (YAGNI)

- No carousel/slider — a simple stacked list is enough for one (and a handful of)
  testimonials.
- No per-class testimonial filtering page — the `class` field is stored for
  future use but not surfaced yet.
- No admin/CMS — testimonials are added by editing the JSON file.

## Testing / verification

- `testimonials.json` is valid JSON.
- `testimonials.js` parses (no syntax errors).
- Headless-Chrome screenshot of the homepage shows the section rendering with the
  seed testimonial between the catalog and the course strip.
- With an empty array, the section is hidden.

## Workflow

Per the project's one-PR-per-concern process: GitHub issue → branch
`feature/<n>-homepage-testimonials` → PR closing it → DESIGN-LOG entry.
