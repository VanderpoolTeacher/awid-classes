# Applied AI in Design Thinking — May 29 Launch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Schedule the first run of *Applied AI in Design Thinking* (Fri May 29, 2026, 10am–4pm at The Loft 419), route registration through an existing Eventbrite event, and announce it via a dismissible top ribbon on the home page.

**Architecture:** Pure static-site edits. One new optional field (`eventbriteUrl`) on the class record gates a `class-detail.js` branch that swaps the in-site form for an Eventbrite CTA. The home-page ribbon is hardcoded HTML in `index.html` with a tiny inline `<head>` script that sets `html.ribbon-hide` based on localStorage and date, preventing a flash-of-ribbon for users who have dismissed it or are visiting after the event.

**Tech Stack:** HTML5, CSS3 (existing design tokens), vanilla JavaScript (ES modules), no build step.

**Spec:** `docs/superpowers/specs/2026-05-14-applied-ai-may-29-launch-design.md`

**Note on testing:** This is a static site with no test framework. Each task ends with a concrete browser-based verification step run against a local dev server (`python3 -m http.server 8000`). Test by loading specific URLs and confirming specific behaviors.

---

### Task 1: Branch `class-detail.js` on `eventbriteUrl`

**Files:**
- Modify: `assets/js/class-detail.js:36-145`

This task adds the branch but does not yet trigger it — no class has `eventbriteUrl` set after this commit, so behavior is unchanged. Task 2 will set the field and make the branch activate for the Applied AI class.

- [ ] **Step 1: Start the local dev server**

From `/Users/michaelvanderpool/Documents/GitHub/AWID Classes`:

```bash
python3 -m http.server 8000
```

Leave running in a separate terminal for verification steps.

- [ ] **Step 2: Establish baseline — load the Applied AI class page**

Open: `http://localhost:8000/class.html?id=applied-ai-design-thinking`

Expected before changes:
- Rail "Register" button has `href="#register"` (scrolls to in-page form).
- Bottom section renders a `<form data-register-form ...>` with name/email/phone/notes inputs.
- No "Starts" row in the rail (because `startDate` is null).

Make a mental note of this baseline so you can see Task 2 toggle the new branch.

- [ ] **Step 3: Modify the rail CTA branch**

Open `assets/js/class-detail.js`. Find the existing rail CTA block near the end of `renderClass`:

```javascript
          <a class="btn btn--primary class-rail__cta"
             href="#register"
             ${isFull ? 'aria-disabled="true" tabindex="-1" onclick="event.preventDefault()"' : ""}>
            ${isFull ? "Class full" : "Register"}
          </a>
```

Replace it with a three-way branch (`isFull` wins over `eventbriteUrl`, which wins over the default in-site form CTA):

```javascript
          ${isFull
            ? `<a class="btn btn--primary class-rail__cta"
                 href="#register"
                 aria-disabled="true" tabindex="-1" onclick="event.preventDefault()">
                Class full
              </a>`
            : cls.eventbriteUrl
              ? `<a class="btn btn--primary class-rail__cta"
                   href="${escapeHtml(cls.eventbriteUrl)}"
                   target="_blank" rel="noopener noreferrer">
                  Register on Eventbrite ↗
                </a>`
              : `<a class="btn btn--primary class-rail__cta" href="#register">
                  Register
                </a>`}
```

- [ ] **Step 4: Replace the bottom register section**

In the same file, find the complete existing `<section id="register" ...>` block. It starts with `<section id="register" class="register" aria-labelledby="register-heading">` and ends with `</section>` just before the closing backtick of the `container.innerHTML` template (currently the section spans roughly lines 105–143 in `class-detail.js`).

Replace the entire section block with this version, which adds a middle `cls.eventbriteUrl` branch between `isFull` and the in-site form. The form HTML is preserved verbatim from the original — only the surrounding ternary changes.

