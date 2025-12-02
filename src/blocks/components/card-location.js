import { BaseComponent, defineElement } from "../_base.js";

/**
 * Location card component with background image, title, and button slots
 *
 * @element ui-card-location
 * @attr {string} bg-image - URL to background image
 * @attr {string} bg-position - CSS background-position value (default: center)
 * @attr {string} bg-size - CSS background-size value (default: cover)
 *
 * @slot title - Title content displayed near the top
 * @slot button - Button content displayed near the bottom
 * @slot default - Default slot for additional content
 *
 * @example
 * <ui-card-location bg-image="/path/to/image.jpg">
 *   <h3 slot="title">Wellness Concierge Clinic</h3>
 *   <ui-button slot="button" color="white">View Location</ui-button>
 * </ui-card-location>
 *
 * @example
 * <!-- Without slots, simply adds background to child elements -->
 * <ui-card-location bg-image="/path/to/image.jpg">
 *   <h3>Custom Content</h3>
 *   <p>More content here</p>
 * </ui-card-location>
 */
export class CardLocation extends BaseComponent {
	static get observedAttributes() {
		return ["bg-image", "bg-position", "bg-size"];
	}

	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Called when observed attributes change
	 * @returns {void}
	 */
	attributeChangedCallback(_name, oldValue, newValue) {
		if (oldValue !== newValue && this.isConnected) {
			this.render();
		}
	}

	/**
	 * Renders the location card with background image and optional slots
	 * @returns {void}
	 */
	render() {
		const bgImage = this.getAttribute("bg-image") || "";
		const bgPosition = this.getAttribute("bg-position") || "center";
		const bgSize = this.getAttribute("bg-size") || "cover";

		// Card container with background image
		const cardClasses = this.combineClassNames(
			"relative overflow-hidden rounded-2xl",
			"h-full min-h-[443px]",
			"shadow-xl ring-1 ring-zinc-950/5",
			"dark:ring-white/10",
			this.className,
		);

		// Background image layer
		const bgStyle = bgImage
			? `background-image: url('${bgImage}'); background-position: ${bgPosition}; background-size: ${bgSize};`
			: "";

		// Dark gradient overlay for text readability
		const overlayClasses = this.combineClassNames(
			"absolute inset-0 bg-gradient-to-b",
			"from-zinc-950/50 via-zinc-950/30 to-zinc-950/60",
		);

		// Content container
		const contentClasses = this.combineClassNames(
			"relative z-10 flex h-full flex-col justify-between",
			"p-8 text-white",
		);

		// Check if we have slotted content
		const hasTitleSlot = this.querySelector('[slot="title"]');
		const hasButtonSlot = this.querySelector('[slot="button"]');

		const card = this.h(
			"div",
			{
				class: cardClasses,
			},
			// Background image layer
			bgImage &&
				this.h("div", {
					class: "absolute inset-0 bg-center bg-cover",
					style: bgStyle,
					"aria-hidden": "true",
				}),
			// Gradient overlay
			this.h("div", {
				class: overlayClasses,
				"aria-hidden": "true",
			}),
			// Content
			this.h(
				"div",
				{
					class: contentClasses,
				},
				// Title section (top)
				hasTitleSlot &&
					this.h(
						"div",
						{
							class: "text-center",
						},
						this.h("slot", { name: "title" }),
					),
				// Default slot for additional content (middle - grows to fill space)
				this.h(
					"div",
					{
						class: "flex-1 flex items-center justify-center",
					},
					this.h("slot"),
				),
				// Button section (bottom)
				hasButtonSlot &&
					this.h(
						"div",
						{
							class: "flex items-center justify-center",
						},
						this.h("slot", { name: "button" }),
					),
			),
		);

		this.innerHTML = "";
		this.appendChild(card);
	}
}

defineElement("ui-card-location", CardLocation);
export default CardLocation;
