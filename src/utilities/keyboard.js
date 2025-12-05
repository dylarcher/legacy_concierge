/**
 * Keyboard Utilities
 * Helper functions for keyboard navigation and accessibility
 */

import { FOCUSABLE_SELECTOR, getFocusableElements } from "./dom.js";

/**
 * Key codes for common keyboard keys
 * @type {Object}
 */
export const KEYS = {
	ENTER: "Enter",
	SPACE: " ",
	ESCAPE: "Escape",
	TAB: "Tab",
	ARROW_UP: "ArrowUp",
	ARROW_DOWN: "ArrowDown",
	ARROW_LEFT: "ArrowLeft",
	ARROW_RIGHT: "ArrowRight",
	HOME: "Home",
	END: "End",
	PAGE_UP: "PageUp",
	PAGE_DOWN: "PageDown",
	BACKSPACE: "Backspace",
	DELETE: "Delete",
};

/**
 * Manages focus trapping within a container element for accessibility
 */
export class FocusTrap {
	#container = null;
	#previouslyFocusedElement = null;
	#boundHandleTabKeyNavigation = null;
	#isActive = false;

	/**
	 * Creates a new FocusTrap instance
	 * @param {HTMLElement} container - Element to trap focus within
	 */
	constructor(container) {
		this.#container = container;
		this.#previouslyFocusedElement = null;
		this.#boundHandleTabKeyNavigation = this.#handleTabKeyNavigation.bind(this);
	}

	/**
	 * Returns whether focus trap is currently active
	 * @returns {boolean}
	 */
	get isActive() {
		return this.#isActive;
	}

