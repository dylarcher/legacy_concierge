/**
 * Base Web Component class providing common utilities for all components.
 * Extends HTMLElement with helper methods for DOM manipulation and styling.
 */

// Import utilities for use in BaseComponent and re-export for backward compatibility
import {
	clsx,
	createElement as createElementFn,
	createInteractiveElement as createInteractiveElementFn,
	createSVGElement as createSVGElementFn,
	renderWithChildren as renderWithChildrenFn,
	uniqueId,
} from "../utilities/dom.js";
import { initializeHoverStateTracking as initHoverTracking } from "../utilities/events.js";
import { FocusTrap, KEYS } from "../utilities/keyboard.js";

// Re-export utilities for backward compatibility
export { FocusTrap, KEYS, uniqueId };

/**
 * Base component class for all web components
 */
export class BaseComponent extends HTMLElement {
	#innerElement = null;

	constructor() {
		super();
		this._internals = this.attachInternals?.() || null;
	}

	/**
	 * Gets the inner element reference
	 * @returns {HTMLElement|null}
	 */
	get innerElement() {
		return this.#innerElement;
	}

	/**
	 * Sets the inner element reference
	 * @param {HTMLElement|null} element - Element to store
	 */
	set innerElement(element) {
		this.#innerElement = element;
	}

	/**
	 * Combines multiple class names, filtering out falsy values
	 * @param {...(string|boolean|null|undefined)} classes - Class names to combine
	 * @returns {string} Combined class string
	 */
	static combineClassNames(...classes) {
		return clsx(...classes);
	}

	/**
	 * Instance method for combining class names
	 * @param {...(string|boolean|null|undefined)} classes - Class names to combine
	 * @returns {string} Combined class string
	 */
	combineClassNames(...classes) {
		return clsx(...classes);
	}

	/**
	 * Alias for combineClassNames - combines class names filtering falsy values
	 * @param {...(string|boolean|null|undefined)} classes - Class names to combine
	 * @returns {string} Combined class string
	 */
	clsx(...classes) {
		return clsx(...classes);
	}

	/**
	 * Creates an HTML element with attributes and children
	 * @param {string} tagName - HTML tag name
	 * @param {Object} attributes - Attributes and properties to set
	 * @param {...(Node|string)} children - Child nodes or text content
	 * @returns {HTMLElement} Created element
	 */
	static createElement(tagName, attributes = {}, ...children) {
		return createElementFn(tagName, attributes, ...children);
	}

	/**
	 * Instance method for creating HTML elements
	 * @param {string} tagName - HTML tag name
	 * @param {Object} attributes - Attributes and properties to set
	 * @param {...(Node|string)} children - Child nodes or text content
	 * @returns {HTMLElement} Created element
	 */
	createElement(tagName, attributes, ...children) {
		return BaseComponent.createElement(tagName, attributes, ...children);
	}

	/**
	 * Alias for createElement - creates an HTML element
	 * @param {string} tagName - HTML tag name
	 * @param {Object} attributes - Attributes and properties to set
	 * @param {...(Node|string)} children - Child nodes or text content
	 * @returns {HTMLElement} Created element
	 */
	h(tagName, attributes, ...children) {
		return BaseComponent.createElement(tagName, attributes, ...children);
	}

	/**
	 * Creates an SVG element with attributes and children
	 * @param {string} tagName - SVG tag name
	 * @param {Object} attributes - Attributes to set
	 * @param {...(Node|string)} children - Child nodes
	 * @returns {SVGElement} Created SVG element
	 */
	static createSVGElement(tagName, attributes = {}, ...children) {
		return createSVGElementFn(tagName, attributes, ...children);
	}

	/**
	 * Instance method for creating SVG elements
	 * @param {string} tagName - SVG tag name
	 * @param {Object} attributes - Attributes to set
	 * @param {...(Node|string)} children - Child nodes
	 * @returns {SVGElement} Created SVG element
	 */
	createSVGElement(tagName, attributes, ...children) {
		return BaseComponent.createSVGElement(tagName, attributes, ...children);
	}

	/**
	 * Alias for createSVGElement - creates an SVG element
	 * @param {string} tagName - SVG tag name
	 * @param {Object} attributes - Attributes to set
	 * @param {...(Node|string)} children - Child nodes
	 * @returns {SVGElement} Created SVG element
	 */
	svg(tagName, attributes, ...children) {
		return BaseComponent.createSVGElement(tagName, attributes, ...children);
	}

	/**
	 * Creates a button or anchor element based on href presence
	 * @param {string|null} href - Link URL (null creates a button)
	 * @param {Object} attributes - Element attributes
	 * @param {...(Node|string)} children - Child nodes
	 * @returns {HTMLElement} Button or anchor element
	 */
	createInteractiveElement(href, attributes, ...children) {
		return createInteractiveElementFn(href, attributes, ...children);
	}

