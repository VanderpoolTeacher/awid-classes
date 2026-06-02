# AWID Overview Slideshow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-file vanilla HTML/CSS/JS slideshow at `slides.html` that auto-builds an 8-slide overview deck from `assets/data/classes.json`, designed for live projection.

**Architecture:** Static page. `slides.html` is a thin shell that loads `slides.css` and an ES module `slides.js`. The module fetches `classes.json`, builds slide DOM elements in a fixed order (3 framing slides → 4 course slides → closing slide), and wires keyboard, click-half, hash-deep-link, and fullscreen navigation. One slide is `.is-active` at a time. No build step, no external framework.

**Tech Stack:** HTML5, CSS3 (custom properties, `clamp()`, `:fullscreen`), ES2020 JavaScript modules, Fullscreen API, `location.hash` for deep linking.

**Spec:** `docs/superpowers/specs/2026-05-18-slideshow-design.md`
**Tracking issue:** https://github.com/VanderpoolTeacher/awid-classes/issues/1
**Working branch:** `feature/1-overview-slideshow`

**Testing note:** The site has no automated test suite. The spec explicitly says manual verification only. Each task ends with a manual verification step using `python3 -m http.server 8000` and the listed URLs.

---

## File Structure

```
slides.html                                Markup shell (full <html>)
assets/css/slides.css                      Projection-optimized styles
assets/js/slides.js                        Builds slides + handles navigation
```

Each file has one responsibility. `slides.css` does NOT import `styles.css` — the slideshow is visually distinct from the site (no header, footer, catalog chrome) and combining the stylesheets would couple them.

---

### Task 1: Scaffold slides.html + slides.css

**Files:**
- Create: `slides.html`
- Create: `assets/css/slides.css`

- [ ] **Step 1: Create `slides.html`**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>AWID Classes — Overview</title>
  <meta name="description" content="Overview of AWID classes — used for live presentations.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/slides.css">
</head>
<body>
  <main class="slides" data-slides aria-live="polite"></main>
  <div class="slides__counter" data-slides-counter aria-hidden="true">— / —</div>
  <script type="module" src="assets/js/slides.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create `assets/css/slides.css`**

```css
:root {
  --slide-bg: #FFFFFF;
  --slide-text: #1A1A1A;
  --slide-muted: #555555;
  --slide-primary: #1F3A93;
  --slide-primary-dark: #16306C;
  --slide-accent: #EA580C;
  --slide-section: #F5F7FB;

  --font-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
               Roboto, Helvetica, Arial, sans-serif;
}

*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; height: 100%; }

body {
  font-family: var(--font-body);
  color: var(--slide-text);
  background: var(--slide-bg);
  -webkit-font-smoothing: antialiased;
  overflow: hidden;
  cursor: default;
}

.slides {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.slide {
  position: absolute;
  inset: 0;
  display: none;
  align-items: center;
  justify-content: center;
  padding: clamp(32px, 6vw, 96px);
}

.slide.is-active {
  display: flex;
}

.slide__inner {
  width: 100%;
  max-width: 1100px;
  text-align: center;
}

.slide__eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: clamp(14px, 1.4vw, 18px);
  font-weight: 600;
  color: var(--slide-accent);
  margin: 0 0 16px;
}

.slide__title {
  font-size: clamp(36px, 6vw, 72px);
  line-height: 1.1;
  font-weight: 700;
  color: var(--slide-primary);
  margin: 0 0 24px;
}

.slide__lede {
  font-size: clamp(20px, 2.4vw, 32px);
  line-height: 1.4;
  color: var(--slide-text);
  margin: 0 0 24px;
}

.slide__meta {
  font-size: clamp(16px, 1.6vw, 22px);
  color: var(--slide-muted);
  margin: 0 0 16px;
}

.slide__list {
  text-align: left;
  margin: 24px auto 0;
  max-width: 900px;
  font-size: clamp(18px, 1.8vw, 26px);
  line-height: 1.5;
  color: var(--slide-text);
  padding-left: 1.2em;
}
.slide__list li { margin-bottom: 12px; }

.slide__image {
  max-width: 70%;
  max-height: 50vh;
  margin: 0 auto 24px;
  height: auto;
  object-fit: contain;
}

.slide__cta {
  display: inline-block;
  margin-top: 24px;
  background: var(--slide-primary);
  color: #fff;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: clamp(18px, 1.8vw, 24px);
  font-weight: 600;
  text-decoration: none;
}
.slide__cta:hover { background: var(--slide-primary-dark); }

.slide a { color: var(--slide-primary); }

.slides__counter {
  position: fixed;
  bottom: 16px;
  right: 24px;
  font-size: 14px;
  color: var(--slide-muted);
  font-variant-numeric: tabular-nums;
  user-select: none;
  pointer-events: none;
}
```

