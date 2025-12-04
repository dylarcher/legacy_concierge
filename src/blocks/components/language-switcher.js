import { i18n } from "../../i18n/index.js";
import { BaseComponent, defineElement } from "../_base.js";

/**
 * Language switcher dropdown component
 * Changes the page language by updating the URL with ?lang parameter
 *
 * @element ui-language-switcher
 * @attr {string} [variant="dropdown"] - Display style: "dropdown" or "links"
 *
 * @example
 * <ui-language-switcher></ui-language-switcher>
 *
 * @example
 * <ui-language-switcher variant="links"></ui-language-switcher>
 */
export class LanguageSwitcher extends BaseComponent {
	static get observedAttributes() {
		return ["variant"];
	}

	/** @type {Object<string, {name: string, nativeName: string}>} */
	#locales = {
		en: { name: "English", nativeName: "English" },
		es: { name: "Spanish", nativeName: "Español" },
	};

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback(_name, oldValue, newValue) {
		if (oldValue !== newValue && this.isConnected) {
			this.render();
		}
	}

	/**
	 * Get the URL for switching to a specific language
	 * @param {string} locale - Target locale code
	 * @returns {string} URL with lang parameter
	 */
	#getLanguageUrl(locale) {
		const url = new URL(window.location.href);
		url.searchParams.set("lang", locale);
		return url.toString();
	}

	/**
	 * Handle language selection
	 * @param {string} locale - Selected locale code
	 */
	#handleLanguageChange(locale) {
		if (locale === i18n.locale) return;

		// Navigate to the same page with the lang parameter
		// This triggers a page reload which will initialize i18n with the new locale
		window.location.href = this.#getLanguageUrl(locale);
	}

	render() {
		const variant = this.getAttribute("variant") || "dropdown";
		const currentLocale = i18n.locale;

		if (variant === "links") {
			this.#renderLinks(currentLocale);
		} else {
			this.#renderDropdown(currentLocale);
		}
	}

	/**
	 * Render as inline links (e.g., "EN | ES")
	 * @param {string} currentLocale - Current locale code
	 */
	#renderLinks(currentLocale) {
		const links = Object.entries(this.#locales)
			.flatMap(([code, locale], index) => {
				const isActive = code === currentLocale;
				const separator =
					index > 0
						? this.h("span", { class: "text-gray-400 mx-2" }, "|")
						: null;

				const link = this.h(
					"a",
					{
						href: this.#getLanguageUrl(code),
						class: this.clsx(
							"text-sm font-medium uppercase transition-colors",
							isActive
								? "text-primary font-bold pointer-events-none"
								: "text-gray-600 hover:text-primary dark:text-gray-300",
						),
						"aria-current": isActive ? "true" : null,
						"aria-label": `Switch to ${locale.name}`,
					},
					code,
				);

				return separator ? [separator, link] : [link];
			})
			.filter(Boolean);

		const container = this.h(
			"nav",
			{
				class: "flex items-center",
				"aria-label": "Language selection",
			},
			...links,
		);

		this.innerHTML = "";
		this.appendChild(container);
	}

	/**
	 * Render as dropdown select
	 * @param {string} currentLocale - Current locale code
	 */
	#renderDropdown(currentLocale) {
		const options = Object.entries(this.#locales).map(([code, locale]) =>
			this.h(
				"option",
				{
					value: code,
					selected: code === currentLocale ? "" : null,
				},
				locale.nativeName,
			),
		);

		const select = this.h(
			"select",
			{
				class: this.clsx(
					"appearance-none bg-transparent",
					"border border-gray-300 dark:border-gray-600",
					"rounded-md px-3 py-1.5 pr-8",
					"text-sm font-medium",
					"text-gray-700 dark:text-gray-200",
					"cursor-pointer",
					"focus:outline-none focus:ring-2 focus:ring-primary/50",
					"transition-colors",
				),
				"aria-label": "Select language",
				onchange: (event) => {
					this.#handleLanguageChange(event.target.value);
				},
			},
			...options,
		);

		// Wrapper with dropdown arrow
		const wrapper = this.h(
			"div",
			{ class: "relative inline-block" },
			select,
			// Dropdown arrow icon
			this.svg(
				"svg",
				{
					class:
						"absolute right-2 top-1/2 -translate-y-1/2 size-4 text-gray-500 pointer-events-none",
					fill: "none",
					viewBox: "0 0 24 24",
					"stroke-width": "2",
					stroke: "currentColor",
				},
				this.svg("path", {
					"stroke-linecap": "round",
					"stroke-linejoin": "round",
					d: "M19 9l-7 7-7-7",
				}),
			),
		);

		this.innerHTML = "";
		this.appendChild(wrapper);
	}
}

defineElement("ui-language-switcher", LanguageSwitcher);
export default LanguageSwitcher;
