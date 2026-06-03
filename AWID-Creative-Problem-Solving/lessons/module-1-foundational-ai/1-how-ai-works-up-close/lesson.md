---
module: "1"
title: "Module 1 — How AI Works, Up Close: Memory, Context, and Images"
course: "Applied AI in Design Thinking (Creative Problem Solving)"
duration: "40–55 minutes"
audience: "Beginners — curious about what's happening under the hood"
prerequisites: "None — a chatbot to experiment with helps."
created: "2026-06-03"
locked: true
changePolicy: "Once created, this lesson is locked. It may not be changed without an open, approved GitHub issue. Link the issue number in the commit that makes the change."
relatedConcepts:
  - "2026-05-29-024"  # The context window (AI's working memory)
  - "2026-05-29-025"  # Context of use (tell it what you're trying to do)
  - "2026-05-29-019"  # How image generation works
  - "2026-05-29-027"  # AI is running out of training data
---

# Module 1 — How AI Works, Up Close

> **How to read this lesson:** Every time we introduce a piece of technology, we use the
> same three-part pattern — **What it is → What it does → How it fits into the ecosystem.**

---

## 1. Overview

You're deep in a long chat with an AI. Early on you told it, "I'm writing for sixth-graders, keep
it simple." Forty messages later, it's handing you dense, jargon-filled paragraphs — like it
completely forgot. It didn't get dumber. It ran out of **memory.**

A little understanding of what's happening under the hood — how AI's memory works, how it uses
the context you give it, how it makes images, and where its knowledge runs out — turns those
confusing moments into predictable ones you can work around. You don't need the math. You need a
practical picture of the machine so you can drive it well. That's this lesson: a closer look that
makes AI feel less like a moody genius and more like a tool with knowable limits.

---

## 2. Learning objectives

By the end of this lesson you will be able to:

1. **Explain** what the context window is and why long conversations "forget." *(Understand)*
2. **Distinguish** a prompt that gives the AI useful context from one that leaves it guessing.
   *(Analyze)*
3. **Apply** memory-aware habits: restate key context and start fresh when a chat gets bloated.
   *(Apply)*
4. **Evaluate** an AI result for whether a limit (memory, missing context, or training data) is
   what tripped it up. *(Evaluate)*

---

## 3. Key vocabulary

We use the **What → Does → Fits** pattern for the main ideas, then a quick table for the rest.

### The context window
- **What it is:** the amount of text an AI can "hold in mind" at once — its working memory.
- **What it does:** everything in the current conversation competes for that limited space; when
  it fills up, the earliest things fall out.
- **How it fits:** it's why a long chat "forgets" what you said at the start — not a malfunction,
  a memory limit. Like cramming so much into your head that early details slip away.

### Context (the information you give it)
- **What it is:** the goal, audience, and background you include in your request.
- **What it does:** the more the AI knows about what you're trying to do, the better it can help.
- **How it fits:** AI can't read your mind; context is how you aim it. Vague request → it guesses;
  clear context → it delivers.

### Training data
- **What it is:** the giant pile of human-made text and images the model learned from.
- **What it does:** it's the source of everything the AI "knows" — and it's **finite.**
- **How it fits:** models are actually running low on fresh human text and turning to video. A
  reminder that AI's knowledge is big but bounded, and frozen at what it was trained on.

| Term | What it is | Where it fits |
|---|---|---|
| **"Forgetting"** | Early context falling out of the window | What to expect in long chats; restate or restart |
| **Image generation** | Computing pixels into a recognized whole | Not drawing line-by-line; fast computation |
| **Knowledge cutoff** | The model's info is frozen at training time | Why it may not know recent things |

---

## 4. The lesson

### AI has a limited working memory
The single most useful thing to understand: an AI has a **context window** — a limited amount of
text it can pay attention to at once. Your whole current conversation lives in that window. When
the conversation gets long enough to overflow it, the **earliest** things — like that instruction
you gave at the very start — quietly drop out. The AI isn't being careless; it literally can't
"see" them anymore. Think of cramming so much into your head that the first details slip away.

### So work *with* the memory
Once you know that, the fixes are obvious:
- **Restate key context** when it matters ("remember, sixth-grade reading level").
- **Start a fresh chat** for a new task instead of piling onto a bloated one.
- Put the **most important instructions near where you need them**, not buried 50 messages back.

You're not fighting the tool — you're feeding its memory on purpose.

### Context is how you aim it
The flip side of memory is **context** — what you choose to tell it. AI can't read your mind. The
more it knows about your goal, audience, and situation, the better it helps. "Write something
about dogs" leaves it guessing; "write a friendly 100-word intro about dog adoption for a shelter
newsletter" gives it everything it needs to hit the mark. Newer tools even ask what you're trying
to do — because context is that important.

