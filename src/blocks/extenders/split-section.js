/**
 * Split Section Component
 * A two-column layout with optional divider and flexible content arrangement
 * Styled with Legacy Concierge design system tokens
 *
 * @element split-section
 *
 * @attr {string} ratio - Column ratio "50-50" | "60-40" | "40-60" | "70-30" | "30-70" (default: "50-50")
 * @attr {string} gap - Gap between columns in rem (default: "8")
 * @attr {string} divider - Divider style "none" | "line" | "gradient" | "dot" (default: "none")
 * @attr {string} divider-color - Divider color (default: uses design tokens)
 * @attr {boolean} reverse-mobile - Reverse column order on mobile (default: false)
 * @attr {string} align - Vertical alignment "start" | "center" | "end" | "stretch" (default: "center")
 * @attr {string} stack-at - Breakpoint to stack columns "sm" | "md" | "lg" | "xl" | "never" (default: "sm")
 *
 * @slot start - Content for the first/left column
 * @slot end - Content for the second/right column
 */

import { BaseComponent, clsx, defineElement } from "./_base.js";

export class SplitSection extends BaseComponent {
	static get observedAttributes() {
		return [
			"ratio",
			"gap",
			"divider",
			"divider-color",
			"reverse-mobile",
			"align",
			"stack-at",
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
	get ratio() {
		return this.getAttribute("ratio") || "50-50";
	}
	get gap() {
		return this.getAttribute("gap") || "8";
	}
	get divider() {
		return this.getAttribute("divider") || "none";
	}
	get dividerColor() {
		return this.getAttribute("divider-color") || "";
	}
	get reverseMobile() {
		return this.hasAttribute("reverse-mobile");
	}
	get align() {
		return this.getAttribute("align") || "center";
	}
	get stackAt() {
		return this.getAttribute("stack-at") || "sm";
	}

	#getRatioClasses() {
		const bp = this.stackAt;
		const ratios = {
			"50-50": { start: `${bp}:w-1/2`, end: `${bp}:w-1/2` },
			"60-40": { start: `${bp}:w-3/5`, end: `${bp}:w-2/5` },
			"40-60": { start: `${bp}:w-2/5`, end: `${bp}:w-3/5` },
			"70-30": { start: `${bp}:w-[70%]`, end: `${bp}:w-[30%]` },
			"30-70": { start: `${bp}:w-[30%]`, end: `${bp}:w-[70%]` },
		};

		return ratios[this.ratio] || ratios["50-50"];
	}

	#getAlignClass() {
		const alignments = {
			start: "items-start",
			center: "items-center",
			end: "items-end",
			stretch: "items-stretch",
		};
		return alignments[this.align] || "items-center";
	}

	#getStackClass() {
		const breakpoints = {
			sm: "sm:flex-row",
			md: "md:flex-row",
			lg: "lg:flex-row",
			xl: "xl:flex-row",
			never: "flex-row",
		};
		return breakpoints[this.stackAt] || "sm:flex-row";
	}

	#createDivider() {
		if (this.divider === "none") return null;

		const baseClass = `hidden ${this.stackAt}:block shrink-0`;

		switch (this.divider) {
			case "line":
				return this.h("div", {
					class: clsx(baseClass, "w-px self-stretch"),
					style: {
						backgroundColor: this.dividerColor || "var(--color-border)",
					},
					"aria-hidden": "true",
				});

			case "gradient":
				return this.h("div", {
					class: clsx(baseClass, "w-px self-stretch"),
					style: {
						background: `linear-gradient(to bottom, transparent, ${this.dividerColor || "var(--color-border)"}, transparent)`,
					},
					"aria-hidden": "true",
				});

			case "dot":
				return this.h(
					"div",
					{
						class: clsx(
							baseClass,
							"flex flex-col items-center justify-center gap-2 px-4",
						),
						"aria-hidden": "true",
					},
					...Array(3)
						.fill(null)
						.map(() =>
							this.h("div", {
								class: "w-1.5 h-1.5 rounded-full",
								style: {
									backgroundColor:
										this.dividerColor || "var(--color-border-muted)",
								},
							}),
						),
				);

			default:
				return null;
		}
	}

	render() {
		const ratioClasses = this.#getRatioClasses();

		// Check for slotted content
		const hasStartSlot = this.querySelector('[slot="start"]');
		const hasEndSlot = this.querySelector('[slot="end"]');

		// Preserve slots
		const slots = Array.from(this.querySelectorAll("[slot]"));

		// Clear previous render
		Array.from(this.children)
			.filter((child) => child.hasAttribute("data-split-ui"))
			.forEach((element) => element.remove());

		// Build container
		const container = this.h(
			"div",
			{
				class: clsx(
					"flex flex-col",
					this.#getStackClass(),
					this.#getAlignClass(),
					this.reverseMobile && "flex-col-reverse",
				),
				style: { gap: `${this.gap}rem` },
				"data-split-ui": "",
			},
			// Start column
			this.h(
				"div",
				{
					class: clsx("w-full", ratioClasses.start),
				},
				hasStartSlot ? this.h("slot", { name: "start" }) : null,
			),

			// Divider
			this.#createDivider(),

			// End column
			this.h(
				"div",
				{
					class: clsx("w-full", ratioClasses.end),
				},
				hasEndSlot ? this.h("slot", { name: "end" }) : null,
			),
		);

		// Append container and restore slots
		this.appendChild(container);
		slots.forEach((slot) => this.appendChild(slot));

		// Apply base styles
		if (!this.classList.contains("block")) {
			this.classList.add("block");
		}
	}
}

defineElement("split-section", SplitSection);
export default SplitSection;
