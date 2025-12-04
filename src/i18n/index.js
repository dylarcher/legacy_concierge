/**
 * Internationalization service for managing translations
 * Loads JSON locale files based on the <html lang="..."> attribute
 * @module i18n
 */

/**
 * @typedef {Object} I18nOptions
 * @property {string} [defaultLocale="en"] - Fallback locale if detection fails
 */

class I18nService {
	static #instance = null;

	/** @type {string} */
	#locale = "en";

	/** @type {string} */
	#defaultLocale = "en";

	/** @type {Map<string, Object>} */
	#cache = new Map();

	/** @type {boolean} */
	#ready = false;

	/** @type {Promise<void>|null} */
	#readyPromise = null;

	/** @type {Set<Function>} */
	#listeners = new Set();

	/**
	 * Get the singleton instance of I18nService
	 * @returns {I18nService}
	 */
	static getInstance() {
		if (!I18nService.#instance) {
			I18nService.#instance = new I18nService();
		}
		return I18nService.#instance;
	}

	/**
	 * Initialize the i18n service
	 * Reads locale from <html lang="..."> and loads common + page-specific translations
	 * @param {I18nOptions} [options={}] - Configuration options
	 * @returns {Promise<void>}
	 */
	async initialize(options = {}) {
		if (this.#readyPromise) return this.#readyPromise;

		this.#defaultLocale = options.defaultLocale || "en";
		this.#locale = this.#detectLocale();

		// Update the HTML lang attribute to match detected locale
		document.documentElement.lang = this.#locale;

		const pageName = this.#getPageName();

		this.#readyPromise = Promise.all([
			this.loadNamespace("common"),
			this.loadNamespace(`pages/${pageName}`),
		]).then(() => {
			this.#ready = true;
		});