### How it makes images (still not magic)
Image generation feels the most magical, so it's worth demystifying. The AI isn't drawing line by
line like a person. It computes a whole field of pixels and snaps them into something you
recognize — a face, a city — astonishingly fast. Impressive, yes. Magic, no. Just a lot of fast
computation turning patterns into a picture.

### Its knowledge is big but bounded
Finally, a reality check on what AI "knows." It learned from a huge but **finite** pile of
human-made data — and the models are actually starting to run *low* on fresh text, turning to
video to keep learning. Two practical consequences: its knowledge is frozen at training time (it
may not know recent events), and it's not a bottomless well of truth — it's a big, limited,
human-made pile. Useful to remember when it sounds sure about something current.

---

## 5. Worked example

- **The forgetful long chat.** Forty messages in, the AI ignores your opening instruction — the
  window overflowed and the earliest context dropped out. Restate it and it snaps back.
- **Vague vs. context-rich.** "Write about dogs" vs. "100-word friendly intro for a shelter
  newsletter on dog adoption" — context is what makes the result usable.
- **The instant image.** A detailed picture appears in seconds — fast pixel computation, not
  hand-drawing.

---

## 6. Hands-on activity

> **Goal:** see AI's memory and context limits firsthand. (Process over product — notice the
> behavior.)

1. **Test the memory.** Start a chat, tell the AI a specific rule ("answer everything in exactly
   one sentence"). Then chat about something else for many messages. Does it eventually break the
   rule? **Write down** what happened.
2. **Feed it context.** Ask for something vague, then ask again with goal + audience + length
   added. **Write down** which result you'd actually use.
3. **Restate and recover.** When (if) it "forgot" your rule in step 1, restate the rule. Did it
   recover?

**Reflection (one sentence):** *"When an AI 'forgets,' the first thing I'll try is ____."*

---

## 7. Common pitfalls (the "tells")

- **Blaming the AI for "getting dumber."** It usually ran out of context window — restate or
  restart.
- **Under-specifying.** Vague requests make it guess; give it the goal, audience, and constraints.
- **Trusting it on recent events.** Its knowledge is frozen at training time and is finite.
- **One endless mega-chat.** Bloated conversations lose early context; start fresh for new tasks.

---

## 8. Discussion questions

1. How does knowing about the context window change the way you'd run a long AI conversation?
2. "AI can't read your mind." What context do *you* tend to leave out that would help it?
3. AI's knowledge is finite and frozen at training time. Where could that bite you?
4. Image generation feels magical. Does understanding it as "fast pixel computation" change how
   you trust it?

---

## 9. Check for understanding

1. In one sentence, what is the context window, and why do long chats "forget"?
2. Name two ways to work *with* AI's limited memory.
3. Why does giving more context produce better results?
4. Is an AI's knowledge unlimited? Explain.
5. Does image generation draw line-by-line? What actually happens?

*(Answer key is in the instructor notes below.)*

---

## 10. Key takeaways

- Recall the long chat that "forgot" your instruction: that's the **context window** filling up,
  not the AI getting dumber.
- **Work with the memory** — restate key context, start fresh for new tasks.
- **Context is how you aim it** — goal + audience + constraints beat a vague ask.
- AI's knowledge is **big but finite and frozen**; image generation is fast computation, not
  magic.

---

## Instructor notes

> **Framing:** This is the practical "under the hood" lesson — it turns AI's confusing moments
> (forgetting, vague output) into predictable, workable ones. The forgetful-long-chat hook is
> instantly relatable; lead with it.

**Pacing:** Sections 1–4 ≈ 20–25 min; activity ≈ 15 min; discussion ≈ 10 min.

**Teaching tips**
- Demo the **context window** live if you can: a long chat that drops an early instruction, then
  recovers when restated. Seeing it beats explaining it.
- Make the **context** point concrete with the vague-vs-rich prompt comparison.
- Keep image generation grounded ("fast pixel computation"), not hyped.
- Land the **finite/frozen knowledge** point — it sets up healthy skepticism about "current"
  claims.

**Check-for-understanding answer key**
1. The context window is the limited amount of text an AI can hold in mind at once; long chats
   overflow it, so the earliest context drops out — it "forgets."
2. Any two: restate key context, start a fresh chat for new tasks, keep key instructions near
   where they're needed.
3. AI can't read your mind; goal/audience/constraints let it aim at what you actually want
   instead of guessing.
4. No — it learned from a huge but finite pile of data, frozen at training time (and models are
   running low on fresh text), so its knowledge is bounded and may miss recent events.
5. No — it computes a whole field of pixels into a recognizable image very fast; it doesn't draw
   line-by-line.

**Common misconceptions to watch for**
- "The AI got dumber mid-conversation." (It ran out of context window.)
- "It knows everything / everything current." (Finite, frozen-at-training knowledge.)
- "Image AI draws like a person." (Fast pixel computation, not line-by-line drawing.)
