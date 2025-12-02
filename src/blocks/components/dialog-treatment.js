import { BaseComponent, defineElement, h } from "../_base.js";

/**
 * DialogTreatment component
 * Large modal dialog with rounded corners, masked background image, gradient overlay, and text content
 * Based on dialog-treatment.svg: 1924×1115px modal with 0.65 opacity overlay
 */
class DialogTreatment extends BaseComponent {
	static observedAttributes = ["bg-image", "bg-position", "bg-size", "open"];

	connectedCallback() {
		this.render();
	}

	render() {
		const bgImage = this.getAttribute("bg-image") || "";
		const bgPosition = this.getAttribute("bg-position") || "center";
		const bgSize = this.getAttribute("bg-size") || "cover";
		const isOpen = this.hasAttribute("open");

		const backdropClasses = this.combineClassNames(
			"fixed",
			"inset-0",
			"bg-black/50",
			"flex",
			"items-center",
			"justify-center",
			"p-8",
			"z-50",
			"transition-opacity",
			isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
		);

		const containerClasses = this.combineClassNames(
			"relative",
			"w-full",
			"max-w-7xl",
			"min-h-[700px]",
			"rounded-3xl",
			"overflow-hidden",
			"bg-cover",
			"bg-center",
		);

		const contentClasses = this.combineClassNames(
			"relative",
			"w-full",
			"h-full",
			"min-h-[700px]",
			"p-12",
			"flex",
			"flex-col",
			"justify-end",
		);

		const overlayClasses = this.combineClassNames(
			"absolute",
			"inset-0",
			"bg-gradient-to-b",
			"from-black/40",
			"via-black/50",
			"to-black/65",
			"pointer-events-none",
		);

		this.replaceChildren(
			h("div", { class: backdropClasses }, [
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
							h("div", { class: "text-white space-y-4 max-w-5xl" }, [
								h("slot"),
							]),
						]),
					],
				),
			]),
		);
	}
}
export { DialogTreatment };
defineElement("dialog-treatment", DialogTreatment);
