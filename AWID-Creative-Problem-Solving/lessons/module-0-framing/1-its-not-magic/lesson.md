---
module: "0"
title: "Module 0 — It's Not Magic: How AI Actually Works"
course: "Applied AI in Design Thinking (Creative Problem Solving)"
duration: "30–45 minutes"
audience: "Beginners — no math, coding, or data-science background needed"
prerequisites: "None. Curiosity helps."
created: "2026-06-01"
locked: true
changePolicy: "Once created, this lesson is locked. It may not be changed without an open, approved GitHub issue. Link the issue number in the commit that makes the change."
relatedConcepts:
  - "2026-05-29-003"  # Demystifying AI (this isn't a math class)
  - "2026-05-29-001"  # It's not magic, it's code
  - "2026-05-29-002"  # AI output is non-deterministic
  - "2026-05-29-019"  # How image generation works (feels magical)
  - "2026-05-29-027"  # AI is running out of training data
---

# Module 0 — It's Not Magic: How AI Actually Works

> **How to read this lesson:** Every time we introduce a piece of technology, we use the
> same three-part pattern — **What it is → What it does → How it fits into the ecosystem.**

---

## 1. Overview

Before we touch a single AI tool, we have to knock down one idea: that AI is **magic**. It
isn't. This module gives you a simple, honest picture of what's really happening — not the
deep math, just enough to use these tools wisely and to judge when to trust them.

This is **not** a math class, a computer science class, or a data science class. You will not
need any of that. The whole goal is a working mental model in plain English.

Here's the payoff: the moment you see that AI is *just code running on huge amounts of data,
very fast*, it stops being intimidating and starts being a **tool** — something you can pick
up, point at a problem, and judge honestly. That shift is the foundation for everything else
in this course: ethics, choosing tools, and the design-thinking process.

---

## 2. Learning objectives

By the end of this lesson you will be able to:

1. **Explain** why AI "isn't magic" — that its responses are code generated from large amounts
   of data and fast computation. *(Understand)*
2. **Distinguish** deterministic from non-deterministic output, and **classify** AI as
   non-deterministic. *(Understand → Analyze)*
3. **Demonstrate** non-determinism by sending the same prompt more than once and comparing the
   results. *(Apply)*
4. **Justify** why a simple mental model of AI is enough to start using it well, without
   knowing the underlying math. *(Evaluate)*

---

## 3. Key vocabulary

We use the **What → Does → Fits** pattern for the main ideas, then a quick table for the rest.

### Artificial Intelligence (AI)
- **What it is:** software that can produce human-like text, images, and answers.
- **What it does:** takes your input, finds likely patterns from the data it was trained on,
  and generates a response.
- **How it fits:** a general-purpose **tool** you bring into your work — not a mind, not magic.

### Large Language Model (LLM)
- **What it is:** the kind of AI behind chat tools like ChatGPT, Claude, and Gemini.
- **What it does:** predicts the next words, over and over, to build a coherent answer.
- **How it fits:** the "engine" inside most of the AI tools you'll use in this course.

### Code
- **What it is:** precise, step-by-step instructions a computer follows.
- **What it does:** tells the machine exactly what to do; everything you see on a screen is
  generated from it.
- **How it fits:** AI turns your words into code, and its output is code rendered to your
  screen. Code is the ordinary thing sitting under the "magic."

| Term | What it is | Where it fits |
|---|---|---|
| **Deterministic** | Same input → same output, every time | How old computers and math work (2 + 2 = 4) |
| **Non-deterministic** | Same input → possibly different output | How AI works — it predicts a *likely* answer |
| **Data** | Information the model learned from | The raw material AI patterns are built on |
| **Compute** | Processing power / speed | What lets AI crunch huge data fast enough to feel instant |
| **Training data** | The text/images used to teach the model | The (finite, human-made) source of what it "knows" |

---

## 4. The lesson

### The old way: computers were predictable
For most of computing history, a computer was a predictable box. You put in **instructions**
and **inputs**, the box did its work, and out came an **output** — and it was the *same*
output every time. Two plus two is always four. Arrange these letters this way, you always get
the same word. That sameness has a name: **deterministic.**

### What actually changed: scale, not sorcery
The basic idea didn't change. What exploded is the **scale**. We now have a nearly endless
amount of **data**, and enough **compute** (processing speed) to chew through it so fast that
what used to take a mainframe *days* now happens in the blink of an eye. That speed is the
real reason AI *feels* like magic.

### It's all code
Everything you see on a screen — your phone, your TV, a chatbot's reply — is generated from
**code**. AI isn't pulling answers out of thin air. It's writing code, fast, and showing you
the result. As we keep saying: *it's not magic, it's code.*

### Why it can still feel magical
Image generation is the best example. The AI doesn't draw line by line the way a person would.
It computes a whole field of "crazy colored pixels" into something you instantly recognize —
so fast it looks impossible. Impressive? Yes. Magic? No — just speed and computation.

### The twist: AI is non-deterministic
Here's the big difference from 2 + 2. Ask an AI the **same** question twice and you'll likely
get **different** answers. It doesn't look up one true result; it predicts a *likely* one — and
"likely" wiggles each time. This is **non-deterministic** output. (It's why, when you need
consistency, you build repeatable *systems* around AI — you can't just re-ask and expect the
same thing.)

