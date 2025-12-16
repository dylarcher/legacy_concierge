#!/bin/bash
# Optimize images for web: resize, compress, and create webp versions
# Usage: ./bin/optimize-service-images.sh [--members]

set -e

# Configuration
MAX_WIDTH=1200
MAX_HEIGHT=1600
QUALITY=82
WEBP_QUALITY=80

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SERVICES_DIR="$PROJECT_ROOT/src/assets/media/images/services"
MEMBERS_DIR="$PROJECT_ROOT/src/assets/media/images/members"

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() { echo -e "${GREEN}✓${NC} $1"; }
log_warn() { echo -e "${YELLOW}⚠${NC} $1"; }
log_error() { echo -e "${RED}✗${NC} $1"; }

# Check dependencies
check_deps() {
    local missing=0
    for cmd in convert cwebp; do
        if ! command -v $cmd &> /dev/null; then
            log_error "Missing: $cmd"
            missing=1
        fi
    done
    if [ $missing -eq 1 ]; then
        echo "Install with: brew install imagemagick webp"
        exit 1
    fi
}

# Get image dimensions
get_dimensions() {
    identify -format "%wx%h" "$1" 2>/dev/null || echo "0x0"
}

# Optimize a single image
optimize_image() {
    local input="$1"
    local filename=$(basename "$input")
    local dir=$(dirname "$input")
    local name="${filename%.*}"
    local ext="${filename##*.}"
    ext=$(echo "$ext" | tr '[:upper:]' '[:lower:]')
    
    # Skip if already processed (webp exists and is newer)
    local webp_output="$dir/$name.webp"
    if [ -f "$webp_output" ] && [ "$webp_output" -nt "$input" ]; then
        echo "  Skipping $filename (already optimized)"
        return
    fi
    
    echo "  Processing: $filename"
    
    # Get current dimensions
    local dims=$(get_dimensions "$input")
    local width=$(echo "$dims" | cut -dx -f1)
    local height=$(echo "$dims" | cut -dx -f2)
    
    # Calculate resize if needed
    local resize_opt=""
    if [ "$width" -gt "$MAX_WIDTH" ] || [ "$height" -gt "$MAX_HEIGHT" ]; then
        resize_opt="-resize ${MAX_WIDTH}x${MAX_HEIGHT}>"
        echo "    Resizing from ${width}x${height}"
    fi
    
    # Optimize original (jpg/png)
    if [ "$ext" = "jpg" ] || [ "$ext" = "jpeg" ]; then
        convert "$input" $resize_opt -quality $QUALITY \
            -strip -sampling-factor 4:2:0 -interlace Plane \
            "$dir/$name.jpg"
        log_info "Created optimized JPG"
    elif [ "$ext" = "png" ]; then
        convert "$input" $resize_opt -quality $QUALITY \
            -strip \
            "$dir/$name.png"
        log_info "Created optimized PNG"
    fi
    
    # Create WebP version
    local webp_input="$input"
    if [ -n "$resize_opt" ]; then
        # Create temp resized version for webp conversion
        local temp_file=$(mktemp).jpg
        convert "$input" $resize_opt "$temp_file"
        webp_input="$temp_file"
    fi
    
    cwebp -q $WEBP_QUALITY -m 6 "$webp_input" -o "$webp_output" 2>/dev/null
    log_info "Created WebP"
    
    # Cleanup temp file
    if [ -n "$resize_opt" ] && [ -f "$temp_file" ]; then
        rm "$temp_file"
    fi
    
    # Show size comparison
    local orig_size=$(stat -f%z "$input" 2>/dev/null || stat -c%s "$input")
    local webp_size=$(stat -f%z "$webp_output" 2>/dev/null || stat -c%s "$webp_output")
    local savings=$((100 - (webp_size * 100 / orig_size)))
    echo "    Size: $(numfmt --to=iec $orig_size 2>/dev/null || echo "${orig_size}B") → $(numfmt --to=iec $webp_size 2>/dev/null || echo "${webp_size}B") (${savings}% smaller)"
}

# Process directory
process_directory() {
    local dir="$1"
    local name="$2"
    
    echo ""
    echo "=== Processing $name ==="
    
    local count=0
    shopt -s nullglob nocaseglob
    for img in "$dir"/*.jpg "$dir"/*.jpeg "$dir"/*.png; do
        [ -f "$img" ] || continue
        # Skip if it's a .webp file
        [[ "$img" == *.webp ]] && continue
        optimize_image "$img"
        ((count++)) || true
    done
    shopt -u nullglob nocaseglob
    
    if [ $count -eq 0 ]; then
        echo "  No images found"
    else
        log_info "Processed $count images"
    fi
}

# Main
main() {
    check_deps
    
    echo "🖼  Image Optimization Script"
    echo "   Max dimensions: ${MAX_WIDTH}x${MAX_HEIGHT}"
    echo "   JPEG quality: ${QUALITY}"
    echo "   WebP quality: ${WEBP_QUALITY}"
    
    # Process services images
    if [ -d "$SERVICES_DIR" ]; then
        for subdir in "$SERVICES_DIR"/*/; do
            [ -d "$subdir" ] || continue
            local name=$(basename "$subdir")
            process_directory "$subdir" "services/$name"
        done
    fi
    
    # Process members if requested
    if [ "$1" = "--members" ] && [ -d "$MEMBERS_DIR" ]; then
        process_directory "$MEMBERS_DIR" "members"
    fi
    
    echo ""
    echo "✅ Optimization complete!"
}

main "$@"
