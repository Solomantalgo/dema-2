# Dema Language Solutions — homepage demo brief

This file is the standing source of truth for the Dema homepage demo and later approved changes. Read it before editing the site. The latest direct user request takes precedence over this file; update this file when an approved design or content decision changes so the next agent can work from one current brief.

## 1. Goal and scope

Build a polished, responsive **homepage only** for Dema Language Solutions. The purpose is a client demo that shows a compelling design direction and a credible path to requesting language services. Quality of the homepage matters more than the number of pages.

- Do not create separate routed pages yet. The header and footer navigation must use anchors to real homepage sections.
- Do not show dead buttons or pretend that a backend form submitted a request. The primary quote action should lead to the contact section; email and phone actions should use working `mailto:` and `tel:` links.
- Implement the full homepage represented by the eight section references, with enough polish to present to the client.
- Use **Vite + React + TypeScript** for this new project. Build reusable React components for the homepage sections and interactions. Use plain CSS with custom properties for the visual system; add a small focused dependency only when it clearly improves the result. Keep the implementation easy to extend into a full site later.
- Do not deploy, publish, or build additional pages unless the user asks.

## 2. Business and audience

Dema is a Uganda based language consultancy, not primarily a language learning app. Its public site describes translation, interpretation, editing and proofreading, audio/video transcription, website and app localization, and language teaching. The homepage should address individuals and organisations who need clear communication across languages, with a strong emphasis on Ugandan language expertise.

Reference for factual service, team, client, and contact information: <https://demalanguages.com/>. Verify uncertain details against the current public site or ask the user before presenting them as facts. Do not invent testimonials, statistics, certifications, language counts, turnaround promises, or project outcomes.

## 3. Reference hierarchy

The agent has access to the following local references. **Use the images for composition and visual rhythm, not as final page screenshots.** Rebuild every section as real responsive HTML/CSS/components.

1. **Active hero direction:** `plan/hero-iteration/options/02-conversation-lens.png` is the selected desktop/mobile hero design. The supplied `images/logo.png` and existing site photos are authoritative assets; the generated logo and people inside the mockup are visual placeholders. `plan/brand-hero-violet-red.png` remains a secondary palette reference.
2. **Active service finder direction:** `plan/finder-iteration/options/03-decision-path.png` is the selected desktop/mobile design for `#find-service`. It supersedes the earlier `plan/section-concepts/03-service-finder.png` composition. Recreate its choices, result panel, and graphic accents as real React/CSS; do not paste the mockup into the page.
3. **Active header logo-area direction:** the logo treatment shown in `plan/directory-iteration/options/02-editorial-cards.png` replaces the earlier `plan/logo-iteration/options/03-contrast-tab.png`. Follow section 17. The actual `images/logo.png` is authoritative; any logo rendition inside the generated mockup is illustrative only.
4. **Active Language expertise direction:** `plan/language-iteration/options/02-atlas-diptych.png` is the selected desktop/mobile layout for the introductory part of `#languages`. Follow section 16. It supersedes the earlier `plan/section-concepts/04-languages.png` composition for that part of the section.
5. **Active searchable directory direction:** `plan/directory-iteration/options/02-editorial-cards.png` is the selected desktop/mobile layout for `#language-directory`. Follow section 17. It supersedes `plan/section-concepts/04b-language-directory.png` for composition while preserving the existing data and behavior.
6. **Layout and section composition:** the eight images in `plan/section-concepts/`, in numeric order. Each shows desktop on the left and mobile on the right:
   - `01-hero.png`
   - `02-services.png`
   - `03-service-finder.png`
   - `04-languages.png`
   - `05-process.png`
   - `06-team.png`
   - `07-clients.png`
   - `08-contact-footer-v2.png` (use this corrected version)
   - `04b-language-directory.png` is an additional reference for the new searchable district–language directory within section 04. It uses the correct violet/red palette and shows the required desktop/mobile search layout.
7. **Real brand and team assets:** `images/logo.png` and the three supplied photos listed below. These override any invented logos, faces, names, or contact details visible in generated mockups.
8. **Generated supporting photography:** `images/generated/`. These are illustrative models/scenes and must never be presented as Dema staff or a documentary record of Dema projects.

