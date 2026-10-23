# NextJS Static Website Template

Fully functional website template using Next.js for use by the CHTC.

Provides a basic structure for building static websites with Next.js with a couple nice to haves:

- Solves rehydration errors when using Material UI with Next.js.
- Theming integration with Material UI and CHTC Web Components.
- Setting up CI/CD with GitHub Actions to deploy to GitHub Pages or other static hosting.
- Starting points for sitemap, robots.txt, SEO Metadata, and Analytics.

Please raise any issues with this template in an issue on the repository!

# NPM Stack

## Next.js

React framework used for building the static website.

https://nextjs.org/

## Material UI

Used for components, icons, and theming.

You can find the CHTC, OSG, and Pelican MUI themes in `@chtc/web-components/themes`.

https://mui.com/

### Styling with the SX prop

https://mui.com/system/getting-started/usage/

Material UI uses the `sx` prop for styling components. This allows you to apply styles directly to components using a JavaScript object syntax.

Since we integrate with MUI themes, you can use the sx prop to access theme values like colors, spacing, and typography.

## CHTC Web Components

Reusable components and themes for CHTC websites.

https://path-cc.io/web-components/ for now, but moving to https://chtc.github.io/web-components/

# Development

## Docker

This is the easiest, if you have something quick I would do this.

Run the command below and navigate to http://localhost:3000.

```shell
docker compose up
```

## PNPM

[Install pnpm](https://pnpm.io/installation) and run `pnpm install` (only need to do it once).

Run `pnpm run dev`.

This will be the fastest if you aren't on linux.

The pnpm version is pinned by the `packageManager` field in `package.json`; CI and Docker use the same one.

# Configuration

- **`site.config.ts`** holds the site's name, description, contact email and URL. The layout, `robots.txt`, the web manifest and the 404 page all read from it.
- **`app/opengraph-image.png`** is the share image for every page. Replace it (and `app/opengraph-image.alt.txt`) with the site's own artwork.
- **`static-redirects.json`** lists old URLs to forward to new ones, as `{ "source": "/old/", "destination": "/new/" }`. Since a static export can't redirect on the server, `scripts/generate-redirects.mjs` writes a small redirect page at each source after the build.

# Site Checks

## Link Checking

- **Internal links** are checked on every pull request by the `link-check` job in `.github/workflows/nextjs.yml`, which fails if any link within the built site is broken.
- **External links** are checked daily by `.github/workflows/external-links.yml`. External sites fail transiently, so `scripts/external-link-history.mjs` records when each link started failing and the job only fails for links that have been broken for a week.

## Lighthouse Audits

[Unlighthouse](https://unlighthouse.dev/) runs Lighthouse against every page in the sitemap.

Set the production URL in `unlighthouse.config.ts`, then run `pnpm run unlighthouse:live`.

To scan a local build instead, serve it with `npx serve out -l 3000` and run `UNLIGHTHOUSE_SITE=http://localhost:3000 pnpm run unlighthouse:live`.

