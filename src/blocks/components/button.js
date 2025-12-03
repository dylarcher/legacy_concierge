import { BaseComponent, defineElement } from "../_base.js";

/**
 * Button style definitions using Tailwind CSS classes
 */
const BUTTON_STYLES = {
	base: [
		"relative isolate inline-flex items-baseline justify-center gap-x-2 rounded-lg border text-base/6 font-semibold",
		"px-[calc(var(--spacing)*3.5-1px)] py-[calc(var(--spacing)*2.5-1px)] sm:px-[calc(var(--spacing)*3-1px)] sm:py-[calc(var(--spacing)*1.5-1px)] sm:text-sm/6",
		"focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 ring-primary",
		"[&[data-disabled]]:opacity-50",
		"[&_[data-slot=icon]]:-mx-0.5 [&_[data-slot=icon]]:my-0.5 [&_[data-slot=icon]]:size-5 [&_[data-slot=icon]]:shrink-0 [&_[data-slot=icon]]:self-center sm:[&_[data-slot=icon]]:my-1 sm:[&_[data-slot=icon]]:size-4",
	].join(" "),
	solid: [
		"border-transparent bg-[var(--btn-border)]",
		"dark:bg-[var(--btn-bg)]",
		"before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-lg,0.5rem)-1px)] before:bg-[var(--btn-bg)]",
		"before:shadow-sm",
		"dark:before:hidden",
		"dark:border-white/5",
		"after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-lg,0.5rem)-1px)]",
		"after:shadow-[inset_0_1px_theme(colors.white/15%)]",
		"[&[data-active]]:after:bg-[var(--btn-hover-overlay)] [&:hover]:after:bg-[var(--btn-hover-overlay)]",
		"dark:after:-inset-px dark:after:rounded-lg",
		"[&[data-disabled]]:before:shadow-none [&[data-disabled]]:after:shadow-none",
	].join(" "),
	outline: [
		"btn-outline border-strong [&[data-active]]:bg-canvas-hover [&:hover]:bg-canvas-hover",
		"[--btn-icon:var(--color-muted)] [&[data-active]]:[--btn-icon:var(--color-primary)] [&:hover]:[--btn-icon:var(--color-primary)]",
	].join(" "),
	plain: [
		"btn-subtle border-transparent [&[data-active]]:bg-canvas-hover [&:hover]:bg-canvas-hover",
		"[--btn-icon:var(--color-muted)] [&[data-active]]:[--btn-icon:var(--color-primary)] [&:hover]:[--btn-icon:var(--color-primary)]",
	].join(" "),
	colors: {
		"dark/zinc": [
			"text-white [--btn-bg:theme(colors.zinc.900)] [--btn-border:theme(colors.zinc.950/90%)] [--btn-hover-overlay:theme(colors.white/10%)]",
			"dark:text-white dark:[--btn-bg:theme(colors.zinc.600)] dark:[--btn-hover-overlay:theme(colors.white/5%)]",
			"[--btn-icon:theme(colors.zinc.400)] [&[data-active]]:[--btn-icon:theme(colors.zinc.300)] [&:hover]:[--btn-icon:theme(colors.zinc.300)]",
		].join(" "),
		light: [
			"text-zinc-950 [--btn-bg:white] [--btn-border:theme(colors.zinc.950/10%)] [--btn-hover-overlay:theme(colors.zinc.950/2.5%)]",
			"dark:text-white dark:[--btn-hover-overlay:theme(colors.white/5%)] dark:[--btn-bg:theme(colors.zinc.800)]",
			"[--btn-icon:theme(colors.zinc.500)] [&[data-active]]:[--btn-icon:theme(colors.zinc.700)] [&:hover]:[--btn-icon:theme(colors.zinc.700)]",
		].join(" "),
		"dark/white": [
			"text-white [--btn-bg:theme(colors.zinc.900)] [--btn-border:theme(colors.zinc.950/90%)] [--btn-hover-overlay:theme(colors.white/10%)]",
			"dark:text-zinc-950 dark:[--btn-bg:white] dark:[--btn-hover-overlay:theme(colors.zinc.950/5%)]",
		].join(" "),
		dark: [
			"text-white [--btn-bg:theme(colors.zinc.900)] [--btn-border:theme(colors.zinc.950/90%)] [--btn-hover-overlay:theme(colors.white/10%)]",
			"dark:[--btn-hover-overlay:theme(colors.white/5%)] dark:[--btn-bg:theme(colors.zinc.800)]",
			"[--btn-icon:theme(colors.zinc.400)] [&[data-active]]:[--btn-icon:theme(colors.zinc.300)] [&:hover]:[--btn-icon:theme(colors.zinc.300)]",
		].join(" "),
		white: [
			"text-zinc-950 [--btn-bg:white] [--btn-border:theme(colors.zinc.950/10%)] [--btn-hover-overlay:theme(colors.zinc.950/2.5%)]",
			"dark:[--btn-hover-overlay:theme(colors.zinc.950/5%)]",
			"[--btn-icon:theme(colors.zinc.400)] [&[data-active]]:[--btn-icon:theme(colors.zinc.500)] [&:hover]:[--btn-icon:theme(colors.zinc.500)]",
		].join(" "),
		zinc: [
			"text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.zinc.600)] [--btn-border:theme(colors.zinc.700/90%)]",
			"dark:[--btn-hover-overlay:theme(colors.white/5%)]",
			"[--btn-icon:theme(colors.zinc.400)] [&[data-active]]:[--btn-icon:theme(colors.zinc.300)] [&:hover]:[--btn-icon:theme(colors.zinc.300)]",
		].join(" "),
		indigo: [
			"text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.indigo.500)] [--btn-border:theme(colors.indigo.600/90%)]",
			"[--btn-icon:theme(colors.indigo.300)] [&[data-active]]:[--btn-icon:theme(colors.indigo.200)] [&:hover]:[--btn-icon:theme(colors.indigo.200)]",
		].join(" "),
		cyan: [
			"text-cyan-950 [--btn-bg:theme(colors.cyan.300)] [--btn-border:theme(colors.cyan.400/80%)] [--btn-hover-overlay:theme(colors.white/25%)]",
			"[--btn-icon:theme(colors.cyan.500)]",
		].join(" "),
		red: [
			"text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.red.600)] [--btn-border:theme(colors.red.700/90%)]",
			"[--btn-icon:theme(colors.red.300)] [&[data-active]]:[--btn-icon:theme(colors.red.200)] [&:hover]:[--btn-icon:theme(colors.red.200)]",
		].join(" "),
		orange: [
			"text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.orange.500)] [--btn-border:theme(colors.orange.600/90%)]",
			"[--btn-icon:theme(colors.orange.300)] [&[data-active]]:[--btn-icon:theme(colors.orange.200)] [&:hover]:[--btn-icon:theme(colors.orange.200)]",
		].join(" "),
		amber: [
			"text-amber-950 [--btn-hover-overlay:theme(colors.white/25%)] [--btn-bg:theme(colors.amber.400)] [--btn-border:theme(colors.amber.500/80%)]",
			"[--btn-icon:theme(colors.amber.600)]",
		].join(" "),
		yellow: [
			"text-yellow-950 [--btn-hover-overlay:theme(colors.white/25%)] [--btn-bg:theme(colors.yellow.300)] [--btn-border:theme(colors.yellow.400/80%)]",
			"[--btn-icon:theme(colors.yellow.600)]",
		].join(" "),
		lime: [
			"text-lime-950 [--btn-hover-overlay:theme(colors.white/25%)] [--btn-bg:theme(colors.lime.300)] [--btn-border:theme(colors.lime.400/80%)]",
			"[--btn-icon:theme(colors.lime.600)]",
		].join(" "),
		green: [
			"text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.green.600)] [--btn-border:theme(colors.green.700/90%)]",
			"[--btn-icon:theme(colors.white/60%)] [&[data-active]]:[--btn-icon:theme(colors.white/80%)] [&:hover]:[--btn-icon:theme(colors.white/80%)]",
		].join(" "),
		emerald: [
			"text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.emerald.600)] [--btn-border:theme(colors.emerald.700/90%)]",
			"[--btn-icon:theme(colors.white/60%)]",
		].join(" "),
		teal: [
			"text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.teal.600)] [--btn-border:theme(colors.teal.700/90%)]",
			"[--btn-icon:theme(colors.white/60%)]",
		].join(" "),
		sky: [
			"text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.sky.500)] [--btn-border:theme(colors.sky.600/80%)]",
			"[--btn-icon:theme(colors.white/60%)]",
		].join(" "),
		blue: [
			"text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.blue.600)] [--btn-border:theme(colors.blue.700/90%)]",
			"[--btn-icon:theme(colors.blue.400)] [&[data-active]]:[--btn-icon:theme(colors.blue.300)] [&:hover]:[--btn-icon:theme(colors.blue.300)]",
		].join(" "),
		violet: [
			"text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.violet.500)] [--btn-border:theme(colors.violet.600/90%)]",
			"[--btn-icon:theme(colors.violet.300)]",
		].join(" "),
		purple: [
			"text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.purple.500)] [--btn-border:theme(colors.purple.600/90%)]",
			"[--btn-icon:theme(colors.purple.300)]",
		].join(" "),
		fuchsia: [
			"text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.fuchsia.500)] [--btn-border:theme(colors.fuchsia.600/90%)]",
			"[--btn-icon:theme(colors.fuchsia.300)]",
		].join(" "),
		pink: [
			"text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.pink.500)] [--btn-border:theme(colors.pink.600/90%)]",
			"[--btn-icon:theme(colors.pink.300)]",
		].join(" "),
		rose: [
			"text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.rose.500)] [--btn-border:theme(colors.rose.600/90%)]",
			"[--btn-icon:theme(colors.rose.300)]",
		].join(" "),
	},
};

