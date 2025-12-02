import { BaseComponent, defineElement, h } from "../_base.js";

/**
 * HeadingDivided component
 * Heading text with an integrated horizontal divider
 * Based on heading-divided.svg: 1435×43px, teal text (#668D8E)
 */
class HeadingDivided extends BaseComponent {
	static observedAttributes = ["level"];

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
		);

		const dividerClasses = this.combineClassNames(
			"w-full",
			"h-px",
<<<<<<< HEAD
			"bg-linear-to-r",
=======
			"bg-gradient-to-r",
>>>>>>> main
			"from-transparent",
			"via-[#668D8E]/40",
			"to-transparent",
			"mt-6",
		);

		const containerClasses = this.combineClassNames("w-full", "space-y-6");

		this.replaceChildren(
			h("div", { class: containerClasses }, [
<<<<<<< HEAD
				h(level, { class: headingClasses }, [h("slot")]),
=======
				(() => {
					const allowedLevels = ["h1", "h2", "h3", "h4", "h5", "h6"];
					const tag = allowedLevels.includes(level) ? level : "h2";
					return h(tag, { class: headingClasses }, [h("slot")]);
				})(),
>>>>>>> main
				h("div", { class: dividerClasses }),
			]),
		);
	}
}
<<<<<<< HEAD

=======
>>>>>>> main
export { HeadingDivided };
defineElement("heading-divided", HeadingDivided);
