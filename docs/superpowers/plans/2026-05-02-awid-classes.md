# AWID Classes — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static promotional/registration site for Anthony Wayne Innovation & Design (AWID) classes, hosted on GitHub Pages.

**Architecture:** Plain static site. Three HTML pages (`index.html`, `class.html`, `about.html`) plus a `404.html`. All class data lives in a single `assets/data/classes.json` consumed by small vanilla-JS modules that render the catalog and detail pages. One stylesheet. No build step, no framework, no npm.

**Tech Stack:** HTML5, CSS3 (custom properties + flexbox/grid), vanilla JavaScript (ES modules, `fetch`), Google Fonts (Inter), GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-05-02-awid-classes-design.md`

**Note on testing:** This is a small static site. Rather than introducing a JS test framework, each task ends with a concrete browser-based verification step (load the page, confirm a specific behavior). A final pass adds Lighthouse + W3C validation.

---

### Task 1: Initialize the repository

**Files:**
- Create: `.gitignore`
- Create: `.nojekyll`
- Create: `README.md` (skeleton — final content added in Task 12)
- Create: `assets/img/logo-wordmark-awidc.png` (copied from Desktop)
- Create directories: `assets/css/`, `assets/js/`, `assets/img/classes/`, `assets/data/`

- [ ] **Step 1: Initialize git in the project root**

Run from `/Users/michaelvanderpool/Documents/GitHub/AWID Classes`:

```bash
git init
git branch -M main
```

- [ ] **Step 2: Write `.gitignore`**

Create `.gitignore`:

```
# OS
.DS_Store
Thumbs.db

# Editors
.vscode/
.idea/
*.swp

# Brainstorming companion (local only)
.superpowers/

# Logs
*.log
```

- [ ] **Step 3: Create `.nojekyll`**

Create empty file `.nojekyll` (tells GitHub Pages not to run Jekyll):

```bash
touch .nojekyll
```

- [ ] **Step 4: Create asset directories**

```bash
mkdir -p assets/css assets/js assets/img/classes assets/data
```

- [ ] **Step 5: Copy logo into the project**

```bash
cp "/Users/michaelvanderpool/Desktop/logo-wordmark-awidc.png" assets/img/logo-wordmark-awidc.png
```

Verify: `ls assets/img/logo-wordmark-awidc.png` succeeds.

- [ ] **Step 6: Create README skeleton**

Create `README.md`:

```markdown
# AWID Classes

Promotional and registration site for Anthony Wayne Innovation & Design (AWID) classes and workshops.

Detailed contributor docs are added in the final task of the implementation plan.
```

- [ ] **Step 7: Initial commit**

```bash
git add .gitignore .nojekyll README.md assets/img/logo-wordmark-awidc.png
git commit -m "chore: initialize project and add AWID logo"
```

Verify: `git log --oneline` shows one commit.

---

### Task 2: Base styles and design tokens

**Files:**
- Create: `assets/css/styles.css`

- [ ] **Step 1: Write the stylesheet base**

Create `assets/css/styles.css`:

```css
/* ---------- Design tokens ---------- */
:root {
  --color-primary: #1F3A93;
  --color-primary-dark: #16306C;
  --color-accent: #A6A6A6;
  --color-bg: #FFFFFF;
  --color-section: #F5F7FB;
  --color-text: #1A1A1A;
  --color-muted: #555555;
  --color-border: #E5E7EB;

  --font-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
               Roboto, Helvetica, Arial, sans-serif;

  --radius: 8px;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);

  --max-width: 1200px;
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-5: 48px;
  --space-6: 80px;
}

/* ---------- Reset / base ---------- */
*,
*::before,
*::after { box-sizing: border-box; }

html, body { margin: 0; padding: 0; }

body {
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.55;
  color: var(--color-text);
  background: var(--color-bg);
  -webkit-font-smoothing: antialiased;
}

img { max-width: 100%; display: block; }

a {
  color: var(--color-primary);
  text-decoration: none;
}
a:hover, a:focus { text-decoration: underline; }

h1, h2, h3, h4 {
  margin: 0 0 var(--space-2);
  line-height: 1.25;
  font-weight: 600;
  color: var(--color-text);
}

h1 { font-size: clamp(28px, 4vw, 42px); color: var(--color-primary); }
h2 { font-size: clamp(22px, 3vw, 30px); color: var(--color-primary); }
h3 { font-size: 18px; }

p { margin: 0 0 var(--space-2); color: var(--color-muted); }

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-4);
}

.section {
  padding: var(--space-5) 0;
}

.section--tinted {
  background: var(--color-section);
}

.label {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 11px;
  color: var(--color-accent);
}

/* ---------- Buttons ---------- */
.btn {
  display: inline-block;
  padding: 12px 24px;
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  border: 2px solid transparent;
  text-decoration: none;
  transition: background 0.15s, transform 0.05s;
}
.btn:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}
.btn--primary {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}
.btn--primary:hover { background: var(--color-primary-dark); text-decoration: none; }
.btn--primary[disabled] { background: var(--color-accent); border-color: var(--color-accent); cursor: not-allowed; }
.btn--secondary {
  background: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}
.btn--secondary:hover { background: var(--color-primary); color: #fff; text-decoration: none; }

/* ---------- Visually hidden (accessibility) ---------- */
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}
```

- [ ] **Step 2: Commit**

```bash
git add assets/css/styles.css
git commit -m "feat(styles): add base styles and design tokens"
```

---

### Task 3: Site header and footer (shared markup)

**Files:**
- Create: `index.html`
- Modify: `assets/css/styles.css`

- [ ] **Step 1: Append header/footer styles to `assets/css/styles.css`**

Append:

```css
/* ---------- Header ---------- */
.site-header {
  border-bottom: 1px solid var(--color-border);
  background: #fff;
}
.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-2) var(--space-4);
  max-width: var(--max-width);
  margin: 0 auto;
}
.site-header__logo img { height: 44px; width: auto; }
.site-header__nav {
  display: flex;
  gap: var(--space-3);
}
.site-header__nav a {
  color: var(--color-text);
  font-weight: 500;
  font-size: 15px;
}
@media (max-width: 540px) {
  .site-header__inner { flex-direction: column; gap: var(--space-2); padding: var(--space-2); }
}

