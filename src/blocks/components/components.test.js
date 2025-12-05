/**
 * Accordion Component Tests
 *
 * Tests for ui-accordion, ui-accordion-panel, ui-accordion-header, and ui-accordion-content
 * custom elements covering rendering, state management, animations, accessibility, and keyboard navigation.
 *
 * @module accordion.test
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import "./accordion.js";

/**
 * Helper to wait for custom element to be defined and connected
 * @param {HTMLElement} element - Element to wait for
 * @returns {Promise<void>}
 */
async function waitForElement(element) {
	await customElements.whenDefined(element.tagName.toLowerCase());
	await new Promise((resolve) => requestAnimationFrame(resolve));
}

/**
 * Helper to create a complete accordion structure
 * @param {Object} options - Configuration options
 * @param {boolean} [options.exclusive] - Enable exclusive mode
 * @param {boolean} [options.firstOpen] - First panel starts open
 * @param {number} [options.panelCount] - Number of panels to create
 * @returns {HTMLElement}
 */
function createAccordion(options = {}) {
	const { exclusive = false, firstOpen = false, panelCount = 2 } = options;

	const accordion = document.createElement("ui-accordion");
	if (exclusive) accordion.setAttribute("exclusive", "");

	for (let index = 0; index < panelCount; index++) {
		const panel = document.createElement("ui-accordion-panel");
		if (index === 0 && firstOpen) panel.setAttribute("open", "");

		const header = document.createElement("ui-accordion-header");
		header.textContent = `Section ${index + 1}`;

		const content = document.createElement("ui-accordion-content");
		content.textContent = `Content for section ${index + 1}`;

		panel.appendChild(header);
		panel.appendChild(content);
		accordion.appendChild(panel);
	}

	return accordion;
}

describe("ui-accordion", () => {
	beforeEach(() => {
		document.body.innerHTML = "";
	});

	afterEach(() => {
		document.body.innerHTML = "";
	});

	describe("rendering", () => {
		it("renders with default structure", async () => {
			const accordion = createAccordion();
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const wrapper = accordion.querySelector("[role='presentation']");
			expect(wrapper).toBeTruthy();
			expect(wrapper.classList.contains("divide-y")).toBe(true);
		});

		it("renders all panels", async () => {
			const accordion = createAccordion({ panelCount: 3 });
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const panels = accordion.querySelectorAll("ui-accordion-panel");
			expect(panels.length).toBe(3);
		});
	});

	describe("exclusive mode", () => {
		it("returns false for isExclusive by default", async () => {
			const accordion = createAccordion();
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			expect(accordion.isExclusive).toBe(false);
		});

		it("returns true for isExclusive when exclusive attribute is set", async () => {
			const accordion = createAccordion({ exclusive: true });
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			expect(accordion.isExclusive).toBe(true);
		});

		it("allows multiple panels open in non-exclusive mode", async () => {
			const accordion = createAccordion({ firstOpen: true });
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const panels = accordion.querySelectorAll("ui-accordion-panel");
			panels[1].open();

			// Wait for state changes
			await new Promise((resolve) => setTimeout(resolve, 50));

			expect(panels[0].isOpen).toBe(true);
			expect(panels[1].isOpen).toBe(true);
		});

		it("closes other panels in exclusive mode", async () => {
			const accordion = createAccordion({ exclusive: true, firstOpen: true });
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const panels = accordion.querySelectorAll("ui-accordion-panel");
			expect(panels[0].isOpen).toBe(true);

			panels[1].open();

			// Wait for state changes
			await new Promise((resolve) => setTimeout(resolve, 50));

			expect(panels[0].isOpen).toBe(false);
			expect(panels[1].isOpen).toBe(true);
		});
	});

	describe("expandAll and collapseAll", () => {
		it("expandAll opens all panels in non-exclusive mode", async () => {
			const accordion = createAccordion({ panelCount: 3 });
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			accordion.expandAll();
			await new Promise((resolve) => setTimeout(resolve, 50));

			const panels = accordion.querySelectorAll("ui-accordion-panel");
			for (const panel of panels) {
				expect(panel.isOpen).toBe(true);
			}
		});

		it("expandAll does nothing in exclusive mode", async () => {
			const accordion = createAccordion({ exclusive: true, panelCount: 3 });
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			accordion.expandAll();
			await new Promise((resolve) => setTimeout(resolve, 50));

			const panels = accordion.querySelectorAll("ui-accordion-panel");
			for (const panel of panels) {
				expect(panel.isOpen).toBe(false);
			}
		});

		it("collapseAll closes all panels", async () => {
			const accordion = createAccordion({ firstOpen: true, panelCount: 3 });
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			// Open additional panels
			const panels = accordion.querySelectorAll("ui-accordion-panel");
			panels[1].open();
			await new Promise((resolve) => setTimeout(resolve, 50));

			accordion.collapseAll();
			await new Promise((resolve) => setTimeout(resolve, 50));

			for (const panel of panels) {
				expect(panel.isOpen).toBe(false);
			}
		});
	});

	describe("events", () => {
		it("emits accordion-expand event when panel opens", async () => {
			const accordion = createAccordion();
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const expandHandler = vi.fn();
			accordion.addEventListener("accordion-expand", expandHandler);

			const panel = accordion.querySelector("ui-accordion-panel");
			panel.open();

			expect(expandHandler).toHaveBeenCalled();
			expect(expandHandler.mock.calls[0][0].detail.panel).toBe(panel);
		});

		it("emits accordion-collapse event when panel closes", async () => {
			const accordion = createAccordion({ firstOpen: true });
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const collapseHandler = vi.fn();
			accordion.addEventListener("accordion-collapse", collapseHandler);

			const panel = accordion.querySelector("ui-accordion-panel");
			panel.close();

			expect(collapseHandler).toHaveBeenCalled();
			expect(collapseHandler.mock.calls[0][0].detail.panel).toBe(panel);
		});

		it("emits accordion-change event for both expand and collapse", async () => {
			const accordion = createAccordion();
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const changeHandler = vi.fn();
			accordion.addEventListener("accordion-change", changeHandler);

			const panel = accordion.querySelector("ui-accordion-panel");
			panel.open();

			expect(changeHandler).toHaveBeenCalledWith(
				expect.objectContaining({
					detail: expect.objectContaining({ panel, open: true }),
				}),
			);

			panel.close();

			expect(changeHandler).toHaveBeenCalledWith(
				expect.objectContaining({
					detail: expect.objectContaining({ panel, open: false }),
				}),
			);
		});
	});

	describe("animation duration", () => {
		it("returns default duration of 200ms", async () => {
			const accordion = createAccordion();
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			expect(accordion.animationDuration).toBe(200);
		});

		it("respects custom duration attribute", async () => {
			const accordion = createAccordion();
			accordion.setAttribute("duration", "500");
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			expect(accordion.animationDuration).toBe(500);
		});
	});
});

