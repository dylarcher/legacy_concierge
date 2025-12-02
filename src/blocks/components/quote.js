import { BaseComponent, defineElement } from "../_base.js";

/**
 * Quote card component for displaying testimonials and partner quotes
 *
 * @element quote-card
 * @attr {string} quote - Testimonial or quote text
 * @attr {string} author - Person's name
 * @attr {string} role - Title/organization/position
 * @attr {string} avatar - Profile image URL (optional)
 *
 * @example
 * <quote-card
 *   quote="Legacy Concierge sets the gold standard for home healthcare."
 *   author="Dr. Sarah Mitchell"
 *   role="Medical Director, Coastal Health Partners"
 *   avatar="/assets/media/images/partner-avatar-1.webp">
 * </quote-card>
 *
 * @example
 * <!-- Without avatar -->
 * <quote-card
 *   quote="The level of care and professionalism is unmatched."
 *   author="John Anderson"
 *   role="CEO, Healthcare Innovations">
 * </quote-card>
 */
export class QuoteCard extends BaseComponent {
	static get observedAttributes() {
		return ["quote", "author", "role", "avatar"];
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
	 * Creates the quote icon SVG
	 * @returns {SVGElement} Quote icon
	 */
	#createQuoteIcon() {
		return this.svg(
			"svg",
			{
				class: "w-12 h-12 text-cyan-500 dark:text-cyan-400 mb-4",
				fill: "currentColor",
				viewBox: "0 0 24 24",
				"aria-hidden": "true",
			},
			this.svg("path", {
				d: "M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z",
			}),
		);
	}

	render() {
		const quote = this.getAttribute("quote") || "";
		const author = this.getAttribute("author") || "";
		const role = this.getAttribute("role") || "";
		const avatar = this.getAttribute("avatar");

		const card = this.h(
			"div",
			{
				class: this.clsx(
					"bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8",
					"ring-1 ring-zinc-950/5 dark:ring-white/10",
					"transition-shadow hover:shadow-xl",
					"h-full flex flex-col",
				),
			},
			// Quote icon
			this.#createQuoteIcon(),

			// Quote text
			quote &&
				this.h(
					"blockquote",
					{
						class:
							"text-lg text-zinc-700 dark:text-zinc-300 mb-6 italic flex-grow",
					},
					`"${quote}"`,
				),

			// Author section
			(author || role) &&
				this.h(
					"div",
					{
						class: "flex items-center gap-4 mt-auto",
					},
					// Avatar (if provided)
					avatar &&
						this.h("img", {
							src: avatar,
							alt: author,
							class:
								"w-12 h-12 rounded-full object-cover ring-2 ring-cyan-500/20",
						}),
					// Author info
					this.h(
						"div",
						{},
						author &&
							this.h(
								"p",
								{
									class: "font-semibold text-zinc-900 dark:text-white",
								},
								author,
							),
						role &&
							this.h(
								"p",
								{
									class: "text-sm text-zinc-600 dark:text-zinc-400",
								},
								role,
							),
					),
				),
		);

		this.innerHTML = "";
		this.appendChild(card);
	}
}

defineElement("quote-card", QuoteCard);
export default QuoteCard;