		return this.#readyPromise;
	}

	/**
	 * Get the current locale
	 * @returns {string}
	 */
	get locale() {
		return this.#locale;
	}

	/**
	 * Check if the service is ready
	 * @returns {boolean}
	 */
	get ready() {
		return this.#ready;
	}

	/**
	 * Wait for the i18n service to be ready
	 * @returns {Promise<void>}
	 */
	async whenReady() {
		return this.#readyPromise || Promise.resolve();
	}

	/**
	 * Change the current locale
	 * Updates <html lang>, clears cache, and notifies listeners
	 * @param {string} locale - New locale code (e.g., "es")
	 * @returns {Promise<void>}
	 */
	async setLocale(locale) {
		if (locale === this.#locale) return;

		this.#locale = locale;
		this.#ready = false;
		this.#cache.clear();

		document.documentElement.lang = locale;

		const pageName = this.#getPageName();

		await Promise.all([
			this.loadNamespace("common"),
			this.loadNamespace(`pages/${pageName}`),
		]);

		this.#ready = true;
		this.#notifyListeners();

		// Dispatch custom event for components to re-render
		document.dispatchEvent(
			new CustomEvent("languagechange", {
				detail: { locale },
			}),
		);
	}

	/**
	 * Load a translation namespace (JSON file)
	 * @param {string} namespace - Namespace path (e.g., "common", "pages/home")
	 * @returns {Promise<Object>}
	 */
	async loadNamespace(namespace) {
		const cacheKey = `${this.#locale}:${namespace}`;

		if (this.#cache.has(cacheKey)) {
			return this.#cache.get(cacheKey);
		}

		try {
			const basePath = import.meta.env.BASE_URL || "/";
			const url = `${basePath}i18n/locales/${this.#locale}/${namespace}.json`;
			const response = await fetch(url);

			if (!response.ok) {
				// Try fallback locale if not default
				if (this.#locale !== this.#defaultLocale) {
					const fallbackUrl = `${basePath}i18n/locales/${this.#defaultLocale}/${namespace}.json`;
					const fallbackResponse = await fetch(fallbackUrl);

					if (fallbackResponse.ok) {
						const data = await fallbackResponse.json();
						this.#cache.set(cacheKey, data);
						return data;
					}
				}
				console.warn(
					`i18n: Failed to load namespace "${namespace}" for locale "${this.#locale}"`,
				);
				return {};
			}

			const data = await response.json();
			this.#cache.set(cacheKey, data);
			return data;
		} catch (error) {
			console.error(`i18n: Error loading namespace "${namespace}"`, error);
			return {};
		}
	}

	/**
	 * Translate a key path to its localized string
	 * @param {string} key - Dot-notation key (e.g., "pages.home.hero.heading")
	 * @param {Object} [params={}] - Interpolation parameters (e.g., { name: "John" })
	 * @returns {string} Translated string or the key if not found
	 *
	 * @example
	 * i18n.t("common.buttons.submit") // "Submit"
	 * i18n.t("common.greeting", { name: "John" }) // "Hello, John!"
	 */
	t(key, params = {}) {
		const value = this.#resolveKey(key);

		if (!value) {
			console.warn(`i18n: Missing translation key "${key}"`);
			return key;
		}

		return this.#interpolate(value, params);
	}

	/**
	 * Subscribe to locale changes
	 * @param {Function} callback - Called with new locale when language changes
	 * @returns {Function} Unsubscribe function
	 */
	subscribe(callback) {
		this.#listeners.add(callback);
		return () => this.#listeners.delete(callback);
	}

	/**
	 * Detect locale from <html lang>, query param, or browser
	 * Priority: ?lang param > <html lang> > navigator.language > default
	 * @returns {string}
	 */
	#detectLocale() {
		// Check query parameter first (?lang=es)
		const urlParams = new URLSearchParams(window.location.search);
		const queryLang = urlParams.get("lang");
		if (queryLang && this.#isValidLocale(queryLang)) {
			return queryLang;
		}

		// Check <html lang="...">
		const htmlLang = document.documentElement.lang;
		if (htmlLang && this.#isValidLocale(htmlLang)) {
			return htmlLang;
		}

		// Check browser language
		const browserLang = navigator.language.split("-")[0];
		if (this.#isValidLocale(browserLang)) {
			return browserLang;
		}

		return this.#defaultLocale;
	}

	/**
	 * Check if a locale is supported
	 * @param {string} locale - Locale to check
	 * @returns {boolean}
	 */
	#isValidLocale(locale) {
		// Supported locales - extend this list as needed
		const supportedLocales = ["en", "es"];
		return supportedLocales.includes(locale);
	}

	/**
	 * Get the current page name for loading page-specific translations
	 * @returns {string}
	 */
	#getPageName() {
		const path = window.location.pathname;

		// Handle root/index
		if (path === "/" || path.endsWith("/index.html") || path.endsWith("/")) {
			return "home";
		}

		// Extract page name from path
		// /pages/about.html -> about
		// /pages/about -> about
		// /legacy_concierge/v1.0.0/pages/about.html -> about
		const match = path.match(/\/pages\/([^/.]+)/);
		if (match) {
			return match[1];
		}

		// Fallback for non-standard paths
		const segments = path.split("/").filter(Boolean);
		const lastSegment = segments[segments.length - 1] || "home";
		return lastSegment.replace(/\.html$/, "");
	}

	/**
	 * Resolve a dot-notation key to its value from the cache
	 * @param {string} key - Full key path (e.g., "pages.home.hero.heading")
	 * @returns {string|null}
	 */
	#resolveKey(key) {
		const parts = key.split(".");

		// Determine namespace and key path
		// "pages.home.hero.heading" -> namespace: "pages/home", keyPath: ["hero", "heading"]
		// "common.buttons.submit" -> namespace: "common", keyPath: ["buttons", "submit"]
		let namespace;
		let keyPath;

		if (parts[0] === "pages" && parts.length > 2) {
			namespace = `pages/${parts[1]}`;
			keyPath = parts.slice(2);
		} else {
			namespace = parts[0];
			keyPath = parts.slice(1);
		}

		const cacheKey = `${this.#locale}:${namespace}`;
		const data = this.#cache.get(cacheKey);

		if (!data) {
			return null;
		}

		// Traverse the object using the key path
		return keyPath.reduce((obj, part) => obj?.[part], data);
	}

	/**
	 * Interpolate variables in a string template
	 * @param {string} template - String with {{variable}} placeholders
	 * @param {Object} params - Key-value pairs for substitution
	 * @returns {string}
	 *
	 * @example
	 * #interpolate("Hello, {{name}}!", { name: "John" }) // "Hello, John!"
	 */
	#interpolate(template, params) {
		if (!params || Object.keys(params).length === 0) {
			return template;
		}

		return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
			return params[key] !== undefined ? params[key] : match;
		});
	}

	/**
	 * Notify all subscribed listeners of locale change
	 */
	#notifyListeners() {
		for (const callback of this.#listeners) {
			try {
				callback(this.#locale);
			} catch (error) {
				console.error("i18n: Listener error", error);
			}
		}
	}
}

// Export singleton instance
export const i18n = I18nService.getInstance();

// Export convenience function
export const t = (key, params) => i18n.t(key, params);
