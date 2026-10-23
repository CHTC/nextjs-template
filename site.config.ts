/**
 * What this site is.
 *
 * The name, the one-line description and the URL live here and
 * `app/layout.tsx`, `app/manifest.ts` and `app/robots.ts` read from this
 * module, so changing any of them is a one-place edit.
 *
 * Server-side only: `HOSTNAME` is a plain build variable, not a
 * `NEXT_PUBLIC_` one, so a client component importing this would read
 * `undefined` for {@link siteConfig.url}.
 */
export const siteConfig = {
  name: 'Website Template',
  shortName: 'Template',
  description: 'Website template for CHTC projects',
  locale: 'en_US',
  /**
   * The site-wide share image.
   *
   * `app/opengraph-image.jpg` already covers every page that does not define
   * its own `openGraph` block. A page that does define one has to name an
   * image explicitly, because Next replaces the inherited block wholesale
   * rather than merging it — this is that same file.
   */
  shareImage: {
    url: '/opengraph-image.jpg',
    width: 1203,
    height: 630,
    alt: 'Center for High Throughput Computing — UW-Madison',
  },
  /** Set per deployment; the sitemap and robots.txt need it absolute. */
  url: process.env.HOSTNAME ? `https://${process.env.HOSTNAME}` : 'https://example.com',
  /** Contact address for the 404 page and the footer's accessibility link. */
  email: 'chtc@wisc.edu',
} as const;
