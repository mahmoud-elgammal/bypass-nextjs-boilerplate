---
name: visual
description: A decision-gate design skill that forces AI agents to justify every design choice through functional reasoning before visual execution — producing distinctive, purposeful interfaces instead of aesthetic theater.
license: MIT
---

## HOW THE AGENT USES THIS FILE

This is the single source of truth before any design output. Execution order is mandatory:

```
1. LAYER 0  →  Detect intent, ask smart questions (max 3), write session-intent.md
2. LAYER 1  →  Lock product strategy from session file
3. LAYER 2  →  Apply UX laws to every layout decision
4. LAYER 3  →  Ground visual direction in brand strategy
5. LAYER 4  →  Execute visuals with discipline
6. LAYER 5  →  Enforce design system tokens
7. LAYER 6  →  Self-audit before delivering anything
8. POST     →  Update CHANGELOG at bottom of this file
```

> ⛔ Never skip a layer. Never design before session-intent.md is written.

---

## LAYER 0 — INTENT DETECTION & SMART QUESTIONING

> Before asking anything, understand what you already know.  
> Never ask a question whose answer is already implicit in the request.

---

### 0.1 — Classify the Request Mode

Read the user's message and assign exactly one mode. The mode controls which questions matter.

| Mode | Trigger Words | What They Actually Need |
|---|---|---|
| **BUILD** | create, build, make, design, implement, generate | A deliverable. Output, not advice. |
| **FIX** | fix, improve, update, broken, bad, wrong, ugly, generic | Targeted correction. They have something existing. |
| **EXPLORE** | ideas, options, thinking about, what if, inspiration, direction | Paths, not execution. Show possibilities. |
| **REVIEW** | review, feedback, thoughts on, critique, rate, assess | Honest signal, not validation. |
| **SYSTEM** | design system, tokens, components, guidelines, library, primitives | Infrastructure, not a single screen. |

The mode is the first thing written into `session-intent.md`.

---

### 0.2 — Inventory What Is Already Known

Before forming questions, check what the request already resolves. Do not ask about things you can infer.

```
RESOLVED (do not ask — infer or decide autonomously):
[ ] Deliverable type    — if named ("a landing page", "a card component")
[ ] Stack               — if stated ("in React", "pure HTML/CSS")
[ ] Audience            — if described ("for developers", "B2B SaaS buyers")
[ ] Tone                — if implied ("luxury watch brand" → refined, "kids app" → playful)
[ ] Hard constraints    — if stated ("mobile only", "no JS", "dark mode required")

POTENTIALLY OPEN (ask only if blocking AND not inferable):
[ ] Primary user goal   — what action/decision the interface must drive
[ ] Success metric      — how we know the design worked
[ ] Existing brand      — do assets exist (logo, colors, fonts) or starting fresh?
[ ] Content             — do they have copy/imagery or is that also needed?
[ ] Scope               — quick prototype vs. production-ready?
[ ] What "done" looks like — especially critical for FIX and REVIEW modes
```

**Rule:** If you can make a reasonable default decision, make it and state it. Never ask permission for aesthetic choices. Ask only when the answer would materially change what you build.

---

### 0.3 — Select Questions (Maximum 3, All at Once)

From the open list, select only questions whose answers would change the output significantly. Ask all at once — never across multiple turns.

**Hard rules:**
- Max 3 questions per session
- Always ask if primary user goal is unclear (blocks everything downstream)
- Always ask if existing brand assets exist (changes the entire visual direction)
- Never ask about things that can be inferred
- Never ask permission for aesthetic choices — decide and state them
- Offer 2–4 concrete options per question — don't make the user think from scratch

**Mode-specific question banks:**

**BUILD — typical questions:**
```
Before I start, three quick things:

1. What's the primary action you want users to take?
   → Sign up / Book a call / Buy now / Explore content / Something else

2. Existing brand assets?
   → Have logo + colors already / Starting completely fresh / Rough direction only

3. Who is this for? (one sentence describing the target user)
```

**FIX — typical questions:**
```
To fix this effectively:

1. What specifically feels wrong?
   → Too generic / Poor hierarchy / Wrong tone / Too cluttered / Doesn't match brand

2. Can you share the current file or code?

3. What does "fixed" look like — what's the bar you're aiming for?
```

