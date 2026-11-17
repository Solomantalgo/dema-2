# Asset sources and imagegen prompt

## Services photo

- Project source: `images/generated/services-consultation.png`
- Web variants: `public/assets/services-720.webp`, `public/assets/services-1440.webp`
- Generated with the built-in imagegen tool. These are illustrative models, not Dema staff.
- Final prompt: “A high-end photorealistic editorial photograph for the Services section of a Ugandan language consultancy website. Two Ugandan women, one middle-aged in a muted teal blouse and one younger in a warm mustard blazer, working together over an open printed document at a bright Kampala office table. One listens while the other explains a passage. Natural relaxed expressions, candid documentary photography, medium-wide shot with both people visible, warm daylight, understated cream and plant-filled interior. Portrait 4:5 composition suitable for a rounded rectangular crop. No man, burgundy suit, purple blouse, glasses, exact landmarks, readable document text, logos, or text overlay.”

## Kampala city photo

- Project source: `images/kampala-city-source.jpg`
- Web variants: `public/assets/kampala-720.webp`, `public/assets/kampala-1440.webp`
- Source: [View of Kampala city 1.jpg](https://commons.wikimedia.org/wiki/File:View_of_Kampala_city_1.jpg) by Dr. S-mon, 2026. Licence: [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/). The source photograph was resized and cropped by the browser layout; retain visible attribution and the licence link.

## Uganda outline

- Geometry: `data/uganda-natural-earth.geojson`, extracted from [datasets/geo-countries](https://github.com/datasets/geo-countries), whose country geometry comes from [Natural Earth](https://www.naturalearthdata.com/). Natural Earth places the geometry in the public domain.
- Rendered asset: `public/assets/uganda-outline.svg`. The silhouette shows Uganda only. It carries no implied district/language coverage.

`scripts/prepare-services-assets.py` can regenerate the optimized assets from these project sources.
