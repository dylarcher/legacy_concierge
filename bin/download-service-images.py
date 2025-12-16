#!/usr/bin/env python3
"""Download service/treatment images from Legacy Concierge website."""

import json
import os
from urllib.request import urlretrieve

# Page to directory mapping
PAGE_MAP = {
    'specialized-expertise/als': 'als',
    'specialized-expertise/alzheimers': 'alzheimers', 
    'specialized-expertise/dementia': 'dementia',
    'specialized-expertise/diabetes': 'diabetes',
    'specialized-expertise/heart-disease': 'heart-disease',
    'specialized-expertise/ms': 'ms',
    'specialized-expertise/oncology': 'oncology',
    'specialized-expertise/ostomy': 'ostomy',
    'specialized-expertise/parkinsons': 'parkinsons',
    'specialized-expertise/stroke': 'stroke',
    'specialized-expertise/tbi': 'tbi',
    'concierge-treatments/cardiac-pulmonary': 'cardiac',
    'concierge-treatments/eating-disorders': 'eating',
    'concierge-treatments/iv-infusion': 'iv',
    'concierge-treatments/pain-management': 'pain',
    'concierge-treatments/post-op': 'post-op',
    'concierge-treatments/rehab-addiction': 'rehab',
}

SKIP_PATTERNS = [
    'logo', 'award', 'dummy', 'flourish', 'phone-1.svg', 
    'brightside', 'sollis', 'prenuvo', 'sleep-doc', 'appian', 'wellworth', 'ta.png', 
    'mindfull', 'best-concierge-nursing', 'private-duty-nurses-for-hire', 
    'private-duty-nursing-california'
]

SIZE_SUFFIXES = [
    '-1024x680', '-683x1024', '-684x1024', '-679x1024', '-628x1024', 
    '-682x1024', '-806x1024', '-866x1024', '-600x800', '-500x500',
    '-627x1024', '-819x1024'
]


def should_skip(src: str, alt: str) -> bool:
    """Check if image should be skipped."""
    src_lower = src.lower()
    alt_lower = alt.lower()
    for pattern in SKIP_PATTERNS:
        if pattern in src_lower or pattern in alt_lower:
            return True
    return False


def clean_filename(filename: str) -> str:
    """Remove size suffixes from filename."""
    result = filename
    for suffix in SIZE_SUFFIXES:
        result = result.replace(suffix, '')
    return result


def get_target_dir(page):
    """Get target directory for a page."""
    for pg, dr in PAGE_MAP.items():
        if pg in page:
            return dr
    return None


def main():
    # Find project root
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    
    catalogue_path = os.path.join(project_root, '.extract/media/media-catalogue.json')
    base_dir = os.path.join(project_root, 'src/assets/media/images/services')
    
    # Load catalogue
    with open(catalogue_path) as f:
        data = json.load(f)
    
    downloaded = set()
    count = 0
    
    for img in data['images']:
        page = img['page']
        src = img['src']
        alt = img.get('alt', '')
        
        if should_skip(src, alt):
            continue
        
        target_dir = get_target_dir(page)
        if not target_dir or src in downloaded:
            continue
        
        downloaded.add(src)
        
        filename = src.split('/')[-1]
        clean_name = clean_filename(filename)
        
        target_path = os.path.join(base_dir, target_dir, clean_name)
        
        print(f"Downloading: {filename}")
        print(f"  -> {os.path.relpath(target_path, project_root)}")
        
        try:
            urlretrieve(src, target_path)
            count += 1
        except Exception as e:
            print(f"  ERROR: {e}")
    
    print(f"\n✓ Downloaded {count} images")


if __name__ == '__main__':
    main()
