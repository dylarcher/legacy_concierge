import { BaseComponent, defineElement, h } from "../_base.js";

/**
 * HeadingDivided component
 * Heading text with an integrated horizontal divider
 * Based on heading-divided.svg: 1435×43px, teal text (#668D8E)
 */
class HeadingDivided extends BaseComponent {
	static observedAttributes = ["level", "divider-width"];

	connectedCallback() {
		this.render();
	}

	render() {
		const level = this.getAttribute("level") || "h2";

		const headingClasses = this.combineClassNames(
			"text-[#668D8E]",
			"font-serif",
			"text-4xl",
			"lg:text-5xl",
			"font-normal",
			"tracking-wide",
			"text-balance",
		);

		const dividerWidth = this.getAttribute("divider-width") || "w-full";

		const dividerClasses = this.combineClassNames(
			dividerWidth,
			"h-px",
			"bg-linear-to-r",
			"from-transparent",
			"via-[#668D8E]/40",
			"to-transparent",
		);

		const containerClasses = this.combineClassNames(
			"w-full",
			"flex",
			"flex-row",
			"flex-wrap",
			"gap-6",
		);

		this.replaceChildren(
			h("div", { class: containerClasses }, [
				h(level, { class: headingClasses }, [h("slot")]),
				h("div", { class: dividerClasses }),
			]),
		);
	}
}
export { HeadingDivided };
defineElement("heading-divided", HeadingDivided);