**EXPLORE — typical questions:**
```
To point you in the right direction:

1. What's the context? (product type, industry, rough audience)

2. Any hard constraints I should design around?
   → Budget / Tech stack / Timeline / Brand restrictions

3. What have you already ruled out? (saves showing ideas already rejected)
```

**REVIEW — typical questions:**
```
To give you useful signal rather than validation:

1. What are you most uncertain about in this design?

2. Who is the intended user and what should they do on arrival?

3. Is there a specific decision you're trying to make based on this review?
```

**SYSTEM — typical questions:**
```
To build the right infrastructure:

1. What product or products will this system serve?

2. What's the team size and tech stack consuming these tokens?

3. Does a partial system already exist, or starting from zero?
```

---

### 0.4 — Write `session-intent.md` Before Any Design Work

**Location:** `/home/claude/session-intent.md`  
**Timing:** Written immediately after classifying mode — before asking questions or doing any work.  
**Lifecycle:** Updated as user answers arrive. Overwritten at the start of each new session.

Template:

```markdown
# Session Intent
**Date:** YYYY-MM-DD
**Mode:** [BUILD | FIX | EXPLORE | REVIEW | SYSTEM]

---

## Raw Request
[Exact quote or close paraphrase of what the user said]

## Inferred Intent
[One sentence: what they actually need, not just what they said]

---

## What We Already Know
| Field | Value | Source |
|---|---|---|
| Deliverable | e.g. Landing page | Stated |
| Stack | e.g. React / HTML only | Stated / Inferred |
| Audience | e.g. First-time SaaS buyers | Inferred from product type |
| Tone | e.g. Professional but approachable | Inferred from brand |
| Constraints | e.g. Mobile-first, no animations | Stated |
| Brand Assets | e.g. Starting fresh / Has existing logo | TBD / Stated |

---

## Questions Asked → Answers Received
1. Q: [question text]
   A: [fill when received]

2. Q: [question text]
   A: [fill when received]

3. Q: [question text]
   A: [fill when received]

---

## Resolved Intent
*(Fill after all answers received — this is the contract for all subsequent layers)*

- **Primary goal:** [what the interface must achieve]
- **Success metric:** [how we know it worked]
- **User arrival state:** [emotional state + context on arrival]
- **First user win:** [what they feel in <10 seconds]
- **Most important element:** [the one thing with highest visual weight]
- **Aesthetic direction:** [one committed tone — not a list]
- **Unforgettable moment:** [the one thing they'll remember]

---

## Agent Decisions (stated, not asked)
*(Choices the agent made autonomously — user can override any of these)*
- [decision]: [rationale]

---

## Do Not Do
*(Explicit constraints or anti-patterns flagged by user)*
- [constraint]
```

> ⛔ STOP: Do not proceed to Layer 1 until "Resolved Intent" is fully filled in.

---

### 0.5 — State Assumptions Before Starting Work

After questions are answered, confirm the shared contract:

```
Here's what I'm working with:

→ Goal: [primary action/outcome]
→ User: [who they are and their arrival state]
→ Tone: [committed aesthetic direction — one specific thing]
→ Stack: [technology]
→ The one thing they'll remember: [peak moment]

Starting now — let me know if any of these should shift.
```

If the user corrects anything here, update `session-intent.md` before proceeding.

---

---

## LAYER 1 — PRODUCT STRATEGY & VISION

> *"Strategic design activities are what AI cannot replace. They require understanding business context, user psychology, and the gap between the two."*  
> — Nielsen Norman Group, 2025

### Core Principle
Design exists to serve a business outcome AND a user outcome simultaneously. The product vision is stated before any interface decision is made.

### Gate Questions (all must be answerable from session-intent.md)
1. What decision or action does this interface exist to support?
2. What is the single measurable success metric?
3. What is the user's emotional state on arrival?
4. What is the user's first win — achievable in under 10 seconds?
5. What is the one element with the highest visual weight? It must align with question 1.

### Failure Modes
- Designing visuals before answering these questions
- Treating "premium aesthetic" as a product goal
- Confusing stakeholder approval with user success

---

## LAYER 2 — UX PRINCIPLES

> *"If users ever have to stop and think, clarity is missing."*

### The 8 Laws — Every Layout Decision Must Pass at Least One

