# Lead Profile View — Analysis & Design Direction

## Context

This document captures analysis of the lead profile screenshots shared as reference, strategic thinking about the GTM Teaser Dashboard goals, and recommendations for implementation.

**Date:** January 2026  
**Purpose:** Planning document before building the lead profile/detail view

---

## Assessment of Reference Screenshots

### What Works Well

#### 1. Information Architecture
The **Lead/Company tab split** is smart. It separates "who is this person?" from "what is this company?" — two distinct research tasks that sales reps typically do in sequence. This respects how people actually work.

#### 2. Intelligence Signals as First-Class Citizens
The green-highlighted signal cards ("New in Role - High Receptivity Window", "Recent Funding - Budget Available") with explanatory text beneath are the core value proposition. These aren't just data points — they're *actionable insights with reasoning*. This is what differentiates a lead list from intelligence.

#### 3. Executive Summary
> "Amanda recently started as VP of Partnerships 22 days ago at a company that just raised $15M Series A funding. This timing makes her highly receptive to partnership discussions."

This is the "wow" moment. A human-readable synthesis that tells the rep *why this lead matters right now*. This alone could justify the product.

#### 4. Work History Timeline
Clean, scannable, gives context for conversations ("I saw you came from Learning Innovations — how does EduTech's approach differ?").

#### 5. "How Your Product Can Help" Section
This is bold. Not just showing data — pre-writing the pitch. Even if somewhat templated, it demonstrates the *type* of intelligence the product can deliver.

---

### Areas for Improvement

#### 1. Header Density Problem
The profile card header is doing too much:
- Avatar, name, title, company, description
- Signal tags (New in Role, Recently Funded)
- Priority badge
- Contact info (location, email, phone, LinkedIn)

This creates visual competition. The eye doesn't know where to land first.

**Recommendations:**
- Move contact info to a secondary location or collapsed section
- Make signal tags more visually connected to the Intelligence Signals below
- Reduce company description to one line or move it to Company tab

#### 2. Color System Inconsistency
Current usage:
- "New in Role" = lime green outline
- "Recently Funded" = gray/purple outline
- "High Priority" = solid green badge
- Intelligence Signal cards = dark green background

The green is doing too many jobs.

**Recommended color system:**
| Color | Usage |
|-------|-------|
| Emerald/Green | Positive signals (timing, budget, receptivity) |
| Purple/Violet | Company events (funding, expansion, hiring) |
| Amber/Yellow | Caution signals (churn risk, competitor usage) |
| Priority indicator | Separate visual language (flame icon, star, or ring) |

#### 3. Tab Toggle Styling
The Lead/Company toggle looks dated (Bootstrap circa 2018). For a $10K product, this should feel more refined:
- Segmented control with subtle animation
- Modern pill-style toggle
- Perhaps an underline indicator like modern design systems

#### 4. Card Visual Weight Monotony
All cards have the same border treatment and internal spacing, creating monotony.

