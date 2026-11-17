# Agent handoff — selected Services and Language expertise visuals

Read `AGENTS.md` first. The user selected `plan/services-iteration/options/02-photo-led.png` and accepted the existing hero. Continue from the current React implementation. Do not rebuild the homepage or change the hero direction.

## Current work already in the project

- `src/App.tsx` now renders a photo-led Services section: one illustrative image beside six compact service rows on desktop, and image above a one-column list on mobile. Functional service links and finder selection are preserved.
- `src/services-photo-led.css` contains the responsive layout and is imported by `src/main.tsx` after the existing style layers.
- `src/App.tsx` also restores a real Kampala city photograph and Uganda outline in Language expertise. The existing searchable district/language directory remains below them.
- New assets are already available: `images/generated/services-consultation.png`, `public/assets/services-{720,1440}.webp`, `images/kampala-city-source.jpg`, `public/assets/kampala-{720,1440}.webp`, `public/assets/uganda-outline.svg`, and `data/uganda-natural-earth.geojson`. `scripts/prepare-services-assets.py` reproduces optimized assets.
- The Services image is imagegen photography of illustrative models, **not Dema staff**. The Kampala image is a genuine photograph by Dr. S-mon under CC BY 4.0; keep the attribution and link in the rendered section. The Uganda outline uses Natural Earth public-domain geometry. Details are in `ASSETS.md`.

## What to do next

1. Compare the implemented Services section against `plan/services-iteration/options/02-photo-led.png`, at 1440, 1024, 768, 390, and 320 px. Refine proportions, type, photograph crop, service row density, and spacing where necessary. Keep the six service names and concise explanations. Do not reintroduce generic icons or make cards link to nonexistent pages.
2. Inspect `plan/section-concepts/04-languages.png` and polish the Kampala city photo plus Uganda silhouette composition at desktop and mobile sizes. Keep the current violet/red palette and the district/language search below. The map must not imply unverified district coverage or language locations.
3. Find and fix **every actual horizontal overflow source** at the five widths. Check `document.documentElement.scrollWidth <= window.innerWidth`, including after opening the mobile menu, using finder choices, and expanding/searching the language directory. Do not hide overflow with page-level `overflow-x: hidden`. Ensure the Services heading, rows, photo, and Uganda map are fully inside mobile viewports.
4. Run `npm run build` and `node qa/check.mjs` using a local Vite server and Chrome CDP as configured in the project. Confirm that all 93 district/place entries and 42 language labels remain searchable. Preserve accessibility, focus states, reduced motion, real anchors, mailto and tel links.
5. **Provide QA screenshots** of Services and the Language visual at 1440, 390, and 320 px, plus full-page screenshots at 1440, 1024, 768, 390, and 320 px. Review the screenshots before handoff and fix visible cropping, clipping, typography, or alignment problems. Include clickable paths in the report.
6. Update `AGENTS.md` if any final design or content decision changes. Do not deploy or create additional pages.

## Copy-paste agent prompt

> Read `AGENTS.md` and `plan/services-iteration/agent-brief.md`. Continue from the current React code. The chosen Services reference is `plan/services-iteration/options/02-photo-led.png`, and its supplied image is `images/generated/services-consultation.png` with optimized WebP variants in `public/assets/`. Polish the existing photo-led Services implementation and the restored Kampala city photo/Uganda outline in Language expertise. Keep the accepted hero, all six services, functional service finder, and the complete district/language search. Remove every horizontal overflow source at 1440, 1024, 768, 390, and 320 px without masking it. Inspect desktop and mobile screenshots, fix visible issues, run the build and browser QA, and provide QA screenshots for both sections and the full page. Do not deploy or build new pages.
