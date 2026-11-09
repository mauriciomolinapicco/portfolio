# Mauricio Molina — product-studio portfolio

A responsive, multilingual portfolio built with Next.js App Router, React, TypeScript, and CSS Modules. The page follows the selected dark product-studio artboard with a system-serif heading, charcoal surfaces, lime accent, and products before services.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. Production commands are `npm run build` and `npm start`.

## Content updates

Update the complete ES/PT/EN copy and the `products`, `services`, and `experience` data in `lib/content.ts`. Product cards are rendered from the product list, so additional projects can be introduced by adding data rather than changing the page structure. Keep claims factual and provide copy for all supported locales.

Language selection starts with Spanish in server-rendered HTML, then detects the browser's preferred supported language after hydration unless a valid manual choice is saved. The selector persists ES/PT/EN when browser storage permits; unavailable storage falls back gracefully.

A restrained CSS-only parallax accent moves decorative rings in the hero and Lymbo visual on supporting browsers. The static design remains the fallback; the effect is gated by scroll-timeline support and the user's reduced-motion preference, and uses shorter travel on small screens. Content, links, and actions do not animate. No JavaScript scroll handlers or animation dependencies are used.

Contact details and professional profiles are in `components/portfolio.tsx`. The CV is not linked or published by this app.
