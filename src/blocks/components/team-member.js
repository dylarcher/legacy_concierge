import { BaseComponent, defineElement } from "../_base.js";

class TeamMember extends BaseComponent {
	static get observedAttributes() {
		return ["bg-image", "bg-position", "bg-size"];
	}

	connectedCallback() {
		this.render();
	}

	render() {
		const bgImage = this.getAttribute("bg-image") || "";
		const bgPosition = this.getAttribute("bg-position") || "left center";
		const bgSize = this.getAttribute("bg-size") || "cover";

		this.innerHTML = this.h(
			"div",
			{
				class: this.combineClassNames(
					"relative rounded-lg overflow-hidden",
					"min-h-[494px]",
					"flex items-center",
					"px-12",
				),
				style: bgImage
					? `background-image: url(${bgImage}); background-position: ${bgPosition}; background-size: ${bgSize};`
					: "",
			},
			[
				// Semi-transparent overlay for better text readability
				this.h("div", {
					class: "absolute inset-0 bg-black/20 pointer-events-none",
				}),
				// Content container
				this.h(
					"div",
					{
						class: "relative z-10 max-w-2xl",
					},
					[
						this.h(
							"div",
							{
								class: "text-zinc-900 text-base leading-relaxed",
							},
							[this.h("slot")],
						),
					],
				),
			],
		);
	}
}

defineElement("team-member", TeamMember);

export { TeamMember };