- [ ] **Step 3: Verify in browser**

Run from the repo root:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/slides.html`. Expected: blank white page with `— / —` in the bottom-right corner. No console errors (a 404 for `slides.js` is expected — we haven't created it yet — and is fine for this step).

- [ ] **Step 4: Commit**

```bash
git add slides.html assets/css/slides.css
git commit -m "feat(slides): scaffold slides.html and slides.css"
```

---

### Task 2: Build framing slides (title, about, sponsor, closing)

**Files:**
- Create: `assets/js/slides.js`

- [ ] **Step 1: Create `assets/js/slides.js`**

```js
const container = document.querySelector("[data-slides]");
const counter = document.querySelector("[data-slides-counter]");

let slides = [];
let currentIndex = 0;

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function buildSlide(contentBuilder) {
  const slide = el("section", "slide");
  const inner = el("div", "slide__inner");
  contentBuilder(inner);
  slide.appendChild(inner);
  return slide;
}

function buildTitleSlide() {
  return buildSlide((inner) => {
    inner.appendChild(el("img", "slide__image"));
    inner.querySelector("img").src = "assets/img/logo-and-wordmark.png";
    inner.querySelector("img").alt = "Anthony Wayne Innovation & Design";
    inner.appendChild(el("h1", "slide__title", "AWID Classes"));
    inner.appendChild(el("p", "slide__lede", "Hands-on classes in AI, design, and tech."));
  });
}

function buildAboutSlide() {
  return buildSlide((inner) => {
    inner.appendChild(el("p", "slide__eyebrow", "About AWID"));
    inner.appendChild(el("h2", "slide__title", "Closing the gap between ideas and impact"));
    inner.appendChild(el("p", "slide__lede",
      "AWID runs hands-on workshops in AI, design, and technology for students, makers, " +
      "and small businesses across Northwest Ohio."));
  });
}

function buildSponsorSlide() {
  return buildSlide((inner) => {
    inner.appendChild(el("p", "slide__eyebrow", "Sponsor"));
    const img = el("img", "slide__image");
    img.src = "assets/img/ART-logo-sponsored-by.png";
    img.alt = "Your access is sponsored by Actual Reality Technologies";
    inner.appendChild(img);
    inner.appendChild(el("p", "slide__meta", "actualreality.tech"));
  });
}

function buildClosingSlide() {
  return buildSlide((inner) => {
    inner.appendChild(el("p", "slide__eyebrow", "Join us"));
    inner.appendChild(el("h2", "slide__title", "Browse classes &amp; register"));
    const link = el("a", "slide__cta", "mvanderpool.com/aw-innovation-and-design");
    link.href = "https://mvanderpool.com/aw-innovation-and-design";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    inner.appendChild(link);
    const email = el("p", "slide__meta");
    email.innerHTML = '<a href="mailto:mvanderpool.edu@gmail.com">mvanderpool.edu@gmail.com</a>';
    inner.appendChild(email);
  });
}

function setSlide(index) {
  if (slides.length === 0) return;
  const clamped = Math.max(0, Math.min(index, slides.length - 1));
  slides.forEach((s, i) => s.classList.toggle("is-active", i === clamped));
  currentIndex = clamped;
  counter.textContent = `${clamped + 1} / ${slides.length}`;
}

