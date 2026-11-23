# Mauricio Molina — product-studio portfolio

A responsive, multilingual portfolio built with Next.js App Router, React, TypeScript, and CSS Modules. The page follows the selected dark product-studio artboard with a system-serif heading, charcoal surfaces, lime accent, and products before services.

## Run locally

### Docker (development)

With Docker and Docker Compose running:

```sh
docker compose up
```

Open http://localhost:3000. Source changes reload automatically. Node and npm run inside the container; no local installation is needed. The first run downloads the Node image, and each start installs the locked dependencies with `npm ci`.

Stop with `Ctrl+C`, then run `docker compose down` to remove the container. Dependencies and Next.js build output stay in Docker volumes, separate from local `node_modules` and `.next`.

This setup is for local development, not production deployment. Port 3000 must be available.

### Without Docker

```sh
npm install
npm run dev
```

Open http://localhost:3000. Production commands are `npm run build` and `npm start`.

## Content updates

Update the complete ES/PT/EN copy and the `products`, `services`, and `experience` data in `lib/content.ts`. Product cards are rendered from the product list, so additional projects can be introduced by adding data rather than changing the page structure. Keep claims factual and provide copy for all supported locales.

Language selection starts with Spanish in server-rendered HTML, then detects the browser's preferred supported language after hydration unless a valid manual choice is saved. The selector persists ES/PT/EN when browser storage permits; unavailable storage falls back gracefully.

A restrained CSS-only parallax accent moves decorative rings in the hero and Lymbo visual on supporting browsers. The static design remains the fallback; the effect is gated by scroll-timeline support and the user's reduced-motion preference, and uses shorter travel on small screens.

[Lenis](https://github.com/darkroomengineering/lenis) smooths wheel scrolling and in-page anchor navigation on the document, while touch scrolling stays native. It is disabled when reduced motion is requested, including preference changes while the page is open. Without JavaScript, browser scrolling remains available.

Contact details and professional profiles are in `components/portfolio.tsx`. The experience section offers a CV download from `public/cv-mauricio-molina.pdf`. Replace that file to update the downloadable version; the original root-level PDF is preserved.
