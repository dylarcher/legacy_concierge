import { BaseComponent, defineElement } from "../_base.js";

class ButtonService extends BaseComponent {
	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = this.h(
			"button",
			{
				type: "button",
				class: this.combineClassNames(
					"rounded-xl px-8 py-5 w-full",
					"bg-[#072835] hover:bg-[#0a3442]",
					"text-left",
					"transition-colors duration-200",
					"cursor-pointer",
				),
			},
			[
				this.h(
					"div",
					{
						class: "flex flex-col gap-1",
					},
					[
						this.h(
							"div",
							{
								class: "text-white font-semibold text-lg",
							},
							[this.h("slot", { name: "title" })],
						),
						this.h(
							"div",
							{
								class: "text-white/80 text-sm",
							},
							[this.h("slot", { name: "description" })],
						),
					],
				),
			],
		);
	}
}

defineElement("button-service", ButtonService);

export { ButtonService };