/**
 * UI Button Web Component
 *
 * @element ui-button
 * @attr {string} color - Button color variant (dark/zinc, light, blue, red, etc.)
 * @attr {boolean} outline - Use outline style
 * @attr {boolean} plain - Use plain/text style
 * @attr {string} href - If set, renders as a link
 * @attr {boolean} disabled - Disabled state
 *
 * @example
 * <ui-button color="blue">Click me</ui-button>
 * <ui-button href="/page" outline>Go to page</ui-button>
 */
export class Button extends BaseComponent {
	static get observedAttributes() {
		return ["color", "outline", "plain", "href", "disabled"];
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
	 * Sets up click and hover event listeners for the button
	 * @returns {void}
	 */
	#initializeEventListeners() {
		this.addEventListener("click", (event) => {
			if (this.hasAttribute("disabled")) {
				event.preventDefault();
				event.stopPropagation();
				return;
			}
			this.emit("button-click", { button: this });
		});

		this.addEventListener("mouseenter", () => {
			if (!this.hasAttribute("disabled")) {
				this.innerElement?.setAttribute("data-hover", "");
			}
		});
		this.addEventListener("mouseleave", () => {
			this.innerElement?.removeAttribute("data-hover");
			this.innerElement?.removeAttribute("data-active");
		});
		this.addEventListener("mousedown", () => {
			if (!this.hasAttribute("disabled")) {
				this.innerElement?.setAttribute("data-active", "");
			}
		});
		this.addEventListener("mouseup", () => {
			this.innerElement?.removeAttribute("data-active");
		});
	}

