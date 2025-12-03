import { resolveImage } from "../../assets/image-manifest.js";
import { BaseComponent, defineElement, h } from "../_base.js";

/**
 * SectionCalloutImage component
 * Section with callout text area and background image
 * Based on section-callout-image.svg: 1613×788px with tan background (#81624C with 0.69 opacity)
 */
class SectionCalloutImage extends BaseComponent {
	static observedAttributes = ["bg-image", "bg-position", "bg-size"];

	connectedCallback() {
		this.render();
	}

	render() {
		const bgImageAttr = this.getAttribute("bg-image");
		const bgImage = bgImageAttr ? resolveImage(bgImageAttr) : "";
		const bgPosition = this.getAttribute("bg-position") || "center";
		const bgSize = this.getAttribute("bg-size") || "cover";

		const containerClasses = this.combineClassNames(
			"relative",
			"w-full",
			"min-h-[788px]",
			"overflow-hidden",
			"bg-cover",
			"bg-center",
		);

		const overlayClasses = this.combineClassNames(
			"absolute",
			"inset-0",
			"bg-[#81624C]/69",
			"pointer-events-none",
		);

		const contentClasses = this.combineClassNames(
			"relative",
			"max-w-4xl",
			"p-12",
			"flex",
			"flex-col",
			"justify-center",
			"min-h-[788px]",
		);

		const textClasses = this.combineClassNames(
			"text-black",
			"text-base",
			"leading-relaxed",
			"space-y-4",
		);

		this.replaceChildren(
			h(
				"div",
				{
					class: containerClasses,
					style: bgImage
						? `background-image: url(${bgImage}); background-position: ${bgPosition}; background-size: ${bgSize};`
						: "",
				},
				[
					h("div", { class: overlayClasses }),
					h("div", { class: contentClasses }, [
						h("div", { class: textClasses }, [h("slot")]),
					]),
				],
			),
		);
	}
}

export { SectionCalloutImage };
defineElement("section-callout-image", SectionCalloutImage);
