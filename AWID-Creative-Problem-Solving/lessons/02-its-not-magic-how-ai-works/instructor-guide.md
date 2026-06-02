---
part: "instructor-guide"
lesson: "02"
module: "0"
title: "It's Not Magic — Instructor Guide"
derivedFrom: "../02-its-not-magic-how-ai-works.md"
audience: "Facilitator / instructor"
totalTime: "30–45 minutes"
---

# Instructor Guide — Module 0: It's Not Magic

## Why this lesson exists
This is the **foundation module.** Everything that follows — ethics, choosing tools, the
design-thinking process — rests on first knocking down the idea that AI is magic. If learners
leave with one durable sentence, it's: *it's not magic, it's code.* Don't rush it.

## Learning objectives (what they should be able to do)
1. **Explain** why AI isn't magic — code generated from large data + fast compute. *(Understand)*
2. **Distinguish** deterministic from non-deterministic output; **classify** AI as
   non-deterministic. *(Understand → Analyze)*
3. **Demonstrate** non-determinism by sending the same prompt repeatedly and comparing. *(Apply)*
4. **Justify** why a simple mental model is enough to use AI well, without the math. *(Evaluate)*

## Materials & setup
- A device that can play audio (for the opening demo).
- A chatbot open and ready (ChatGPT/Claude/Gemini) for the live "same prompt twice" demo.
- The student **activity handout** printed or linked.
- *Optional:* a pre-made AI "podcast" audio clip (e.g., a NotebookLM audio overview) for the
  opening narrative. If you don't have one, you can describe it instead.

## Timing at a glance
| Segment | Time |
|---|---|
| Opening narrative + hook | 5 min |
| The lesson (deterministic → scale → code → prediction → non-determinism) | 12–15 min |
| Live demo: same prompt twice | 3–5 min |
| Activity (handout) | 10–15 min |
| Discussion + wrap-up callback | 5–8 min |

---

## Facilitation walk-through

### 1. Open with the narrative (don't explain yet)
Play (or describe) the AI "podcast" clip — two AI voices chatting like real hosts. Let the room
react. Then say: *"That feels like magic. By the end of today, you'll know exactly why it
isn't."* **Resist explaining now** — the payoff lands in the wrap-up.

### 2. Teach the through-line
Walk the lesson in this order; each beat has a talking point:
- **Deterministic box** — "2 + 2 is always 4. That's the computing we grew up with. Reliable,
  repeatable, clearly not alive."
- **Scale, not sorcery** — "Same basic idea. What changed is how much *data* and how fast the
  *compute*. Days on a mainframe → instant."
- **It's all code** — "Everything on a screen is code. AI writes code fast and shows you the
  result." Use the image-generation point: it doesn't draw line-by-line; it computes pixels.
- **Prediction isn't magic** — the "load of bull——" line; only so many ways to arrange words;
  the music comparison. This is the *aha* that demystifies the podcast voices.
- **Non-determinism** — "Same question twice, different answers. It predicts a *likely* one."
- **You don't need the engine** — the car metaphor. Land the mental model: *code + data +
  speed, and non-deterministic.*

### 3. Live demo (highest-impact 3 minutes)
Send the **same prompt twice** in two fresh chats on the projector. Read both aloud. "Same
question. Different answer. That's non-determinism — you just watched it." This teaches
objective 3 faster than any slide.

### 4. Activity
Hand out the worksheet. Circulate. The "predict the next word" part (Part 3) is the one that
makes prediction click — make sure groups actually do it out loud.

### 5. Wrap up with the callback
Return to the opening: *"Those two podcast voices? No people, no mics. A tool read documents
(data), used huge compute to predict natural sentences, and turned it into code that played as
voices. Run it again, you'd get a different chat — non-deterministic. Magic? No."* Close on the
four takeaways.

---

## Check-for-understanding — answer key
1. **Deterministic** = same input → same output (2 + 2 = 4). **Non-deterministic** = same input
   can give different output (asking a chatbot the same thing twice). AI is non-deterministic.
2. The amount of **data** and the **speed of compute** both grew enormously. The basic input →
   process → output idea is old; the scale is new.
3. **False.** Every AI response is generated **code** rendered to the screen — fast computation,
   not magic.
4. You don't need the math because the tool is usable without it (like driving without knowing
   the engine). You *should* understand: it's code + data + speed, it's non-deterministic, and
   it can be confidently wrong — enough to use it wisely and judge it.

## Common misconceptions to watch for
- "AI looks up the one true answer." → It **predicts** a likely one.
- "A more powerful model would be deterministic." → Non-determinism is **by design.**
- "Demystified means trustworthy." → Separate ideas. Trust comes from **verification** (next
  module). Flag this explicitly so learners don't over-trust.

## Transition to the next module
"Now that AI isn't magic — it's a fast pattern-machine that can be confidently wrong — the next
question is the important one: **when can you trust it, and when can't you?** That's ethics and
verification, Module 1."

## If you have less time
Cut the activity to just Part 1 (same-prompt test) and keep the opening narrative + live demo +
wrap-up callback. Those three carry the lesson.