The older green/yellow section images specify layout, spacing, typography scale, and responsive composition. **Do not carry their green/yellow palette into the build.** Use the violet/red logo based palette below throughout all sections. Treat the references as visual targets: match their major proportions, image placement, section density, card size, type hierarchy, colour blocking, and desktop/mobile composition. Reuse the ideas as real responsive components, with changes only for factual accuracy, accessibility, and the supplied assets. Merely repeating the section order and text does not satisfy the brief.

## 4. Asset inventory and use

| File | Use |
| --- | --- |
| `images/logo.png` | Exact supplied Dema logo. Preserve its pixels and proportions; do not redraw or recolor it. It already contains “DEMA,” so pair it with “Language Solutions” if adding live text. |
| `images/Dr.Kawalya Deo.jpg` | Team portrait for Dr. Kawalya Deo. |
| `images/Dr. Medadi Ssentanda.jpg` | Team portrait for Dr. Medadi Ssentanda. |
| `images/Ms. Winnie Nakatuddde.jpg` | Team portrait for Ms. Winnie Nakatuddde. The public site identifies her as Administrative Assistant. Do not invent roles for the two doctors. |
| `images/generated/hero-conversation.png` | Illustrative hero photo; use in the organic desktop/mobile image mask. |
| `images/generated/document-review.png` | Supporting process/document image. |
| `images/generated/interpretation-meeting.png` | Supporting image for interpretation or language expertise. |
| `images/generated/services-consultation.png` | **Approved Services direction** photo asset generated for the photo-led layout. Illustrative models, never Dema staff. Browser variants: `public/assets/services-720.webp` and `services-1440.webp`. |
| `images/kampala-city-source.jpg` | Genuine Kampala city photograph by Dr. S-mon, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:View_of_Kampala_city_1.jpg), CC BY 4.0. Keep attribution and licence link visible in the Language expertise section. Browser variants: `public/assets/kampala-720.webp` and `kampala-1440.webp`. |
| `public/assets/uganda-outline.svg` | Accurate Uganda outline derived from Natural Earth public-domain geometry in `data/uganda-natural-earth.geojson`. Do not add unverified district/language pins. |

Use the supplied portraits as actual team images. Their source lighting and framing differ; normalize their display through consistent crop, aspect ratio, background, and CSS treatment without changing faces or identities. Use descriptive alt text. Optimize all large images for the browser and provide responsive sizes/lazy loading where appropriate; retain the original files.

The real logo is only 274 × 285 pixels and has transparent edges. Size it carefully so the wordmark remains legible, particularly on mobile. Avoid placing it directly over a dark or busy image.

## 5. Visual system

Keep the selected concept's warm, human, approachable character: generous cream space, bold friendly typography, rounded photo masks, soft organic curves, and a confident primary action. Let the logo set the colours.

Suggested CSS tokens (fine tune for the actual implementation while retaining contrast):

| Token | Value | Use |
| --- | --- | --- |
| `--brand-violet` | `#2D0C56` | Headlines, dark panels, navigation text |
| `--brand-violet-deep` | `#210769` | Logo related accent, deep surfaces |
| `--brand-red` | `#F22020` | Exact logo red; small graphic accents |
| `--action-red` | `#C91F2E` | Accessible red button with white text |
| `--canvas` | `#FFF9F5` | Main warm background |
| `--surface` | `#FFFFFF` | Cards |
| `--lilac` | `#F2EAF7` | Soft alternate section background |
| `--peach` | `#FBE7DF` | Organic accents |
| `--ink` | `#231B27` | Body copy |
| `--muted` | `#625867` | Supporting copy |

White on `#C91F2E` and white on `#2D0C56` have sufficient contrast for normal text. Use a modern humanist sans family with strong heading weights; avoid ultra condensed, playful classroom, or generic technology styling. Use a restrained max-width grid around 1200–1280 px, consistent section padding, and responsive type with `clamp()`. Do not create a rainbow of new accents or a dark blue theme.

## 6. Homepage sections and copy

Build in this order. The quoted copy is the working content; adjust minor wording only to improve factual accuracy or readability, and record material changes here.

### 01 — Header and hero (`#top`)

- Header: supplied logo plus “Language Solutions” live text if needed; anchors Home, Services, Languages, About, Contact. On mobile use a compact accessible menu. Use a subtle sticky header only if it does not cover anchored headings. Section 17 controls the header brand lockup and bottom-edge treatment; preserve the other approved navbar behavior.
- H1: **Every word opens a connection.**
- Subcopy: **Professional translation, interpretation and localization for people and organisations across Uganda.**
- Primary action: **Request a Quote** → `#contact`.
- Secondary action: **Explore Services** → `#services`.
- Place `hero-conversation.png` in an organic rounded crop with both faces visible on desktop and mobile. A small secondary document crop is optional; reuse `document-review.png` rather than inventing a new photo.
- The proof edge may show a few real client names as text; do not use anonymous fake logo marks from the mockup.