```javascript
    <section id="register" class="register" aria-labelledby="register-heading">
      <div class="container">
        <h2 id="register-heading">Register for ${escapeHtml(cls.title)}</h2>
        ${isFull
          ? '<p>This class is currently full. Email <a href="mailto:mvanderpool.edu@gmail.com">mvanderpool.edu@gmail.com</a> to be notified about the next session.</p>'
          : cls.eventbriteUrl
            ? `
        <p>Registration for this class is handled on Eventbrite, where you'll get confirmation and reminder emails.</p>
        <a class="btn btn--primary"
           href="${escapeHtml(cls.eventbriteUrl)}"
           target="_blank" rel="noopener noreferrer">
          Register on Eventbrite ↗
        </a>
        `
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

The structure is now `isFull ? 'full message' : (cls.eventbriteUrl ? 'eventbrite block' : 'form')`. All template-literal nesting and backtick pairing matches the original.

- [ ] **Step 5: Verify nothing changed for existing classes**

Hard-reload (Cmd+Shift+R) `http://localhost:8000/class.html?id=intro-design-tech-ai`.

Expected:
- Rail Register button still goes to `#register`.
- Bottom section still renders the form with name/email/phone/notes inputs.
- Form submission still works (FormSubmit relay — no need to actually submit, just confirm the inputs render).

Hard-reload `http://localhost:8000/class.html?id=applied-ai-design-thinking`.

Expected: still the same as Step 2 baseline (no `eventbriteUrl` field yet, so the branch is not taken).

If anything broke for the other classes, the template literal nesting is off — re-check Step 4.

- [ ] **Step 6: Commit**

```bash
git add assets/js/class-detail.js
git commit -m "feat(class-page): branch Register CTA on optional eventbriteUrl

When cls.eventbriteUrl is set, both the rail CTA and bottom register
section link to Eventbrite instead of rendering the in-site form.
No class sets this field yet — behavior unchanged for existing classes."
```

---

### Task 2: Schedule Applied AI for May 29 and wire Eventbrite

**Files:**
- Modify: `assets/data/classes.json` (the `applied-ai-design-thinking` record)

This is the commit where the Applied AI class flips from "unscheduled, in-site form" to "Fri May 29, 2026, Eventbrite-only".

- [ ] **Step 1: Update the schedule block and add eventbriteUrl**

Open `assets/data/classes.json`. Find the `"id": "applied-ai-design-thinking"` record (around line 104). In that record, find the `schedule` block:

```json
    "schedule": {
      "startDate": null,
      "days": "Flexible — self-paced or workshop",
      "sessions": 5,
      "time": "By arrangement"
    },
```

Replace it with:

```json
    "schedule": {
      "startDate": "2026-05-29",
      "days": "One-day workshop · Friday",
      "sessions": 1,
      "time": "10:00 AM – 4:00 PM (lunch break included)"
    },
```

Then, in the same record, find this line:

```json
    "heroImage": "assets/img/classes/applied-ai-design-thinking.jpg",
```

Insert a new `eventbriteUrl` line immediately before it:

```json
    "eventbriteUrl": "https://www.eventbrite.com/e/1989613748280?aff=oddtdtcreator",
    "heroImage": "assets/img/classes/applied-ai-design-thinking.jpg",
```

- [ ] **Step 2: Verify JSON is valid**

Run:

```bash
python3 -c "import json; json.load(open('assets/data/classes.json'))" && echo OK
```

Expected output: `OK`

If you see a `JSONDecodeError`, you have a stray comma, missing quote, or mismatched brace — re-check Step 1.

- [ ] **Step 3: Verify the catalog card**

Hard-reload `http://localhost:8000/index.html`.

Expected on the *Applied AI in Design Thinking* card:
- Meta line reads: `One-day workshop · Friday · starts May 29` (the catalog appends `· starts <formatted date>` when `startDate` is set).

The other three cards are unchanged.

- [ ] **Step 4: Verify the class page**

Hard-reload `http://localhost:8000/class.html?id=applied-ai-design-thinking`.

Expected:
- Rail "Starts" row shows: `Fri, May 29, 2026`
- Rail "Schedule" row shows: `One-day workshop · Friday`
- Rail "Time" row shows: `10:00 AM – 4:00 PM (lunch break included)`
- Rail Register button text: `Register on Eventbrite ↗` — clicking it opens `https://www.eventbrite.com/e/1989613748280?aff=oddtdtcreator` in a new tab.
- Bottom section: heading "Register for Applied AI in Design Thinking", a paragraph mentioning Eventbrite handles registration, and a single `Register on Eventbrite ↗` button. **No name/email/phone/notes form.**
- Page title: `Applied AI in Design Thinking — AWID`.

- [ ] **Step 5: Verify other classes still use the in-site form**

