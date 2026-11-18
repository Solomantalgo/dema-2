# Historical agent handoff — superseded contrast-tab logo area

This brief is retained for design history. The current header direction comes from `plan/directory-iteration/options/02-editorial-cards.png` and is specified in `AGENTS.md` section 17 and `plan/directory-iteration/agent-brief.md`. Do not restore the outlined cream tile, red baseline, or header bottom divider described below.

Read `AGENTS.md`, especially sections 01, 04, 07–08, 12, and 15. The user selected `plan/logo-iteration/options/03-contrast-tab.png`. Current header close-ups are `plan/logo-iteration/current-desktop.png` and `current-mobile.png`. This brief is for implementing the **header brand lockup only**. The planning agent has not changed site code for this decision.

## Required design

1. Recreate the selected concept in real React/CSS: original Dema logo inside a subtle cream tile on the left; attached deep violet panel on the right with white live text on two lines, “Language” and “Solutions”; one thin red baseline beneath the violet panel. Keep the treatment compact, aligned, and calm beside the existing lilac navigation track and red quote CTA.
2. Use `images/logo.png` or its exact existing browser copy. Preserve the source image's proportions, colours, and embedded red “DEMA”. Do not trace, recolour, regenerate, crop the wordmark, or add a duplicate live “DEMA”. The generated logo rendition in the mockup is illustrative only.
3. Maintain an overall brand width that fits the existing header: roughly 250–280 px on wide desktop and 170–205 px on common mobile, tightening further at 280 px if needed. The logo tile should still make “DEMA” readable. Keep the header height close to its current desktop/mobile values. Check the real rendered proportions rather than treating the enlarged concept board as pixel measurements.
4. The `Brand` component in `src/App.tsx` is shared by header and footer. Implement a header variant or scoped classes so the footer brand remains visually and functionally unchanged. Keep the header lockup as one `#top` link with an accessible name, visible focus state, and comfortable touch target.
5. Preserve the rest of the navbar, hero, service finder, photo-led Services, Kampala/map visual, district/language search, footer, and working actions. Do not add routes or deploy.

## QA and acceptance

- At 1440, 1024, 768, 390, 320, and 280 px, inspect the brand next to the actual navigation or menu toggle. Verify no collisions, wrapping beyond two wordmark lines, clipped logo, or horizontal page overflow. Check the sticky state after scrolling and the opened mobile menu.
- Confirm keyboard focus on the brand link and that activating it reaches `#top`. Keep motion subtle and remove nonessential movement for `prefers-reduced-motion`.
- Run `npm run build` and the project browser QA. Capture **close-up header QA screenshots** and fresh full-page screenshots at all six widths after final changes. Inspect and fix visible issues, then provide clickable screenshot paths in the implementation handoff. Do not claim visual QA complete without those screenshots.

## Copy-paste prompt for the builder agent

> Read `AGENTS.md` and `plan/logo-iteration/agent-brief.md`. Implement the selected `plan/logo-iteration/options/03-contrast-tab.png` design for the **header logo area only**. Use the exact supplied logo, in a compact cream tile joined to a deep violet panel with white two-line “Language Solutions” live text and a thin red baseline. Preserve the footer brand and the rest of the accepted navbar and homepage. Make the lockup readable and collision-free at 1440, 1024, 768, 390, 320, and 280 px, including sticky and mobile-menu states. Keep it a working accessible `#top` link. Run build and browser QA, inspect close-up header and full-page screenshots at those widths, provide clickable screenshot paths, and do not deploy.
