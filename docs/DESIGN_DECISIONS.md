# GTM Teaser Dashboard — Design Documentation

## Project Overview

A B2B SaaS lead intelligence dashboard built for Bullseye Revenue. The primary use case is allowing sales teams at target companies (e.g., Ramp) to view and filter GTM (Go-To-Market) leads with relevant signals and metadata.

**Target quality bar:** Premium enterprise software that commands $10K+ contracts. Not flashy or "over the top" — but sharp, functional, and thoughtfully designed.

---

## Design Philosophy

### 1. Information Density Over Visual Noise

The dashboard prioritizes **scannable, dense information** rather than decorative elements. Every pixel should serve a purpose. We removed unnecessary badges, floating elements, and visual clutter in favor of:

- Clean table layouts with proper column widths
- Minimal but meaningful use of color (primarily for interactive states and signals)
- Consistent spacing that creates visual rhythm without wasted space

### 2. Progressive Disclosure

Complex functionality is hidden until needed:

- **Search** — Icon in header expands to full search bar only when activated
- **Filters** — Collapsed by default, expands below toolbar when clicked
- **Active filter state** — Shows badge only when filters are applied

This keeps the default view clean while power features remain accessible.

### 3. Spatial Hierarchy

The layout follows a clear top-to-bottom hierarchy:

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER: Company name + Bullseye branding + Utility icons  │
├─────────────────────────────────────────────────────────────┤
│  SEARCH BAR (conditional): Expanded search input           │
├─────────────────────────────────────────────────────────────┤
│  TOOLBAR: Navigation tabs + Filters + Actions              │
├─────────────────────────────────────────────────────────────┤
│  FILTER PANEL (conditional): Industry/Size/Signals chips   │
├─────────────────────────────────────────────────────────────┤
│  DATA TABLE: Lead information with sortable columns        │
└─────────────────────────────────────────────────────────────┘
```

### 4. Breathing Room

Early iterations suffered from cramped layouts where content pressed against browser edges. We addressed this with:

- Generous horizontal padding: `px-8 lg:px-16 xl:px-24`
- Consistent vertical rhythm: `py-6` for header, `py-3` for toolbar
- Table wrapped in bordered container with internal padding

This creates the "premium" feel associated with high-end SaaS tools.

---

## Technical Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.1 | App Router, Server Components |
| React | 19 | UI library |
| Tailwind CSS | v4 | Utility-first styling |
| TypeScript | 5.x | Type safety |
| Lucide React | Latest | Icon system |
| shadcn/ui | Configured | Component primitives (not yet utilized) |

### Why This Stack?

- **Next.js 16 + React 19** — Latest stable releases, server components for data fetching
- **Tailwind v4** — Native CSS variables, better performance, simpler config
- **No component library dependency** — Components built from scratch to maintain full control over UX. shadcn/ui is configured for future use but currently unused.

---

## Typography

### Font Selection: Geist

We use **Geist** (Vercel's typeface) with **Geist Mono** for tabular data. This was chosen over Inter because:

1. **Distinctiveness** — Inter is overused in AI-generated designs ("AI slop aesthetic")
2. **Technical character** — Geist has sharper, more technical letterforms suited to B2B SaaS
3. **Tabular figures** — Geist Mono ensures numbers align properly in tables

```tsx
// layout.tsx
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
```

---

## Color System

Dark theme using HSL CSS variables for flexibility:

```css
.dark {
  --background: 240 6% 6%;      /* Near-black with slight blue tint */
  --foreground: 0 0% 95%;       /* Off-white text */
  --card: 240 6% 8%;            /* Slightly elevated surfaces */
  --muted-foreground: 240 5% 55%; /* Secondary text */
  --border: 240 4% 16%;         /* Subtle borders */
  --secondary: 240 4% 12%;      /* Hover states, selected items */
}
```

### Color Usage Principles

- **No decorative color** — Color is used functionally, not aesthetically
- **Subtle interactive states** — Hover states use `bg-secondary` (slightly lighter background)
- **Active selection** — Selected filters get `ring` treatment for clear indication
- **Muted hierarchy** — Secondary text at 55% lightness, borders at 16% lightness

---

## Component Architecture

### Single File Approach

The dashboard lives in one client component (`leads-dashboard.tsx`) rather than being split into micro-components. This was intentional:

1. **Colocation** — All related state and logic in one place
2. **No prop drilling** — Filters, search, sort state all managed together
3. **Easier iteration** — During active development, refactoring is simpler

For production scale, this could be decomposed into:
- `<LeadsToolbar />` — Search, filters, actions
- `<LeadsTable />` — Table with sorting
- `<FilterPanel />` — Filter chips and logic

### State Management

All state is local React state (no external store):

```tsx
const [sort, setSort] = useState<SortState>({ field: null, direction: null });
const [filters, setFilters] = useState<FilterState>({ industries: [], sizes: [], workedAtCustomer: null });
const [showFilters, setShowFilters] = useState(false);
const [showSearch, setShowSearch] = useState(false);
const [searchQuery, setSearchQuery] = useState("");
```

Filtering and sorting are computed via `useMemo` for performance:

```tsx
const filteredLeads = useMemo(() => {
    let result = [...data.leads];
    // Apply search, filters, sorting
    return result;
}, [data.leads, searchQuery, filters, sort]);
```

---

## UX Patterns

### 1. Toolbar Layout (Reference Design Match)

The toolbar was iterated multiple times to match a reference design:

**Final layout:**
```
┌──────────────────────────────────────────────────────────────────┐
│ [All Leads]  [Filters ▼]  50 leads          [Filters 👁 ×] [Columns] │
│     ↑            ↑           ↑                    ↑            ↑    │
│  Active tab   Dropdown    Count          Active badge      Action   │
└──────────────────────────────────────────────────────────────────┘
```

- **All Leads** — Primary navigation tab (filled background)
- **Filters** — Dropdown with chevron that rotates when expanded
- **Lead count** — Shows filtered count, updates in real-time
- **Active filters badge** — Only appears when filters are applied, includes eye icon + X to clear
- **Columns** — Action button with border treatment

### 2. Search Behavior

Search icon lives in the header (top-right corner, before moon icon). When clicked:

1. A full-width search bar slides in below the header
2. Input auto-focuses
3. Search filters results in real-time
4. Escape key or clicking X closes and clears search

This pattern keeps the header minimal while making search easily accessible.

### 3. Filter Panel

When "Filters" is clicked:

1. Chevron rotates 180° (visual feedback)
2. Panel slides in below toolbar
3. Three filter categories displayed horizontally:
   - **Industry** — Chip-based multi-select
   - **Company Size** — Chip-based multi-select
   - **Signals** — Single toggle (Worked at Customer)

Selected chips get a ring treatment for clear indication.

### 4. Table Interactions

- **Sortable columns** — Click header to cycle: none → ascending → descending
- **Sort indicator** — Shows ↑ or ↓ next to column name
- **Row hover** — LinkedIn icon appears for quick access
- **No pagination yet** — All 50 leads render (acceptable for current data size)

---

## Decisions & Tradeoffs

### What We Kept Simple

| Decision | Rationale |
|----------|-----------|
| No virtualization | 50 rows renders fine; would add complexity for minimal gain |
| No URL state | Filters/search don't persist in URL; acceptable for demo |
| Single component | Faster iteration; can decompose later |
| No animations library | CSS transitions sufficient; no need for Framer Motion |

### What We Invested In

| Decision | Rationale |
|----------|-----------|
| Proper spacing system | Consistent rhythm is the #1 indicator of quality |
| Font selection | Geist differentiates from generic AI output |
| Interactive feedback | Hover states, active states, transitions on all controls |
| Filter UX | Chip-based selection is faster than dropdowns |

---

## File Structure

```
components/
├── dashboard/
│   ├── leads-dashboard.tsx   # Main client component (all dashboard logic)
│   ├── leads-table.tsx       # Placeholder (unused)
│   ├── stats-header.tsx      # Placeholder (unused)
│   └── filters.tsx           # Placeholder (unused)
├── ui/                       # shadcn/ui components (empty, configured)
└── ui-archive/
    └── search-patterns.tsx   # Saved design patterns for future reference
