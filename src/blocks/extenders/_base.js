/**
 * Extenders Base Module
 * Re-exports from the main _base.js and adds extender-specific utilities
 *
 * @module extenders/_base
 */

// Re-export everything from the main BaseComponent
export {
	BaseComponent,
	defineElement,
	uniqueId,
	FocusTrap,
	KEYS,
	resolvePath,
	getBaseUrl,
} from "../_base.js";

// Import clsx from utilities for re-export
import { clsx } from "../../utilities/dom.js";
export { clsx };

/**
 * Hash utilities for URL fragment state management
 * Used by extender components for deep linking and state persistence
 */
export const hashUtils = {
	/**
	 * Get the current hash without the # prefix
	 * @returns {string}
	 */
	get() {
		return window.location.hash.slice(1);
	},

	/**
	 * Set the URL hash
	 * @param {string} value - Hash value to set
	 * @param {boolean} [replace=true] - Use replaceState instead of pushState
	 */
	set(value, replace = true) {
		const newHash = value
			? `#${value}`
			: window.location.pathname + window.location.search;
		if (replace) {
			history.replaceState(null, "", newHash);
		} else {
			history.pushState(null, "", newHash);
		}
	},

	/**
	 * Parse a prefixed hash (e.g., "accordion-panel1" -> { prefix: "accordion", value: "panel1" })
	 * @param {string} hash - Hash string to parse
	 * @param {string} expectedPrefix - Expected prefix
	 * @returns {Object|null}
	 */
	parse(hash, expectedPrefix) {
		if (!hash) return null;
		const separator = "-";
		const prefixWithSep = expectedPrefix + separator;
		if (hash.startsWith(prefixWithSep)) {
			return {
				prefix: expectedPrefix,
				value: hash.slice(prefixWithSep.length),
			};
		}
		return null;
	},

	/**
	 * Create a prefixed hash value
	 * @param {string} prefix - Hash prefix
	 * @param {string} value - Hash value
	 * @returns {string}
	 */
	create(prefix, value) {
		return `${prefix}-${value}`;
	},

	/**
	 * Check if current hash matches prefix
	 * @param {string} prefix - Prefix to match
	 * @returns {boolean}
	 */
	matches(prefix) {
		const hash = this.get();
		return hash.startsWith(prefix + "-");
	},

	/**
	 * Get value from prefixed hash
	 * @param {string} prefix - Prefix to extract value from
	 * @returns {string|null}
	 */
	getValue(prefix) {
		const parsed = this.parse(this.get(), prefix);
		return parsed?.value || null;
	},
};
