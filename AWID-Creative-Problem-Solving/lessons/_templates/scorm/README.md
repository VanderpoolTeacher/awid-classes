# SCORM 1.2 package — TEMPLATE

Starter for a lesson's SCORM 1.2 interactive. Copy this folder into a lesson's `scorm/`,
fill in the placeholders, and package it. See `../../LESSON-SPEC.md` for the full spec.

## Fill in
- `index.html` — `<title>`, header eyebrow/title, content `<section class="step">` blocks
  (open with the narrative, end with a wrap-up callback), and the `QUESTIONS` array.
- `imsmanifest.xml` — `{{PACKAGE-ID}}`, `{{ORG-ID}}`, `{{LESSON TITLE}}`, `masteryscore`.
- Keep `PASS_PERCENT` (index.html) and `masteryscore` (manifest) in sync.

## Reuse as-is
- `scorm-api.js` — the LMS bridge (no edits).
- `styles.css` — the styling (edit only if you want a different look).

## Runs two ways
- **Standalone:** open `index.html` in a browser (LMS calls no-op).
- **In an LMS:** zip the folder contents (manifest at the zip root) and upload.

```bash
cd scorm
zip -r ../<lesson-slug>-scorm12.zip imsmanifest.xml index.html styles.css scorm-api.js
```