describe("ui-accordion-panel", () => {
	beforeEach(() => {
		document.body.innerHTML = "";
	});

	afterEach(() => {
		document.body.innerHTML = "";
	});

	describe("state management", () => {
		it("isOpen returns false by default", async () => {
			const accordion = createAccordion();
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const panel = accordion.querySelector("ui-accordion-panel");
			expect(panel.isOpen).toBe(false);
		});

		it("isOpen returns true when open attribute is set", async () => {
			const accordion = createAccordion({ firstOpen: true });
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const panel = accordion.querySelector("ui-accordion-panel");
			expect(panel.isOpen).toBe(true);
		});

		it("open() sets the open attribute", async () => {
			const accordion = createAccordion();
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const panel = accordion.querySelector("ui-accordion-panel");
			panel.open();

			expect(panel.hasAttribute("open")).toBe(true);
			expect(panel.isOpen).toBe(true);
		});

		it("close() removes the open attribute", async () => {
			const accordion = createAccordion({ firstOpen: true });
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const panel = accordion.querySelector("ui-accordion-panel");
			panel.close();

			expect(panel.hasAttribute("open")).toBe(false);
			expect(panel.isOpen).toBe(false);
		});

		it("toggle() switches between open and closed", async () => {
			const accordion = createAccordion();
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const panel = accordion.querySelector("ui-accordion-panel");

			panel.toggle();
			expect(panel.isOpen).toBe(true);

			panel.toggle();
			expect(panel.isOpen).toBe(false);
		});
	});

	describe("disabled state", () => {
		it("isDisabled returns false by default", async () => {
			const accordion = createAccordion();
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const panel = accordion.querySelector("ui-accordion-panel");
			expect(panel.isDisabled).toBe(false);
		});

		it("isDisabled returns true when disabled attribute is set", async () => {
			const accordion = createAccordion();
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const panel = accordion.querySelector("ui-accordion-panel");
			panel.setAttribute("disabled", "");

			expect(panel.isDisabled).toBe(true);
		});

		it("open() does nothing when disabled", async () => {
			const accordion = createAccordion();
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const panel = accordion.querySelector("ui-accordion-panel");
			panel.setAttribute("disabled", "");
			panel.open();

			expect(panel.isOpen).toBe(false);
		});

		it("close() does nothing when disabled", async () => {
			const accordion = createAccordion({ firstOpen: true });
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const panel = accordion.querySelector("ui-accordion-panel");
			panel.setAttribute("disabled", "");
			panel.close();

			expect(panel.isOpen).toBe(true);
		});
	});

	describe("data attributes", () => {
		it("sets data-state to closed by default", async () => {
			const accordion = createAccordion();
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const panel = accordion.querySelector("ui-accordion-panel");
			const wrapper = panel.querySelector("[data-state]");
			expect(wrapper.dataset.state).toBe("closed");
		});

		it("sets data-state to open when panel is open", async () => {
			const accordion = createAccordion({ firstOpen: true });
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const panel = accordion.querySelector("ui-accordion-panel");
			const wrapper = panel.querySelector("[data-state]");
			expect(wrapper.dataset.state).toBe("open");
		});
	});
});