	/**
	 * Activates focus trapping and focuses the first focusable element
	 * @returns {void}
	 */
	activate() {
		if (this.#isActive) return;

		this.#isActive = true;
		this.#previouslyFocusedElement = document.activeElement;
		document.addEventListener("keydown", this.#boundHandleTabKeyNavigation);
		this.#focusFirstElement();
	}

	/**
	 * Deactivates focus trapping and restores previous focus
	 * @returns {void}
	 */
	deactivate() {
		if (!this.#isActive) return;

		this.#isActive = false;
		document.removeEventListener("keydown", this.#boundHandleTabKeyNavigation);
		this.#previouslyFocusedElement?.focus?.();
	}

	/**
	 * Returns all focusable elements within the container
	 * @returns {NodeList} Collection of focusable elements
	 */
	#getTrappableFocusableElements() {
		return getFocusableElements(this.#container);
	}

	/**
	 * Focuses the first focusable element in the container
	 * @returns {void}
	 */
	#focusFirstElement() {
		const focusableElements = this.#getTrappableFocusableElements();
		focusableElements[0]?.focus();
	}

	/**
	 * Handles Tab key navigation to keep focus within container
	 * @param {KeyboardEvent} event - Keyboard event
	 * @returns {void}
	 */
	#handleTabKeyNavigation(event) {
		if (event.key !== KEYS.TAB) return;

		const focusableElements = Array.from(this.#getTrappableFocusableElements());
		if (focusableElements.length === 0) return;

		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		if (event.shiftKey && document.activeElement === firstElement) {
			event.preventDefault();
			lastElement.focus();
		} else if (!event.shiftKey && document.activeElement === lastElement) {
			event.preventDefault();
			firstElement.focus();
		}
	}
}

/**
 * Creates a keyboard navigation handler for list-like components
 * @param {Object} options - Configuration options
 * @param {Function} options.getItems - Function returning array of navigable items
 * @param {Function} [options.onSelect] - Callback when item is selected
 * @param {Function} [options.onEscape] - Callback when Escape is pressed
 * @param {boolean} [options.wrap=true] - Whether navigation wraps around
 * @param {boolean} [options.horizontal=false] - Use left/right instead of up/down
 * @returns {Object} Navigation controller with handler and state
 *
 * @example
 * const nav = createKeyboardNavigation({
 *   getItems: () => menuItems,
 *   onSelect: (item) => item.click(),
 *   onEscape: () => closeMenu(),
 * });
 * menu.addEventListener('keydown', nav.handleKeyDown);
 */
export function createKeyboardNavigation(options) {
	const {
		getItems,
		onSelect,
		onEscape,
		wrap = true,
		horizontal = false,
	} = options;

	let currentIndex = -1;

	const prevKey = horizontal ? KEYS.ARROW_LEFT : KEYS.ARROW_UP;
	const nextKey = horizontal ? KEYS.ARROW_RIGHT : KEYS.ARROW_DOWN;

	const focusItem = (index) => {
		const items = getItems();
		if (items.length === 0) return;

		currentIndex = index;
		items[currentIndex]?.focus();
	};

	const movePrevious = () => {
		const items = getItems();
		if (items.length === 0) return;

		if (currentIndex <= 0) {
			currentIndex = wrap ? items.length - 1 : 0;
		} else {
			currentIndex--;
		}
		focusItem(currentIndex);
	};

	const moveNext = () => {
		const items = getItems();
		if (items.length === 0) return;

		if (currentIndex >= items.length - 1) {
			currentIndex = wrap ? 0 : items.length - 1;
		} else {
			currentIndex++;
		}
		focusItem(currentIndex);
	};

	const moveToFirst = () => {
		currentIndex = 0;
		focusItem(currentIndex);
	};

	const moveToLast = () => {
		const items = getItems();
		currentIndex = items.length - 1;
		focusItem(currentIndex);
	};

	const handleKeyDown = (event) => {
		const items = getItems();

		switch (event.key) {
			case KEYS.ESCAPE:
				event.preventDefault();
				onEscape?.();
				break;

			case prevKey:
				event.preventDefault();
				movePrevious();
				break;

			case nextKey:
				event.preventDefault();
				moveNext();
				break;

			case KEYS.HOME:
				event.preventDefault();
				moveToFirst();
				break;

			case KEYS.END:
				event.preventDefault();
				moveToLast();
				break;

			case KEYS.ENTER:
			case KEYS.SPACE:
				if (currentIndex >= 0 && currentIndex < items.length) {
					event.preventDefault();
					onSelect?.(items[currentIndex], currentIndex);
				}
				break;

			case KEYS.TAB:
				// Allow tab to close menus/dropdowns
				onEscape?.();
				break;
		}
	};

	return {
		handleKeyDown,
		getCurrentIndex: () => currentIndex,
		setCurrentIndex: (index) => {
			currentIndex = index;
		},
		reset: () => {
			currentIndex = -1;
		},
		focusItem,
		movePrevious,
		moveNext,
		moveToFirst,
		moveToLast,
	};
}

/**
 * Creates an Escape key handler
 * @param {Function} callback - Callback when Escape is pressed
 * @returns {Function} Cleanup function
 *
 * @example
 * const cleanup = onEscapeKey(() => dialog.close());
 * // Later: cleanup();
 */
export function onEscapeKey(callback) {
	const handler = (event) => {
		if (event.key === KEYS.ESCAPE) {
			callback(event);
		}
	};

	document.addEventListener("keydown", handler);

	return () => {
		document.removeEventListener("keydown", handler);
	};
}

/**
 * Checks if an element is focusable
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} Whether element is focusable
 */
export function isFocusable(element) {
	return element.matches(FOCUSABLE_SELECTOR);
}

/**
 * Focuses the first focusable element within a container
 * @param {HTMLElement} container - Container element
 * @returns {HTMLElement|null} The focused element, or null if none found
 */
export function focusFirstElement(container) {
	const focusable = getFocusableElements(container);
	if (focusable.length > 0) {
		focusable[0].focus();
		return focusable[0];
	}
	return null;
}

/**
 * Saves current focus and returns a function to restore it
 * @returns {Function} Function to restore saved focus
 *
 * @example
 * const restoreFocus = saveFocus();
 * dialog.showModal();
 * // Later when dialog closes:
 * restoreFocus();
 */
export function saveFocus() {
	const previouslyFocused = document.activeElement;
	return () => {
		previouslyFocused?.focus?.();
	};
}
