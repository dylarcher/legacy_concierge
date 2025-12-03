import { BaseComponent, defineElement } from "../_base.js";

/**
 * Pagination navigation container
 *
 * @element ui-pagination
 * @attr {string} aria-label - Accessible label for navigation
 *
 * @example
 * <ui-pagination>
 *   <ui-pagination-previous href="/page/1"></ui-pagination-previous>
 *   <ui-pagination-list>
 *     <ui-pagination-page href="/page/1">1</ui-pagination-page>
 *     <ui-pagination-page href="/page/2" current>2</ui-pagination-page>
 *   </ui-pagination-list>
 *   <ui-pagination-next href="/page/3"></ui-pagination-next>
 * </ui-pagination>
 */
export class Pagination extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the pagination container
	 * @returns {void}
	 */
	render() {
		const ariaLabel = this.getAttribute("aria-label") || "Page navigation";
		const containerClasses = this.combineClassNames(
			"flex gap-x-2",
			this.className,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const navElement = this.createElement(
			"nav",
			{ "aria-label": ariaLabel, class: containerClasses },
			...childNodes,
		);
		this.appendChild(navElement);
	}
}

/**
 * Previous page button
 *
 * @element ui-pagination-previous
 * @attr {string} href - Link URL (disabled if not set)
 */
export class PaginationPrevious extends BaseComponent {
	static get observedAttributes() {
		return ["href"];
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
	 * Renders the previous page button
	 * @returns {void}
	 */
	render() {
		const href = this.getAttribute("href");
		const isDisabled = !href;
		const buttonText = this.textContent?.trim() || "Previous";

		this.innerHTML = "";

		const wrapperElement = this.createElement("span", {
			class: "grow basis-0",
		});
		const buttonElement = document.createElement("ui-button");
		buttonElement.setAttribute("plain", "");
		buttonElement.setAttribute("aria-label", "Previous page");
		if (isDisabled) {
			buttonElement.setAttribute("disabled", "");
		} else {
			buttonElement.setAttribute("href", href);
		}

		const arrowIcon = this.createSVGElement(
			"svg",
			{
				class: "stroke-current",
				"data-slot": "icon",
				viewBox: "0 0 16 16",
				fill: "none",
				"aria-hidden": "true",
			},
			this.createSVGElement("path", {
				d: "M2.75 8H13.25M2.75 8L5.25 5.5M2.75 8L5.25 10.5",
				"stroke-width": "1.5",
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
			}),
		);

		buttonElement.appendChild(arrowIcon);
		buttonElement.appendChild(document.createTextNode(buttonText));
		wrapperElement.appendChild(buttonElement);
		this.appendChild(wrapperElement);
	}
}

/**
 * Next page button
 *
 * @element ui-pagination-next
 * @attr {string} href - Link URL (disabled if not set)
 */
export class PaginationNext extends BaseComponent {
	static get observedAttributes() {
		return ["href"];
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
	 * Renders the next page button
	 * @returns {void}
	 */
	render() {
		const href = this.getAttribute("href");
		const isDisabled = !href;
		const buttonText = this.textContent?.trim() || "Next";

		this.innerHTML = "";

		const wrapperElement = this.createElement("span", {
			class: "flex grow basis-0 justify-end",
		});
		const buttonElement = document.createElement("ui-button");
		buttonElement.setAttribute("plain", "");
		buttonElement.setAttribute("aria-label", "Next page");
		if (isDisabled) {
			buttonElement.setAttribute("disabled", "");
		} else {
			buttonElement.setAttribute("href", href);
		}

		buttonElement.appendChild(document.createTextNode(buttonText));

		const arrowIcon = this.createSVGElement(
			"svg",
			{
				class: "stroke-current",
				"data-slot": "icon",
				viewBox: "0 0 16 16",
				fill: "none",
				"aria-hidden": "true",
			},
			this.createSVGElement("path", {
				d: "M13.25 8L2.75 8M13.25 8L10.75 10.5M13.25 8L10.75 5.5",
				"stroke-width": "1.5",
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
			}),
		);

		buttonElement.appendChild(arrowIcon);
		wrapperElement.appendChild(buttonElement);
		this.appendChild(wrapperElement);
	}
}

/**
 * Pagination list container for page numbers
 *
 * @element ui-pagination-list
 */
export class PaginationList extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the pagination list container
	 * @returns {void}
	 */
	render() {
		const listClasses = this.combineClassNames(
			"hidden items-baseline gap-x-2 sm:flex",
			this.className,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const containerElement = this.createElement(
			"span",
			{ class: listClasses },
			...childNodes,
		);
		this.appendChild(containerElement);
	}
}

/**
 * Individual page number button
 *
 * @element ui-pagination-page
 * @attr {string} href - Link URL
 * @attr {boolean} current - Whether this is the current page
 */
export class PaginationPage extends BaseComponent {
	static get observedAttributes() {
		return ["href", "current"];
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
	 * Renders the page number button
	 * @returns {void}
	 */
	render() {
		const href = this.getAttribute("href") || "#";
		const isCurrent = this.hasAttribute("current");
		const pageNumber = this.textContent?.trim() || "1";

		this.innerHTML = "";

		const buttonElement = document.createElement("ui-button");
		buttonElement.setAttribute("href", href);
		buttonElement.setAttribute("plain", "");
		buttonElement.setAttribute("aria-label", `Page ${pageNumber}`);
		if (isCurrent) {
			buttonElement.setAttribute("aria-current", "page");
		}
		buttonElement.className = this.combineClassNames(
			"min-w-9 before:absolute before:-inset-px before:rounded-lg",
			isCurrent && "before:bg-zinc-950/5",
		);

		const pageNumberElement = this.createElement(
			"span",
			{ class: "-mx-0.5" },
			pageNumber,
		);
		buttonElement.appendChild(pageNumberElement);
		this.appendChild(buttonElement);
	}
}

/**
 * Pagination gap indicator (ellipsis)
 *
 * @element ui-pagination-gap
 */
export class PaginationGap extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the pagination gap element
	 * @returns {void}
	 */
	render() {
		const gapClasses = this.combineClassNames(
			"w-9 text-center text-sm/6 font-semibold select-none text-zinc-950",
			this.className,
		);

		this.innerHTML = "";

		const gapElement = this.createElement(
			"span",
			{ "aria-hidden": "true", class: gapClasses },
			"\u2026",
		);
		this.appendChild(gapElement);
	}
}

defineElement("ui-pagination", Pagination);
defineElement("ui-pagination-previous", PaginationPrevious);
defineElement("ui-pagination-next", PaginationNext);
defineElement("ui-pagination-list", PaginationList);
defineElement("ui-pagination-page", PaginationPage);
defineElement("ui-pagination-gap", PaginationGap);
