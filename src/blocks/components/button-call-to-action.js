import { BaseComponent, defineElement } from "../_base.js";

class ButtonCallToAction extends BaseComponent {
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
					"bg-teal-600/33 hover:bg-teal-600/50",
					"text-white font-medium",
					"border border-white/80",
					"transition-colors duration-200",
					"cursor-pointer",
				),
			},
			[this.h("slot")],
		);
	}
}

defineElement("button-call-to-action", ButtonCallToAction);

export { ButtonCallToAction };
