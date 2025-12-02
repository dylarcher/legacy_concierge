import { BaseComponent, defineElement } from "../_base.js";

/**
 * Card container component
 *
 * @element ui-card
 * @attr {boolean} hover - Enable hover effect
 *
 * @example
 * <ui-card>
 *   <ui-card-header>
 *     <ui-card-title>Card Title</ui-card-title>
 *     <ui-card-description>Card description</ui-card-description>
 *   </ui-card-header>
 *   <ui-card-body>Content goes here</ui-card-body>
 *   <ui-card-footer>Footer content</ui-card-footer>
 * </ui-card>
 */
export class Card extends BaseComponent {
	static get observedAttributes() {
		return ["hover"];
	}

	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Called when observed attributes change
	 * @returns {void}
	 */
	attributeChangedCallback() {
		if (this.isConnected) {
			this.render();
		}
	}

	/**
	 * Renders the card container
	 * @returns {void}
	 */
	render() {
		const hasHoverEffect = this.hasAttribute("hover");

		const cardClasses = this.combineClassNames(
			"rounded-xl bg-white p-6 shadow-lg",
			"ring-1 ring-zinc-950/5",
			"dark:bg-zinc-900 dark:ring-white/10",
			hasHoverEffect && "transition-shadow hover:shadow-xl",
			this.className,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const containerElement = this.createElement(
			"div",
			{ class: cardClasses },
			...childNodes,
		);
		this.appendChild(containerElement);
	}
}

/**
 * Card header section
 *
 * @element ui-card-header
 */
export class CardHeader extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the card header section
	 * @returns {void}
	 */
	render() {
		const headerClasses = this.combineClassNames("mb-4", this.className);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const containerElement = this.createElement(
			"div",
			{ class: headerClasses },
			...childNodes,
		);
		this.appendChild(containerElement);
	}
}

/**
 * Card title
 *
 * @element ui-card-title
 */
export class CardTitle extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the card title element
	 * @returns {void}
	 */
	render() {
		const titleClasses = this.combineClassNames(
			"text-lg/6 font-semibold text-zinc-950 dark:text-white",
			this.className,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const titleElement = this.createElement(
			"h3",
			{ class: titleClasses },
			...childNodes,
		);
		this.appendChild(titleElement);
	}
}

/**
 * Card description
 *
 * @element ui-card-description
 */
export class CardDescription extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the card description element
	 * @returns {void}
	 */
	render() {
		const descriptionClasses = this.combineClassNames(
			"mt-1 text-sm/6 text-zinc-500 dark:text-zinc-400",
			this.className,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const descriptionElement = this.createElement(
			"p",
			{ class: descriptionClasses },
			...childNodes,
		);
		this.appendChild(descriptionElement);
	}
}

/**
 * Card body section
 *
 * @element ui-card-body
 */
export class CardBody extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the card body section
	 * @returns {void}
	 */
	render() {
		const bodyClasses = this.combineClassNames(
			"text-base/6 text-zinc-700 dark:text-zinc-300",
			this.className,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const containerElement = this.createElement(
			"div",
			{ class: bodyClasses },
			...childNodes,
		);
		this.appendChild(containerElement);
	}
}

/**
 * Card footer section
 *
 * @element ui-card-footer
 */
export class CardFooter extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the card footer section
	 * @returns {void}
	 */
	render() {
		const footerClasses = this.combineClassNames(
			"mt-6 flex items-center justify-end gap-3",
			"border-t border-zinc-950/5 pt-4 dark:border-white/10",
			this.className,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const containerElement = this.createElement(
			"div",
			{ class: footerClasses },
			...childNodes,
		);
		this.appendChild(containerElement);
	}
}

defineElement("ui-card", UICard);
defineElement("ui-card-header", UICardHeader);
defineElement("ui-card-title", UICardTitle);
defineElement("ui-card-description", UICardDescription);
defineElement("ui-card-body", UICardBody);
defineElement("ui-card-footer", UICardFooter);
