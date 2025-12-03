import { BaseComponent, defineElement } from "../_base.js";

/**
 * Avatar display component
 *
 * @element ui-avatar
 * @attr {string} src - Image source URL
 * @attr {string} initials - Text initials to display when no image
 * @attr {string} alt - Alt text for image
 * @attr {boolean} square - Use square shape instead of circle
 *
 * @example
 * <ui-avatar src="/user.jpg" alt="John Doe"></ui-avatar>
 * <ui-avatar initials="JD" square></ui-avatar>
 */
export class Avatar extends BaseComponent {
	static get observedAttributes() {
		return ["src", "initials", "alt", "square"];
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
	 * Renders the avatar element
	 * @returns {void}
	 */
	render() {
		const imageSource = this.getAttribute("src");
		const initials = this.getAttribute("initials");
		const altText = this.getAttribute("alt") || "";
		const isSquare = this.hasAttribute("square");

		const wrapperClasses = this.combineClassNames(
			"inline-grid shrink-0 align-middle [--avatar-radius:20%]",
			"[&>*]:col-start-1 [&>*]:row-start-1",
			"outline -outline-offset-1 outline-black/10 dark:outline-white/10",
			isSquare
				? "rounded-[var(--avatar-radius)] [&>*]:rounded-[var(--avatar-radius)]"
				: "rounded-full [&>*]:rounded-full",
		);

		const wrapperElement = this.createElement("span", {
			"data-slot": "avatar",
			class: wrapperClasses,
		});

		if (initials) {
			const svgElement = this.createSVGElement(
				"svg",
				{
					class:
						"size-full fill-current p-[5%] text-[48px] font-medium uppercase select-none",
					viewBox: "0 0 100 100",
					"aria-hidden": altText ? undefined : "true",
				},
				altText ? this.createSVGElement("title", {}, altText) : null,
				this.createSVGElement(
					"text",
					{
						x: "50%",
						y: "50%",
						"alignment-baseline": "middle",
						"dominant-baseline": "middle",
						"text-anchor": "middle",
						dy: ".125em",
					},
					initials,
				),
			);
			wrapperElement.appendChild(svgElement);
		}

		if (imageSource) {
			const imageElement = this.createElement("img", {
				class: "size-full",
				src: imageSource,
				alt: altText,
			});
			wrapperElement.appendChild(imageElement);
		}

		this.innerHTML = "";
		this.appendChild(wrapperElement);
	}
}

/**
 * Avatar button component - clickable avatar
 *
 * @element ui-avatar-button
 * @attr {string} src - Image source URL
 * @attr {string} initials - Text initials to display when no image
 * @attr {string} alt - Alt text for image
 * @attr {boolean} square - Use square shape instead of circle
 * @attr {string} href - Link URL (renders as anchor)
 *
 * @example
 * <ui-avatar-button src="/user.jpg" href="/profile"></ui-avatar-button>
 */
export class AvatarButton extends BaseComponent {
	static get observedAttributes() {
		return ["src", "initials", "alt", "square", "href"];
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
	 * Sets up hover and active state event listeners
	 * @returns {void}
	 */
	#initializeEventListeners() {
		this.addEventListener("mouseenter", () => {
			this.innerElement?.setAttribute("data-hover", "");
		});
		this.addEventListener("mouseleave", () => {
			this.innerElement?.removeAttribute("data-hover");
			this.innerElement?.removeAttribute("data-active");
		});
		this.addEventListener("mousedown", () => {
			this.innerElement?.setAttribute("data-active", "");
		});
		this.addEventListener("mouseup", () => {
			this.innerElement?.removeAttribute("data-active");
		});
	}

	/**
	 * Renders the avatar button element
	 * @returns {void}
	 */
	render() {
		const imageSource = this.getAttribute("src");
		const initials = this.getAttribute("initials");
		const altText = this.getAttribute("alt") || "";
		const isSquare = this.hasAttribute("square");
		const href = this.getAttribute("href");

		const buttonClasses = this.combineClassNames(
			isSquare ? "rounded-[20%]" : "rounded-full",
			"relative inline-grid",
		);

		const buttonElement = this.createInteractiveElement(
			href,
			{ class: buttonClasses },
			this.createElement("span", {
				class:
					"absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden",
				"aria-hidden": "true",
			}),
		);

		const avatarElement = document.createElement("ui-avatar");
		if (imageSource) avatarElement.setAttribute("src", imageSource);
		if (initials) avatarElement.setAttribute("initials", initials);
		if (altText) avatarElement.setAttribute("alt", altText);
		if (isSquare) avatarElement.setAttribute("square", "");
		buttonElement.appendChild(avatarElement);

		this.innerHTML = "";
		this.appendChild(buttonElement);
		this.innerElement = buttonElement;
	}
}

defineElement("ui-avatar", UIAvatar);
defineElement("ui-avatar-button", UIAvatarButton);
