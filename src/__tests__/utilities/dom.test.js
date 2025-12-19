import { beforeEach, describe, expect, it } from "vitest";
import {
	clsx,
	combineClassNames,
	createElement,
	createSVGElement,
	h,
	uniqueId,
} from "../../utilities/dom.js";

describe("DOM Utilities", () => {
	beforeEach(() => {
		document.body.innerHTML = "";
	});

	describe("clsx", () => {
		it("should combine multiple class names", () => {
			expect(clsx("btn", "btn-primary")).toBe("btn btn-primary");
		});

		it("should filter out falsy values", () => {
			expect(clsx("btn", false, null, undefined, "btn-active")).toBe(
				"btn btn-active",
			);
		});

		it("should handle conditional classes", () => {
			const isActive = true;
			const isDisabled = false;
			expect(clsx("btn", isActive && "active", isDisabled && "disabled")).toBe(
				"btn active",
			);
		});

		it("should flatten nested arrays", () => {
			expect(clsx(["btn", ["btn-primary", "btn-lg"]])).toBe(
				"btn btn-primary btn-lg",
			);
		});

		it("should return empty string for all falsy values", () => {
			expect(clsx(false, null, undefined)).toBe("");
		});
	});

	describe("combineClassNames", () => {
		it("should be an alias for clsx", () => {
			expect(combineClassNames("a", "b")).toBe(clsx("a", "b"));
		});
	});

	describe("createElement", () => {
		it("should create an element with the specified tag", () => {
			const el = createElement("div");
			expect(el.tagName).toBe("DIV");
		});

		it("should set class attribute", () => {
			const el = createElement("div", { class: "container" });
			expect(el.className).toBe("container");
		});

		it("should set className attribute", () => {
			const el = createElement("div", { className: "wrapper" });
			expect(el.className).toBe("wrapper");
		});

		it("should combine array class names", () => {
			const el = createElement("div", { class: ["btn", "btn-primary"] });
			expect(el.className).toBe("btn btn-primary");
		});

		it("should set id attribute", () => {
			const el = createElement("div", { id: "main" });
			expect(el.id).toBe("main");
		});

		it("should append text children", () => {
			const el = createElement("p", {}, "Hello World");
			expect(el.textContent).toBe("Hello World");
		});

		it("should append element children", () => {
			const child = createElement("span", {}, "Child");
			const parent = createElement("div", {}, child);
			expect(parent.children[0]).toBe(child);
		});

		it("should flatten nested children arrays", () => {
			const el = createElement("div", {}, ["Text 1", "Text 2"]);
			expect(el.textContent).toBe("Text 1Text 2");
		});

		it("should skip null and false children", () => {
			const el = createElement("div", {}, null, false, "Valid");
			expect(el.textContent).toBe("Valid");
		});

		it("should skip null and false attributes", () => {
			const el = createElement("div", { disabled: null, hidden: false });
			expect(el.hasAttribute("disabled")).toBe(false);
			expect(el.hasAttribute("hidden")).toBe(false);
		});

		it("should set boolean true attributes as empty string", () => {
			const el = createElement("input", { disabled: true });
			expect(el.getAttribute("disabled")).toBe("");
		});

		it("should set inline styles from object", () => {
			const el = createElement("div", {
				style: { color: "red", fontSize: "14px" },
			});
			expect(el.style.color).toBe("red");
			expect(el.style.fontSize).toBe("14px");
		});

		it("should set dataset attributes", () => {
			const el = createElement("div", {
				dataset: { testId: "123", role: "button" },
			});
			expect(el.dataset.testId).toBe("123");
			expect(el.dataset.role).toBe("button");
		});

		it("should add event listeners", () => {
			let clicked = false;
			const el = createElement("button", {
				onClick: () => {
					clicked = true;
				},
			});
			el.click();
			expect(clicked).toBe(true);
		});

		it("should call ref function with element", () => {
			let refElement = null;
			const el = createElement("div", {
				ref: (element) => {
					refElement = element;
				},
			});
			expect(refElement).toBe(el);
		});
	});

	describe("h (alias)", () => {
		it("should be an alias for createElement", () => {
			const el = h("span", { class: "test" }, "Content");
			expect(el.tagName).toBe("SPAN");
			expect(el.className).toBe("test");
			expect(el.textContent).toBe("Content");
		});
	});

	describe("createSVGElement", () => {
		it("should create an SVG element with correct namespace", () => {
			const svg = createSVGElement("svg");
			expect(svg.namespaceURI).toBe("http://www.w3.org/2000/svg");
		});

		it("should set attributes on SVG elements", () => {
			const svg = createSVGElement("svg", {
				viewBox: "0 0 24 24",
				width: "24",
			});
			expect(svg.getAttribute("viewBox")).toBe("0 0 24 24");
			expect(svg.getAttribute("width")).toBe("24");
		});

		it("should append child SVG elements", () => {
			const path = createSVGElement("path", { d: "M0 0L24 24" });
			const svg = createSVGElement("svg", {}, path);
			expect(svg.children[0]).toBe(path);
		});
	});

	describe("uniqueId", () => {
		it("should generate unique IDs", () => {
			const id1 = uniqueId("test");
			const id2 = uniqueId("test");
			expect(id1).not.toBe(id2);
		});

		it("should include the prefix", () => {
			const id = uniqueId("btn");
			expect(id.startsWith("btn-")).toBe(true);
		});

		it("should use default prefix when none provided", () => {
			const id = uniqueId();
			expect(id.startsWith("ui-")).toBe(true);
		});
	});
});
