# Lesson System — Specification

The authoritative standard for how lessons in *Applied AI in Design Thinking (Creative Problem
Solving)* are produced. Every lesson follows this spec so the whole course is consistent.

> **Start here:** to make a new lesson, copy `_templates/` and follow the
> [Authoring workflow](#authoring-workflow). This document defines what each artifact must be.

---

## 1. Philosophy

We don't use AI to spit out one-off documents — we build a **repeatable system** that produces
consistent materials (the course's own thesis: *build systems, not outputs*). A lesson is a
small production line: one **master** lesson defines the blueprint; from it we produce
audience-specific **parts**; a **viewer** presents them; a **SCORM** package delivers the
interactive to a learning system. *Process over product* — the structure is the point.

---

## 2. Production pipeline

```
NN-slug.md  (MASTER — blueprint & source of truth)
      │  extrapolate
      ▼
NN-slug/                       PARTS (produced deliverables)
 ├── lesson-text.md            learner reading
 ├── activity.md               student handout
 ├── instructor-guide.md       facilitator guide
 └── scorm/                    SCORM 1.2 interactive (index.html, styles.css,
                               scorm-api.js, imsmanifest.xml, README.md)

view.html  (VIEWER — renders any lesson's parts in the browser; ?lesson=<folder>)
```

The **master** holds the canonical metadata, objectives, vocabulary, content outline, and
instructor notes. The **parts** are produced from it for specific audiences/formats. When they
differ, the master is the spec; the parts are the rendered deliverables.

---

## 3. Folder & naming conventions

| Path | What |
|---|---|
| `lessons/NN-slug.md` | Master lesson. `NN` = two-digit **file/creation order**; `slug` = kebab-case. |
| `lessons/NN-slug/` | Parts folder (same `NN-slug`). |
| `lessons/_templates/` | Blank starters: `lesson.md`, `lesson-text.md`, `activity.md`, `instructor-guide.md`, `scorm/`. |
| `lessons/view.html` | The reusable viewer. |
| `lessons/LESSON-SPEC.md` | This spec. |

- **`lesson` (NN) vs `module`:** `lesson` is file/creation order; `module` (front-matter field)
  is the course-sequence module (0–3) from `course-outline-map.md`. They may differ.
- Underscore-prefixed names (`_templates`, `_TEMPLATE`) sort to the top and signal "not a lesson."

---

## 4. Cross-cutting conventions (apply to every lesson)

These consolidate Decisions 10–16 in `DESIGN-LOG.md`.

1. **Fixed structure.** The master lesson uses the section order in `_templates/lesson.md` —
   no reordering, no dropping sections.
2. **"What it is → What it does → How it fits."** Introduce every technology/concept with these
   three beats (define it, say what it does, place it in its ecosystem).
3. **Bloom's-aligned objectives.** Each objective = one measurable action verb, observable, a
   single outcome (no compound objectives), no vague verbs (understand/know/appreciate), tagged
   with its Bloom's level. Prefer a climb Understand → Analyze → Apply → Evaluate/Create.
4. **Narrative frame.** Open every lesson with a concrete story/scene; the wrap-up calls back to
   it and resolves it.
5. **Narrative distance.** Use the delivered class's stories, metaphors, and expressions freely,
   but never reference the session itself ("the room," "in class," "the instructor said"). Tell
   stories as illustrative scenes, not a recap.
6. **Reading level.** Default ~5th grade unless the audience warrants otherwise.
7. **Traceability.** Front matter lists `relatedConcepts` keys from `concept-inventory.json`.
8. **Quiz feedback.** Interactive checks give per-question feedback (right/wrong + a short why),
   not just a score.
9. **Immutability.** Once a lesson is published to `main` it is **locked** (`locked: true` +
   `changePolicy` in front matter). Changes require an approved **GitHub issue**, referenced in
   the commit. (Templates and this spec are tools — they may evolve without an issue.)
10. **Self-contained — no cross-content references.** Content never references another lesson or
    module (by name or number), never assumes another lesson was completed, and never says "as we
    saw earlier" or "we'll cover this later." If prior knowledge is needed, **present it inline.**
    The `prerequisites` field names required skills/tools, not other lessons. (Internal provenance
    metadata such as `derivedFrom` is a production pointer, not learner content, and is exempt.)

---

## 5. Per-document specifications

For each artifact: **purpose · audience · format/location · required structure · front matter ·
done criteria.**

### 5.1 Master lesson — `NN-slug.md`
- **Purpose:** the blueprint/source of truth for the lesson.
- **Audience:** the production team (you).
- **Format/location:** Markdown at `lessons/NN-slug.md`. Template: `_templates/lesson.md`.
- **Required structure:** Overview (narrative) · Learning objectives · Key vocabulary · The
  lesson · Worked example · Hands-on activity · Common pitfalls · Discussion questions · Check
  for understanding · Key takeaways · Instructor notes.
- **Front matter:** `lesson`, `module`, `title`, `course`, `duration`, `audience`,
  `prerequisites`, `created`, `locked`, `changePolicy`, `relatedConcepts`.
- **Done when:** all sections filled; objectives meet §4.3; opens with a narrative and calls
  back; conventions §4 satisfied.

### 5.2 Lesson text — `NN-slug/lesson-text.md`
- **Purpose:** the learner-facing reading.
- **Audience:** learners (~5th-grade reading level).
- **Format/location:** Markdown in the parts folder. Template: `_templates/lesson-text.md`.
- **Required structure:** narrative opening → teaching prose (one idea per heading) → wrap-up
  with callback + "Remember:" list. **No** instructor notes, activity, or quiz.
- **Front matter:** `part: lesson-text`, `lesson`, `module`, `title`, `derivedFrom`, `audience`,
  `readingLevel`.
- **Done when:** reads as prose (not an outline); uses the real metaphors; keeps narrative
  distance (§4.5); narrative opens and resolves.

### 5.3 Activity — `NN-slug/activity.md`
- **Purpose:** student handout for the hands-on work + discussion.
- **Audience:** learners; usable standalone.
- **Format/location:** Markdown in the parts folder. Template: `_templates/activity.md`.
- **Required structure:** goal statement (process over product) → numbered parts with write-in
  blanks → reflection → discussion questions.
- **Front matter:** `part: activity`, `lesson`, `module`, `title`, `derivedFrom`, `audience`,
  `materials`.
- **Done when:** a learner could complete it without the lesson text in hand.

### 5.4 Instructor guide — `NN-slug/instructor-guide.md`
- **Purpose:** facilitation guidance.
- **Audience:** the instructor/facilitator. *(The one part where referencing live delivery is
  appropriate.)*
- **Format/location:** Markdown in the parts folder. Template: `_templates/instructor-guide.md`.
- **Required structure:** why this lesson exists · objectives · materials/setup · timing table ·
  facilitation walk-through · check-for-understanding **answer key** · misconceptions ·
  closing thought (no cross-references) · if-less-time.
- **Front matter:** `part: instructor-guide`, `lesson`, `module`, `title`, `derivedFrom`,
  `audience`, `totalTime`.
- **Done when:** a new facilitator could run the lesson from it; answer key complete.

### 5.5 SCORM interactive — `NN-slug/scorm/`
- **Purpose:** the interactive, LMS-deliverable lesson.
- **Audience:** learners (self-paced).
- **Format/location:** `scorm/` with `index.html`, `styles.css`, `scorm-api.js`,
  `imsmanifest.xml`, `README.md`. Template: `_templates/scorm/`. **Standard: SCORM 1.2.**
- **Required structure:** navigable content steps (open with narrative, end with callback) + a
  knowledge check with **per-question feedback**; reports `lesson_status` + `score.raw`; runs
  standalone (calls no-op without an LMS).
- **Constraints:** self-contained, vanilla JS, no external dependencies; `PASS_PERCENT`
  (index.html) and `masteryscore` (manifest) kept in sync.
- **Done when:** manifest well-formed; runs standalone in a browser; quiz grades + gives
  feedback; zips with the manifest at the archive root.

### 5.6 Lesson viewer — `lessons/view.html`
- **Purpose:** browser-based reader for a lesson's parts.
- **Audience:** anyone previewing/sharing a lesson outside an LMS.
- **Format/location:** single `view.html`; parameterized by `?lesson=<folder>`.
- **Behavior:** fetches and renders the part `.md` files (no external dependencies); tabs for
  Lesson / Activity / Instructor Guide + a launch button for the SCORM interactive. Source `.md`
  stays the single source of truth.
- **Done when:** all parts render; "Launch interactive" opens the SCORM `index.html`.
- **Note:** shared across all lessons — changes here are not lesson edits.

---

## 6. Authoring workflow

To create a new lesson (e.g., Module 1):

1. **Open a GitHub issue** describing the lesson.
2. **Branch** from `main`, named for the issue: `feature/<issue#>-<slug>`.
3. **Copy the templates:** `cp lessons/_templates/lesson.md lessons/NN-slug.md`, and
   `cp -r lessons/_templates lessons/NN-slug` then keep the part files (`lesson-text.md`,
   `activity.md`, `instructor-guide.md`, `scorm/`) and remove `lesson.md` from the parts folder.
4. **Fill the master** (`NN-slug.md`) first — it's the blueprint.
5. **Produce the parts** from the master, satisfying each §5 spec.
6. **Build the SCORM** content + questions; keep pass thresholds in sync.
7. **Preview** locally with the viewer: `…/lessons/view.html?lesson=NN-slug`.
8. **Log it** in `DESIGN-LOG.md`.
9. **PR** that **closes the issue**; on merge it publishes to the live site and **locks** the
   lesson.

---

## 7. References
- `DESIGN-LOG.md` — Decisions 10–16 (the conventions, with rationale and dates).
- `concept-inventory.json` — source-of-truth concepts; lessons cite their `relatedConcepts` keys.
- `course-outline-map.md` — module structure and concept coverage.
