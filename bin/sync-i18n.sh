#!/usr/bin/env bash

# sync-i18n.sh
# Copies locale files from src/i18n/locales to public/i18n/locales
# This ensures translation files are accessible at runtime via fetch()

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

SOURCE_DIR="src/i18n/locales"
TARGET_DIR="public/i18n/locales"

echo -e "${BLUE}Syncing locale files...${NC}"

# Create target directory if it doesn't exist
mkdir -p "$TARGET_DIR"

# Remove existing files to ensure clean sync
rm -rf "$TARGET_DIR"/*

# Copy all locale files
cp -r "$SOURCE_DIR"/* "$TARGET_DIR"/

# Count files synced
FILE_COUNT=$(find "$TARGET_DIR" -type f | wc -l | tr -d ' ')

echo -e "${GREEN}✓ Synced ${FILE_COUNT} locale files to ${TARGET_DIR}${NC}"
echo -e "${BLUE}Structure:${NC}"
tree "$TARGET_DIR" -L 3 2>/dev/null || find "$TARGET_DIR" -type f | sort

echo -e "${GREEN}✓ i18n sync complete${NC}"
