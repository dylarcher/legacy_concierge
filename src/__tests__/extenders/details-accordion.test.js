/**
 * Details Accordion Component Tests
 *
 * Tests hash synchronization, single-open mode, and expand/collapse logic.
 *
 * @module details-accordion.test
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import "../../blocks/extenders/details-accordion.js";

// Mock scrollIntoView since jsdom doesn't implement it
Element.prototype.scrollIntoView = vi.fn();

describe("DetailsAccordion", () => {
	let accordion;

	beforeEach(() => {
		document.body.innerHTML = "";
		// Clear hash
		history.replaceState(null, "", window.location.pathname);
		// Reset scrollIntoView mock
		vi.clearAllMocks();
	});

	afterEach(() => {
		document.body.innerHTML = "";
		history.replaceState(null, "", window.location.pathname);
	});

	/**
	 * Helper to create accordion with panels
	 */
	function createAccordion(options = {}) {
		const { panelCount = 3, singleOpen = false, syncHash = false, hashPrefix = "accordion" } = options;

		accordion = document.createElement("details-accordion");

		if (singleOpen) accordion.setAttribute("single-open", "");
		if (syncHash) accordion.setAttribute("sync-hash", "");
		if (hashPrefix !== "accordion") accordion.setAttribute("hash-prefix", hashPrefix);

		for (let i = 0; i < panelCount; i++) {
			const details = document.createElement("details");
			details.id = `panel-${i}`;
			details.innerHTML = `
				<summary>Panel ${i}</summary>
				<p>Content for panel ${i}</p>
			`;
			accordion.appendChild(details);
		}

		document.body.appendChild(accordion);
		return accordion;
	}

	describe("Basic Functionality", () => {
		it("renders as custom element", () => {
			createAccordion();
			expect(accordion.tagName.toLowerCase()).toBe("details-accordion");
		});

		it("finds all details elements", () => {
			createAccordion({ panelCount: 4 });
			const details = accordion.getDetails();
			expect(details.length).toBe(4);
		});

		it("all panels start closed by default", () => {
			createAccordion();
			const details = accordion.getDetails();
			details.forEach((d) => {
				expect(d.open).toBe(false);
			});
		});
	});

	describe("expandAll / collapseAll", () => {
		it("expandAll opens all panels", () => {
			createAccordion();
			accordion.expandAll();

			const details = accordion.getDetails();
			details.forEach((d) => {
				expect(d.open).toBe(true);
			});
		});

		it("collapseAll closes all panels", () => {
			createAccordion();

			// First open all
			accordion.expandAll();
			// Then collapse
			accordion.collapseAll();

			const details = accordion.getDetails();
			details.forEach((d) => {
				expect(d.open).toBe(false);
			});
		});

		it("expandAll emits accordion-expand-all event", () => {
			createAccordion();
			const handler = vi.fn();
			accordion.addEventListener("accordion-expand-all", handler);

			accordion.expandAll();

			expect(handler).toHaveBeenCalled();
		});

		it("collapseAll emits accordion-collapse-all event", () => {
			createAccordion();
			const handler = vi.fn();
			accordion.addEventListener("accordion-collapse-all", handler);

			accordion.collapseAll();

			expect(handler).toHaveBeenCalled();
		});
	});

	describe("toggle(index)", () => {
		it("toggles specific panel by index", () => {
			createAccordion();

			accordion.toggle(1);
			expect(accordion.getDetails()[1].open).toBe(true);

			accordion.toggle(1);
			expect(accordion.getDetails()[1].open).toBe(false);
		});

		it("handles invalid index gracefully", () => {
			createAccordion({ panelCount: 2 });

			// Should not throw
			accordion.toggle(10);
			accordion.toggle(-1);
		});
	});

	describe("Single Open Mode", () => {
		it("closes other panels when one opens", async () => {
			createAccordion({ singleOpen: true });
			const details = accordion.getDetails();

			// Open first panel
			details[0].open = true;
			details[0].dispatchEvent(new Event("toggle", { bubbles: true }));

			// Open second panel
			details[1].open = true;
			details[1].dispatchEvent(new Event("toggle", { bubbles: true }));

			// First should be closed
			expect(details[0].open).toBe(false);
			expect(details[1].open).toBe(true);
		});

		it("allows multiple panels open when single-open is false", () => {
			createAccordion({ singleOpen: false });
			const details = accordion.getDetails();

			// Open first panel
			details[0].open = true;
			details[0].dispatchEvent(new Event("toggle", { bubbles: true }));

			// Open second panel
			details[1].open = true;
			details[1].dispatchEvent(new Event("toggle", { bubbles: true }));

			// Both should be open
			expect(details[0].open).toBe(true);
			expect(details[1].open).toBe(true);
		});

		it("emits accordion-toggle event with panel info", () => {
			createAccordion({ singleOpen: true });
			const details = accordion.getDetails();
			const handler = vi.fn();

			accordion.addEventListener("accordion-toggle", handler);

			details[1].open = true;
			details[1].dispatchEvent(new Event("toggle", { bubbles: true }));

			expect(handler).toHaveBeenCalled();
			const event = handler.mock.calls[0][0];
			expect(event.detail.index).toBe(1);
			expect(event.detail.open).toBe(true);
			expect(event.detail.target).toBe(details[1]);
		});
	});

	describe("Hash Synchronization", () => {
		describe("Initialization from Hash", () => {
			it("opens panel matching URL hash on mount", () => {
				// Set hash before creating accordion
				history.replaceState(null, "", "#accordion-panel-1");

				createAccordion({ syncHash: true });

				const details = accordion.getDetails();
				expect(details[1].open).toBe(true);
			});

			it("no panels open if hash does not match", () => {
				history.replaceState(null, "", "#accordion-nonexistent");

				createAccordion({ syncHash: true });

				const details = accordion.getDetails();
				details.forEach((d) => {
					expect(d.open).toBe(false);
				});
			});

			it("respects custom hash prefix", () => {
				history.replaceState(null, "", "#faq-panel-0");

				createAccordion({ syncHash: true, hashPrefix: "faq" });

				const details = accordion.getDetails();
				expect(details[0].open).toBe(true);
			});

			it("matches by data-panel attribute", () => {
				history.replaceState(null, "", "#accordion-custom-id");

				accordion = document.createElement("details-accordion");
				accordion.setAttribute("sync-hash", "");

				const details = document.createElement("details");
				details.dataset.panel = "custom-id";
				details.innerHTML = "<summary>Custom</summary><p>Content</p>";
				accordion.appendChild(details);

				document.body.appendChild(accordion);

				expect(details.open).toBe(true);
			});
		});

		describe("Hash Updates on Toggle", () => {
			it("updates hash when panel with ID opens", () => {
				createAccordion({ syncHash: true });
				const details = accordion.getDetails();

				details[2].open = true;
				details[2].dispatchEvent(new Event("toggle", { bubbles: true }));

				expect(window.location.hash).toBe("#accordion-panel-2");
			});

			it("does not update hash when syncHash is false", () => {
				createAccordion({ syncHash: false });
				const details = accordion.getDetails();

				details[0].open = true;
				details[0].dispatchEvent(new Event("toggle", { bubbles: true }));

				expect(window.location.hash).toBe("");
			});

			it("uses custom hash prefix", () => {
				createAccordion({ syncHash: true, hashPrefix: "section" });
				const details = accordion.getDetails();

				details[1].open = true;
				details[1].dispatchEvent(new Event("toggle", { bubbles: true }));

				expect(window.location.hash).toBe("#section-panel-1");
			});
		});

		describe("Hash Change Event Handling", () => {
			it("opens panel when hash changes to matching ID", () => {
				createAccordion({ syncHash: true });
				const details = accordion.getDetails();

				// Initially all closed
				expect(details[2].open).toBe(false);

				// Simulate hash change
				history.replaceState(null, "", "#accordion-panel-2");
				window.dispatchEvent(new HashChangeEvent("hashchange"));

				expect(details[2].open).toBe(true);
			});

			it("does not respond to hash change when syncHash is false", () => {
				createAccordion({ syncHash: false });
				const details = accordion.getDetails();

				history.replaceState(null, "", "#accordion-panel-1");
				window.dispatchEvent(new HashChangeEvent("hashchange"));

				expect(details[1].open).toBe(false);
			});

			it("does not open already-open panel again", () => {
				createAccordion({ syncHash: true });
				const details = accordion.getDetails();

				// Open the panel first
				details[1].open = true;

				// Clear any previous calls
				vi.clearAllMocks();

				// Trigger hash change to same panel
				history.replaceState(null, "", "#accordion-panel-1");
				window.dispatchEvent(new HashChangeEvent("hashchange"));

				// Should not scroll since already open
				// (the handler checks !target.open before scrolling)
				expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
			});
		});

		describe("Multiple Accordions with Different Prefixes", () => {
			it("only responds to matching prefix", () => {
				// Create two accordions with different prefixes
				const accordion1 = document.createElement("details-accordion");
				accordion1.setAttribute("sync-hash", "");
				accordion1.setAttribute("hash-prefix", "faq");
				accordion1.innerHTML = `
					<details id="faq-1"><summary>FAQ 1</summary><p>Content</p></details>
				`;

				const accordion2 = document.createElement("details-accordion");
				accordion2.setAttribute("sync-hash", "");
				accordion2.setAttribute("hash-prefix", "help");
				accordion2.innerHTML = `
					<details id="help-1"><summary>Help 1</summary><p>Content</p></details>
				`;

				document.body.appendChild(accordion1);
				document.body.appendChild(accordion2);

				// Set hash for faq
				history.replaceState(null, "", "#faq-faq-1");
				window.dispatchEvent(new HashChangeEvent("hashchange"));

				expect(accordion1.querySelector("details").open).toBe(true);
				expect(accordion2.querySelector("details").open).toBe(false);
			});
		});
	});

	describe("Show Controls", () => {
		it("renders expand/collapse buttons when show-controls is set", () => {
			accordion = document.createElement("details-accordion");
			accordion.setAttribute("show-controls", "");
			accordion.innerHTML = `
				<details><summary>Panel</summary><p>Content</p></details>
			`;
			document.body.appendChild(accordion);

			const controls = accordion.querySelector("[part='controls']");
			expect(controls).not.toBeNull();

			const buttons = controls.querySelectorAll("button");
			expect(buttons.length).toBe(2);
		});

		it("expand all button works", () => {
			accordion = document.createElement("details-accordion");
			accordion.setAttribute("show-controls", "");
			accordion.innerHTML = `
				<details><summary>Panel 1</summary><p>Content</p></details>
				<details><summary>Panel 2</summary><p>Content</p></details>
			`;
			document.body.appendChild(accordion);

			const expandBtn = accordion.querySelector("[part='controls'] button");
			expandBtn.click();

			const details = accordion.getDetails();
			details.forEach((d) => {
				expect(d.open).toBe(true);
			});
		});

		it("does not render controls when show-controls is not set", () => {
			createAccordion();

			const controls = accordion.querySelector("[part='controls']");
			expect(controls).toBeNull();
		});
	});

	describe("Animation Support", () => {
		it("injects animation styles when animate is set", () => {
			accordion = document.createElement("details-accordion");
			accordion.setAttribute("animate", "");
			accordion.innerHTML = `
				<details><summary>Panel</summary><p>Content</p></details>
			`;
			document.body.appendChild(accordion);

			const style = document.getElementById("details-accordion-animations");
			expect(style).not.toBeNull();
		});

		it("adds accordion-icon to summaries", () => {
			createAccordion();

			const icons = accordion.querySelectorAll(".accordion-icon");
			expect(icons.length).toBe(3);
		});
	});

	describe("Cleanup", () => {
		it("removes event listeners on disconnect", () => {
			createAccordion({ syncHash: true });

			const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

			accordion.remove();

			expect(removeEventListenerSpy).toHaveBeenCalledWith(
				"hashchange",
				expect.any(Function),
			);
		});
	});

	describe("Attribute Getters", () => {
		it("showControls returns boolean", () => {
			accordion = document.createElement("details-accordion");
			document.body.appendChild(accordion);

			expect(accordion.showControls).toBe(false);

			accordion.setAttribute("show-controls", "");
			expect(accordion.showControls).toBe(true);
		});

		it("singleOpen returns boolean", () => {
			accordion = document.createElement("details-accordion");
			document.body.appendChild(accordion);

			expect(accordion.singleOpen).toBe(false);

			accordion.setAttribute("single-open", "");
			expect(accordion.singleOpen).toBe(true);
		});

		it("hashPrefix returns default or custom value", () => {
			accordion = document.createElement("details-accordion");
			document.body.appendChild(accordion);

			expect(accordion.hashPrefix).toBe("accordion");

			accordion.setAttribute("hash-prefix", "custom");
			expect(accordion.hashPrefix).toBe("custom");
		});

		it("syncHash returns boolean", () => {
			accordion = document.createElement("details-accordion");
			document.body.appendChild(accordion);

			expect(accordion.syncHash).toBe(false);

			accordion.setAttribute("sync-hash", "");
			expect(accordion.syncHash).toBe(true);
		});
	});
});
