# Agent handoff — service finder decision path

## Read first

Read `AGENTS.md`, especially sections 03, 07–08, 12–14. The approved desktop/mobile visual is `plan/finder-iteration/options/03-decision-path.png`. The current before screenshots are `plan/finder-iteration/current-desktop.png` and `current-mobile.png`. The selected image is a composition reference, not an image to paste into the page. The user asked the planning agent for requirements and a prompt; implementation is for the builder agent.

## Scope

Change only the `#find-service` section, its focused styling, and QA needed for this work. Preserve the accepted hero and navbar, photo-led Services, Kampala/map Language expertise, complete 93-place/42-language search directory, other homepage sections, and existing working links. Do not add routes, a backend, or deployment.

## Layout and visual details

1. Keep the deep violet background, warm cream result surface, red action colour, restrained peach selected colour, and current heading “What do you need to communicate?”. Keep helper copy concise and readable.
2. Desktop: place four sizable text choice rows in a left column. Place the dynamic cream result panel in a right column with clearly larger visual weight. Give the selected choice a peach tint, red edge, and visible selection indicator. A short red connecting line can visually link it to the result when the layout has room. Contain that line inside the section; never let it create overflow.
3. Mobile: stack four compact full-width rows above the entire result panel. The panel heading, explanation, and red quote CTA must all remain visible and comfortably readable at 390, 320, and 280 px. No decorative layer may cover them. Do not squeeze the layout into two columns on mobile.
4. Use the four exact control names Document, Live Event, Recording, Website. Supporting prompts may be: “A file to translate?”, “A conversation to connect?”, “Audio to turn into text?”, “A site for a new audience?”. Those are optional microcopy, not new service claims.
5. Remove the current generic icons from the four choices and result panel. Build the reference’s abstract paper/letterform decoration in CSS or inline SVG, with `aria-hidden="true"`. No new bitmap asset is required for this concept. Avoid a heavy illustration, since the result content must remain the focus.
6. Keep the existing result data and mapping. Selecting a choice updates the label, heading, description, and visual state in place. Retain `#contact` as the quote action. Keep the hero service-label shortcuts working.

## Interaction and accessibility

- Use buttons for choices, keep `aria-pressed`, visible focus, and an `aria-live` result. Arrow-key behaviour is optional if semantics remain clear, but Tab/Shift+Tab, Enter and Space must work.
- Keep one active choice. Make its state obvious without relying on colour alone. Any animation should be brief, should not move the whole section, and must disappear under `prefers-reduced-motion`.
- Keep tap targets at least roughly 44 px high. Avoid small prompt text and prevent the heading from clipping at 280 px.
- Keep the selected result visible after choosing an option; do not scroll the user away unexpectedly. Preserve the existing focus handoff from hero shortcuts if present.

## Verification and handoff

- Run `npm run build` and the project browser QA in `qa/check.mjs`. Extend the check where useful to verify all four choice/result mappings, quote anchor, visible focus, and no overflow.
- Test 1440, 1024, 768, 390, 320, and 280 px. Verify `document.documentElement.scrollWidth <= window.innerWidth` on the initial view and after menu, finder, and directory interactions. Fix the actual oversized element rather than hiding overflow at page level.
- Capture fresh **finder section screenshots** at all six widths with all four choices and the full result visible. Capture full-page screenshots at the same widths after the final change. Inspect them and fix visible issues before handoff.
- In the completion report, give clickable screenshot paths, list the changed files, mention tests and any deliberate difference from the reference. No deployment.

## Copy-paste prompt for the builder agent

> Read `AGENTS.md` and `plan/finder-iteration/agent-brief.md`. Implement the approved `plan/finder-iteration/options/03-decision-path.png` service finder as real responsive React/CSS. Replace the generic icon cards with four text-led choice rows and a large dynamic result panel on desktop; stack the rows and panel on mobile. Preserve all four existing choice-to-service mappings, the hero shortcuts, accessible button state, live result, and `#contact` quote CTA. Create any paper/letterform decoration in CSS or inline SVG; do not paste or crop the mockup. Preserve the rest of the accepted homepage. Test 1440, 1024, 768, 390, 320, and 280 px for function and horizontal overflow. Run build and browser QA, provide finder and full-page QA screenshots at those widths, inspect and fix visible issues, and do not deploy.