| Law | Principle | Applied Check |
|---|---|---|
| **Jakob's Law** | Match existing mental models. Deviate only for measurable delight. | Does this pattern feel familiar to the target user? |
| **Fitts's Law** | Size and proximity determine usability. Mobile: primary actions in thumb zone. | Is the primary CTA large enough and reachable one-handed? |
| **Hick's Law** | Every additional option increases decision time. Reduce to minimum at conversion points. | How many choices exist at the most important moment? |
| **Miller's Law** | Working memory holds 7±2 items. Chunk, group, cluster deliberately. | Are related elements grouped by logic, not decoration? |
| **Peak-End Rule** | Users judge by peak moment + final moment — not the average. | What is the peak? What is the end? Both intentionally designed? |
| **Progressive Disclosure** | Show only what's needed now. Reveal depth on demand. | Does anything appear before the user needs it? |
| **Tesler's Law** | Complexity cannot be destroyed — only moved. Move it to the system. | Who bears the irreducible complexity here? |
| **Postel's Law** | Accept imperfect input. Return results based on intent, not exact match. | Do forms forgive reasonable user errors gracefully? |

### Layout Gate Questions
- Is there an unambiguous visual hierarchy? (One dominant element per screen.)
- Can a user complete the primary task without reading instructions?
- Does the design genuinely pass on mobile — not just render on it?
- Does every group of elements exist because of proximity logic?

### Failure Modes
- Inconsistent button styles for similar actions
- Forms asking for unnecessary information upfront
- Animations delaying first meaningful interaction
- Navigation requiring more than 3 clicks to primary content
- Error states that blame users instead of guiding them

---

## LAYER 3 — BRAND STRATEGY & POSITIONING

> *"Great brands stand for something motivating and stand out in a way that makes them memorable."*  
> — Design Bridge & Partners, 2025

### Brand Foundation Stack (in priority order)
1. **Purpose** — Why does this exist beyond revenue?
2. **Values** — What principles guide hard decisions?
3. **Positioning** — What unique space does it hold in the user's mind?
4. **Voice** — How does it speak? (Confident / Empathetic / Rebellious / Precise)
5. **Visual Identity** — The expression of 1–4. Never designed before 1–4 are defined.

### Positioning Gate (answer all three in one sentence each)
- **Who** do we serve?
- **What** specific value do we provide?
- **Why** can no one else provide it the same way?

> If you cannot answer all three, positioning is unresolved. Do not design visual identity yet.

### Voice Rules
- Voice is constant. Tone shifts per context. (Urgent in errors. Warm in onboarding.)
- Authenticity > aspiration. Users detect performative values immediately.
- Every copy choice — button labels, error messages, empty states — is a brand touchpoint.
- "Premium," "innovative," "trusted" are outcomes, not values.

### Visual Identity Constraints
- Logo: recognizable at 16px favicon size
- Color: 1 dominant + 1 accent + 1 neutral. Each additional requires justification.
- Typography: display font carries emotion, body font disappears. Never reuse the same pairing across different brand contexts.
- Motion: signals modernity only when it serves the brand character.

### Failure Modes
- Designing a logo before defining brand purpose
- Applying the same visual system to brands with different audiences
- Following visual trends without asking if they fit the positioning

---

## LAYER 4 — VISUAL DESIGN EXECUTION

> *"Align typography to a grid, establish clear hierarchy, use color strategically, be consistent."*  
> — Nielsen Norman Group

### The 5 Visual Principles — Non-Negotiable

**Scale** — Size communicates importance. Primary action = largest. Tertiary = smallest. Enforced, not assumed.

**Hierarchy** — One dominant element per screen. If two compete, remove the weaker one or demote it.

**Balance** — Asymmetry is valid but intentional. Optical centering (visual weight) > mathematical centering.

**Contrast** — WCAG AA floor: 4.5:1 (normal text), 3:1 (large text). Design in grayscale first. If hierarchy is unclear without color, color will not fix it.

**Gestalt** — Use proximity, similarity, continuity, and closure deliberately. Don't let them work against you accidentally.

### Typography Rules
- **Never** use Inter, Roboto, Arial, Space Grotesk, or system fonts as a default
- Display font: carries emotional tone, specific to this context
- Body font: so readable it disappears
- Type scale: display → heading → subheading → body → caption → label
- Tokens: define size, weight, line-height, letter-spacing as a system — not per-element

