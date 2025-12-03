import { resolveImage } from "../../assets/image-manifest.js";
import { BaseComponent, defineElement } from "../_base.js";

/**
 * @element team-member
 * @description
 *   A custom element for displaying a team member section with a customizable background image,
 *   overlay, and content slot. Useful for highlighting team members or people in a visually appealing way.
 *
 * @attribute {string} bg-image
 *   The URL of the background image to display.
 * @attribute {string} bg-position
 *   The CSS background-position value (default: "left center").
 * @attribute {string} bg-size
 *   The CSS background-size value (default: "cover").
 *
 * @slot
 *   Default slot for the team member content (e.g., name, role, description).
 *
 * @example
 *   <team-member
 *     bg-image="https://example.com/photo.jpg"
 *     bg-position="center center"
 *     bg-size="cover"
 *   >
 *     <h3>John Doe</h3>
 *     <p>Senior Developer</p>
 *   </team-member>
 */
class TeamMember extends BaseComponent {
	static get observedAttributes() {
		return ["bg-image", "bg-position", "bg-size"];
	}

	connectedCallback() {
		this.render();
	}

	render() {
		const bgImageAttr = this.getAttribute("bg-image");
		const bgImage = bgImageAttr ? resolveImage(bgImageAttr) : "";
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
					class: "absolute inset-0 pointer-events-none",
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
								class: "text-base leading-relaxed",
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
