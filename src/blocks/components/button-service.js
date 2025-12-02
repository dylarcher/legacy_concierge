import { BaseComponent, defineElement } from "../_base.js";

/**
 * `<button-service>` is a custom button component for service actions.
 *
 * @element button-service
 *
 * @slot title - The main title of the button (displayed prominently).
 * @slot description - A short description or subtitle for the button.
 *
 * @csspart button - The native button element.
 *
 * @example
 * <button-service>
 *   <span slot="title">Book Now</span>
 *   <span slot="description">Fast and easy booking for your service</span>
 * </button-service>
 *
 * @summary
 * Renders a stylized button with a title and description, suitable for service actions.
 */
class ButtonService extends BaseComponent {
	connectedCallback() {
		this.render();
	}

	render() {
<<<<<<< HEAD
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
=======
		this.innerHTML = "";
		this.appendChild(
			this.h(
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
			)
>>>>>>> main
		);
	}
}

defineElement("button-service", ButtonService);

export { ButtonService };
