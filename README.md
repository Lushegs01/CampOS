# CampOS — website

> The digital infrastructure behind the modern university.

The public site for **CampOS**, the institutional infrastructure layer universities
run on: one verified identity, one permission model and one record of truth,
connecting registration (**UniReg**), attendance (**ScanMark**), student
communication (**NADA**), finance and clearance (**Clearr**) — and the wider
ecosystem around them.

The page is written for a decision-maker: what CampOS is, what it replaces, how it
works, why it can be trusted, and what to do next — in that order.

## Stack

- **Next.js 15** (App Router, React Server Components) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS** 3.4
- **next/font** — Instrument Sans (interface), Instrument Serif (accent), Geist Mono (labels)
- **Resend** for the "Talk to CampOS" enquiry route

No animation library, no scroll library, no UI kit. The page is interactive
where interaction explains something, and static everywhere else:

| Client component | What it does |
| --- | --- |
| `hero/CoreSystem` | the system map: selecting an application lights its route through Core, and the map cycles itself until you take over |
| `platform/Fragmentation` | eight scattered systems snap onto the foundation, on scroll or from the toggle |
| `platform/CoreArchitecture` | choose a Core capability, see which applications depend on it |
| `ecosystem/demos` | ScanMark check-ins, UniReg registration, Clearr clearance, NADA's two points of view |
| `identity/IdentityJourney` | the ID card fills in as the seven stages scroll past it |
| `security/TenantBoundary` | a request sent across the tenant boundary, and what the database answers |
| `experience/RoleConsole` | three seats, five areas each, both levels of navigation live |
| `navigation/MobileMenu` | drawer state, Escape, scroll lock |
| `cta/ContactDialogProvider` | native `<dialog>` + the enquiry form |
| `primitives/Reveal` | one shared IntersectionObserver flips `data-reveal`; the animation is CSS |

Every demo is a small state machine over a fixed script — deterministic, so the
server and client agree and nothing can be mistaken for live institutional
data. Timers are cleared on unmount. Everything else — the remaining sections,
the FAQ (native `<details>`), all diagrams — is a server component.

## Getting started

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start
npm run lint           # eslint, flat config, next/core-web-vitals
npm run og             # regenerate app/opengraph-image.png
```

### Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Absolute origin for canonical URLs, Open Graph and the sitemap. **Set this in production** — the fallback in `lib/site.ts` is a development placeholder. |
| `RESEND_API_KEY` | Sends the "Talk to CampOS" enquiry. Without it the form returns a handled error. |
| `CONTACT_TO` / `CONTACT_FROM` | Enquiry recipient and verified sender. |

## Design system

Two grounds and one institutional green. Colour is a signal, not a surface:
forest for the platform and anything connected, clay for the fragmented "before"
state, sage for supporting structure.

| Token | Value | Used for |
| --- | --- | --- |
| `ink` / `ink-2` / `ink-3` | `#0A0D0C` `#101512` `#1A211D` | dark sections, the Core, the console |
| `paper` / `paper-2` / `paper-3` | `#F7F6F2` `#EFEEE7` `#E3E2D9` | the primary ground |
| `forest` / `forest-deep` / `forest-bright` | `#114935` `#0A2E22` `#1C6B4E` | primary actions, connected state, focus |
| `sage` / `sage-soft` | `#7B968A` `#AEC0B6` | labels and structure on ink |
| `clay` / `clay-deep` / `clay-light` | `#B4573A` `#98462C` `#CE7856` | fragmentation, blocking states |
| `muted` / `faint` | `#585F5B` `#6B726E` | body and label text on paper |

Type: `.display`, `.heading`, `.subheading`, `.lede`, `.body`, `.label`,
`.mono-xs`, `.em-serif`. Structure: `.shell`, `.ticks` (corner registration
marks), `.grid-wash`. All in `app/globals.css`; colours and fonts in
`tailwind.config.ts`. Every text/background pair meets WCAG AA.

Motion is one shared curve and CSS-only: reveals on entry, diagram paths that
draw themselves, one travelling dash on the live route, and state transitions
on colour and transform. Above the fold nothing fades in — a transition on the
headline would delay LCP. `prefers-reduced-motion: reduce` removes all of it,
stops the hero cycling, and settles the fragmented estate into its connected
state so nothing depends on animation to be understood.

## Structure

```
app/
├── layout.tsx            # fonts, metadata, contact dialog provider
├── page.tsx              # the fifteen-section composition
├── globals.css           # design system
├── sitemap.ts robots.ts manifest.ts
├── about/ privacy/ terms/ sign-in/
└── api/book/route.ts     # enquiry relay (Resend)
components/
├── primitives/           # Reveal, Button, Section, Wordmark, PageShell
├── navigation/ hero/ platform/ ecosystem/ identity/
├── security/ institutions/ experience/ architecture/ faq/ cta/ footer/
lib/                      # site constants + all page copy as typed data
scripts/generate-og.mjs   # builds the social card
```

Page copy lives in `lib/content.ts`, `lib/faq.ts` and `lib/roles.ts` as typed
data, so sections stay presentational and wording can be edited in one place.
`lib/system.ts` holds the model the interactive pieces share: four applications,
the university function each serves, and what each one reads from and writes to
Core. The hero map, the architecture view and the closing diagram all render
from it, which is why they agree with each other.

## Claims policy

The site displays no customer logos, adoption figures, uptime numbers, security
certifications or testimonials, because none have been verified. Where proof
would normally sit, the page says what CampOS can actually show an evaluator
today, and marks the space reserved for verified proof. Interface visuals are
captioned as illustrations, and tenant names are neutral placeholders.

Two things are deliberately left unset rather than invented: `SOCIAL_LINKS` in
`lib/site.ts` (add real profile URLs and the footer renders them) and
`NEXT_PUBLIC_SITE_URL`.
