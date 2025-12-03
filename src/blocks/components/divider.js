import { BaseComponent, defineElement } from "../_base.js";

/**
 * Horizontal divider component
 *
 * @element ui-divider
 * @attr {boolean} soft - Use softer/lighter divider style
 *
 * @example
 * <ui-divider></ui-divider>
 * <ui-divider soft></ui-divider>
 */
export class Divider extends BaseComponent {
	static get observedAttributes() {
		return ["soft"];
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback() {
		if (this.isConnected) {
			this.render();
		}
	}

	render() {
		const soft = this.hasAttribute("soft");

		const classes = this.clsx(
			"w-full border-t",
			soft ? "dark:border-white/5" : "dark:border-white/10",
			this.className,
		);

		this.innerHTML = "";
		const hr = this.h("hr", { role: "presentation", class: classes });
		this.appendChild(hr);
	}
}

defineElement("ui-divider", UIDivider);
