#!/usr/bin/env python3
"""
Create Coira preview composite with centered logo circle overlay
Similar to Metacube and Bonega preview images
"""

import sys
try:
    from PIL import Image, ImageDraw
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow", "-q"])
    from PIL import Image, ImageDraw

def create_circular_logo_overlay(base_path, logo_path, output_path, circle_size=120, logo_size=80):
    """
    Create a composite image with centered circular logo overlay

    Args:
        base_path: Path to base image
        logo_path: Path to logo image
        output_path: Output path for composite
        circle_size: Diameter of the dark circle background
        logo_size: Size to resize logo to fit within circle
    """
    # Load base image
    base = Image.open(base_path).convert('RGBA')
    print(f"Base image: {base.size[0]}x{base.size[1]}")

    # Load logo
    logo = Image.open(logo_path).convert('RGBA')
    print(f"Logo: {logo.size[0]}x{logo.size[1]}")

    # Resize logo to fit within circle
    logo_ratio = min(logo_size / logo.size[0], logo_size / logo.size[1])
    new_logo_size = (int(logo.size[0] * logo_ratio), int(logo.size[1] * logo_ratio))
    logo = logo.resize(new_logo_size, Image.Resampling.LANCZOS)

    # Create circular background
    circle_img = Image.new('RGBA', (circle_size, circle_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(circle_img)

    # Draw dark circle with slight transparency
    draw.ellipse([0, 0, circle_size-1, circle_size-1], fill=(30, 32, 40, 230))

    # Calculate logo position to center it in the circle
    logo_x = (circle_size - logo.size[0]) // 2
    logo_y = (circle_size - logo.size[1]) // 2

    # Paste logo onto circle
    circle_img.paste(logo, (logo_x, logo_y), logo)

    # Calculate position to center circle on base image
    center_x = (base.size[0] - circle_size) // 2
    center_y = (base.size[1] - circle_size) // 2

    # Composite onto base
    base.paste(circle_img, (center_x, center_y), circle_img)

    # Convert to RGB for saving as PNG (or keep RGBA)
    base.save(output_path, 'PNG', optimize=True)
    print(f"Saved composite: {output_path}")
    print(f"Final size: {base.size[0]}x{base.size[1]}")

if __name__ == "__main__":
    base_path = "/srv/projects/landing-page/public/coira-preview-base.png"
    logo_path = "/srv/projects/landing-page/public/coira-logo.png"
    output_path = "/srv/projects/landing-page/public/coira-preview.png"

    # Match Metacube/Bonega style - larger circle (about 20% of image height)
    create_circular_logo_overlay(base_path, logo_path, output_path, circle_size=280, logo_size=200)
