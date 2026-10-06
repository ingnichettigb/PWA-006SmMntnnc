# PWA Template — SmMntnnc

Reusable PWA landing/redirect template for SaaS apps. Built to deploy as a
static site on Cloudflare Pages (HTTPS required for PWA install).

Current configuration: **SmMntnnc – Smart Maintenance**
→ https://006smmntnnc.corporateboostservice.eu

## How to duplicate this template for a new SaaS

When forking/cloning this project for a new SaaS, change the following:

1. **Icons** — Replace every file in `public/icons/` with your real logo
   exported at sizes: 72, 96, 128, 144, 152, 192, 384, 512 plus
   `apple-touch-icon.png` (180×180) and `favicon.png`.
2. **Manifest** — `public/manifest.json`: update `name`, `short_name`,
   `description`, `background_color`, `theme_color`, `lang`.
3. **SaaS URL** — Update the target URL in `src/routes/index.tsx`
   (constant `SAAS_URL`) so the "Apri" button and auto-redirect go to
   the right place.
4. **Cache name** — `public/sw.js`: bump `CACHE_NAME` (e.g. `myapp-v1`)
   so returning users get a fresh shell.
5. **Meta tags** — `src/routes/__root.tsx` `head()`: update title,
   description, `apple-mobile-web-app-title`, theme-color, OG tags.

## Deploy on Cloudflare Pages

- Build command: `bun run build`
- Output directory: `dist`
- HTTPS is automatic — required for the service worker to register.

## Notes

- The service worker is **disabled in the Lovable preview / dev** and
  only registers on the production domain. Test install behavior on the
  published Cloudflare Pages URL.
- All asset paths are absolute from `/`, so the app works on any
  domain without rewrites.
