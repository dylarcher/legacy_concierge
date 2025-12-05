import {
	getAnimationDuration,
	prefersReducedMotion,
	slideDown,
	slideUp,
} from "../../utilities/animation.js";
import { uniqueId } from "../../utilities/dom.js";
import { createKeyboardNavigation, KEYS } from "../../utilities/keyboard.js";
import { BaseComponent, defineElement } from "../_base.js";

/**
 * Accordion container component that manages collapsible panels.
 * Supports independent panels (default) or exclusive mode where only one panel can be open.
 *
 * @element ui-accordion
 * @attr {boolean} exclusive - Only one panel open at a time (opt-in)
 * @attr {number} duration - Animation duration in ms (default: 200)
 *
 * @fires accordion-change - When any panel state changes (detail: { panel, open })
 * @fires accordion-expand - When a panel expands (detail: { panel })
 * @fires accordion-collapse - When a panel collapses (detail: { panel })
 *
 * @slot - Default slot for ui-accordion-panel elements
 *
 * @example
 * <!-- Independent panels (multiple can be open) -->
 * <ui-accordion>
 *   <ui-accordion-panel open>
 *     <ui-accordion-header>Section 1</ui-accordion-header>
 *     <ui-accordion-content>Content for section 1...</ui-accordion-content>
 *   </ui-accordion-panel>
 *   <ui-accordion-panel>
 *     <ui-accordion-header>Section 2</ui-accordion-header>
 *     <ui-accordion-content>Content for section 2...</ui-accordion-content>
 *   </ui-accordion-panel>
 * </ui-accordion>
 *
 * @example
 * <!-- Exclusive mode (only one open at a time) -->
 * <ui-accordion exclusive>
 *   <ui-accordion-panel>...</ui-accordion-panel>
 *   <ui-accordion-panel>...</ui-accordion-panel>
 * </ui-accordion>
 */
export class Accordion extends BaseComponent {
	static get observedAttributes() {
		return ["exclusive", "duration"];
	}

	#keyboardNav = null;

	connectedCallback() {
		this.render();
		this.#initKeyboardNavigation();
	}

	disconnectedCallback() {
		this.#keyboardNav = null;
	}

	attributeChangedCallback(_name, oldValue, newValue) {
		if (oldValue !== newValue && this.isConnected) {
			this.render();
		}
	}

	/**
	 * Returns whether exclusive mode is enabled
	 * @returns {boolean}
	 */
	get isExclusive() {
		return this.hasAttribute("exclusive");
	}

	/**
	 * Returns the animation duration in milliseconds
	 * @returns {number}
	 */
	get animationDuration() {
		return getAnimationDuration(this.getAttr("duration", 200));
	}

	/**
	 * Returns all accordion panels
	 * @returns {NodeListOf<AccordionPanel>}
	 */
	get panels() {
		return this.querySelectorAll(":scope > ui-accordion-panel");
	}

	/**
	 * Returns all accordion headers for keyboard navigation
	 * @returns {HTMLElement[]}
	 */
	get headers() {
		return Array.from(this.querySelectorAll("ui-accordion-header"));
	}

	/**
	 * Expands all panels (only in non-exclusive mode)
	 * @returns {void}
	 */
	expandAll() {
		if (this.isExclusive) return;
		this.panels.forEach((panel) => panel.open());
	}

	/**
	 * Collapses all panels
	 * @returns {void}
	 */
	collapseAll() {
		this.panels.forEach((panel) => panel.close());
	}

	/**
	 * Called by panels when they expand - handles exclusive mode
	 * @param {AccordionPanel} expandingPanel - The panel that is expanding
	 * @returns {void}
	 */
	_handlePanelExpand(expandingPanel) {
		if (this.isExclusive) {
			this.panels.forEach((panel) => {
				if (panel !== expandingPanel && panel.isOpen) {
					panel.close();
				}
			});
		}
		this.emit("accordion-expand", { panel: expandingPanel });
		this.emit("accordion-change", { panel: expandingPanel, open: true });
	}

	/**
	 * Called by panels when they collapse
	 * @param {AccordionPanel} collapsingPanel - The panel that is collapsing
	 * @returns {void}
	 */
	_handlePanelCollapse(collapsingPanel) {
		this.emit("accordion-collapse", { panel: collapsingPanel });
		this.emit("accordion-change", { panel: collapsingPanel, open: false });
	}

