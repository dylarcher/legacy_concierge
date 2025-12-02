import { BaseComponent, defineElement } from "../_base.js";

class ButtonTelMail extends BaseComponent {
	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = this.h(
			"button",
			{
				type: "button",
				class: this.combineClassNames(
					"rounded-full px-8 py-4",
					"bg-[#B7AA9D] hover:bg-[#a89986]",
					"text-white font-medium",
					"transition-colors duration-200",
					"cursor-pointer",
				),
			},
			[this.h("slot")],
		);
	}
}

defineElement("button-tel-mail", ButtonTelMail);

export { ButtonTelMail };