### Why this isn't a math class
You don't need to know how a car engine is built to drive well — but knowing roughly how it
works makes you a better, safer driver. Same here. You don't need the internal math to use AI.
But a simple model — *code + data + speed, and it's non-deterministic* — is exactly what lets
you use it wisely and judge its limits and ethics.

### A grounding reminder
These systems are actually running **low on new text** to learn from, and have started
learning from video instead. That's a useful reality check: AI is built from a **finite,
human-made** pile of data — not infinite, all-knowing knowledge.

---

## 5. Worked example

Three quick demonstrations that make the ideas concrete:

- **The "same prompt twice" test.** Ask a chatbot the exact same question in two fresh chats.
  The answers won't be identical — you've just *seen* non-determinism.
- **The Mario video.** A machine-learning agent plays a Mario level, fails, plays, fails —
  over and over — until it figures the level out. Not magic: learning by trying, at high speed.
- **"Treat me like I'm five."** Ask the AI to explain, in the simplest possible terms, how it
  comes up with answers. Notice it can break the idea down — and that the explanation is about
  patterns and prediction, not magic.

---

## 6. Hands-on activity

> **Goal:** see non-determinism with your own eyes and demystify the "magic." (Process over
> product — we care that you *observe* how it behaves, not that you get a perfect answer.)

1. Open any chatbot. In **three separate fresh chats**, send the same prompt: *"In two
   sentences, explain why the sky is blue."* Read all three. What's the same? What's different?
2. Ask it: *"Explain like I'm five — how do you come up with your answers?"* Read its reply.
3. Ask the same factual question two different ways and compare the answers.

**Reflection (one sentence):** finish this — *"AI is like ____, not like ____."*
(For example: *"like a very fast pattern-matcher, not like a calculator that always gives the
same answer."*)

---

## 7. Common pitfalls (the "tells")

- **"Not magic" doesn't mean "always right."** Demystifying AI is step one; it can still be
  confidently wrong. (We tackle that head-on in the ethics module.)
- **Expecting identical answers every time.** It's non-deterministic by nature — surprise is
  built in.
- **Thinking it "knows" or "thinks."** It **predicts** likely patterns. That's a different
  thing from understanding.
- **Believing you must master the math first.** You don't. A plain mental model is enough to
  start using it well today.

---

## 8. Discussion questions

1. If AI is "just code + data + speed," how should that change how much you trust its answers?
2. The same prompt can give different answers. When is that unpredictability a **feature**, and
   when is it a **problem**?
3. AI is running low on human text to learn from. What does that tell you about where its
   "knowledge" actually comes from?
4. "This isn't a math class." Why might a simple mental model matter *more* than the technical
   details for most people who use AI?

---

## 9. Check for understanding

1. What's the difference between **deterministic** and **non-deterministic** output? Give one
   example of each.
2. Old computers and modern AI do a similar kind of work. What **two things** changed to make
   today's AI possible?
3. True or false: an AI's answer "magically appears" on your screen. Explain your answer.
4. Why don't you need to understand the internal math to use AI well — and what *should* you
   understand instead?

*(Answer key is in the instructor notes below.)*

---

## 10. Key takeaways

- **It's not magic — it's code**, generated from huge amounts of data and very fast compute.
- AI is **non-deterministic**: the same prompt can give different answers.
- The **speed** is what makes it feel magical; the substance is ordinary code.
- You don't need the math to use it — but a simple, honest model helps you use it wisely and
  judge its limits.

---

## Instructor notes

> **Framing:** This is the foundation module. Everything that follows — ethics, choosing tools,
> the design-thinking process — rests on first demystifying AI. Spend the time here; it pays off
> well beyond this lesson.

**Pacing:** Sections 1–4 ≈ 15–20 min; do the live "same prompt twice" demo (Section 5) for
instant impact; hands-on (Section 6) ≈ 10–15 min; close with discussion + check.

**Teaching tips**
- Run the **same-prompt-twice** demo live. Watching the answers differ teaches non-determinism
  faster than any explanation.
- Keep hammering the through-line out loud: *"It's not magic, it's code."*
- Plant two seeds for later: non-determinism points toward building repeatable systems, and
  "not always right" points toward verification and ethics.
- Resist going deep on the math even if asked. Redirect: "you don't need that to use it well."

**Check-for-understanding answer key**
1. Deterministic = same input always gives the same output (e.g., 2 + 2 = 4). Non-deterministic
   = the same input can give different outputs (e.g., asking a chatbot the same question twice).
   AI is non-deterministic.
2. The amount of **data** available and the **speed of compute** — both grew enormously. The
   basic input → process → output idea is old; the scale is new.
3. **False.** Every AI response is generated **code** rendered to the screen — fast computation,
   not magic.
4. You don't need the math because the tool is usable without it (like driving a car without
   knowing the engine). What you *should* understand: it's code + data + speed, it's
   non-deterministic, and it can be confidently wrong — enough to use it wisely and judge it.

**Common misconceptions to watch for**
- "Commit-to-memory facts": that AI "looks up" one true answer. (It predicts a likely one.)
- That a more powerful model would become "deterministic." (Non-determinism is by design.)
- That demystified = trustworthy. (Separate ideas — trust comes from verification.)