### 02 — Services (`#services`)

- Eyebrow **What we do**; heading **Language support for every message**.
- Six concise services: Translation, Interpretation, Localization, Transcription, Editing & Proofreading, Language Teaching. Follow the approved photo-led layout in section 13.
- Every service row needs one useful sentence and a functional interaction. Row clicks may set the service finder selection or scroll to contact with the relevant service in a prefilled mailto subject; do not link to nonexistent pages. Do not restore the old generic icon cards.

### 03 — Service finder (`#find-service`)

- Heading **What do you need to communicate?**
- Four accessible selector choices: Document, Live Event, Recording, Website.
- Map choices to Translation, Interpretation, Transcription, Localization. Change the result card content in place when a choice is selected. Support keyboard interaction, visible focus, and `aria` state.
- Result CTA goes to `#contact`. The widget is client-side only and needs no API or persistence.
- Follow the approved decision-path layout and implementation requirements in section 14. Use text-led choice rows and a prominent result panel; remove the current generic icons from this section.

### 04 — Language expertise (`#languages`)

- Heading **Rooted in Uganda. Connected through language.**
- Explain Dema's local language knowledge in one short paragraph. Display example language names from its current site, such as Luganda, Runyankore, Acholi, and Lusoga. Phrase these as examples, not an exhaustive coverage claim.
- Use the approved **Atlas diptych** composition in `plan/language-iteration/options/02-atlas-diptych.png` for the introductory visual: a deep violet Uganda map panel paired with a genuine Kampala photograph on desktop, stacked on mobile. The real `images/kampala-city-source.jpg` / optimized WebP variants and `public/assets/uganda-outline.svg` are authoritative; the generated photo and map inside the concept board are visual placeholders. Keep the visible Kampala photo attribution and licence link. Do not add decorative pins, district boundaries, or language-to-district placements that imply unverified coverage. Keep the photo and map legible on mobile without horizontal overflow. Section 16 gives precise requirements.
- **Ask about your language** links to contact.
- Add a searchable directory **within this homepage section** using `data/dema-district-languages.json`, with the selected `plan/directory-iteration/options/02-editorial-cards.png` as the visual target. The data file transcribes all 93 numbered district/place entries and their 42 distinct language labels from Dema's current homepage. Do not reduce the directory to the four example chips above. Section 17 governs the directory layout.
- Search must work in both directions: a district/place query reveals its languages, and a language query reveals every matching district/place in the dataset. Provide visible controls for All, Districts / places, and Languages; show a result count, a clear-query control, an empty state, and an accessible way to browse **every** record (for example progressive “Show more” rows). Do not silently cap results.
- Matching should be case-insensitive and accent/punctuation tolerant so queries such as `Pokot`, `Pökoot`, `Ma'di`, and `Ngakarimojong` can find the published spellings. Preserve the published display spelling in results. Build the reverse language-to-places index from the dataset rather than maintaining a second inconsistent list.
- Use the neutral label **district / place** because the source list contains place labels that are not current administrative districts. A short note should say the directory is based on Dema's published list and visitors can contact Dema to confirm local requirements. Do not describe it as a complete official Uganda district register or as proof of service availability in every listed place.
- Required spot checks: `Jinja` → Lusoga; `Gulu` → Acholi; `Mbarara` → Runyankore; `Lusoga` → all matching published places; `Pokot` → Nakapiripirit; clearing search restores browse results. Verify 93 places are reachable and the reverse index exposes every distinct language label.
- Extend `qa/check.mjs` with these search cases when implementing the directory. Its existing viewport loop already checks document scroll width; preserve that check and make the script exit nonzero on any search or overflow failure.

### 05 — Approach (`#approach`)

- Heading **A clear path from request to result**.
- Three steps: Share your brief → Agree the approach → Receive your work. Keep the descriptions practical and avoid guaranteed timelines.
- Use `document-review.png` in a rounded image area. Motion can gently reveal the connector and steps.

### 06 — Team (`#team`)

