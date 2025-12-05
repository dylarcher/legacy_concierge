import { resolveImage } from "../../assets/image-manifest.js";
import { BaseComponent, defineElement } from "../_base.js";

/**
 * `<card-toggle-dialog>` is a custom element that displays a card with a background image,
 * gradient overlay, title, and a circular toggle button that can trigger a dialog.
 *
 * @element card-toggle-dialog
 *
 * @attribute {string} bg-image - The URL of the background image.
 * @attribute {string} bg-position - The CSS background-position value (default: "center").
 * @attribute {string} bg-size - The CSS background-size value (default: "cover").
 * @attribute {boolean} open - Whether the toggle is in the open state.
 * @attribute {string} title - The title text displayed at the bottom of the card.
 *
 * @fires toggle - Dispatched when the toggle button is clicked, with detail { open: boolean }
 *
 * @slot title - Slot for the card's title content.
 * @slot icon - Slot for custom icon content in the toggle button.
 *
 * @example
 * <card-toggle-dialog
 *   bg-image="treatment-assessment.jpg"
 *   title="Comprehensive Medical & Environmental Assessment"
 * >
 * </card-toggle-dialog>
 *
 * @example
 * <card-toggle-dialog bg-image="service-image.jpg">
 *   <span slot="title">Custom Title Content</span>
 *   <span slot="icon">+</span>
 * </card-toggle-dialog>
 */
class CardToggleDialog extends BaseComponent {
	static get observedAttributes() {
		return ["bg-image", "bg-position", "bg-size", "open", "title"];
	}

	connectedCallback() {
		this.render();
		this.#setupEventListeners();
	}

	disconnectedCallback() {
		this.#removeEventListeners();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue && this.isConnected) {
			this.render();
			if (name !== "open") {
				this.#setupEventListeners();
			}
		}
	}

	/**
	 * Gets the open state of the toggle
	 * @returns {boolean}
	 */
	get open() {
		return this.hasAttribute("open");
	}

	/**
	 * Sets the open state of the toggle
	 * @param {boolean} value
	 */
	set open(value) {
		if (value) {
			this.setAttribute("open", "");
		} else {
			this.removeAttribute("open");
		}
	}

	/**
	 * Toggles the open state
	 */
	toggle() {
		this.open = !this.open;
		this.emit("toggle", { open: this.open });
	}

	#handleClick = (event) => {
		const button = event.target.closest("[data-toggle-button]");
		if (button) {
			this.toggle();
		}
	};

	#handleKeydown = (event) => {
		const button = event.target.closest("[data-toggle-button]");
		if (button && (event.key === "Enter" || event.key === " ")) {
			event.preventDefault();
			this.toggle();
		}
	};

	#setupEventListeners() {
		this.addEventListener("click", this.#handleClick);
		this.addEventListener("keydown", this.#handleKeydown);
	}

	#removeEventListeners() {
		this.removeEventListener("click", this.#handleClick);
		this.removeEventListener("keydown", this.#handleKeydown);
	}

	render() {
		const bgImageAttr = this.getAttribute("bg-image");
		const bgImage = bgImageAttr ? resolveImage(bgImageAttr) : "";
		const bgPosition = this.getAttribute("bg-position") || "center";
		const bgSize = this.getAttribute("bg-size") || "cover";
		const isOpen = this.hasAttribute("open");
		const titleText = this.getAttribute("title") || "";

		// Container classes - card with rounded corners and background
		const containerClasses = this.combineClassNames(
			"relative",
			"rounded-2xl",
			"overflow-hidden",
			"min-h-[520px]",
			"w-full",
			"max-w-[520px]",
			"flex",
			"flex-col",
			"justify-end",
		);

		// Gradient overlay - darker at bottom for text readability
		const overlayClasses = this.combineClassNames(
			"absolute",
			"inset-0",
			"bg-linear-to-t",
			"from-black/70",
			"via-black/30",
			"to-transparent",
			"pointer-events-none",
		);

		// Toggle button container - positioned top-right
		const buttonContainerClasses = this.combineClassNames(
			"absolute",
			"top-6",
			"right-6",
			"z-10",
		);

		// Toggle button - circular with open/close states
		const buttonClasses = this.combineClassNames(
			"w-14",
			"h-14",
			"rounded-full",
			"flex",
			"items-center",
			"justify-center",
			"transition-all",
			"duration-300",
			"cursor-pointer",
			"focus:outline-none",
			"focus-visible:ring-2",
			"focus-visible:ring-white",
			"focus-visible:ring-offset-2",
			"focus-visible:ring-offset-transparent",
			isOpen ? "bg-white/20 backdrop-blur-sm" : "bg-white shadow-lg",
		);

		// Icon classes - rotates when open
		const iconClasses = this.combineClassNames(
			"text-2xl",
			"font-light",
			"leading-none",
			"transition-transform",
			"duration-300",
			isOpen ? "rotate-45 text-white" : "text-neutral-800",
		);

		// Title container - positioned at bottom
		const titleContainerClasses = this.combineClassNames(
			"relative",
			"z-10",
			"p-6",
			"pt-32",
		);

		// Title text styles
		const titleClasses = this.combineClassNames(
			"font-semibold",
			"text-white",
			"text-[29px]",
			"leading-tight",
		);

		this.innerHTML = "";

		const container = this.createElement(
			"div",
			{
				class: containerClasses,
				style: bgImage
					? `background-image: url(${bgImage}); background-position: ${bgPosition}; background-size: ${bgSize};`
					: "background-color: var(--color-surface-muted);",
			},
			// Gradient overlay
			this.createElement("div", { class: overlayClasses }),
			// Toggle button
			this.createElement(
				"div",
				{ class: buttonContainerClasses },
				this.createElement(
					"button",
					{
						type: "button",
						class: buttonClasses,
						"data-toggle-button": "",
						"aria-pressed": isOpen ? "true" : "false",
						"aria-label": isOpen ? "Close dialog" : "Open dialog",
					},
					this.createElement(
						"span",
						{ class: iconClasses },
						this.createElement("slot", { name: "icon" }, "+"),
					),
				),
			),
			// Title section
			this.createElement(
				"div",
				{ class: titleContainerClasses },
				titleText
					? this.createElement("p", { class: titleClasses }, titleText)
					: this.createElement(
							"p",
							{ class: titleClasses },
							this.createElement("slot", { name: "title" }),
						),
			),
		);

		this.appendChild(container);
	}
}

defineElement("card-toggle-dialog", CardToggleDialog);

export { CardToggleDialog };
