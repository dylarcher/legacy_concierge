/**
 * Content Section Component
 * A section wrapper with background image/color, blur overlay, and content container
 * Styled with Legacy Concierge design system tokens
 *
 * @element content-section
 *
 * @attr {string} id - Section ID for anchor linking and hash navigation
 * @attr {string} background - Background image URL
 * @attr {string} background-color - Background color class (e.g., "zinc-900", "primary")
 * @attr {string} background-position - CSS background-position (default: "center")
 * @attr {boolean} background-fixed - Fixed/parallax background (default: false)
 * @attr {string} overlay - Overlay type "none" | "dark" | "light" | "gradient" (default: "none")
 * @attr {string} overlay-opacity - Overlay opacity 0-100 (default: "60")
 * @attr {boolean} blur - Add blur effect to content wrapper (default: false)
 * @attr {string} blur-amount - Blur amount in px (default: "8")
 * @attr {string} padding - Vertical padding "none" | "sm" | "md" | "lg" | "xl" (default: "lg")
 * @attr {string} width - Content width "full" | "wide" | "normal" | "narrow" (default: "normal")
 * @attr {string} align - Content alignment "left" | "center" | "right" (default: "left")
 * @attr {boolean} invert - Invert text colors for dark backgrounds (default: false)
 *
 * @slot - Default slot for section content
 */

import { BaseComponent, clsx, defineElement } from "./_base.js";

export class ContentSection extends BaseComponent {
	static get observedAttributes() {
		return [
			"id",
			"background",
			"background-color",
			"background-position",
			"background-fixed",
			"overlay",
			"overlay-opacity",
			"blur",
			"blur-amount",
			"padding",
			"width",
			"align",
			"invert",
		];
	}

	#boundHashChange = null;

	connectedCallback() {
		this.render();
		this.#attachListeners();
		this.#checkHash();
	}

	disconnectedCallback() {
		this.#detachListeners();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue && this.isConnected) {
			this.render();
		}
	}

	// Attribute getters
	get background() {
		return this.getAttribute("background");
	}
	get backgroundColor() {
		return this.getAttribute("background-color");
	}
	get backgroundPosition() {
		return this.getAttribute("background-position") || "center";
	}
	get backgroundFixed() {
		return this.hasAttribute("background-fixed");
	}
	get overlay() {
		return this.getAttribute("overlay") || "none";
	}
	get overlayOpacity() {
		return this.getAttribute("overlay-opacity") || "60";
	}
	get hasBlur() {
		return this.hasAttribute("blur");
	}
	get blurAmount() {
		return this.getAttribute("blur-amount") || "8";
	}
	get padding() {
		return this.getAttribute("padding") || "lg";
	}
	get width() {
		return this.getAttribute("width") || "normal";
	}
	get align() {
		return this.getAttribute("align") || "left";
	}
	get invert() {
		return this.hasAttribute("invert");
	}

	/**
	 * Scroll to this section
	 * @param {string} behavior - Scroll behavior
	 */
	scrollTo(behavior = "smooth") {
		this.scrollIntoView({ behavior, block: "start" });
	}

	#checkHash() {
		if (this.id && window.location.hash === `#${this.id}`) {
			requestAnimationFrame(() => this.scrollTo("instant"));
		}
	}

	#handleHashChange = () => {
		if (this.id && window.location.hash === `#${this.id}`) {
			this.scrollTo();
		}
	};

	#attachListeners() {
		this.#detachListeners();

		if (this.id) {
			this.#boundHashChange = this.#handleHashChange;
			window.addEventListener("hashchange", this.#boundHashChange);
		}
	}

	#detachListeners() {
		if (this.#boundHashChange) {
			window.removeEventListener("hashchange", this.#boundHashChange);
			this.#boundHashChange = null;
		}
	}

	#getPaddingClass() {
		const paddings = {
			none: "",
			sm: "py-8",
			md: "py-12",
			lg: "py-20",
			xl: "py-32",
		};
		return paddings[this.padding] || "py-20";
	}

	#getWidthClass() {
		const widths = {
			full: "max-w-none",
			wide: "max-w-7xl",
			normal: "max-w-5xl",
			narrow: "max-w-3xl",
		};
		return widths[this.width] || "max-w-5xl";
	}

	#getAlignClass() {
		const alignments = {
			left: "text-left",
			center: "text-center mx-auto",
			right: "text-right ml-auto",
		};
		return alignments[this.align] || "text-left";
	}

	#createOverlay() {
		if (this.overlay === "none") return null;

		const opacity = parseInt(this.overlayOpacity, 10) / 100;

		const overlayStyles = {
			dark: `rgba(0, 0, 0, ${opacity})`,
			light: `rgba(255, 255, 255, ${opacity})`,
			gradient: "var(--linear-card-overlay)",
		};

		return this.h("div", {
			class: "absolute inset-0 z-0",
			style: {
				background: overlayStyles[this.overlay] || "transparent",
			},
			"aria-hidden": "true",
		});
	}

	#createBlurWrapper(content) {
		if (!this.hasBlur) return content;

		return this.h(
			"div",
			{
				class: clsx(
					"relative rounded-2xl overflow-hidden",
					"bg-white/10",
					"backdrop-blur-md",
					"p-8 md:p-12",
				),
				style: {
					backdropFilter: `blur(${this.blurAmount}px)`,
					WebkitBackdropFilter: `blur(${this.blurAmount}px)`,
				},
			},
			content,
		);
	}

	render() {
		// Preserve children (slot content)
		const children = Array.from(this.children).filter(
			(child) => !child.hasAttribute("data-section-ui"),
		);

		// Clear UI elements
		Array.from(this.children)
			.filter((child) => child.hasAttribute("data-section-ui"))
			.forEach((element) => element.remove());

		// Build background layer
		const backgroundLayer =
			this.background || this.backgroundColor
				? this.h("div", {
						class: clsx(
							"absolute inset-0 z-0",
							this.backgroundColor && `bg-${this.backgroundColor}`,
							this.backgroundFixed && "bg-fixed",
						),
						style: this.background
							? {
									backgroundImage: `url(${this.background})`,
									backgroundSize: "cover",
									backgroundPosition: this.backgroundPosition,
									backgroundAttachment: this.backgroundFixed
										? "fixed"
										: "scroll",
								}
							: undefined,
						"aria-hidden": "true",
					})
				: null;

		// Build content
		const slotContent = this.h("slot");

		const contentWrapper = this.h(
			"div",
			{
				class: clsx(
					"relative z-10",
					this.#getWidthClass(),
					this.#getAlignClass(),
				),
				style: this.invert
					? "color: var(--color-text-inverse)"
					: "color: var(--color-text)",
			},
			this.#createBlurWrapper(slotContent),
		);

		// Build section with 56px edge padding
		const section = this.h(
			"section",
			{
				class: clsx(
					"relative overflow-hidden",
					this.#getPaddingClass(),
					"px-[56px]",
				),
				"data-section-ui": "",
			},
			backgroundLayer,
			this.#createOverlay(),
			contentWrapper,
		);

		// Append section and restore children
		this.appendChild(section);

		// Move children into the slot
		const slot = section.querySelector("slot");
		if (slot) {
			children.forEach((child) => this.appendChild(child));
		}

		// Apply base styles
		if (!this.classList.contains("block")) {
			this.classList.add("block");
		}
	}
}

defineElement("content-section", ContentSection);
export default ContentSection;
