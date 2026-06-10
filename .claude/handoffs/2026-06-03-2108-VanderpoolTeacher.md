# Handoff — 2026-06-03 21:08

**Put down by:** VanderpoolTeacher · 2026-06-03 21:08 EDT

## Session theme
Turned the recorded *Applied AI in Design Thinking (Creative Problem Solving)* class into a real
course: distilled a concept inventory, defined a lesson-production system (spec + templates),
built and published 10 lessons across Modules 0/1/3, and made the whole course browsable by
students from the live site. Everything ran through an issue → branch → PR → merge workflow.

## In-flight items
| Item | Repo / location | Status now | Ref |
|---|---|---|---|
| (nothing open) | — | clean: only `main` locally, in sync with origin, **no open issues/PRs** | — |

Working tree note: raw transcripts live at `AWID-Creative-Problem-Solving/recordings/transcripts/`
and are **gitignored** (local-only, contain attendee names) — they will show as untracked-but-
ignored; that's intentional.

## Done this session
- Concept inventory (`concept-inventory.json`, 55 concepts), `course-outline-map.md`, running
  `DESIGN-LOG.md` (26 steps, 19 decisions).
- Lesson system: `lessons/LESSON-SPEC.md` + `lessons/_templates/` (PR #6).
- **10 lessons** published, each = master `lesson.md` + `lesson-text.md` + `activity.md` +
  `instructor-guide.md` + SCORM 1.2 `scorm/`:
  - Module 0: It's Not Magic
  - Module 1 (5): How AI Works Up Close · Can You Trust It? · Whose Work Is It? · Your Data Isn't
    Private · Who Wins With AI?
  - Module 3 (4): Build Systems Not Outputs · Organize Your Work · Git & GitHub Basics · The
    Production Pipeline
- Student access: `lessons/lessons.json` + `lessons/index.html` (course index) + viewer upgrades
  + a **Course** nav link & promo section on home `index.html` (PR #30). Instructor guides
  (answer keys) gated behind `?instructor=1`.
- README/folder-README/About describe the course (PR #28). Viewer Markdown list-rendering bug
  fixed (PR #32) + one activity numbering fix (PR #34). Render-scan: 0 issues across 27 parts.

## Next step(s)
- **Build Module 2 — the Design Thinking process** (empathize → define → ideate → prototype →
  test). This is the one remaining module.
- It is BLOCKED on the user's **supplemental design-thinking material** (parked). When resuming:
  1. Get the supplement into `AWID-Creative-Problem-Solving/recordings/supplemental/` (or wherever
     the user drops it).
  2. Ingest it; **extend `concept-inventory.json`** with new design-thinking concepts, keyed
     `YYYY-MM-DD-NNN` to the supplement's date.
  3. Build Module 2 lessons under `lessons/module-2-design-thinking/<n>-<slug>/` using
     `_templates/`, following `LESSON-SPEC.md` §6 (issue → branch → fill master → parts → SCORM →
     link in outline → PR).
  4. Update `course-outline-map.md` and `lessons/lessons.json` (it has a `planned` entry for
     `module-2-design-thinking`) so the index lists the new lessons.

## Open decisions / waiting on
- **Waiting on the user** for the design-thinking supplement (the concept inventory flagged
  Module 2 as thin in the transcripts: gaps in empathize/define/ideate *methods* + real-user
  testing — see `course-outline-map.md` GAP markers).
- Decision still open if user wants it: should students see instructor guides? Currently hidden
  (answer keys); instructors use `?instructor=1`.

## Gotchas / caveats
- **Published lessons are locked** (Decision 12): changing one needs a GitHub issue referenced in
  the commit (front matter `locked: true` + `changePolicy`).
- **Self-contained rule** (Decision 18): lesson content must NOT reference other lessons/modules;
  present prior knowledge inline. A lesson may self-label its own module (e.g., in the title).
- **Lesson order = folder prefix** within a module (e.g., `2-can-you-trust-it`). Inserting a
  lesson earlier in a module means renumbering (git mv) the later ones — done before, keep it
  consistent.
- The lesson viewer (`view.html`) renders `.md` over HTTP — must be **served** (e.g.
  `python3 -m http.server 8000`), not opened via `file://`. Local server is currently STOPPED.
- SCORM quiz `PASS_PERCENT` (index.html) must stay in sync with `masteryscore` in imsmanifest.xml.

## Pointers
- Repo: `VanderpoolTeacher/awid-classes` (public, GitHub Pages). Live:
  `https://vanderpoolteacher.github.io/awid-classes/` ; course index:
  `…/AWID-Creative-Problem-Solving/lessons/`
- Course root: `AWID-Creative-Problem-Solving/` — see its `README.md`.
- Authoritative structure: `AWID-Creative-Problem-Solving/course-outline-map.md`
- Lesson system spec: `AWID-Creative-Problem-Solving/lessons/LESSON-SPEC.md` (authoring workflow §6)
- Decision/step log: `AWID-Creative-Problem-Solving/DESIGN-LOG.md`
- Concepts: `AWID-Creative-Problem-Solving/concept-inventory.json`
- Manifest powering the index/switcher: `AWID-Creative-Problem-Solving/lessons/lessons.json`
- All PRs #2–#34 merged; all issues closed.
