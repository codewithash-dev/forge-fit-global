# ForgeFitGlobal.com – Main website

Marketing and landing site for **ForgeFit Global** (forgefitglobal.com). Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Run locally

```bash
cd website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deploy (e.g. Vercel → forgefitglobal.com)

1. **Vercel**: Import this repo, set **Root Directory** to `website`, then deploy. Point your domain **forgefitglobal.com** to the Vercel project.
2. **Other hosts**: Run `npm run build` and serve the output from `.next` (or use `next start`). Static export is possible if you add `output: 'export'` in `next.config.ts` and don’t use server-only features.

## Repo structure

- **`/website`** – This app (main site → forgefitglobal.com)
- **`/links-forgefitglobal`** – Linktree-style links page (e.g. links.forgefitglobal.com)
- **Expo app (root)** – Mobile app (FitForge Global)

## Hero video (production)

The hero video is not in the repo (too large). Locally it loads from `public/videos/to-run.mp4` if you add the file there. **On Vercel:**

1. Host the video somewhere (e.g. [Vercel Blob](https://vercel.com/docs/storage/vercel-blob), Cloudinary, or any public URL).
2. In the Vercel project: **Settings → Environment Variables** → add `NEXT_PUBLIC_HERO_VIDEO_URL` with that URL (e.g. `https://xxx.blob.vercel-storage.com/to-run.mp4`).
3. Redeploy so the env is picked up. The hero and “To Run” section will use this URL.

## Customization

- **Copy shared assets**: To use the same logo as the links page, copy `links-forgefitglobal/public/images/logo.png` into `website/public/images/` and use it in the hero (e.g. with `next/image`).
- **Pages**: Add routes under `src/app/` (e.g. `src/app/about/page.tsx`, `src/app/contact/page.tsx`).
- **Content**: Edit `src/app/page.tsx` and layout metadata in `src/app/layout.tsx`.
