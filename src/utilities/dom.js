/**
 * DOM Utilities
 * Helper functions for DOM manipulation and element creation
 */

/**
 * Combines multiple class names, filtering out falsy values
 * @param {...(string|boolean|null|undefined|Array)} classes - Class names to combine
 * @returns {string} Combined class string
 *
 * @example
 * clsx('btn', isActive && 'btn-active', null, 'btn-primary')
 * // Returns: 'btn btn-active btn-primary'
 */
export function clsx(...classes) {
	return classes.flat(Infinity).filter(Boolean).join(" ");
}

/**
 * Alias for clsx - combines class names filtering falsy values
 * @param {...(string|boolean|null|undefined|Array)} classes - Class names to combine
 * @returns {string} Combined class string
 */
export const combineClassNames = clsx;

/**
 * Creates an HTML element with attributes and children
 * @param {string} tagName - HTML tag name
 * @param {Object} attributes - Attributes and properties to set
 * @param {...(Node|string)} children - Child nodes or text content
 * @returns {HTMLElement} Created element
 *
 * @example
 * createElement('div', { class: 'container', id: 'main' }, 'Hello', child)
 */
export function createElement(tagName, attributes = {}, ...children) {
	const element = document.createElement(tagName);

	for (const [key, value] of Object.entries(attributes)) {
		if (value == null || value === false) continue;

		if (key === "className" || key === "class") {
			element.className = Array.isArray(value) ? clsx(...value) : value;
		} else if (key === "style" && typeof value === "object") {
			Object.assign(element.style, value);
		} else if (key === "dataset") {
			Object.assign(element.dataset, value);
		} else if (key.startsWith("on") && typeof value === "function") {
			const eventName = key.slice(2).toLowerCase();
			element.addEventListener(eventName, value);
		} else if (key === "ref" && typeof value === "function") {
			value(element);
		} else if (value === true) {
			element.setAttribute(key, "");
		} else {
			element.setAttribute(key, String(value));
		}
	}

	for (const child of children.flat(Infinity)) {
		if (child == null || child === false) continue;
		if (child instanceof Node) {
			element.appendChild(child);
		} else {
			element.appendChild(document.createTextNode(String(child)));
		}
	}

	return element;
}

/**
 * Shorthand alias for createElement
 * @param {string} tagName - HTML tag name
 * @param {Object} attributes - Attributes and properties to set
 * @param {...(Node|string)} children - Child nodes or text content
 * @returns {HTMLElement} Created element
 */
export const h = createElement;

/**
 * Creates an SVG element with attributes and children
 * @param {string} tagName - SVG tag name
 * @param {Object} attributes - Attributes to set
 * @param {...(Node|string)} children - Child nodes
 * @returns {SVGElement} Created SVG element
 *
 * @example
 * createSVGElement('svg', { viewBox: '0 0 24 24' },
 *   createSVGElement('path', { d: 'M12 0...' })
 * )
 */
export function createSVGElement(tagName, attributes = {}, ...children) {
	const element = document.createElementNS(
		"http://www.w3.org/2000/svg",
		tagName,
	);

	for (const [key, value] of Object.entries(attributes)) {
		if (value == null || value === false) continue;
		if (key === "className" || key === "class") {
			element.setAttribute(
				"class",
				Array.isArray(value) ? clsx(...value) : value,
			);
		} else if (value === true) {
			element.setAttribute(key, "");
		} else {
			element.setAttribute(key, String(value));
		}
	}

	for (const child of children.flat(Infinity)) {
		if (child == null || child === false) continue;
		if (child instanceof Node) {
			element.appendChild(child);
		} else {
			element.appendChild(document.createTextNode(String(child)));
		}
	}

	return element;
}

/**
 * Shorthand alias for createSVGElement
 * @param {string} tagName - SVG tag name
 * @param {Object} attributes - Attributes to set
 * @param {...(Node|string)} children - Child nodes
 * @returns {SVGElement} Created SVG element
 */
export const svg = createSVGElement;

/**
 * Creates a button or anchor element based on href presence
 * @param {string|null} href - Link URL (null creates a button)
 * @param {Object} attributes - Element attributes
 * @param {...(Node|string)} children - Child nodes
 * @returns {HTMLElement} Button or anchor element
 *
 * @example
 * createInteractiveElement('/page', { class: 'btn' }, 'Click me')
 * // Returns: <a href="/page" class="btn">Click me</a>
 *
 * createInteractiveElement(null, { class: 'btn' }, 'Click me')
 * // Returns: <button type="button" class="btn">Click me</button>
 */
export function createInteractiveElement(href, attributes, ...children) {
	const tagName = href ? "a" : "button";
	return createElement(
		tagName,
		{
			...attributes,
			href: href || undefined,
			type: href ? undefined : "button",
		},
		...children,
	);
}

/**
 * Renders element preserving original child nodes
 * @param {HTMLElement} container - Container element to render into
 * @param {string} tagName - HTML tag name
 * @param {Object} attributes - Element attributes
 * @returns {HTMLElement} Created element with preserved children
 */
export function renderWithChildren(container, tagName, attributes) {
	const children = Array.from(container.childNodes);
	container.innerHTML = "";
	const element = createElement(tagName, attributes, ...children);
	container.appendChild(element);
	return element;
}

let idCounter = 0;

/**
 * Generates a unique ID with optional prefix
 * @param {string} prefix - ID prefix
 * @returns {string} Unique identifier
 *
 * @example
 * uniqueId('btn') // Returns: 'btn-1'
 * uniqueId('btn') // Returns: 'btn-2'
 */
export function uniqueId(prefix = "ui") {
	return `${prefix}-${++idCounter}`;
}

/**
 * Gets attribute value with type coercion
 * @param {HTMLElement} element - Element to get attribute from
 * @param {string} name - Attribute name
 * @param {*} defaultValue - Default value if attribute not set
 * @returns {*} Coerced attribute value or default
 *
 * @example
 * getAttr(element, 'disabled', false) // Returns boolean
 * getAttr(element, 'count', 0) // Returns number
 * getAttr(element, 'label', 'default') // Returns string
 */
export function getAttr(element, name, defaultValue = null) {
	const value = element.getAttribute(name);
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
 * @param {HTMLElement} element - Element to set state on
 * @param {string} name - State name (without data- prefix)
 * @param {boolean|string} value - State value (false removes attribute)
 * @returns {void}
 *
 * @example
 * setState(element, 'active', true) // Sets data-active=""
 * setState(element, 'active', false) // Removes data-active
 * setState(element, 'count', '5') // Sets data-count="5"
 */
export function setState(element, name, value) {
	if (value === false || value == null) {
		delete element.dataset[name];
	} else if (value === true) {
		element.dataset[name] = "";
	} else {
		element.dataset[name] = value;
	}
}

/**
 * Selector for focusable elements
 * @type {string}
 */
export const FOCUSABLE_SELECTOR =
	'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Gets all focusable elements within a container
 * @param {HTMLElement} container - Container element
 * @returns {NodeList} Collection of focusable elements
 */
export function getFocusableElements(container) {
	return container.querySelectorAll(FOCUSABLE_SELECTOR);
}
