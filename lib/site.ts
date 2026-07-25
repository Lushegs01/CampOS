/**
 * Canonical origin for absolute URLs (OpenGraph images, sitemap, robots).
 *
 * Vercel exposes the production domain as NEXT_PUBLIC_SITE_URL if you set it,
 * and VERCEL_PROJECT_PRODUCTION_URL automatically; preview deployments fall back
 * to VERCEL_URL so their link previews point at themselves rather than at prod.
 * Set NEXT_PUBLIC_SITE_URL once the real domain is live.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (production) return `https://${production}`;

  const preview = process.env.VERCEL_URL;
  if (preview) return `https://${preview}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();
