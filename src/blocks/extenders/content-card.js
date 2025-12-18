/**
 * Content Card Component
 * A versatile card with featured/background images, text content, and interactive actions
 * Styled with Legacy Concierge design system tokens
 *
 * @element content-card
 *
 * @attr {string} image - URL for featured or background image
 * @attr {string} image-mode - "featured" (top) | "background" (full cover)
 * @attr {string} image-position - CSS object-position value (default: "center")
 * @attr {string} title - Card title text
 * @attr {string} tagline - Optional tagline/subtitle
 * @attr {string} title-align - "left" | "center" (default: "left")
 * @attr {string} body-align-v - Vertical alignment: "top" | "bottom" (default: "top")
 * @attr {string} body-align-h - Horizontal alignment: "left" | "center" (default: "left")
 * @attr {string} action-type - "button" | "icon" (default: "button")
 * @attr {string} action-align - "left" | "center" | "block" (for buttons, default: "left")
 * @attr {string} action-text - Button text (default: "Learn More")
 * @attr {string} capability - "expand" | "display" | "route"
 * @attr {string} href - URL for "route" capability
 * @attr {boolean} open - Whether expanded content is visible (for "expand" capability)
 * @attr {boolean} invert - Invert text colors (light text on dark)
 *
 * @slot - Default slot for body content
 * @slot expanded - Content shown when expanded
 *
 * @fires card-action - When the card action is triggered
 * @fires card-expand - When card is expanded
 * @fires card-collapse - When card is collapsed
 */

import {
	BaseComponent,
	clsx,
	defineElement,
	hashUtils,
	KEYS,
} from "./_base.js";

export class ContentCard extends BaseComponent {
	static get observedAttributes() {
		return [
			"image",
			"image-mode",
			"image-position",
			"title",
			"tagline",
			"title-align",
			"body-align-v",
			"body-align-h",
			"action-type",
			"action-align",
			"action-text",
			"capability",
			"href",
			"open",
			"invert",
			"hash-prefix",
			"sync-hash",
		];
	}

	#dialog = null;
	#boundHashChange = null;
	#isExpanded = false;

	connectedCallback() {
		this.render();
		this.#attachHashListener();
		this.#initFromHash();
	}