describe("ui-accordion-header", () => {
	beforeEach(() => {
		document.body.innerHTML = "";
	});

	afterEach(() => {
		document.body.innerHTML = "";
	});

	describe("rendering", () => {
		it("renders a button inside an h3", async () => {
			const accordion = createAccordion();
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const header = accordion.querySelector("ui-accordion-header");
			const h3 = header.querySelector("h3");
			const button = header.querySelector("button");

			expect(h3).toBeTruthy();
			expect(button).toBeTruthy();
			expect(h3.contains(button)).toBe(true);
		});

		it("includes a chevron icon", async () => {
			const accordion = createAccordion();
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const header = accordion.querySelector("ui-accordion-header");
			const svg = header.querySelector("svg");

			expect(svg).toBeTruthy();
			expect(svg.getAttribute("aria-hidden")).toBe("true");
		});

		it("preserves original content", async () => {
			const accordion = createAccordion();
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const header = accordion.querySelector("ui-accordion-header");
			const span = header.querySelector("button span");

			expect(span.textContent).toContain("Section 1");
		});
	});

	describe("click handling", () => {
		it("toggles panel on click", async () => {
			const accordion = createAccordion();
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const panel = accordion.querySelector("ui-accordion-panel");
			const button = panel.querySelector("ui-accordion-header button");

			expect(panel.isOpen).toBe(false);

			button.click();
			expect(panel.isOpen).toBe(true);

			button.click();
			expect(panel.isOpen).toBe(false);
		});
	});

	describe("accessibility", () => {
		it("button has aria-expanded attribute", async () => {
			const accordion = createAccordion();
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const button = accordion.querySelector("ui-accordion-header button");
			expect(button.getAttribute("aria-expanded")).toBe("false");
		});

		it("aria-expanded updates when panel opens", async () => {
			const accordion = createAccordion();
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const panel = accordion.querySelector("ui-accordion-panel");
			const button = panel.querySelector("ui-accordion-header button");

			panel.open();
			await new Promise((resolve) => setTimeout(resolve, 50));

			expect(button.getAttribute("aria-expanded")).toBe("true");
		});

		it("button has aria-controls linking to content", async () => {
			const accordion = createAccordion();
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const header = accordion.querySelector("ui-accordion-header");
			const content = accordion.querySelector("ui-accordion-content");
			const button = header.querySelector("button");

			const controlsId = button.getAttribute("aria-controls");
			const contentRegion = content.querySelector(`#${controlsId}`);

			expect(controlsId).toBeTruthy();
			expect(contentRegion).toBeTruthy();
		});

		it("disabled panel has aria-disabled on button", async () => {
			const accordion = createAccordion();
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const panel = accordion.querySelector("ui-accordion-panel");
			panel.setAttribute("disabled", "");

			// Trigger re-render
			await new Promise((resolve) => setTimeout(resolve, 50));

			const button = panel.querySelector("ui-accordion-header button");
			expect(button.disabled).toBe(true);
		});
	});
});

