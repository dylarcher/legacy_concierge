import { BaseComponent, defineElement } from "../_base.js";

/**
 * `<button-call-to-action>` is a custom element that renders a stylized call-to-action button.
 *
 * @element button-call-to-action
 *
 * @slot - Default slot for button content (e.g., text or inline elements).
 *
 * @example
 * <button-call-to-action>
 *   Click Me
 * </button-call-to-action>
 *
 * @csspart button - The native button element.
 *
 * This component does not accept any attributes.
 */
class ButtonCallToAction extends BaseComponent {
<<<<<<< HEAD
	connectedCallback() {
=======
>>>>>>> main
		this.render();
	}

	render() {
<<<<<<< HEAD
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
=======
		this.innerHTML = "";
		this.appendChild(
			this.h(
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
			)
>>>>>>> main
		);
	}
}

defineElement("button-call-to-action", ButtonCallToAction);

export { ButtonCallToAction };