function renderDeck() {
  slides = [
    buildTitleSlide(),
    buildAboutSlide(),
    buildSponsorSlide(),
    buildClosingSlide(),
  ];
  container.replaceChildren(...slides);
  setSlide(0);
}

renderDeck();
```

- [ ] **Step 2: Verify in browser**

Refresh `http://localhost:8000/slides.html`. Expected:
- The title slide is visible (logo + "AWID Classes" + tagline)
- Counter reads `1 / 4`
- No console errors

- [ ] **Step 3: Commit**

```bash
git add assets/js/slides.js
git commit -m "feat(slides): render title, about, sponsor, closing slides"
```

---

### Task 3: Keyboard navigation

**Files:**
- Modify: `assets/js/slides.js` (append helpers + listener)

- [ ] **Step 1: Add navigation helpers and keyboard listener**

Append to the bottom of `assets/js/slides.js`:

```js
function next() { setSlide(currentIndex + 1); }
function prev() { setSlide(currentIndex - 1); }
function first() { setSlide(0); }
function last() { setSlide(slides.length - 1); }

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowRight":
    case " ":
    case "PageDown":
      e.preventDefault();
      next();
      break;
    case "ArrowLeft":
    case "PageUp":
      e.preventDefault();
      prev();
      break;
    case "Home":
      e.preventDefault();
      first();
      break;
    case "End":
      e.preventDefault();
      last();
      break;
  }
});
```

- [ ] **Step 2: Verify in browser**

Refresh and check:
- `→` and `Space` advance: counter goes `1 / 4` → `2 / 4` → `3 / 4` → `4 / 4`
- `→` on slide 4 stays on `4 / 4` (clamped)
- `←` goes back: `4 / 4` → `3 / 4` → ...
- `←` on slide 1 stays on `1 / 4`
- `Home` jumps to `1 / 4`; `End` jumps to `4 / 4`
- `PageDown`/`PageUp` work like `→`/`←`

- [ ] **Step 3: Commit**

```bash
git add assets/js/slides.js
git commit -m "feat(slides): keyboard navigation (arrows, space, home, end, pageup/down)"
```

---

### Task 4: URL hash deep linking

**Files:**
- Modify: `assets/js/slides.js`

- [ ] **Step 1: Replace the `setSlide` function**

Find:

```js
function setSlide(index) {
  if (slides.length === 0) return;
  const clamped = Math.max(0, Math.min(index, slides.length - 1));
  slides.forEach((s, i) => s.classList.toggle("is-active", i === clamped));
  currentIndex = clamped;
  counter.textContent = `${clamped + 1} / ${slides.length}`;
}
```

Replace with:

```js
function setSlide(index, opts = {}) {
  if (slides.length === 0) return;
  const clamped = Math.max(0, Math.min(index, slides.length - 1));
  slides.forEach((s, i) => s.classList.toggle("is-active", i === clamped));
  currentIndex = clamped;
  counter.textContent = `${clamped + 1} / ${slides.length}`;
  if (!opts.fromHash) {
    const newHash = `#${clamped + 1}`;
    if (location.hash !== newHash) {
      history.replaceState(null, "", newHash);
    }
  }
}

function startingIndexFromHash() {
  const n = parseInt(location.hash.replace("#", ""), 10);
  if (Number.isFinite(n) && n >= 1 && n <= slides.length) return n - 1;
  return 0;
}
```

- [ ] **Step 2: Use the hash on initial render**

Find:

```js
function renderDeck() {
  slides = [
    buildTitleSlide(),
    buildAboutSlide(),
    buildSponsorSlide(),
    buildClosingSlide(),
  ];
  container.replaceChildren(...slides);
  setSlide(0);
}
```

Replace the `setSlide(0)` line with:

```js
  setSlide(startingIndexFromHash(), { fromHash: true });
