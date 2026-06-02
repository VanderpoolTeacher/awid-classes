# Course Outline → Concept Map

Maps the **proposed outline** for *Applied AI in Design Thinking (Creative Problem Solving)*
against the 55 concepts distilled in [`concept-inventory.json`](./concept-inventory.json).

- **Outline source:** the design-thinking phases (empathize → define → ideate → prototype →
  test) as the spine, plus the 8 learning objectives on the `applied-ai-design-thinking`
  entry in `assets/data/classes.json`.
- **Concept source:** every entry is referenced by its immutable `key` (e.g. `…-007`) so the
  map stays traceable. A concept may appear under more than one outline slot.
- **⚠ GAP** marks places where the recordings gave us little or nothing — the targets for
  your supplemental design-thinking material.

> **This document is the approved, authoritative course structure.** Lessons live in module
> folders under `lessons/` (e.g., `lessons/module-0-framing/1-its-not-magic/`), and each
> module's lessons are linked below. When creating or updating content, reference this outline
> (see `lessons/LESSON-SPEC.md` §4.11). The navigation is **Course → Module → Lesson:** the
> course catalog entry (`assets/data/classes.json`) → this map → the module sections → the
> linked lesson folders.

---

## Module 0 — Framing: "It's not magic"

**Lessons:** [1 · It's Not Magic](lessons/module-0-framing/1-its-not-magic/lesson.md)

The opening move: set expectations and demystify before doing anything.

- `…-003` Demystifying AI (this isn't a math class)
- `…-001` It's not magic, it's code
- `…-002` AI output is non-deterministic

---

## Module 1 — Foundational AI understanding *(strand: foundational-ai)*

**Lessons:** [1 · Can You Trust It?](lessons/module-1-foundational-ai/1-can-you-trust-it/lesson.md) *(1b — trust & accuracy)* · [2 · Whose Work Is It?](lessons/module-1-foundational-ai/2-whose-work-is-it/lesson.md) *(1b — ethics & ownership)* · [3 · Your Data Isn't Private](lessons/module-1-foundational-ai/3-your-data-isnt-private/lesson.md) *(1c — data & privacy)* · [4 · Who Wins With AI?](lessons/module-1-foundational-ai/4-who-wins-with-ai/lesson.md) *(1d — AI as a tool)* · _planned: 1a_

### 1a. How it actually works
- `…-001` It's not magic, it's code
- `…-002` AI output is non-deterministic
- `…-019` How image generation works (and why it feels magical)
- `…-024` The context window
- `…-025` Context of use — tell it what you're trying to do
- `…-027` AI is running out of training data

### 1b. Ethics & responsible use
- `…-004` The plagiarism & theft objection
- `…-005` Ideas vs. expression (what copyright protects)
- `…-006` Attribution & documenting your AI use
- `…-007` Hallucination — "it will lie to you"
- `…-022` Fair use is a gray area
- `…-023` Guardrails and bypassing them
- `…-020` Bias in image generation
- `…-021` The "tells" of AI & forensic detection
- `…-014` AI is a tool — intent and dual use

### 1c. Data, privacy & governance
- `…-009` Nothing online is private (and it never disappears)
- `…-010` Don't feed personal information to LLMs
- `…-011` Domain regulations — HIPAA, FERPA & industry concerns
- `…-012` Data governance (GRC) for business
- `…-013` Free vs. paid licensing & data rights

### 1d. AI as a tool & who wins with it
- `…-014` AI is a tool — intent and dual use
- `…-015` Domain expertise matters most
- `…-016` Abstraction & getting "closer to the metal"
- `…-017` The terminal — maximum visibility
- `…-018` JSON / code prompts for consistent output
- `…-026` Winning tech speeds up transactions
- `…-028` Agents & computer use
- `…-029` Reading level & audience adaptation

---

## Module 2 — The design thinking process *(strand: design-thinking — the spine)*

This is the through-line of the workshop. Learning objectives (LO) from `classes.json` are
mapped to the concepts that support them. **This module is the thinnest in the recordings —
most phases rest on a single concept. These are the supplement targets.**

### Overview
- `…-030` Design thinking overview *(LO1: understand each phase)*

### Phase: Empathize *(LO2: conduct simple user research & synthesize with AI)*
- `…-031` Empathize — seek first to understand
- `…-033` Research & building a finite knowledge base (NotebookLM)
- ⚠ **GAP:** user research *technique* (interviews, observation, empathy maps, personas).
  The recordings cover research-as-knowledge-base, not research-as-understanding-people.

### Phase: Define *(LO3: frame a clear, actionable problem statement)*
- `…-032` Define — framing a problem statement
- ⚠ **GAP:** how to actually *write* a problem statement (POV statements, "How Might We",
  synthesizing insights into a frame). Only the purpose is in the recordings, not the method.

### Phase: Ideate *(LO4: run an ideation session that uses AI to expand the option space)*
- `…-034` Ideate — expand the option space
- ⚠ **GAP:** ideation *methods* (divergent vs. convergent, brainstorm rules, "yes-and",
  selecting/clustering ideas). Recordings show voice-brainstorming as the only technique.

### Phase: Prototype *(LO5: build a quick prototype using AI-assisted tools)*
- `…-035` Prototype — make something to put in front of an audience
- `…-037` Mobile-first, additive design
- `…-052` Markdown — semantic meaning via symbols
- `…-053` HTML as a shareable artifact + GitHub Pages hosting
- *(Strong coverage — this is where the workshop spent its energy.)*

### Phase: Test *(LO6: run a small test and incorporate feedback)*
- `…-036` Test — iterate on feedback
- `…-008` Verify everything (do the work on the back end)
- `…-050` Human-in-the-loop review (AI as an entry-level employee)
- ⚠ **GAP:** structured *user testing* (recruiting testers, what to observe, capturing
  feedback). Recordings cover iterating on AI output, not testing with real users.

### Cross-phase
- `…-038` Process over product *(LO: the whole reason the method matters)*
- `…-029` Reading level & audience adaptation

---

## Module 3 — Build systems, not outputs *(strand: cross-cutting — the "applied" engine)*

**Lessons:** [1 · Git & GitHub Basics](lessons/module-3-build-systems/1-git-and-github-basics/lesson.md) *(tooling — 3c)*

The distinctive thesis of this instructor: don't use AI to make one-off deliverables — build
the repeatable system that makes them. This is where the workshop went deepest.

### 3a. The core thesis
- `…-039` Build repeatable systems, not one-off outputs
- `…-040` Build your own tools
- `…-051` AI works best from organized information

### 3b. Organizing the work
- `…-044` Work in folders and projects
- `…-045` Information architecture — organize your digital life
- `…-043` CLAUDE.md & project instructions
- `…-041` Templates as the source of truth
- `…-042` Prompt log & change log
- `…-048` The sandbox folder — learn by breaking things

### 3c. Tooling & craft
- `…-046` Right tool for the right job (don't tool-hop)
- `…-047` Find 2-3 tools and stick with them
- `…-054` Being specific & precise (use the words it knows)
- `…-052` Markdown
- `…-053` HTML + GitHub Pages
- `…-055` Connectors & APIs (the storage-unit analogy)

### 3d. The flagship pipeline *(LO7 + LO8: where AI helps vs. misleads; end-to-end)*
- `…-049` The curriculum production pipeline
- `…-050` Human-in-the-loop review
- `…-008` Verify everything
- `…-007` Hallucination — where AI misleads *(LO7)*

---

## Coverage summary

| Outline area | Concepts | Depth |
|---|---|---|
| Module 0 — Framing | 3 | adequate |
| Module 1 — Foundational AI | 29 (across 1a–1d) | **deep** |
| Module 2 — Design thinking process | 9 | **thin — supplement here** |
| Module 3 — Build systems | 17 | **deep** |

**Design-thinking phase depth (the gap, at a glance):**

| Phase | Dedicated concepts | Status |
|---|---|---|
| Empathize | 2 | needs research-technique material |
| Define | 1 | needs problem-framing method |
| Ideate | 1 | needs ideation methods |
| Prototype | 4 | well covered |
| Test | 3 | needs real-user testing material |

**Takeaway:** the recordings are exceptionally strong on *foundational AI* and on the
*build-systems* philosophy, but treat the design-thinking method itself fairly lightly —
empathize, define, and ideate each rest on a single concept. Your supplemental design-thinking
material should target those three phases (plus real-user testing) to balance the course.