	/**
	 * Initializes keyboard navigation for accordion headers
	 * @returns {void}
	 */
	#initKeyboardNavigation() {
		this.#keyboardNav = createKeyboardNavigation({
			getItems: () =>
				this.headers.map((header) => header.querySelector("button")),
			onSelect: (button) => button?.click(),
			wrap: true,
			horizontal: false,
		});

		this.addEventListener("keydown", (event) => {
			// Only handle when focus is on an accordion header button
			const headerButton = event.target.closest("ui-accordion-header button");
			if (!headerButton) return;

			// Let the keyboard nav handle arrow keys
			if (
				[KEYS.ARROW_UP, KEYS.ARROW_DOWN, KEYS.HOME, KEYS.END].includes(
					event.key,
				)
			) {
				// Find current index
				const buttons = this.headers.map((h) => h.querySelector("button"));
				const currentIndex = buttons.indexOf(headerButton);
				this.#keyboardNav.setCurrentIndex(currentIndex);
				this.#keyboardNav.handleKeyDown(event);
			}
		});
	}

	render() {
		const classes = this.clsx("block divide-y divide-soft", this.className);

		this.renderWithChildren("div", {
			class: classes,
			role: "presentation",
		});
	}
}

/**
 * Accordion panel component - a single collapsible section
 *
 * @element ui-accordion-panel
 * @attr {boolean} open - Whether the panel is expanded
 * @attr {boolean} disabled - Whether the panel is disabled
 *
 * @slot - Default slot for ui-accordion-header and ui-accordion-content
 *
 * @example
 * <ui-accordion-panel open>
 *   <ui-accordion-header>Panel Title</ui-accordion-header>
 *   <ui-accordion-content>Panel content goes here...</ui-accordion-content>
 * </ui-accordion-panel>
 */
export class AccordionPanel extends BaseComponent {
	static get observedAttributes() {
		return ["open", "disabled"];
	}

	#isAnimating = false;
	#panelId = null;

	constructor() {
		super();
		this.#panelId = uniqueId("accordion-panel");
	}

	connectedCallback() {
		this.render();
		// If open attribute is set, ensure content is visible
		if (this.hasAttribute("open")) {
			this.#updateContentVisibility(true, false);
		}
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue === newValue) return;

		if (name === "open" && this.isConnected) {
			const isOpening = newValue !== null;
			this.#updateContentVisibility(isOpening, true);
		} else if (this.isConnected) {
			this.render();
		}
	}

	/**
	 * Returns whether the panel is open
	 * @returns {boolean}
	 */
	get isOpen() {
		return this.hasAttribute("open");
	}

	/**
	 * Returns whether the panel is disabled
	 * @returns {boolean}
	 */
	get isDisabled() {
		return this.hasAttribute("disabled");
	}

	/**
	 * Returns the panel's unique ID
	 * @returns {string}
	 */
	get panelId() {
		return this.#panelId;
	}

	/**
	 * Returns the parent accordion element
	 * @returns {Accordion|null}
	 */
	get accordion() {
		return this.closest("ui-accordion");
	}

	/**
	 * Returns the header element
	 * @returns {AccordionHeader|null}
	 */
	get header() {
		return this.querySelector(":scope > ui-accordion-header");
	}

	/**
	 * Returns the content element
	 * @returns {AccordionContent|null}
	 */
	get content() {
		return this.querySelector(":scope > ui-accordion-content");
	}

	/**
	 * Opens the panel
	 * @returns {void}
	 */
	open() {
		if (this.isDisabled || this.isOpen || this.#isAnimating) return;
		this.setAttribute("open", "");
		this.accordion?._handlePanelExpand(this);
	}

	/**
	 * Closes the panel
	 * @returns {void}
	 */
	close() {
		if (this.isDisabled || !this.isOpen || this.#isAnimating) return;
		this.removeAttribute("open");
		this.accordion?._handlePanelCollapse(this);
	}

	/**
	 * Toggles the panel open/closed
	 * @returns {void}
	 */
	toggle() {
		if (this.isOpen) {
			this.close();
		} else {
			this.open();
		}
	}

	/**
	 * Updates content visibility with optional animation
	 * @param {boolean} isOpen - Whether panel should be open
	 * @param {boolean} animate - Whether to animate the transition
	 * @returns {Promise<void>}
	 */
	async #updateContentVisibility(isOpen, animate = true) {
		const content = this.content;
		const header = this.header;
		if (!content) return;

		const contentInner = content.querySelector("[data-content-inner]");
		if (!contentInner) return;

		const duration = this.accordion?.animationDuration ?? 200;

		// Update ARIA states
		header?.updateAriaExpanded(isOpen);

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
		const classes = this.clsx("block", this.className);

		this.renderWithChildren("div", {
			class: classes,
			"data-state": this.isOpen ? "open" : "closed",
			"data-disabled": this.isDisabled ? "" : undefined,
		});
	}
}

