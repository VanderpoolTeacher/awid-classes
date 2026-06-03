# Creative Problem Solving — Course Build: Design & Decision Log

A living record of how we turn the recorded *Applied AI in Design Thinking / Creative
Problem Solving* class into course materials (lessons, discussion questions, activity
ideas) and presentations/interactives.

**Working principle:** we build **step by step**, not system-wide. Each step is decided,
logged here, and completed before the next is scoped. This document is the source of
truth for *what we decided and why* — not a fixed up-front spec.

---

## How this log works

- **Decisions** (below) is the running list of settled choices. Newest at the bottom.
- **Session log** captures each working exchange: a short summary of the prompt (what was
  asked), the response/decision, and the result. One entry per meaningful step.
- When a decision is reversed, we don't delete it — we add a new decision that supersedes
  it and note which one it replaces.

---

## Project at a glance

- **Source material:** text transcripts of the class. Provided as text only — no audio
  transcription is performed by Claude. Transcripts live in
  `AWID-Creative-Problem-Solving/recordings/transcripts/`.
- **Core concepts to surface:** the design thinking process (empathize, define, ideate,
  prototype, test) and foundational AI understanding.
- **Intended outputs (high level, not yet committed step by step):** lessons, discussion
  questions, activity ideas, and presentations/interactives. The existing site already has
  a slideshow system (`slides.html` + `assets/js/slides.js`) and a class catalog
  (`assets/data/classes.json`) we may build on.

Rough pipeline (for orientation only — we are **not** designing or building all of this at
once):

1. Ingest transcripts.
2. Distill core concepts from the transcripts.
3. Author written course materials.
4. Build presentations / interactives.

---

## Decisions

1. **Source is transcripts only.** The user provides text transcripts; Claude does not
   process audio. *(2026-06-01)*
2. **Build step by step, not system-wide.** Scope and complete one step at a time;
   converse about the next step only after the current one is done. *(2026-06-01)*
3. **Maintain this design/decision log.** Every meaningful step is recorded here with a
   summary of the prompt, the response/decision, and the result. *(2026-06-01)*
4. **Step 2 is a concept inventory.** Before authoring any lessons/slides/activities,
   distill the transcripts into a structured inventory of every teachable concept, tagged
   by strand and traced back to the transcript. Source of truth for everything
   downstream. *(2026-06-01)*
5. **The concept inventory is JSON.** Stored as structured JSON (not prose), matching the
   existing `assets/data/classes.json` pattern, so it is machine-readable and can later
   drive generation of lessons, slides, and interactives. *(2026-06-01)*
6. **Each concept gets a stable primary key plus a slug.** `key` is the immutable
   canonical identifier that all cross-references (and downstream materials) point at;
   `id` is a human-readable slug that may change. Decided to add the stable key now rather
   than retrofit it later. *(2026-06-01)*
7. **Key format is `YYYY-MM-DD-NNN`, dated to the source material.** The date is when the
   source was created/stated — the **2026-05-29** session per the transcript filenames —
   not the distillation date. Sequential `NNN` within that date. *(2026-06-01)*
8. **Raw recordings/transcripts are local-only (gitignored).** The repo is public; raw
   transcripts contain attendees' real names and candid personal conversation, so they are
   never committed. `recordings/` is in `.gitignore`. Their only value is preservation.
   *(2026-06-01)*
9. **Redaction is a required step before any transcript is published.** If a transcript ever
   needs to go public, it must first be redacted (names + personal/sensitive content
   stripped) and committed as a separate redacted copy — never the raw file. *(2026-06-01)*
10. **Lessons follow a fixed template structure.** Front matter (incl. `relatedConcepts`
    keys) → Overview → Learning objectives → Key vocabulary → The lesson → Worked example →
    Hands-on activity → Common pitfalls → Discussion questions → Check for understanding →
    Key takeaways → Instructor notes. Markdown, stored in `lessons/`. Lesson 01 is the
    prototype; a blank `lessons/_TEMPLATE.md` will be extracted from it. *(2026-06-01)*