### Color Rules
- Separate brand colors (identity) from functional colors (errors, success, data)
- Semantic token naming: `color-text-error` not `red-700`
- Never use color as the only accessibility signal
- Dark mode: semantic tokens only, so theme changes propagate from one source

### Motion Rules
- CSS-only first. Add JS libraries only when CSS cannot achieve the effect.
- One orchestrated entrance > ten scattered micro-interactions
- Animation serves comprehension OR delight — never fills time
- LCP < 2s. Jank is a brand liability.

### The Removal Test (apply to every element before shipping)
> "If I remove this, does the interface fail to solve its primary goal?"
- **Yes** → Essential. Keep it.
- **No** → Decoration. Remove it, or justify it in one sentence tied to user psychology.

---

## LAYER 5 — DESIGN SYSTEM & TOKENS

> *"Design tokens are the single source of truth for values that bridge design and code."*

### Token Architecture (Three Tiers)

```
Global Tokens       (raw values)
├── --blue-500: #3b82f6
└── --space-4: 1rem

Alias Tokens        (semantic meaning)
├── --color-primary: var(--blue-500)
├── --color-text-error: var(--red-600)
└── --spacing-default: var(--space-4)

Component Tokens    (specific usage)
├── --button-background: var(--color-primary)
└── --input-border-focus: var(--color-primary)
```

### Naming Convention
Format: `category-property-variant-state`  
Examples: `color-text-primary`, `color-background-surface`, `font-size-display`, `space-4`  
State suffixes: `-hover`, `-pressed`, `-disabled`, `-focus`  
**Never hard-code values in components. Always reference a token.**

### Minimum Token Sets Required

**Typography**
```
font-family-display / font-family-body
font-size-{xs|sm|md|lg|xl|2xl|3xl|display}
font-weight-{regular|medium|semibold|bold}
line-height-{tight|normal|relaxed}
letter-spacing-{tight|normal|wide}
```

**Color**
```
color-brand-primary / color-brand-accent
color-neutral-{100–900}
color-text-{primary|secondary|tertiary|disabled|inverse}
color-background-{surface|elevated|sunken|overlay}
color-border-{default|focus|error}
color-feedback-{error|warning|success|info}
```

**Spacing** (4px base unit)
```
space-{1|2|3|4|5|6|8|10|12|16|20|24}
```

### Component Documentation Standard
1. Purpose — what problem it solves
2. Usage rules — when to use AND when not to
3. Accessibility — keyboard behavior, ARIA roles, contrast
4. States — default, hover, focus, pressed, disabled, error
5. Code example

### Failure Modes
- Hard-coding hex values in component CSS
- Naming tokens by value (`red-600`) instead of purpose (`color-error`)
- Component library without "when NOT to use" documentation
- Building the system for current scale instead of projected scale

---

## LAYER 6 — SCOPE CONTROL & SELF-AUDIT

### Scope Rule (Enforced Before Writing Code)
Commit to exactly one of each:
- **One** motion/animation technique
- **One** typographic feature (variable font, ink trap, unusual pairing)
- **One** layout technique (asymmetry, bento grid, cinematic overlap)
- **One** unforgettable moment

> Attempting all techniques simultaneously produces none of them well.

### Stack Rule
Minimum stack that delivers the vision. Not React + GSAP + Lenis + WebGL by default.

### Performance Standards
- LCP < 2s (hard floor)
- No animation blocking first meaningful paint
- No font loading causing layout shift
- Mobile-first always

### Accessibility Standards (Non-Negotiable)
- WCAG AA on all text
- Keyboard navigation for all interactive elements
- Focus states visible and on-brand
- Color is never the only signal
- Screen reader labels on all icons and images

### Pre-Delivery Self-Audit (Fix Any "No" Before Delivering)
1. Does the most important element have the highest visual weight?
2. Can a user complete the primary goal in under 10 seconds without instructions?
3. Does every animation serve comprehension or delight — not fill time?
4. Has the removal test been applied to every element?
5. Does the design look like it was made for a different project? (If yes — fix it.)
6. Does implementation complexity match the aesthetic vision?

---

## ANTI-PATTERN BLACKLIST

Permanently banned. If you reach for any of these, stop and choose differently.

