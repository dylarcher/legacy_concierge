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

		// Use shadow DOM for slot functionality
		if (!this.shadowRoot) {
			this.attachShadow({ mode: "open" });
		}

		// Clear existing shadow content
		this.shadowRoot.innerHTML = "";

		// Create style element
		const style = document.createElement("style");
		style.textContent = `
			:host {
				display: contents;
			}
			dialog {
				position: fixed;
				inset: 0;
				width: 100dvw;
				height: 100dvh;
				max-width: 100dvw;
				max-height: 100dvh;
				margin: 0;
				padding: 56px;
				border: none;
				outline: none;
				background-size: cover;
				background-position: center;
				background-repeat: no-repeat;
				overflow-y: auto;
				box-sizing: border-box;
			}
			dialog::backdrop {
				background: transparent;
			}
			.gradient-overlay {
				position: fixed;
				inset: 0;
				width: 100%;
				height: 100dvh;
				background: linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.80) 50%, rgba(0,0,0,0.60));
				pointer-events: none;
			}
			.close-button {
				position: absolute;
				top: 48px;
				right: 48px;
				z-index: 10;
				width: 48px;
				height: 48px;
				display: flex;
				align-items: center;
				justify-content: center;
				background: white;
				color: black;
				border: none;
				border-radius: 50%;
				cursor: pointer;
				outline: none;
				padding: 12px;
				transition: transform 0.2s ease-out, opacity 0.2s ease-out;
			}
			.close-button:hover {
				transform: scale(1.1);
			}
			.close-button svg {
				width: 100%;
				height: 100%;
			}
			.content-container {
				position: relative;
				z-index: 1;
				min-height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				align-items: flex-start;
				max-width: 960px;
				box-sizing: border-box;
			}
			.dialog-title {
				font-family: "Playfair Display", serif;
				font-size: clamp(2rem, 5vw, 3.5rem);
				font-weight: 400;
				color: white;
				margin: 0 0 1.5rem 0;
				line-height: 1.2;
			}
			.content-slot {
				font-family: "Work Sans", sans-serif;
				font-size: 1.25rem;
				line-height: 1.6;
				color: white;
			}
			.content-slot p {
				margin: 0 0 1rem 0;
			}
			.placeholder {
				font-style: italic;
				color: white;
			}
			::slotted(*) {
				font-family: "Work Sans", sans-serif;
				color: white;
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
		`;
		this.shadowRoot.appendChild(style);

		// Create dialog element
		this.#dialog = document.createElement("dialog");
		this.#dialog.dataset.state = "closed";

		// Set background image
		if (image) {
			this.#dialog.style.backgroundImage = `url('${image}')`;
		}

		// Gradient overlay
		const gradientOverlay = document.createElement("div");
		gradientOverlay.className = "gradient-overlay";
		this.#dialog.appendChild(gradientOverlay);

		// Close button (X icon)
		this.#closeButton = document.createElement("button");
		this.#closeButton.type = "button";
		this.#closeButton.className = "close-button";
		this.#closeButton.setAttribute("aria-label", "Close dialog");
		this.#closeButton.appendChild(this.#createCloseIcon());
		this.#dialog.appendChild(this.#closeButton);

		// Content container
		const contentContainer = document.createElement("div");
		contentContainer.className = "content-container";

		// Title
		if (title) {
			const titleEl = document.createElement("h2");
			titleEl.className = "dialog-title";
			titleEl.textContent = title;
			contentContainer.appendChild(titleEl);
		}

		// Slot for user content
		const contentSlot = document.createElement("div");
		contentSlot.className = "content-slot";

		// Slot element
		const slottedContent = document.createElement("slot");
		contentSlot.appendChild(slottedContent);

		// Placeholder content
		const placeholder = document.createElement("p");
		placeholder.className = "placeholder";
		placeholder.textContent = "More information coming soon...";
		contentSlot.appendChild(placeholder);

		contentContainer.appendChild(contentSlot);
		this.#dialog.appendChild(contentContainer);

		// Event listeners
		this.#dialog.addEventListener("close", this.#handleClose);
		this.#dialog.addEventListener("click", this.#handleBackdropClick);
		this.#closeButton.addEventListener("click", this.#handleCloseClick);

		this.shadowRoot.appendChild(this.#dialog);
	}

	/**
	 * Creates the close (X) icon SVG
	 * @returns {SVGElement}
	 */
	#createCloseIcon() {
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttribute("viewBox", "0 0 24 24");
		svg.setAttribute("fill", "none");
		svg.setAttribute("stroke", "currentColor");
		svg.setAttribute("stroke-width", "2.5");
		svg.setAttribute("stroke-linecap", "round");
		svg.setAttribute("stroke-linejoin", "round");

		const line1 = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"line",
		);
		line1.setAttribute("x1", "6");
		line1.setAttribute("y1", "6");
		line1.setAttribute("x2", "18");
		line1.setAttribute("y2", "18");

		const line2 = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"line",
		);
		line2.setAttribute("x1", "6");
		line2.setAttribute("y1", "18");
		line2.setAttribute("x2", "18");
		line2.setAttribute("y2", "6");

		svg.appendChild(line1);
		svg.appendChild(line2);

		return svg;
	}
}

defineElement("treatment-dialog", TreatmentDialog);
