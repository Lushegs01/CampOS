# CampOS — Landing Page

> The whole campus, running as one.

A production-ready marketing site for **CampOS**, the operating system for modern
universities — unifying attendance (**ScanMark**), housing (**FunaaBnB**), social
(**Nada**), enrollment (**Unireg**), and a single student identity into one
verified ecosystem.

The design is **cinematic and dark** — a near-black canvas lit by drifting aurora
gradients, oversized Fraunces display type with gradient italics, glassmorphic
"operating-system" surfaces, and a vivid electric-blue → violet → cyan accent
story. Everything respects `prefers-reduced-motion`.

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS** 3.4
- **Framer Motion** 11 (scroll reveals, the live console, aurora drift)
- **Resend** (booking-demo email)
- **next/font** — Fraunces (display), Hanken Grotesk (body), Spline Sans Mono (labels)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build && npm run start   # production
```

To enable the booking-demo email, set `RESEND_API_KEY` in your environment.

## Design system

| Token | Value | Use |
| --- | --- | --- |
| `void` | `#05060A` | page base |
| `ink` / `ink-2` | `#090B11` / `#0D1018` | section surfaces |
| `surface` / `surface-2` | `#11141D` / `#171B26` | cards |
| `hi` / `body` / `mute` / `faint` | `#F4F7FF` … `#5A6273` | text ramp |
| `primary` | `#2E6BFF` | electric blue (brand) |
| `violet` / `cyan` / `mint` | `#8B5CF6` / `#22D3EE` / `#34D399` | accents |

Type tokens (`.display`, `.display-sm`, `.serif-em`, `.eyebrow`, `.lede`),
button classes, and effect utilities (`.glass-strong`, `.edge`, `.grain`,
`.bg-grid`, `.text-gradient`, `.ring-glow`) live in `app/globals.css`. Colors,
fonts, and keyframes (`aurora`, `scan`, `marquee`, `float`, …) live in
`tailwind.config.ts`. Motion shares one easing curve, `[0.2, 0.8, 0.2, 1]`.

## Structure

```
campos/
├── app/
│   ├── globals.css        # dark base + type/button/effect classes
│   ├── layout.tsx         # fonts, metadata, providers, grain overlay
│   ├── page.tsx           # section composition
│   ├── icon.tsx           # dynamic favicon (C-mark on dark tile)
│   ├── opengraph-image.tsx
│   ├── about · privacy · terms
│   └── api/book/route.ts  # Resend demo-request email
├── components/
│   ├── Navbar.tsx         # sticky, glass-on-scroll, mobile drawer
│   ├── Hero.tsx           # headline + CampusConsole
│   ├── CampusConsole.tsx  # ⭐ signature: one identity flowing through all 4 apps
│   ├── Aurora.tsx         # drifting color-blob backdrop
│   ├── ProofStrip.tsx     # stats + system-bus marquee
│   ├── Modules.tsx        # ScanMark · FunaaBnB · Nada · Unireg bento grid
│   ├── HowItWorks.tsx     # 3-step flow + real app in a device frame
│   ├── Trust.tsx          # security features + live "campus ledger"
│   ├── QuestionsWall.tsx  # masonry of registrar questions
│   ├── InstitutionsCTA.tsx
│   ├── Footer.tsx         # sinking-wordmark footer
│   ├── BookingModal.tsx   # demo request (Resend)
│   ├── Section.tsx · Logo.tsx · MotionProvider.tsx
├── context/ModalContext.tsx
├── lib/motion.ts          # easing, variants, viewport
└── tailwind.config.ts
```

## Notes

- **Signature element** — `CampusConsole` is a glassy "operating-system" window
  where one verified student (Ada Okafor) flows live through all four CampOS
  apps: a ScanMark QR check-in, a verified FunaaBnB lease, an anonymous Nada
  post, and a Unireg enrollment. The QR matrix is generated deterministically so
  server and client render identically (no hydration shift).
- **No image dependencies for the design** — every visual is markup, CSS, and
  inline SVG. The one real asset is `public/app-mockup.png` (the live ScanMark
  student portal), framed as a device in *How it works*.
- `preview.html` is a **legacy** static snapshot of the previous (light) design
  and no longer mirrors the live site.