```

- [ ] **Step 3: Listen for hashchange (browser back/forward)**

Append at the bottom of the file:

```js
window.addEventListener("hashchange", () => {
  setSlide(startingIndexFromHash(), { fromHash: true });
});
```

- [ ] **Step 4: Verify in browser**

Refresh and check:
- Visit `http://localhost:8000/slides.html#3` directly → sponsor slide loads, counter `3 / 4`
- Press `→` → URL becomes `…/slides.html#4`
- Press browser back → counter returns to `3 / 4`
- Visit `…/slides.html#99` (out of range) → loads slide 1
- Visit `…/slides.html#abc` (non-numeric) → loads slide 1

- [ ] **Step 5: Commit**

```bash
git add assets/js/slides.js
git commit -m "feat(slides): URL hash deep linking"
```

---

### Task 5: Click-half navigation

**Files:**
- Modify: `assets/js/slides.js`

- [ ] **Step 1: Add a click handler on the slides container**

Append to the bottom of `assets/js/slides.js`:

```js
container.addEventListener("click", (e) => {
  // Allow links inside slides to work normally
  if (e.target.closest("a")) return;
  const half = window.innerWidth / 2;
  if (e.clientX >= half) next(); else prev();
});
```

- [ ] **Step 2: Verify in browser**

Refresh and check:
- Click anywhere in the right half of the window → advances
- Click anywhere in the left half → goes back
- On the closing slide, click the "Browse classes & register" CTA → opens the link in a new tab (does NOT advance the slide)
- On the closing slide, click the email link → opens mailto (does NOT advance)

- [ ] **Step 3: Commit**

```bash
git add assets/js/slides.js
git commit -m "feat(slides): click-half navigation (right=next, left=prev)"
```

---

### Task 6: Fullscreen toggle

**Files:**
- Modify: `assets/js/slides.js`

- [ ] **Step 1: Add fullscreen helper and `F` key binding**

Append to the bottom of `assets/js/slides.js`:

```js
function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen?.();
  } else {
    document.documentElement.requestFullscreen?.();
  }
}
```

Find the keydown handler and add a new case for `"f"` and `"F"` before the closing `}` of the switch. The whole handler should now look like:

```js
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowRight":
    case " ":
    case "PageDown":
      e.preventDefault();
      next();
      break;
    case "ArrowLeft":
    case "PageUp":
      e.preventDefault();
      prev();
      break;
    case "Home":
      e.preventDefault();
      first();
      break;
    case "End":
      e.preventDefault();
      last();
      break;
    case "f":
    case "F":
      e.preventDefault();
      toggleFullscreen();
      break;
  }
});
```

- [ ] **Step 2: Verify in browser (Chrome and Safari)**

Refresh in Chrome:
- Press `F` → enters fullscreen, slide fills screen
- Press `F` again → exits fullscreen
- Arrow keys still work in fullscreen

Repeat in Safari.

- [ ] **Step 3: Commit**

```bash
git add assets/js/slides.js
git commit -m "feat(slides): fullscreen toggle on F key"
```

---

### Task 7: Render course slides from classes.json

**Files:**
- Modify: `assets/js/slides.js`

- [ ] **Step 1: Add a course slide builder**

Insert this function near the other `build*Slide` functions (before `setSlide`):

```js
const COURSE_ORDER = [
  "intro-design-tech-ai",
  "intro-career-in-tech",
  "ai-infused-game-design",
  "applied-ai-design-thinking",
];

function buildCourseSlide(course) {
  return buildSlide((inner) => {
    inner.appendChild(el("p", "slide__eyebrow", escapeHtml(course.audience || "Class")));
    inner.appendChild(el("h2", "slide__title", escapeHtml(course.title)));
    inner.appendChild(el("p", "slide__lede", escapeHtml(course.shortDescription)));

    const sched = course.schedule || {};
    const schedBits = [];
    if (sched.startDate) schedBits.push(formatDate(sched.startDate));
    if (sched.days) schedBits.push(sched.days);
    if (sched.time) schedBits.push(sched.time);
    if (schedBits.length) {
      inner.appendChild(el("p", "slide__meta", schedBits.map(escapeHtml).join(" · ")));
    }

    const objectives = (course.learningObjectives || []).slice(0, 5);
    if (objectives.length) {
      const ul = el("ul", "slide__list");
      for (const obj of objectives) {
        ul.appendChild(el("li", "", escapeHtml(obj)));
      }
      inner.appendChild(ul);
    }
  });
}

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
```

