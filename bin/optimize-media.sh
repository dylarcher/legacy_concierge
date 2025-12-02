#!/bin/bash

# Media Optimization Script for Legacy Concierge
# Optimizes images and videos for web delivery

set -e

MEDIA_DIR="/Users/darcher/Workspaces/legacy_concierge/src/assets/media"
MAX_WIDTH=2000
WEBP_QUALITY=85

echo "🎨 Starting media optimization..."
echo "Media directory: $MEDIA_DIR"
echo "Max width: ${MAX_WIDTH}px"
echo "WebP quality: ${WEBP_QUALITY}%"
echo ""

# Create backup directory
BACKUP_DIR="${MEDIA_DIR}/../media-backup-$(date +%Y%m%d-%H%M%S)"
echo "📦 Creating backup at: $BACKUP_DIR"
cp -R "$MEDIA_DIR" "$BACKUP_DIR"

cd "$MEDIA_DIR"

# Process all PNG images
echo ""
echo "🖼️  Processing PNG images..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

TOTAL_ORIGINAL=0
TOTAL_OPTIMIZED=0
COUNT=0

find images -type f -name "*.png" | sort | while read -r file; do
    COUNT=$((COUNT + 1))
    
    # Get original size
    ORIGINAL_SIZE=$(du -k "$file" | cut -f1)
    TOTAL_ORIGINAL=$((TOTAL_ORIGINAL + ORIGINAL_SIZE))
    
    echo "[$COUNT] $file (${ORIGINAL_SIZE}KB)"
    
    # Get image dimensions
    WIDTH=$(magick identify -format "%w" "$file")
    
    # Calculate new dimensions if needed
    if [ "$WIDTH" -gt "$MAX_WIDTH" ]; then
        echo "  Resizing from ${WIDTH}px to ${MAX_WIDTH}px..."
        magick "$file" -resize "${MAX_WIDTH}x>" -strip -quality 95 "${file}.tmp.png"
        mv "${file}.tmp.png" "$file"
    fi
    
    # Convert to WebP
    WEBP_FILE="${file%.png}.webp"
    echo "  Converting to WebP..."
    cwebp -q $WEBP_QUALITY -quiet "$file" -o "$WEBP_FILE" 2>/dev/null
    
    # Get new sizes
    PNG_SIZE=$(du -k "$file" | cut -f1)
    WEBP_SIZE=$(du -k "$WEBP_FILE" | cut -f1)
    TOTAL_OPTIMIZED=$((TOTAL_OPTIMIZED + WEBP_SIZE))
    
    SAVINGS=$((ORIGINAL_SIZE - WEBP_SIZE))
    if [ "$SAVINGS" -gt 0 ]; then
        PERCENT=$((SAVINGS * 100 / ORIGINAL_SIZE))
    else
        PERCENT=0
    fi
    
    echo "  ✓ PNG: ${PNG_SIZE}KB, WebP: ${WEBP_SIZE}KB (saved ${SAVINGS}KB, ${PERCENT}%)"
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Image optimization complete!"
echo "Backup saved at: $BACKUP_DIR"
echo ""
echo "📹 Video files status:"
find videos -type f -exec du -h {} \;

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Optimization Summary:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Backup created at: $BACKUP_DIR"
echo ""
echo "Image optimization complete!"
echo "Next steps:"
echo "  1. Update HTML files to use WebP with PNG fallback"
echo "  2. Remove redundant video formats (.mov, .ogv)"
echo "  3. Test all pages to ensure images load correctly"
