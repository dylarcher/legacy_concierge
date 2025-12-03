import { BaseComponent, defineElement } from "../_base.js";

/**
 * Location card component for displaying regional service areas
 *
 * @element location-card
 * @attr {string} region - County or region name
 * @attr {string} icon - Icon/emoji to display
 * @attr {string} coverage - Coverage area description
 *
 * @example
 * <location-card
 *   region="Los Angeles County"
 *   icon="🏙️"
 *   coverage="Greater LA metro, Beverly Hills, Malibu, Pasadena">
 * </location-card>
 */
export class LocationCard extends BaseComponent {
	static get observedAttributes() {
		return ["region", "icon", "coverage"];
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
		const region = this.getAttribute("region") || "Region";
		const icon = this.getAttribute("icon") || "📍";
		const coverage = this.getAttribute("coverage") || "";

		const card = this.h(
			"div",
			{
				class: this.clsx(
					"rounded-xl shadow-lg p-8",
					"ring-1 ring-zinc-950/5 dark:ring-white/10",
					"transition-all duration-200",
					"",
					"flex flex-col items-center text-center",
					"h-full",
				),
			},
			// Icon
			this.h(
				"div",
				{
					class: "text-6xl mb-4",
					role: "img",
					"aria-label": `${region} icon`,
				},
				icon,
			),
			// Region name
			this.h(
				"h3",
				{
					class: "text-xl font-bold mb-3",
				},
				region,
			),
			// Coverage description
			coverage &&
				this.h(
					"p",
					{
						class: "text-sm leading-relaxed",
					},
					coverage,
				),
		);

		this.innerHTML = "";
		this.appendChild(card);
	}
}

defineElement("location-card", LocationCard);
export default LocationCard;