	disconnectedCallback() {
		this.#cleanup();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue && this.isConnected) {
			if (name === "open") {
				this.#handleOpenChange();
			} else {
				this.render();
			}
		}
	}

	// Attribute getters
	get image() {
		return this.getAttribute("image");
	}
	get imageMode() {
		return this.getAttribute("image-mode") || "featured";
	}
	get imagePosition() {
		return this.getAttribute("image-position") || "center";
	}
	get cardTitle() {
		return this.getAttribute("title");
	}
	get tagline() {
		return this.getAttribute("tagline");
	}
	get titleAlign() {
		return this.getAttribute("title-align") || "left";
	}
	get bodyAlignV() {
		return this.getAttribute("body-align-v") || "top";
	}
	get bodyAlignH() {
		return this.getAttribute("body-align-h") || "left";
	}
	get actionType() {
		return this.getAttribute("action-type") || "button";
	}
	get actionAlign() {
		return this.getAttribute("action-align") || "left";
	}
	get actionText() {
		return this.getAttribute("action-text") || "Learn More";
	}
	get capability() {
		return this.getAttribute("capability") || "expand";
	}
	get href() {
		return this.getAttribute("href");
	}
	get isOpen() {
		return this.hasAttribute("open");
	}
	get invert() {
		return this.hasAttribute("invert");
	}
	get hashPrefix() {
		return this.getAttribute("hash-prefix") || "card";
	}
	get syncHash() {
		return this.getAttr("sync-hash", false);
	}

	/**
	 * Toggle expanded state
	 */
	toggle() {
		if (this.isOpen) {
			this.close();
		} else {
			this.open();
		}
	}

	/**
	 * Open/expand the card
	 */
	open() {
		if (this.capability === "route" && this.href) {
			window.location.href = this.href;
			return;
		}

		if (this.capability === "display") {
			this.#openDialog();
			this.#updateHash();
			return;
		}

		if (this.capability === "expand") {
			this.setAttribute("open", "");
			this.#isExpanded = true;
			this.#updateHash();
			this.emit("card-expand");
		}
	}

	/**
	 * Close/collapse the card
	 */
	close() {
		if (this.capability === "display" && this.#dialog) {
			this.#closeDialog();
			return;
		}

		if (this.capability === "expand") {
			this.removeAttribute("open");
			this.#isExpanded = false;
			this.emit("card-collapse");
		}
	}

	#handleOpenChange() {
		const expandedContainer = this.querySelector("[data-expanded-content]");
		if (expandedContainer) {
			if (this.isOpen) {
				expandedContainer.style.maxHeight = `${expandedContainer.scrollHeight}px`;
				expandedContainer.style.opacity = "1";
			} else {
				expandedContainer.style.maxHeight = "0";
				expandedContainer.style.opacity = "0";
			}
		}
	}

	#openDialog() {
		if (this.#dialog) return;

		const expandedSlot = this.querySelector('[slot="expanded"]');

		this.#dialog = this.h(
			"div",
			{
				class: clsx(
					"fixed inset-0 z-50 flex items-center justify-center p-4",
					"bg-black/60 backdrop-blur-sm",
				),
				role: "dialog",
				"aria-modal": "true",
				onClick: (event) => {
					if (event.target === this.#dialog) this.#closeDialog();
				},
				onKeydown: (event) => {
					if (event.key === KEYS.ESCAPE) this.#closeDialog();
				},
			},
			this.h(
				"div",
				{
					class: clsx(
						"panel-dialog",
						"relative max-w-3xl w-full max-h-[90vh] overflow-auto",
					),
				},
				// Close button
				this.h(
					"button",
					{
						type: "button",
						class: clsx(
							"absolute top-4 right-4 p-2 rounded-full",
							"bg-muted hover:bg-depth-2",
							"transition-colors",
						),
						"aria-label": "Close dialog",
						onClick: () => this.#closeDialog(),
					},
					this.#createCloseIcon(),
				),
				// Dialog content
				this.h(
					"div",
					{ class: "space-y-4" },
					this.image
						? this.h("img", {
								src: this.image,
								alt: this.cardTitle || "",
								class: "w-full h-64 object-cover rounded-lg",
							})
						: null,
					this.cardTitle
						? this.h(
								"h2",
								{
									class: "text-2xl font-serif",
									style: "color: var(--color-text)",
								},
								this.cardTitle,
							)
						: null,
					this.tagline
						? this.h(
								"p",
								{
									class: "text-lg",
									style: "color: var(--color-text-muted)",
								},
								this.tagline,
							)
						: null,
					this.h("div", {
						class: "prose max-w-none",
						style: "color: var(--color-text)",
						ref: (element) => {
							if (expandedSlot) {
								element.innerHTML = expandedSlot.innerHTML;
							}
						},
					}),
				),
			),
		);

		document.body.appendChild(this.#dialog);
		document.body.style.overflow = "hidden";

		// Focus the dialog
		this.#dialog.querySelector("button")?.focus();
	}

	#closeDialog() {
		if (this.#dialog) {
			this.#dialog.remove();
			this.#dialog = null;
			document.body.style.overflow = "";
		}
	}

	#cleanup() {
		this.#closeDialog();
		this.#detachHashListener();
	}

	#initFromHash() {
		if (!this.syncHash || !this.id) return;

		const cardId = hashUtils.getValue(this.hashPrefix);
		if (cardId === this.id) {
			requestAnimationFrame(() => {
				this.open();
				this.scrollIntoView({ behavior: "instant", block: "center" });
			});
		}
	}

	#handleHashChange = () => {
		if (!this.syncHash || !this.id) return;

		const cardId = hashUtils.getValue(this.hashPrefix);
		if (cardId === this.id && !this.isOpen) {
			this.open();
			this.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	};

	#updateHash() {
		if (!this.syncHash || !this.id) return;

		if (this.isOpen || this.#dialog) {
			hashUtils.set(hashUtils.create(this.hashPrefix, this.id));
		}
	}

	#attachHashListener() {
		if (this.syncHash) {
			this.#boundHashChange = this.#handleHashChange;
			window.addEventListener("hashchange", this.#boundHashChange);
		}
	}

	#detachHashListener() {
		if (this.#boundHashChange) {
			window.removeEventListener("hashchange", this.#boundHashChange);
			this.#boundHashChange = null;
		}
	}

	#createPlusIcon() {
		return this.svg(
			"svg",
			{
				class: "w-6 h-6",
				fill: "none",
				viewBox: "0 0 24 24",
				"stroke-width": "2",
				stroke: "currentColor",
			},
			this.svg("path", {
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				d: "M12 4v16m8-8H4",
			}),
		);
	}

	#createCloseIcon() {
		return this.svg(
			"svg",
			{
				class: "w-5 h-5",
				fill: "none",
				viewBox: "0 0 24 24",
				"stroke-width": "2",
				stroke: "currentColor",
			},
			this.svg("path", {
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				d: "M6 18L18 6M6 6l12 12",
			}),
		);
	}

	#createAction() {
		const handleAction = () => {
			this.emit("card-action", { capability: this.capability });
			this.toggle();
		};

		if (this.actionType === "icon") {
			return this.h(
				"button",
				{
					type: "button",
					class: clsx(
						"absolute top-4 right-4 p-2 rounded-full",
						"bg-white/20 backdrop-blur-sm",
						"hover:bg-white/30",
						"transition-all duration-200",
						this.isOpen && "rotate-45",
					),
					"aria-label": this.isOpen ? "Close" : "Open",
					"aria-expanded": String(this.isOpen),
					onClick: handleAction,
				},
				this.#createPlusIcon(),
			);
		}

		// Button action
		const alignClass = {
			left: "justify-start",
			center: "justify-center",
			block: "",
		}[this.actionAlign];

		const buttonClass = clsx(
			"btn-base btn-padding",
			this.invert
				? "btn-outline border-white text-white hover:bg-white/20"
				: "btn-solid",
			this.actionAlign === "block" && "w-full",
		);

		if (this.capability === "route" && this.href) {
			return this.h(
				"div",
				{ class: clsx("flex", alignClass) },
				this.h("a", { href: this.href, class: buttonClass }, this.actionText),
			);
		}

		return this.h(
			"div",
			{ class: clsx("flex", alignClass) },
			this.h(
				"button",
				{
					type: "button",
					class: buttonClass,
					"aria-expanded": String(this.isOpen),
					onClick: handleAction,
				},
				this.actionText,
			),
		);
	}

	render() {
		const textColorStyle = this.invert
			? "color: var(--color-text-inverse)"
			: "color: var(--color-text)";
		const mutedColorStyle = this.invert
			? "color: rgba(255,255,255,0.7)"
			: "color: var(--color-text-muted)";

		// Build card structure
		const card = this.h(
			"div",
			{
				class: clsx(
					"card-interactive",
					"relative overflow-hidden",
					this.imageMode === "background" && "min-h-[320px]",
				),
			},
			// Background image
			this.imageMode === "background" && this.image
				? this.h(
						"div",
						{
							class: "absolute inset-0",
							style: {
								backgroundImage: `url(${this.image})`,
								backgroundSize: "cover",
								backgroundPosition: this.imagePosition,
							},
						},
						// Gradient overlay using design token
						this.h("div", {
							class: "absolute inset-0",
							style: "background: var(--linear-card-overlay)",
						}),
					)
				: null,

			// Featured image (top)
			this.imageMode === "featured" && this.image
				? this.h(
						"div",
						{ class: "aspect-[4/3] overflow-hidden" },
						this.h("img", {
							src: this.image,
							alt: this.cardTitle || "",
							class: "w-full h-full object-cover",
							style: { objectPosition: this.imagePosition },
							loading: "lazy",
						}),
					)
				: null,

			// Icon action (positioned top-right)
			this.actionType === "icon" ? this.#createAction() : null,

			// Content container
			this.h(
				"div",
				{
					class: clsx(
						"relative z-10 p-6 flex flex-col",
						this.imageMode === "background" && "h-full min-h-[320px]",
						this.bodyAlignV === "bottom" && "justify-end",
					),
				},
				// Title and tagline
				this.h(
					"div",
					{
						class: clsx("mb-4", this.titleAlign === "center" && "text-center"),
					},
					this.cardTitle
						? this.h(
								"h3",
								{
									class: "text-xl font-serif",
									style: textColorStyle,
								},
								this.cardTitle,
							)
						: null,
					this.tagline
						? this.h(
								"p",
								{
									class: "text-sm mt-1",
									style: mutedColorStyle,
								},
								this.tagline,
							)
						: null,
				),

				// Body content (slot)
				this.h(
					"div",
					{
						class: clsx(
							"flex-1",
							this.bodyAlignH === "center" && "text-center",
						),
						style: textColorStyle,
					},
					this.h("slot"),
				),

				// Expanded content container
				this.capability === "expand"
					? this.h(
							"div",
							{
								class: "overflow-hidden transition-all duration-300",
								style: {
									maxHeight: this.isOpen ? "1000px" : "0",
									opacity: this.isOpen ? "1" : "0",
								},
								"data-expanded-content": "",
							},
							this.h(
								"div",
								{
									class: "pt-4 mt-4",
									style: this.invert
										? "border-top: 1px solid rgba(255,255,255,0.2)"
										: "border-top: 1px solid var(--color-border-soft)",
								},
								this.h("slot", { name: "expanded" }),
							),
						)
					: null,

				// Button action (at bottom)
				this.actionType === "button"
					? this.h("div", { class: "mt-4" }, this.#createAction())
					: null,
			),
		);

		// Clear and append
		this.innerHTML = "";

		// Move slotted content back
		const slots = Array.from(this.querySelectorAll("[slot]"));

		this.appendChild(card);

		// Re-append slotted content for native slot distribution
		slots.forEach(this.appendChild.bind(this));
	}
}

defineElement("content-card", ContentCard);
export default ContentCard;
