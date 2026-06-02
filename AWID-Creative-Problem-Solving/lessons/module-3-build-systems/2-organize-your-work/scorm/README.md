# SCORM 1.2 package — "Organize Your Work"

SCORM 1.2 package source for Module 3's organizing-the-work lesson. Runs two ways:

- **Standalone:** open `index.html` in a browser (SCORM calls no-op safely).
- **In an LMS:** zip the folder contents and upload; reports completion + quiz score.

## Files
| File | Role |
|---|---|
| `imsmanifest.xml` | SCORM manifest — **must be at the zip root.** Mastery score 60. |
| `index.html` | Interactive lesson + 5-question knowledge check (per-question feedback). |
| `styles.css` | Self-contained styling. |
| `scorm-api.js` | LMS bridge — reports `lesson_status` and `score.raw`. |

## Build the package
```bash
cd scorm
zip -r ../organize-your-work-scorm12.zip imsmanifest.xml index.html styles.css scorm-api.js
```

Pass threshold is **60%** — kept in sync between `PASS_PERCENT` (index.html) and `masteryscore`
(manifest).
