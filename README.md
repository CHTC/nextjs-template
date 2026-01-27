# NextJS Static Website Template

Website template using Next.js for use by the CHTC.

Provides a basic structure for building static websites with Next.js.

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

