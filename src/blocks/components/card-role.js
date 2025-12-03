import { BaseComponent, defineElement } from "../_base.js";

/**
 * Role card component for displaying organizational roles and positions
 *
 * @element role-card
 * @attr {string} role - Role title or position name
 * @attr {string} icon - Icon/emoji to display
 * @attr {string} description - Role description or responsibilities
 *
 * @example
 * <role-card
 *   role="Clinical Director"
 *   icon="🩺"
 *   description="Oversees all medical care protocols and quality assurance">
 * </role-card>
 */
export class RoleCard extends BaseComponent {
	static get observedAttributes() {
		return ["role", "icon", "description"];
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback(_name, oldValue, newValue) {
		if (oldValue !== newValue && this.isConnected) {
			this.render();
		}
	}

	render() {
		const role = this.getAttribute("role") || "Role";
		const icon = this.getAttribute("icon") || "👤";
		const description = this.getAttribute("description") || "";

		const card = this.h(
			"div",
			{
				class: this.clsx(
					"rounded-lg p-6",
					"ring-1 ring-zinc-950/5",
					"text-center",
					"transition-all duration-200",
					"",
					"h-full flex flex-col",
				),
			},
			// Icon
			this.h(
				"div",
				{
					class: "text-4xl mb-3",
					role: "img",
					"aria-label": `${role} icon`,
				},
				icon,
			),
			// Role title
			this.h(
				"h3",
				{
					class: "text-lg font-bold mb-2",
				},
				role,
			),
			// Description
			description &&
				this.h(
					"p",
					{
						class: "text-sm leading-relaxed",
					},
					description,
				),
		);

		this.innerHTML = "";
		this.appendChild(card);
	}
}

defineElement("role-card", RoleCard);
export default RoleCard;
