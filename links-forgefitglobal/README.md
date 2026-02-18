# ForgeFit Global Links

A Linktree-style links page for **links.ForgeFitGlobal.com**.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Add your images to `public/images/`:
   - `logo.png` - Your ForgeFit Global logo (profile avatar)
   - `neon-gym-hexagon.jpg` - Background image (optional; uses gym gradient if missing)

3. Run locally:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Deployment

The `dist/` folder contains the static build. Deploy to:
- **Vercel** – Connect repo, set root to `links-forgefitglobal`
- **Netlify** – Same approach
- **links.ForgeFitGlobal.com** – Point your subdomain to the deployed site

## Assets

Place these files in `public/images/`:
- `logo.png` – ForgeFit Global logo
- `neon-gym-hexagon.jpg` – Background (or remove the backgroundImage style to use solid black)