- Heading **People who know the power of language**.
- Use the three real supplied portraits and exact names in the asset table. Do not use the silhouette placeholders from the concept image in the finished demo.
- Use “Administrative Assistant” for Ms. Winnie Nakatuddde only if retaining the current public-site wording. Do not invent titles or biographies for the others.
- This is an on-page section. Any “Meet the team” link should anchor here rather than route to a missing page.

### 07 — Clients (`#clients`)

- Heading **Trusted for meaningful work** or a simpler **Our clients** if the former does not fit the composition.
- Use a restrained typographic grid of selected names currently listed on Dema's public site: AFAAS, Penal Reform International, Marie Stopes Uganda, Justice Centres Uganda, Uganda Law Society, FHI 360. These are text labels, not reproduced official logos.
- Confirm client list and logo permissions with Dema before a public production launch. Do not add testimonials or performance numbers.

### 08 — Contact CTA and footer (`#contact`)

- Heading **Let’s bring your message to more people.**
- Short copy invites a project enquiry.
- Quote action uses `mailto:info@demalanguages.com` with a useful subject. Provide a direct **Email Dema** link and `tel:+256702442470`. Show Kampala, Uganda rather than an unverified full street address.
- Footer repeats useful in-page anchors and the real logo. Use the current year dynamically. No fake social links, privacy page, or terms page.

## 7. Responsive and interaction requirements

- Desktop should feel spacious and editorial; mobile is a designed layout, not a compressed desktop screenshot. Test common widths around 1440, 1024, 768, 390, and 320 px. **No viewport may have horizontal page overflow.** Do not hide layout bugs with `overflow-x: hidden` on the page; fix the oversized element, grid, image, text, or control causing the overflow. Long language and place names must wrap or truncate accessibly without clipping essential text.
- Keep mobile H1, value proposition, and primary CTA prominent before or near the start of the hero photograph.
- Use subtle entrance motion (short fade/translate), quiet card hover/focus feedback, and a responsive menu transition. Keep movement purposeful and under control; avoid continuous animation, distracting parallax, and text scrambling.
- Honor `prefers-reduced-motion` by removing nonessential motion. Keep navigation and service finder usable without animation.
- Anchor targets need scroll margin for a sticky header. Menu closes after selection and supports Escape where appropriate.

## 8. Quality bar and validation

- Use semantic landmarks, one H1, sensible heading levels, descriptive alt text, visible keyboard focus, and adequate text contrast. Touch targets should be comfortable on mobile.
- Set page title, meta description, favicon treatment if appropriate, and social preview metadata without inventing claims.
- Do not use placeholder lorem ipsum, broken images, generic fake logos, empty destinations, or dead controls. Real team photos and real logo must appear.
- The first viewport should communicate what Dema does within seconds. Every later section adds a different reason to understand or trust Dema, then leads to contact.
- Run the project's build and relevant checks. Capture full-page QA screenshots at **1440, 1024, 768, 390, and 320 px** after the final code change, save them in `qa/`, and inspect them against the desktop/mobile reference image for every section. Fix visible differences and recapture until the final screenshots reflect the delivered code. At every width, verify `document.documentElement.scrollWidth <= window.innerWidth` and inspect the screenshot for any clipped controls or text. Check all anchors, menu states, service selector states, district/language search and filters, mailto, and tel links.
- **Include clickable links to the final QA screenshots in every implementation handoff**, along with what changed, how it was verified, any deliberate differences from the references, and any content/asset approvals still needed for a production launch. Do not report visual QA complete without providing the screenshots.

## 9. Visual correction priorities from the 2026-11-17 QA review

The initial implementation has QA captures in `qa/home-1440.png`, `qa/home-1024.png`, `qa/home-768.png`, `qa/home-390.png`, and `qa/home-320.png`. Review these before the next visual revision. They use the correct brand palette and real assets but drift from the approved references in these ways:

1. **Hero:** Follow the selected conversation-lens direction in section 12. Keep the circular photo treatment; the rejected long-line/organic-mask experiment must not return.
2. **Mobile hero:** Follow the desktop/mobile pairing in `plan/hero-iteration/options/02-conversation-lens.png` and the acceptance criteria in section 12.
3. **Services:** Historical review of the initial generic card layout. The selected photo-led direction in section 13 now controls this section.
4. **Service finder:** Historical review of the initial icon-card selector. The selected decision-path direction in section 14 now controls this section. Keep the working selector and readable type.
5. **Language and approach:** The earlier language visual review is historical; the approved Atlas diptych in section 16 now controls the Language expertise introduction. The current approach is a plain vertical list even on desktop; `05-process.png` shows a connected horizontal three-step story on desktop and a vertical path on mobile.
6. **Team, clients, and CTA:** Retain the real portraits and client names. Compare card proportions and breathing room with `06-team.png` and `07-clients.png`. Give the closing contact band the stronger organic shape and prominent red quote action shown by the logo-based palette and `08-contact-footer-v2.png` structure.