**Recommendations:**
- Intelligence Signals cards could have slightly more visual weight (they're the hero)
- Supporting sections (Work History, Education) could be more compact
- Executive Summary could be typographically distinct (larger text, subtle background)

#### 5. The "How Your Product Can Help" Gap
This is the *most compelling* section but may not have data to populate.

**Options if data unavailable:**
- Show as a "teaser" that's locked ("Unlock personalized pitch angles with full access")
- Template based on industry + signals available
- Generate dynamically from company description + known integrations

#### 6. Avatar Treatment
Initials in a circle is functional but generic.

**Alternatives:**
- Pull actual LinkedIn photos (if available via API)
- Make initials more distinctive (gradient background, company brand color)
- Show company logo alongside or instead

---

## Strategic Reflection: The Teaser Dashboard Goal

### Core Purpose
Building a **sales tool for selling a sales tool**. The prospect viewing this dashboard should think:

> "If this is what the *teaser* looks like, the full product must be incredible."

### Design Principles for Teasers

#### 1. Show, Don't Tell
Don't explain what signals you track — *show* a lead with those signals in context. The Amanda Foster profile does this. The prospect can immediately imagine their own leads enriched this way.

#### 2. Create Information Asymmetry
The teaser should make the prospect feel like they're missing out:
- Show some signals as locked/blurred
- Include "12 more signals available in full access" indicator
- Perhaps Executive Summary is visible but detailed work history is gated

#### 3. Make It Feel Alive
Static data feels like a demo. Dynamic touches help:
- "New in Role" badge showing "22 days" — specificity feels real
- "Last updated 2 hours ago" timestamps
- Dates that feel current (not obviously stale)

#### 4. The Table → Profile Flow
The table view is the "browse" experience. The profile is the "deep dive." The transition should feel seamless:
- Clicking a row slides in the profile from the right
- Or opens a modal/drawer
- Don't navigate away from the table entirely — maintain context

---

## Implementation Recommendations

### Phase 1: Lead Profile View (Core)

**Header Section:**
- Avatar with initials (or photo if available)
- Name, title, company
- Priority indicator
- Key signal tags
- Contact actions (email, phone, LinkedIn as icons)

**Executive Summary Card:**
- Larger, more prominent typography
- AI-synthesized insight about timing/opportunity
- Even if templated initially, structure should support dynamic generation

**Intelligence Signals Section:**
- Green highlight treatment for positive signals
- Icon + title + explanatory paragraph format
- Most important signals first

**Contact Info:**
- Secondary position (not competing with signals)
- Collapsible or in sidebar

**Lead/Company Tab Structure:**
- Modern toggle styling
- Company tab can be simpler initially (description, firmographics, funding)

### Phase 2: Profile-Table Integration

**Interaction Pattern:**
- Click table row → profile slides in as side panel (recommended)
- Alternative: expanded row inline
- Alternative: modal overlay

**State Preservation:**
- "Back to Leads" maintains filter/sort state
- Quick-view on hover before full click (optional)
- Keyboard navigation (arrow keys to move between leads)

### Phase 3: Teaser Mechanics

**Gating Strategies:**
- Locked sections with blur + "Upgrade" prompts
- Limited lead count ("Showing 50 of 2,847 leads")
- Some signals visible, others locked
- Clear CTAs to "Get full access"

**Urgency Creation:**
- "This intelligence refreshes daily for subscribers"
- Show timestamps suggesting active data pipeline
- Perhaps a "leads added this week" indicator

---

## Open Questions

### 1. Profile Access Pattern
Options to decide:
- **Side panel** (slides in from right, ~40-50% width) — recommended
- **Full page navigation** (separate route)
- **Modal overlay** (centered, larger)
- **Expanded row** (inline in table)

### 2. Data Availability
Need to understand what fields are available in the API:
- Work history (companies, roles, dates)?
- Education?
- Signals (new in role, funding, etc.)?
- Company firmographics (size, revenue, industry)?
- Contact info (email, phone)?
- LinkedIn photos?

### 3. Teaser Gating Approach
Should implement:
- Visually locked/blurred sections?
- "X more signals available" counters?
- Upgrade CTAs inline?

### 4. Mobile Consideration
- Desktop-only for v1? (likely, given use case)
- If mobile needed, profile would need different treatment

---

## Reference: Screenshot Content Breakdown

### Lead Tab Content
```
┌─────────────────────────────────────────────────────────────┐
│ ← Back to Leads                                    🌙       │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [AF]  Amanda Foster              [High Priority]        │ │
│ │       VP of Partnerships         ○ Austin, TX           │ │
│ │       EduTech Solutions          ✉ Email                │ │
│ │       Company description...     📞 +1 (512) 555-0234   │ │
│ │                                  🔗 LinkedIn            │ │
│ │       [New in Role] [Recently Funded]                   │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ [Lead]  [Company]                                           │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Executive Summary                                       │ │
│ │ Amanda recently started as VP of Partnerships 22 days   │ │
│ │ ago at a company that just raised $15M Series A...      │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Intelligence Signals                                    │ │
│ │ ┌───────────────────────────────────────────────────┐   │ │
│ │ │ 🏢 New in Role - High Receptivity Window          │   │ │
│ │ │    New leaders often evaluate existing vendors... │   │ │
│ │ └───────────────────────────────────────────────────┘   │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Professional Background                                 │ │
│ │                                                         │ │
│ │ Work History                                            │ │
│ │ 🏢 EduTech Solutions                                    │ │
│ │    VP of Partnerships                                   │ │
│ │    2024-09 - Present                                    │ │
│ │ ─────────────────────────────────────────               │ │
│ │ 🏢 Learning Innovations                                 │ │
│ │    Director of Partnerships                             │ │
│ │    2021-06 - 2024-08                                    │ │
│ │ ─────────────────────────────────────────               │ │
│ │ 🏢 EdTech Ventures                                      │ │
│ │    Partnership Manager                                  │ │
│ │    2018-09 - 2021-05                                    │ │
│ │                                                         │ │
│ │ Education                                               │ │
│ │ 🎓 University of Texas at Austin                        │ │
│ │    MA, Education Technology - 2018                      │ │
│ │ 🎓 Rice University                                      │ │
│ │    BA, Education - 2015                                 │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Company Tab Content
```
┌─────────────────────────────────────────────────────────────┐
│ [Lead]  [Company]  ← Company tab selected                   │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Company Description                                     │ │
│ │ EduTech Solutions provides learning management and      │ │
│ │ educational technology platforms for K-12 schools...    │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Intelligence Signals                                    │ │
│ │ ┌───────────────────────────────────────────────────┐   │ │
│ │ │ 📈 Recent Funding - Budget Available              │   │ │
│ │ │    Recent funding round means budget for new...   │   │ │
│ │ └───────────────────────────────────────────────────┘   │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ How Your Product Can Help EduTech Solutions             │ │
│ │ • Facilitate integrations with Canvas and other...      │ │
│ │ • Enable collaboration features for distributed...      │ │
│ │ • Support growth initiatives following Series A...      │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Company Intelligence                                    │ │
│ │ 🏢 Industry          👥 Company Size                    │ │
│ │    Education            201-500 employees               │ │
│ │ 📍 Headquarters      💰 Revenue                         │ │
│ │    Austin, TX           $10M-$50M                       │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Recent Funding                                          │ │
│ │ 📈 $15M             📅 July 2024                        │ │
│ │    Series A            Funding date                     │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Technology Stack                                        │ │
│ │ [Canvas] [Slack] [Zoom]                                 │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Market Dynamics                                         │ │
│ │ Key Competitors                                         │ │
│ │ [Canvas LMS] [Blackboard] [Google Classroom] [Schoology]│ │
│ │                                                         │ │
│ │ Market Position                                         │ │
│ │ EduTech Solutions operates in the Education sector...   │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## Next Steps

1. Confirm answers to open questions (profile access pattern, data availability, gating approach)
2. Define the minimal viable profile view (what's in v1 vs later)
3. Implement profile component
4. Integrate with table (click-to-open flow)
5. Add teaser mechanics if desired

---

*This document should be updated as decisions are made during implementation.*