	/**
	 * Renders the button element
	 * @returns {void}
	 */
	render() {
		const colorVariant = this.getAttribute("color") || "dark/zinc";
		const isOutline = this.hasAttribute("outline");
		const isPlain = this.hasAttribute("plain");
		const href = this.getAttribute("href");
		const isDisabled = this.hasAttribute("disabled");

		const buttonClasses = this.combineClassNames(
			BUTTON_STYLES.base,
			isOutline
				? BUTTON_STYLES.outline
				: isPlain
					? BUTTON_STYLES.plain
					: [BUTTON_STYLES.solid, BUTTON_STYLES.colors[colorVariant]],
			!href && "cursor-default",
		);

		const tagName = href ? "a" : "button";
		const buttonElement = this.createElement(
			tagName,
			{
				class: buttonClasses,
				href: href || undefined,
				type: href ? undefined : "button",
				disabled: isDisabled && !href ? true : undefined,
				"aria-disabled": isDisabled ? "true" : undefined,
				"data-disabled": isDisabled ? "" : undefined,
			},
			this.createElement("span", {
				class:
					"absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden",
				"aria-hidden": "true",
			}),
			this.createElement("slot"),
		);

		this.innerHTML = "";
		this.appendChild(buttonElement);
		this.innerElement = buttonElement;

		const slotElement = this.querySelector("slot");
		slotElement?.addEventListener("slotchange", () => {
			const assignedNodes = slotElement.assignedNodes();
			assignedNodes.forEach((node) => {
				if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "svg") {
					node.setAttribute("data-slot", "icon");
				}
			});
		});
	}
}

/**
 * Touch target helper for accessibility - expands hit area on touch devices
 * @element ui-touch-target
 */
export class TouchTarget extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.innerHTML = `
      <span class="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden" aria-hidden="true"></span>
      <slot></slot>
    `;
	}
}

defineElement("ui-button", UIButton);
defineElement("ui-touch-target", UITouchTarget);
