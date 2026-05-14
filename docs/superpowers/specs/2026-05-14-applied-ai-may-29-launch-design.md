# Applied AI in Design Thinking — May 29 Launch

## Summary

Schedule the first run of *Applied AI in Design Thinking* as a single-day workshop on **Friday, May 29, 2026, 10:00 AM – 4:00 PM** at The Loft 419. Announce it via a dismissible top ribbon on the home page. Route all registration to the existing Eventbrite event (already created). The in-site registration form is replaced — for this class only — by an Eventbrite CTA.

## Decisions

- **Format:** single-day workshop (compressed from the prior 5-session framing).
- **Date / time:** Friday, May 29, 2026, 10:00 AM – 4:00 PM, lunch break included.
- **Registration:** Eventbrite-only. URL: `https://www.eventbrite.com/e/1989613748280?aff=oddtdtcreator`. The `aff=oddtdtcreator` creator-share parameter is kept as-is.
- **Announcement:** dismissible top ribbon, home page only.
- **Eventbrite event content:** out of scope (already finalized).

## Class data update (`assets/data/classes.json`)

Single record edited: `applied-ai-design-thinking`.

```json
"schedule": {
  "startDate": "2026-05-29",
  "days": "One-day workshop · Friday",
  "sessions": 1,
  "time": "10:00 AM – 4:00 PM (lunch break included)"
},
"eventbriteUrl": "https://www.eventbrite.com/e/1989613748280?aff=oddtdtcreator"
```

`eventbriteUrl` is a new optional field. Other classes do not set it, so their existing behavior (in-site form) is unchanged. `longDescription` stays as-is — it works for a single-day intensive without modification.

## Home page ribbon (`index.html`)

Inserted as the first child of `<body>`, above `<header class="site-header">`:

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

### Behavior

- **Dismissible.** Clicking × sets `localStorage["awid:ribbon:applied-ai-2026-05-29"] = "1"` and hides the ribbon. Key is event-specific so a future ribbon is not auto-dismissed.
- **No flash on dismissed state.** A small inline script in `<head>` runs before body parsing and adds the class `ribbon-hide` to `<html>` if the localStorage key is set or the date has passed. CSS rule: `html.ribbon-hide .site-ribbon { display: none; }`. The default visible state is `display: flex` on `.site-ribbon` so the ribbon renders for the normal case. (Setting the class on `<html>` from `<head>` avoids the body-not-yet-parsed problem and follows the standard dark-mode-flash prevention pattern.)
- **Auto-hides after the event.** Same inline script: if `Date.now()` is past `new Date(2026, 4, 30).getTime()` (May 30, 2026 local midnight; month is 0-indexed), the `ribbon-hide` class is set regardless of dismissal state.
- **Home page only.** Not added to `about.html`, `class.html`, or `404.html` in this phase.

### Styling (`assets/css/styles.css`)

`.site-ribbon` — solid accent background, white text, ~44px tall on desktop. `.site-ribbon__inner` is a flex row with the text on the left, CTA in the middle, close button on the right. On mobile (< 600px wide), the inner flex wraps: text on one line, CTA on the next, close stays top-right. Reuses existing CSS variables for color and spacing. No animations.

## Class page changes (`assets/js/class-detail.js`)

Branch on `cls.eventbriteUrl` inside `renderClass`.

### Rail CTA

When `eventbriteUrl` is set, replace
```html
<a class="btn btn--primary class-rail__cta" href="#register">Register</a>
```
with
```html
<a class="btn btn--primary class-rail__cta"
   href="${eventbriteUrl}" target="_blank" rel="noopener noreferrer">
  Register on Eventbrite ↗
</a>
```

### Bottom register section

When `eventbriteUrl` is set, the form is fully replaced:

```html
<section id="register" class="register">
  <div class="container">
    <h2 id="register-heading">Register for ${cls.title}</h2>
    <p>Registration for this class is handled on Eventbrite, where you'll get confirmation and reminder emails.</p>
    <a class="btn btn--primary"
       href="${eventbriteUrl}" target="_blank" rel="noopener noreferrer">
      Register on Eventbrite ↗
    </a>
  </div>
</section>
```

The existing form branch is preserved for the other three classes (no `eventbriteUrl` set). `form.js` is dynamically imported only when a form is present, so it stays inert for this class without further changes.

The `isFull` branch (full-class messaging) is unchanged and takes precedence over the Eventbrite branch.

### Rail content after these changes

- **Starts:** Fri, May 29, 2026
- **Schedule:** One-day workshop · Friday
- **Time:** 10:00 AM – 4:00 PM (lunch break included)
- **Location:** The Loft 419, downtown Toledo (hybrid options available)
- **Seats left:** 30

## Files NOT touched

- `class.html` — pure shell, no changes needed.
- `assets/js/catalog.js` — already handles the `startDate` field; the May 29 date surfaces automatically on the catalog card.
- `assets/js/form.js` — only loaded when a form is present, so it stays inert for this class.
- `about.html`, `404.html` — no ribbon on these in this phase.
- `longDescription` and `learningObjectives` in `classes.json` — copy still fits the single-day format.

## Manual verification

1. Load `index.html` — ribbon shows. Click × — it disappears and stays gone on reload.
2. Reset localStorage and reload `index.html` — ribbon returns.
3. Click ribbon Register — opens the Eventbrite page in a new tab.
4. Load `class.html?id=applied-ai-design-thinking` — rail shows "Starts: Fri, May 29, 2026"; both Register buttons go to the real Eventbrite URL; the in-site form is gone.
5. Load `class.html?id=intro-design-tech-ai` — the in-site form still renders normally.
6. Resize to ≤ 375px wide — ribbon wraps cleanly and does not overlap header logo.
7. Temporarily set the system clock (or stub `Date.now()`) to 2026-05-30 — ribbon stays hidden.

## Out of scope

- Eventbrite event copy (event is already finalized).
- Ribbon on pages other than `index.html`.
- A data-driven ribbon system that reads featured-event copy from JSON. Hardcoded for this one-off.
- Updates to `longDescription` or `learningObjectives` for the single-day format.
- Analytics on ribbon click-through or dismissal.