	/**
	 * Renders element preserving original child nodes
	 * @param {string} tagName - HTML tag name
	 * @param {Object} attributes - Element attributes
	 * @returns {HTMLElement} Created element with preserved children
	 */
	renderWithChildren(tagName, attributes) {
		return renderWithChildrenFn(this, tagName, attributes);
	}

	/**
	 * Sets up hover and active state tracking via data attributes
	 * @param {HTMLElement} [targetElement] - Element to apply states to (defaults to innerElement)
	 * @returns {Function} Cleanup function to remove listeners
	 */
	initializeHoverStateTracking(targetElement = null) {
		const target = targetElement || this.#innerElement;
		if (!target) return () => {};
		return initHoverTracking(this, target);
	}

	/**
	 * Gets observed attribute value with type coercion
	 * @param {string} name - Attribute name
	 * @param {*} defaultValue - Default value if attribute not set
	 * @returns {*} Coerced attribute value or default
	 */
	getAttr(name, defaultValue = null) {
		const value = this.getAttribute(name);
		if (value === null) return defaultValue;
		if (defaultValue === true || defaultValue === false) {
			return value !== "false" && value !== "0";
		}
		if (typeof defaultValue === "number") {
			const numericValue = Number(value);
			return Number.isNaN(numericValue) ? defaultValue : numericValue;
		}
		return value;
	}

	/**
	 * Sets data-* attributes for component state
	 * @param {string} name - State name (without data- prefix)
	 * @param {boolean|string} value - State value (false removes attribute)
	 * @returns {void}
	 */
	setState(name, value) {
		if (value === false || value == null) {
			delete this.dataset[name];
		} else if (value === true) {
			this.dataset[name] = "";
		} else {
			this.dataset[name] = value;
		}
	}

	/**
	 * Dispatches a custom event with bubbling and composed enabled
	 * @param {string} name - Event name
	 * @param {*} detail - Event detail payload
	 * @param {Object} options - Additional event options
	 * @returns {void}
	 */
	emit(name, detail = null, options = {}) {
		this.dispatchEvent(
			new CustomEvent(name, {
				bubbles: true,
				composed: true,
				detail,
				...options,
			}),
		);
	}

	/**
	 * Returns a promise that resolves on the next animation frame
	 * @returns {Promise<number>} Resolves with timestamp
	 */
	nextFrame() {
		return new Promise((resolve) => requestAnimationFrame(resolve));
	}

	/**
	 * Animates an element between two style states
	 * @param {HTMLElement} element - Element to transition
	 * @param {Object} fromStyles - Starting styles
	 * @param {Object} toStyles - Ending styles
	 * @param {number} duration - Duration in milliseconds
	 * @returns {Promise<void>} Resolves when transition completes
	 */
	async transition(element, fromStyles, toStyles, duration = 200) {
		Object.assign(element.style, fromStyles);
		await this.nextFrame();
		element.style.transition = `all ${duration}ms ease`;
		Object.assign(element.style, toStyles);
		return new Promise((resolve) => setTimeout(resolve, duration));
	}
}

/**
 * Registers a custom element if not already defined
 * @param {string} name - Element name (must contain hyphen)
 * @param {typeof HTMLElement} elementClass - Element class to register
 * @returns {void}
 */
export function defineElement(name, elementClass) {
	if (!customElements.get(name)) {
		customElements.define(name, elementClass);
	}
}

/**
 * Base URL for resolving internal paths
 * Uses Vite's BASE_URL which accounts for versioned deployments
 * @type {string}
 */
const BASE_URL = import.meta.env.BASE_URL || "/";

/**
 * Resolves an internal path using the application base URL
 * Handles both absolute paths (starting with /) and relative paths
 * External URLs (http://, https://, //) are returned unchanged
 *
 * @param {string} path - The path to resolve
 * @returns {string} The resolved path with base URL prefix
 *
 * @example
 * // In development (base = "/")
 * resolvePath("/pages/about") // Returns "/pages/about"
 *
 * @example
 * // In versioned build (base = "/legacy_concierge/v0.5.0/")
 * resolvePath("/pages/about") // Returns "/legacy_concierge/v0.5.0/pages/about"
 */
export function resolvePath(path) {
	// Return unchanged if external URL or already has protocol
	if (
		!path ||
		path.startsWith("http://") ||
		path.startsWith("https://") ||
		path.startsWith("//")
	) {
		return path;
	}

	// Return unchanged if it's a hash-only link
	if (path.startsWith("#")) {
		return path;
	}

	// Handle paths starting with /
	if (path.startsWith("/")) {
		// Remove leading slash since BASE_URL ends with /
		const cleanPath = path.slice(1);
		return `${BASE_URL}${cleanPath}`;
	}

	// For relative paths, just prepend base URL
	return `${BASE_URL}${path}`;
}

/**
 * Gets the current base URL for the application
 * @returns {string} The base URL
 */
export function getBaseUrl() {
	return BASE_URL;
}