- [ ] **Step 2: Fetch classes.json and assemble the full deck**

Replace `renderDeck` and the bare `renderDeck();` call at the bottom of the file with:

```js
async function loadCourses() {
  const res = await fetch("assets/data/classes.json", { cache: "no-cache" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function renderDeck() {
  let courses = [];
  try {
    courses = await loadCourses();
  } catch (err) {
    console.error("slides: failed to load classes.json", err);
  }
  const byId = new Map(courses.map((c) => [c.id, c]));

  const courseSlides = COURSE_ORDER
    .map((id) => byId.get(id))
    .filter(Boolean)
    .map(buildCourseSlide);

  slides = [
    buildTitleSlide(),
    buildAboutSlide(),
    buildSponsorSlide(),
    ...courseSlides,
    buildClosingSlide(),
  ];
  container.replaceChildren(...slides);
  setSlide(startingIndexFromHash(), { fromHash: true });
}

renderDeck();
```

- [ ] **Step 3: Verify in browser**

Refresh `http://localhost:8000/slides.html`. Expected:
- Counter reads `1 / 8`
- Pressing `→` 7 times advances through: title → about → sponsor → Intro to Design and Tech with AI → Introduction to a Career in Tech → AI Infused Game Design → Applied AI in Design Thinking → Closing
- The Applied AI slide shows "Fri, May 29, 2026" in the meta line (from `schedule.startDate`)
- Course slides display up to 5 objectives even though some courses have more in the JSON
- `slides.html#7` loads the Applied AI slide directly

- [ ] **Step 4: Commit**

```bash
git add assets/js/slides.js
git commit -m "feat(slides): render course slides from classes.json"
```

---

### Task 8: Graceful fetch failure

**Files:**
- Modify: `assets/js/slides.js`

- [ ] **Step 1: Add a placeholder slide builder for the error path**

Insert near the other builders:

```js
function buildPlaceholderCourseSlide(id) {
  return buildSlide((inner) => {
    inner.appendChild(el("p", "slide__eyebrow", "Course"));
    inner.appendChild(el("h2", "slide__title", "Course data unavailable"));
    inner.appendChild(el("p", "slide__lede", `Could not load ${id}. Refresh to retry.`));
  });
}
```

- [ ] **Step 2: Use placeholders when a course is missing from the JSON**

Find the `courseSlides` assignment inside `renderDeck`:

```js
  const courseSlides = COURSE_ORDER
    .map((id) => byId.get(id))
    .filter(Boolean)
    .map(buildCourseSlide);
```

Replace with:

```js
  const courseSlides = COURSE_ORDER.map((id) => {
    const course = byId.get(id);
    if (!course) {
      console.warn(`slides: course not found in classes.json: ${id}`);
      return buildPlaceholderCourseSlide(id);
    }
    return buildCourseSlide(course);
  });
```

This means: when `loadCourses` throws and `courses` stays `[]`, all 4 course IDs will be missing from `byId`, so all 4 slots get placeholders — the framing slides still render and the deck still has 8 slides.

- [ ] **Step 3: Verify in browser**

While the dev server is running:

```bash
mv assets/data/classes.json assets/data/classes.json.bak
```

Refresh `http://localhost:8000/slides.html`. Expected:
- Counter still reads `1 / 8`
- Title, about, sponsor, closing render normally
- Slides 4–7 each show "Course data unavailable"
- Console shows the error from `loadCourses` and a warning per missing course ID

Restore the file:

```bash
mv assets/data/classes.json.bak assets/data/classes.json
```

Refresh once more — confirm the real course slides come back.

- [ ] **Step 4: Commit**

```bash
git add assets/js/slides.js
git commit -m "feat(slides): graceful fallback when classes.json is unavailable"
```

---

### Task 9: Final acceptance check and open PR

**Files:** None (verification + branch push).

- [ ] **Step 1: Run the full acceptance checklist**

