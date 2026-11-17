"""Prepare the selected services photo, Kampala photo, and Uganda outline."""

import json
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public" / "assets"
ASSETS.mkdir(parents=True, exist_ok=True)


def webp(source: Path, stem: str, widths: tuple[int, ...]) -> None:
    with Image.open(source) as image:
        image = image.convert("RGB")
        for width in widths:
            size = (width, round(image.height * width / image.width))
            image.resize(size, Image.Resampling.LANCZOS).save(
                ASSETS / f"{stem}-{width}.webp", "WEBP", quality=82, method=6
            )


webp(ROOT / "images" / "generated" / "services-consultation.png", "services", (720, 1440))
webp(ROOT / "images" / "kampala-city-source.jpg", "kampala", (720, 1440))

feature = json.loads((ROOT / "data" / "uganda-natural-earth.geojson").read_text(encoding="utf-8"))
ring = feature["geometry"]["coordinates"][0]
longitudes = [point[0] for point in ring]
latitudes = [point[1] for point in ring]
min_x, max_x = min(longitudes), max(longitudes)
min_y, max_y = min(latitudes), max(latitudes)
margin = 14
scale = min((320 - margin * 2) / (max_x - min_x), (360 - margin * 2) / (max_y - min_y))
offset_x = (320 - (max_x - min_x) * scale) / 2
offset_y = (360 - (max_y - min_y) * scale) / 2
points = [
    (offset_x + (lon - min_x) * scale, offset_y + (max_y - lat) * scale)
    for lon, lat in ring
]
path = "M " + " L ".join(f"{x:.2f},{y:.2f}" for x, y in points) + " Z"
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 360" role="img" aria-labelledby="title">
<title id="title">Outline of Uganda</title>
<path d="{path}" fill="#2D0C56"/>
</svg>
'''
(ASSETS / "uganda-outline.svg").write_text(svg, encoding="utf-8")
