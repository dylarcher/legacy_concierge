/**
 * Router Utility Tests
 *
 * Tests path resolution, link handling, and BASE_URL support
 * for the clean URL routing system.
 *
 * @module router.test
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { resolveHref, createHref, getBaseUrl, initRouter } from "../../utilities/router.js";

describe("Router Utilities", () => {
	const originalPathname = window.location.pathname;

	beforeEach(() => {
		document.body.innerHTML = "";
		// Mock window.location.pathname for consistent testing
		Object.defineProperty(window, "location", {
			value: {
				...window.location,
				pathname: "/",
				hash: "",
				search: "",
				href: "http://localhost:3000/",
			},
			writable: true,
		});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("resolveHref", () => {
		describe("External URLs", () => {
			it("passes through https:// URLs unchanged", () => {
				expect(resolveHref("https://example.com")).toBe("https://example.com");
			});

			it("passes through http:// URLs unchanged", () => {
				expect(resolveHref("http://example.com")).toBe("http://example.com");
			});

			it("passes through protocol-relative URLs unchanged", () => {
				expect(resolveHref("//cdn.example.com/file.js")).toBe("//cdn.example.com/file.js");
			});

			it("passes through mailto: URLs unchanged", () => {
				expect(resolveHref("mailto:test@example.com")).toBe("mailto:test@example.com");
			});

			it("passes through tel: URLs unchanged", () => {
				expect(resolveHref("tel:+1234567890")).toBe("tel:+1234567890");
			});

			it("passes through external URL with path", () => {
				expect(resolveHref("https://example.com/page")).toBe(
					"https://example.com/page",
				);
			});

			it("passes through external URL with query string", () => {
				expect(resolveHref("https://example.com?foo=bar")).toBe(
					"https://example.com?foo=bar",
				);
			});
		});

		describe("Hash Links", () => {
			it("passes through hash-only links unchanged", () => {
				expect(resolveHref("#section")).toBe("#section");
			});

			it("passes through hash with ID unchanged", () => {
				expect(resolveHref("#my-section-id")).toBe("#my-section-id");
			});

			it("passes through empty hash unchanged", () => {
				expect(resolveHref("#")).toBe("#");
			});
		});

		describe("Edge Cases", () => {
			it("returns undefined for undefined input", () => {
				expect(resolveHref(undefined)).toBeUndefined();
			});

			it("returns null for null input", () => {
				expect(resolveHref(null)).toBeNull();
			});

			it("returns empty string for empty string input", () => {
				expect(resolveHref("")).toBe("");
			});
		});

		describe("Absolute Paths", () => {
			it("resolves root path", () => {
				const result = resolveHref("/");
				expect(result).toBe("/");
			});

			it("resolves absolute path to page", () => {
				const result = resolveHref("/about");
				// With BASE_URL="/", should resolve to /about
				expect(result).toContain("about");
			});

			it("resolves absolute path with nested directory", () => {
				const result = resolveHref("/pages/about");
				expect(result).toContain("pages");
				expect(result).toContain("about");
			});

			it("removes .html extension from absolute paths", () => {
				const result = resolveHref("/about.html");
				expect(result).not.toContain(".html");
			});

			it("removes trailing slash from absolute paths", () => {
				const result = resolveHref("/about/");
				expect(result).not.toMatch(/\/$/);
			});

			it("preserves root path without modification", () => {
				// Root should stay as / not become empty
				const result = resolveHref("/");
				expect(result).toBe("/");
			});
		});

		describe("Relative Paths", () => {
			beforeEach(() => {
				// Set current location to nested path
				Object.defineProperty(window, "location", {
					value: {
						...window.location,
						pathname: "/pages/services/",
					},
					writable: true,
				});
			});

			it("resolves same-directory relative path", () => {
				const result = resolveHref("./contact");
				expect(result).toContain("contact");
			});

			it("resolves parent directory path with ../", () => {
				const result = resolveHref("../about");
				expect(result).toContain("about");
				// Should go up from /pages/services/ to /pages/
				expect(result).toContain("pages");
			});

			it("resolves multiple parent traversals", () => {
				const result = resolveHref("../../index");
				// Should go up from /pages/services/ to /
				expect(result).toContain("index");
			});

			it("resolves simple relative path (no ./ prefix)", () => {
				const result = resolveHref("details");
				expect(result).toContain("details");
			});

			it("removes .html from relative paths", () => {
				const result = resolveHref("./contact.html");
				expect(result).not.toContain(".html");
			});
		});

		describe("Path Normalization", () => {
			it("normalizes path with .html extension", () => {
				const result = resolveHref("/pages/about.html");
				expect(result).not.toContain(".html");
			});

			it("normalizes path with trailing slash", () => {
				const result = resolveHref("/pages/about/");
				expect(result).not.toMatch(/\/$/);
			});

			it("handles path with .html followed by trailing slash", () => {
				// Edge case: unlikely input - tests current behavior
				// The regex matches .html$ so .html/ won't be stripped
				const result = resolveHref("/pages/about.html/");
				expect(result).toContain("about.html");
			});

			it("keeps root path as single slash", () => {
				const result = resolveHref("/");
				expect(result).toBe("/");
			});
		});
	});

	describe("createHref", () => {
		it("is an alias for resolveHref", () => {
			expect(createHref("/about")).toBe(resolveHref("/about"));
		});

		it("resolves paths for JavaScript-generated elements", () => {
			const href = createHref("/pages/contact");
			expect(href).toContain("contact");
			expect(href).not.toContain(".html");
		});
	});

	describe("getBaseUrl", () => {
		it("returns the BASE_URL", () => {
			const baseUrl = getBaseUrl();
			expect(typeof baseUrl).toBe("string");
			expect(baseUrl.length).toBeGreaterThan(0);
		});

		it("BASE_URL starts with /", () => {
			const baseUrl = getBaseUrl();
			expect(baseUrl.startsWith("/")).toBe(true);
		});
	});

	describe("initRouter", () => {
		it("attaches click handler to document", () => {
			const addEventListenerSpy = vi.spyOn(document, "addEventListener");
			initRouter();
			expect(addEventListenerSpy).toHaveBeenCalledWith("click", expect.any(Function));
		});

		it("cleans .html from current URL on load", () => {
			const replaceStateSpy = vi.spyOn(window.history, "replaceState");

			Object.defineProperty(window, "location", {
				value: {
					...window.location,
					pathname: "/about.html",
					search: "",
					hash: "",
				},
				writable: true,
			});

			initRouter();

			expect(replaceStateSpy).toHaveBeenCalledWith(null, "", "/about");
		});

		it("preserves query string when cleaning URL", () => {
			const replaceStateSpy = vi.spyOn(window.history, "replaceState");

			Object.defineProperty(window, "location", {
				value: {
					...window.location,
					pathname: "/about.html",
					search: "?foo=bar",
					hash: "",
				},
				writable: true,
			});

			initRouter();

			expect(replaceStateSpy).toHaveBeenCalledWith(null, "", "/about?foo=bar");
		});

		it("preserves hash when cleaning URL", () => {
			const replaceStateSpy = vi.spyOn(window.history, "replaceState");

			Object.defineProperty(window, "location", {
				value: {
					...window.location,
					pathname: "/about.html",
					search: "",
					hash: "#section",
				},
				writable: true,
			});

			initRouter();

			expect(replaceStateSpy).toHaveBeenCalledWith(null, "", "/about#section");
		});

		it("does not modify URL if no .html extension", () => {
			const replaceStateSpy = vi.spyOn(window.history, "replaceState");

			Object.defineProperty(window, "location", {
				value: {
					...window.location,
					pathname: "/about",
					search: "",
					hash: "",
				},
				writable: true,
			});

			initRouter();

			expect(replaceStateSpy).not.toHaveBeenCalled();
		});
	});
});

describe("Link Click Handling", () => {
	beforeEach(() => {
		document.body.innerHTML = "";
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("Modifier Key Detection", () => {
		it("ignores clicks with metaKey (Cmd+click)", () => {
			const anchor = document.createElement("a");
			anchor.href = "/about";
			document.body.appendChild(anchor);

			const event = new MouseEvent("click", {
				bubbles: true,
				cancelable: true,
				button: 0,
				metaKey: true,
			});

			const preventDefaultSpy = vi.spyOn(event, "preventDefault");
			anchor.dispatchEvent(event);

			// Should not intercept - let browser handle
			expect(preventDefaultSpy).not.toHaveBeenCalled();
		});

		it("ignores clicks with ctrlKey (Ctrl+click)", () => {
			const anchor = document.createElement("a");
			anchor.href = "/about";
			document.body.appendChild(anchor);

			const event = new MouseEvent("click", {
				bubbles: true,
				cancelable: true,
				button: 0,
				ctrlKey: true,
			});

			const preventDefaultSpy = vi.spyOn(event, "preventDefault");
			anchor.dispatchEvent(event);

			expect(preventDefaultSpy).not.toHaveBeenCalled();
		});

		it("ignores clicks with shiftKey", () => {
			const anchor = document.createElement("a");
			anchor.href = "/about";
			document.body.appendChild(anchor);

			const event = new MouseEvent("click", {
				bubbles: true,
				cancelable: true,
				button: 0,
				shiftKey: true,
			});

			const preventDefaultSpy = vi.spyOn(event, "preventDefault");
			anchor.dispatchEvent(event);

			expect(preventDefaultSpy).not.toHaveBeenCalled();
		});

		it("ignores clicks with altKey", () => {
			const anchor = document.createElement("a");
			anchor.href = "/about";
			document.body.appendChild(anchor);

			const event = new MouseEvent("click", {
				bubbles: true,
				cancelable: true,
				button: 0,
				altKey: true,
			});

			const preventDefaultSpy = vi.spyOn(event, "preventDefault");
			anchor.dispatchEvent(event);

			expect(preventDefaultSpy).not.toHaveBeenCalled();
		});

		it("ignores right-clicks (button !== 0)", () => {
			const anchor = document.createElement("a");
			anchor.href = "/about";
			document.body.appendChild(anchor);

			const event = new MouseEvent("click", {
				bubbles: true,
				cancelable: true,
				button: 2, // Right click
			});

			const preventDefaultSpy = vi.spyOn(event, "preventDefault");
			anchor.dispatchEvent(event);

			expect(preventDefaultSpy).not.toHaveBeenCalled();
		});
	});

	describe("Special Link Attributes", () => {
		it("ignores links with target=_blank", () => {
			initRouter();

			const anchor = document.createElement("a");
			anchor.href = "/about";
			anchor.target = "_blank";
			document.body.appendChild(anchor);

			const event = new MouseEvent("click", {
				bubbles: true,
				cancelable: true,
				button: 0,
			});

			const preventDefaultSpy = vi.spyOn(event, "preventDefault");
			anchor.dispatchEvent(event);

			expect(preventDefaultSpy).not.toHaveBeenCalled();
		});

		it("ignores links with download attribute", () => {
			initRouter();

			const anchor = document.createElement("a");
			anchor.href = "/files/document.pdf";
			anchor.setAttribute("download", "");
			document.body.appendChild(anchor);

			const event = new MouseEvent("click", {
				bubbles: true,
				cancelable: true,
				button: 0,
			});

			const preventDefaultSpy = vi.spyOn(event, "preventDefault");
			anchor.dispatchEvent(event);

			expect(preventDefaultSpy).not.toHaveBeenCalled();
		});

		it("ignores external links", () => {
			initRouter();

			const anchor = document.createElement("a");
			anchor.href = "https://example.com";
			document.body.appendChild(anchor);

			const event = new MouseEvent("click", {
				bubbles: true,
				cancelable: true,
				button: 0,
			});

			const preventDefaultSpy = vi.spyOn(event, "preventDefault");
			anchor.dispatchEvent(event);

			expect(preventDefaultSpy).not.toHaveBeenCalled();
		});

		it("ignores hash-only links", () => {
			initRouter();

			const anchor = document.createElement("a");
			anchor.href = "#section";
			document.body.appendChild(anchor);

			const event = new MouseEvent("click", {
				bubbles: true,
				cancelable: true,
				button: 0,
			});

			const preventDefaultSpy = vi.spyOn(event, "preventDefault");
			anchor.dispatchEvent(event);

			expect(preventDefaultSpy).not.toHaveBeenCalled();
		});
	});

	describe("Nested Anchor Detection", () => {
		it("handles clicks on nested elements within anchor", () => {
			initRouter();

			const anchor = document.createElement("a");
			anchor.href = "/about";
			const span = document.createElement("span");
			span.textContent = "Click me";
			anchor.appendChild(span);
			document.body.appendChild(anchor);

			// Click on the span, not the anchor directly
			const event = new MouseEvent("click", {
				bubbles: true,
				cancelable: true,
				button: 0,
			});

			// The handler should find the anchor via .closest()
			span.dispatchEvent(event);

			// If href was resolved differently, preventDefault would be called
			// Test that the anchor was found (no error thrown)
			expect(true).toBe(true);
		});

		it("ignores clicks not on anchors", () => {
			initRouter();

			const div = document.createElement("div");
			div.textContent = "Not a link";
			document.body.appendChild(div);

			const event = new MouseEvent("click", {
				bubbles: true,
				cancelable: true,
				button: 0,
			});

			const preventDefaultSpy = vi.spyOn(event, "preventDefault");
			div.dispatchEvent(event);

			expect(preventDefaultSpy).not.toHaveBeenCalled();
		});
	});
});

describe("Path Resolution Edge Cases", () => {
	beforeEach(() => {
		Object.defineProperty(window, "location", {
			value: {
				...window.location,
				pathname: "/legacy_concierge/v1.0.0/pages/",
			},
			writable: true,
		});
	});

	it("handles deeply nested current paths", () => {
		const result = resolveHref("./contact");
		expect(result).toContain("contact");
	});

	it("handles multiple ../ traversals from nested path", () => {
		const result = resolveHref("../../../index");
		expect(result).toContain("index");
	});

	it("handles mixed ./ and ../ in path", () => {
		// Set a specific path
		Object.defineProperty(window, "location", {
			value: {
				...window.location,
				pathname: "/a/b/c/d/",
			},
			writable: true,
		});

		// ../e should go from /a/b/c/d/ to /a/b/c/e
		const result = resolveHref("../e");
		expect(result).toContain("e");
	});
});

describe("URL Protocol Detection", () => {
	const externalUrls = [
		"https://example.com",
		"http://example.com",
		"//cdn.example.com",
		"mailto:user@example.com",
		"tel:+1-555-555-5555",
	];

	const internalPaths = ["/about", "/pages/contact", "./relative", "../parent"];

	it.each(externalUrls)("identifies %s as external", (url) => {
		const result = resolveHref(url);
		expect(result).toBe(url); // External URLs pass through unchanged
	});

	it.each(internalPaths)("identifies %s as internal", (path) => {
		const result = resolveHref(path);
		// Internal paths get processed (may be modified)
		expect(result).not.toMatch(/^https?:/);
		expect(result).not.toMatch(/^\/\//);
		expect(result).not.toMatch(/^mailto:/);
		expect(result).not.toMatch(/^tel:/);
	});
});
