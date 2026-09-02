/** Site-wide constants used by metadata, navigation and the footer. */

export const SITE = {
  name: "CampOS",
  tagline: "The digital infrastructure behind the modern university.",
  description:
    "CampOS is the institutional infrastructure layer for universities — one verified identity, one permission model and one record of truth, connecting registration, attendance, finance, records and campus services.",
  /**
   * Absolute origin, used for canonical URLs, Open Graph and the sitemap. Set
   * NEXT_PUBLIC_SITE_URL in the deployment environment; the fallback is only a
   * development default.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://campos.africa",
} as const;

/**
 * Social profiles. Left empty on purpose: the footer renders a link only for a
 * profile that has been verified as CampOS's own. Add the real URLs here and
 * they appear — nothing else needs to change.
 */
export const SOCIAL_LINKS: { label: string; href: string }[] = [
  { label: "X", href: "" },
  { label: "LinkedIn", href: "" },
  { label: "GitHub", href: "" },
].filter((link) => link.href.length > 0);

export const NAV_LINKS = [
  { label: "Platform", href: "/#platform" },
  { label: "Ecosystem", href: "/#ecosystem" },
  { label: "Institutions", href: "/#institutions" },
] as const;

/** Where "Sign in" goes. Institutions are issued their own entry point. */
export const SIGN_IN_HREF = "/sign-in";

export const FOOTER_COLUMNS = [
  {
    title: "Platform",
    links: [
      { label: "CampOS Core", href: "/#platform" },
      { label: "Identity", href: "/#platform" },
    ],
  },
  {
    title: "Ecosystem",
    links: [
      { label: "ScanMark", href: "/#scanmark" },
      { label: "UniReg", href: "/#unireg" },
      { label: "NADA", href: "/#nada" },
      { label: "Clearr", href: "/#clearr" },
    ],
  },
  {
    title: "Institutions",
    links: [
      { label: "For university leaders", href: "/#institutions" },
      { label: "See it in use", href: "/#demo" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "About", href: "/about" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
] as const;