/* ---------- Footer ---------- */
.site-footer {
  border-top: 1px solid var(--color-border);
  padding: var(--space-3) var(--space-4);
  font-size: 14px;
  color: var(--color-muted);
  background: #fff;
}
.site-footer__inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-2);
}
```

- [ ] **Step 2: Create `index.html` skeleton with header and footer**

Create `index.html`:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>AWID Classes — Hands-on classes in AI, design, and tech</title>
  <meta name="description" content="Anthony Wayne Innovation &amp; Design — workshops for makers, students, and small businesses.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
  <header class="site-header">
    <div class="site-header__inner">
      <a class="site-header__logo" href="index.html" aria-label="AWID Classes home">
        <img src="assets/img/logo-wordmark-awidc.png" alt="Anthony Wayne Innovation &amp; Design">
      </a>
      <nav class="site-header__nav" aria-label="Primary">
        <a href="index.html#catalog">Classes</a>
        <a href="about.html">About</a>
        <a href="mailto:contact@example.com">Contact</a>
      </nav>
    </div>
  </header>

  <main id="main">
    <!-- Hero, catalog, and about sections added in later tasks -->
  </main>

  <footer class="site-footer">
    <div class="site-footer__inner">
      <div>© <span id="footer-year"></span> Anthony Wayne Innovation &amp; Design</div>
      <div>
        <a href="mailto:contact@example.com">contact@example.com</a>
        ·
        <a href="https://mvanderpool.com/aw-innovation-and-design">mvanderpool.com</a>
      </div>
    </div>
  </footer>

  <script>
    document.getElementById("footer-year").textContent = new Date().getFullYear();
  </script>
</body>
</html>
```

- [ ] **Step 3: Verify in browser**

Run from project root:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/index.html`. Expected: header with logo and nav (Classes, About, Contact); empty main area; footer with current year, contact mailto, and link to mvanderpool.com. No console errors.

Stop the server with Ctrl-C.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/styles.css
git commit -m "feat: add site header, footer, and index.html shell"
```

---

### Task 4: Home hero section

**Files:**
- Modify: `index.html`
- Modify: `assets/css/styles.css`

- [ ] **Step 1: Append hero styles to `assets/css/styles.css`**

Append:

```css
/* ---------- Hero ---------- */
.hero {
  background: linear-gradient(180deg, var(--color-section) 0%, #fff 100%);
  text-align: center;
  padding: var(--space-6) var(--space-4);
}
.hero h1 {
  margin-bottom: var(--space-2);
}
.hero__subline {
  font-size: 18px;
  color: var(--color-muted);
  margin-bottom: var(--space-4);
}
```

- [ ] **Step 2: Insert hero markup inside `<main>` in `index.html`**

Replace the placeholder comment in `<main id="main">` with:

```html
    <section class="hero" aria-labelledby="hero-heading">
      <div class="container">
        <h1 id="hero-heading">Hands-on classes in AI, design, and tech.</h1>
        <p class="hero__subline">Workshops for makers, students, and small businesses.</p>
        <a class="btn btn--primary" href="#catalog">Browse Classes ↓</a>
      </div>
    </section>

    <!-- Catalog and about sections added in later tasks -->
```

- [ ] **Step 3: Verify in browser**

