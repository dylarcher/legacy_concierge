/**
 * Details Accordion Component
 * A native HTMLDetailsElement-based accordion with expand/collapse controls
 * Styled with Legacy Concierge design system tokens
 *
 * @element details-accordion
 *
 * @attr {boolean} show-controls - Show expand/collapse all buttons
 * @attr {boolean} single-open - Only allow one panel to be open at a time
 * @attr {boolean} animate - Enable open/close animations
 *
 * @slot - Default slot for details elements
 *
 * @example
 * <details-accordion show-controls single-open>
 *   <details>
 *     <summary>Panel 1</summary>
 *     <p>Content 1</p>
 *   </details>
 *   <details>
 *     <summary>Panel 2</summary>
 *     <p>Content 2</p>
 *   </details>
 * </details-accordion>
 */

import { BaseComponent, clsx, defineElement, hashUtils } from "./_base.js";

export class DetailsAccordion extends BaseComponent {
	static get observedAttributes() {
		return [
			"show-controls",
			"single-open",
			"animate",
			"hash-prefix",
			"sync-hash",
		];
	}

	#boundToggleHandler = null;
	#boundHashChange = null;

	connectedCallback() {
		this.render();
		this.#attachListeners();
		this.#initFromHash();
	}

	disconnectedCallback() {
		this.#detachListeners();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue && this.isConnected) {
			this.render();
			this.#attachListeners();
		}
	}

	get showControls() {
		return this.getAttr("show-controls", false);
	}

	get singleOpen() {
		return this.getAttr("single-open", false);
	}

	get animate() {
		return this.getAttr("animate", false);
	}

	get hashPrefix() {
		return this.getAttribute("hash-prefix") || "accordion";
	}

	get syncHash() {
		return this.getAttr("sync-hash", false);
	}

	/**
	 * Get all details elements
	 * @returns {HTMLDetailsElement[]}
	 */
	getDetails() {
		return Array.from(this.querySelectorAll("details"));
	}

	/**
	 * Expand all panels
	 */
	expandAll() {
		this.getDetails().forEach((details) => {
			details.open = true;
		});
		this.emit("accordion-expand-all");
	}

	/**
	 * Collapse all panels
	 */
	collapseAll() {
		this.getDetails().forEach((details) => {
			details.open = false;
		});
		this.emit("accordion-collapse-all");
	}

	/**
	 * Toggle specific panel
	 * @param {number} index - Panel index
	 */
	toggle(index) {
		const details = this.getDetails();
		if (details[index]) {
			details[index].open = !details[index].open;
		}
	}

	#initFromHash() {
		if (!this.syncHash) return;

		const panelId = hashUtils.getValue(this.hashPrefix);
		if (panelId) {
			const details = this.getDetails();
			const target = details.find(
				(d) => d.id === panelId || d.dataset.panel === panelId,
			);
			if (target) {
				target.open = true;
				requestAnimationFrame(() => {
					target.scrollIntoView({ behavior: "instant", block: "start" });
				});
			}
		}
	}

	#handleHashChange = () => {
		if (!this.syncHash) return;

		const panelId = hashUtils.getValue(this.hashPrefix);
		if (panelId) {
			const details = this.getDetails();
			const target = details.find(
				(d) => d.id === panelId || d.dataset.panel === panelId,
			);
			if (target && !target.open) {
				target.open = true;
				target.scrollIntoView({ behavior: "smooth", block: "start" });
			}
		}
	};

	#attachListeners() {
		this.#detachListeners();

		this.#boundToggleHandler = this.#handleToggle.bind(this);
		this.addEventListener("toggle", this.#boundToggleHandler, true);

		if (this.syncHash) {
			this.#boundHashChange = this.#handleHashChange;
			window.addEventListener("hashchange", this.#boundHashChange);
		}
	}

	#detachListeners() {
		if (this.#boundToggleHandler) {
			this.removeEventListener("toggle", this.#boundToggleHandler, true);
			this.#boundToggleHandler = null;
		}
		if (this.#boundHashChange) {
			window.removeEventListener("hashchange", this.#boundHashChange);
			this.#boundHashChange = null;
		}
	}

	#handleToggle(event) {
		const details = event.target;
		if (!(details instanceof HTMLDetailsElement)) return;

		// Single open mode: close other panels when one opens
		if (this.singleOpen && details.open) {
			this.getDetails().forEach((otherDetails) => {
				if (otherDetails !== details && otherDetails.open) {
					otherDetails.open = false;
				}
			});
		}

		// Update hash when panel is opened
		if (this.syncHash && details.open) {
			const panelId = details.id || details.dataset.panel;
			if (panelId) {
				hashUtils.set(hashUtils.create(this.hashPrefix, panelId));
			}
		}

		this.emit("accordion-toggle", {
			target: details,
			open: details.open,
			index: this.getDetails().indexOf(details),
		});
	}

	#createControls() {
		if (!this.showControls) return null;

		const buttonClasses = clsx("btn-base btn-padding btn-subtle", "text-sm");

		return this.h(
			"div",
			{
				class: "flex gap-2 mb-4 justify-end",
				part: "controls",
			},
			this.h(
				"button",
				{
					type: "button",
					class: buttonClasses,
					onClick: () => this.expandAll(),
				},
				"Expand All",
			),
			this.h(
				"button",
				{
					type: "button",
					class: buttonClasses,
					onClick: () => this.collapseAll(),
				},
				"Collapse All",
			),
		);
	}

	render() {
		// Apply animation styles if enabled
		if (this.animate) {
			this.#applyAnimationStyles();
		}

		// Wrap existing content
		const existingControls = this.querySelector("[part='controls']");
		if (this.showControls && !existingControls) {
			const controls = this.#createControls();
			if (controls) {
				this.insertBefore(controls, this.firstChild);
			}
		} else if (!this.showControls && existingControls) {
			existingControls.remove();
		}

		// Apply styles to details elements
		this.getDetails().forEach((details) => {
			details.classList.add("accordion-panel");

			const summary = details.querySelector("summary");
			if (summary) {
				// Apply design system styles
				summary.classList.add(
					"cursor-pointer",
					"select-none",
					"list-none",
					"py-4",
					"px-5",
					"font-medium",
					"rounded-lg",
					"transition-colors",
					"duration-150",
					"flex",
					"items-center",
					"justify-between",
					"gap-4",
				);
				// Use design tokens via inline styles
				summary.style.backgroundColor = "var(--color-surface-muted)";
				summary.style.color = "var(--color-text)";

				// Add chevron indicator if not present
				if (!summary.querySelector(".accordion-icon")) {
					const icon = this.#createChevronIcon();
					summary.appendChild(icon);
				}
			}
		});

		// Add base styles
		if (!this.classList.contains("block")) {
			this.classList.add("block", "space-y-2");
		}
	}

	#applyAnimationStyles() {
		const styleId = "details-accordion-animations";
		if (!document.getElementById(styleId)) {
			const style = document.createElement("style");
			style.id = styleId;
			style.textContent = `
				details-accordion details {
					overflow: hidden;
				}
				details-accordion details[open] summary ~ * {
					animation: accordion-open 0.2s ease-out;
				}
				details-accordion details:not([open]) summary ~ * {
					animation: accordion-close 0.15s ease-in;
				}
				@keyframes accordion-open {
					from { opacity: 0; transform: translateY(-8px); }
					to { opacity: 1; transform: translateY(0); }
				}
				@keyframes accordion-close {
					from { opacity: 1; transform: translateY(0); }
					to { opacity: 0; transform: translateY(-8px); }
				}
				details-accordion summary::-webkit-details-marker,
				details-accordion summary::marker {
					display: none;
				}
				details-accordion details[open] .accordion-icon {
					transform: rotate(180deg);
				}
				details-accordion .accordion-icon {
					transition: transform 0.2s ease;
				}
				details-accordion summary:hover {
					background-color: var(--color-surface-soft) !important;
				}
			`;
			document.head.appendChild(style);
		}
	}

	#createChevronIcon() {
		const wrapper = this.h("span", { class: "accordion-icon shrink-0" });
		const svg = this.svg(
			"svg",
			{
				class: "w-5 h-5",
				fill: "none",
				viewBox: "0 0 24 24",
				"stroke-width": "2",
				stroke: "currentColor",
			},
			this.svg("path", {
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				d: "M19 9l-7 7-7-7",
			}),
		);
		wrapper.appendChild(svg);
		return wrapper;
	}
}

defineElement("details-accordion", DetailsAccordion);
export default DetailsAccordion;
