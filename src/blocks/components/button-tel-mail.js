import { BaseComponent, defineElement } from "../_base.js";

/**
 * `<button-tel-mail>` is a custom button component for telephone and mail actions.
 *
 * @element button-tel-mail
 *
 * @slot - Default slot for button content (e.g., label or icon).
 *
 * @csspart button - The native button element.
 *
 * @example
 * ```html
 * <button-tel-mail>
 *   Call Us
 * </button-tel-mail>
 * ```
 *
 * This component renders a styled button. You can place any content inside the slot.
 */
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
					"bg-[#B7AA9D]",
					"font-medium",
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
