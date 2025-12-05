import { BaseComponent, defineElement } from "../_base.js";

/**
 * Text paragraph component
 *
 * @element ui-text
 *
 * @example
 * <ui-text>This is a paragraph of text.</ui-text>
 */
export class Text extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the text paragraph element
	 * @returns {void}
	 */
	render() {
		const paragraphClasses = this.combineClassNames(
			"text-base/6 text-muted sm:text-sm/6",
			this.className,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const paragraphElement = this.createElement("p", {
			"data-slot": "text",
			class: paragraphClasses,
		});
		for (const childNode of childNodes) {
			paragraphElement.appendChild(childNode);
		}
		this.appendChild(paragraphElement);
	}
}

/**
 * Text link component
 *
 * @element ui-text-link
 * @attr {string} href - Link URL
 *
 * @example
 * <ui-text-link href="/page">Click here</ui-text-link>
 */
export class TextLink extends BaseComponent {
	static get observedAttributes() {
		return ["href"];
	}

	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
		this.#initializeEventListeners();
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
	 * Sets up hover state event listeners
	 * @returns {void}
	 */
	#initializeEventListeners() {
		this.addEventListener("mouseenter", () => {
			this.innerElement?.setAttribute("data-hover", "");
		});
		this.addEventListener("mouseleave", () => {
			this.innerElement?.removeAttribute("data-hover");
		});
	}

	/**
	 * Renders the link element
	 * @returns {void}
	 */
	render() {
		const href = this.getAttribute("href") || "#";

		const linkClasses = this.combineClassNames(
			"text-canvas underline decoration-zinc-950/50",
			"[&[data-hover]]:decoration-zinc-950",
			this.className,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const linkElement = this.createElement("a", { href, class: linkClasses });
		for (const childNode of childNodes) {
			linkElement.appendChild(childNode);
		}
		this.appendChild(linkElement);
		this.innerElement = linkElement;
	}
}

/**
 * Strong/bold text component
 *
 * @element ui-strong
 *
 * @example
 * <ui-text>This is <ui-strong>important</ui-strong> text.</ui-text>
 */
export class Strong extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the strong element
	 * @returns {void}
	 */
	render() {
		const strongClasses = this.combineClassNames(
			"font-medium text-canvas",
			this.className,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const strongElement = this.createElement("strong", {
			class: strongClasses,
		});
		for (const childNode of childNodes) {
			strongElement.appendChild(childNode);
		}
		this.appendChild(strongElement);
	}
}

/**
 * Inline code component
 *
 * @element ui-code
 *
 * @example
 * <ui-text>Run <ui-code>npm install</ui-code> to install.</ui-text>
 */
export class Code extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the code element
	 * @returns {void}
	 */
	render() {
		const codeClasses = this.combineClassNames(
			"rounded-sm border bg-zinc-950/[2.5%] px-0.5 text-sm font-medium text-canvas",
			"sm:text-[0.8125rem]",
			this.className,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const codeElement = this.createElement("code", { class: codeClasses });
		for (const childNode of childNodes) {
			codeElement.appendChild(childNode);
		}
		this.appendChild(codeElement);
	}
}

defineElement("ui-text", Text);
defineElement("ui-text-link", TextLink);
defineElement("ui-strong", Strong);
defineElement("ui-code", Code);
