/**
 * Event Utilities
 * Helper functions for event handling, dispatching, and state management
 */

/**
 * Creates a debounced version of a function
 * @param {Function} callback - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 *
 * @example
 * const debouncedSearch = debounce((query) => search(query), 300);
 * input.addEventListener('input', (e) => debouncedSearch(e.target.value));
 */
export function debounce(callback, delay) {
	let timeoutId;
	return function (...args) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => callback.apply(this, args), delay);
	};
}

/**
 * Creates a throttled version of a function
 * @param {Function} callback - Function to throttle
 * @param {number} limit - Minimum time between calls in milliseconds
 * @returns {Function} Throttled function
 *
 * @example
 * const throttledScroll = throttle(() => updatePosition(), 100);
 * window.addEventListener('scroll', throttledScroll);
 */
export function throttle(callback, limit) {
	let inThrottle;
	return function (...args) {
		if (!inThrottle) {
			callback.apply(this, args);
			inThrottle = true;
			setTimeout(() => {
				inThrottle = false;
			}, limit);
		}
	};
}

/**
 * Dispatches a custom event with bubbling and composed enabled
 * @param {HTMLElement} element - Element to dispatch event from
 * @param {string} name - Event name
 * @param {*} detail - Event detail payload
 * @param {Object} options - Additional event options
 * @returns {boolean} False if event was cancelled, true otherwise
 *
 * @example
 * emit(button, 'button-click', { id: 1 });
 */
export function emit(element, name, detail = null, options = {}) {
	return element.dispatchEvent(
		new CustomEvent(name, {
			bubbles: true,
			composed: true,
			detail,
			...options,
		}),
	);
}

/**
 * Creates an event emitter bound to an element
 * @param {HTMLElement} element - Element to bind emitter to
 * @returns {Function} Bound emit function
 *
 * @example
 * const emitEvent = createEmitter(this);
 * emitEvent('dialog-open', { timestamp: Date.now() });
 */
export function createEmitter(element) {
	return (name, detail = null, options = {}) =>
		emit(element, name, detail, options);
}

/**
 * Sets up hover and active state tracking via data attributes
 * @param {HTMLElement} element - Element to track hover/active states on
 * @param {HTMLElement} [targetElement] - Element to apply data attributes to (defaults to element)
 * @param {Object} [options] - Configuration options
 * @param {boolean} [options.disabled] - Whether to check for disabled state
 * @returns {Function} Cleanup function to remove listeners
 *
 * @example
 * const cleanup = initializeHoverStateTracking(button, button.innerElement);
 * // Later: cleanup();
 */
export function initializeHoverStateTracking(
	element,
	targetElement = null,
	options = {},
) {
	const target = targetElement || element;
	const { disabled = false } = options;

	const checkDisabled = () => disabled && element.hasAttribute("disabled");

	const handleMouseEnter = () => {
		if (!checkDisabled()) {
			target.setAttribute("data-hover", "");
		}
	};

	const handleMouseLeave = () => {
		target.removeAttribute("data-hover");
		target.removeAttribute("data-active");
	};

	const handleMouseDown = () => {
		if (!checkDisabled()) {
			target.setAttribute("data-active", "");
		}
	};

	const handleMouseUp = () => {
		target.removeAttribute("data-active");
	};

	element.addEventListener("mouseenter", handleMouseEnter);
	element.addEventListener("mouseleave", handleMouseLeave);
	element.addEventListener("mousedown", handleMouseDown);
	element.addEventListener("mouseup", handleMouseUp);

	// Return cleanup function
	return () => {
		element.removeEventListener("mouseenter", handleMouseEnter);
		element.removeEventListener("mouseleave", handleMouseLeave);
		element.removeEventListener("mousedown", handleMouseDown);
		element.removeEventListener("mouseup", handleMouseUp);
	};
}

/**
 * Creates an outside click handler
 * @param {HTMLElement} element - Element to check clicks against
 * @param {Function} callback - Callback when clicked outside
 * @returns {Function} Cleanup function to remove listener
 *
 * @example
 * const cleanup = onClickOutside(dropdown, () => dropdown.close());
 * // Later: cleanup();
 */
export function onClickOutside(element, callback) {
	const handler = (event) => {
		if (!element.contains(event.target)) {
			callback(event);
		}
	};

	document.addEventListener("click", handler);

	return () => {
		document.removeEventListener("click", handler);
	};
}

/**
 * Adds an event listener that automatically removes itself after firing once
 * @param {HTMLElement} element - Element to add listener to
 * @param {string} eventName - Event name
 * @param {Function} callback - Event handler
 * @param {Object} options - Event listener options
 * @returns {Function} Function to manually remove the listener
 */
export function once(element, eventName, callback, options = {}) {
	const handler = (event) => {
		callback(event);
		element.removeEventListener(eventName, handler, options);
	};

	element.addEventListener(eventName, handler, options);

	return () => {
		element.removeEventListener(eventName, handler, options);
	};
}

/**
 * Creates a controller for managing multiple event listeners
 * @returns {Object} Controller with add, remove, and clear methods
 *
 * @example
 * const events = createEventController();
 * events.add(button, 'click', handler);
 * events.add(input, 'change', handler);
 * // Later: events.clear(); // Removes all listeners
 */
export function createEventController() {
	const listeners = [];

	return {
		add(element, eventName, callback, options = {}) {
			element.addEventListener(eventName, callback, options);
			listeners.push({ element, eventName, callback, options });
		},

		remove(element, eventName, callback, options = {}) {
			element.removeEventListener(eventName, callback, options);
			const index = listeners.findIndex(
				(l) =>
					l.element === element &&
					l.eventName === eventName &&
					l.callback === callback,
			);
			if (index !== -1) {
				listeners.splice(index, 1);
			}
		},

		clear() {
			for (const { element, eventName, callback, options } of listeners) {
				element.removeEventListener(eventName, callback, options);
			}
			listeners.length = 0;
		},
	};
}