Do not copy the mockups pixel for pixel when that would harm accessibility or use false imagery. Do close the above visual gaps and document any necessary deviations with the final screenshots.

## 10. Later change workflow

For every future change: read this file, inspect the affected section reference and actual asset, implement the new user instruction, verify desktop and mobile impact, and update this brief when the decision changes the standing design/content rules. Keep the eight concept boards accessible in `plan/section-concepts/`; do not delete or move them. Treat generated mockups as visual references and the real assets/factual copy as the implementation authority.

## 11. Rejected hero experiment — history

The user rejected the asymmetric organic photo mask and long red line in `plan/hero-iteration/rejected-desktop-organic-line.png`. The hero was returned to its circular-photo baseline. Do not reintroduce that rejected treatment.

## 12. Approved hero and navbar direction

The user selected `plan/hero-iteration/options/02-conversation-lens.png` and has accepted the implemented hero. Preserve its circular photo composition, supplied logo, copy, actions, and navbar while changing later sections. Preserve the district–language search.

### Hero design

- Retain the large circular photo and small overlapping round document detail. Add two thin violet/lilac concentric rings and a subtle peach half-disc behind the photo, following Option 02. Keep both faces and the document visible at all widths. Do not switch back to an organic blob or draw a line from the headline to the image.
- Keep **Every word opens a connection.** as the H1, with “connection.” in accessible deep red and the other words in violet. Remove the short red underline for this option. Keep the existing accurate supporting copy.
- Place the two hero buttons on one row when there is room on desktop and stack them with generous tap targets on mobile. Their destinations remain `#contact` and `#services`.
- Add the three small labels **Translation**, **Interpretation**, and **Localization** alongside the photo on desktop and below it on mobile, as shown. Treat them as real controls: selecting one should set the corresponding existing service-finder choice (Document, Live Event, Website) and move focus/scroll to `#find-service`. Provide visible focus and avoid hover effects that imply interaction if a control is disabled.
- Keep a readable client proof strip with AFAAS, Uganda Law Society, and FHI 360 as text, with no invented logos. Prevent tiny mobile text and horizontal overflow.

### Navbar design

- Preserve the real logo at a comfortable size, with Home, Services, Languages, About, Contact anchors and a red quote action on desktop. Give the navigation links a very soft lilac rounded track or similarly restrained surface, with a thin border and subtle depth. Keep generous spacing and an obvious active/hover/focus treatment using a short red indicator. Section 17 controls the header brand lockup; keep the rest of the navbar intact.
- Keep the header sticky with a cream translucent surface that blends into the page. Remove its bottom divider. Add only a soft shadow after scrolling. Keep its height stable while scrolling in either direction; do not shrink it. A gentle blur is acceptable where supported; the header must remain readable without `backdrop-filter`.
- On mobile, keep the logo and menu button balanced. Give the menu button a soft lilac surface and visible focus state. The opened menu should read as a deliberate panel with clear link spacing, not a flat list; preserve Escape and link-selection closing behaviour.

### Recommended motion

- Use a single, short entrance sequence: headline/copy fade up slightly, circular photo settles from a very small scale offset, rings fade or draw in, then the three service labels appear with a small stagger. Aim for roughly 400–800 ms total, with no continuous loops, spinning rings, parallax, or flashing.
- Nav underline and quote-button arrow may move subtly on hover/focus. Respect `prefers-reduced-motion` by showing the final state immediately. Motion must never delay access to the copy or controls.

### Acceptance and handoff

- Compare the final desktop and mobile hero to Option 02. Match its main proportions, circular composition, ring weight, label placement, type emphasis, and proof-strip readability. The navbar may differ from the mockup only to achieve the requested improvement above.
- Verify at 1440, 1024, 768, 390, and 320 px: no horizontal overflow, no clipped rings/chips, no hidden faces, legible proof names, and working header/menu/hero/service-label controls. Do not mask overflow with page-level `overflow-x: hidden`.
- Capture fresh hero screenshots at those five widths and full-page QA screenshots at the same widths after the final code change. Include clickable paths in the handoff, plus a short note on the animation and reduced-motion behaviour.

