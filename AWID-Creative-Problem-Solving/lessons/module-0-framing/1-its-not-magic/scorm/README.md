# SCORM 1.2 package — "It's Not Magic"

This folder is a **SCORM 1.2** package source. It runs two ways:

- **Standalone:** open `index.html` in any browser. The SCORM calls no-op safely, so it works
  as a plain interactive lesson.
- **In an LMS:** zip this folder and upload it. It reports completion and a quiz score.

## Files
| File | Role |
|---|---|
| `imsmanifest.xml` | SCORM manifest — **must be at the zip root.** Declares the SCO + mastery score (60). |
| `index.html` | The interactive lesson + 5-question knowledge check. |
| `styles.css` | Self-contained styling (no external dependencies). |
| `scorm-api.js` | Finds the LMS API; reports `lesson_status` and `score.raw`. |

## How to build the package
Zip the **contents** of this folder (not the folder itself), so `imsmanifest.xml` is at the top
level of the archive:

```bash
cd scorm
zip -r ../its-not-magic-scorm12.zip imsmanifest.xml index.html styles.css scorm-api.js
```

Upload `its-not-magic-scorm12.zip` to any SCORM 1.2-compatible LMS (Moodle, Canvas,
SCORM Cloud, TalentLMS, etc.).

## Notes
- Tracking used: `cmi.core.lesson_status` (`completed`/`passed`) and `cmi.core.score.raw` (0–100).
- Pass threshold is **60%**, set in both `index.html` (`PASS_PERCENT`) and `imsmanifest.xml`
  (`masteryscore`). Keep them in sync if you change it.
- Strict validators may also want the SCORM XSD schema files at the zip root
  (`imscp_rootv1p1p2.xsd`, `adlcp_rootv1p2.xsd`, `imsmd_rootv1p2p1.xsd`, `ims_xml.xsd`). Most
  modern LMSs import fine without them; add them if your LMS rejects the package.