With `python3 -m http.server 8000` running, verify each item:

1. `http://localhost:8000/slides.html` shows the title slide, counter `1 / 8`.
2. Arrow keys, Space, PageDown/Up, Home, End all work as described in earlier tasks.
3. Click on the right half advances; left half goes back; clicking a link inside the closing slide opens the link without advancing.
4. `slides.html#5` loads the Introduction to a Career in Tech slide directly; refreshing on that URL stays put.
5. `F` toggles fullscreen in Chrome AND Safari.
6. The Applied AI slide displays the May 29, 2026 date.
7. In Chrome DevTools, set the viewport to 1920×1080: every slide's content fits without scrolling. Repeat at 1280×720.
8. No console errors during a full pass through the deck.

If any check fails, fix the underlying code and commit the fix before proceeding. Do not lower the bar.

- [ ] **Step 2: Push the branch**

```bash
git push -u origin feature/1-overview-slideshow
```

- [ ] **Step 3: Open the pull request**

```bash
gh pr create --title "Build combined overview slideshow" --body "$(cat <<'EOF'
Closes #1.

## Summary
- New `slides.html` deck (8 slides) auto-built from `assets/data/classes.json`
- Keyboard, click-half, hash-deep-link, and fullscreen navigation
- No build step, no external framework — matches site palette and Inter font

## Test plan
- [ ] All 8 slides render at `slides.html`
- [ ] Keyboard (arrows/space/PageUp-Down/Home/End/F) and click-half nav work
- [ ] `slides.html#N` deep links work
- [ ] Fullscreen works in Chrome and Safari
- [ ] Framing slides still render if `classes.json` is unreachable
EOF
)"
```

- [ ] **Step 4: Report the PR URL back to the user**

---

## Self-review

**Spec coverage:** Walked the spec section-by-section.
- Purpose → Tasks 1–9 together produce the described deck. ✓
- Scope (one deck, auto from JSON, no PDF/notes/per-course) → Task 7 fetches JSON; nothing in the plan adds per-course routing, PDF, or notes. ✓
- Files (slides.html, slides.css, slides.js) → Tasks 1, 1, 2 create them. ✓
- Slide order (title, about, sponsor, 4 courses, closing) → Task 2 builds 1/2/3/8; Task 7 inserts 4–7. ✓
- Course-slide template (title, shortDescription, audience, schedule, ≤5 objectives) → Task 7's `buildCourseSlide`. ✓
- Fixed course ordering by ID array → Task 7's `COURSE_ORDER`. ✓
- Keyboard (→/space/PageDown, ←/PageUp, Home, End, F) → Tasks 3 + 6. ✓
- Click halves with `<a>` exception → Task 5. ✓
- URL hash + invalid hash falls back to slide 1 → Task 4 (`startingIndexFromHash` returns 0 on invalid). ✓
- Counter "N / M" bottom-right → Task 1 markup + CSS, Task 2 `setSlide` updates it. ✓
- No transitions → CSS uses `display: none/flex` only. ✓
- Inter font, brand palette duplicated in slides.css → Task 1. ✓
- classes.json failure → framing slides still render → Task 8. ✓
- Missing course ID → placeholder, logged → Task 8. ✓
- Fullscreen unavailable → no-op (optional chaining `?.`) → Task 6. ✓
- Manual testing only → matches site convention; Task 9 is the acceptance checklist. ✓

**Placeholder scan:** Every step has actual code or actual commands. No TBDs, no "implement similar to". ✓

**Type / signature consistency:**
- `setSlide(index, opts)` introduced in Task 4; `next/prev/first/last` from Task 3 still call it with one arg (works — `opts` defaults to `{}`). ✓
- `slides`, `currentIndex`, `container`, `counter` declared once in Task 2, used throughout. ✓
- `buildSlide(contentBuilder)` signature consistent across all builders. ✓
- `COURSE_ORDER` IDs (`intro-design-tech-ai`, `intro-career-in-tech`, `ai-infused-game-design`, `applied-ai-design-thinking`) match `classes.json` (verified during planning). ✓

No issues found.
