/**
 * Keyboard Utilities Tests
 *
 * Tests FocusTrap class, keyboard navigation factory, and helper functions.
 * These are accessibility-critical functions with complex state management.
 *
 * @module keyboard.test
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
	KEYS,
	FocusTrap,
	createKeyboardNavigation,
	onEscapeKey,
	isFocusable,
	focusFirstElement,
	saveFocus,
} from "../../utilities/keyboard.js";

describe("KEYS Constants", () => {
	it("defines ENTER key", () => {
		expect(KEYS.ENTER).toBe("Enter");
	});

	it("defines SPACE key", () => {
		expect(KEYS.SPACE).toBe(" ");
	});

	it("defines ESCAPE key", () => {
		expect(KEYS.ESCAPE).toBe("Escape");
	});

	it("defines TAB key", () => {
		expect(KEYS.TAB).toBe("Tab");
	});

	it("defines arrow keys", () => {
		expect(KEYS.ARROW_UP).toBe("ArrowUp");
		expect(KEYS.ARROW_DOWN).toBe("ArrowDown");
		expect(KEYS.ARROW_LEFT).toBe("ArrowLeft");
		expect(KEYS.ARROW_RIGHT).toBe("ArrowRight");
	});

	it("defines HOME and END keys", () => {
		expect(KEYS.HOME).toBe("Home");
		expect(KEYS.END).toBe("End");
	});
});

describe("FocusTrap", () => {
	let container;
	let focusTrap;
	let button1;
	let button2;
	let button3;

	beforeEach(() => {
		document.body.innerHTML = "";

		container = document.createElement("div");
		container.id = "dialog";

		button1 = document.createElement("button");
		button1.textContent = "First";
		button1.id = "first";

		button2 = document.createElement("button");
		button2.textContent = "Second";
		button2.id = "second";

		button3 = document.createElement("button");
		button3.textContent = "Third";
		button3.id = "third";

		container.appendChild(button1);
		container.appendChild(button2);
		container.appendChild(button3);
		document.body.appendChild(container);

		focusTrap = new FocusTrap(container);
	});

	afterEach(() => {
		focusTrap.deactivate();
		document.body.innerHTML = "";
	});

	describe("Activation", () => {
		it("starts inactive", () => {
			expect(focusTrap.isActive).toBe(false);
		});

		it("becomes active after activate()", () => {
			focusTrap.activate();
			expect(focusTrap.isActive).toBe(true);
		});

		it("focuses first focusable element on activate", () => {
			focusTrap.activate();
			expect(document.activeElement).toBe(button1);
		});

		it("saves previously focused element", () => {
			// Focus something outside first
			const outsideButton = document.createElement("button");
			outsideButton.textContent = "Outside";
			document.body.appendChild(outsideButton);
			outsideButton.focus();

			focusTrap.activate();
			expect(document.activeElement).toBe(button1);

			focusTrap.deactivate();
			expect(document.activeElement).toBe(outsideButton);
		});

		it("attaches keydown listener on activate", () => {
			const addEventListenerSpy = vi.spyOn(document, "addEventListener");
			focusTrap.activate();
			expect(addEventListenerSpy).toHaveBeenCalledWith(
				"keydown",
				expect.any(Function),
			);
		});

		it("does nothing if already active", () => {
			focusTrap.activate();
			const firstActiveElement = document.activeElement;

			// Focus something else manually
			button2.focus();

			// Calling activate again should not reset focus
			focusTrap.activate();
			expect(document.activeElement).toBe(button2);
		});
	});

	describe("Deactivation", () => {
		it("becomes inactive after deactivate()", () => {
			focusTrap.activate();
			focusTrap.deactivate();
			expect(focusTrap.isActive).toBe(false);
		});

		it("restores previous focus on deactivate", () => {
			const outsideButton = document.createElement("button");
			outsideButton.textContent = "Outside";
			document.body.appendChild(outsideButton);
			outsideButton.focus();

			focusTrap.activate();
			focusTrap.deactivate();

			expect(document.activeElement).toBe(outsideButton);
		});

		it("removes keydown listener on deactivate", () => {
			const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");
			focusTrap.activate();
			focusTrap.deactivate();
			expect(removeEventListenerSpy).toHaveBeenCalledWith(
				"keydown",
				expect.any(Function),
			);
		});

		it("does nothing if already inactive", () => {
			// Should not throw
			focusTrap.deactivate();
			expect(focusTrap.isActive).toBe(false);
		});

		it("handles missing previous focus gracefully", () => {
			// No element focused before activation
			document.activeElement?.blur?.();

			focusTrap.activate();
			// Should not throw on deactivate
			focusTrap.deactivate();
			expect(focusTrap.isActive).toBe(false);
		});
	});

	describe("Tab Navigation", () => {
		it("wraps focus from last to first on Tab", () => {
			focusTrap.activate();
			button3.focus();

			const event = new KeyboardEvent("keydown", {
				key: "Tab",
				bubbles: true,
			});
			const preventDefaultSpy = vi.spyOn(event, "preventDefault");

			document.dispatchEvent(event);

			expect(preventDefaultSpy).toHaveBeenCalled();
			expect(document.activeElement).toBe(button1);
		});

		it("wraps focus from first to last on Shift+Tab", () => {
			focusTrap.activate();
			button1.focus();

			const event = new KeyboardEvent("keydown", {
				key: "Tab",
				shiftKey: true,
				bubbles: true,
			});
			const preventDefaultSpy = vi.spyOn(event, "preventDefault");

			document.dispatchEvent(event);

			expect(preventDefaultSpy).toHaveBeenCalled();
			expect(document.activeElement).toBe(button3);
		});

		it("allows normal Tab navigation in middle of list", () => {
			focusTrap.activate();
			button2.focus();

			const event = new KeyboardEvent("keydown", {
				key: "Tab",
				bubbles: true,
			});
			const preventDefaultSpy = vi.spyOn(event, "preventDefault");

			document.dispatchEvent(event);

			// Should not prevent default for normal tab
			expect(preventDefaultSpy).not.toHaveBeenCalled();
		});

		it("ignores non-Tab keys", () => {
			focusTrap.activate();
			button1.focus();

			const event = new KeyboardEvent("keydown", {
				key: "Enter",
				bubbles: true,
			});

			document.dispatchEvent(event);

			// Focus should not change
			expect(document.activeElement).toBe(button1);
		});
	});

	describe("Empty Container", () => {
		it("handles container with no focusable elements", () => {
			const emptyContainer = document.createElement("div");
			emptyContainer.innerHTML = "<p>No focusable elements</p>";
			document.body.appendChild(emptyContainer);

			const emptyTrap = new FocusTrap(emptyContainer);
			// Should not throw
			emptyTrap.activate();

			expect(emptyTrap.isActive).toBe(true);

			// Tab should do nothing
			const event = new KeyboardEvent("keydown", {
				key: "Tab",
				bubbles: true,
			});
			document.dispatchEvent(event);

			emptyTrap.deactivate();
		});
	});

	describe("Dynamic Content", () => {
		it("includes dynamically added focusable elements", () => {
			focusTrap.activate();

			// Add a new button
			const newButton = document.createElement("button");
			newButton.textContent = "New";
			container.appendChild(newButton);

			// Focus the last original button
			button3.focus();

			// Tab should now go to new button, not wrap
			const event = new KeyboardEvent("keydown", {
				key: "Tab",
				bubbles: true,
			});

			// Since we're on button3 (not last anymore), Tab should proceed normally
			const preventDefaultSpy = vi.spyOn(event, "preventDefault");
			document.dispatchEvent(event);

			expect(preventDefaultSpy).not.toHaveBeenCalled();
		});
	});

	describe("Disabled Elements", () => {
		it("skips disabled elements in focus order", () => {
			button2.disabled = true;
			focusTrap.activate();

			// Focus should be on first enabled button
			expect(document.activeElement).toBe(button1);

			// Tabbing from button1 should skip button2 (handled by browser)
			// But wrapping from button3 should go to button1
			button3.focus();

			const event = new KeyboardEvent("keydown", {
				key: "Tab",
				bubbles: true,
			});

			document.dispatchEvent(event);

			expect(document.activeElement).toBe(button1);
		});
	});
});

describe("createKeyboardNavigation", () => {
	let items;
	let nav;
	let onSelect;
	let onEscape;

	beforeEach(() => {
		document.body.innerHTML = "";

		items = [
			document.createElement("button"),
			document.createElement("button"),
			document.createElement("button"),
		];

		items.forEach((item, index) => {
			item.textContent = `Item ${index}`;
			item.tabIndex = 0;
			document.body.appendChild(item);
		});

		onSelect = vi.fn();
		onEscape = vi.fn();

		nav = createKeyboardNavigation({
			getItems: () => items,
			onSelect,
			onEscape,
			wrap: true,
			horizontal: false,
		});
	});

	afterEach(() => {
		document.body.innerHTML = "";
	});

	describe("Vertical Arrow Navigation", () => {
		it("moves to next item on ArrowDown", () => {
			nav.setCurrentIndex(0);
			items[0].focus();

			const event = new KeyboardEvent("keydown", {
				key: "ArrowDown",
				bubbles: true,
			});

			nav.handleKeyDown(event);

			expect(nav.getCurrentIndex()).toBe(1);
			expect(document.activeElement).toBe(items[1]);
		});

		it("moves to previous item on ArrowUp", () => {
			nav.setCurrentIndex(1);
			items[1].focus();

			const event = new KeyboardEvent("keydown", {
				key: "ArrowUp",
				bubbles: true,
			});

			nav.handleKeyDown(event);

			expect(nav.getCurrentIndex()).toBe(0);
			expect(document.activeElement).toBe(items[0]);
		});

		it("wraps from last to first on ArrowDown", () => {
			nav.setCurrentIndex(2);
			items[2].focus();

			const event = new KeyboardEvent("keydown", {
				key: "ArrowDown",
				bubbles: true,
			});

			nav.handleKeyDown(event);

			expect(nav.getCurrentIndex()).toBe(0);
			expect(document.activeElement).toBe(items[0]);
		});

		it("wraps from first to last on ArrowUp", () => {
			nav.setCurrentIndex(0);
			items[0].focus();

			const event = new KeyboardEvent("keydown", {
				key: "ArrowUp",
				bubbles: true,
			});

			nav.handleKeyDown(event);

			expect(nav.getCurrentIndex()).toBe(2);
			expect(document.activeElement).toBe(items[2]);
		});
	});

	describe("Horizontal Navigation", () => {
		beforeEach(() => {
			nav = createKeyboardNavigation({
				getItems: () => items,
				onSelect,
				onEscape,
				wrap: true,
				horizontal: true,
			});
		});

		it("moves to next item on ArrowRight", () => {
			nav.setCurrentIndex(0);
			items[0].focus();

			const event = new KeyboardEvent("keydown", {
				key: "ArrowRight",
				bubbles: true,
			});

			nav.handleKeyDown(event);

			expect(nav.getCurrentIndex()).toBe(1);
		});

		it("moves to previous item on ArrowLeft", () => {
			nav.setCurrentIndex(1);
			items[1].focus();

			const event = new KeyboardEvent("keydown", {
				key: "ArrowLeft",
				bubbles: true,
			});

			nav.handleKeyDown(event);

			expect(nav.getCurrentIndex()).toBe(0);
		});
	});

	describe("No-Wrap Mode", () => {
		beforeEach(() => {
			nav = createKeyboardNavigation({
				getItems: () => items,
				onSelect,
				onEscape,
				wrap: false,
			});
		});

		it("stays at first item on ArrowUp when at start", () => {
			nav.setCurrentIndex(0);
			items[0].focus();

			const event = new KeyboardEvent("keydown", {
				key: "ArrowUp",
				bubbles: true,
			});

			nav.handleKeyDown(event);

			expect(nav.getCurrentIndex()).toBe(0);
		});

		it("stays at last item on ArrowDown when at end", () => {
			nav.setCurrentIndex(2);
			items[2].focus();

			const event = new KeyboardEvent("keydown", {
				key: "ArrowDown",
				bubbles: true,
			});

			nav.handleKeyDown(event);

			expect(nav.getCurrentIndex()).toBe(2);
		});
	});

	describe("HOME and END Keys", () => {
		it("jumps to first item on HOME", () => {
			nav.setCurrentIndex(2);
			items[2].focus();

			const event = new KeyboardEvent("keydown", {
				key: "Home",
				bubbles: true,
			});

			nav.handleKeyDown(event);

			expect(nav.getCurrentIndex()).toBe(0);
			expect(document.activeElement).toBe(items[0]);
		});

		it("jumps to last item on END", () => {
			nav.setCurrentIndex(0);
			items[0].focus();

			const event = new KeyboardEvent("keydown", {
				key: "End",
				bubbles: true,
			});

			nav.handleKeyDown(event);

			expect(nav.getCurrentIndex()).toBe(2);
			expect(document.activeElement).toBe(items[2]);
		});
	});

	describe("Selection", () => {
		it("calls onSelect with item on ENTER", () => {
			nav.setCurrentIndex(1);
			items[1].focus();

			const event = new KeyboardEvent("keydown", {
				key: "Enter",
				bubbles: true,
			});

			nav.handleKeyDown(event);

			expect(onSelect).toHaveBeenCalledWith(items[1], 1);
		});

		it("calls onSelect with item on SPACE", () => {
			nav.setCurrentIndex(1);
			items[1].focus();

			const event = new KeyboardEvent("keydown", {
				key: " ",
				bubbles: true,
			});

			nav.handleKeyDown(event);

			expect(onSelect).toHaveBeenCalledWith(items[1], 1);
		});

		it("does not call onSelect if index is -1", () => {
			// Index starts at -1
			expect(nav.getCurrentIndex()).toBe(-1);

			const event = new KeyboardEvent("keydown", {
				key: "Enter",
				bubbles: true,
			});

			nav.handleKeyDown(event);

			expect(onSelect).not.toHaveBeenCalled();
		});

		it("does not call onSelect if index is out of bounds", () => {
			nav.setCurrentIndex(10);

			const event = new KeyboardEvent("keydown", {
				key: "Enter",
				bubbles: true,
			});

			nav.handleKeyDown(event);

			expect(onSelect).not.toHaveBeenCalled();
		});
	});

	describe("Escape Key", () => {
		it("calls onEscape on ESCAPE", () => {
			const event = new KeyboardEvent("keydown", {
				key: "Escape",
				bubbles: true,
			});

			nav.handleKeyDown(event);

			expect(onEscape).toHaveBeenCalled();
		});

		it("calls onEscape on TAB (menu closing behavior)", () => {
			const event = new KeyboardEvent("keydown", {
				key: "Tab",
				bubbles: true,
			});

			nav.handleKeyDown(event);

			expect(onEscape).toHaveBeenCalled();
		});
	});

	describe("Edge Cases", () => {
		it("handles empty items array", () => {
			const emptyNav = createKeyboardNavigation({
				getItems: () => [],
				onSelect,
				onEscape,
			});

			const event = new KeyboardEvent("keydown", {
				key: "ArrowDown",
				bubbles: true,
			});

			// Should not throw
			emptyNav.handleKeyDown(event);
			expect(emptyNav.getCurrentIndex()).toBe(-1);
		});

		it("handles single item", () => {
			const singleNav = createKeyboardNavigation({
				getItems: () => [items[0]],
				onSelect,
				onEscape,
				wrap: true,
			});

			singleNav.setCurrentIndex(0);

			const event = new KeyboardEvent("keydown", {
				key: "ArrowDown",
				bubbles: true,
			});

			singleNav.handleKeyDown(event);

			// Should wrap to same item
			expect(singleNav.getCurrentIndex()).toBe(0);
		});
	});

	describe("Controller Methods", () => {
		it("reset() sets index to -1", () => {
			nav.setCurrentIndex(2);
			nav.reset();
			expect(nav.getCurrentIndex()).toBe(-1);
		});

		it("focusItem() focuses specific item", () => {
			nav.focusItem(1);
			expect(document.activeElement).toBe(items[1]);
			expect(nav.getCurrentIndex()).toBe(1);
		});

		it("movePrevious() moves to previous item", () => {
			nav.setCurrentIndex(2);
			nav.movePrevious();
			expect(nav.getCurrentIndex()).toBe(1);
		});

		it("moveNext() moves to next item", () => {
			nav.setCurrentIndex(0);
			nav.moveNext();
			expect(nav.getCurrentIndex()).toBe(1);
		});

		it("moveToFirst() moves to first item", () => {
			nav.setCurrentIndex(2);
			nav.moveToFirst();
			expect(nav.getCurrentIndex()).toBe(0);
		});

		it("moveToLast() moves to last item", () => {
			nav.setCurrentIndex(0);
			nav.moveToLast();
			expect(nav.getCurrentIndex()).toBe(2);
		});
	});
});

describe("onEscapeKey", () => {
	it("calls callback when Escape is pressed", () => {
		const callback = vi.fn();
		const cleanup = onEscapeKey(callback);

		const event = new KeyboardEvent("keydown", {
			key: "Escape",
			bubbles: true,
		});
		document.dispatchEvent(event);

		expect(callback).toHaveBeenCalledWith(event);

		cleanup();
	});

	it("does not call callback for other keys", () => {
		const callback = vi.fn();
		const cleanup = onEscapeKey(callback);

		const event = new KeyboardEvent("keydown", {
			key: "Enter",
			bubbles: true,
		});
		document.dispatchEvent(event);

		expect(callback).not.toHaveBeenCalled();

		cleanup();
	});

	it("returns cleanup function that removes listener", () => {
		const callback = vi.fn();
		const cleanup = onEscapeKey(callback);

		cleanup();

		const event = new KeyboardEvent("keydown", {
			key: "Escape",
			bubbles: true,
		});
		document.dispatchEvent(event);

		expect(callback).not.toHaveBeenCalled();
	});
});

describe("isFocusable", () => {
	it("returns true for button", () => {
		const button = document.createElement("button");
		document.body.appendChild(button);
		expect(isFocusable(button)).toBe(true);
	});

	it("returns true for anchor with href", () => {
		const anchor = document.createElement("a");
		anchor.href = "/page";
		document.body.appendChild(anchor);
		expect(isFocusable(anchor)).toBe(true);
	});

	it("returns true for input", () => {
		const input = document.createElement("input");
		document.body.appendChild(input);
		expect(isFocusable(input)).toBe(true);
	});

	it("returns true for element with tabindex=0", () => {
		const div = document.createElement("div");
		div.tabIndex = 0;
		document.body.appendChild(div);
		expect(isFocusable(div)).toBe(true);
	});

	it("returns false for regular div", () => {
		const div = document.createElement("div");
		document.body.appendChild(div);
		expect(isFocusable(div)).toBe(false);
	});

	it("matches disabled button (selector does not exclude :disabled)", () => {
		// Note: FOCUSABLE_SELECTOR matches by element type, not focusable state
		// Disabled buttons match 'button' selector but aren't actually focusable
		const button = document.createElement("button");
		button.disabled = true;
		document.body.appendChild(button);
		// The selector-based check returns true; actual focus would fail
		expect(isFocusable(button)).toBe(true);
	});
});

describe("focusFirstElement", () => {
	beforeEach(() => {
		document.body.innerHTML = "";
	});

	it("focuses first focusable element in container", () => {
		const container = document.createElement("div");
		const button1 = document.createElement("button");
		const button2 = document.createElement("button");
		button1.textContent = "First";
		button2.textContent = "Second";
		container.appendChild(button1);
		container.appendChild(button2);
		document.body.appendChild(container);

		const result = focusFirstElement(container);

		expect(result).toBe(button1);
		expect(document.activeElement).toBe(button1);
	});

	it("returns null for container with no focusable elements", () => {
		const container = document.createElement("div");
		container.innerHTML = "<p>No focusable elements</p>";
		document.body.appendChild(container);

		const result = focusFirstElement(container);

		expect(result).toBeNull();
	});

	it("returns first matching element (including disabled)", () => {
		// Note: FOCUSABLE_SELECTOR matches disabled elements
		// The function returns the first match, even if disabled
		const container = document.createElement("div");
		const disabledButton = document.createElement("button");
		disabledButton.disabled = true;
		const enabledButton = document.createElement("button");
		container.appendChild(disabledButton);
		container.appendChild(enabledButton);
		document.body.appendChild(container);

		const result = focusFirstElement(container);

		// Returns disabled button as it matches selector first
		expect(result).toBe(disabledButton);
	});
});

describe("saveFocus", () => {
	beforeEach(() => {
		document.body.innerHTML = "";
	});

	it("returns function that restores focus", () => {
		const button = document.createElement("button");
		button.textContent = "Original";
		document.body.appendChild(button);
		button.focus();

		const restoreFocus = saveFocus();

		// Focus something else
		const otherButton = document.createElement("button");
		otherButton.textContent = "Other";
		document.body.appendChild(otherButton);
		otherButton.focus();

		expect(document.activeElement).toBe(otherButton);

		// Restore
		restoreFocus();

		expect(document.activeElement).toBe(button);
	});

	it("handles case where original element was removed", () => {
		const button = document.createElement("button");
		document.body.appendChild(button);
		button.focus();

		const restoreFocus = saveFocus();

		// Remove the button
		button.remove();

		// Should not throw
		restoreFocus();
	});

	it("handles case where nothing was focused", () => {
		document.activeElement?.blur?.();

		const restoreFocus = saveFocus();

		// Should not throw
		restoreFocus();
	});
});
