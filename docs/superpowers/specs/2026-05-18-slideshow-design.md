# AWID Classes Overview Slideshow — Design

**Date:** 2026-05-18
**Status:** Draft, pending user review

## Purpose

A single HTML slideshow used by the instructor to present an overview of all AWID classes during live talks (open houses, sponsor pitches, partner meetings). Projector-friendly, no internet dependency beyond Google Fonts (already used by the site), no build step, opens directly in a browser.

## Scope

- One combined overview deck covering all 4 current courses, plus framing slides (title, about, sponsor, closing).
- Content auto-pulls from `assets/data/classes.json` so the deck stays in sync with the catalog as courses are added or edited.
- Out of scope: per-course decks, speaker notes, PDF export, transitions/animations, multi-deck routing.

## Files

```
slides.html                Markup shell + slide container
assets/css/slides.css      Projection-optimized styles, isolated from site CSS
assets/js/slides.js        Loads classes.json, builds course slides, handles navigation
```

Rationale: `slides.css` and `slides.js` are separate from the site's `styles.css` and existing JS modules because slide presentation is a distinct concern (fullscreen, no chrome, large type) and combining would make `styles.css` harder to reason about.

## Slide order

1. **Title** — AWID logo + tagline "Hands-on classes in AI, design, and tech."
2. **About AWID** — mission copy reused from `index.html`'s about strip.
3. **Sponsor** — Actual Reality Technologies, reusing `assets/img/ART-logo-sponsored-by.png`.
4. **Intro to Design and Tech with AI** — from `classes.json` (`id: intro-design-tech-ai`).
5. **Introduction to a Career in Tech** — from `classes.json` (`id: intro-career-in-tech`).
6. **AI Infused Game Design** — from `classes.json` (`id: ai-infused-game-design`).
7. **Applied AI in Design Thinking** — from `classes.json` (`id: applied-ai-design-thinking`). The May 29, 2026 workshop date appears via the standard schedule rendering described in the course template below.
8. **Closing** — "Register at [site URL]" + contact email.

Course-slide template renders, in order: course title, short description, audience, schedule (only the fields that are populated), and up to 5 learning objectives (the first 5 if more exist — keeps slides legible on projection).

Course slide ordering is fixed in `slides.js` by an explicit array of IDs, not by the JSON's array order. This avoids accidental reordering if the catalog list is rearranged later.

## Navigation

Keyboard:
- `→`, `Space`, `PageDown` → next slide
- `←`, `PageUp` → previous slide
- `Home` → first slide
- `End` → last slide
- `F` → toggle fullscreen

Pointer:
- Click on the right half of the viewport → next slide
- Click on the left half → previous slide
- Links inside slides (e.g., contact email) are clickable normally; click navigation ignores clicks on `<a>` elements.

URL:
- The URL hash reflects the current slide index, e.g. `slides.html#3`. Reloading or sharing the link restores that slide.
- Invalid hashes (non-numeric, out of range) fall back to slide 1.

UI:
- A small slide counter ("3 / 8") in the bottom-right corner.
- No prev/next buttons on screen — keyboard and click halves are sufficient and keep the projection clean.

## Visual style

- Uses the existing site palette and Inter font loaded from Google Fonts (already linked from `index.html`; `slides.html` links it the same way).
- Each slide is full-viewport, content centered, with generous padding and a max-width on text columns.
- Course slides use the existing brand orange as an accent color for the course title.
- No slide transitions — instant cut between slides. (Transitions add no value on projection and can stutter on weaker laptops.)
- Color values are defined directly in `slides.css` (duplicating the few brand tokens used — orange accent, text/background — rather than importing `styles.css`, since slides do not need site header/footer/catalog styles).

## Data flow

1. `slides.html` loads — empty `<main data-slides>` container, slide counter, link to `slides.css`, `<script type="module" src="assets/js/slides.js">`.
2. `slides.js` fetches `assets/data/classes.json`.
3. On success: builds the 8 slide elements in order, appends them to the container, reads `location.hash` to determine the starting slide, attaches keyboard/click/hashchange listeners.
4. On failure: builds slides 1–3 and 8 normally; for slides 4–7 inserts a placeholder slide reading "Course data unavailable — refresh to retry." Logs the error to console.

## Error handling

- `classes.json` fetch failure: degrade as above. The deck still presents the framing slides.
- A course ID referenced by `slides.js` but missing from `classes.json` (e.g., one is renamed): the slide for that course renders a placeholder "Course not found: <id>" rather than blanking. Logged to console.
- Fullscreen API unavailable (rare): `F` key is a no-op; everything else works.

## Testing

Manual verification before the work is considered done:

1. Open `slides.html` in a desktop browser. All 8 slides render.
2. Keyboard navigation works for all bindings listed above.
3. Click-half navigation works; clicking a link inside a slide opens the link, not advances the slide.
4. `slides.html#5` loads slide 5 directly; refreshing on slide 5 stays on slide 5.
5. Fullscreen via `F` works in Chrome and Safari.
6. Project to a second display (or just enter fullscreen on a 1080p monitor): all slide content fits without scrolling at projector-typical resolutions.
7. Temporarily rename `classes.json` to simulate fetch failure: framing slides render, course slides show the placeholder.

No automated tests — consistent with the rest of the site, which has none.

## Open questions

None — all major decisions are settled. Implementation may surface small choices (exact pixel sizes, breakpoint behavior) that will be made inline with reference to the existing `styles.css` conventions.