Hard-reload `http://localhost:8000/class.html?id=intro-design-tech-ai`.

Expected: rail Register button goes to `#register`, bottom section still renders the form with name/email/phone/notes inputs.

- [ ] **Step 6: Commit**

```bash
git add assets/data/classes.json
git commit -m "feat(classes): schedule Applied AI for Fri May 29 2026 via Eventbrite

One-day workshop, 10am-4pm at The Loft 419. Registration routed to
the existing Eventbrite event (1989613748280)."
```

---

### Task 3: Add the dismissible home-page ribbon

**Files:**
- Modify: `index.html` (add inline `<head>` script + `<aside>` markup at top of `<body>` + dismiss handler script)
- Modify: `assets/css/styles.css` (add `.site-ribbon` styles)

- [ ] **Step 1: Add `.site-ribbon` styles**

Open `assets/css/styles.css`. Scroll to the end of the file and append:

```css

/* ---------- Site ribbon (home-page event announcement) ---------- */
.site-ribbon {
  display: flex;
  background: var(--color-primary);
  color: #fff;
  font-size: 14px;
  line-height: 1.4;
}

html.ribbon-hide .site-ribbon { display: none; }

.site-ribbon__inner {
  max-width: var(--max-width);
  width: 100%;
  margin: 0 auto;
  padding: 10px var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.site-ribbon__text {
  margin: 0;
  flex: 1 1 auto;
}

.site-ribbon__text strong { font-weight: 600; }

.site-ribbon__cta {
  flex: 0 0 auto;
  color: #fff;
  font-weight: 600;
  text-decoration: underline;
}
.site-ribbon__cta:hover,
.site-ribbon__cta:focus-visible { color: #fff; }

.site-ribbon__close {
  flex: 0 0 auto;
  background: transparent;
  color: #fff;
  border: 0;
  font-size: 20px;
  line-height: 1;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: var(--radius-sm);
}
.site-ribbon__close:hover,
.site-ribbon__close:focus-visible {
  background: rgba(255, 255, 255, 0.15);
  outline: none;
}

@media (max-width: 600px) {
  .site-ribbon__inner {
    flex-wrap: wrap;
    padding: 8px var(--space-2);
  }
  .site-ribbon__text { flex: 1 1 100%; }
  .site-ribbon__cta  { flex: 0 0 auto; }
  .site-ribbon__close {
    position: absolute;
    top: 4px;
    right: 4px;
  }
  .site-ribbon { position: relative; }
}
```

- [ ] **Step 2: Add the inline pre-paint script to `<head>` in `index.html`**

Open `index.html`. Find the `<head>` block. Immediately *before* the closing `</head>` (currently line 12), insert:

```html
  <script>
    (function () {
      var KEY = "awid:ribbon:applied-ai-2026-05-29";
      var HIDE_AFTER = new Date(2026, 4, 30).getTime(); // May 30 2026 local midnight
      try {
        var dismissed = window.localStorage.getItem(KEY) === "1";
        var expired = Date.now() >= HIDE_AFTER;
        if (dismissed || expired) {
          document.documentElement.classList.add("ribbon-hide");
        }
      } catch (e) {
        // localStorage unavailable (private mode etc.) — show ribbon.
      }
    })();
  </script>
```

This runs before `<body>` is parsed, so any `ribbon-hide` class is in place before the ribbon paints.

- [ ] **Step 3: Add the ribbon markup as the first child of `<body>`**

In `index.html`, find the line `<body>` (currently line 13). Immediately after it, insert:

```html
  <aside class="site-ribbon" data-ribbon role="region" aria-label="Featured class announcement">
    <div class="site-ribbon__inner">
      <p class="site-ribbon__text">
        <strong>Applied AI in Design Thinking</strong> · Fri May 29 · 10am–4pm · The Loft 419
      </p>
      <a class="site-ribbon__cta"
         href="https://www.eventbrite.com/e/1989613748280?aff=oddtdtcreator"
         target="_blank" rel="noopener noreferrer">
        Register →
      </a>
      <button type="button" class="site-ribbon__close" data-ribbon-dismiss aria-label="Dismiss announcement">×</button>
    </div>
  </aside>
```

- [ ] **Step 4: Add the dismiss handler script**

In `index.html`, find the existing inline script near the bottom:

