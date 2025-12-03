#!/usr/bin/env python3
"""
Convert font files to WOFF and WOFF2 formats for better browser support.

Usage:
    python bin/convert-fonts.py [--dry-run]

Requires:
    pip install fonttools brotli zopfli
"""

import os
import sys
from pathlib import Path

try:
    from fontTools.ttLib import TTFont
    from fontTools.ttLib.woff2 import compress as woff2_compress
except ImportError:
    print("Error: fonttools not installed. Run: pip install fonttools brotli")
    sys.exit(1)

# Font directories relative to project root
FONT_DIRS = {
    "sans": ["WorkSans-VariableFont_wght.ttf", "WorkSans-Italic-VariableFont_wght.ttf"],
    "serif": ["PlayfairDisplay-VariableFont_wght.ttf", "PlayfairDisplay-Italic-VariableFont_wght.ttf"],
    "smooth": ["Nunito-VariableFont_wght.ttf", "Nunito-Italic-VariableFont_wght.ttf"],
    "mono": ["SackersGothic-Std_Heavy.otf"],
    "slab": ["Arvo-Regular.ttf", "Arvo-Italic.ttf", "Arvo-Bold.ttf", "Arvo-BoldItalic.ttf"],
}

# Static fonts to convert (in static/ subdirectories)
STATIC_FONTS = {
    "sans/static": [
        "WorkSans-Light.ttf",
        "WorkSans-Regular.ttf",
        "WorkSans-Medium.ttf",
        "WorkSans-SemiBold.ttf",
        "WorkSans-Bold.ttf",
    ],
    "serif/static": [
        "PlayfairDisplay-Regular.ttf",
        "PlayfairDisplay-Medium.ttf",
        "PlayfairDisplay-SemiBold.ttf",
        "PlayfairDisplay-Bold.ttf",
        "PlayfairDisplay-Italic.ttf",
        "PlayfairDisplay-BoldItalic.ttf",
    ],
    "smooth/static": [
        "Nunito-Light.ttf",
        "Nunito-Regular.ttf",
        "Nunito-Medium.ttf",
        "Nunito-SemiBold.ttf",
        "Nunito-Bold.ttf",
    ],
}


def convert_to_woff(input_path: Path, output_path: Path) -> bool:
    """Convert TTF/OTF to WOFF format."""
    try:
        font = TTFont(input_path)
        font.flavor = "woff"
        font.save(output_path)
        return True
    except Exception as e:
        print(f"  Error converting to WOFF: {e}")
        return False


def convert_to_woff2(input_path: Path, output_path: Path) -> bool:
    """Convert TTF/OTF to WOFF2 format."""
    try:
        font = TTFont(input_path)
        font.flavor = "woff2"
        font.save(output_path)
        return True
    except Exception as e:
        print(f"  Error converting to WOFF2: {e}")
        return False


def get_output_name(input_name: str, new_ext: str) -> str:
    """Generate output filename with new extension."""
    stem = Path(input_name).stem
    return f"{stem}.{new_ext}"


def process_font(font_path: Path, dry_run: bool = False) -> dict:
    """Process a single font file, creating WOFF and WOFF2 versions."""
    results = {"woff": None, "woff2": None}
    
    if not font_path.exists():
        print(f"  ⚠️  File not found: {font_path}")
        return results
    
    parent = font_path.parent
    stem = font_path.stem
    
    woff_path = parent / f"{stem}.woff"
    woff2_path = parent / f"{stem}.woff2"
    
    # Convert to WOFF
    if woff_path.exists():
        print(f"  ✓ WOFF exists: {woff_path.name}")
        results["woff"] = "exists"
    elif dry_run:
        print(f"  → Would create: {woff_path.name}")
        results["woff"] = "dry-run"
    else:
        print(f"  → Creating: {woff_path.name}")
        if convert_to_woff(font_path, woff_path):
            size_kb = woff_path.stat().st_size / 1024
            print(f"    Created ({size_kb:.1f} KB)")
            results["woff"] = "created"
        else:
            results["woff"] = "failed"
    
    # Convert to WOFF2
    if woff2_path.exists():
        print(f"  ✓ WOFF2 exists: {woff2_path.name}")
        results["woff2"] = "exists"
    elif dry_run:
        print(f"  → Would create: {woff2_path.name}")
        results["woff2"] = "dry-run"
    else:
        print(f"  → Creating: {woff2_path.name}")
        if convert_to_woff2(font_path, woff2_path):
            size_kb = woff2_path.stat().st_size / 1024
            print(f"    Created ({size_kb:.1f} KB)")
            results["woff2"] = "created"
        else:
            results["woff2"] = "failed"
    
    return results


def main():
    dry_run = "--dry-run" in sys.argv
    
    # Find project root (parent of bin/)
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    fonts_dir = project_root / "src" / "assets" / "fonts"
    
    if not fonts_dir.exists():
        print(f"Error: Fonts directory not found: {fonts_dir}")
        sys.exit(1)
    
    print(f"Font directory: {fonts_dir}")
    print(f"Mode: {'DRY RUN' if dry_run else 'CONVERTING'}")
    print("=" * 60)
    
    stats = {"created": 0, "exists": 0, "failed": 0, "skipped": 0}
    
    # Process variable fonts
    print("\n📁 Variable Fonts")
    print("-" * 40)
    for subdir, files in FONT_DIRS.items():
        dir_path = fonts_dir / subdir
        print(f"\n{subdir}/")
        for filename in files:
            font_path = dir_path / filename
            print(f"  {filename}")
            results = process_font(font_path, dry_run)
            for fmt, status in results.items():
                if status == "created":
                    stats["created"] += 1
                elif status == "exists":
                    stats["exists"] += 1
                elif status == "failed":
                    stats["failed"] += 1
    
    # Process static fonts
    print("\n📁 Static Fonts")
    print("-" * 40)
    for subdir, files in STATIC_FONTS.items():
        dir_path = fonts_dir / subdir
        print(f"\n{subdir}/")
        for filename in files:
            font_path = dir_path / filename
            print(f"  {filename}")
            results = process_font(font_path, dry_run)
            for fmt, status in results.items():
                if status == "created":
                    stats["created"] += 1
                elif status == "exists":
                    stats["exists"] += 1
                elif status == "failed":
                    stats["failed"] += 1
    
    # Summary
    print("\n" + "=" * 60)
    print("Summary:")
    print(f"  Created:  {stats['created']} files")
    print(f"  Existing: {stats['exists']} files")
    print(f"  Failed:   {stats['failed']} files")
    
    if dry_run:
        print("\nRun without --dry-run to create the files.")


if __name__ == "__main__":
    main()
