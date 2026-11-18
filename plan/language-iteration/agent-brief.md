# Agent handoff — approved Atlas diptych

## Read first

Read `AGENTS.md`, especially sections 04, 07–08, and 16. The selected desktop/mobile visual is `plan/language-iteration/options/02-atlas-diptych.png`. The current before captures are `plan/language-iteration/current-desktop.png`, `current-mobile-top.png`, and `current-mobile-bottom.png`. This generated board is a layout reference; use the supplied real assets in the site. The planning agent has not edited site code for this selection.

## Scope and composition

1. Change only the introductory part of `#languages` above `LanguageDirectory`. Keep the heading “Rooted in Uganda. Connected through language.”, current short factual paragraph, `#contact` action “Ask about your language”, and four language examples. Improve hierarchy and spacing so the introduction flows into the visual pair.
2. Desktop: two panels side by side beneath the introduction. Left: deep violet atlas surface with the accurate Uganda silhouette in a pale lilac/peach fill and four example language names grouped as distinct labels at the base. Right: genuine Kampala photograph in a large rounded crop. Balance panel height and width; keep the photograph's city content visible and avoid a sky-heavy crop. The red contact action belongs near the introduction, not buried below both panels.
3. Mobile: a single column with the atlas panel followed by the Kampala photograph. The example labels must remain legible and must not appear at geographic positions. Show “Kampala, Uganda” and the photo credit/link clearly below the image. Avoid excessive blank space before the searchable directory.
4. Use `public/assets/uganda-outline.svg`, `images/kampala-city-source.jpg`, and/or `public/assets/kampala-720.webp` / `kampala-1440.webp`. Preserve the original Kampala photo source and visible credit: Dr. S-mon, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:View_of_Kampala_city_1.jpg), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The mockup's map and photo are illustrative, not authority. Do not add pins, district borders, asserted language locations, or coverage claims.
5. Keep the directory's 93 places, 42 language labels, two-way search, filters, counts, clear control, empty state, and source note exactly functional. Do not introduce a second manually curated data list. Preserve all other approved homepage sections and working anchors.

## Interaction and QA

- The map can be a static graphic with a descriptive alt/accessible label. It does not need interaction. Treat decorative shape layers as hidden from assistive technology. Keep sufficient contrast for pale map and example labels on violet.
- If adding a reveal, use one short fade/translate; no looping motion. Honor `prefers-reduced-motion`.
- At 1440, 1024, 768, 390, 320, and 280 px, confirm no horizontal overflow, clipped silhouette, photo, credit, language labels, or contact action. Check scroll width before and after directory search/expansion and mobile menu interactions.
- Run `npm run build` and the browser QA. Capture final Language introduction screenshots showing both panels and the start of the directory, plus full-page screenshots, at all six widths. Inspect and correct the screenshots before reporting completion. Include clickable screenshot paths, changed files, test result, and any deliberate reference deviation. Do not deploy.

## Copy-paste prompt for the builder agent

> Read `AGENTS.md` and `plan/language-iteration/agent-brief.md`. Implement the selected `plan/language-iteration/options/02-atlas-diptych.png` direction for the Language expertise introduction above the existing directory. Build a deep-violet Uganda atlas panel beside the real Kampala photograph on desktop, stacking map then photo on mobile. Use `public/assets/uganda-outline.svg` and the supplied Kampala WebP/source image; keep visible Dr. S-mon / CC BY 4.0 attribution. Show Luganda, Runyankore, Acholi, and Lusoga as examples grouped beneath the map, not as geographic pins. Preserve the heading, copy, `#contact` action, all 93 district/place entries, 42 language labels, and working directory search. Keep other approved sections unchanged. Test 1440, 1024, 768, 390, 320, and 280 px, fix horizontal overflow, run build and browser QA, inspect and provide Language-section and full-page QA screenshots at those widths, and do not deploy.