## 13. Approved Services direction — photo-led

The user approved `plan/services-iteration/options/02-photo-led.png` for the Services section. The other two concepts in `plan/services-iteration/options/` are rejected alternatives:

- `01-editorial-index.png` — six numbered text-led entries, no icons.
- `02-photo-led.png` — **selected**: one illustrative people-focused photo plus a compact service list.
- `03-graphic-cards.png` — six cards with service-specific custom graphic motifs instead of stock icons.

Rebuild Option 02 with real responsive React/CSS, not a pasted mockup. Use `images/generated/services-consultation.png` (or its optimized WebP variants) as the Services photo. It shows illustrative models, not Dema staff. Preserve the six factual service names and functional service actions. Desktop places the photo beside a compact vertical service list; mobile places a shallow photo above one full-width column of rows. Do not bring the generic icon cards back.

The photo-led Services layout is implemented in `src/App.tsx` and `src/services-photo-led.css`. The current Kampala/map composition is the Atlas diptych in `src/App.tsx` and `src/language-atlas.css`; its photo credit and CC BY 4.0 licence link sit below the photograph. The asset preparation and source details remain in `plan/services-iteration/ASSETS.md`.

The former clipped mobile capture at `plan/services-iteration/current-mobile-overflow.png` is historical. Its root cause was a `body` minimum width of 320 px when the browser preview was narrower. That constraint has been removed. The page now has additional narrow-screen rules for the service finder heading, team cards, and contact actions. Verify no horizontal overflow at 1440, 1024, 768, 390, 320, and 280 px, including after opening the mobile menu and interacting with the service finder and directory. Fix oversized elements directly; never add page-level `overflow-x: hidden`. Current QA captures are in `qa/`.

## 14. Approved service finder direction — decision path

The user selected `plan/finder-iteration/options/03-decision-path.png`. It has been implemented in `src/App.tsx` and `src/finder-decision-path.css`, replacing the generic four-icon-card finder. It supersedes the older finder board `plan/section-concepts/03-service-finder.png`. The other two concepts in `plan/finder-iteration/options/` are exploration only. See `plan/finder-iteration/agent-brief.md` for the detailed implementation prompt.

- Keep the deep violet section, current heading, helper copy, and four existing choices. On desktop, show a left column of four substantial text-led choice rows and a large cream result panel on the right. On mobile, stack all four compact full-width rows above the result panel. Preserve generous readable type at 280, 320, and 390 px.
- Choice labels remain **Document**, **Live Event**, **Recording**, **Website**. Optional prompt fragments beneath them may read “A file to translate?”, “A conversation to connect?”, “Audio to turn into text?”, and “A site for a new audience?”. They are decision cues, not new service claims.
- The selected row uses a peach surface, clear red edge, and visible selection mark. A short connector from the selected row to the result panel may be built with CSS on wide screens only; keep it contained within the section and avoid horizontal overflow. Do not use generic Lucide icons or imagegen-cropped icons in this section.
- The result panel updates in place for all four choices. Preserve the current mapping and factual result copy: Document → Translation, Live Event → Interpretation, Recording → Transcription, Website → Localization. The decorative paper/letterform layers in the reference are non-factual CSS or code-native SVG, `aria-hidden`, and must never obstruct text or the **Request a Quote** button. The button continues to `#contact`.
- Preserve real button semantics, `aria-pressed`, keyboard and visible focus behaviour, live result announcement, and the hero service-label controls that select a finder choice. The selected state must remain understandable with reduced motion or without animation. If adding motion, use a short change of background/position or connector reveal, and honor `prefers-reduced-motion`.
- Do not change the accepted hero, photo-led Services section, Kampala/map visual, or searchable district/language directory while implementing this finder iteration, except where a shared overflow fix is necessary.
- Capture section screenshots with all four choices and the entire result panel visible at 1440, 1024, 768, 390, 320, and 280 px. Capture full-page QA screenshots after the final code change and provide clickable paths. Run the build and interaction/overflow checks; fix screenshot-visible clipping, overlap, and small text before reporting completion.

## 15. Superseded header logo area — contrast tab

