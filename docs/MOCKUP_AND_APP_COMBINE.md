# Combining the HTML Mockup with the Forge Fit Global App

## What’s done

- **Color scheme** – The app theme now matches your mockup + logo:
  - **Gold** (`#C9A84C`, light/dark) – primary accent, buttons, glows (matches logo).
  - **Obsidian / charcoal / slate** – backgrounds and cards.
  - **Cream** (`#F5F0E8`) – primary text.
  - **Ember** (`#D4553A`) – secondary accent (e.g. “Log workout”, Forge-style actions).
  - **Sage** (`#6B8F71`) and **Shabbat** (`#7B6EC7`) – available in `theme.ts` for future section-specific UI (Testimony, Shabbat).

All screen gradients and purple/blue accents have been replaced with gold/ember so the app visually aligns with the mockup and logo.

---

## Mockup tabs vs current app

| Mockup tab   | Current app equivalent        | How to combine |
|-------------|---------------------------------|----------------|
| **Scripture** | Home (Daily Scripture card)    | Already aligned: scripture is on home. You can expand with “Reading plans”, “Saved verses” as in the mockup. |
| **Forge**     | Exercises + Trainers          | “Forge” = workouts. Keep Exercises as the main Forge tab; add “Today’s workout”, “This week’s programs”, streak bar from the mockup. Trainers can live under Forge or as a sub-section. |
| **Testimony** | Updates (community feed)     | Same idea: community posts/testimonies. Rename or rebrand “Updates” to “Testimony” and use sage accents. |
| **Shabbat**   | *(new)*                       | Add a new tab/screen for Shabbat: countdown, resources, verse. Use `COLORS.shabbat` / `COLORS.shabbatLight`. |
| **Profile**   | Profile                       | Already similar. Add mockup details: “My Progress”, “Saved Scripture”, “Shabbat Settings”, profile verse. |

---

## Ways to combine

### Option A – Match the mockup’s 5 tabs (recommended)

1. **Bottom nav** – Change to: Scripture (home) | Forge (exercises) | Testimony (updates) | Shabbat (new) | Profile.
2. **Rename screens** – “Home” → Scripture (or keep “Home” but use the mockup Scripture layout). “Updates” → Testimony.
3. **Add Shabbat screen** – New route, e.g. `app/shabbat.tsx`, with countdown, resources, verse. Reuse mockup copy and layout.
4. **Forge screen** – On the Exercises (Forge) screen, add a “Today’s workout” card and streak bar like the mockup; link to existing exercise list and trainers where it fits.

### Option B – Keep current 5 tabs, style like mockup

- Keep: Home | Updates | Exercises | Trainers | Profile.
- Apply mockup styling per section: gold on Home/Scripture, ember on Exercises/Trainers, sage on Updates, shabbat only where you add Shabbat content (e.g. a card on Home or a section in Profile).

### Option C – Copy mockup HTML into a WebView (not recommended)

- You could load the mockup HTML inside a WebView in the app, but then you lose native navigation, Supabase, and real data. Better to reimplement the mockup’s layout and copy in React Native screens (as in Option A).

---

## Theme reference (from mockup)

Already in `constants/theme.ts`:

- `COLORS.primary` / `primaryLight` / `primaryDark` – gold
- `COLORS.ember` / `emberLight` – Forge/workouts
- `COLORS.sage` / `sageLight` – Testimony
- `COLORS.shabbat` / `shabbatLight` – Shabbat
- `COLORS.charcoal`, `COLORS.slate` – cards/backgrounds
- `COLORS.white` – cream text

Use these when adding or restyling screens so the app and mockup stay consistent.
