/**
 * Treatment Card Dialog Component
 * Fullscreen dialog triggered by treatment cards with animated close button
 *
 * @module components/treatment-dialog
 */

import { BaseComponent, defineElement } from "../_base.js";

/**
 * Treatment Dialog Web Component
 * Creates a fullscreen dialog with background image and gradient overlay
 *
 * @example
 * <treatment-dialog
 *   title="Comprehensive Assessment"
 *   image="/path/to/image.webp"
 * >
 *   <p>Dialog content here...</p>
 * </treatment-dialog>
 */
export class TreatmentDialog extends BaseComponent {
	static get observedAttributes() {
		return ["title", "image", "open"];
	}

	/** @type {HTMLDialogElement|null} */
	#dialog = null;

	/** @type {HTMLButtonElement|null} */
	#closeButton = null;

	/** @type {boolean} */
	#isOpen = false;

	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	disconnectedCallback() {
		this.#dialog?.removeEventListener("close", this.#handleClose);
		this.#dialog?.removeEventListener("click", this.#handleBackdropClick);
		this.#closeButton?.removeEventListener("click", this.#handleCloseClick);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue) {
			if (name === "open") {
				if (newValue !== null) {
					this.open();
				} else {
					this.close();
				}
			} else if (this.isConnected) {
				this.render();
			}
		}
	}

	/**
	 * Opens the dialog
	 */
	open() {
		if (this.#dialog && !this.#isOpen) {
			this.#isOpen = true;
			this.#dialog.showModal();
			document.body.style.overflow = "hidden";
			// Add open state class for animation
			requestAnimationFrame(() => {
				this.#dialog.dataset.state = "open";
			});
		}
	}

	/**
	 * Closes the dialog
	 */
	close() {
		if (this.#dialog && this.#isOpen) {
			this.#dialog.dataset.state = "closing";
			// Wait for animation before closing
			setTimeout(() => {
				this.#isOpen = false;
				this.#dialog.close();
				document.body.style.overflow = "";
				this.#dialog.dataset.state = "closed";
				this.removeAttribute("open");
			}, 200);
		}
	}

	/**
	 * Toggles the dialog open/closed
	 */
	toggle() {
		if (this.#isOpen) {
			this.close();
		} else {
			this.open();
		}
	}

	#handleClose = () => {
		this.#isOpen = false;
		document.body.style.overflow = "";
		this.removeAttribute("open");
	};

	#handleBackdropClick = (event) => {
		if (event.target === this.#dialog) {
			this.close();
		}
	};

	#handleCloseClick = () => {
		this.close();
	};

	render() {
		const title = this.getAttribute("title") || "";
		const image = this.getAttribute("image") || "";

		// Clear existing content
		this.innerHTML = "";

		// Create dialog element
		this.#dialog = this.h("dialog", {
			class: [
				"fixed inset-0 z-50 m-0 h-full max-h-full w-full max-w-full",
				"overflow-y-auto bg-transparent p-0 border-0",
				"backdrop:bg-transparent",
				"[&[data-state=open]]:animate-fade-in",
				"[&[data-state=closing]]:animate-fade-out",
			].join(" "),
			"data-state": "closed",
		});

		// Background image container
		const bgContainer = this.h("div", {
			class: "fixed inset-0 w-full h-full",
		});

		// Background image
		if (image) {
			const bgImage = this.h("img", {
				src: image,
				alt: "",
				role: "presentation",
				class: "absolute inset-0 w-full h-full object-cover",
			});
			bgContainer.appendChild(bgImage);
		}

		// Gradient overlay
		const gradientOverlay = this.h("div", {
			class: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40",
		});
		bgContainer.appendChild(gradientOverlay);

		this.#dialog.appendChild(bgContainer);

		// Close button (the "+" rotated to "x")
		this.#closeButton = this.h(
			"button",
			{
				type: "button",
				class: [
					"fixed top-6 right-6 z-10 size-14 rounded-full",
					"flex items-center justify-center",
					"bg-primary text-white",
					"transform rotate-45 scale-125",
					"hover:scale-150 hover:bg-primary/90",
					"transition-all duration-300 ease-out",
					"cursor-pointer border-0 outline-none",
					"focus:ring-2 focus:ring-white/50",
				].join(" "),
				"aria-label": "Close dialog",
			},
			this.#createPlusIcon(),
		);
		this.#dialog.appendChild(this.#closeButton);

		// Content container
		const contentContainer = this.h("div", {
			class: [
				"relative z-0 min-h-full flex flex-col",
				"justify-end items-center",
				"p-8 pb-16 sm:p-12 md:p-16 lg:p-24",
			].join(" "),
		});

		// Title
		if (title) {
			const titleEl = this.h(
				"h2",
				{
					class: [
						"text-white font-serif text-3xl md:text-4xl lg:text-5xl",
						"text-center mb-8 max-w-4xl",
					].join(" "),
				},
				title,
			);
			contentContainer.appendChild(titleEl);
		}

		// Slot for user content
		const contentSlot = this.h("div", {
			class: [
				"text-white/90 text-lg md:text-xl",
				"text-center max-w-3xl",
				"space-y-6",
			].join(" "),
		});

		// Move slotted content
		const slottedContent = this.h("slot");
		contentSlot.appendChild(slottedContent);

		// Placeholder content if no slot content
		const placeholder = this.h(
			"p",
			{
				class: "text-white/70 italic",
			},
			"More information coming soon...",
		);
		contentSlot.appendChild(placeholder);

		contentContainer.appendChild(contentSlot);
		this.#dialog.appendChild(contentContainer);

		// Event listeners
		this.#dialog.addEventListener("close", this.#handleClose);
		this.#dialog.addEventListener("click", this.#handleBackdropClick);
		this.#closeButton.addEventListener("click", this.#handleCloseClick);

		// Use shadow DOM for slot functionality
		if (!this.shadowRoot) {
			this.attachShadow({ mode: "open" });
		}
		this.shadowRoot.innerHTML = `
			<style>
				:host {
					display: contents;
				}
				@keyframes fade-in {
					from { opacity: 0; }
					to { opacity: 1; }
				}
				@keyframes fade-out {
					from { opacity: 1; }
					to { opacity: 0; }
				}
				dialog[data-state="open"] {
					animation: fade-in 0.2s ease-out forwards;
				}
				dialog[data-state="closing"] {
					animation: fade-out 0.2s ease-out forwards;
				}
			</style>
		`;
		this.shadowRoot.appendChild(this.#dialog);
	}

	/**
	 * Creates the plus icon SVG
	 * @returns {SVGElement}
	 */
	#createPlusIcon() {
		return this.svg(
			"svg",
			{
				xmlns: "http://www.w3.org/2000/svg",
				viewBox: "0 0 24 24",
				fill: "currentColor",
				class: "size-full p-2",
			},
			this.svg("path", {
				"stroke": "none",
				"d": "M0 0h24v24H0z",
				"fill": "none",
			}),
			this.svg("path", {
				d: "M4.929 4.929a10 10 0 1 1 14.141 14.141a10 10 0 0 1 -14.14 -14.14zm8.071 4.071a1 1 0 1 0 -2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0 -2h-2v-2z",
			}),
		);
	}
}

defineElement("treatment-dialog", TreatmentDialog);
