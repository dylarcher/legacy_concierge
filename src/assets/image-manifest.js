/**
 * Image Asset Manifest
 *
 * This module imports all images used via custom HTML attributes and provides
 * a runtime lookup to resolve original paths to Vite-processed (hashed) URLs.
 *
 * @module image-manifest
 * @see docs/asset-handling.md for usage guidelines
 *
 * @example
 * // In a component:
 * import { resolveImage } from "../../assets/image-manifest.js";
 * const imagePath = this.getAttribute("image");
 * const resolvedPath = resolveImage(imagePath);
 */

import birdsEyeViewOfCoastalTown from "./media/images/birds-eye-view-of-coastal-town.webp";
// Hero banner images
import blueGreenWavesBrownBeach from "./media/images/blue-green-waves-brown-beach.webp";
import topDownViewOfRockyBeach from "./media/images/top-down-view-of-rocky-beach.webp";

// Profile/avatar images
// TODO: Add these imports once the placeholder images are created:
// import placeholderJason from "./media/images/placeholder-jason.webp";
// import placeholderAvatar from "./media/images/placeholder-avatar.webp";

/**
 * Maps original asset paths to Vite-processed (hashed) URLs.
 * Add new entries here when using images via custom HTML attributes.
 *
 * @type {Record<string, string>}
 */
export const imageMap = {
	// Hero banners
	"/assets/media/images/blue-green-waves-brown-beach.webp":
		blueGreenWavesBrownBeach,
	"/assets/media/images/top-down-view-of-rocky-beach.webp":
		topDownViewOfRockyBeach,
	"/assets/media/images/birds-eye-view-of-coastal-town.webp":
		birdsEyeViewOfCoastalTown,

	// TODO: Uncomment once placeholder images are created:
	// "/assets/media/images/placeholder-jason.webp": placeholderJason,
	// "/assets/media/images/placeholder-avatar.webp": placeholderAvatar,
};

/**
 * Resolves an image path to its Vite-hashed URL.
 * Falls back to the original path if not found in the manifest.
 *
 * @param {string} path - Original asset path (e.g., "/assets/media/images/beach.webp")
 * @returns {string} Resolved URL (hashed in production, original in dev)
 *
 * @example
 * const imagePath = this.getAttribute("image");
 * const src = resolveImage(imagePath); // Returns hashed URL in production
 */
export function resolveImage(path) {
	return imageMap[path] || path;
}

// Re-export individual images for direct import use (fallback defaults)
export {
	birdsEyeViewOfCoastalTown,
	blueGreenWavesBrownBeach,
	topDownViewOfRockyBeach,
};
