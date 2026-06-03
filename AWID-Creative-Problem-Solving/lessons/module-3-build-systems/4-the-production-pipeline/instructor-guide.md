---
part: "instructor-guide"
module: "3"
title: "The Production Pipeline — Instructor Guide"
derivedFrom: "./lesson.md"
audience: "Facilitator / instructor"
totalTime: "45–55 minutes"
---

# Instructor Guide — The Production Pipeline

## Why this lesson exists
This is the **capstone** of Module 3 — it ties systems, organization, and tooling into one
assembly line. The "one page → whole course" image makes the payoff vivid. Land the discipline:
speed *plus* checkpoints, never speed alone.

## Learning objectives
1. **Explain** what a pipeline is and why chained stages beat one giant prompt. *(Understand)*
2. **Distinguish** automated stages from required human review points. *(Analyze)*
3. **Apply** the pattern — break a deliverable into stages checked against a source of truth.
   *(Apply)*
4. **Evaluate** a pipeline for drift and add the right checkpoint. *(Evaluate)*

## Materials & setup
- A whiteboard (or shared screen) to draw the pipeline as boxes + arrows.
- A chatbot for running one stage live.
- The student **activity handout** printed or linked.

## Timing at a glance
| Segment | Time |
|---|---|
| Opening (one page → whole course) | 5 min |
| The lesson (chain steps → human-in-loop → source of truth → capstone → caution) | 22–25 min |
| Live: draw a pipeline; run one stage | 5–7 min |
| Activity | 15 min |
| Discussion | 10 min |

## Facilitation walk-through
### 1. Open with the image
A one-page standard becoming a whole course — AI-generated, human-reviewed, checked against the
page at every step. That's a pipeline.

### 2. Teach the through-line
- **Chain small steps** — not one giant prompt; each stage focused and checkable.
- **Human-in-the-loop** — AI as a fast entry-level employee; human reviews and signs off.
- **Source of truth** — check each stage against the standard; errors compound, catch drift early.
- **Capstone** — repeatable system + organized inputs + human review = leverage.
- **Caution** — no checkpoints = a confident error machine.

### 3. Live demo
Draw the pipeline as boxes and arrows; mark human checkpoints with a ✔. Optionally run one stage
with AI and check it against a standard on screen.

### 4. Activity
Hand out the worksheet. The key insight is Part 3 — deciding where a human *must* review.

### 5. Discussion
Surface learners' own repeated deliverables and where early drift would be most dangerous.

### Closing thought
"Building with AI at a professional level isn't a magic prompt — it's a well-built assembly line
where the machine does the volume and you do the judgment."

## Check-for-understanding — answer key
1. Small stages are each a focused, checkable task; one giant prompt is too much at once —
   uncheckable and unfixable.
2. A person reviews and approves AI's work at key stages; the human's job is judgment and
   sign-off, not doing every step.
3. The authoritative reference the work must match; checking each stage against it catches drift
   before it compounds down the chain.
4. Errors compound — a wrong early stage poisons everything built from it — so early drift is the
   most damaging and cheapest to fix.
5. It produces mistakes as fast as good work (a "confident error machine"); checkpoints are what
   make the speed safe.

## Common misconceptions to watch for
- "A pipeline means AI runs unsupervised." (Human checkpoints are the point.)
- "Bigger prompts are more efficient." (Small, checkable stages win.)
- "If it's fast, it's good." (Fast without checkpoints just makes mistakes faster.)

## If you have less time
Keep the one-page-to-course opening, the board sketch with checkpoints, and Parts 2–3 of the
activity (stages + where humans must review).