```

### Archive Pattern

When removing features that might be useful later, we save them to `ui-archive/` with documentation. This preserves institutional knowledge without cluttering the active codebase.

---

## API Integration

Data fetching happens in the Server Component (`app/[slug]/page.tsx`):

```tsx
export default async function DashboardPage({ params }) {
    const { slug } = await params;
    const data = await fetchAPI<LeadsResponse>(`/api/leads/${slug}`);
    return <LeadsDashboard data={data} companyName={companyName} />;
}
```

The client component receives pre-fetched data as props. This means:
- No loading states needed in the dashboard component
- Filtering/sorting is instant (client-side)
- SEO-friendly (data rendered on server)

---

## Future Considerations

### Near-term Improvements

1. **URL State** — Persist filters/search in URL for shareability
2. **Pagination** — Add if lead counts exceed 100+
3. **Column visibility** — Make Columns button functional
4. **Export** — Add CSV/Excel export functionality
5. **Dark/Light toggle** — Moon icon is placeholder, not wired up

### Potential Decomposition

If the component grows beyond ~500 lines, consider splitting:

```tsx
// Proposed structure
<LeadsDashboard data={data}>
  <DashboardHeader companyName={companyName} />
  <DashboardToolbar 
    filters={filters}
    onFiltersChange={setFilters}
    searchQuery={searchQuery}
    onSearchChange={setSearchQuery}
  />
  <FilterPanel filters={filters} onChange={setFilters} />
  <LeadsTable leads={filteredLeads} sort={sort} onSort={setSort} />
</LeadsDashboard>
```

### Component Library Migration

shadcn/ui is configured but unused. When ready to migrate:

1. Install base components: `npx shadcn@latest add button table badge`
2. Replace custom buttons with `<Button variant="ghost" />`
3. Replace custom table with `<Table>` primitives
4. Keep custom filter chips (no shadcn equivalent)

---

## Design References

The final design was informed by a reference screenshot showing:
- Clean toolbar with All Leads / Filters / count on left
- Active filters badge with eye icon on right
- Bordered Columns button
- Search + moon icons in header corner

This reference represented "what $10K software looks like" — professional, functional, appropriately dense.

---

## Conclusion

This dashboard prioritizes **clarity over cleverness**. The design choices reflect B2B SaaS conventions that sales teams expect:

- Fast scanning of lead data
- Quick filtering without page reloads
- Clear visual hierarchy
- No unnecessary decoration

Every decision can be traced back to the core question: *"Does this help the user find and act on leads faster?"*

