import { BaseComponent, defineElement } from "../_base.js";

/**
 * Profile card component for displaying person information with photo and bio
 *
 * @element profile-card
 * @attr {string} name - Person's full name
 * @attr {string} title - Role/position/subtitle
 * @attr {string} image - Profile photo URL
 * @attr {string} image-alt - Alt text for profile image
 * @attr {string} align - Image alignment: "left" (default) | "right" | "center"
 * @attr {string} variant - Card variant: "default" (side-by-side) | "compact" (grid)
 *
 * @slot - Default slot for bio/description content
 *
 * @example
 * <!-- Default variant (side-by-side layout) -->
 * <profile-card
 *   name="Jason Kidushim"
 *   title="Founder &amp; CEO"
 *   image="/assets/media/images/team/jason.png"
 *   image-alt="Jason Kidushim headshot"
 *   align="left">
 *   <p>Bio text goes here...</p>
 * </profile-card>
 *
 * @example
 * <!-- Compact variant (for grids) -->
 * <profile-card
 *   variant="compact"
 *   name="Sarah Martinez"
 *   title="Clinical Director"
 *   image="/assets/media/images/team/sarah.png"
 *   image-alt="Sarah Martinez headshot">
 *   <p>Brief bio...</p>
 * </profile-card>
 */
export class ProfileCard extends BaseComponent {
	static get observedAttributes() {
		return ["name", "title", "image", "image-alt", "align", "variant"];
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback(_name, oldValue, newValue) {
		if (oldValue !== newValue && this.isConnected) {
			this.render();
		}
	}

	/**
	 * Renders the compact variant (for grid layouts)
	 * @returns {HTMLElement} Compact card element
	 */
	#renderCompactVariant() {
		const name = this.getAttribute("name") || "Name";
		const title = this.getAttribute("title") || "";
		const image =
			this.getAttribute("image") ||
			"/assets/media/images/placeholder-avatar.png";
		const imageAlt = this.getAttribute("image-alt") || name;

		// Collect bio content from children
		const bioContent = Array.from(this.childNodes);

		return this.h(
			"div",
			{
				class: this.clsx(
					"flex flex-col items-center text-center",
					"bg-white dark:bg-zinc-900",
					"rounded-xl p-6",
					"ring-1 ring-zinc-950/5 dark:ring-white/10",
					"transition-shadow hover:shadow-lg",
				),
			},
			// Avatar
			this.h("img", {
				src: image,
				alt: imageAlt,
				class: this.clsx(
					"w-32 h-32 rounded-full object-cover mb-4",
					"ring-4 ring-cyan-500/20 dark:ring-cyan-400/20",
				),
			}),
			// Name
			this.h(
				"h3",
				{
					class: "text-lg font-bold text-zinc-900 dark:text-white mb-1",
				},
				name,
			),
			// Title
			title &&
				this.h(
					"p",
					{
						class:
							"text-sm font-semibold text-cyan-600 dark:text-cyan-400 mb-4",
					},
					title,
				),
			// Bio content
			bioContent.length > 0 &&
				this.h(
					"div",
					{
						class: "text-sm text-zinc-600 dark:text-zinc-400 text-left w-full",
					},
					...bioContent,
				),
		);
	}

	/**
	 * Renders the default variant (side-by-side layout)
	 * @returns {HTMLElement} Default card element
	 */
	#renderDefaultVariant() {
		const name = this.getAttribute("name") || "Name";
		const title = this.getAttribute("title") || "";
		const image =
			this.getAttribute("image") ||
			"/assets/media/images/placeholder-avatar.png";
		const imageAlt = this.getAttribute("image-alt") || name;
		const align = this.getAttribute("align") || "left";

		// Collect bio content from children
		const bioContent = Array.from(this.childNodes);

		const containerClasses = this.clsx(
			"flex flex-col gap-8",
			"md:flex-row md:items-start md:gap-12",
			align === "right" && "md:flex-row-reverse",
			align === "center" && "md:flex-col md:items-center md:text-center",
		);

		return this.h(
			"div",
			{ class: containerClasses },
			// Image container (40% width on desktop)
			this.h(
				"div",
				{
					class: this.clsx(
						"w-full shrink-0",
						align === "center" ? "md:w-64" : "md:w-2/5",
					),
				},
				this.h("img", {
					src: image,
					alt: imageAlt,
					class: this.clsx(
						"w-full rounded-lg shadow-xl object-cover",
						align === "center" ? "aspect-square" : "aspect-[4/5]",
					),
				}),
			),
			// Content container (60% width on desktop)
			this.h(
				"div",
				{
					class: this.clsx(
						"w-full",
						align === "center" ? "md:w-full" : "md:w-3/5",
					),
				},
				// Name
				this.h(
					"h3",
					{
						class: "text-3xl font-bold text-zinc-900 dark:text-white mb-3",
					},
					name,
				),
				// Title
				title &&
					this.h(
						"p",
						{
							class:
								"text-xl font-semibold text-cyan-600 dark:text-cyan-400 mb-6",
						},
						title,
					),
				// Bio content with prose styling
				bioContent.length > 0 &&
					this.h(
						"div",
						{
							class: this.clsx(
								"prose prose-zinc dark:prose-invert max-w-none",
								"prose-p:text-zinc-700 dark:prose-p:text-zinc-300",
								"prose-headings:text-zinc-900 dark:prose-headings:text-white",
							),
						},
						...bioContent,
					),
			),
		);
	}

	render() {
		const variant = this.getAttribute("variant") || "default";

		// Store original children before clearing
		const originalChildren = Array.from(this.childNodes);

		// Clear current content
		this.innerHTML = "";

		// Render appropriate variant
		const card =
			variant === "compact"
				? this.#renderCompactVariant()
				: this.#renderDefaultVariant();

		// Append the rendered card
		this.appendChild(card);

		// Re-inject original children into the bio content area
		const bioContainer = card.querySelector(
			variant === "compact" ? ".text-left" : ".prose",
		);
		if (bioContainer) {
			bioContainer.innerHTML = "";
			for (const child of originalChildren) {
				bioContainer.appendChild(child.cloneNode(true));
			}
		}
	}
}

defineElement("profile-card", ProfileCard);
export default ProfileCard;
