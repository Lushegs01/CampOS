# CampOS — Landing Page

> One operating system for the whole campus.

A production-ready marketing site for **CampOS**, the operating system for modern
universities — unifying attendance (**ScanMark**), housing (**Krib**), records
(**Nada**), and a single student identity into one verified ecosystem.

The design is warm and editorial — paper textures, a sage-and-honey palette, and
Fraunces as a variable serif — deliberately humane for something so infrastructural.

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS** 3.4
- **Framer Motion** 11 (scroll reveals + the cycling hero card)
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

## Design system

| Token | Value |
| --- | --- |
| Paper (bg) | `#FBF9F5` |
| Paper 2 | `#F3EFE6` |
| Ink (text) | `#18241E` |
| Ink soft | `#425047` |
| Sage / Sage deep | `#5A7363` / `#36473C` |
| Honey / Honey deep | `#D79744` / `#BC7E2E` |
| Blush | `#E8CBB9` |
| Hairline | `rgba(24,36,30,0.12)` |

Type tokens (`.display`, `.display-sm`, `.serif-em`, `.eyebrow`) and the button
classes live in `app/globals.css`; colors, fonts, and the `scan` / `pulse-ring`
keyframes live in `tailwind.config.ts`. Motion shares one easing curve,
`[0.2, 0.8, 0.2, 1]`, and everything respects `prefers-reduced-motion`.

## Structure

```
campos/
├── app/
│   ├── globals.css        # warm base + display/eyebrow/button classes
│   ├── layout.tsx         # fonts, metadata, MotionProvider
│   └── page.tsx           # section composition
├── components/
│   ├── Navbar.tsx         # sticky, blur, mobile drawer
│   ├── Hero.tsx           # headline + HeroCard
│   ├── HeroCard.tsx       # cycling identity card (ScanMark QR / Krib / Nada)
│   ├── ProofStrip.tsx
│   ├── Modules.tsx        # ScanMark · Krib · Nada (last card dark)
│   ├── Trust.tsx          # dark "verified once" band
│   ├── QuestionsWall.tsx  # masonry of registrar questions
│   ├── InstitutionsCTA.tsx
│   ├── Footer.tsx
│   ├── Section.tsx        # Eyebrow + SectionHeading
│   ├── Logo.tsx           # mark + wordmark
│   └── MotionProvider.tsx
├── lib/motion.ts          # easing, variants, viewport
├── tailwind.config.ts
└── package.json
```

## Notes

- **Signature element** — the hero card cycles one verified student (Ada Okafor)
  through three CampOS surfaces: a live ScanMark QR check-in, a verified Krib
  lease, and a sealed Nada transcript. The QR matrix is generated deterministically
  so server and client render identically (no hydration shift).
- **No image assets** — every visual is markup, CSS, and inline SVG.
- A standalone `preview.html` mirrors the design with zero install.