Start `python3 -m http.server 8000`, open `http://localhost:8000/`. Expected: hero with the headline, subline, and a blue "Browse Classes" button. Clicking the button does nothing visible yet (anchor target is added in next task). No console errors.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/styles.css
git commit -m "feat(home): add hero section"
```

---

### Task 5: Class data file

**Files:**
- Create: `assets/data/classes.json`

- [ ] **Step 1: Write `assets/data/classes.json`**

Note: `schedule` values, `price`, `seatsRemaining`, `bio`, and `longDescription` are placeholders the user will refine after launch. Keep them realistic so the layout reads naturally.

```json
[
  {
    "id": "intro-design-tech-ai",
    "title": "Intro to Design and Tech with AI",
    "shortDescription": "A friendly first step into using AI tools to design and build.",
    "longDescription": "Get a hands-on introduction to AI tools that are reshaping how people design and build today. We'll explore prompting, generative tools, and a simple end-to-end project so you leave with something you made.",
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
      "bio": "Founder and instructor at AWID. Background in design, technology education, and applied innovation."
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
  },
  {
    "id": "ai-infused-game-design",
    "title": "AI Infused Game Design",
    "shortDescription": "Design and build a small game using AI-assisted tools.",
    "longDescription": "Students will work through the full arc of game design — concept, mechanics, art, and playtest — using AI tools as a creative partner. We finish with a playable mini-game.",
    "audience": "Grades 6–12",
    "schedule": {
      "startDate": "2026-06-07",
      "days": "Sat mornings",
      "sessions": 4,
      "time": "10:00–11:30 AM"
    },
    "price": 99,
    "location": "Anthony Wayne Local Schools, Whitehouse OH",
    "instructor": {
      "name": "Michael Vanderpool",
      "bio": "Founder and instructor at AWID. Background in design, technology education, and applied innovation."
    },
    "prerequisites": "Curiosity. Laptops provided if needed.",
    "capacity": 14,
    "seatsRemaining": 14,
    "heroImage": "assets/img/classes/ai-infused-game-design.jpg",
    "learningObjectives": [
      "Frame a game concept and core mechanic",
      "Use AI tools for art, ideation, and writing",
      "Playtest, iterate, and ship a small game"
    ]
  },
  {
    "id": "intro-ai-business",
    "title": "Intro to AI and Your Business",
    "shortDescription": "Practical AI for small business owners — what's real, what works, what to skip.",
    "longDescription": "A grounded, no-hype workshop for owners and operators. We'll look at where AI is genuinely useful in small business workflows, walk through a few real tools, and leave with one or two changes you can apply this month.",
    "audience": "Small business owners and operators",
    "schedule": {
      "startDate": "2026-06-12",
      "days": "Thu evenings",
      "sessions": 3,
      "time": "6:30–8:00 PM"
    },
    "price": 179,
    "location": "Anthony Wayne Local Schools, Whitehouse OH",
    "instructor": {
      "name": "Michael Vanderpool",
      "bio": "Founder and instructor at AWID. Background in design, technology education, and applied innovation."
    },
    "prerequisites": "Bring a laptop and a real workflow you'd like to improve.",
    "capacity": 16,
    "seatsRemaining": 16,
    "heroImage": "assets/img/classes/intro-ai-business.jpg",
    "learningObjectives": [
      "Spot where AI actually helps in your business",
      "Try 2–3 tools against your own workflows",
      "Leave with a one-page action plan"
    ]
  },
  {
    "id": "applied-ai-design-thinking",
    "title": "Applied AI in Design Thinking",
    "shortDescription": "Use AI as a partner across the design thinking process — empathize through test.",
    "longDescription": "A working session for professionals already comfortable with design thinking. We'll plug AI tools into each phase of the process, look at where they help and where they get in the way, and leave with a refined personal toolkit.",
    "audience": "Professionals familiar with design thinking",
    "schedule": {
      "startDate": "2026-06-10",
      "days": "Tue evenings",
      "sessions": 5,
      "time": "6:00–7:30 PM"
    },
    "price": 199,
    "location": "Anthony Wayne Local Schools, Whitehouse OH",
    "instructor": {
      "name": "Michael Vanderpool",
      "bio": "Founder and instructor at AWID. Background in design, technology education, and applied innovation."
    },
    "prerequisites": "Some prior exposure to design thinking. Bring a laptop.",
    "capacity": 12,
    "seatsRemaining": 12,
    "heroImage": "assets/img/classes/applied-ai-design-thinking.jpg",
    "learningObjectives": [
      "Map AI tools to each design thinking phase",
      "Evaluate AI outputs against real research data",
      "Build a personal AI-augmented toolkit"
    ]
  }
]
```

- [ ] **Step 2: Validate the JSON**

Run:

```bash
python3 -c "import json; json.load(open('assets/data/classes.json')); print('OK')"
```

Expected output: `OK`.

- [ ] **Step 3: Commit**

```bash
git add assets/data/classes.json
git commit -m "feat(data): add starter classes catalog (4 entries)"
```

---

### Task 6: Catalog rendering on home page

**Files:**
- Modify: `index.html`
- Create: `assets/js/catalog.js`
- Modify: `assets/css/styles.css`

- [ ] **Step 1: Append catalog/card styles to `assets/css/styles.css`**

Append:

```css
/* ---------- Catalog ---------- */
.catalog {
  padding: var(--space-5) 0;
}
.catalog__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-3);
}
@media (min-width: 720px) {
  .catalog__grid { grid-template-columns: repeat(2, 1fr); }
}

.card {
  display: block;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  overflow: hidden;
  color: var(--color-text);
  text-decoration: none;
  transition: box-shadow 0.15s, transform 0.05s;
}
.card:hover {
  box-shadow: var(--shadow-md);
  text-decoration: none;
}
.card:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}

.card__image {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 12px;
  text-align: center;
  padding: 0 var(--space-2);
}
.card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card__body { padding: var(--space-2) var(--space-3); }
.card__title { margin: var(--space-1) 0; font-size: 18px; color: var(--color-text); }
.card__meta { color: var(--color-muted); font-size: 14px; }
.card__price { color: var(--color-primary); font-weight: 600; }

.card[aria-disabled="true"] { opacity: 0.65; }
.card__full-tag {
  display: inline-block;
  margin-left: var(--space-1);
  padding: 2px 8px;
  background: var(--color-accent);
  color: #fff;
  border-radius: 4px;
  font-size: 11px;
  text-transform: uppercase;
}

/* Empty / error states */
.catalog__message {
  text-align: center;
  color: var(--color-muted);
  padding: var(--space-4);
}
```

- [ ] **Step 2: Add the catalog section to `index.html`**

Insert this section right before the `<!-- Catalog and about sections added in later tasks -->` comment in `<main>`, then remove that comment:

```html
    <section class="catalog section" id="catalog" aria-labelledby="catalog-heading">
      <div class="container">
        <h2 id="catalog-heading">Upcoming classes</h2>
        <div class="catalog__grid" id="catalog-grid" data-catalog>
          <p class="catalog__message">Loading classes…</p>
        </div>
      </div>
    </section>
```

Then add the script tag at the bottom of `<body>`, just before `</body>`:

```html
  <script type="module" src="assets/js/catalog.js"></script>
```

- [ ] **Step 3: Create `assets/js/catalog.js`**

Create `assets/js/catalog.js`:

```js
const DATA_URL = "assets/data/classes.json";

function formatStartDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function renderCard(cls) {
  const isFull = cls.seatsRemaining <= 0;
  const a = document.createElement("a");
  a.className = "card";
  a.href = `class.html?id=${encodeURIComponent(cls.id)}`;
  if (isFull) a.setAttribute("aria-disabled", "true");

  const audienceLabel = `${cls.audience.toUpperCase()} · ${cls.schedule.sessions} SESSIONS`;
  const scheduleSnippet = `${cls.schedule.days} · starts ${formatStartDate(cls.schedule.startDate)}`;
  const priceLabel = `$${cls.price}`;

  a.innerHTML = `
    <div class="card__image" role="img" aria-label="${cls.title} hero image">
      ${cls.title}
    </div>
    <div class="card__body">
      <div class="label">${audienceLabel}${isFull ? '<span class="card__full-tag">Full</span>' : ""}</div>
      <h3 class="card__title">${cls.title}</h3>
      <p class="card__meta">${scheduleSnippet} · <span class="card__price">${priceLabel}</span></p>
    </div>
  `;
  return a;
}

