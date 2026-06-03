---
part: "instructor-guide"
module: "1"
title: "How AI Works, Up Close — Instructor Guide"
derivedFrom: "./lesson.md"
audience: "Facilitator / instructor"
totalTime: "40–55 minutes"
---

# Instructor Guide — How AI Works, Up Close

## Why this lesson exists
This is the practical "under the hood" lesson — it turns AI's confusing moments (forgetting,
vague output) into predictable, workable ones. The forgetful-long-chat hook is instantly
relatable; lead with it. Goal: enough of a mental picture to drive the tool with confidence, no
math required.

## Learning objectives
1. **Explain** the context window and why long chats "forget." *(Understand)*
2. **Distinguish** a context-rich prompt from one that leaves AI guessing. *(Analyze)*
3. **Apply** memory-aware habits — restate context, start fresh. *(Apply)*
4. **Evaluate** whether a limit (memory, missing context, training data) caused a bad result.
   *(Evaluate)*

## Materials & setup
- A chatbot on the projector for the memory + context demos.
- The student **activity handout** printed or linked.

## Timing at a glance
| Segment | Time |
|---|---|
| Opening (the forgetful long chat) | 5 min |
| The lesson (memory → work with it → context → images → finite knowledge) | 18–22 min |
| Live demo: long chat forgets, then recovers | 4–6 min |
| Activity | 15 min |
| Discussion | 10 min |

## Facilitation walk-through
### 1. Open with the forgetful chat
Describe (or show) a long chat where the AI ignores an opening instruction. Name the cause: the
context window overflowed — not the AI getting dumber.

### 2. Teach the through-line
- **Context window** — limited working memory; earliest context drops out.
- **Work with it** — restate, start fresh, keep key instructions close.
- **Context** — AI can't read your mind; goal + audience + constraints.
- **Images** — fast pixel computation, not line-by-line drawing.
- **Finite/frozen knowledge** — big but bounded; may miss recent events.

### 3. Live demo
If you can, run a long chat that drops an early rule, then restate the rule and watch it recover.
Seeing it beats explaining it.

### 4. Activity
Hand out the worksheet. Part 1 (test the memory) is the keeper — it makes the window real.

### 5. Discussion
Draw out how this changes the way learners will run long conversations and write prompts.

### Closing thought
"You don't need the math. You need enough of a picture — memory, context, fast pixels, finite
knowledge — to drive the tool with confidence instead of guessing at its moods."

## Check-for-understanding — answer key
1. The context window is the limited text an AI holds in mind at once; long chats overflow it, so
   the earliest context drops out and it "forgets."
2. Any two: restate key context, start a fresh chat for new tasks, keep key instructions near
   where they're needed.
3. AI can't read your mind; goal/audience/constraints let it aim at what you want instead of
   guessing.
4. No — finite training data, frozen at training time (and models are running low on fresh text);
   knowledge is bounded and may miss recent events.
5. No — it computes a field of pixels into a recognizable image very fast; it doesn't draw
   line-by-line.

## Common misconceptions to watch for
- "The AI got dumber mid-conversation." (It ran out of context window.)
- "It knows everything, including current events." (Finite, frozen-at-training knowledge.)
- "Image AI draws like a person." (Fast pixel computation.)

## If you have less time
Keep the forgetful-chat opening, the memory demo, and Part 1 of the activity.
