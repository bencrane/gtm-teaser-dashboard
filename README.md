# GTM Teaser Dashboard

A premium B2B lead intelligence dashboard for Bullseye Revenue. View and filter GTM leads with advanced signals for target companies.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000/ramp](http://localhost:3000/ramp) to view the Ramp leads dashboard.

## Tech Stack

- **Next.js 16** — App Router, Server Components
- **React 19** — Latest stable
- **Tailwind CSS v4** — Utility-first styling
- **TypeScript** — Type safety
- **Geist Font** — Vercel's premium typeface

## Project Structure

```
app/
├── [slug]/page.tsx     # Dynamic dashboard route (server component)
├── layout.tsx          # Root layout with fonts
└── globals.css         # Tailwind + CSS variables

components/
├── dashboard/
│   └── leads-dashboard.tsx  # Main client component
└── ui-archive/              # Saved design patterns

docs/
└── DESIGN_DECISIONS.md      # Comprehensive design documentation

lib/
├── api.ts              # API fetch utilities
└── utils.ts            # cn() helper

types/
└── api.ts              # Lead/LeadsResponse types
```

## Features

- **Real-time filtering** — Industry, company size, signals
- **Sortable columns** — Click headers to sort ascending/descending
- **Full-text search** — Search across name, title, company, industry
- **Active filter badges** — Clear indication of applied filters
- **Server-side data fetching** — Fast initial load, client-side interactivity

## Design Documentation

See [docs/DESIGN_DECISIONS.md](./docs/DESIGN_DECISIONS.md) for comprehensive documentation of:

- Design philosophy and UX principles
- Technical architecture decisions
- Component patterns and rationale
- Color system and typography choices
- Future considerations

## API

The dashboard fetches from `/api/leads/[slug]` endpoint. Expected response:

```typescript
interface LeadsResponse {
    company_name: string;
    total_leads: number;
    leads: Lead[];
}

interface Lead {
    id: number;
    full_name: string;
    title: string;
    company_name: string;
    company_domain: string;
    company_industry: string;
    company_size: string;
    linkedin_url: string;
    worked_at_customer: boolean;
}
```

## Environment

Copy `.env.example` to `.env.local` and configure:

```
NEXT_PUBLIC_API_URL=your-api-url
```

## License

Proprietary — Bullseye Revenue
