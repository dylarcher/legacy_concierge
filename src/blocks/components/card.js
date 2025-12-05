import {
	getAnimationDuration,
	prefersReducedMotion,
	slideDown,
	slideUp,
} from "../../utilities/animation.js";
import { uniqueId } from "../../utilities/dom.js";
import { BaseComponent, defineElement } from "../_base.js";
import {
	BUTTON_BASE,
	BUTTON_COLORS,
	BUTTON_SOLID,
} from "../elements/button.js";
import {
	DIALOG_BODY,
	DIALOG_PANEL,
	DIALOG_SIZES,
	DIALOG_TITLE,
} from "../elements/dialog.js";
import { createDivider } from "../elements/divider.js";
// Import element templates for consistent styling
import { HEADING_BASE } from "../elements/heading.js";
import { TEXT_BASE } from "../elements/text.js";

/**
 * Expandable card container component with preview and animated content reveal.
 * Supports toggle mode (expand/collapse), link mode (static with link), and dialog mode (modal popup).
 *
 * @element card-extender
 * @attr {boolean} open - Whether the card is expanded (toggle mode) or dialog is open (dialog mode)
 * @attr {string} mode - Card behavior: "toggle" (default), "link", or "dialog"
 * @attr {string} layout - Card layout: "overlay" (default, image behind content) or "stacked" (image above content)
 * @attr {boolean} no-toggle - When present, hides the toggle/link/dialog button entirely
 * @attr {string} href - Link URL when mode is "link"
 * @attr {number} duration - Animation duration in ms (default: 300)
 * @attr {string} image - Background image URL
 * @attr {string} image-alt - Background image alt text
 * @attr {string} dialog-size - Dialog size when mode is "dialog": "xs"|"sm"|"md"|"lg"|"xl"|"2xl"|"3xl"|"4xl"|"5xl"|"full" (default: "lg")
 * @attr {boolean} dialog-fullscreen - Whether dialog should be fullscreen (overrides dialog-size)
 * @attr {string} dialog-title - Title shown in dialog header
 *
 * @fires card-expand - When the card expands (detail: { card })
 * @fires card-collapse - When the card collapses (detail: { card })
 * @fires card-change - When the card state changes (detail: { card, open })
 * @fires dialog-open - When dialog opens (detail: { card, dialog })
 * @fires dialog-close - When dialog closes (detail: { card, dialog })
 *
 * @slot - Default slot for card-preview and card-content
 *
 * @example
 * <!-- Toggle mode (default) -->
 * <card-extender image="/images/beach.webp">
 *   <card-preview>
 *     <h3>Card Title</h3>
 *   </card-preview>
 *   <card-content>
 *     <p>Expanded content goes here...</p>
 *   </card-content>
 *   <card-toggle>View Details</card-toggle>
 * </card-extender>
 *
 * @example
 * <!-- Stacked layout (image above content) -->
 * <card-extender layout="stacked" image="/images/beach.webp">
 *   <card-preview>
 *     <h3>Card Title</h3>
 *     <p>Description text</p>
 *   </card-preview>
 *   <card-content>
 *     <p>Expanded content goes here...</p>
 *   </card-content>
 *   <card-toggle>View Details</card-toggle>
 * </card-extender>
 *
 * @example
 * <!-- No toggle button (static display) -->
 * <card-extender no-toggle image="/images/info.webp">
 *   <card-preview>
 *     <h3>Information Card</h3>
 *     <p>This card has no interactive button</p>
 *   </card-preview>
 * </card-extender>
 *
 * @example
 * <!-- Link mode -->
 * <card-extender mode="link" href="/services" image="/images/services.webp">
 *   <card-preview>
 *     <h3>Services</h3>
 *   </card-preview>
 *   <card-toggle>Learn More</card-toggle>
 * </card-extender>
 *
 * @example
 * <!-- Dialog mode (basic modal) -->
 * <card-extender mode="dialog" dialog-size="lg" dialog-title="Location Details" image="/images/location.webp">
 *   <card-preview>
 *     <h3>Los Angeles</h3>
 *   </card-preview>
 *   <card-content>
 *     <p>Full location details shown in modal...</p>
 *   </card-content>
 *   <card-toggle>View Location</card-toggle>
 * </card-extender>
 *
 * @example
 * <!-- Dialog mode (fullscreen) -->
 * <card-extender mode="dialog" dialog-fullscreen dialog-title="Gallery" image="/images/gallery.webp">
 *   <card-preview>
 *     <h3>Photo Gallery</h3>
 *   </card-preview>
 *   <card-content>
 *     <div class="grid grid-cols-3 gap-4">...</div>
 *   </card-content>
 *   <card-toggle>View Gallery</card-toggle>
 * </card-extender>
 */
