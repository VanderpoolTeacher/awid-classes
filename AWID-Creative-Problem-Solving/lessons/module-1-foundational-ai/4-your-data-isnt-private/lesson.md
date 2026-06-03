---
module: "1"
title: "Module 1 — Your Data Isn't Private: Privacy, Permissions, and What Not to Feed AI"
course: "Applied AI in Design Thinking (Creative Problem Solving)"
duration: "40–55 minutes"
audience: "Beginners — no prior experience needed"
prerequisites: "None — a chatbot to experiment with helps."
created: "2026-06-02"
locked: true
changePolicy: "Once created, this lesson is locked. It may not be changed without an open, approved GitHub issue. Link the issue number in the commit that makes the change."
relatedConcepts:
  - "2026-05-29-009"  # Nothing online is private (and it never disappears)
  - "2026-05-29-010"  # Don't feed personal information to LLMs
  - "2026-05-29-011"  # Domain regulations — HIPAA, FERPA & industry concerns
  - "2026-05-29-012"  # Data governance (GRC) for business
  - "2026-05-29-013"  # Free vs. paid licensing & data rights
---

# Module 1 — Your Data Isn't Private

> **How to read this lesson:** Every time we introduce a piece of technology, we use the
> same three-part pattern — **What it is → What it does → How it fits into the ecosystem.**

---

## 1. Overview

It's late, the report is due, and you've got a messy spreadsheet of customer names, emails, and
notes. So you copy the whole thing, paste it into a free chatbot, and type: *"clean this up and
summarize it."* Ten seconds later — beautiful. Done.

And in those ten seconds, you may have handed a few hundred people's private information to a
company you don't control, to be stored, maybe used to train future models, and possibly kept
**forever.** You can't pull it back. The most dangerous click in AI isn't a download — it's
**paste.**

This lesson is about a simple, unglamorous skill that protects you, your customers, and your
organization: **knowing what you can safely put into AI, and what you can't.** Anything you type
into a public tool may not stay private. So the habit we build here is deciding — *before* you
paste — whether this data is yours to share.

---

## 2. Learning objectives

By the end of this lesson you will be able to:

1. **Explain** why anything you put into a public AI tool may not stay private. *(Understand)*
2. **Distinguish** data that's safe to share with AI from data you must withhold (personal,
   regulated, or confidential). *(Analyze)*
3. **Apply** safe-data habits: remove or avoid personal info, prefer scoped tools, and check the
   terms. *(Apply)*
4. **Evaluate** whether a given AI use meets your privacy and regulatory obligations. *(Evaluate)*

---

## 3. Key vocabulary

We use the **What → Does → Fits** pattern for the main ideas, then a quick table for the rest.

### Personal information (PII)
- **What it is:** data that identifies a specific person — names, emails, phone numbers,
  addresses, IDs, health or financial details.
- **What it does:** ties information back to a real human, which is exactly what privacy law
  protects.
- **How it fits:** it's the category you most need to keep *out* of public AI tools.

### The terms of service (EULA)
- **What it is:** the agreement you accept when you use a tool ("I agree").
- **What it does:** spells out what the company may do with what you upload — including, often,
  using it to improve their models.
- **How it fits:** it's the fine print that decides whether your data is really "yours" once you
  paste it. Free tiers usually claim the most rights.

### Data governance (GRC)
- **What it is:** an organization's rules for governing, regulating, and controlling its data
  (governance, regulation, compliance).
- **What it does:** defines who may see and use which data — down to the document level.
- **How it fits:** in a business, your data is the *company's* asset; governance decides what an
  AI tool is even allowed to touch.

| Term | What it is | Where it fits |
|---|---|---|
| **Regulated data** | Data governed by law (health = HIPAA, student = FERPA) | Extra rules; mistakes carry legal penalties |
| **Public vs. business account** | Personal free tier vs. licensed org account | Business licensing can keep data in-bounds; personal usually can't |
| **"It never disappears"** | Data online tends to persist and spread | Why "I'll delete it later" doesn't undo a paste |

---

## 4. The lesson

### Nothing you put online is truly private
Start from the hard truth: **anything you put on the internet may not be private, and it tends
not to disappear.** Systems copy, cache, log, and back up data by design. A good way to explain
it to a kid (or yourself): *everything you do on a computer can be tracked, and once it's out
there, you can't fully pull it back.* That's not paranoia — it's how these systems work.

### So be deliberate about what you feed AI
Public AI tools are part of that same internet. The less personal information you give them, the
safer you are. Before you paste, ask: **is this mine to share?** If it contains other people's
names, contact info, health or financial details — strip it out, anonymize it, or don't paste
it at all. A handy move: replace real names and numbers with placeholders ("Customer A,"
"$X"), get your summary, then put the real details back yourself.

### Some data is governed by law
In many fields, this isn't just good manners — it's the law. Health information is protected by
**HIPAA**; student records by **FERPA**; other industries have their own rules. If you work in a
regulated space, you need real knowledge of those rules *before* you point AI at the data.
"I didn't know" is not a defense.