```html
  <script>
    document.getElementById("footer-year").textContent = new Date().getFullYear();
  </script>
```

Replace it with:

```html
  <script>
    document.getElementById("footer-year").textContent = new Date().getFullYear();
    (function () {
      var btn = document.querySelector("[data-ribbon-dismiss]");
      if (!btn) return;
      btn.addEventListener("click", function () {
        try { window.localStorage.setItem("awid:ribbon:applied-ai-2026-05-29", "1"); } catch (e) {}
        document.documentElement.classList.add("ribbon-hide");
      });
    })();
  </script>
```

- [ ] **Step 5: Verify the ribbon renders for a fresh visitor**

In a private/incognito window (clean localStorage), open `http://localhost:8000/index.html`.

Expected:
- A solid dark-blue bar sits above the site header on every viewport width.
- Text reads: **Applied AI in Design Thinking** · Fri May 29 · 10am–4pm · The Loft 419.
- A `Register →` link sits to the right of the text.
- A `×` button sits at the far right.
- The header logo and nav are not overlapped.

- [ ] **Step 6: Verify the Register link opens Eventbrite in a new tab**

Click `Register →` in the ribbon.

Expected: opens `https://www.eventbrite.com/e/1989613748280?aff=oddtdtcreator` in a new tab. The original tab is unchanged.

- [ ] **Step 7: Verify dismissal persists**

Back in the original tab, click `×`.

Expected: ribbon vanishes immediately. Header slides up to fill the space.

Hard-reload the page.

Expected: ribbon does **not** reappear. No flash — the ribbon is hidden before paint.

In DevTools → Application → Local Storage → `http://localhost:8000`, confirm the key `awid:ribbon:applied-ai-2026-05-29` is set to `"1"`. Delete the key, then hard-reload. The ribbon should return.

- [ ] **Step 8: Verify mobile layout**

In DevTools, switch to a mobile preset (e.g., iPhone SE, 375px wide). Hard-reload.

Expected:
- Ribbon text wraps to its own line.
- `Register →` sits on the next line (or alongside, depending on text length).
- The `×` button is anchored top-right of the ribbon, not overlapping the text or the CTA.
- The header logo below the ribbon is not pushed off-screen or overlapped.

- [ ] **Step 9: Verify the post-event auto-hide**

In DevTools console, run:

```javascript
Date.now = function () { return new Date(2026, 5, 1).getTime(); };
```

This stubs `Date.now()` to June 1, 2026. (Note: this only affects scripts that read `Date.now()` after this point — you may need to clear the localStorage key first if it was set.)

Clear localStorage:

```javascript
localStorage.removeItem("awid:ribbon:applied-ai-2026-05-29");
```

Hard-reload. The inline `<head>` script will compare `Date.now()` (stubbed to June 1) against May 30, find that it's expired, and add `ribbon-hide`.

Expected: ribbon does not appear.

After verification, reload normally (without the stub) and confirm the ribbon returns (if you cleared localStorage).

- [ ] **Step 10: Verify the ribbon is home-page only**

Open `http://localhost:8000/about.html` and `http://localhost:8000/class.html?id=applied-ai-design-thinking`.

Expected: no ribbon on either page. Header sits at the top.

- [ ] **Step 11: Commit**

```bash
git add index.html assets/css/styles.css
git commit -m "feat(home): add dismissible top ribbon for May 29 Applied AI launch

Pre-paint inline script in <head> applies html.ribbon-hide when the
event-keyed localStorage flag is set or the date is past May 30 2026.
Mobile layout wraps the text/CTA and pins the close button top-right."
```

- [ ] **Step 12: Stop the dev server**

In the terminal running `python3 -m http.server 8000`, press `Ctrl-C`.

---

## Done

After Task 3 commits, the site is fully wired for the May 29 launch:

- The catalog card for *Applied AI in Design Thinking* shows the start date.
- The class detail page rails the new schedule and sends both Register CTAs to Eventbrite.
- A dismissible home-page ribbon announces the date with a Register CTA.
- The ribbon auto-hides itself the day after the event.

No further changes are needed unless you decide to:

- Add the ribbon to `class.html` / `about.html` (currently home-page only).
- Move ribbon copy into `classes.json` to drive future announcements from data.
- Reset the `eventbriteUrl` field after May 29 to restore the in-site form for future runs.