| Banned Pattern | Why |
|---|---|
| Glassmorphism cards on dark backgrounds | Default "AI design" — instantly identifiable as generic |
| Purple-to-blue gradients on white | Overused to invisibility |
| Inter, Space Grotesk, Roboto, Arial as hero typeface | Signals no typographic thought |
| GSAP + WebGL + haptics + audio UI combined | Complexity theater — nothing executes well |
| Decorative section dividers | Apply the removal test. They never pass. |
| "Premium," "innovative," "trusted" as brand values | Outcomes, not values. Describe every brand equally. |
| Animations delaying first meaningful interaction | Performance and trust are the same thing |
| Color as the only accessibility signal | Fails 8% of adult men with color vision deficiency |
| Abstract aesthetic labels without visual description | "Industrial luxury" tells the agent nothing. Describe what the user sees in 3 seconds. |

---

## SESSION FILE PROTOCOL

### `session-intent.md` — Temporary, Per-Session
- **Location:** `/home/claude/session-intent.md`
- **Created:** Layer 0 Step 0.4 — before any questions or work
- **Updated:** As answers arrive and agent decisions are made
- **Overwritten:** At the start of every new session
- **Purpose:** Live context for all layers in the current session

### `guidelines.md` — Permanent Master (this file)
- **Location:** `/home/claude/guidelines.md`
- **Updated:** After every session, in the CHANGELOG below
- **What to record:** Effective question patterns, wasted questions, new anti-patterns, user overrides that reveal a wrong default assumption
- **Rule:** Never delete sections. Mark deprecated content with `[DEPRECATED — reason]`.

### When to Update This File
Update after a session if any of the following occurred:
- A question pattern that consistently produced useful answers → add to 0.3 examples
- A question that wasted a turn → add to 0.3 "never ask" rules
- A new design anti-pattern emerged → add to blacklist
- A default the user always overrides → convert to a question in 0.3
- A layer skipped because it didn't apply → note the context and condition

---

## QUICK REFERENCE CHECKLIST

```
SESSION SETUP
[ ] Mode classified (BUILD / FIX / EXPLORE / REVIEW / SYSTEM)
[ ] session-intent.md written
[ ] Max 3 questions asked — all at once
[ ] Resolved intent confirmed with user
[ ] Assumptions stated before work begins

STRATEGY (Layer 1)
[ ] Primary user goal defined
[ ] First user win named (achievable <10s)
[ ] Success metric identified

BRAND (Layer 3)
[ ] Purpose, values, positioning defined
[ ] Voice consistent with brand character
[ ] Visual identity serves positioning, not the reverse

UX (Layer 2)
[ ] One dominant element per screen — hierarchy enforced
[ ] Primary action has highest visual weight
[ ] Mobile validated, not assumed
[ ] WCAG AA, keyboard nav, focus states confirmed

DESIGN SYSTEM (Layer 5)
[ ] All values via tokens — none hard-coded
[ ] Semantic naming followed
[ ] Component states documented

EXECUTION (Layer 6)
[ ] One motion technique committed to
[ ] One typographic feature committed to
[ ] One unforgettable moment identified
[ ] Removal test applied to every element
[ ] Minimum viable stack confirmed
[ ] LCP < 2s planned
[ ] No blacklisted pattern used

SELF-AUDIT
[ ] Design looks made for THIS project
[ ] Every element passed removal test
[ ] Implementation complexity matches aesthetic vision
[ ] session-intent.md up to date
[ ] guidelines.md changelog updated
```

---

## CHANGELOG

| Version | Date | Change | Reason |
|---|---|---|---|
| 1.0 | 2025 | Initial aesthetic vocabulary system | First generation — label-based approach |
| 2.0 | 2025 | Replaced labels with decision gates (Layers 1–6) | Labels produced generic output every time |
| 3.0 | 2025-03-27 | Added Layer 0: intent detection, mode classification, smart questioning (max 3, all at once), mode-specific question banks, session-intent.md protocol, assumption statement pattern, master changelog protocol | Agent was designing without understanding user need; skipping problem clarity entirely; asking too many questions across multiple turns |

---

*This file is a living document. Update it when new research contradicts current guidance, or when a session reveals a pattern worth capturing. Every changelog entry represents a failure mode that was caught and prevented from repeating.*