async function init() {
  const grid = document.querySelector("[data-catalog]");
  if (!grid) return;
  try {
    const res = await fetch(DATA_URL, { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const classes = await res.json();
    grid.innerHTML = "";
    if (!classes.length) {
      grid.innerHTML = `<p class="catalog__message">No classes scheduled right now — check back soon.</p>`;
      return;
    }
    classes.forEach(cls => grid.appendChild(renderCard(cls)));
  } catch (err) {
    console.error("Failed to load classes:", err);
    grid.innerHTML = `<p class="catalog__message">We couldn't load the class catalog. Please refresh or try again later.</p>`;
  }
}

init();
```

Note: the `card__image` is a gradient block with the class title overlay. Real hero images are added later by dropping JPGs into `assets/img/classes/` matching the `id`. To swap to images later, update `renderCard` to render an `<img>` when `cls.heroImage` exists and the file is present.

- [ ] **Step 4: Verify in browser**

Start `python3 -m http.server 8000`, open `http://localhost:8000/`. Expected:

- 4 cards render under "Upcoming classes" heading
- Each card has audience/sessions label, title, schedule + price
- Hovering a card shows shadow
- Clicking a card navigates to `class.html?id=…` (404 expected for now — that page is built next)
- Hero "Browse Classes" button now scrolls to the catalog
- No console errors

- [ ] **Step 5: Commit**

```bash
git add index.html assets/js/catalog.js assets/css/styles.css
git commit -m "feat(home): render class catalog from classes.json"
```

---

### Task 7: About strip on home page

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add the about strip to `index.html`**

Add this section in `<main>` after the catalog section and before `</main>`:

```html
    <section class="section section--tinted" aria-labelledby="about-strip-heading">
      <div class="container" style="text-align:center;">
        <h2 id="about-strip-heading">Closing the Gap Between Ideas and Impact</h2>
        <p style="max-width:680px;margin:0 auto var(--space-3);">
          AWID classes are the public-facing programs of Anthony Wayne Innovation &amp; Design.
          We run hands-on workshops in AI, design, and technology for students, makers, and small businesses
          across Northwest Ohio.
        </p>
        <a class="btn btn--secondary" href="about.html">Learn more about AWID</a>
      </div>
    </section>
```

- [ ] **Step 2: Verify in browser**

Reload `http://localhost:8000/`. Expected: tinted About strip below the catalog with the tagline, paragraph, and "Learn more about AWID" button. Button click 404s for now (about.html built later).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat(home): add About strip"
```

---

### Task 8: Class detail page

**Files:**
- Create: `class.html`
- Create: `assets/js/class-detail.js`
- Modify: `assets/css/styles.css`

- [ ] **Step 1: Append detail-page styles to `assets/css/styles.css`**

Append:

```css
/* ---------- Class detail ---------- */
.class-hero {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: #fff;
  padding: var(--space-6) var(--space-4);
}
.class-hero__inner {
  max-width: var(--max-width);
  margin: 0 auto;
}
.class-hero h1 { color: #fff; margin-bottom: var(--space-1); }
.class-hero__audience {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 12px;
  opacity: 0.85;
  margin-bottom: var(--space-2);
}
.class-hero__short { font-size: 18px; opacity: 0.95; max-width: 780px; }

.class-body {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
  padding: var(--space-5) 0;
}
@media (min-width: 900px) {
  .class-body { grid-template-columns: minmax(0, 1fr) 320px; }
}

.class-body__main h2 { margin-top: var(--space-3); }
.class-body__main ul { padding-left: 1.25em; color: var(--color-muted); }
.class-body__main li { margin-bottom: var(--space-1); }

.class-rail {
  background: var(--color-section);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--space-3);
}
@media (min-width: 900px) {
  .class-rail { position: sticky; top: var(--space-3); align-self: start; }
}
.class-rail__row {
  display: flex;
  justify-content: space-between;
  padding: var(--space-1) 0;
  border-bottom: 1px solid var(--color-border);
  font-size: 14px;
}
.class-rail__row:last-of-type { border-bottom: 0; }
.class-rail__row dt { color: var(--color-muted); margin: 0; }
.class-rail__row dd { margin: 0; font-weight: 500; text-align: right; }
.class-rail__price { font-size: 24px; color: var(--color-primary); font-weight: 700; margin: var(--space-2) 0; }
.class-rail__instructor { margin-top: var(--space-3); }
.class-rail__cta { display: block; width: 100%; text-align: center; margin-top: var(--space-2); }

.class-not-found { text-align: center; padding: var(--space-6) var(--space-4); }
```

- [ ] **Step 2: Create `class.html`**

Create `class.html`:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title id="page-title">Class — AWID</title>
  <meta name="description" content="An AWID class detail page.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
  <header class="site-header">
    <div class="site-header__inner">
      <a class="site-header__logo" href="index.html" aria-label="AWID Classes home">
        <img src="assets/img/logo-wordmark-awidc.png" alt="Anthony Wayne Innovation &amp; Design">
      </a>
      <nav class="site-header__nav" aria-label="Primary">
        <a href="index.html#catalog">Classes</a>
        <a href="about.html">About</a>
        <a href="mailto:contact@example.com">Contact</a>
      </nav>
    </div>
  </header>

  <main id="main">
    <div id="class-content" data-class-detail>
      <p class="class-not-found">Loading class…</p>
    </div>
  </main>

  <footer class="site-footer">
    <div class="site-footer__inner">
      <div>© <span id="footer-year"></span> Anthony Wayne Innovation &amp; Design</div>
      <div>
        <a href="mailto:contact@example.com">contact@example.com</a>
        ·
        <a href="https://mvanderpool.com/aw-innovation-and-design">mvanderpool.com</a>
      </div>
    </div>
  </footer>

  <script>
    document.getElementById("footer-year").textContent = new Date().getFullYear();
  </script>
  <script type="module" src="assets/js/class-detail.js"></script>
</body>
</html>
```

- [ ] **Step 3: Create `assets/js/class-detail.js`**

Create `assets/js/class-detail.js`:

```js
const DATA_URL = "assets/data/classes.json";

function getQueryId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatStartDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric", year: "numeric"
  });
}

function renderNotFound(container, idHint) {
  container.innerHTML = `
    <section class="class-not-found">
      <h1>Class not found</h1>
      <p>We couldn't find a class with id <code>${escapeHtml(idHint || "")}</code>.</p>
      <p><a class="btn btn--primary" href="index.html#catalog">Back to all classes</a></p>
    </section>
  `;
}

function renderClass(container, cls) {
  document.getElementById("page-title").textContent = `${cls.title} — AWID`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", cls.shortDescription);

  const isFull = cls.seatsRemaining <= 0;
  const objectiveItems = cls.learningObjectives
    .map(o => `<li>${escapeHtml(o)}</li>`).join("");

  container.innerHTML = `
    <section class="class-hero" aria-labelledby="class-title">
      <div class="class-hero__inner">
        <p class="class-hero__audience">${escapeHtml(cls.audience)} · ${cls.schedule.sessions} sessions</p>
        <h1 id="class-title">${escapeHtml(cls.title)}</h1>
        <p class="class-hero__short">${escapeHtml(cls.shortDescription)}</p>
      </div>
    </section>

    <section class="container">
      <div class="class-body">
        <div class="class-body__main">
          <h2>About this class</h2>
          <p>${escapeHtml(cls.longDescription)}</p>

          <h2>What you'll learn</h2>
          <ul>${objectiveItems}</ul>

          <h2>Prerequisites &amp; what to bring</h2>
          <p>${escapeHtml(cls.prerequisites)}</p>
        </div>

        <aside class="class-rail" aria-label="Class details">
          <div class="class-rail__price">$${cls.price}</div>
          <dl>
            <div class="class-rail__row"><dt>Starts</dt><dd>${formatStartDate(cls.schedule.startDate)}</dd></div>
            <div class="class-rail__row"><dt>Schedule</dt><dd>${escapeHtml(cls.schedule.days)}</dd></div>
            <div class="class-rail__row"><dt>Time</dt><dd>${escapeHtml(cls.schedule.time)}</dd></div>
            <div class="class-rail__row"><dt>Sessions</dt><dd>${cls.schedule.sessions}</dd></div>
            <div class="class-rail__row"><dt>Location</dt><dd>${escapeHtml(cls.location)}</dd></div>
            <div class="class-rail__row"><dt>Seats left</dt><dd>${isFull ? "Full" : cls.seatsRemaining}</dd></div>
          </dl>
          <div class="class-rail__instructor">
            <strong>${escapeHtml(cls.instructor.name)}</strong>
            <p style="margin-top:4px;font-size:14px;">${escapeHtml(cls.instructor.bio)}</p>
          </div>
          <a class="btn btn--primary class-rail__cta"
             href="#register"
             ${isFull ? 'aria-disabled="true" tabindex="-1" onclick="event.preventDefault()"' : ""}>
            ${isFull ? "Class full" : "Register"}
          </a>
        </aside>
      </div>
    </section>

    <!-- Registration form added in next task -->
    <div id="register-anchor" data-class-id="${escapeHtml(cls.id)}" data-class-title="${escapeHtml(cls.title)}" data-is-full="${isFull}"></div>
  `;
}

async function init() {
  const container = document.querySelector("[data-class-detail]");
  if (!container) return;
  const id = getQueryId();
  if (!id) {
    renderNotFound(container, "");
    return;
  }
  try {
    const res = await fetch(DATA_URL, { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const classes = await res.json();
    const cls = classes.find(c => c.id === id);
    if (!cls) {
      renderNotFound(container, id);
      return;
    }
    renderClass(container, cls);
  } catch (err) {
    console.error("Failed to load class:", err);
    container.innerHTML = `
      <section class="class-not-found">
        <h1>Couldn't load this class</h1>
        <p>Please refresh the page or try again later.</p>
        <p><a class="btn btn--primary" href="index.html#catalog">Back to all classes</a></p>
      </section>`;
  }
}

init();
```

- [ ] **Step 4: Verify in browser**

Start `python3 -m http.server 8000`. Test these URLs:

1. `http://localhost:8000/class.html?id=intro-design-tech-ai` → renders the class with hero, two-column body, and right rail.
2. `http://localhost:8000/class.html?id=does-not-exist` → "Class not found" with link back to catalog.
3. `http://localhost:8000/class.html` (no id) → also shows "Class not found".
4. From home, click any catalog card → lands on the correct detail page.

Resize the window narrower than 900px → right rail stacks below the main content. No console errors.

- [ ] **Step 5: Commit**

```bash
git add class.html assets/js/class-detail.js assets/css/styles.css
git commit -m "feat(class): add class detail page with right rail"
```

---

### Task 9: Registration form (stubbed)

**Files:**
- Modify: `assets/js/class-detail.js`
- Create: `assets/js/form.js`
- Modify: `assets/css/styles.css`

- [ ] **Step 1: Append form styles to `assets/css/styles.css`**

Append:

```css
/* ---------- Registration form ---------- */
.register {
  background: var(--color-section);
  border-top: 1px solid var(--color-border);
  padding: var(--space-5) 0;
}
.register__form {
  max-width: 600px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--space-4);
}
.register__field {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--space-2);
}
.register__field label {
  font-weight: 500;
  margin-bottom: 4px;
  font-size: 14px;
}
.register__field input,
.register__field textarea {
  font: inherit;
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: #fff;
}
.register__field input:focus,
.register__field textarea:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 1px;
  border-color: var(--color-primary);
}
.register__field--invalid input,
.register__field--invalid textarea { border-color: #c0392b; }
.register__error {
  color: #c0392b;
  font-size: 13px;
  margin-top: 2px;
  min-height: 1em;
}
.register__honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
}
.register__submit { margin-top: var(--space-2); }
.register__success {
  background: #e8f4ec;
  border: 1px solid #a3d4b3;
  color: #1f5d39;
  padding: var(--space-3);
  border-radius: var(--radius);
}
```

- [ ] **Step 2: Update `assets/js/class-detail.js` to render the form section**

Replace the line in `renderClass` that currently reads:

```js
    <!-- Registration form added in next task -->
    <div id="register-anchor" data-class-id="${escapeHtml(cls.id)}" data-class-title="${escapeHtml(cls.title)}" data-is-full="${isFull}"></div>
```

with:

```js
    <section id="register" class="register" aria-labelledby="register-heading">
      <div class="container">
        <h2 id="register-heading">Register for ${escapeHtml(cls.title)}</h2>
        ${isFull
          ? '<p>This class is currently full. Email <a href="mailto:contact@example.com">contact@example.com</a> to be notified about the next session.</p>'
          : `
        <form class="register__form" data-register-form
              data-class-id="${escapeHtml(cls.id)}"
              data-class-title="${escapeHtml(cls.title)}"
              novalidate>
          <div class="register__field">
            <label for="reg-name">Name <span aria-hidden="true">*</span><span class="sr-only">required</span></label>
            <input id="reg-name" name="name" type="text" required autocomplete="name">
            <div class="register__error" data-error-for="name"></div>
          </div>
          <div class="register__field">
            <label for="reg-email">Email <span aria-hidden="true">*</span><span class="sr-only">required</span></label>
            <input id="reg-email" name="email" type="email" required autocomplete="email">
            <div class="register__error" data-error-for="email"></div>
          </div>
          <div class="register__field">
            <label for="reg-phone">Phone (optional)</label>
            <input id="reg-phone" name="phone" type="tel" autocomplete="tel">
            <div class="register__error" data-error-for="phone"></div>
          </div>
          <div class="register__field">
            <label for="reg-notes">Notes / questions (optional)</label>
            <textarea id="reg-notes" name="notes" rows="4"></textarea>
          </div>
          <div class="register__honeypot" aria-hidden="true">
            <label for="reg-website">Leave this field blank</label>
            <input id="reg-website" name="website" type="text" tabindex="-1" autocomplete="off">
          </div>
          <button type="submit" class="btn btn--primary register__submit">Submit registration</button>
          <p class="register__error" data-error-for="form"></p>
        </form>
        `}
      </div>
    </section>
```

Then, at the very bottom of `assets/js/class-detail.js` (after `init();`), add a dynamic import that wires up the form:

```js
import("./form.js").then(({ initForm }) => initForm()).catch(err => console.error(err));
```

Also: the existing Register button in the rail still uses `href="#register"` — leave that as-is so it smooth-scrolls to the form. To make the scroll smooth on click, append this CSS to `styles.css`:

```css
html { scroll-behavior: smooth; }
```

- [ ] **Step 3: Create `assets/js/form.js`**

Create `assets/js/form.js`:

```js
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d().+\-\s]{7,}$/;

function setError(form, name, message) {
  const errEl = form.querySelector(`[data-error-for="${name}"]`);
  const fieldEl = form.querySelector(`[name="${name}"]`)?.closest(".register__field");
  if (errEl) errEl.textContent = message || "";
  if (fieldEl) {
    fieldEl.classList.toggle("register__field--invalid", !!message);
  }
}

function clearErrors(form) {
  form.querySelectorAll("[data-error-for]").forEach(el => (el.textContent = ""));
  form.querySelectorAll(".register__field--invalid")
    .forEach(el => el.classList.remove("register__field--invalid"));
}

function validate(form) {
  let ok = true;
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const phone = form.elements.phone.value.trim();

  if (!name) { setError(form, "name", "Please enter your name."); ok = false; }
  if (!email) { setError(form, "email", "Please enter your email."); ok = false; }
  else if (!EMAIL_RE.test(email)) { setError(form, "email", "That email address doesn't look right."); ok = false; }
  if (phone && !PHONE_RE.test(phone)) { setError(form, "phone", "That phone number doesn't look right."); ok = false; }

  return ok;
}

// TODO(awid-classes): wire to real submission endpoint.
// Easy paths: mailto fallback, Formspree, Google Forms POST, Netlify Forms.
async function submitRegistration(payload) {
  console.log("registration submitted:", payload);
  return { ok: true };
}

function showSuccess(form, classTitle) {
  const wrapper = form.parentElement;
  form.replaceWith(
    Object.assign(document.createElement("div"), {
      className: "register__success",
      innerHTML: `<strong>Thanks — we'll be in touch about ${classTitle}.</strong>
                  <p style="margin:8px 0 0;">A confirmation message has been logged for development purposes.</p>`
    })
  );
  // Scroll the message into view
  wrapper.scrollIntoView({ behavior: "smooth", block: "center" });
}

export function initForm() {
  const form = document.querySelector("[data-register-form]");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearErrors(form);

    // Honeypot check — silently drop bot submissions.
    if (form.elements.website && form.elements.website.value.trim() !== "") {
      console.warn("Honeypot triggered — submission dropped.");
      showSuccess(form, form.dataset.classTitle); // pretend success
      return;
    }

    if (!validate(form)) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting…";

    const payload = {
      classId: form.dataset.classId,
      classTitle: form.dataset.classTitle,
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      phone: form.elements.phone.value.trim(),
      notes: form.elements.notes.value.trim(),
      submittedAt: new Date().toISOString()
    };

    try {
      const result = await submitRegistration(payload);
      if (result?.ok) {
        showSuccess(form, form.dataset.classTitle);
      } else {
        setError(form, "form", "Something went wrong — please try again.");
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit registration";
      }
    } catch (err) {
      console.error(err);
      setError(form, "form", "Something went wrong — please try again.");
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit registration";
    }
  });
}
```

- [ ] **Step 4: Verify in browser**

Start `python3 -m http.server 8000`. Open `http://localhost:8000/class.html?id=intro-design-tech-ai`.

Click the "Register" button in the right rail → page smooth-scrolls to the registration form.

Test cases:

1. Submit empty form → inline errors appear under Name and Email; form does not submit.
2. Enter "John" + "not-an-email" → email error appears.
3. Enter Name + valid email + a clearly invalid phone like "abc" → phone error appears.
4. Enter Name + valid email, leave phone blank, submit → success message replaces the form ("Thanks — we'll be in touch about Intro to Design and Tech with AI."). Open DevTools console → see logged payload.
5. Reload the page, fill the hidden honeypot field via DevTools (`document.getElementById('reg-website').value='bot'`), submit a valid form → success state shown but a "Honeypot triggered" warning appears in console.

No uncaught console errors.

- [ ] **Step 5: Commit**

```bash
git add class.html assets/js/class-detail.js assets/js/form.js assets/css/styles.css
git commit -m "feat(class): add stubbed registration form with validation"
```

---

### Task 10: About page

**Files:**
- Create: `about.html`

- [ ] **Step 1: Create `about.html`**

Create `about.html`:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>About — AWID Classes</title>
  <meta name="description" content="About Anthony Wayne Innovation &amp; Design.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
  <header class="site-header">
    <div class="site-header__inner">
      <a class="site-header__logo" href="index.html" aria-label="AWID Classes home">
        <img src="assets/img/logo-wordmark-awidc.png" alt="Anthony Wayne Innovation &amp; Design">
      </a>
      <nav class="site-header__nav" aria-label="Primary">
        <a href="index.html#catalog">Classes</a>
        <a href="about.html" aria-current="page">About</a>
        <a href="mailto:contact@example.com">Contact</a>
      </nav>
    </div>
  </header>

  <main id="main">
    <section class="hero">
      <div class="container">
        <h1>Closing the Gap Between Ideas and Impact</h1>
        <p class="hero__subline">
          Anthony Wayne Innovation &amp; Design empowers communities to solve problems
          through design thinking, applied innovation, and strategic alignment.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container" style="max-width:800px;">
        <h2>About the classes program</h2>
        <p>
          The classes you see here are the public-facing programs of AWID. We run hands-on
          workshops in AI, design, and technology for students, makers, and small business
          owners across Northwest Ohio.
        </p>
        <p>
          Each workshop is built around the idea that the best way to learn is to make
          something real. Expect to leave every class with something you built — a
          prototype, a small game, a one-page action plan — and the confidence to keep going.
        </p>

        <h2>About AWID</h2>
        <p>
          AWID is based at Anthony Wayne Local Schools, between Toledo and rural Northwest
          Ohio. The full story of the parent program — including consulting and applied
          innovation work — lives at
          <a href="https://mvanderpool.com/aw-innovation-and-design">mvanderpool.com/aw-innovation-and-design</a>.
        </p>

        <h2>Instructor</h2>
        <p>
          <strong>Michael Vanderpool</strong> is the founder of AWID. He works with students
          and organizations on design thinking, applied technology, and the practical use
          of AI in creative and business work.
        </p>

        <p style="margin-top: var(--space-4);">
          <a class="btn btn--primary" href="index.html#catalog">Browse current classes</a>
        </p>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="site-footer__inner">
      <div>© <span id="footer-year"></span> Anthony Wayne Innovation &amp; Design</div>
      <div>
        <a href="mailto:contact@example.com">contact@example.com</a>
        ·
        <a href="https://mvanderpool.com/aw-innovation-and-design">mvanderpool.com</a>
      </div>
    </div>
  </footer>

  <script>
    document.getElementById("footer-year").textContent = new Date().getFullYear();
  </script>
</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Open `http://localhost:8000/about.html`. Expected: hero with tagline, About paragraphs, instructor section, "Browse current classes" button. Nav highlights "About" via `aria-current` (no visual change yet, but screen readers announce it). No console errors.

- [ ] **Step 3: Commit**

```bash
git add about.html
git commit -m "feat: add about page"
```

---

### Task 11: 404 page

**Files:**
- Create: `404.html`

- [ ] **Step 1: Create `404.html`**

Create `404.html`:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Page not found — AWID Classes</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
  <header class="site-header">
    <div class="site-header__inner">
      <a class="site-header__logo" href="/" aria-label="AWID Classes home">
        <img src="assets/img/logo-wordmark-awidc.png" alt="Anthony Wayne Innovation &amp; Design">
      </a>
      <nav class="site-header__nav" aria-label="Primary">
        <a href="index.html#catalog">Classes</a>
        <a href="about.html">About</a>
        <a href="mailto:contact@example.com">Contact</a>
      </nav>
    </div>
  </header>

  <main id="main">
    <section class="hero">
      <div class="container">
        <h1>Page not found</h1>
        <p class="hero__subline">The page you're looking for has moved or doesn't exist.</p>
        <p>
          <a class="btn btn--primary" href="index.html#catalog">Browse classes</a>
          <a class="btn btn--secondary" href="index.html" style="margin-left:8px;">Home</a>
        </p>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="site-footer__inner">
      <div>© <span id="footer-year"></span> Anthony Wayne Innovation &amp; Design</div>
      <div>
        <a href="mailto:contact@example.com">contact@example.com</a>
        ·
        <a href="https://mvanderpool.com/aw-innovation-and-design">mvanderpool.com</a>
      </div>
    </div>
  </footer>

  <script>
    document.getElementById("footer-year").textContent = new Date().getFullYear();
  </script>
</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Open `http://localhost:8000/404.html` directly. Expected: branded 404 with home and "Browse classes" buttons. No console errors.

- [ ] **Step 3: Commit**

```bash
git add 404.html
git commit -m "feat: add branded 404 page"
```

---

### Task 12: README, content guide, and final smoke pass

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Replace `README.md` with the contributor guide**

Replace `README.md` with:

```markdown
# AWID Classes

Static promotional and registration site for **Anthony Wayne Innovation & Design (AWID)** classes and workshops. Hosted on GitHub Pages.

Parent brand: <https://mvanderpool.com/aw-innovation-and-design>

## Local development

No build step. Serve the directory with any static file server:

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000/>.

## Adding or updating a class

1. Open `assets/data/classes.json`.
2. Add a new entry using the schema below, or edit an existing one.
3. (Optional) Drop a hero image at `assets/img/classes/<id>.jpg` matching the entry's `id`.
4. Reload the page — the catalog and detail pages pick up changes immediately.

### Class schema

```json
{
  "id": "url-slug-no-spaces",
  "title": "Class title",
  "shortDescription": "One-line summary used on the catalog card.",
  "longDescription": "Full paragraph(s) for the detail page.",
  "audience": "All ages | Grades 6-12 | Adults | Small business owners | …",
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
  "heroImage": "assets/img/classes/<id>.jpg",
  "learningObjectives": [
    "Bullet 1",
    "Bullet 2",
    "Bullet 3"
  ]
}
```

Setting `seatsRemaining` to `0` shows a "Full" tag on the card, replaces the form with a contact prompt, and disables the Register button.

## Project structure

```
.
├── index.html              Home (hero + catalog + about strip)
├── class.html              Class detail (loads via ?id=…)
├── about.html              About AWID
├── 404.html                Branded 404
├── .nojekyll               GitHub Pages: skip Jekyll
├── assets/
│   ├── css/styles.css      Single stylesheet
│   ├── js/
│   │   ├── catalog.js      Renders class cards on home
│   │   ├── class-detail.js Renders detail page from ?id=…
│   │   └── form.js         Registration form (currently stubbed)
│   ├── img/
│   │   ├── logo-wordmark-awidc.png
│   │   └── classes/        Hero images, named by class id
│   └── data/classes.json   Source of truth for all classes
└── docs/superpowers/       Spec and implementation plan
```

## Registration form

The form on each class page is currently **stubbed** — it validates inputs and shows a confirmation, but submissions are only logged to the browser console. To wire up a real backend, edit `submitRegistration` in `assets/js/form.js`. The function is the only place that needs to change for any of: mailto fallback, Formspree, Google Forms POST, or Netlify Forms.

## Deploying to GitHub Pages

1. Push this repo to GitHub.
2. In the repo's **Settings → Pages**, set Source to "Deploy from a branch", branch `main`, folder `/ (root)`.
3. Wait ~1 minute for the first build.
4. The site will be live at `https://<username>.github.io/<repo>/`.
5. To attach a custom domain, add a `CNAME` file with the domain name and configure DNS per GitHub's docs.
```

- [ ] **Step 2: Final smoke test**

Start `python3 -m http.server 8000`. Run through this checklist in the browser:

- [ ] Home `/` — header, hero, 4 cards in catalog, About strip, footer.
- [ ] "Browse Classes" button smooth-scrolls to catalog.
- [ ] Each card click lands on the correct detail page.
- [ ] Class detail page shows hero, two-column body (≥900px) or single column (<900px).
- [ ] Register button smooth-scrolls to the form.
- [ ] Form rejects empty Name/Email and bad email format inline.
- [ ] Form accepts valid input → success message replaces the form.
- [ ] About page renders with tagline, paragraphs, "Browse current classes" button.
- [ ] `404.html` renders with home + browse buttons.
- [ ] Resize to 360px width — nothing overflows horizontally; nav stacks if needed.
- [ ] Tab through home page with keyboard only — focus rings visible on all interactive elements.

If any item fails, fix and re-test before the final commit.

- [ ] **Step 3: Run a Lighthouse pass (optional but recommended)**

In Chrome DevTools → Lighthouse, run an audit on `http://localhost:8000/` with categories Performance + Accessibility + Best Practices + SEO. Target: Accessibility ≥ 95, Performance ≥ 90. If any score is well below target, note it and decide whether to address before deploy.

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: add contributor guide and class-adding instructions"
```

- [ ] **Step 5: Push to GitHub (when ready)**

This step requires a GitHub account and repo. Skip until ready to deploy.

```bash
gh repo create awid-classes --public --source=. --remote=origin --push
```

Or, if creating the repo manually in the GitHub UI:

```bash
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

Then enable GitHub Pages in repo settings (Source: `main`, root folder).

---

## Self-review notes

Quickly checked the plan against the spec:

- Spec coverage — every section of the spec has a corresponding task: file structure (T1), tokens/styles (T2,3,4), data model (T5), home page (T3,4,6,7), class detail (T8), registration form (T9), about (T10), 404 (T11), README + deploy (T12).
- No placeholder steps — every code-bearing step shows the literal code or command to run.
- Type / signature consistency — `submitRegistration`, `initForm`, `renderCard`, `renderClass`, `escapeHtml`, `formatStartDate`, the `data-class-id` / `data-class-title` / `data-register-form` data attributes, and the `[data-catalog]` / `[data-class-detail]` selectors are all referenced consistently across tasks.
- Spec's open questions (domain, hero images, real form endpoint, final long copy) remain open by design — the plan ships v1 with the placeholders the spec sanctions.