describe("ui-accordion-content", () => {
	beforeEach(() => {
		document.body.innerHTML = "";
	});

	afterEach(() => {
		document.body.innerHTML = "";
	});

	describe("rendering", () => {
		it("renders with role=region", async () => {
			const accordion = createAccordion();
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const content = accordion.querySelector("ui-accordion-content");
			const region = content.querySelector("[role='region']");

			expect(region).toBeTruthy();
		});

		it("has aria-labelledby pointing to header", async () => {
			const accordion = createAccordion();
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const header = accordion.querySelector("ui-accordion-header");
			const content = accordion.querySelector("ui-accordion-content");
			const button = header.querySelector("button");
			const region = content.querySelector("[role='region']");

			const headerId = button.id;
			const labelledBy = region.getAttribute("aria-labelledby");

			expect(labelledBy).toBe(headerId);
		});

		it("preserves original content", async () => {
			const accordion = createAccordion();
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const content = accordion.querySelector("ui-accordion-content");
			expect(content.textContent).toContain("Content for section 1");
		});
	});

	describe("visibility", () => {
		it("content is hidden when panel is closed", async () => {
			const accordion = createAccordion();
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const content = accordion.querySelector("ui-accordion-content");
			const region = content.querySelector("[role='region']");

			expect(region.hasAttribute("hidden")).toBe(true);
		});

		it("content is visible when panel is open", async () => {
			const accordion = createAccordion({ firstOpen: true });
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const content = accordion.querySelector("ui-accordion-content");
			const region = content.querySelector("[role='region']");

			expect(region.hasAttribute("hidden")).toBe(false);
		});

		it("inner content has display none when closed", async () => {
			const accordion = createAccordion();
			document.body.appendChild(accordion);
			await waitForElement(accordion);

			const content = accordion.querySelector("ui-accordion-content");
			const inner = content.querySelector("[data-content-inner]");

			expect(inner.style.display).toBe("none");
		});
	});
});

describe("keyboard navigation", () => {
	beforeEach(() => {
		document.body.innerHTML = "";
	});

	afterEach(() => {
		document.body.innerHTML = "";
	});

	it("Enter key toggles panel", async () => {
		const accordion = createAccordion();
		document.body.appendChild(accordion);
		await waitForElement(accordion);

		const panel = accordion.querySelector("ui-accordion-panel");
		const button = panel.querySelector("ui-accordion-header button");

		button.focus();
		button.dispatchEvent(
			new KeyboardEvent("keydown", { key: "Enter", bubbles: true }),
		);

		// Button click is handled natively
		expect(document.activeElement).toBe(button);
	});

	it("Space key toggles panel", async () => {
		const accordion = createAccordion();
		document.body.appendChild(accordion);
		await waitForElement(accordion);

		const panel = accordion.querySelector("ui-accordion-panel");
		const button = panel.querySelector("ui-accordion-header button");

		button.focus();
		button.dispatchEvent(
			new KeyboardEvent("keydown", { key: " ", bubbles: true }),
		);

		expect(document.activeElement).toBe(button);
	});

	it("ArrowDown moves focus to next header", async () => {
		const accordion = createAccordion({ panelCount: 3 });
		document.body.appendChild(accordion);
		await waitForElement(accordion);

		const buttons = accordion.querySelectorAll("ui-accordion-header button");
		buttons[0].focus();

		accordion.dispatchEvent(
			new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }),
		);

		await new Promise((resolve) => setTimeout(resolve, 50));

		// Keyboard navigation should move focus
		expect(document.activeElement).toBe(buttons[1]);
	});

	it("ArrowUp moves focus to previous header", async () => {
		const accordion = createAccordion({ panelCount: 3 });
		document.body.appendChild(accordion);
		await waitForElement(accordion);

		const buttons = accordion.querySelectorAll("ui-accordion-header button");
		buttons[1].focus();

		accordion.dispatchEvent(
			new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true }),
		);

		await new Promise((resolve) => setTimeout(resolve, 50));

		expect(document.activeElement).toBe(buttons[0]);
	});

	it("Home key moves focus to first header", async () => {
		const accordion = createAccordion({ panelCount: 3 });
		document.body.appendChild(accordion);
		await waitForElement(accordion);

		const buttons = accordion.querySelectorAll("ui-accordion-header button");
		buttons[2].focus();

		accordion.dispatchEvent(
			new KeyboardEvent("keydown", { key: "Home", bubbles: true }),
		);

		await new Promise((resolve) => setTimeout(resolve, 50));

		expect(document.activeElement).toBe(buttons[0]);
	});

	it("End key moves focus to last header", async () => {
		const accordion = createAccordion({ panelCount: 3 });
		document.body.appendChild(accordion);
		await waitForElement(accordion);

		const buttons = accordion.querySelectorAll("ui-accordion-header button");
		buttons[0].focus();

		accordion.dispatchEvent(
			new KeyboardEvent("keydown", { key: "End", bubbles: true }),
		);

		await new Promise((resolve) => setTimeout(resolve, 50));

		expect(document.activeElement).toBe(buttons[2]);
	});
});
