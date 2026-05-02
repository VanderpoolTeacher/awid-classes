# AWID Classes — Promotional Site Design

**Date:** 2026-05-02
**Owner:** Michael Vanderpool (AWID)
**Status:** Approved for implementation planning

## Purpose

Build a public-facing static website that promotes the classes and workshops offered by **Anthony Wayne Innovation & Design (AWID)** and lets visitors register for a class through a form on the site.

The site is a sub-experience of the parent AWID brand at `https://mvanderpool.com/aw-innovation-and-design` and will be linked from there. It is hosted independently on GitHub Pages.

## Goals

- Showcase AWID classes/workshops with rich per-class detail (audience, schedule, price, location, instructor, prerequisites, capacity, photo, learning objectives).
- Let visitors register directly on the site through a per-class form.
- Stay visually consistent with the existing AWID brand (logo, blue/gray palette, mission-aligned tone).
- Be cheap, fast, and easy to maintain — adding a class should be a small JSON edit and an image drop.

## Non-Goals (v1)

- No CMS or admin UI. Class data is edited in JSON by a developer.
- No real registration backend. The form is stubbed; submissions are not stored or emailed in v1.
- No payment processing.
- No user accounts, login, or saved profiles.
- No content management for non-technical staff (deferred — could revisit with Astro/Decap later).
- No e-commerce, calendar sync, or email automation.

## Audience

Audience is defined per class. Across the catalog, expect a mix of:

- Students (varies grade ranges by class)
- Adults / hobbyists / makers
- Small business owners and professionals

## Initial Class Catalog

Four starter classes (all AI-themed):

1. **Intro to Design and Tech with AI**
2. **AI Infused Game Design**
3. **Intro to AI and Your Business**
4. **Applied AI in Design Thinking**

Per-class fields and example data are defined in the Data Model section.

## Brand & Visual Style

- **Logo:** `assets/img/logo-wordmark-awidc.png` (copied from `/Users/michaelvanderpool/Desktop/logo-wordmark-awidc.png`). Arrowhead in royal blue with gray lens motif and wordmark below.
- **Palette** (CSS variables in `:root`):
  - `--color-primary: #1F3A93` — logo blue, primary CTAs, headings
  - `--color-accent: #A6A6A6` — logo gray, secondary text/labels
  - `--color-bg: #FFFFFF` — page background
  - `--color-text: #1A1A1A` — body text
  - `--color-section: #F5F7FB` — tinted section background (e.g. About strip)
  - `--color-border: #E5E7EB` — card and divider borders
- **Typography:** Inter (Google Fonts). Body 16px, generous line-height, semi-bold headings.
- **Layout:** Mobile-first responsive. Max content width 1200px, 24–32px section padding. Class cards 1-up < 720px, 2-up at 720–1100px, 2-up wider above 1100px.
- **Buttons:** solid blue with white text for primary; outlined blue for secondary.
- **Cards:** white, 1px gray border, subtle shadow on hover, 8px rounded corners.
- **Tone:** mission-aligned with parent AWID brand. Tagline "Closing the Gap Between Ideas and Impact" appears in the About section.
- **Accessibility:** semantic HTML, alt text on all images, WCAG AA color contrast, labeled form fields, keyboard navigation.

## Architecture

Plain static site — no build step, no framework, no npm dependencies.

- HTML files served directly by GitHub Pages.
- Class data lives in a single JSON file (`assets/data/classes.json`).
- A small amount of vanilla JavaScript renders the catalog on the home page and the detail content on the class page (driven by a `?id=…` query parameter).
- One stylesheet for the whole site.

### File layout

```
AWID Classes/
├── index.html              # Home: hero + class catalog
├── class.html              # Detail page (loads via ?id=…)
├── about.html              # About AWID + link to parent site
├── 404.html                # Friendly 404 page
├── .nojekyll               # GH Pages: skip Jekyll processing
├── README.md               # How to add a class
├── assets/
│   ├── css/
│   │   └── styles.css      # Single stylesheet
│   ├── js/
│   │   ├── catalog.js      # Renders class cards on home
│   │   ├── class-detail.js # Renders detail page from ?id=…
│   │   └── form.js         # Registration form (placeholder submit)
│   ├── img/
│   │   ├── logo-wordmark-awidc.png
│   │   └── classes/        # One hero image per class (id-based filename)
│   └── data/
│       └── classes.json    # Source of truth for all classes
└── docs/superpowers/specs/2026-05-02-awid-classes-design.md
```

## Pages

### `index.html` — Home

- **Header:** logo wordmark on the left, nav on the right (Classes anchor, About link, Contact mailto).
- **Hero:** headline "Hands-on classes in AI, design, and tech." + subline ("Workshops for makers, students, and small businesses.") + "Browse Classes ↓" button anchoring to the catalog.
- **Catalog section:** 2-up responsive grid of class cards. Each card shows hero image, audience + sessions label, class title, schedule snippet, price. Whole card is a link to `class.html?id=<id>`.
- **About strip:** AWID tagline ("Closing the Gap Between Ideas and Impact") + a short paragraph specific to the classes program + a link to the parent site.
- **Footer:** copyright, contact email (mailto), link to `mvanderpool.com/aw-innovation-and-design`.

### `class.html` — Class detail

Single template that renders any class by reading `?id=…` and looking it up in `classes.json`.

- Header and footer match `index.html`.
- Hero image with class title overlay.
- Two-column body on desktop:
  - **Left:** full description, learning objectives (bullets), prerequisites / what to bring.
  - **Right (sticky on desktop):** schedule (start date, days, time, sessions), location, price, seats remaining, instructor name + mini-bio, **Register** button.
