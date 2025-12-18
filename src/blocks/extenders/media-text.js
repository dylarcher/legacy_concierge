/**
 * Media Text Component
 * A specialized 2-column layout for image + text content
 * Simpler API than split-section, focused on media/content pairing
 * Styled with Legacy Concierge design system tokens
 *
 * @element media-text
 *
 * @attr {string} image - Image URL (required)
 * @attr {string} image-alt - Image alt text
 * @attr {string} image-position - "left" | "right" (default: "left")
 * @attr {string} image-fit - "cover" | "contain" | "fill" (default: "cover")
 * @attr {string} title - Optional heading text
 * @attr {string} align - Vertical alignment: "start" | "center" | "end" (default: "center")
 * @attr {boolean} reverse-mobile - Stack image below text on mobile
 * @attr {string} gap - Gap between columns (default: "2rem")
 * @attr {string} ratio - Column ratio: "50-50" | "60-40" | "40-60" (default: "50-50")
 * @attr {boolean} rounded - Apply rounded corners to image (default: true)
 *
 * @slot - Default slot for text/body content
 * @slot action - Optional CTA button/link
 *
 * @example
 * <media-text
 *   image="photo.jpg"
 *   image-position="left"
 *   title="Our Story"
 * >
 *   <p>Founded in 2020, Legacy Concierge...</p>
 *   <a href="/about" slot="action">Learn More</a>
 * </media-text>
 *
 * @example
 * <!-- Image on right, centered alignment -->
 * <media-text
 *   image="team.jpg"
 *   image-position="right"
 *   align="center"
 *   ratio="40-60"
 * >
 *   <p>Meet our dedicated team of healthcare professionals.</p>
 * </media-text>
 */

import { BaseComponent, clsx, defineElement } from "./_base.js";

export class MediaText extends BaseComponent {
	static get observedAttributes() {
		return [
			"image",
			"image-alt",
			"image-position",
			"image-fit",
			"title",
			"align",
			"reverse-mobile",
			"gap",
			"ratio",
			"rounded",
		];
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue && this.isConnected) {
			this.render();
		}
	}

	// Attribute getters
	get image() {
		return this.getAttribute("image");
	}
	get imageAlt() {
		return this.getAttribute("image-alt") || "";
	}
	get imagePosition() {
		return this.getAttribute("image-position") || "left";
	}
	get imageFit() {
		return this.getAttribute("image-fit") || "cover";
	}
	get blockTitle() {
		return this.getAttribute("title");
	}
	get align() {
		return this.getAttribute("align") || "center";
	}
	get reverseMobile() {
		return this.hasAttribute("reverse-mobile");
	}
	get gap() {
		return this.getAttribute("gap") || "2rem";
	}
	get ratio() {
		return this.getAttribute("ratio") || "50-50";
	}
	get rounded() {
		return (
			!this.hasAttribute("rounded") || this.getAttribute("rounded") !== "false"
		);
	}

	#getRatioClasses() {
		const ratios = {
			"50-50": { image: "lg:w-1/2", text: "lg:w-1/2" },
			"60-40": { image: "lg:w-3/5", text: "lg:w-2/5" },
			"40-60": { image: "lg:w-2/5", text: "lg:w-3/5" },
		};
		return ratios[this.ratio] || ratios["50-50"];
	}

	#getAlignClass() {
		const alignments = {
			start: "items-start",
			center: "items-center",
			end: "items-end",
		};
		return alignments[this.align] || "items-center";
	}

	#createImageColumn() {
		const ratioClasses = this.#getRatioClasses();

		return this.h(
			"div",
			{
				class: clsx(
					"media-text__image",
					"w-full",
					ratioClasses.image,
					"shrink-0",
				),
			},
			this.h("img", {
				src: this.image,
				alt: this.imageAlt,
				loading: "lazy",
				class: clsx(
					"w-full h-full",
					this.imageFit === "cover" && "object-cover",
					this.imageFit === "contain" && "object-contain",
					this.imageFit === "fill" && "object-fill",
					this.rounded && "rounded-lg",
				),
				style: {
					aspectRatio: "4/3",
				},
			}),
		);
	}

	#createTextColumn() {
		const ratioClasses = this.#getRatioClasses();
		const actionSlot = this.querySelector('[slot="action"]');

		return this.h(
			"div",
			{
				class: clsx(
					"media-text__content",
					"w-full",
					ratioClasses.text,
					"flex flex-col",
				),
			},
			// Title
			this.blockTitle
				? this.h(
						"h2",
						{
							class: "text-2xl md:text-3xl font-serif mb-4",
							style: "color: var(--color-text)",
						},
						this.blockTitle,
					)
				: null,
			// Body content (default slot)
			this.h(
				"div",
				{
					class: "prose max-w-none",
					style: "color: var(--color-text)",
				},
				this.h("slot"),
			),
			// Action slot
			actionSlot
				? this.h(
						"div",
						{
							class: "mt-6",
						},
						this.h("slot", { name: "action" }),
					)
				: null,
		);
	}

	render() {
		const imageColumn = this.#createImageColumn();
		const textColumn = this.#createTextColumn();

		// Determine column order based on image position
		const isImageRight = this.imagePosition === "right";
		const columns = isImageRight
			? [textColumn, imageColumn]
			: [imageColumn, textColumn];

		// Mobile order - default: image first, reverse-mobile: text first
		const mobileOrderClass = this.reverseMobile
			? "flex-col-reverse"
			: "flex-col";

		const container = this.h(
			"div",
			{
				class: clsx(
					"media-text",
					"flex",
					mobileOrderClass,
					"lg:flex-row",
					this.#getAlignClass(),
				),
				style: {
					gap: this.gap,
				},
			},
			...columns,
		);

		// Clear and render
		this.innerHTML = "";

		// Preserve slotted content
		const slots = Array.from(this.querySelectorAll("[slot]"));

		this.appendChild(container);

		// Re-append slotted content for slot distribution
		slots.forEach(this.appendChild.bind(this));

		// Add base styles to component
		if (!this.classList.contains("block")) {
			this.classList.add("block");
		}
	}
}

defineElement("media-text", MediaText);
export default MediaText;
