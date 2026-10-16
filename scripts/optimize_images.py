"""Recreate display assets from the original PNGs. Requires Pillow (no originals removed)."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1] / "public" / "assets"

portrait = ImageOps.exif_transpose(Image.open(ROOT / "my-photo.png")).convert("RGB")
for width, suffix in [(640, "-640"), (960, "-960"), (portrait.width, "")]:
    output = portrait.resize((width, round(portrait.height * width / portrait.width)), Image.Resampling.LANCZOS)
    output.save(ROOT / f"my-photo{suffix}.webp", "WEBP", quality=94, method=6)

for relative in [
    "projects/worldbox/world-menu-background.png", "projects/luma/build-luma-aura.png",
    "projects/yandex-adblocker/banner.png", "projects/block-yandex-game/logo.png",
    "projects/gamma-cleaner/app_logo.png", "projects/multipulti/screenshot.png",
]:
    source = ROOT / relative
    image = ImageOps.exif_transpose(Image.open(source))
    image.save(source.with_suffix('.webp'), "WEBP", lossless=True, method=6)

for file in ROOT.rglob('*.webp'):
    print(file.relative_to(ROOT), file.stat().st_size)

worldbox = Image.open(ROOT / 'projects/worldbox/world-menu-background.png')
for width in [480, 960]:
    image = worldbox.resize((width, round(worldbox.height * width / worldbox.width)), Image.Resampling.LANCZOS)
    image.save(ROOT / f'projects/worldbox/world-menu-background-{width}.webp', 'WEBP', lossless=True, method=6)
