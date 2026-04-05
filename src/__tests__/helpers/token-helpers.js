/**
 * Test Helper Utilities for Design Token Verification
 *
 * Provides utilities for testing CSS custom properties and computed styles.
 *
 * @module token-helpers
 */

/**
 * Get computed CSS custom property value from :root
 * @param {string} property - CSS variable name (e.g., '--color-primary')
 * @returns {string} Computed value (trimmed)
 */
export function getCSSVar(property) {
	return getComputedStyle(document.documentElement)
		.getPropertyValue(property)
		.trim();
}

/**
 * Get computed style property from an element
 * @param {HTMLElement} element - Target element
 * @param {string} property - CSS property (e.g., 'background-color')
 * @returns {string} Computed value
 */
export function getComputedProp(element, property) {
	return getComputedStyle(element).getPropertyValue(property).trim();
}

/**
 * Parse RGB string to object
 * @param {string} rgb - RGB string (e.g., 'rgb(9, 41, 53)')
 * @returns {{r: number, g: number, b: number} | null}
 */
export function parseRGB(rgb) {
	const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
	if (!match) return null;
	return {
		r: Number.parseInt(match[1], 10),
		g: Number.parseInt(match[2], 10),
		b: Number.parseInt(match[3], 10),
	};
}

/**
 * Parse RGBA string to object
 * @param {string} rgba - RGBA string (e.g., 'rgba(9, 41, 53, 0.5)')
 * @returns {{r: number, g: number, b: number, a: number} | null}
 */
export function parseRGBA(rgba) {
	const match = rgba.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
	if (!match) return null;
	return {
		r: Number.parseInt(match[1], 10),
		g: Number.parseInt(match[2], 10),
		b: Number.parseInt(match[3], 10),
		a: Number.parseFloat(match[4]),
	};
}

/**
 * Convert space-separated RGB values to rgb() string
 * @param {string} spaceRGB - Space-separated values (e.g., '9 41 53')
 * @returns {string} RGB string (e.g., 'rgb(9, 41, 53)')
 */
export function spaceRGBToRGB(spaceRGB) {
	const [r, g, b] = spaceRGB.trim().split(/\s+/);
	return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Wait for next animation frame (useful for style application)
 * @returns {Promise<void>}
 */
export function nextFrame() {
	return new Promise((resolve) => requestAnimationFrame(resolve));
}

/**
 * Wait for specified milliseconds
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise<void>}
 */
export function wait(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Set URL hash and dispatch hashchange event
 * @param {string} hash - Hash value (without #)
 */
export function setHash(hash) {
	window.location.hash = hash;
	window.dispatchEvent(new HashChangeEvent("hashchange"));
}

/**
 * Clear URL hash
 */
export function clearHash() {
	history.replaceState(null, "", window.location.pathname);
}

/**
 * Create and append a style element with CSS
 * @param {string} css - CSS content
 * @returns {HTMLStyleElement} The created style element
 */
export function injectStyles(css) {
	const style = document.createElement("style");
	style.textContent = css;
	document.head.appendChild(style);
	return style;
}

/**
 * Load CSS file content into the document
 * @param {string} path - Path to CSS file
 * @returns {Promise<HTMLStyleElement>}
 */
export async function loadCSS(path) {
	const response = await fetch(path);
	const css = await response.text();
	return injectStyles(css);
}

/**
 * Create a test element with specified classes
 * @param {string} tag - HTML tag name
 * @param {string} classes - Space-separated class names
 * @returns {HTMLElement}
 */
export function createTestElement(tag, classes) {
	const element = document.createElement(tag);
	element.className = classes;
	document.body.appendChild(element);
	return element;
}

/**
 * Clean up test elements and styles
 */
export function cleanup() {
	document.body.innerHTML = "";
	// Remove injected styles
	const styles = document.querySelectorAll("style[data-test]");
	styles.forEach((style) => style.remove());
}

/**
 * Brand color specifications for Legacy Concierge
 * Source of truth for token value assertions
 */
export const BRAND_COLORS = {
	primary: { r: 9, g: 41, b: 53 }, // Dark blue
	secondary: { r: 102, g: 141, b: 142 }, // Teal
	secondaryMuted: { r: 90, g: 130, b: 133 }, // Dark teal
	tertiary: { r: 184, g: 172, b: 159 }, // Tan
	canvas: { r: 255, g: 255, b: 255 }, // White
	canvasInverted: { r: 0, g: 0, b: 0 }, // Black
	text: { r: 35, g: 31, b: 32 }, // Charcoal
	neutral: { r: 79, g: 79, b: 79 }, // Gray
	offWhite: { r: 241, g: 241, b: 241 }, // Cream
	warmCream: { r: 247, g: 243, b: 235 }, // Warm cream
};

/**
 * Convert brand color to RGB string
 * @param {keyof typeof BRAND_COLORS} name - Brand color name
 * @returns {string} RGB string
 */
export function brandColorToRGB(name) {
	const color = BRAND_COLORS[name];
	return `rgb(${color.r}, ${color.g}, ${color.b})`;
}
