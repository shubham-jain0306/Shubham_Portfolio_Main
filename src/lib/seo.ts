// Centralized SEO config. When a custom production domain is ready,
// update SITE_URL here and the canonical/OG/sitemap will follow.
export const SITE_URL =
  "https://id-preview--ba1f4b84-fff8-43ad-89da-a66f576b9850.lovable.app";

export const SITE_NAME = "Shubham Jain";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export const SOCIAL_PROFILES = [
  "https://www.linkedin.com/in/shubham-jain-1aa891226",
];

export const absUrl = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