Historical reference only. The user later selected the more open logo treatment in `plan/directory-iteration/options/02-editorial-cards.png`. Section 17 replaces every implementation instruction in this section, including the cream tile border and red baseline.

The user selected `plan/logo-iteration/options/03-contrast-tab.png` for the **header brand area only**. The board shows close-up desktop and mobile concepts; interpret its proportions within the actual sticky header. The real `images/logo.png` must be used unchanged. The generated logo rendition inside the board is never a replacement asset. `plan/logo-iteration/agent-brief.md` contains the detailed handoff.

- Build a compact horizontal two-part lockup: a warm cream/off-white tile for the original logo on the left, connected to a deep violet panel on the right with white, live two-line **Language** / **Solutions** text. Add a thin red baseline beneath the violet panel, as in the reference. Use restrained corner rounding, a fine edge, and minimal shadow. Keep the mark's red **DEMA** lettering visible; do not add a second live “DEMA” word.
- Historical implementation used a header variant of `Brand`; the active open styling is now in `src/header-open-lockup.css` under section 17. Preserve the footer's original brand treatment and working link.
- Fit the actual navbar rather than expanding it around the mockup. Aim for a brand group around 250–280 px wide and 66–74 px high on spacious desktop, with a compact mobile version around 170–205 px wide and 54–60 px high. Adjust at 1024, 768, 390, 320, and 280 px so the menu toggle, nav links, quote button, and sticky header have space. Do not clip or distort the logo or wordmark, shrink the logo so far that “DEMA” disappears, or trigger horizontal overflow.
- Keep the whole lockup as the existing `#top` home link, with a meaningful accessible name and visible keyboard focus. The white wordmark on deep violet must remain legible. Treat the red baseline as decorative; any hover feedback should be subtle and respect reduced motion.
- Preserve the approved hero, navigation track, quote action, mobile menu behaviour, service finder, Services, language directory, and all other sections. This decision does not authorize a whole-navbar redesign.
- Capture close-up header screenshots at 1440, 1024, 768, 390, 320, and 280 px, both initial and where useful after scroll/mobile menu open. Capture full-page QA screenshots after final changes, check for overflow at every width, run build and browser interaction checks, inspect the screenshots, and include clickable paths in the handoff. Do not deploy.

## 16. Approved Language expertise introduction — Atlas diptych

The user selected `plan/language-iteration/options/02-atlas-diptych.png` for the visual introduction in `#languages`. It is implemented in `src/App.tsx` and `src/language-atlas.css` above the searchable directory. The other boards in `plan/language-iteration/options/` are exploration only; section 17 controls the directory layout. Detailed introduction requirements are in `plan/language-iteration/agent-brief.md`.

- Preserve the existing section heading, short factual paragraph, **Ask about your language** action to `#contact`, and four example names: Luganda, Runyankore, Acholi, Lusoga. Label them as examples from Dema, never as a complete coverage list. Give the text clear space above the visual pair, with the red action visible before or near the panels.
- Desktop: create two substantial side-by-side panels of comparable visual weight beneath the introduction. The left deep-violet atlas panel contains the accurate pale lilac/peach Uganda silhouette and the four example language labels grouped at its base. The labels are a separate list, **not pins or positions on the map**. The right panel shows the genuine Kampala photograph with a restrained rounded crop. Keep the city scene visible rather than filling the panel mostly with sky.
- Mobile: stack the map panel above the city photograph in one column. Keep the map recognisable and the four names readable at 390, 320, and 280 px. Keep the photo caption and credit below the photograph; do not overlay them with the map or crop them away. Maintain an efficient vertical rhythm before the directory begins.
- Use `public/assets/uganda-outline.svg` and `images/kampala-city-source.jpg` or `public/assets/kampala-{720,1440}.webp`. The concept board's rendered map/photo are not final assets. The Kampala photo is by Dr. S-mon, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:View_of_Kampala_city_1.jpg), CC BY 4.0. Preserve visible attribution and a working source/licence link. Use useful alt text for the photo and map. No unverified district/language markers, coverage claims, or invented location information.
- Preserve the entire `LanguageDirectory` and its 93 published district/place records, 42 distinct language labels, reverse search, filters, count, clear action, empty state, and all specified spot checks. Do not treat the example labels in the atlas panel as a filter or substitute for the directory unless a fully accessible, correct interaction is explicitly implemented.
- Scope implementation to this Language expertise introduction and directly necessary shared overflow fixes. Preserve the approved hero, logo-area direction, photo-led Services, service finder direction, other sections, and all working anchors. Subtle one-time reveal is acceptable, but keep the section understandable with reduced motion.
- Run build and browser QA. Capture section screenshots at 1440, 1024, 768, 390, 320, and 280 px showing the full intro, both panels, credit, and the start of the directory; capture updated full-page screenshots at those widths. Inspect and fix any clipped map, text, photo credit, or horizontal overflow before handoff. Include clickable screenshot paths. Do not deploy.

