# Scroll-Driven Hero Section Animation

This project recreates a premium hero animation with:

- GSAP intro reveal (headline + statistics)
- Smooth scroll-linked visual motion
- Next.js + React + Tailwind stack

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build static output

This repo is configured with static export in `next.config.mjs`, so you can deploy `out/` to GitHub Pages.

```bash
npm run build
```

## Key files

- `app/page.tsx` - hero structure and GSAP animation logic
- `app/globals.css` - visual styling and scene/vehicle design
- `next.config.mjs` - static export config