/**
 * Accordion header component - clickable trigger for expanding/collapsing
 *
 * @element ui-accordion-header
 *
 * @slot - Default slot for header content (text, icons, etc.)
 *
 * @example
 * <ui-accordion-header>
 *   <span>Section Title</span>
 *   <span slot="icon">+</span>
 * </ui-accordion-header>
 */
export class AccordionHeader extends BaseComponent {
	#buttonElement = null;

	connectedCallback() {
		this.render();
	}

	/**
	 * Returns the parent panel element
	 * @returns {AccordionPanel|null}
	 */
	get panel() {
		return this.closest("ui-accordion-panel");
	}

	/**
	 * Updates the aria-expanded attribute on the button
	 * @param {boolean} isExpanded - Whether the panel is expanded
	 * @returns {void}
	 */
	updateAriaExpanded(isExpanded) {
		if (this.#buttonElement) {
			this.#buttonElement.setAttribute(
				"aria-expanded",
				isExpanded ? "true" : "false",
			);
		}
	}

	/**
	 * Handles click on the header
	 * @returns {void}
	 */
	#handleClick() {
		this.panel?.toggle();
	}

	/**
	 * Creates the chevron/arrow icon
	 * @returns {SVGElement}
	 */
	#createChevronIcon() {
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
				class:
					"size-5 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180",
			},
			this.svg("path", {
				d: "m6 9 6 6 6-6",
			}),
		);
	}

	render() {
		const panel = this.panel;
		const isOpen = panel?.isOpen ?? false;
		const isDisabled = panel?.isDisabled ?? false;
		const panelId = panel?.panelId ?? uniqueId("accordion-panel");
		const headerId = `${panelId}-header`;
		const contentId = `${panelId}-content`;

		// Collect original children
		const originalContent = Array.from(this.childNodes).filter(
			(node) =>
				node.nodeType === Node.TEXT_NODE ||
				(node.nodeType === Node.ELEMENT_NODE &&
					!node.matches("[data-accordion-inner]")),
		);

		this.innerHTML = "";

		const buttonClasses = this.clsx(
			"group flex w-full items-center justify-between gap-4",
			"py-4 text-left font-medium",
			"text-canvas transition-colors",
			"hover:text-primary",
			"focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
			isDisabled && "opacity-50 cursor-not-allowed",
		);

		const button = this.h(
			"button",
			{
				type: "button",
				id: headerId,
				class: buttonClasses,
				"aria-expanded": isOpen ? "true" : "false",
				"aria-controls": contentId,
				"aria-disabled": isDisabled ? "true" : undefined,
				"data-state": isOpen ? "open" : "closed",
				disabled: isDisabled || undefined,
				onClick: () => this.#handleClick(),
				ref: (element) => {
					this.#buttonElement = element;
				},
			},
			this.h("span", { class: "flex-1" }, ...originalContent),
			this.#createChevronIcon(),
		);

		const wrapper = this.h(
			"h3",
			{
				class: "m-0",
				"data-accordion-inner": "",
			},
			button,
		);

		this.appendChild(wrapper);
	}
}

/**
 * Accordion content component - collapsible content area
 *
 * @element ui-accordion-content
 *
 * @slot - Default slot for content
 *
 * @example
 * <ui-accordion-content>
 *   <p>This content will be hidden when the panel is collapsed.</p>
 * </ui-accordion-content>
 */
export class AccordionContent extends BaseComponent {
	connectedCallback() {
		this.render();
	}

	/**
	 * Returns the parent panel element
	 * @returns {AccordionPanel|null}
	 */
	get panel() {
		return this.closest("ui-accordion-panel");
	}

	render() {
		const panel = this.panel;
		const isOpen = panel?.isOpen ?? false;
		const panelId = panel?.panelId ?? uniqueId("accordion-panel");
		const headerId = `${panelId}-header`;
		const contentId = `${panelId}-content`;

		// Collect original children
		const originalContent = Array.from(this.childNodes).filter(
			(node) =>
				node.nodeType === Node.TEXT_NODE ||
				(node.nodeType === Node.ELEMENT_NODE &&
					!node.matches("[data-content-inner]")),
		);

		this.innerHTML = "";

		const contentClasses = this.clsx("overflow-hidden", "text-muted text-sm");

		const innerClasses = this.clsx("pb-4 pt-0", this.className);

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
				role: "region",
				"aria-labelledby": headerId,
				class: contentClasses,
				hidden: !isOpen || undefined,
			},
			inner,
		);

		this.appendChild(wrapper);
	}
}

// Register custom elements
defineElement("ui-accordion", Accordion);
defineElement("ui-accordion-panel", AccordionPanel);
defineElement("ui-accordion-header", AccordionHeader);
defineElement("ui-accordion-content", AccordionContent);