## 17. Approved directory and header refinement — editorial cards

The user selected `plan/directory-iteration/options/02-editorial-cards.png` for the searchable directory in `#languages` and its open header logo treatment. It is implemented in `src/LanguageDirectory.tsx`, `src/directory-editorial.css`, and `src/header-open-lockup.css`; the footer brand remains unchanged. `plan/directory-iteration/agent-brief.md` is the focused handoff. The two other boards in that folder are rejected alternatives. The selected board supersedes `plan/section-concepts/04b-language-directory.png` for directory composition and section 15 for the header brand appearance. Use the board as a desktop/mobile layout target, not as a pasted image.

### Directory presentation

- Keep the current heading, accurate explanatory copy, search, All / Districts / places / Languages filters, clear-query action, result count, empty state, progressive Show more control, and published-source note. Preserve the 93 district/place records, all 42 distinct language labels, the reverse language-to-place index, and punctuation/accent-tolerant two-way search. Do not hardcode the three sample cards from the mockup as the complete directory.
- Use a warm cream section, generous heading space, a large white rounded search field, restrained lilac filter pills with the selected pill in accessible red, and a pale lilac result-count band. On desktop, show a three-column grid of editorial cards with fine violet borders, small red sequence numbers, large place names, a readable language line, and a restrained red bottom rule. On mobile, use one full-width card per row. Numbers must derive from the displayed data order and must not imply an official district ranking.
- For the Languages filter, apply the same card language to each distinct language: make the language name the title and list **all** matching published district/place names. Wrap long names and lists without clipping, and keep each card's meaning clear to a screen reader. Result counts and Show more must reflect the selected filter and active query; never silently cap results. Keep controls keyboard accessible with visible focus and adequate touch targets.
- Check `Jinja` → Lusoga, `Gulu` → Acholi, `Mbarara` → Runyankore, `Lusoga` → all matching places, `Pokot` → Nakapiripirit, and clear-query restoration. Ensure all 93 places and 42 language labels remain discoverable. Keep the neutral term “district / place” and the note that visitors should confirm local requirements with Dema.

### Header brand and scrolling

- Apply the open lockup from the selected directory board to the **header only**: actual unchanged `images/logo.png` on the cream header surface, directly joined to a compact deep-violet rounded panel with live white two-line **Language** / **Solutions** text. The logo already contains “DEMA”; do not duplicate it. Remove the old outlined/raised cream logo tile and the red baseline under the violet wordmark. Keep the footer brand unchanged.
- Remove the line/border below the header so it blends into the warm page surface. Retain the existing sticky header, navigation track, active/focus states, quote action, and mobile menu. Keep header height stable when scrolling both down and up; do not shrink it. A subtle soft shadow after scrolling may create separation. Do not remove the top brand accent unless it prevents matching the selected composition.
- Keep the brand as a working `#top` link with a meaningful accessible name and visible focus. Fit it beside desktop navigation and the mobile menu at 1440, 1024, 768, 390, 320, and 280 px. Keep the red “DEMA” mark and white wordmark legible without distortion or horizontal overflow.

### Acceptance

- Scope changes to the directory, header brand, and directly necessary shared layout fixes. Preserve the accepted hero, photo-led Services, decision-path finder, Atlas diptych and Kampala credit, other sections, all section anchors, and existing data behavior.
- Run the build and `node qa/check.mjs`; retain its viewport overflow and directory interaction checks. Verify search, filters, clear, Show more, empty state, menu open/close, scroll header, and keyboard focus. Check `document.documentElement.scrollWidth <= window.innerWidth` at 1440, 1024, 768, 390, 320, and 280 px without hiding page overflow.
- After the final code change, capture and inspect directory screenshots, header close-ups, and full-page QA screenshots at those widths. Fix visible clipping, weak contrast, misalignment, or overflow, then recapture. Include clickable screenshot paths and any deliberate differences from the board in the implementation handoff. Do not deploy.
