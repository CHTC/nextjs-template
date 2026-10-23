import type { MetadataRoute } from 'next';
import { siteConfig } from '@/site.config';

/*
 * Web app manifest, emitted at /manifest.webmanifest and linked from every
 * page. Colors are the CHTC theme's values, repeated as literals rather than
 * imported so this route does not pull MUI's theme factory into the build.
 */
// `manifest.ts` is a Route Handler, and a statically exported site has no
// server to run it on request, so it has to be marked static explicitly.
export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#B61F24',
    icons: [
      {
        src: '/logos/chtc.svg',
        type: 'image/svg+xml',
        sizes: 'any',
        purpose: 'any',
      },
    ],
  };
}
