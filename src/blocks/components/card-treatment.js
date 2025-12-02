import { BaseComponent, defineElement } from "../_base.js";

class CardTreatment extends BaseComponent {
	static get observedAttributes() {
		return ["bg-image", "bg-position", "bg-size"];
	}

	connectedCallback() {
		this.render();
	}

	render() {
		const bgImage = this.getAttribute("bg-image") || "";
		const bgPosition = this.getAttribute("bg-position") || "center";
		const bgSize = this.getAttribute("bg-size") || "cover";

		this.innerHTML = this.h(
			"div",
			{
				class: this.combineClassNames(
					"relative rounded-lg overflow-hidden",
					"min-h-[661px]",
					"flex flex-col justify-between",
					"p-8",
				),
				style: bgImage
					? `background-image: url(${bgImage}); background-position: ${bgPosition}; background-size: ${bgSize};`
					: "",
			},
			[
				// Gradient overlay
				this.h("div", {
					class:
						"absolute inset-0 bg-gradient-to-b from-[#0C0000]/80 via-[#0C0000]/50 to-transparent pointer-events-none",
				}),
				// Content container
				this.h(
					"div",
					{
						class: "relative z-10 flex flex-col justify-between h-full",
					},
					[
						// Top content area
						this.h(
							"div",
							{
								class: "flex flex-col gap-3",
							},
							[
								this.h(
									"div",
									{
										class: "text-white text-2xl font-bold leading-tight",
									},
									[this.h("slot", { name: "title" })],
								),
								this.h(
									"div",
									{
										class: "text-white/90 text-sm",
									},
									[this.h("slot", { name: "description" })],
								),
							],
						),
						// Bottom button area
						this.h(
							"div",
							{
								class: "flex justify-center mt-auto pt-8",
							},
							[
								this.h(
									"button",
									{
										type: "button",
										class: this.combineClassNames(
											"w-16 h-16 rounded-full",
											"bg-white/10 hover:bg-white/20",
											"border border-white/50",
											"flex items-center justify-center",
											"text-white text-3xl font-light",
											"transition-colors duration-200",
											"cursor-pointer",
										),
									},
									[this.h("slot", { name: "icon" }, "+")],
								),
							],
						),
					],
				),
			],
		);
	}
}

defineElement("card-treatment", CardTreatment);

export { CardTreatment };
