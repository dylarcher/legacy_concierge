# Asset Handling with Vite

This document explains how image assets are handled in the Legacy Concierge project to ensure proper bundling with cache-busting hashes.

## The Problem

Vite automatically processes images in:
- Standard `<img src="...">` attributes
- CSS `url()` declarations
- JavaScript `import` statements

However, Vite **cannot** process images in:
- Custom HTML attributes (e.g., `<hero-banner image="...">`)
- Dynamic paths constructed at runtime
- String literals passed to component attributes

Without proper handling, these images would reference dev paths in production, causing broken images.

## The Solution: Image Manifest

We use a centralized image manifest (`src/assets/image-manifest.js`) that:

1. Imports all images used via custom attributes
2. Creates a lookup map from original paths to hashed URLs
3. Exports a `resolveImage()` function for runtime path resolution

## Usage

### In Components

```js
import { resolveImage } from "../../assets/image-manifest.js";

// In render method:
const imageAttr = this.getAttribute("image");
const image = imageAttr ? resolveImage(imageAttr) : defaultImage;
```

### In HTML

Continue using readable paths in HTML attributes:

```html
<hero-banner image="/assets/media/images/beach.webp"></hero-banner>
```

The component will resolve this to the hashed production URL automatically.

## Adding New Images

When adding a new image that will be used via custom attributes:

1. **Add the import** to `src/assets/image-manifest.js`:

   ```js
   import newImage from "./media/images/new-image.webp";
   ```

2. **Add to the imageMap**:

   ```js
   export const imageMap = {
       // ... existing entries
       "/assets/media/images/new-image.webp": newImage,
   };
   ```

3. **(Optional) Export for direct use**:

   ```js
   export { newImage };
   ```

## Components Using Image Resolution

The following components import and use `resolveImage()`:

| Component | Attribute | File |
|-----------|-----------|------|
| `<hero-banner>` | `image` | `src/blocks/sections/hero.js` |
| `<profile-card>` | `image` | `src/blocks/components/profile.js` |
| `<card-treatment>` | `bg-image` | `src/blocks/components/card-treatment.js` |
| `<ui-card-location>` | `bg-image` | `src/blocks/components/card-location.js` |
| `<team-member>` | `bg-image` | `src/blocks/components/team-member.js` |
| `<section-callout-image>` | `bg-image` | `src/blocks/components/section-callout-image.js` |
| `<dialog-treatment>` | `bg-image` | `src/blocks/components/dialog-treatment.js` |

## How It Works

### Development Mode

In dev mode, Vite serves images from their original locations. The `resolveImage()` function passes through paths that aren't in the manifest, so everything works seamlessly.

### Production Build

During build:
1. Vite sees the `import` statements in `image-manifest.js`
2. Each image gets processed with a content hash (e.g., `beach-abc123.webp`)
3. The manifest maps original paths to hashed URLs
4. Components use `resolveImage()` to get the correct production URLs

## Fallback Behavior

If an image path isn't in the manifest, `resolveImage()` returns the original path unchanged. This provides graceful degradation but won't have cache-busting.

```js
resolveImage("/unknown/path.webp"); // Returns "/unknown/path.webp"
```

## Best Practices

1. **Always add to manifest**: When using images in custom attributes, add them to the manifest
2. **Use direct imports for defaults**: For fallback images, import them directly and use the import reference
3. **Keep paths consistent**: Use the same path format in HTML and the manifest (absolute paths starting with `/assets/`)
