import { beforeEach, describe, expect, it, vi } from "vitest";
import { BaseComponent, defineElement } from "../../blocks/_base.js";

// Create a test component for testing purposes
class TestComponent extends BaseComponent {
	static observedAttributes = ["variant", "size"];

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback(_name, oldValue, newValue) {
		if (oldValue !== newValue && this.isConnected) {
			this.render();
		}
	}

	render() {
		const variant = this.getAttribute("variant") || "default";
		const size = this.getAttribute("size") || "md";

		this.replaceChildren(
			this.h(
				"div",
				{
					class: this.clsx(
						"test-component",
						`variant-${variant}`,
						`size-${size}`,
					),
				},
				this.h("slot"),
			),
		);
	}
}

// Define the custom element once before all tests
if (!customElements.get("test-component")) {
	defineElement("test-component", TestComponent);
}

describe("BaseComponent", () => {
	beforeEach(() => {
		document.body.innerHTML = "";
	});

	describe("defineElement", () => {
		it("should define a custom element", () => {
			expect(customElements.get("test-component")).toBeDefined();
		});
	});

	describe("clsx method", () => {
		it("should combine class names", () => {
			const el = document.createElement("test-component");
			document.body.appendChild(el);

			expect(el.clsx("a", "b", "c")).toBe("a b c");
		});

		it("should filter falsy values", () => {
			const el = document.createElement("test-component");
			document.body.appendChild(el);

			expect(el.clsx("a", false, null, "b")).toBe("a b");
		});
	});

	describe("combineClassNames method", () => {
		it("should be an alias for clsx", () => {
			const el = document.createElement("test-component");
			document.body.appendChild(el);

			expect(el.combineClassNames("x", "y")).toBe("x y");
		});
	});

	describe("h method (createElement)", () => {
		it("should create DOM elements", () => {
			const el = document.createElement("test-component");
			document.body.appendChild(el);

			const div = el.h("div", { class: "container" });
			expect(div.tagName).toBe("DIV");
			expect(div.className).toBe("container");
		});

		it("should handle children", () => {
			const el = document.createElement("test-component");
			document.body.appendChild(el);

			const span = el.h("span", {}, "Hello");
			expect(span.textContent).toBe("Hello");
		});
	});

	describe("svg method", () => {
		it("should create SVG elements with correct namespace", () => {
			const el = document.createElement("test-component");
			document.body.appendChild(el);

			const svg = el.svg("svg", { viewBox: "0 0 24 24" });
			expect(svg.namespaceURI).toBe("http://www.w3.org/2000/svg");
		});
	});

	describe("getAttr method", () => {
		it("should return attribute value", () => {
			const el = document.createElement("test-component");
			el.setAttribute("variant", "primary");
			document.body.appendChild(el);

			expect(el.getAttr("variant")).toBe("primary");
		});

		it("should return default value for missing attribute", () => {
			const el = document.createElement("test-component");
			document.body.appendChild(el);

			expect(el.getAttr("missing", "fallback")).toBe("fallback");
		});

		it("should coerce to number when default is number", () => {
			const el = document.createElement("test-component");
			el.setAttribute("count", "42");
			document.body.appendChild(el);

			expect(el.getAttr("count", 0)).toBe(42);
		});

		it("should coerce to boolean when default is boolean", () => {
			const el = document.createElement("test-component");
			el.setAttribute("enabled", "true");
			document.body.appendChild(el);

			expect(el.getAttr("enabled", false)).toBe(true);
		});
	});

	describe("setState method", () => {
		it("should set data attribute for truthy values", () => {
			const el = document.createElement("test-component");
			document.body.appendChild(el);

			el.setState("active", true);
			expect(el.dataset.active).toBe("");
		});

		it("should remove data attribute for falsy values", () => {
			const el = document.createElement("test-component");
			el.dataset.active = "true";
			document.body.appendChild(el);

			el.setState("active", false);
			expect(el.dataset.active).toBeUndefined();
		});
	});

	describe("emit method", () => {
		it("should dispatch custom events", () => {
			const el = document.createElement("test-component");
			document.body.appendChild(el);

			const handler = vi.fn();
			el.addEventListener("custom-event", handler);

			el.emit("custom-event", { data: "test" });

			expect(handler).toHaveBeenCalledTimes(1);
			expect(handler.mock.calls[0][0].detail).toEqual({ data: "test" });
		});

		it("should bubble events by default", () => {
			const el = document.createElement("test-component");
			document.body.appendChild(el);

			const handler = vi.fn();
			document.body.addEventListener("bubble-test", handler);

			el.emit("bubble-test", {});

			expect(handler).toHaveBeenCalled();
		});
	});

	describe("component rendering", () => {
		it("should render on connect", () => {
			const el = document.createElement("test-component");
			document.body.appendChild(el);

			expect(el.querySelector(".test-component")).not.toBeNull();
		});

		it("should apply default variant class", () => {
			const el = document.createElement("test-component");
			document.body.appendChild(el);

			expect(el.querySelector(".variant-default")).not.toBeNull();
		});

		it("should apply custom variant class", () => {
			const el = document.createElement("test-component");
			el.setAttribute("variant", "primary");
			document.body.appendChild(el);

			expect(el.querySelector(".variant-primary")).not.toBeNull();
		});

		it("should re-render on attribute change", () => {
			const el = document.createElement("test-component");
			document.body.appendChild(el);

			el.setAttribute("variant", "secondary");

			expect(el.querySelector(".variant-secondary")).not.toBeNull();
		});
	});
});
