/**
 * Router utility for handling navigation with dynamic base URLs
 * Supports both local development and GitHub Pages deployments
 */

/**
 * Base URL from Vite's environment
 * @type {string}
 */
const BASE_URL = import.meta.env.BASE_URL || "/";

/**
 * Checks if a URL is external (different origin or protocol)
 * @param {string} href - URL to check
 * @returns {boolean} True if external
 */
function isExternalUrl(href) {
	if (!href) return false;
	return (
		href.startsWith("http://") ||
		href.startsWith("https://") ||
		href.startsWith("//") ||
		href.startsWith("mailto:") ||
		href.startsWith("tel:")
	);
}

/**
 * Checks if a URL is a hash-only link
 * @param {string} href - URL to check
 * @returns {boolean} True if hash-only
 */
function isHashLink(href) {
	return href?.startsWith("#");
}

/**
 * Normalizes a path by removing .html extension and trailing slashes
 * @param {string} path - Path to normalize
 * @returns {string} Normalized path
 */
function normalizePath(path) {
	if (!path) return path;

	// Remove .html extension
	let normalized = path.replace(/\.html$/, "");

	// Remove trailing slash (except for root)
	if (normalized !== "/" && normalized.endsWith("/")) {
		normalized = normalized.slice(0, -1);
	}

	return normalized;
}

/**
 * Resolves a path relative to the current page location
 * Handles both absolute and relative paths
 * @param {string} href - The href to resolve
 * @returns {string} Fully resolved URL path
 */
export function resolveHref(href) {
	if (!href || isExternalUrl(href) || isHashLink(href)) {
		return href;
	}

	// For absolute paths starting with /
	if (href.startsWith("/")) {
		const cleanPath = href.slice(1);
		return normalizePath(`${BASE_URL}${cleanPath}`);
	}

	// For relative paths, resolve against current location
	const currentPath = window.location.pathname;
	const currentDir = currentPath.substring(0, currentPath.lastIndexOf("/") + 1);

	// Handle relative paths like "../" or "./"
	let resolvedPath = currentDir;
	let remainingHref = href;

	while (remainingHref.startsWith("../")) {
		// Go up one directory
		resolvedPath = resolvedPath.slice(0, -1); // Remove trailing /
		resolvedPath = resolvedPath.substring(0, resolvedPath.lastIndexOf("/") + 1);
		remainingHref = remainingHref.slice(3);
	}

	if (remainingHref.startsWith("./")) {
		remainingHref = remainingHref.slice(2);
	}

	return normalizePath(resolvedPath + remainingHref);
}

/**
 * Gets the current base URL
 * @returns {string} The base URL
 */
export function getBaseUrl() {
	return BASE_URL;
}

/**
 * Handles navigation to a resolved path
 * @param {string} href - The resolved href to navigate to
 */
function navigateTo(href) {
	// For same-page hash links
	if (href.startsWith("#")) {
		window.location.hash = href;
		return;
	}

	window.location.href = href;
}

/**
 * Click handler for internal links
 * @param {MouseEvent} event - Click event
 */
function handleLinkClick(event) {
	// Only handle left clicks without modifiers
	if (
		event.button !== 0 ||
		event.metaKey ||
		event.ctrlKey ||
		event.shiftKey ||
		event.altKey
	) {
		return;
	}

	// Find the anchor element (could be nested)
	const anchor = event.target.closest("a[href]");
	if (!anchor) return;

	const href = anchor.getAttribute("href");

	// Skip external links, hash links, and special protocols
	if (isExternalUrl(href) || isHashLink(href)) {
		return;
	}

	// Skip links with target="_blank" or download attribute
	if (anchor.target === "_blank" || anchor.hasAttribute("download")) {
		return;
	}

	// Resolve and navigate
	const resolvedHref = resolveHref(href);

	// Only prevent default if we're actually changing the URL
	if (resolvedHref !== href) {
		event.preventDefault();
		navigateTo(resolvedHref);
	}
}

/**
 * Initializes the router by attaching click handlers
 * Should be called once when the app loads
 */
export function initRouter() {
	// Attach global click handler for link interception
	document.addEventListener("click", handleLinkClick);

	// Handle initial page load - update URL to remove .html if present
	const currentPath = window.location.pathname;
	if (currentPath.endsWith(".html")) {
		const cleanPath = normalizePath(currentPath);
		window.history.replaceState(null, "", cleanPath + window.location.search + window.location.hash);
	}
}

/**
 * Creates a properly resolved href for use in JavaScript-generated elements
 * @param {string} path - The path (can be absolute like "/pages/about" or relative like "../about")
 * @returns {string} Resolved path suitable for href attribute
 */
export function createHref(path) {
	return resolveHref(path);
}

export default {
	initRouter,
	resolveHref,
	createHref,
	getBaseUrl,
};