### Free vs. paid — read the terms
Here's the part people skip: **free tools usually reserve the right to use your data**, often to
train future models. Paid and business tiers may offer settings to limit that — but you only
know by reading the terms. The rule of thumb: on a free personal account, assume anything you
type could be used and kept. If that's not acceptable for the data, use a properly licensed tool
or don't use AI for it.

### In a business, governance comes first
For an organization, the data isn't yours — it's the company's, and competitors must not get it.
That's why businesses set up **governance** (GRC): rules for what data exists, who can access it,
and what tools are allowed to touch it — sometimes down to individual documents. If you're using
AI at work, the question isn't just "can AI do this?" but "is this data *cleared* for this tool?"

---

## 5. Worked example

- **The paste that can't be undone.** Dropping a customer list into a free chatbot to "clean it
  up" — fast, and irreversible. Anonymize first, or don't paste.
- **The placeholder trick.** Swap real names/numbers for "Customer A / $X," get the summary, then
  restore the real details locally. The AI never sees the private parts.
- **The regulated case.** A teacher wanting AI help with student records has to honor FERPA — use
  a cleared tool and strip identifiers, not a personal free account.

---

## 6. Hands-on activity

> **Goal:** build the "before you paste" reflex. (Process over product — the win is the *check*,
> not a polished output.)

1. Find (or invent) a short piece of text with personal info — names, an email, a phone number.
   **Rewrite it** replacing every personal detail with a placeholder ("Person A," "email@—").
   That anonymized version is what's safe to paste.
2. Open the terms/privacy page of an AI tool you use. **Find one line** about what they do with
   your data. **Write it down.** Were you surprised?
3. Make a quick **two-column list:** "Safe to paste" vs. "Never paste." Put 3 things in each.

**Reflection (one sentence):** *"Before I paste anything into AI, I'll ask myself: ____."*

---

## 7. Common pitfalls (the "tells")

- **"I'll delete it later."** A paste can't be reliably undone — it may already be copied/stored.
- **Trusting the free tier with sensitive data.** Free usually means your data is fair game.
- **Forgetting it's *other people's* data.** Your convenience isn't their consent.
- **Ignoring industry rules.** HIPAA/FERPA and the like apply whether or not you knew about them.

---

## 8. Discussion questions

1. Where's the line for you between "convenient" and "I shouldn't paste that"? How do you decide?
2. Whose responsibility is it when someone's private data leaks into an AI tool — the user, the
   company, or both?
3. Free tools are free because *something* pays for them. What are you trading, and is it worth
   it?
4. If you worked somewhere with strict data rules, how would you still get AI's benefits safely?

---

## 9. Check for understanding

1. In one sentence, why isn't data you put into a public AI tool guaranteed to stay private?
2. Name two kinds of information you should keep *out* of a public AI tool.
3. What's the placeholder trick, and why does it work?
4. Why does a *free* AI tool warrant extra caution with sensitive data?
5. Give one example of legally **regulated** data and the rule that protects it.

*(Answer key is in the instructor notes below.)*

---

## 10. Key takeaways

- Recall the customer-list paste: ten convenient seconds, possibly permanent exposure. **The
  riskiest move is paste.**
- **Anything online may not be private — and it doesn't disappear.**
- Keep **personal/regulated/confidential** data out of public tools; **anonymize** when you can.
- **Free usually means your data is fair game** — read the terms; in a business, governance
  decides what's allowed.

---

## Instructor notes

> **Framing:** This is the protect-yourself-and-others lesson. The emotional hook is how *easy*
> and *irreversible* a bad paste is. Open with the customer-list scenario and let the
> "you can't take it back" land before teaching the habits.

**Pacing:** Sections 1–4 ≈ 20–25 min; activity ≈ 15 min; discussion ≈ 10 min.

**Teaching tips**
- Demo the **placeholder trick** live — paste an anonymized snippet and show the summary is just
  as useful without the real names.
- Have learners actually open a tool's **terms page**; seeing the real language is the lesson.
- Keep it practical, not scary: the goal is confident, safe use — not "never use AI."
- For regulated-field learners (health, education), name **HIPAA/FERPA** explicitly and tell them
  to check with their org before using AI on protected data.

**Check-for-understanding answer key**
1. Because public tools store/log/back up what you submit and may use it (e.g., to train models),
   and online data tends to persist — you can't reliably take a paste back.
2. Any two: names/contact info, health or financial details, IDs, or other people's confidential
   data.
3. Replace real names/numbers with placeholders before pasting, get your result, then restore the
   real details locally — the AI never sees the private parts.
4. Free tiers usually reserve the right to use/keep your data (often to train models), so
   sensitive data is exposed.
5. Health data — HIPAA; student records — FERPA (either is acceptable).

**Common misconceptions to watch for**
- "I can delete it, so it's fine." (Deletion doesn't undo exposure.)
- "It's just a summary, the data doesn't matter." (The input is the exposure, not the output.)
- "Privacy rules don't apply to little me." (HIPAA/FERPA/company policy apply regardless.)