- Registration form is a section that lives inline below the two-column body on every breakpoint. The Register button in the right rail smooth-scrolls and focuses the form. Fields: Name (required), Email (required), Phone (optional, format-checked if entered), Notes (optional). Honeypot field added for bot protection. The class title is captured automatically from the page context.
- Submit is **stubbed** in v1: validates inputs, disables button, logs payload to console, shows confirmation message ("Thanks — we'll be in touch about [Class Title].").

### `about.html` — About

- Reuse of mission/tagline from the parent AWID brand.
- Classes-specific paragraph (the workshops are the public-facing programs of AWID).
- Link back to `mvanderpool.com/aw-innovation-and-design`.
- Brief instructor bio.

### `404.html`

- Branded 404 with link back to home and to the catalog.

## Data Model

`assets/data/classes.json` is an array of class objects. Each entry:

```json
{
  "id": "intro-design-tech-ai",
  "title": "Intro to Design and Tech with AI",
  "shortDescription": "One-line summary used on the catalog card.",
  "longDescription": "Full paragraph(s) for the detail page.",
  "audience": "All ages",
  "schedule": {
    "startDate": "2026-06-04",
    "days": "Wed evenings",
    "sessions": 6,
    "time": "6:00–7:30 PM"
  },
  "price": 149,
  "location": "Anthony Wayne Local Schools, Whitehouse OH",
  "instructor": {
    "name": "Michael Vanderpool",
    "bio": "Short bio paragraph."
  },
  "prerequisites": "None — bring a laptop if you have one.",
  "capacity": 12,
  "seatsRemaining": 12,
  "heroImage": "assets/img/classes/intro-design-tech-ai.jpg",
  "learningObjectives": [
    "Understand core AI concepts in design",
    "Use AI tools to accelerate ideation",
    "Build a small prototype end-to-end"
  ]
}
```

Conventions:

- `id` is the URL slug (`class.html?id=<id>`) and matches the hero image filename.
- `price` is a number (USD). Display formatting handled in JS.
- `schedule.startDate` is ISO format. Display formatting handled in JS.
- `seatsRemaining` is editable per refresh; if `0`, the card and detail page show "Full" and the Register button is disabled.

## JavaScript Modules

Each script is a small vanilla JS file. No framework, no bundler.

- **`assets/js/catalog.js`** — fetches `classes.json` on `index.html`, renders cards into the catalog grid. Handles the "Full" state.
- **`assets/js/class-detail.js`** — on `class.html`, parses `?id=…`, fetches `classes.json`, finds the matching entry, populates the page (or shows a not-found message).
- **`assets/js/form.js`** — wires the registration form: client-side validation, honeypot check, stubbed submit (`submitRegistration` function with a TODO marker for the real endpoint), success/error states.

## Registration Form Behavior (v1)

- Fields: Name (required), Email (required, format-checked), Phone (optional, format-checked if entered), Notes (optional).
- Hidden honeypot field; if filled, silently drop submission.
- On submit: validate → disable button → call `submitRegistration(payload)` → show confirmation.
- `submitRegistration` is a stub that logs to the console and resolves `{ ok: true }`. A `TODO(awid-classes)` comment marks where to wire a real endpoint (mailto fallback, Formspree, Google Forms POST, Netlify Forms — to be decided post-v1).
- No data leaves the browser in v1.

## Hosting & Deployment

- This directory becomes a public GitHub repository.
- GitHub Pages serves the repo from `main` branch root.
- `.nojekyll` file disables Jekyll processing.
- Default URL: `https://<github-username>.github.io/<repo-name>/`.
- Custom domain (e.g., `classes.awid.example`) can be attached later without code changes.

## Error Handling

- `class.html` with a missing or unknown `id` shows a friendly "Class not found" message and a link back to the catalog.
- `classes.json` fetch failure shows a fallback message and logs to console.
- Form validation errors are shown inline next to the offending field.
- 404s for unknown URLs are caught by `404.html`.

## Testing

- **Manual smoke test before each deploy:**
  - Home page renders all classes from `classes.json`.
  - Each card links to its detail page and renders correctly.
  - Detail page handles missing/bad `id` gracefully.
  - Registration form validates required fields, rejects malformed email, accepts well-formed input, shows confirmation.
  - Mobile (≤720px), tablet (~900px), and desktop (≥1200px) layouts all render correctly.
  - Keyboard-only navigation works through nav, cards, and form.
- **HTML / CSS validation:** run W3C HTML and CSS validators against built pages.
- **Accessibility quick-pass:** axe DevTools or Lighthouse Accessibility audit scoring ≥ 95.
- **Lighthouse Performance:** target ≥ 90 on a class detail page (single hero image, no JS frameworks).

## Out of Scope (deferred)

- Real registration backend (email/Forms/Formspree wiring).
- CMS or content editing UI.
- Multi-language support.
- Search/filter/sort over the class catalog.
- Calendar exports (.ics).
- Newsletter signup.
- Analytics (could be added later via a simple GH Pages-friendly snippet).

## Open Questions

- Domain: stay on `<user>.github.io/<repo>` for v1, or attach a custom domain at launch?
- Hero images for the four starter classes — to be supplied; placeholder gradient + class title used until then.
- Final copy for the longDescription of each class — to be supplied.
- Where Register submissions should ultimately go (mailto vs Formspree vs Google Forms) — decided post-v1.