11. **Introduce every technology/concept with "What it is → What it does → How it fits."**
    A required convention in lessons: define the thing, say what it does, then place it in
    its ecosystem (e.g., "Git is version-control software that tracks a codebase's changes
    and sits in the software development life cycle"). *(2026-06-01)*
12. **Lessons are immutable once created.** A published lesson may not be changed without an
    open, approved **GitHub issue**; the issue number is referenced in the commit that makes
    the change. Enforced via lesson front matter (`locked: true` + `changePolicy`). The
    structure (Decision 10) and the intro convention (Decision 11) are codified in
    `lessons/_TEMPLATE.md`, which every new lesson is built from. *(2026-06-01)*
13. **Learning objectives must be measurable and Bloom's-aligned.** Each objective uses one
    action verb, is observable, states a single outcome (no compound objectives), avoids vague
    verbs (understand/know/appreciate), and is tagged with its Bloom's level. Prefer a climb
    Understand → Analyze → Apply → Evaluate/Create. Codified in `_TEMPLATE.md`. *(2026-06-01)*
14. **Lessons open with a narrative and call back to it in the wrap-up.** Each lesson begins
    with a short, concrete story/scene (ideally a real class moment/metaphor) that sets up the
    tension; the wrap-up (Key takeaways) resolves it. Lesson prose should draw on the
    instructor's real metaphors and demos. Codified in `_TEMPLATE.md`. *(2026-06-01)*
15. **Each lesson decomposes into parts (SCORM 1.2).** The master lesson `.md` is the blueprint/
    source of truth; produced deliverables live in a per-lesson folder: `lesson-text.md`
    (learner reading), `activity.md` (student handout), `instructor-guide.md` (facilitation),
    and `scorm/` (a self-contained, vanilla-JS interactive packaged for **SCORM 1.2** — runs
    standalone or in an LMS). *(2026-06-01)*
16. **Keep narrative distance from the physical class.** Lesson content freely uses the stories,
    metaphors, and expressions from the delivered class, but does NOT explicitly reference the
    session itself ("the room," "in class," "the instructor said"). Tell the stories as
    illustrative scenes, not as a recap. Interactive quizzes give **per-question feedback**, not
    just a score. *(2026-06-01)*
17. **The lesson system is specified and templated.** `lessons/LESSON-SPEC.md` is the
    authoritative spec (pipeline, conventions, per-document specs, authoring workflow);
    `lessons/_templates/` holds blank starters for every artifact (`lesson.md` — moved from
    `_TEMPLATE.md` — plus `lesson-text.md`, `activity.md`, `instructor-guide.md`, `scorm/`). New
    lessons are authored by copying `_templates/` and following the spec. Templates and the spec
    are tools and may evolve without a GitHub issue. *(2026-06-01)*
18. **Content is self-contained — no cross-content references.** No piece of content references
    another lesson/module (by name or number), assumes another was completed, or says "as we saw
    earlier / we'll cover later." Needed prior knowledge is presented **inline**; `prerequisites`
    names skills/tools, not lessons. (Internal provenance metadata like `derivedFrom` is exempt —
    it's a production pointer, not learner content.) Codified in `LESSON-SPEC.md` §4.10 and the
    templates. *(2026-06-01)*
19. **`course-outline-map.md` is the authoritative structure; lessons are organized by module.**
    Lessons live in `lessons/module-<n>-<name>/<order>-<slug>/` with the master as `lesson.md`;
    no creation-order filenames. **Course → Module → Lesson is connectable through docs:** the
    outline lists each lesson, and each lesson declares its `module` and cites outline concept
    keys. Reference the outline when creating/updating content. Codified in `LESSON-SPEC.md`
    §3, §4.11, §6. *(2026-06-01)*

---

## Session log

### 2026-06-01 — Kickoff & process definition

- **Prompt (summary):** Turn the recorded Applied AI + design-thinking class into course
  materials — lessons, questions, activity ideas — plus presentations/interactives around
  the core concepts (design thinking + foundational AI).
- **Response/decision:** Clarified that source material would be transcripts only.
  Established that we work step by step rather than designing the whole system up front,
  and that this log will document each decision and step.
- **Result:** Created this design & decision log. Awaiting transcripts in
  `recordings/transcripts/`, after which we discuss the very next step.

### 2026-06-01 — Step 1: Ingest & read transcripts

- **Prompt (summary):** "Transcripts added." User placed the class transcripts in
  `recordings/transcripts/`.
- **Response/decision:** Read both files end to end before proposing any next step.
  - `May 29 at 10-37 AM.txt` — morning session (~18.4k words).
  - `May 29 at 1-31 PM.txt` — afternoon session (~12.7k words).
  - Files are raw auto-transcription: ASR errors, attendee chatter, and tangents
    (lunch ordering, education rants) interleaved with the actual teaching.
- **Result:** Ingested. Identified the core teachable content, which splits cleanly into
  two strands that mirror the class title:
  - **Foundational AI understanding:** "it's not magic, it's code"; non-deterministic
    output; ethics (IP, attribution, the creative-community objection); hallucination &
    verification ("it will lie to you"); privacy/data governance (PII, FERPA/HIPAA, GRC);
    AI as a tool (hammer/car/abstraction analogies); domain expertise (accountants ran the
    first computers); image generation (JSON-prompt consistency, bias, the "tells").
  - **Design thinking / creative problem solving:** empathize/understand (NotebookLM,
    finite knowledge base, cited sources) → define (problem statement) → ideate (voice
    brainstorming, expand the option space) → prototype (Claude projects/folders, style
    guides, dashboards, HTML, slideshows) → test (iterate, be precise).
  - **Cross-cutting thesis:** build repeatable systems, not one-off outputs — process over
    product; templates as source of truth; the curriculum production pipeline; prompt &
    change logs (the very practice this log embodies).
- **Next:** discuss Step 2 with the user before acting.

### 2026-06-01 — Step 2: Concept inventory (JSON)

- **Prompt (summary):** Liked the concept-inventory idea; asked to build it as JSON. On the
  schema, asked about unique identifiers/primary keys. Approved a stable `key` + slug `id`,
  and specified the key date should be the source-file date (May 29), not the distill date.
- **Response/decision:** Proposed and got sign-off on a JSON schema: top-level metadata +
  `strands` + a `concepts[]` array. Each concept has `key` (immutable PK, `YYYY-MM-DD-NNN`),
  `id` (slug), `title`, `strand`, `phase` (or null), `summary`, `keyPoints[]`, `stories[]`,
  `tools[]`, `quotes[]` (lightly cleaned), `source{transcript, approxLines}`, and
  `relatedConcepts[]` (by key). Deliberately captured only what was taught — no generated
  quiz questions or activities yet.
- **Result:** Wrote `concept-inventory.json` — **55 concepts** distilled from both
  transcripts. Keys `2026-05-29-001`..`-055`. Strand split: 29 foundational-ai,
  9 design-thinking, 17 cross-cutting. Validated: well-formed JSON, unique keys, all
  `relatedConcepts` refs resolve. Updated the key date from the distill date to the
  session date per user clarification.
- **Next:** discuss Step 3 with the user. Likely candidates: (a) review/curate the
  inventory together; (b) shape it into a course/module outline; (c) start generating one
  downstream artifact type (lesson, discussion questions, activity, or slide deck) from a
  chosen concept or strand.

### 2026-06-01 — Step 3: Course outline → concept map

- **Prompt (summary):** Acknowledged the design-thinking strand is light and said they have
  supplemental material for it. Then asked to see a map of the proposed course outline filled
  in with the key concepts.
- **Response/decision:** Built the map *before* ingesting the supplement, so the map reveals
  exactly where the gaps are. Outline spine = the design-thinking phases + the 8 learning
  objectives on the `applied-ai-design-thinking` entry in `classes.json` (stated assumption;
  user can redirect). Organized into four modules: 0-Framing, 1-Foundational AI,
  2-Design-thinking process, 3-Build systems. Every concept referenced by `key`; gaps flagged.
- **Result:** Wrote `course-outline-map.md`. All 55 concepts placed. Coverage: Foundational
  AI (29) and Build-systems (17) are deep; design-thinking process (9) is thin. Flagged the
  specific design-thinking gaps as supplement targets: **empathize** (research technique),
  **define** (problem-framing method), **ideate** (ideation methods), and **test** (real-user
  testing). Prototype phase is well covered.
- **Next:** user has supplemental design-thinking material to bring in (targets above).
  Likely Step 4: ingest the supplement, then extend `concept-inventory.json` with new
  design-thinking concepts (keyed to the supplement's date) and re-map.

### 2026-06-01 — Decision: defer supplemental design-thinking material

- **Prompt (summary):** "We are going to ignore the supplemental material for right now.
  We'll build that out later."
- **Response/decision:** Parked the supplement. The design-thinking phase gaps
  (empathize / define / ideate methods, plus real-user testing) remain documented in
  `course-outline-map.md` as the targets for whenever it's brought in. Proceeding with the
  material we have.
- **Result:** Supplement deferred; no change to the existing files. Awaiting the next step.

### 2026-06-01 — Step 4: Put the work on GitHub (privacy catch)

- **Prompt (summary):** Set this up on GitHub, narrated slowly for a live recording.
- **Response/decision:** Confirmed the repo is already linked to a **public** GitHub remote
  (`VanderpoolTeacher/awid-classes`). Created branch `feature/course-concept-inventory` for
  this work. While staging, caught that the raw transcripts were about to be committed to a
  public repo — they contain attendees' real names and candid conversation. Unstaged them and
  added `recordings/` to `.gitignore` (Decisions 8 & 9). Committing only the three derived
  artifacts plus the `.gitignore` policy change.
- **Result:** Committed the 3 artifacts + `.gitignore` as `b9b040e` and pushed branch
  `feature/course-concept-inventory` to GitHub. Verified no transcripts are tracked.

### 2026-06-01 — Step 5: Merge slideshow into `main` & clean up branches

- **Prompt (summary):** Asked what was going on with `feature/1-overview-slideshow`, then to
  merge it into `main`, then to clean up the feature branches. Narrated slowly for the recording.
- **Response/decision:** Found that `feature/1` (the overview slideshow) was complete but **not
  on `main`** despite a "MERGED" PR label — `main` actually held unrelated feature-banner work.
  Merged `feature/1` into `main` locally (clean, no conflicts). On push, GitHub **rejected** it:
  while we worked, PR #3 (our concept branch, which was *stacked on* `feature/1`) had been merged
  into `origin/main`, carrying the slideshow up too. Chose the safe path — fetch, inspect, and
  **align local `main` to `origin/main`** (`reset --hard`) rather than force — discarding our now
  redundant local merge. Then deleted both feature branches: `feature/1` with safe `-d`;
  `feature/course-concept-inventory` needed `-D` because of one orphaned local commit that had
  accidentally bundled the pre-existing logo/spec changes we'd deliberately excluded.
- **Result:** `main` (local = GitHub) now holds the slideshow **and** the concept files, in sync.
  Only `main` remains; feature branches gone locally and on GitHub. Transcripts still local-only.
  Lesson reinforced on camera: rejections/`-d` refusals are safety features — fetch, look, then act.

### 2026-06-01 — Step 6: First lesson + lesson-template conventions

- **Prompt (summary):** Create a lesson on what we did with Git/GitHub (basic understanding) —
  to also serve as the basis for a reusable lesson template structure. Approved the proposed
  outline and added a rule: introduce every technology/concept with "what it is, what it does,
  how it fits into the ecosystem."
- **Response/decision:** Wrote `lessons/01-git-and-github-basics.md` against the approved
  structure (Decision 10), applying the "What → Does → Fits" convention (Decision 11) to Git and
  GitHub and an ecosystem-aware vocabulary table. Grounded every example in the real session
  (stage/commit/push, branch, merge, the rejected push, `-d` vs `-D`, the privacy catch). Linked
  it back to concept-inventory keys via `relatedConcepts` front matter.
- **Result:** Lesson 01 written. Doubles as the template prototype.

### 2026-06-01 — Step 7: Formalize the lesson pattern + immutability policy

- **Prompt (summary):** "Establish this as a pattern." Also: lesson front matter must state that
  once created, a lesson cannot be changed without a GitHub issue.
- **Response/decision:** Extracted `lessons/_TEMPLATE.md` — the reusable skeleton encoding the
  fixed section order (Decision 10) and the "What → Does → Fits" intro convention (Decision 11)
  as in-file author guidance. Added an immutability policy (Decision 12): lessons carry
  `locked: true` + a `changePolicy` in front matter requiring a GitHub issue for any change.
  Backfilled the policy fields into Lesson 01.
- **Result:** `lessons/_TEMPLATE.md` created; Lesson 01 front matter updated with `created`,
  `locked`, and `changePolicy`. Pattern is now reusable.

### 2026-06-01 — Step 8: Dedicated content-creation branch

- **Prompt (summary):** Work on a branch specific to the content-creation process; put the
  current work on it.
- **Response/decision:** Created `feature/content-creation` off `main`. Staged the course
  folder (recordings gitignored, so excluded), committed the template + Lesson 01 + updated log
  as `0d79ed7`, and pushed the branch. `main` (the live site) untouched — feature-branch pushes
  don't deploy, so we can iterate freely here.
- **Result:** Content now lives on `feature/content-creation`, backed up on GitHub. This is the
  ongoing lane for authoring lessons.

### 2026-06-01 — Step 9: Module 0 lesson — "It's Not Magic"

- **Prompt (summary):** "Let's do module 0."
- **Response/decision:** Authored the Module 0 framing lesson from the template, covering the
  three tightly-linked concepts `2026-05-29-003` (demystifying), `-001` (it's not magic), and
  `-002` (non-deterministic), with `-019` and `-027` as support. Applied the "What → Does →
  Fits" convention to AI, LLM, and Code. Added a `module` field to the template and the lesson
  to tie lessons to the course-outline-map modules.
- **Result:** Wrote `lessons/02-its-not-magic-how-ai-works.md` (module 0). Note on numbering:
  `lesson` = file/creation order (Git basics = 01, Module 0 = 02); `module` = course sequence.
  They intentionally differ — Git basics is module-3/tooling content authored first. Open
  question for the user: keep this scheme, or renumber files to match course order (nothing is
  locked on `main` yet). **Next:** commit Module 0 to the content branch; pick the next lesson.

### 2026-06-01 — Step 10: Decompose Module 0 into parts + SCORM interactive

- **Prompt (summary):** Extrapolate the lesson into its parts — lesson text, activity docs, an
  interactive HTML that becomes a SCORM package, and instructor guide. Use SCORM 1.2. Expand the
  lesson text to be more robust using class content/metaphors. Start each lesson with a narrative
  and call back to it in the wrap-up.
- **Response/decision:** Established the decomposition pattern (Decision 15) and the narrative
  convention (Decision 14). Built the parts under
  `lessons/02-its-not-magic-how-ai-works/`. Expanded the lesson text with the instructor's real
  metaphors (the deterministic "2+2" box, "only so many ways to arrange words / the load of
  bull——", music/notes, the car-and-engine, running-out-of-data) and framed it with the AI
  "podcast voices" narrative, paid off in the wrap-up. SCORM interactive is self-contained
  vanilla JS with a 5-question check that reports `lesson_status` + `score.raw`; no-ops safely
  standalone.
- **Result:** Created `lesson-text.md`, `activity.md`, `instructor-guide.md`, and `scorm/`
  (`index.html`, `styles.css`, `scorm-api.js`, `imsmanifest.xml`, `README.md`). Updated
  `_TEMPLATE.md` with the narrative convention.

### 2026-06-01 — Step 11: Lesson viewer web page

- **Prompt (summary):** Create a web page to view the lesson with.
- **Response/decision:** Built a reusable lesson viewer `lessons/view.html` (no external
  dependencies): tabs for Lesson / Activity / Instructor Guide + a button to launch the SCORM
  interactive. It fetches and renders the part `.md` files with a small built-in Markdown
  parser (headings, lists, tables, blockquotes, code, inline), so the source `.md` stays the
  single source of truth. Parameterized by `?lesson=<folder>`, defaulting to Module 0.
- **Result:** `lessons/view.html` created. Verified over a local server — viewer + all parts
  return HTTP 200. Open at `…/lessons/view.html`. **Next:** commit/push; pick the next lesson
  or decompose Lesson 01.

### 2026-06-01 — Step 12: Lesson-system spec + templates (issue #5)

- **Prompt (summary):** Build out the template and specification for all the document types so
  everything going forward follows the same pattern — and do it via a GitHub issue + branch.
- **Response/decision:** Opened **issue #5**, branched `feature/5-lesson-system-spec`. Wrote
  `lessons/LESSON-SPEC.md` (philosophy, production pipeline, folder/naming conventions,
  cross-cutting conventions consolidating Decisions 10–16, per-document specs with done-criteria,
  and the authoring workflow). Created `lessons/_templates/` blank starters for every part and
  moved the master `_TEMPLATE.md` → `_templates/lesson.md` (Decision 17). Reusable `scorm-api.js`
  and `styles.css` copied as-is; `index.html`/`imsmanifest.xml`/`README.md` templated with
  placeholders.
- **Result:** Spec + full template set in place. **Next:** commit on the branch, open a PR that
  closes #5, then merge to publish.

### 2026-06-01 — Step 13: Module 1 Lesson — "Can You Trust It?" (issue #7) + no-cross-ref rule

- **Prompt (summary):** Build Module 1 on a new branch. Mid-build: add a rule that content never
  references other content (present prior knowledge inline). Create a cleanup issue for the
  already-published lessons, and keep going on Lesson 3.
- **Response/decision:** Module 1 is large (~29 concepts) → built as a sequence; started with the
  trust/accuracy lesson on **issue #7 / branch `feature/7-can-you-trust-it`**. Built the master
  (`03-can-you-trust-it.md`) and all parts under `03-can-you-trust-it/`: `lesson-text.md`,
  `activity.md`, `instructor-guide.md`, and `scorm/` (SCORM 1.2, 5-question check with feedback).
  Concepts `…-007/008/020/021`. Added **Decision 18** (self-contained content — no cross-content
  references) to `LESSON-SPEC.md` §4.10 and the templates, and applied it to Lesson 3 (removed all
  Module 0 references; prior knowledge presented inline). Filed **issue #8** to retrofit the
  already-published lessons (which predate the rule and are locked).
- **Result:** Lesson 3 complete and self-contained (grep clean); scorm manifest well-formed.
  **Next:** commit, open PR closing #7, merge to publish. Cleanup of published lessons tracked in
  #8.

### 2026-06-01 — Step 14: Reorganize lessons by module (issue #10)

- **Prompt (summary):** Organize the project by module with lessons as subfolders; the filenames
  didn't match `course-outline-map.md`; make Course → Module → Lesson connectable through the
  docs and reference the approved outline when creating content.
- **Response/decision:** Merged PR #9 first so all three lessons were on `main`. On **issue #10 /
  branch `feature/10-reorganize-by-module`**, moved every lesson into a module folder
  (`module-0-framing/1-its-not-magic`, `module-1-foundational-ai/1-can-you-trust-it`,
  `module-3-build-systems/1-git-and-github-basics`) with the master renamed to `lesson.md`;
  dropped the creation-order filenames and the `lesson: NN` field; fixed `derivedFrom` →
  `./lesson.md`; added `module: "3"` to the Git lesson. Made the outline the index (lesson links
  under each module + an authoritative-structure note) and updated `view.html`, `LESSON-SPEC.md`
  (§3, §4.11, §6, §7), and the templates. **Decision 19.**
- **Result:** Folder paths now mirror the outline; Course → Module → Lesson is navigable through
  docs. **Next:** validate (viewer + scorm), commit, PR closing #10.

### 2026-06-02 — Step 15: Self-contained cleanup of published lessons (issue #8)

- **Prompt (summary):** Merge the reorg and keep going — taken as the #8 cleanup of the published
  lessons that predate the self-contained rule (Decision 18).
- **Response/decision:** On **issue #8 / branch `feature/8-self-contained-cleanup`** (after
  merging the reorg PR #11), removed every cross-content reference from the published Module 0
  lesson (master, lesson-text, instructor-guide): "all course long," "the next modules," "later in
  the course," "Module 1/Module 3," "next module" — rephrased to present the idea inline or drop
  the forward-reference; renamed the instructor-guide's "Transition to the next module" →
  "Closing thought." Also fixed three stale `# Lesson NN —` H1 headings left over from the reorg
  (Module 0/1/Git) → `# Module N — …`. Audited the Git lesson (no cross-refs).
- **Result:** Broad grep across published lessons returns only self-labels (a lesson naming its
  own module). All published content now complies with Decisions 18 and 19. **Next:** commit, PR
  closing #8.

### 2026-06-02 — Step 16: Module 1 Lesson 2 — "Whose Work Is It?" (issue #13)

- **Prompt (summary):** "build out" — continue authoring lessons.
- **Response/decision:** Built the second Module 1 lesson on **issue #13 / branch
  `feature/13-whose-work-is-it`**, completing the responsible-use side of Module 1 (ownership &
  ethics) that the trust lesson didn't cover. Authored per LESSON-SPEC from `_templates/`:
  `module-1-foundational-ai/2-whose-work-is-it/` with `lesson.md` + parts (lesson-text, activity,
  instructor-guide) + SCORM 1.2 interactive (5-question check with feedback). Concepts
  `…-004/005/006/022/014`. Narrative hook: the AI laser-lights-on-an-art-museum photo. Self-
  contained (Decision 18); linked under Module 1 in the outline (Decision 19).
- **Result:** Lesson complete; manifest well-formed, self-contained grep clean. **Next:** commit,
  PR closing #13.

### 2026-06-02 — Step 17: Module 1 Lesson 3 — "Your Data Isn't Private" (issue #15)

- **Prompt (summary):** "merge and go" — merged Lesson 2 (PR #14) and continued the build-out.
- **Response/decision:** Built the third Module 1 lesson (sub-area 1c — data, privacy &
  governance) on **issue #15 / branch `feature/15-your-data-isnt-private`**. Authored per
  LESSON-SPEC from `_templates/`: `module-1-foundational-ai/3-your-data-isnt-private/` with
  `lesson.md` + parts (lesson-text, activity, instructor-guide) + SCORM 1.2 interactive
  (5-question check with feedback). Concepts `…-009/010/011/012/013`. Narrative hook: the
  customer-list paste into a free chatbot ("the riskiest click is paste"). Self-contained;
  linked under Module 1 in the outline.
- **Result:** Lesson complete. **Next:** commit, PR closing #15. Module 1 now has 3 of ~4 lessons
  (1b ×2, 1c); 1a and 1d remain.

### 2026-06-02 — Step 18: Module 1 Lesson 4 — "Who Wins With AI?" (issue #17)

- **Prompt (summary):** "merge and go" — merged Lesson 3 (PR #16) and built the final Module 1
  lesson (1d).
- **Response/decision:** Built on **issue #17 / branch `feature/17-who-wins-with-ai`** the AI-as-
  a-tool lesson (1d). Per LESSON-SPEC from `_templates/`:
  `module-1-foundational-ai/4-who-wins-with-ai/` with `lesson.md` + parts + SCORM 1.2 interactive
  (5-question check with feedback). Concepts `…-015/014/016/028`. Narrative hook: the first
  computers, where accountants/clerks (domain experts), not engineers, won. Self-contained;
  linked under Module 1 in the outline.
- **Result:** Lesson complete. **Module 1 is now fully drafted** (1b ×2, 1c, 1d); only the
  optional deeper-dive 1a remains. **Next:** commit, PR closing #17.

### 2026-06-02 — Step 19: Module 3 Lesson 1 — "Build Systems, Not Outputs" (issue #19)

- **Prompt (summary):** "merge and go" — merged Lesson 4 (PR #18, completing Module 1's core) and
  moved to Module 3 (rich in the transcripts; Module 2 awaits the parked DT supplement).
- **Response/decision:** Built Module 3's signature lesson (3a — the core thesis) on **issue #19 /
  branch `feature/19-build-systems-not-outputs`**: `module-3-build-systems/1-build-systems-not-
  outputs/` with `lesson.md` + parts + SCORM 1.2 interactive (5-question check with feedback).
  Concepts `…-039/040/051/041`. Narrative hook: "build me a course" ×10 → ten mismatched results,
  so build the mold, not the part (machine-shop analogy). Also **re-sequenced** the existing Git
  lesson `1-git-and-github-basics` → `2-git-and-github-basics` so the module reads in teaching
  order (thesis before tooling); updated the outline links. Self-contained.
- **Result:** Module 3 now has 2 lessons in order (thesis, then Git tooling). **Next:** commit, PR
  closing #19.

### 2026-06-02 — Step 20: Module 3 Lesson 2 — "Organize Your Work" (issue #21)

- **Prompt (summary):** "merge and go" — merged Module 3 thesis (PR #20) and continued with 3b.
- **Response/decision:** Built the organizing-the-work lesson (3b) on **issue #21 / branch
  `feature/21-organize-your-work`**: `module-3-build-systems/2-organize-your-work/` with
  `lesson.md` + parts + SCORM 1.2 interactive (5-question check with feedback). Concepts
  `…-044/045/042/048`. Narrative hook: the Downloads-folder graveyard — a habit problem, not a
  tools problem. Re-sequenced Git `2-` → `3-git-and-github-basics` so Module 3 reads
  3a→3b→3c (order now stable; pipeline 3d will be lesson 4). Self-contained; outline updated.
- **Result:** Module 3 has 3 lessons in teaching order (thesis, organize, git); only 3d (the
  production pipeline) remains. **Next:** commit, PR closing #21.

### 2026-06-03 — Step 21: Module 3 Lesson 4 — "The Production Pipeline" (issue #23)

- **Prompt (summary):** "merge and go" — merged the organize lesson (PR #22) and built the
  capstone 3d lesson.
- **Response/decision:** Built the production-pipeline lesson (3d) on **issue #23 / branch
  `feature/23-the-production-pipeline`**: `module-3-build-systems/4-the-production-pipeline/` with
  `lesson.md` + parts + SCORM 1.2 interactive (5-question check with feedback). Concepts
  `…-049/050/008/039`. Narrative hook: one page (a standard) becoming a whole course through a
  chain of AI stages, each human-reviewed and checked against the standard. Self-contained;
  outline updated (no re-sequence needed — pipeline is lesson 4).
- **Result:** **Module 3 complete** (4 lessons: thesis, organize, git, pipeline). Course now has
  Modules 0, 1, and 3 substantially built; Module 2 (design thinking) awaits the parked
  supplement; optional 1a remains. **Next:** commit, PR closing #23.

### 2026-06-03 — Step 22: Module 1 Lesson 1a — "How AI Works, Up Close" (issue #25)

- **Prompt (summary):** "go" — built the optional 1a deeper-dive to fully close Module 1.
- **Response/decision:** Built on **issue #25 / branch `feature/25-how-ai-works-up-close`** the
  1a lesson: `module-1-foundational-ai/1-how-ai-works-up-close/` with `lesson.md` + parts + SCORM
  1.2 interactive (5-question check with feedback). Concepts `…-024/025/019/027`. Narrative hook:
  the long chat where the AI "forgets" the opening instruction (the context window overflowing).
  **Re-sequenced** the existing four Module 1 lessons (1→2, 2→3, 3→4, 4→5) so 1a takes slot 1 and
  the module reads in teaching order 1a→1b→1c→1d. Self-contained; outline reordered.
- **Result:** **Module 1 now complete** (5 lessons, in order). Modules 0, 1, 3 fully built;
  Module 2 remains parked on the design-thinking supplement. **Next:** commit, PR closing #25.

### 2026-06-03 — Step 23: Surface the course in the README + repo description (issue #27)

- **Prompt (summary):** Noticed the repo landing page doesn't describe the course — the README
  was the original site readme and the course only showed as an unexplained folder. "go" to fix.
- **Response/decision:** On **issue #27 / branch `feature/27-surface-course-readme`**: added a
  **Course materials** section to root `README.md` (module/lesson list + pointers to the spec,
  outline, viewer, and log); created `AWID-Creative-Problem-Solving/README.md` so the folder
  explains itself on GitHub; updated the repo **About** description to mention the course.
- **Result:** The course is now discoverable from the repo landing page and the folder.
  **Next:** commit, PR closing #27.
