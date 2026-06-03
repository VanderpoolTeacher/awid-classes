# Applied AI in Design Thinking — Creative Problem Solving

Course materials built from the recorded *Applied AI in Design Thinking / Creative Problem
Solving* class. Everything here turns that class into reusable lessons — learner reading,
activities, instructor guides, and interactive SCORM packages.

## How it's organized (Course → Module → Lesson)

The structure mirrors the **approved course outline** in
[`course-outline-map.md`](course-outline-map.md). Lessons live in module folders:

```
lessons/
├── module-0-framing/
│   └── 1-its-not-magic/
├── module-1-foundational-ai/
│   ├── 1-how-ai-works-up-close/
│   ├── 2-can-you-trust-it/
│   ├── 3-whose-work-is-it/
│   ├── 4-your-data-isnt-private/
│   └── 5-who-wins-with-ai/
├── module-3-build-systems/
│   ├── 1-build-systems-not-outputs/
│   ├── 2-organize-your-work/
│   ├── 3-git-and-github-basics/
│   └── 4-the-production-pipeline/
├── _templates/          ← blank starters for a new lesson
├── LESSON-SPEC.md       ← the authoritative spec (how lessons are made)
└── view.html            ← browser viewer for a lesson's parts
```

*Module 2 (the design-thinking process) is planned — it's awaiting supplemental material.*

## What's in a lesson

Each lesson folder is a complete set:

| File | Audience | What it is |
|---|---|---|
| `lesson.md` | production | the master/blueprint (source of truth) |
| `lesson-text.md` | learners | the reading |
| `activity.md` | learners | a hands-on handout |
| `instructor-guide.md` | facilitator | facilitation, timing, answer key |
| `scorm/` | learners (LMS) | a self-contained **SCORM 1.2** interactive |

## Key documents

- **[`lessons/LESSON-SPEC.md`](lessons/LESSON-SPEC.md)** — the rules: production pipeline,
  conventions, per-document specs, and the authoring workflow.
- **[`course-outline-map.md`](course-outline-map.md)** — the authoritative structure; maps
  every concept to a module and links each lesson.
- **[`concept-inventory.json`](concept-inventory.json)** — the source-of-truth concepts distilled
  from the class; lessons cite these keys.
- **[`DESIGN-LOG.md`](DESIGN-LOG.md)** — the running design & decision log for the whole build.

## Authoring a new lesson (in brief)

Open an issue → branch → copy `_templates/` into the right module folder → fill `lesson.md`,
then the parts and `scorm/` → link it in `course-outline-map.md` → open a PR that closes the
issue. Full steps are in `lessons/LESSON-SPEC.md` §6.

## Notes

- **Raw recordings/transcripts are local-only** (gitignored) — they contain attendees' names and
  candid conversation and are never published.
- Preview lessons locally: serve the repo (`python3 -m http.server 8000`) and open
  `…/AWID-Creative-Problem-Solving/lessons/view.html?lesson=<module>/<lesson>`.