export class CardDetails extends BaseComponent {
	static get observedAttributes() {
		return [
			"open",
			"mode",
			"layout",
			"no-toggle",
			"href",
			"duration",
			"image",
			"image-alt",
			"dialog-size",
			"dialog-fullscreen",
			"dialog-title",
		];
	}

	#isAnimating = false;
	#cardId = null;
	#dialogElement = null;

	constructor() {
		super();
		this.#cardId = uniqueId("card-extender");
	}

	connectedCallback() {
		this.render();
		// If open attribute is set, ensure content is visible
		if (this.hasAttribute("open")) {
			if (this.isDialogMode) {
				this.#openDialog();
			} else {
				this.#updateContentVisibility(true, false);
			}
		}
	}

	disconnectedCallback() {
		// Clean up dialog if it exists
		if (this.#dialogElement) {
			this.#dialogElement.close();
			this.#dialogElement.remove();
			this.#dialogElement = null;
		}
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue === newValue) return;

		if (name === "open" && this.isConnected) {
			const isOpening = newValue !== null;
			if (this.isDialogMode) {
				if (isOpening) {
					this.#openDialog();
				} else {
					this.#closeDialog();
				}
			} else {
				this.#updateContentVisibility(isOpening, true);
			}
		} else if (this.isConnected) {
			this.render();
		}
	}

	/**
	 * Returns whether the card is expanded
	 * @returns {boolean}
	 */
	get isOpen() {
		return this.hasAttribute("open");
	}

	/**
	 * Returns whether the card is in link mode
	 * @returns {boolean}
	 */
	get isLinkMode() {
		return this.getAttribute("mode") === "link";
	}

	/**
	 * Returns whether the card is in dialog mode
	 * @returns {boolean}
	 */
	get isDialogMode() {
		return this.getAttribute("mode") === "dialog";
	}

	/**
	 * Returns whether the dialog should be fullscreen
	 * @returns {boolean}
	 */
	get isDialogFullscreen() {
		return this.hasAttribute("dialog-fullscreen");
	}

	/**
	 * Returns whether the card uses stacked layout (image above content)
	 * @returns {boolean}
	 */
	get isStackedLayout() {
		return this.getAttribute("layout") === "stacked";
	}

	/**
	 * Returns whether the toggle button should be hidden
	 * @returns {boolean}
	 */
	get isToggleHidden() {
		return this.hasAttribute("no-toggle");
	}

	/**
	 * Returns the dialog size variant
	 * @returns {string}
	 */
	get dialogSize() {
		return this.getAttribute("dialog-size") || "lg";
	}

	/**
	 * Returns the dialog title
	 * @returns {string|null}
	 */
	get dialogTitle() {
		return this.getAttribute("dialog-title");
	}

	/**
	 * Returns the animation duration in milliseconds
	 * @returns {number}
	 */
	get animationDuration() {
		return getAnimationDuration(this.getAttr("duration", 300));
	}

	/**
	 * Returns the card's unique ID
	 * @returns {string}
	 */
	get cardId() {
		return this.#cardId;
	}

	/**
	 * Returns the preview element
	 * @returns {CardDetailsPreview|null}
	 */
	get preview() {
		return this.querySelector(":scope > card-preview");
	}

	/**
	 * Returns the content element
	 * @returns {CardDetailsContent|null}
	 */
	get content() {
		return this.querySelector(":scope > card-content");
	}

	/**
	 * Returns the toggle element
	 * @returns {CardDetailsToggle|null}
	 */
	get toggleElement() {
		return this.querySelector(":scope > card-toggle");
	}

	/**
	 * Returns the dialog element (if in dialog mode and created)
	 * @returns {HTMLDialogElement|null}
	 */
	get dialog() {
		return this.#dialogElement;
	}

	/**
	 * Expands the card or opens dialog
	 * @returns {void}
	 */
	expand() {
		if (this.isLinkMode || this.isOpen || this.#isAnimating) return;

		this.setAttribute("open", "");

		if (this.isDialogMode) {
			this.emit("dialog-open", { card: this, dialog: this.#dialogElement });
		} else {
			this.emit("card-expand", { card: this });
		}
		this.emit("card-change", { card: this, open: true });
	}

	/**
	 * Collapses the card or closes dialog
	 * @returns {void}
	 */
	collapse() {
		if (this.isLinkMode || !this.isOpen || this.#isAnimating) return;

		this.removeAttribute("open");

		if (this.isDialogMode) {
			this.emit("dialog-close", { card: this, dialog: this.#dialogElement });
		} else {
			this.emit("card-collapse", { card: this });
		}
		this.emit("card-change", { card: this, open: false });
	}

	/**
	 * Toggles the card open/closed
	 * @returns {void}
	 */
	toggle() {
		if (this.isOpen) {
			this.collapse();
		} else {
			this.expand();
		}
	}

	/**
	 * Opens the dialog modal
	 * @returns {void}
	 */
	#openDialog() {
		if (!this.isDialogMode) return;

		// Create dialog if it doesn't exist
		if (!this.#dialogElement) {
			this.#createDialog();
		}

		// Show the dialog
		this.#dialogElement.showModal();

		// Animate in if not reduced motion
		if (!prefersReducedMotion()) {
			const panel = this.#dialogElement.querySelector("[data-dialog-panel]");
			if (panel) {
				panel.style.opacity = "0";
				panel.style.transform = this.isDialogFullscreen
					? "scale(0.95)"
					: "translateY(20px)";
				requestAnimationFrame(() => {
					panel.style.transition = `all ${this.animationDuration}ms ease-out`;
					panel.style.opacity = "1";
					panel.style.transform = this.isDialogFullscreen
						? "scale(1)"
						: "translateY(0)";
				});
			}
		}
	}

	/**
	 * Closes the dialog modal
	 * @returns {void}
	 */
	async #closeDialog() {
		if (!this.#dialogElement) return;

		// Animate out if not reduced motion
		if (!prefersReducedMotion()) {
			const panel = this.#dialogElement.querySelector("[data-dialog-panel]");
			if (panel) {
				panel.style.transition = `all ${this.animationDuration}ms ease-in`;
				panel.style.opacity = "0";
				panel.style.transform = this.isDialogFullscreen
					? "scale(0.95)"
					: "translateY(20px)";
				await new Promise((resolve) =>
					setTimeout(resolve, this.animationDuration),
				);
			}
		}

		this.#dialogElement.close();
	}

	/**
	 * Creates the dialog element
	 * @returns {void}
	 */
	#createDialog() {
		const isFullscreen = this.isDialogFullscreen;
		const size = this.dialogSize;
		const title = this.dialogTitle;
		const image = this.getAttribute("image") || "";

		// Create native dialog element using imported dialog styles
		const dialog = this.h("dialog", {
			class: this.clsx(
				"fixed inset-0 z-50 m-0 h-full max-h-full w-full max-w-full",
				"overflow-y-auto bg-transparent p-0",
				"backdrop:bg-zinc-950/25 dark:backdrop:bg-zinc-950/50",
			),
			onClick: (event) => {
				// Close on backdrop click
				if (event.target === dialog) {
					this.collapse();
				}
			},
			onKeyDown: (event) => {
				if (event.key === "Escape") {
					event.preventDefault();
					this.collapse();
				}
			},
			onClose: () => {
				// Sync state when dialog is closed via native methods
				if (this.isOpen) {
					this.removeAttribute("open");
				}
			},
		});

		// Scroll container
		const scrollContainer = this.h("div", {
			class: this.clsx(
				"fixed inset-0 w-screen overflow-y-auto",
				isFullscreen ? "" : "pt-6 sm:pt-0",
			),
		});

		// Grid container for centering
		const gridContainer = this.h("div", {
			class: this.clsx(
				isFullscreen
					? "min-h-full"
					: "grid min-h-full grid-rows-[1fr_auto] justify-items-center sm:grid-rows-[1fr_auto_3fr] sm:p-4",
			),
		});

		// Panel - use imported DIALOG_PANEL styles
		const panelClasses = this.clsx(
			isFullscreen
				? "min-h-full w-full bg-white dark:bg-zinc-900"
				: [DIALOG_PANEL, DIALOG_SIZES[size] || DIALOG_SIZES.lg].join(" "),
		);

		const panel = this.h("div", {
			class: panelClasses,
			"data-dialog-panel": "",
			role: "document",
		});

		// Header with close button - use imported title styles
		const headerDivider = isFullscreen
			? createDivider({ soft: true, className: "mt-4 sm:mt-6" })
			: null;

		const header = this.h(
			"div",
			{
				class: this.clsx(
					"flex items-center justify-between",
					isFullscreen ? "p-4 sm:p-6" : "mb-6",
				),
			},
			// Title - use imported DIALOG_TITLE styles
			title
				? this.h(
						"h2",
						{
							class: DIALOG_TITLE,
						},
						title,
					)
				: this.h("div"),
			// Close button - use button-like styling from elements
			this.h(
				"button",
				{
					type: "button",
					class: this.clsx(
						"relative isolate inline-flex items-center justify-center",
						"size-10 sm:size-12 rounded-full",
						"bg-zinc-100 hover:bg-zinc-200",
						"dark:bg-white/5 dark:hover:bg-white/10",
						"text-zinc-500 hover:text-zinc-700",
						"dark:text-zinc-400 dark:hover:text-white",
						"transition-colors duration-200",
						"focus:outline-none focus-visible:outline focus-visible:outline-2",
						"focus-visible:outline-offset-2 focus-visible:outline-blue-500",
					),
					"aria-label": "Close dialog",
					onClick: () => this.collapse(),
				},
				this.#createCloseIcon(),
			),
		);

		// Content container - use imported DIALOG_BODY styles
		const contentContainer = this.h("div", {
			class: this.clsx(isFullscreen ? "p-4 sm:p-6" : DIALOG_BODY, TEXT_BASE),
		});

		// Clone content from card-content
		const cardContent = this.content;
		if (cardContent) {
			const contentInner = cardContent.querySelector("[data-content-inner]");
			if (contentInner) {
				contentContainer.innerHTML = contentInner.innerHTML;
			} else {
				// Fallback to original children
				for (const child of cardContent.childNodes) {
					if (
						child.nodeType === Node.ELEMENT_NODE &&
						!child.matches("[data-content-inner]")
					) {
						contentContainer.appendChild(child.cloneNode(true));
					} else if (child.nodeType === Node.TEXT_NODE) {
						contentContainer.appendChild(child.cloneNode(true));
					}
				}
			}
		}

		// Optional: Add background image for fullscreen mode
		if (isFullscreen && image) {
			const bgImage = this.h("div", {
				class: "fixed inset-0 -z-10",
				style: `background-image: url('${image}'); background-size: cover; background-position: center;`,
				"aria-hidden": "true",
			});
			const bgOverlay = this.h("div", {
				class: "absolute inset-0 bg-white/90 dark:bg-zinc-900/95",
			});
			bgImage.appendChild(bgOverlay);
			panel.appendChild(bgImage);
		}

		panel.appendChild(header);
		// Add divider after header in fullscreen mode
		if (headerDivider) {
			panel.appendChild(headerDivider);
		}
		panel.appendChild(contentContainer);
		gridContainer.appendChild(panel);
		scrollContainer.appendChild(gridContainer);
		dialog.appendChild(scrollContainer);

		// Append to body
		document.body.appendChild(dialog);
		this.#dialogElement = dialog;
	}

	/**
	 * Creates the close icon SVG
	 * @returns {SVGElement}
	 */
	#createCloseIcon() {
		return this.svg(
			"svg",
			{
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2",
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"aria-hidden": "true",
				class: "size-5",
			},
			this.svg("path", { d: "M18 6L6 18" }),
			this.svg("path", { d: "M6 6L18 18" }),
		);
	}

	/**
	 * Updates content visibility with optional animation
	 * @param {boolean} isOpen - Whether card should be open
	 * @param {boolean} animate - Whether to animate the transition
	 * @returns {Promise<void>}
	 */
	async #updateContentVisibility(isOpen, animate = true) {
		const content = this.content;
		const toggle = this.toggleElement;
		if (!content) return;

		const contentInner = content.querySelector("[data-content-inner]");
		if (!contentInner) return;

		const duration = this.animationDuration;

		// Update toggle aria-expanded
		toggle?.updateAriaExpanded(isOpen);

		// Update data-state on card
		this.setState("state", isOpen ? "open" : "closed");

		// Update overlay gradient
		const overlay = this.querySelector("[data-overlay]");
		if (overlay) {
			overlay.className = this.clsx(
				"absolute inset-0 -z-10 rounded-lg transition-opacity duration-300",
				isOpen
					? "bg-gradient-to-t from-[rgba(35,31,32,0.92)] from-[20%] to-[rgba(35,31,32,0.1)]"
					: "bg-gradient-to-t from-[#231f20] from-[13%] to-transparent",
			);
		}

		if (isOpen) {
			content.removeAttribute("hidden");
			contentInner.style.display = "block";

			if (animate && !prefersReducedMotion()) {
				this.#isAnimating = true;
				await slideDown(contentInner, duration);
				this.#isAnimating = false;
			}
		} else {
			if (animate && !prefersReducedMotion()) {
				this.#isAnimating = true;
				await slideUp(contentInner, duration);
				this.#isAnimating = false;
			}

			contentInner.style.display = "none";
			content.setAttribute("hidden", "");
		}
	}

	render() {
		const image = this.getAttribute("image") || "";
		const imageAlt = this.getAttribute("image-alt") || "Card background";
		const isOpen = this.isOpen;
		const isDialogMode = this.isDialogMode;
		const isStacked = this.isStackedLayout;

		// Stacked layout uses flex column with image on top
		// Overlay layout uses absolute positioning with image behind
		const classes = this.clsx(
			"relative block overflow-hidden rounded-lg",
			"w-full max-w-[325px]",
			"transition-all duration-300 ease-in-out",
			isStacked
				? "flex flex-col bg-canvas dark:bg-depth-2"
				: [
						// In dialog mode, card doesn't expand - stays collapsed
						isOpen && !isDialogMode ? "min-h-[703px]" : "h-[478px]",
					],
			this.className,
		);

		this.renderWithChildren("div", {
			class: classes,
			"data-state": isOpen ? "open" : "closed",
			"data-mode": this.getAttribute("mode") || "toggle",
			"data-layout": isStacked ? "stacked" : "overlay",
		});

		const wrapper = this.querySelector(":scope > div");
		if (!wrapper) return;

		// Stacked layout: image as block element at top
		if (isStacked) {
			if (!this.querySelector("[data-card-image-container]")) {
				// Image container (fixed aspect ratio)
				const imageContainer = this.h(
					"div",
					{
						class: "relative aspect-[4/3] w-full flex-shrink-0 overflow-hidden",
						"data-card-image-container": "",
					},
					this.h("img", {
						class: "size-full object-cover object-center",
						src: image,
						alt: imageAlt,
						loading: "lazy",
						"data-card-bg": "",
					}),
				);

				// Insert image container at the beginning
				wrapper.insertBefore(imageContainer, wrapper.firstChild);
			}
		} else {
			// Overlay layout: background elements positioned absolutely
			if (!this.querySelector("[data-card-bg]")) {
				// Shadow element
				const shadow = this.h("div", {
					class:
						"absolute -z-30 rounded-lg blur-[18px] bg-[rgba(24,24,24,0.8)] inset-[17%_6%_61%_3%]",
					"aria-hidden": "true",
					"data-card-shadow": "",
				});

				// Background image
				const backgroundImage = this.h("img", {
					class: "absolute inset-0 size-full object-cover object-center -z-20",
					src: image,
					alt: imageAlt,
					loading: "lazy",
					"data-card-bg": "",
				});

				// Overlay gradient
				const overlay = this.h("div", {
					class: this.clsx(
						"absolute inset-0 -z-10 rounded-lg transition-opacity duration-300",
						isOpen && !isDialogMode
							? "bg-gradient-to-t from-[rgba(35,31,32,0.92)] from-[20%] to-[rgba(35,31,32,0.1)]"
							: "bg-gradient-to-t from-[#231f20] from-[13%] to-transparent",
					),
					"aria-hidden": "true",
					"data-overlay": "",
				});

				wrapper.insertBefore(overlay, wrapper.firstChild);
				wrapper.insertBefore(backgroundImage, wrapper.firstChild);
				wrapper.insertBefore(shadow, wrapper.firstChild);
			}
		}
	}
}

/**
 * Card extender preview component - always visible section
 *
 * @element card-preview
 *
 * @slot - Default slot for preview content (title, subtitle, etc.)
 *
 * @example
 * <card-preview>
 *   <h3 class="text-2xl font-bold text-white">Card Title</h3>
 *   <p class="text-white/80">Short description...</p>
 * </card-preview>
 */
export class CardDetailsPreview extends BaseComponent {
	connectedCallback() {
		this.render();
	}

	/**
	 * Returns the parent card element
	 * @returns {CardDetails|null}
	 */
	get card() {
		return this.closest("card-extender");
	}

	/**
	 * Returns whether the parent card uses stacked layout
	 * @returns {boolean}
	 */
	get isStackedLayout() {
		return this.card?.isStackedLayout ?? false;
	}

	render() {
		const isStacked = this.isStackedLayout;

		// Stacked layout: static flow positioning with standard heading colors
		// Overlay layout: absolute positioning over image with white text
		// Use imported HEADING_BASE for consistent typography
		const classes = this.clsx(
			"block",
			isStacked
				? ["p-6", HEADING_BASE].join(" ")
				: "absolute top-0 left-0 right-0 p-8 text-white",
			this.className,
		);

		this.renderWithChildren("div", {
			class: classes,
			"data-preview": "",
		});
	}
}

/**
 * Card extender content component - animated expandable section or dialog content
 *
 * @element card-content
 *
 * @slot - Default slot for expanded content
 *
 * @example
 * <card-content>
 *   <ul class="list-disc ml-6 space-y-2">
 *     <li>Feature one</li>
 *     <li>Feature two</li>
 *   </ul>
 * </card-content>
 */
export class CardDetailsContent extends BaseComponent {
	connectedCallback() {
		this.render();
	}

	/**
	 * Returns the parent card element
	 * @returns {CardDetails|null}
	 */
	get card() {
		return this.closest("card-extender");
	}

	/**
	 * Returns whether the parent card uses stacked layout
	 * @returns {boolean}
	 */
	get isStackedLayout() {
		return this.card?.isStackedLayout ?? false;
	}

	render() {
		const card = this.card;
		const isOpen = card?.isOpen ?? false;
		const isDialogMode = card?.isDialogMode ?? false;
		const isStacked = this.isStackedLayout;
		const cardId = card?.cardId ?? uniqueId("card-extender");
		const contentId = `${cardId}-content`;

		// In dialog mode, content is hidden in the card (shown in dialog)
		if (isDialogMode) {
			this.style.display = "none";
			return;
		}

		// Collect original children
		const originalContent = Array.from(this.childNodes).filter(
			(node) =>
				node.nodeType === Node.TEXT_NODE ||
				(node.nodeType === Node.ELEMENT_NODE &&
					!node.matches("[data-content-inner]")),
		);

		this.innerHTML = "";
		this.style.display = "";

		// Stacked layout: static flow positioning
		// Overlay layout: absolute positioning at bottom
		const contentClasses = this.clsx(
			"block overflow-hidden",
			isStacked ? "" : "absolute bottom-0 left-0 right-0",
		);

		// Use imported TEXT_BASE for stacked layout, custom styles for overlay
		const innerClasses = this.clsx(
			isStacked
				? ["px-6 pb-6", TEXT_BASE].join(" ")
				: "p-8 pt-0 font-semibold text-base leading-8 tracking-wide text-white",
			this.className,
		);

		const inner = this.h(
			"div",
			{
				class: innerClasses,
				"data-content-inner": "",
				style: isOpen ? "" : "display: none;",
			},
			...originalContent,
		);

		const wrapper = this.h(
			"div",
			{
				id: contentId,
				class: contentClasses,
				hidden: !isOpen || undefined,
			},
			inner,
		);

		this.appendChild(wrapper);
	}
}

/**
 * Card extender toggle component - button to expand/collapse, link, or open dialog
 *
 * @element card-toggle
 * @attr {string} expanded-label - Label when card is expanded (default: "Close")
 *
 * @slot - Default slot for button text
 *
 * @example
 * <card-toggle>View Details</card-toggle>
 *
 * @example
 * <card-toggle expanded-label="Hide Details">
 *   Show Details
 * </card-toggle>
 */
export class CardDetailsToggle extends BaseComponent {
	#buttonElement = null;
	#originalLabel = "";

	connectedCallback() {
		// Store original label before rendering
		this.#originalLabel = this.textContent.trim();
		this.render();
	}

	/**
	 * Returns the parent card element
	 * @returns {CardDetails|null}
	 */
	get card() {
		return this.closest("card-extender");
	}

	/**
	 * Returns whether the parent card uses stacked layout
	 * @returns {boolean}
	 */
	get isStackedLayout() {
		return this.card?.isStackedLayout ?? false;
	}

	/**
	 * Returns whether the toggle should be hidden (no-toggle attribute on parent)
	 * @returns {boolean}
	 */
	get isHidden() {
		return this.card?.isToggleHidden ?? false;
	}

	/**
	 * Updates the aria-expanded attribute on the button
	 * @param {boolean} isExpanded - Whether the card is expanded
	 * @returns {void}
	 */
	updateAriaExpanded(isExpanded) {
		if (this.#buttonElement) {
			this.#buttonElement.setAttribute(
				"aria-expanded",
				isExpanded ? "true" : "false",
			);

			// Update label if expanded-label is specified (only for toggle mode)
			const card = this.card;
			if (!card?.isDialogMode) {
				const expandedLabel = this.getAttribute("expanded-label");
				if (expandedLabel) {
					const labelSpan = this.#buttonElement.querySelector("[data-label]");
					if (labelSpan) {
						labelSpan.textContent = isExpanded
							? expandedLabel
							: this.#originalLabel;
					}
				}
			}
		}
	}

	/**
	 * Handles click on the toggle
	 * @returns {void}
	 */
	#handleClick() {
		this.card?.toggle();
	}

	/**
	 * Creates the close icon SVG
	 * @returns {SVGElement}
	 */
	#createCloseIcon() {
		return this.svg(
			"svg",
			{
				viewBox: "0 0 18 18",
				fill: "none",
				"aria-hidden": "true",
				class: "size-4",
			},
			this.svg("path", {
				d: "M1 1L17 17M17 1L1 17",
				stroke: "currentColor",
				"stroke-width": "2",
				"stroke-linecap": "round",
			}),
		);
	}

	render() {
		const card = this.card;
		const isOpen = card?.isOpen ?? false;
		const isLinkMode = card?.isLinkMode ?? false;
		const isDialogMode = card?.isDialogMode ?? false;
		const isStacked = this.isStackedLayout;
		const href = card?.getAttribute("href") || "#";
		const cardId = card?.cardId ?? uniqueId("card-extender");
		const contentId = `${cardId}-content`;
		const expandedLabel = this.getAttribute("expanded-label");

		this.innerHTML = "";

		// If no-toggle is set on parent, hide this element entirely
		if (this.isHidden) {
			this.style.display = "none";
			return;
		}

		this.style.display = "";

		// Button positioning: stacked uses static flow, overlay uses absolute
		const basePositionClasses = isStacked
			? "mx-6 mb-6 mt-2"
			: "absolute bottom-16 left-1/2 -translate-x-1/2";

		// Button styling using imported BUTTON constants for consistency
		// Stacked layout uses solid button style, overlay uses custom white style
		const baseButtonClasses = isStacked
			? this.clsx(
					BUTTON_BASE,
					"rounded-full h-12 px-6",
					BUTTON_COLORS["dark/zinc"],
					BUTTON_SOLID,
				)
			: [
					"relative isolate inline-flex items-center justify-center gap-x-2",
					"h-12 px-6 rounded-full",
					"bg-white/80 hover:bg-white",
					"font-semibold text-base",
					"text-[#072835]",
					"transition-colors duration-200",
					"focus:outline-none focus-visible:outline focus-visible:outline-2",
					"focus-visible:outline-offset-2 focus-visible:outline-blue-500",
				].join(" ");

		if (isLinkMode) {
			// Link mode - render as anchor using button styles
			const linkClasses = this.clsx(baseButtonClasses, basePositionClasses);

			const link = this.h(
				"a",
				{
					class: linkClasses,
					href: href,
				},
				this.#originalLabel,
			);

			this.appendChild(link);
		} else if (isDialogMode) {
			// Dialog mode - always show the trigger button (never changes to close)
			const buttonClasses = this.clsx(baseButtonClasses, basePositionClasses);

			const button = this.h(
				"button",
				{
					type: "button",
					class: buttonClasses,
					"aria-haspopup": "dialog",
					onClick: () => this.#handleClick(),
					ref: (element) => {
						this.#buttonElement = element;
					},
				},
				this.h("span", { "data-label": "" }, this.#originalLabel),
			);

			this.appendChild(button);
		} else if (isOpen) {
			// Toggle mode - Expanded state - show close button in top right
			// Use consistent button styling with BUTTON constants
			const closeClasses = this.clsx(
				"absolute top-4 right-4",
				"relative isolate inline-flex items-center justify-center",
				"size-12 rounded-full",
				"focus:outline-none focus-visible:outline focus-visible:outline-2",
				"focus-visible:outline-offset-2 focus-visible:outline-blue-500",
				isStacked
					? "bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-700 dark:bg-white/5 dark:hover:bg-white/10 dark:text-zinc-400 dark:hover:text-white"
					: "bg-white/80 hover:bg-white opacity-80 hover:opacity-100",
				"transition-all duration-200",
			);

			const closeButton = this.h(
				"button",
				{
					type: "button",
					class: closeClasses,
					"aria-label": "Close expanded card",
					"aria-expanded": "true",
					"aria-controls": contentId,
					onClick: () => this.#handleClick(),
					ref: (element) => {
						this.#buttonElement = element;
					},
				},
				this.#createCloseIcon(),
			);

			this.appendChild(closeButton);
		} else {
			// Toggle mode - Collapsed state - show expand button
			const buttonClasses = this.clsx(baseButtonClasses, basePositionClasses);

			const button = this.h(
				"button",
				{
					type: "button",
					class: buttonClasses,
					"aria-expanded": "false",
					"aria-controls": contentId,
					onClick: () => this.#handleClick(),
					ref: (element) => {
						this.#buttonElement = element;
					},
				},
				this.h(
					"span",
					{ "data-label": "" },
					expandedLabel && isOpen ? expandedLabel : this.#originalLabel,
				),
			);

			this.appendChild(button);
		}
	}
}

// Register custom elements
defineElement("card-details", CardDetails);
defineElement("card-preview", CardDetailsPreview);
defineElement("card-content", CardDetailsContent);
defineElement("card-toggle", CardDetailsToggle);
