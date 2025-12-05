import G from "../assets/media/images/birds-eye-view-of-coastal-town.webp";
import L from "../assets/media/images/blue-green-waves-brown-beach.webp";
import $ from "../assets/media/images/top-down-view-of-rocky-beach.webp";
import P from "../assets/media/videos/bg-crashing-waves-fullscreen-video.mp4?url";
import V from "../assets/media/videos/bg-crashing-waves-fullscreen-video.webm?url";
function A(...a) {
  return a.flat(1 / 0).filter(Boolean).join(" ");
}
function M(a, e = {}, ...t) {
  const s = document.createElement(a);
  for (const [i, r] of Object.entries(e))
    if (!(r == null || r === !1))
      if (i === "className" || i === "class")
        s.className = Array.isArray(r) ? A(...r) : r;
      else if (i === "style" && typeof r == "object")
        Object.assign(s.style, r);
      else if (i === "dataset")
        Object.assign(s.dataset, r);
      else if (i.startsWith("on") && typeof r == "function") {
        const n = i.slice(2).toLowerCase();
        s.addEventListener(n, r);
      } else i === "ref" && typeof r == "function" ? r(s) : r === !0 ? s.setAttribute(i, "") : s.setAttribute(i, String(r));
  for (const i of t.flat(1 / 0))
    i == null || i === !1 || (i instanceof Node ? s.appendChild(i) : s.appendChild(document.createTextNode(String(i))));
  return s;
}
function W(a, e = {}, ...t) {
  const s = document.createElementNS(
    "http://www.w3.org/2000/svg",
    a
  );
  for (const [i, r] of Object.entries(e))
    r == null || r === !1 || (i === "className" || i === "class" ? s.setAttribute(
      "class",
      Array.isArray(r) ? A(...r) : r
    ) : r === !0 ? s.setAttribute(i, "") : s.setAttribute(i, String(r)));
  for (const i of t.flat(1 / 0))
    i == null || i === !1 || (i instanceof Node ? s.appendChild(i) : s.appendChild(document.createTextNode(String(i))));
  return s;
}
function K(a, e, ...t) {
  return M(
    a ? "a" : "button",
    {
      ...e,
      href: a || void 0,
      type: a ? void 0 : "button"
    },
    ...t
  );
}
function U(a, e, t) {
  const s = Array.from(a.childNodes);
  a.innerHTML = "";
  const i = M(e, t, ...s);
  return a.appendChild(i), i;
}
let Y = 0;
function Z(a = "ui") {
  return `${a}-${++Y}`;
}
const X = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
function J(a) {
  return a.querySelectorAll(X);
}
function Q(a, e = null, t = {}) {
  const s = e || a, { disabled: i = !1 } = t, r = () => i && a.hasAttribute("disabled"), n = () => {
    r() || s.setAttribute("data-hover", "");
  }, h = () => {
    s.removeAttribute("data-hover"), s.removeAttribute("data-active");
  }, c = () => {
    r() || s.setAttribute("data-active", "");
  }, m = () => {
    s.removeAttribute("data-active");
  };
  return a.addEventListener("mouseenter", n), a.addEventListener("mouseleave", h), a.addEventListener("mousedown", c), a.addEventListener("mouseup", m), () => {
    a.removeEventListener("mouseenter", n), a.removeEventListener("mouseleave", h), a.removeEventListener("mousedown", c), a.removeEventListener("mouseup", m);
  };
}
const ee = {
  TAB: "Tab"
};
class q {
  #e = null;
  #t = null;
  #s = null;
  #i = !1;
  /**
   * Creates a new FocusTrap instance
   * @param {HTMLElement} container - Element to trap focus within
   */
  constructor(e) {
    this.#e = e, this.#t = null, this.#s = this.#n.bind(this);
  }
  /**
   * Returns whether focus trap is currently active
   * @returns {boolean}
   */
  get isActive() {
    return this.#i;
  }
  /**
   * Activates focus trapping and focuses the first focusable element
   * @returns {void}
   */
  activate() {
    this.#i || (this.#i = !0, this.#t = document.activeElement, document.addEventListener("keydown", this.#s), this.#a());
  }
  /**
   * Deactivates focus trapping and restores previous focus
   * @returns {void}
   */
  deactivate() {
    this.#i && (this.#i = !1, document.removeEventListener("keydown", this.#s), this.#t?.focus?.());
  }
  /**
   * Returns all focusable elements within the container
   * @returns {NodeList} Collection of focusable elements
   */
  #r() {
    return J(this.#e);
  }
  /**
   * Focuses the first focusable element in the container
   * @returns {void}
   */
  #a() {
    this.#r()[0]?.focus();
  }
  /**
   * Handles Tab key navigation to keep focus within container
   * @param {KeyboardEvent} event - Keyboard event
   * @returns {void}
   */
  #n(e) {
    if (e.key !== ee.TAB) return;
    const t = Array.from(this.#r());
    if (t.length === 0) return;
    const s = t[0], i = t[t.length - 1];
    e.shiftKey && document.activeElement === s ? (e.preventDefault(), i.focus()) : !e.shiftKey && document.activeElement === i && (e.preventDefault(), s.focus());
  }
}
class o extends HTMLElement {
  #e = null;
  constructor() {
    super(), this._internals = this.attachInternals?.() || null;
  }
  /**
   * Gets the inner element reference
   * @returns {HTMLElement|null}
   */
  get innerElement() {
    return this.#e;
  }
  /**
   * Sets the inner element reference
   * @param {HTMLElement|null} element - Element to store
   */
  set innerElement(e) {
    this.#e = e;
  }
  /**
   * Combines multiple class names, filtering out falsy values
   * @param {...(string|boolean|null|undefined)} classes - Class names to combine
   * @returns {string} Combined class string
   */
  static combineClassNames(...e) {
    return A(...e);
  }
  /**
   * Instance method for combining class names
   * @param {...(string|boolean|null|undefined)} classes - Class names to combine
   * @returns {string} Combined class string
   */
  combineClassNames(...e) {
    return A(...e);
  }
  /**
   * Alias for combineClassNames - combines class names filtering falsy values
   * @param {...(string|boolean|null|undefined)} classes - Class names to combine
   * @returns {string} Combined class string
   */
  clsx(...e) {
    return A(...e);
  }
  /**
   * Creates an HTML element with attributes and children
   * @param {string} tagName - HTML tag name
   * @param {Object} attributes - Attributes and properties to set
   * @param {...(Node|string)} children - Child nodes or text content
   * @returns {HTMLElement} Created element
   */
  static createElement(e, t = {}, ...s) {
    return M(e, t, ...s);
  }
  /**
   * Instance method for creating HTML elements
   * @param {string} tagName - HTML tag name
   * @param {Object} attributes - Attributes and properties to set
   * @param {...(Node|string)} children - Child nodes or text content
   * @returns {HTMLElement} Created element
   */
  createElement(e, t, ...s) {
    return o.createElement(e, t, ...s);
  }
  /**
   * Alias for createElement - creates an HTML element
   * @param {string} tagName - HTML tag name
   * @param {Object} attributes - Attributes and properties to set
   * @param {...(Node|string)} children - Child nodes or text content
   * @returns {HTMLElement} Created element
   */
  h(e, t, ...s) {
    return o.createElement(e, t, ...s);
  }
  /**
   * Creates an SVG element with attributes and children
   * @param {string} tagName - SVG tag name
   * @param {Object} attributes - Attributes to set
   * @param {...(Node|string)} children - Child nodes
   * @returns {SVGElement} Created SVG element
   */
  static createSVGElement(e, t = {}, ...s) {
    return W(e, t, ...s);
  }
  /**
   * Instance method for creating SVG elements
   * @param {string} tagName - SVG tag name
   * @param {Object} attributes - Attributes to set
   * @param {...(Node|string)} children - Child nodes
   * @returns {SVGElement} Created SVG element
   */
  createSVGElement(e, t, ...s) {
    return o.createSVGElement(e, t, ...s);
  }
  /**
   * Alias for createSVGElement - creates an SVG element
   * @param {string} tagName - SVG tag name
   * @param {Object} attributes - Attributes to set
   * @param {...(Node|string)} children - Child nodes
   * @returns {SVGElement} Created SVG element
   */
  svg(e, t, ...s) {
    return o.createSVGElement(e, t, ...s);
  }
  /**
   * Creates a button or anchor element based on href presence
   * @param {string|null} href - Link URL (null creates a button)
   * @param {Object} attributes - Element attributes
   * @param {...(Node|string)} children - Child nodes
   * @returns {HTMLElement} Button or anchor element
   */
  createInteractiveElement(e, t, ...s) {
    return K(e, t, ...s);
  }
  /**
   * Renders element preserving original child nodes
   * @param {string} tagName - HTML tag name
   * @param {Object} attributes - Element attributes
   * @returns {HTMLElement} Created element with preserved children
   */
  renderWithChildren(e, t) {
    return U(this, e, t);
  }
  /**
   * Sets up hover and active state tracking via data attributes
   * @param {HTMLElement} [targetElement] - Element to apply states to (defaults to innerElement)
   * @returns {Function} Cleanup function to remove listeners
   */
  initializeHoverStateTracking(e = null) {
    const t = e || this.#e;
    return t ? Q(this, t) : () => {
    };
  }
  /**
   * Gets observed attribute value with type coercion
   * @param {string} name - Attribute name
   * @param {*} defaultValue - Default value if attribute not set
   * @returns {*} Coerced attribute value or default
   */
  getAttr(e, t = null) {
    const s = this.getAttribute(e);
    if (s === null) return t;
    if (t === !0 || t === !1)
      return s !== "false" && s !== "0";
    if (typeof t == "number") {
      const i = Number(s);
      return Number.isNaN(i) ? t : i;
    }
    return s;
  }
  /**
   * Sets data-* attributes for component state
   * @param {string} name - State name (without data- prefix)
   * @param {boolean|string} value - State value (false removes attribute)
   * @returns {void}
   */
  setState(e, t) {
    t === !1 || t == null ? delete this.dataset[e] : t === !0 ? this.dataset[e] = "" : this.dataset[e] = t;
  }
  /**
   * Dispatches a custom event with bubbling and composed enabled
   * @param {string} name - Event name
   * @param {*} detail - Event detail payload
   * @param {Object} options - Additional event options
   * @returns {void}
   */
  emit(e, t = null, s = {}) {
    this.dispatchEvent(
      new CustomEvent(e, {
        bubbles: !0,
        composed: !0,
        detail: t,
        ...s
      })
    );
  }
  /**
   * Returns a promise that resolves on the next animation frame
   * @returns {Promise<number>} Resolves with timestamp
   */
  nextFrame() {
    return new Promise((e) => requestAnimationFrame(e));
  }
  /**
   * Animates an element between two style states
   * @param {HTMLElement} element - Element to transition
   * @param {Object} fromStyles - Starting styles
   * @param {Object} toStyles - Ending styles
   * @param {number} duration - Duration in milliseconds
   * @returns {Promise<void>} Resolves when transition completes
   */
  async transition(e, t, s, i = 200) {
    return Object.assign(e.style, t), await this.nextFrame(), e.style.transition = `all ${i}ms ease`, Object.assign(e.style, s), new Promise((r) => setTimeout(r, i));
  }
}
function l(a, e) {
  customElements.get(a) || customElements.define(a, e);
}
const _ = "/";
function d(a) {
  if (!a || a.startsWith("http://") || a.startsWith("https://") || a.startsWith("//") || a.startsWith("#"))
    return a;
  if (a.startsWith("/")) {
    const e = a.slice(1);
    return `${_}${e}`;
  }
  return `${_}${a}`;
}
class te extends o {
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
    this.isConnected && this.render();
  }
  /**
   * Renders the avatar element
   * @returns {void}
   */
  render() {
    const e = this.getAttribute("src"), t = this.getAttribute("initials"), s = this.getAttribute("alt") || "", i = this.hasAttribute("square"), r = this.combineClassNames(
      "inline-grid shrink-0 align-middle [--avatar-radius:20%]",
      "[&>*]:col-start-1 [&>*]:row-start-1",
      "outline -outline-offset-1 outline-black/10",
      i ? "rounded-[var(--avatar-radius)] [&>*]:rounded-[var(--avatar-radius)]" : "rounded-full [&>*]:rounded-full"
    ), n = this.createElement("span", {
      "data-slot": "avatar",
      class: r
    });
    if (t) {
      const h = this.createSVGElement(
        "svg",
        {
          class: "size-full fill-current p-[5%] text-[48px] font-medium uppercase select-none",
          viewBox: "0 0 100 100",
          "aria-hidden": s ? void 0 : "true"
        },
        s ? this.createSVGElement("title", {}, s) : null,
        this.createSVGElement(
          "text",
          {
            x: "50%",
            y: "50%",
            "alignment-baseline": "middle",
            "dominant-baseline": "middle",
            "text-anchor": "middle",
            dy: ".125em"
          },
          t
        )
      );
      n.appendChild(h);
    }
    if (e) {
      const h = this.createElement("img", {
        class: "size-full",
        src: e,
        alt: s
      });
      n.appendChild(h);
    }
    this.innerHTML = "", this.appendChild(n);
  }
}
class se extends o {
  static get observedAttributes() {
    return ["src", "initials", "alt", "square", "href"];
  }
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render(), this.#e();
  }
  /**
   * Called when observed attributes change
   * @returns {void}
   */
  attributeChangedCallback() {
    this.isConnected && this.render();
  }
  /**
   * Sets up hover and active state event listeners
   * @returns {void}
   */
  #e() {
    this.addEventListener("mouseenter", () => {
      this.innerElement?.setAttribute("data-hover", "");
    }), this.addEventListener("mouseleave", () => {
      this.innerElement?.removeAttribute("data-hover"), this.innerElement?.removeAttribute("data-active");
    }), this.addEventListener("mousedown", () => {
      this.innerElement?.setAttribute("data-active", "");
    }), this.addEventListener("mouseup", () => {
      this.innerElement?.removeAttribute("data-active");
    });
  }
  /**
   * Renders the avatar button element
   * @returns {void}
   */
  render() {
    const e = this.getAttribute("src"), t = this.getAttribute("initials"), s = this.getAttribute("alt") || "", i = this.hasAttribute("square"), r = this.getAttribute("href"), n = this.combineClassNames(
      i ? "rounded-[20%]" : "rounded-full",
      "relative inline-grid"
    ), h = this.createInteractiveElement(
      r,
      { class: n },
      this.createElement("span", {
        class: "absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden",
        "aria-hidden": "true"
      })
    ), c = document.createElement("ui-avatar");
    e && c.setAttribute("src", e), t && c.setAttribute("initials", t), s && c.setAttribute("alt", s), i && c.setAttribute("square", ""), h.appendChild(c), this.innerHTML = "", this.appendChild(h), this.innerElement = h;
  }
}
l("ui-avatar", te);
l("ui-avatar-button", se);
const z = {
  red: "bg-red-500/15 text-red-700",
  orange: "bg-orange-500/15 text-orange-700",
  amber: "bg-amber-500/15 text-amber-700",
  yellow: "bg-yellow-500/15 text-yellow-700",
  lime: "bg-lime-500/15 text-lime-700",
  green: "bg-green-500/15 text-green-700",
  emerald: "bg-emerald-500/15 text-emerald-700",
  teal: "bg-teal-500/15 text-teal-700",
  cyan: "bg-cyan-500/15 text-cyan-700",
  sky: "bg-sky-500/15 text-sky-700",
  blue: "bg-blue-500/15 text-blue-700",
  indigo: "bg-indigo-500/15 text-indigo-700",
  violet: "bg-violet-500/15 text-violet-700",
  purple: "bg-purple-500/15 text-purple-700",
  fuchsia: "bg-fuchsia-500/15 text-fuchsia-700",
  pink: "bg-pink-500/15 text-pink-700",
  rose: "bg-rose-500/15 text-rose-700",
  zinc: "bg-zinc-500/15 text-zinc-700"
};
class ie extends o {
  static get observedAttributes() {
    return ["color"];
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
    this.isConnected && this.render();
  }
  /**
   * Renders the badge element
   * @returns {void}
   */
  render() {
    const e = this.getAttribute("color") || "zinc", t = this.combineClassNames(
      "inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5",
      "forced-colors:outline",
      z[e] || z.zinc
    ), s = Array.from(this.childNodes);
    this.innerHTML = "";
    const i = this.createElement("span", { class: t });
    for (const r of s)
      i.appendChild(r);
    this.appendChild(i);
  }
}
class ae extends o {
  static get observedAttributes() {
    return ["color", "href"];
  }
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render(), this.#e();
  }
  /**
   * Called when observed attributes change
   * @returns {void}
   */
  attributeChangedCallback() {
    this.isConnected && this.render();
  }
  /**
   * Sets up hover state event listeners
   * @returns {void}
   */
  #e() {
    this.addEventListener("mouseenter", () => {
      this.innerElement?.setAttribute("data-hover", "");
    }), this.addEventListener("mouseleave", () => {
      this.innerElement?.removeAttribute("data-hover");
    });
  }
  /**
   * Renders the badge button element
   * @returns {void}
   */
  render() {
    const e = this.getAttribute("color") || "zinc", t = this.getAttribute("href"), s = this.combineClassNames(
      "group relative inline-flex rounded-md",
      ""
    ), i = this.combineClassNames(
      "inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5",
      "forced-colors:outline",
      z[e] || z.zinc
    ), r = Array.from(this.childNodes);
    this.innerHTML = "";
    const n = this.createInteractiveElement(
      t,
      { class: s },
      this.createElement("span", {
        class: "absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden",
        "aria-hidden": "true"
      }),
      this.createElement("span", { class: i }, ...r)
    );
    this.appendChild(n), this.innerElement = n;
  }
}
l("ui-badge", ie);
l("ui-badge-button", ae);
const E = {
  base: [
    "relative isolate inline-flex items-baseline justify-center gap-x-2 rounded-lg border text-base/6 font-semibold",
    "px-[calc(var(--spacing)*3.5-1px)] py-[calc(var(--spacing)*2.5-1px)] sm:px-[calc(var(--spacing)*3-1px)] sm:py-[calc(var(--spacing)*1.5-1px)] sm:text-sm/6",
    "ring-primary",
    "[&[data-disabled]]:opacity-50",
    "[&_[data-slot=icon]]:-mx-0.5 [&_[data-slot=icon]]:my-0.5 [&_[data-slot=icon]]:size-5 [&_[data-slot=icon]]:shrink-0 [&_[data-slot=icon]]:self-center sm:[&_[data-slot=icon]]:my-1 sm:[&_[data-slot=icon]]:size-4"
  ].join(" "),
  solid: [
    "bg-[var(--btn-border)]",
    "before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-lg,0.5rem)-1px)] before:bg-[var(--btn-bg)]",
    "before:shadow-sm",
    "after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-lg,0.5rem)-1px)]",
    "after:shadow-[inset_0_1px_theme(colors.white/15%)]",
    "[&[data-disabled]]:before:shadow-none [&[data-disabled]]:after:shadow-none"
  ].join(" "),
  outline: [
    "btn-outline border-strong",
    "[--btn-icon:var(--color-muted)]"
  ].join(" "),
  plain: [
    "btn-subtle border-transparent",
    "[--btn-icon:var(--color-muted)]"
  ].join(" "),
  colors: {
    "dark/zinc": [
      "[--btn-bg:theme(colors.zinc.900)] [--btn-border:theme(colors.zinc.950/90%)] [--btn-hover-overlay:theme(colors.white/10%)]",
      "[--btn-icon:theme(colors.zinc.400)]"
    ].join(" "),
    light: [
      "[--btn-bg:white] [--btn-border:theme(colors.zinc.950/10%)] [--btn-hover-overlay:theme(colors.zinc.950/2.5%)]",
      "[--btn-icon:theme(colors.zinc.500)]"
    ].join(" "),
    "dark/white": [
      "[--btn-bg:theme(colors.zinc.900)] [--btn-border:theme(colors.zinc.950/90%)] [--btn-hover-overlay:theme(colors.white/10%)]"
    ].join(" "),
    dark: [
      "[--btn-bg:theme(colors.zinc.900)] [--btn-border:theme(colors.zinc.950/90%)] [--btn-hover-overlay:theme(colors.white/10%)]",
      "[--btn-icon:theme(colors.zinc.400)]"
    ].join(" "),
    white: [
      "[--btn-bg:white] [--btn-border:theme(colors.zinc.950/10%)] [--btn-hover-overlay:theme(colors.zinc.950/2.5%)]",
      "[--btn-icon:theme(colors.zinc.400)]"
    ].join(" "),
    zinc: [
      "[--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.zinc.600)] [--btn-border:theme(colors.zinc.700/90%)]",
      "[--btn-icon:theme(colors.zinc.400)]"
    ].join(" "),
    indigo: [
      "[--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.indigo.500)] [--btn-border:theme(colors.indigo.600/90%)]",
      "[--btn-icon:theme(colors.indigo.300)]"
    ].join(" "),
    cyan: [
      "[--btn-bg:theme(colors.cyan.300)] [--btn-border:theme(colors.cyan.400/80%)] [--btn-hover-overlay:theme(colors.white/25%)]",
      "[--btn-icon:theme(colors.cyan.500)]"
    ].join(" "),
    red: [
      "[--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.red.600)] [--btn-border:theme(colors.red.700/90%)]",
      "[--btn-icon:theme(colors.red.300)]"
    ].join(" "),
    orange: [
      "[--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.orange.500)] [--btn-border:theme(colors.orange.600/90%)]",
      "[--btn-icon:theme(colors.orange.300)]"
    ].join(" "),
    amber: [
      "[--btn-hover-overlay:theme(colors.white/25%)] [--btn-bg:theme(colors.amber.400)] [--btn-border:theme(colors.amber.500/80%)]",
      "[--btn-icon:theme(colors.amber.600)]"
    ].join(" "),
    yellow: [
      "[--btn-hover-overlay:theme(colors.white/25%)] [--btn-bg:theme(colors.yellow.300)] [--btn-border:theme(colors.yellow.400/80%)]",
      "[--btn-icon:theme(colors.yellow.600)]"
    ].join(" "),
    lime: [
      "[--btn-hover-overlay:theme(colors.white/25%)] [--btn-bg:theme(colors.lime.300)] [--btn-border:theme(colors.lime.400/80%)]",
      "[--btn-icon:theme(colors.lime.600)]"
    ].join(" "),
    green: [
      "[--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.green.600)] [--btn-border:theme(colors.green.700/90%)]",
      "[--btn-icon:theme(colors.white/60%)]"
    ].join(" "),
    emerald: [
      "[--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.emerald.600)] [--btn-border:theme(colors.emerald.700/90%)]",
      "[--btn-icon:theme(colors.white/60%)]"
    ].join(" "),
    teal: [
      "[--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.teal.600)] [--btn-border:theme(colors.teal.700/90%)]",
      "[--btn-icon:theme(colors.white/60%)]"
    ].join(" "),
    sky: [
      "[--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.sky.500)] [--btn-border:theme(colors.sky.600/80%)]",
      "[--btn-icon:theme(colors.white/60%)]"
    ].join(" "),
    blue: [
      "[--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.blue.600)] [--btn-border:theme(colors.blue.700/90%)]",
      "[--btn-icon:theme(colors.blue.400)]"
    ].join(" "),
    violet: [
      "[--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.violet.500)] [--btn-border:theme(colors.violet.600/90%)]",
      "[--btn-icon:theme(colors.violet.300)]"
    ].join(" "),
    purple: [
      "[--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.purple.500)] [--btn-border:theme(colors.purple.600/90%)]",
      "[--btn-icon:theme(colors.purple.300)]"
    ].join(" "),
    fuchsia: [
      "[--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.fuchsia.500)] [--btn-border:theme(colors.fuchsia.600/90%)]",
      "[--btn-icon:theme(colors.fuchsia.300)]"
    ].join(" "),
    pink: [
      "[--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.pink.500)] [--btn-border:theme(colors.pink.600/90%)]",
      "[--btn-icon:theme(colors.pink.300)]"
    ].join(" "),
    rose: [
      "[--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.rose.500)] [--btn-border:theme(colors.rose.600/90%)]",
      "[--btn-icon:theme(colors.rose.300)]"
    ].join(" ")
  }
};
class Yt extends o {
  static get observedAttributes() {
    return ["color", "outline", "plain", "href", "disabled"];
  }
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render(), this.#e();
  }
  /**
   * Called when observed attributes change
   * @returns {void}
   */
  attributeChangedCallback() {
    this.isConnected && this.render();
  }
  /**
   * Sets up click and hover event listeners for the button
   * @returns {void}
   */
  #e() {
    this.addEventListener("click", (e) => {
      if (this.hasAttribute("disabled")) {
        e.preventDefault(), e.stopPropagation();
        return;
      }
      this.emit("button-click", { button: this });
    }), this.addEventListener("mouseenter", () => {
      this.hasAttribute("disabled") || this.innerElement?.setAttribute("data-hover", "");
    }), this.addEventListener("mouseleave", () => {
      this.innerElement?.removeAttribute("data-hover"), this.innerElement?.removeAttribute("data-active");
    }), this.addEventListener("mousedown", () => {
      this.hasAttribute("disabled") || this.innerElement?.setAttribute("data-active", "");
    }), this.addEventListener("mouseup", () => {
      this.innerElement?.removeAttribute("data-active");
    });
  }
  /**
   * Renders the button element
   * @returns {void}
   */
  render() {
    const e = this.getAttribute("color") || "dark/zinc", t = this.hasAttribute("outline"), s = this.hasAttribute("plain"), i = this.getAttribute("href"), r = this.hasAttribute("disabled"), n = this.combineClassNames(
      E.base,
      t ? E.outline : s ? E.plain : [E.solid, E.colors[e]],
      !i && "cursor-default"
    ), h = i ? "a" : "button", c = this.createElement(
      h,
      {
        class: n,
        href: i || void 0,
        type: i ? void 0 : "button",
        disabled: r && !i ? !0 : void 0,
        "aria-disabled": r ? "true" : void 0,
        "data-disabled": r ? "" : void 0
      },
      this.createElement("span", {
        class: "absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden",
        "aria-hidden": "true"
      }),
      this.createElement("slot")
    );
    this.innerHTML = "", this.appendChild(c), this.innerElement = c;
    const m = this.querySelector("slot");
    m?.addEventListener("slotchange", () => {
      m.assignedNodes().forEach((p) => {
        p.nodeType === Node.ELEMENT_NODE && p.tagName === "svg" && p.setAttribute("data-slot", "icon");
      });
    });
  }
}
class Zt extends o {
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
l("ui-button", UIButton);
l("ui-touch-target", UITouchTarget);
class Xt extends o {
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
    this.isConnected && this.render();
  }
  /**
   * Renders the card container
   * @returns {void}
   */
  render() {
    const e = this.hasAttribute("hover"), t = this.combineClassNames(
      "rounded-xl card-bg p-6 shadow-lg",
      "ring-1 card-border",
      e && "transition-shadow card-bg-hover",
      this.className
    ), s = Array.from(this.childNodes);
    this.innerHTML = "";
    const i = this.createElement(
      "div",
      { class: t },
      ...s
    );
    this.appendChild(i);
  }
}
class Jt extends o {
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
    const e = this.combineClassNames("mb-4", this.className), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "div",
      { class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class Qt extends o {
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
    const e = this.combineClassNames(
      "text-lg/6 font-semibold card-fg",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "h3",
      { class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class es extends o {
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
    const e = this.combineClassNames(
      "mt-1 text-sm/6 text-muted",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "p",
      { class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class ts extends o {
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
    const e = this.combineClassNames(
      "text-base/6 text-muted",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "div",
      { class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class ss extends o {
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
    const e = this.combineClassNames(
      "mt-6 flex items-center justify-end gap-3",
      "border-t border-soft pt-4",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "div",
      { class: e },
      ...t
    );
    this.appendChild(s);
  }
}
l("ui-card", UICard);
l("ui-card-header", UICardHeader);
l("ui-card-title", UICardTitle);
l("ui-card-description", UICardDescription);
l("ui-card-body", UICardBody);
l("ui-card-footer", UICardFooter);
class re extends o {
  static get observedAttributes() {
    return ["role", "icon", "description"];
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback(e, t, s) {
    t !== s && this.isConnected && this.render();
  }
  render() {
    const e = this.getAttribute("role") || "Role", t = this.getAttribute("icon") || "👤", s = this.getAttribute("description") || "", i = this.h(
      "div",
      {
        class: this.clsx(
          "rounded-lg p-6",
          "ring-1 ring-zinc-950/5",
          "text-center",
          "transition-all duration-200",
          "",
          "h-full flex flex-col"
        )
      },
      // Icon
      this.h(
        "div",
        {
          class: "text-4xl mb-3",
          role: "img",
          "aria-label": `${e} icon`
        },
        t
      ),
      // Role title
      this.h(
        "h3",
        {
          class: "text-lg font-bold mb-2"
        },
        e
      ),
      // Description
      s && this.h(
        "p",
        {
          class: "text-sm leading-relaxed"
        },
        s
      )
    );
    this.innerHTML = "", this.appendChild(i);
  }
}
l("role-card", re);
class ne extends o {
  static get observedAttributes() {
    return ["soft"];
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.isConnected && this.render();
  }
  render() {
    const e = this.hasAttribute("soft"), t = this.clsx(
      "w-full border-t",
      e ? "border-zinc-950/5" : "border-zinc-950/10",
      this.className
    );
    this.innerHTML = "";
    const s = this.h("hr", { role: "presentation", class: t });
    this.appendChild(s);
  }
}
l("ui-divider", ne);
const N = {
  right: {
    panel: "ml-auto",
    translate: "translate-x-full",
    translateOpen: "translate-x-0",
    padding: "pl-10 sm:pl-16"
  },
  left: {
    panel: "mr-auto",
    translate: "-translate-x-full",
    translateOpen: "translate-x-0",
    padding: "pr-10 sm:pr-16"
  }
}, H = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "max-w-full"
};
class oe extends o {
  #e = !1;
  #t = null;
  #s = null;
  #i = null;
  #r = null;
  #a = null;
  static get observedAttributes() {
    return ["position", "size", "open"];
  }
  /**
   * Creates a new UIDrawer instance
   */
  constructor() {
    super(), this.#a = this.#l.bind(this);
  }
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render(), this.#n(), this.hasAttribute("open") && this.open();
  }
  /**
   * Called when element is disconnected from the DOM
   * @returns {void}
   */
  disconnectedCallback() {
    this.#t?.deactivate(), document.removeEventListener("keydown", this.#a);
  }
  /**
   * Called when observed attributes change
   * @param {string} name - Attribute name
   * @param {string} oldValue - Previous value
   * @param {string} newValue - New value
   * @returns {void}
   */
  attributeChangedCallback(e, t, s) {
    e === "open" ? s !== null ? this.open() : this.close() : this.isConnected && this.render();
  }
  /**
   * Sets up keyboard listener for Escape key to close drawer
   * @returns {void}
   */
  #n() {
    document.addEventListener("keydown", this.#a);
  }
  /**
   * Handles Escape key press to close drawer
   * @param {KeyboardEvent} event - Keyboard event
   * @returns {void}
   */
  #l(e) {
    e.key === "Escape" && this.#e && this.close();
  }
  /**
   * Opens the drawer
   * @returns {void}
   */
  open() {
    this.#e || (this.#e = !0, this.#o(), this.emit("drawer-open"));
  }
  /**
   * Closes the drawer
   * @returns {void}
   */
  close() {
    this.#e && (this.#e = !1, this.#o(), this.emit("drawer-close"));
  }
  /**
   * Updates the visual state of the drawer based on open/closed status
   * @returns {void}
   */
  #o() {
    const e = this.#s, t = this.#i, s = this.#r, i = this.getAttribute("position") || "right", r = N[i] || N.right;
    !e || !t || !s || (this.#e ? (e.classList.remove("hidden"), e.setAttribute("aria-hidden", "false"), requestAnimationFrame(() => {
      t.classList.remove("opacity-0"), s.classList.remove(r.translate), s.classList.add(r.translateOpen);
    }), this.#t = new q(s), this.#t.activate(), document.body.style.overflow = "hidden") : (t.classList.add("opacity-0"), s.classList.remove(r.translateOpen), s.classList.add(r.translate), setTimeout(() => {
      e.classList.add("hidden"), e.setAttribute("aria-hidden", "true");
    }, 300), this.#t?.deactivate(), this.#t = null, document.body.style.overflow = "", this.removeAttribute("open")));
  }
  /**
   * Renders the drawer element
   * @returns {void}
   */
  render() {
    const e = this.getAttribute("position") || "right", t = this.getAttribute("size") || "md", s = N[e] || N.right, i = Array.from(this.childNodes);
    this.innerHTML = "";
    const r = this.createElement("div", {
      class: "fixed inset-0 z-50 hidden overflow-hidden",
      role: "dialog",
      "aria-modal": "true",
      "aria-hidden": "true",
      ref: (p) => {
        this.#s = p;
      }
    }), n = this.createElement("div", {
      class: this.combineClassNames(
        "fixed inset-0 transition-opacity duration-300 ease-in-out opacity-0",
        "bg-zinc-950/25"
      ),
      ref: (p) => {
        this.#i = p;
      },
      onClick: () => this.close()
    }), h = this.createElement("div", {
      class: this.combineClassNames(
        "fixed inset-0 overflow-hidden",
        s.padding
      )
    }), c = this.createElement("div", {
      class: "flex h-full items-stretch"
    }), m = this.createElement("div", {
      class: this.combineClassNames(
        "relative w-screen transform transition duration-300 ease-in-out",
        H[t] || H.md,
        s.panel,
        s.translate
      ),
      ref: (p) => {
        this.#r = p;
      }
    }), b = this.createElement("div", {
      class: this.combineClassNames(
        "flex h-full flex-col overflow-y-auto bg-canvas shadow-xl"
      )
    });
    for (const p of i)
      b.appendChild(p);
    m.appendChild(b), c.appendChild(m), h.appendChild(c), r.appendChild(n), r.appendChild(h), this.appendChild(r);
  }
}
class le extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the drawer header section
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames(
      "flex items-center justify-between px-4 py-6 sm:px-6",
      "border-b border-soft",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement("div", {
      class: "flex-1"
    });
    for (const n of t)
      s.appendChild(n);
    const i = this.createElement(
      "button",
      {
        type: "button",
        class: this.combineClassNames(
          "rounded-md text-zinc-400",
          "hover:text-zinc-500"
        ),
        onClick: () => {
          this.closest("ui-drawer")?.close();
        }
      },
      this.createElement("span", { class: "sr-only" }, "Close panel"),
      this.createSVGElement(
        "svg",
        {
          class: "size-6",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor",
          "aria-hidden": "true"
        },
        this.createSVGElement("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          d: "M6 18L18 6M6 6l12 12"
        })
      )
    ), r = this.createElement(
      "div",
      { class: e },
      s,
      i
    );
    this.appendChild(r);
  }
}
class ce extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the drawer title element
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames(
      "text-base font-semibold text-canvas",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "h2",
      { class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class de extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the drawer description element
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames(
      "mt-1 text-sm text-muted",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "p",
      { class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class he extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the drawer body section
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames(
      "relative flex-1 px-4 py-6 sm:px-6",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "div",
      { class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class me extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the drawer footer section
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames(
      "flex shrink-0 justify-end gap-3 px-4 py-4 sm:px-6",
      "border-t border-soft",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "div",
      { class: e },
      ...t
    );
    this.appendChild(s);
  }
}
l("ui-drawer", oe);
l("ui-drawer-header", le);
l("ui-drawer-title", ce);
l("ui-drawer-description", de);
l("ui-drawer-body", he);
l("ui-drawer-footer", me);
class ue extends o {
  #e = !1;
  #t = null;
  #s = -1;
  #i = null;
  #r = null;
  #a = null;
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render(), this.#o();
  }
  /**
   * Called when element is disconnected from the DOM
   * @returns {void}
   */
  disconnectedCallback() {
    this.#t?.deactivate(), this.#r && document.removeEventListener("click", this.#r), this.#a && document.removeEventListener(
      "keydown",
      this.#a
    );
  }
  /**
   * Handles clicks outside the dropdown to close it
   * @param {MouseEvent} event - The mouse event
   * @returns {void}
   */
  #n(e) {
    this.#e && !this.contains(e.target) && this.close();
  }
  /**
   * Handles keyboard navigation within the dropdown
   * @param {KeyboardEvent} event - The keyboard event
   * @returns {void}
   */
  #l(e) {
    if (!this.#e) return;
    const t = this.#c();
    switch (e.key) {
      case "Escape":
        e.preventDefault(), this.close(), this.#i?.focus();
        break;
      case "ArrowDown":
        e.preventDefault(), this.#s = Math.min(
          this.#s + 1,
          t.length - 1
        ), t[this.#s]?.focus();
        break;
      case "ArrowUp":
        e.preventDefault(), this.#s = Math.max(this.#s - 1, 0), t[this.#s]?.focus();
        break;
      case "Home":
        e.preventDefault(), this.#s = 0, t[0]?.focus();
        break;
      case "End":
        e.preventDefault(), this.#s = t.length - 1, t[t.length - 1]?.focus();
        break;
      case "Tab":
        this.close();
        break;
    }
  }
  /**
   * Initializes event listeners for outside clicks and keyboard navigation
   * @returns {void}
   */
  #o() {
    this.#r = this.#n.bind(this), this.#a = this.#l.bind(this), document.addEventListener("click", this.#r), document.addEventListener("keydown", this.#a);
  }
  /**
   * Gets all selectable menu items that are not disabled
   * @returns {HTMLElement[]} Array of focusable menu item elements
   */
  #c() {
    return Array.from(
      this.querySelectorAll("ui-dropdown-item:not([disabled])")
    );
  }
  /**
   * Opens the dropdown menu
   * @fires dropdown-open
   * @returns {void}
   */
  open() {
    this.#e || (this.#e = !0, this.#s = -1, this.#d(), this.emit("dropdown-open"));
  }
  /**
   * Closes the dropdown menu
   * @fires dropdown-close
   * @returns {void}
   */
  close() {
    this.#e && (this.#e = !1, this.#d(), this.emit("dropdown-close"));
  }
  /**
   * Toggles the dropdown menu open/closed state
   * @returns {void}
   */
  toggle() {
    this.#e ? this.close() : this.open();
  }
  /**
   * Updates the visibility of the dropdown menu with animations
   * @returns {void}
   */
  #d() {
    const e = this.querySelector("ui-dropdown-menu");
    e && (this.#e ? (e.classList.remove("hidden"), e.setAttribute("data-open", ""), requestAnimationFrame(() => {
      e.classList.remove("opacity-0");
    }), setTimeout(() => {
      const t = this.#c();
      t.length && (this.#s = 0, t[0]?.focus());
    }, 50)) : (e.classList.add("opacity-0"), e.removeAttribute("data-open"), setTimeout(() => {
      e.classList.add("hidden");
    }, 100)));
  }
  /**
   * Renders the dropdown component structure
   * @returns {void}
   */
  render() {
    this.style.position = "relative", this.style.display = "inline-block";
    const e = this.querySelector("ui-dropdown-button");
    if (e) {
      const t = e.querySelector(
        "button, ui-button, a"
      );
      t && (this.#i = t, t.setAttribute("aria-haspopup", "true"), t.setAttribute("aria-expanded", "false"), t.addEventListener("click", (s) => {
        s.stopPropagation(), this.toggle(), t.setAttribute(
          "aria-expanded",
          this.#e ? "true" : "false"
        );
      }));
    }
  }
}
class be extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
  }
}
class pe extends o {
  static get observedAttributes() {
    return ["anchor"];
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
    this.isConnected && this.render();
  }
  /**
   * Renders the dropdown menu container
   * @returns {void}
   */
  render() {
    const e = this.getAttribute("anchor") || "bottom", t = {
      bottom: "top-full left-0 mt-2",
      "bottom-start": "top-full left-0 mt-2",
      "bottom-end": "top-full right-0 mt-2",
      top: "bottom-full left-0 mb-2",
      "top-start": "bottom-full left-0 mb-2",
      "top-end": "bottom-full right-0 mb-2"
    }, s = this.combineClassNames(
      "absolute z-50 hidden opacity-0",
      t[e] || t.bottom,
      "isolate w-max min-w-[12rem] rounded-xl p-1",
      "outline outline-transparent",
      "overflow-y-auto max-h-80",
      "backdrop-blur-xl bg-white/75",
      "shadow-lg ring-1 ring-zinc-950/10",
      "transition duration-100 ease-in",
      this.className
    ), i = Array.from(this.childNodes);
    if (!this.querySelector("[data-dropdown-inner]")) {
      this.innerHTML = "";
      const n = this.createElement(
        "div",
        {
          "data-dropdown-inner": "",
          class: s,
          role: "menu"
        },
        ...i
      );
      this.appendChild(n);
    }
  }
}
class fe extends o {
  #e = null;
  static get observedAttributes() {
    return ["href", "disabled"];
  }
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render(), this.#t();
  }
  /**
   * Called when observed attributes change
   * @returns {void}
   */
  attributeChangedCallback() {
    this.isConnected && this.render();
  }
  /**
   * Sets up hover state event listeners
   * @returns {void}
   */
  #t() {
    this.addEventListener("mouseenter", () => {
      this.hasAttribute("disabled") || this.#e?.setAttribute("data-focus", "");
    }), this.addEventListener("mouseleave", () => {
      this.#e?.removeAttribute("data-focus");
    });
  }
  /**
   * Focuses the dropdown item
   * @returns {void}
   */
  focus() {
    this.#e?.focus(), this.#e?.setAttribute("data-focus", "");
  }
  /**
   * Renders the dropdown item element
   * @returns {void}
   */
  render() {
    const e = this.getAttribute("href"), t = this.hasAttribute("disabled"), s = this.combineClassNames(
      "group cursor-default rounded-lg px-3.5 py-2.5 sm:px-3 sm:py-1.5",
      "text-left text-base/6 text-canvas sm:text-sm/6",
      "[&[data-focus]]:[&[data-focus]]:text-white",
      t && "opacity-50",
      "w-full flex items-center gap-2",
      "[&_[data-slot=icon]]:size-5 sm:[&_[data-slot=icon]]:size-4",
      "[&_[data-slot=icon]]:text-muted [&[data-focus]_[data-slot=icon]]:text-white"
    ), i = Array.from(this.childNodes);
    this.innerHTML = "";
    const r = this.createInteractiveElement(
      e,
      {
        role: "menuitem",
        tabindex: "-1",
        class: s,
        disabled: t && !e ? !0 : void 0,
        "aria-disabled": t ? "true" : void 0,
        ref: (n) => {
          this.#e = n;
        }
      },
      ...i
    );
    r.addEventListener("click", () => {
      t || this.closest("ui-dropdown")?.close();
    }), this.appendChild(r);
  }
}
class ge extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the dropdown header element
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames(
      "px-3.5 pt-2.5 pb-1 sm:px-3",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "div",
      { class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class xe extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the dropdown section element
   * @returns {void}
   */
  render() {
    const e = Array.from(this.childNodes);
    this.innerHTML = "";
    const t = this.createElement(
      "div",
      { role: "group" },
      ...e
    );
    this.appendChild(t);
  }
}
class ve extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the dropdown heading element
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames(
      "px-3.5 pt-2 pb-1 text-sm/5 font-medium text-muted sm:px-3 sm:text-xs/5",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "div",
      { class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class Ce extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the dropdown divider element
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames(
      "mx-3.5 my-1 h-px border-0 border-soft sm:mx-3",
      this.className
    );
    this.innerHTML = "";
    const t = this.createElement("hr", {
      class: e,
      role: "separator"
    });
    this.appendChild(t);
  }
}
class ye extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the dropdown label element
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames("flex-1", this.className), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "div",
      { "data-slot": "label", class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class we extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the dropdown description element
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames(
      "text-sm/5 text-muted group-[&[data-focus]]:sm:text-xs/5",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "div",
      { "data-slot": "description", class: e },
      ...t
    );
    this.appendChild(s);
  }
}
l("ui-dropdown", ue);
l("ui-dropdown-button", be);
l("ui-dropdown-menu", pe);
l("ui-dropdown-item", fe);
l("ui-dropdown-header", ge);
l("ui-dropdown-section", xe);
l("ui-dropdown-heading", ve);
l("ui-dropdown-divider", Ce);
l("ui-dropdown-label", ye);
l("ui-dropdown-description", we);
class ke extends o {
  static get observedAttributes() {
    return ["region", "icon", "coverage"];
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback(e, t, s) {
    t !== s && this.isConnected && this.render();
  }
  render() {
    const e = this.getAttribute("region") || "Region", t = this.getAttribute("icon") || "📍", s = this.getAttribute("coverage") || "", i = this.h(
      "div",
      {
        class: this.clsx(
          "rounded-xl shadow-lg p-8",
          "ring-1 ring-zinc-950/5",
          "transition-all duration-200",
          "flex flex-col items-center text-center",
          "h-full"
        )
      },
      // Icon
      this.h(
        "div",
        {
          class: "text-6xl mb-4",
          role: "img",
          "aria-label": `${e} icon`
        },
        t
      ),
      // Region name
      this.h(
        "h3",
        {
          class: "text-xl font-bold mb-3"
        },
        e
      ),
      // Coverage description
      s && this.h(
        "p",
        {
          class: "text-sm leading-relaxed"
        },
        s
      )
    );
    this.innerHTML = "", this.appendChild(i);
  }
}
l("location-card", ke);
class Ee extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the navbar container
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames(
      "flex flex-1 items-center gap-4 py-2.5",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "nav",
      { class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class Ae extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the navbar divider element
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames(
      "h-6 w-px bg-zinc-950/10",
      this.className
    );
    this.innerHTML = "";
    const t = this.createElement("div", {
      "aria-hidden": "true",
      class: e
    });
    this.appendChild(t);
  }
}
class Ne extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the navbar section container
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames(
      "flex items-center gap-3",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "div",
      { class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class Le extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the navbar spacer element
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames(
      "-ml-4 flex-1",
      this.className
    );
    this.innerHTML = "";
    const t = this.createElement("div", {
      "aria-hidden": "true",
      class: e
    });
    this.appendChild(t);
  }
}
class ze extends o {
  #e = null;
  static get observedAttributes() {
    return ["href", "current"];
  }
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render(), this.initializeHoverStateTracking(this.#e);
  }
  /**
   * Called when observed attributes change
   * @returns {void}
   */
  attributeChangedCallback() {
    this.isConnected && this.render();
  }
  /**
   * Renders the navbar item element
   * @returns {void}
   */
  render() {
    const e = this.getAttribute("href"), t = this.hasAttribute("current"), s = this.combineClassNames("relative", this.className), i = this.combineClassNames(
      "relative flex min-w-0 items-center gap-3 rounded-lg p-2 text-left text-base/6 font-medium sm:text-sm/5",
      "[&_[data-slot=icon]]:size-6 [&_[data-slot=icon]]:shrink-0 [&_[data-slot=icon]]:fill-zinc-500 sm:[&_[data-slot=icon]]:size-5",
      "[&:not(:nth-child(2)):last-child_[data-slot=icon]]:ml-auto [&:not(:nth-child(2)):last-child_[data-slot=icon]]:size-5 sm:[&:not(:nth-child(2)):last-child_[data-slot=icon]]:size-4",
      "[&_[data-slot=avatar]]:-m-0.5 [&_[data-slot=avatar]]:size-7 sm:[&_[data-slot=avatar]]:size-6",
      "[&[data-hover]]:[&[data-hover]_[data-slot=icon]]:fill-zinc-950",
      "[&[data-active]_[data-slot=icon]]:fill-zinc-950",
      "text-zinc-950",
      !e && "cursor-default"
    ), r = Array.from(this.childNodes);
    this.innerHTML = "";
    const n = this.createElement("span", {
      class: s
    });
    if (t) {
      const c = this.createElement("span", {
        class: "absolute inset-x-2 -bottom-2.5 h-0.5 rounded-full bg-zinc-950"
      });
      n.appendChild(c);
    }
    const h = this.createInteractiveElement(
      e,
      {
        class: i,
        "data-current": t ? "true" : void 0,
        ref: (c) => {
          this.#e = c;
        }
      },
      this.createElement("span", {
        class: "absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden",
        "aria-hidden": "true"
      }),
      ...r
    );
    n.appendChild(h), this.appendChild(n);
  }
}
class qe extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the navbar label element
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames("truncate", this.className), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "span",
      { class: e },
      ...t
    );
    this.appendChild(s);
  }
}
l("ui-navbar", Ee);
l("ui-navbar-divider", Ae);
l("ui-navbar-section", Ne);
l("ui-navbar-spacer", Le);
l("ui-navbar-item", ze);
l("ui-navbar-label", qe);
class Te extends o {
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
    const e = this.getAttribute("aria-label") || "Page navigation", t = this.combineClassNames(
      "flex gap-x-2",
      this.className
    ), s = Array.from(this.childNodes);
    this.innerHTML = "";
    const i = this.createElement(
      "nav",
      { "aria-label": e, class: t },
      ...s
    );
    this.appendChild(i);
  }
}
class Me extends o {
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
    this.isConnected && this.render();
  }
  /**
   * Renders the previous page button
   * @returns {void}
   */
  render() {
    const e = this.getAttribute("href"), t = !e, s = this.textContent?.trim() || "Previous";
    this.innerHTML = "";
    const i = this.createElement("span", {
      class: "grow basis-0"
    }), r = document.createElement("ui-button");
    r.setAttribute("plain", ""), r.setAttribute("aria-label", "Previous page"), t ? r.setAttribute("disabled", "") : r.setAttribute("href", e);
    const n = this.createSVGElement(
      "svg",
      {
        class: "stroke-current",
        "data-slot": "icon",
        viewBox: "0 0 16 16",
        fill: "none",
        "aria-hidden": "true"
      },
      this.createSVGElement("path", {
        d: "M2.75 8H13.25M2.75 8L5.25 5.5M2.75 8L5.25 10.5",
        "stroke-width": "1.5",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      })
    );
    r.appendChild(n), r.appendChild(document.createTextNode(s)), i.appendChild(r), this.appendChild(i);
  }
}
class Se extends o {
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
    this.isConnected && this.render();
  }
  /**
   * Renders the next page button
   * @returns {void}
   */
  render() {
    const e = this.getAttribute("href"), t = !e, s = this.textContent?.trim() || "Next";
    this.innerHTML = "";
    const i = this.createElement("span", {
      class: "flex grow basis-0 justify-end"
    }), r = document.createElement("ui-button");
    r.setAttribute("plain", ""), r.setAttribute("aria-label", "Next page"), t ? r.setAttribute("disabled", "") : r.setAttribute("href", e), r.appendChild(document.createTextNode(s));
    const n = this.createSVGElement(
      "svg",
      {
        class: "stroke-current",
        "data-slot": "icon",
        viewBox: "0 0 16 16",
        fill: "none",
        "aria-hidden": "true"
      },
      this.createSVGElement("path", {
        d: "M13.25 8L2.75 8M13.25 8L10.75 10.5M13.25 8L10.75 5.5",
        "stroke-width": "1.5",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      })
    );
    r.appendChild(n), i.appendChild(r), this.appendChild(i);
  }
}
class _e extends o {
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
    const e = this.combineClassNames(
      "hidden items-baseline gap-x-2 sm:flex",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "span",
      { class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class He extends o {
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
    this.isConnected && this.render();
  }
  /**
   * Renders the page number button
   * @returns {void}
   */
  render() {
    const e = this.getAttribute("href") || "#", t = this.hasAttribute("current"), s = this.textContent?.trim() || "1";
    this.innerHTML = "";
    const i = document.createElement("ui-button");
    i.setAttribute("href", e), i.setAttribute("plain", ""), i.setAttribute("aria-label", `Page ${s}`), t && i.setAttribute("aria-current", "page"), i.className = this.combineClassNames(
      "min-w-9 before:absolute before:-inset-px before:rounded-lg",
      t && "before:bg-zinc-950/5"
    );
    const r = this.createElement(
      "span",
      { class: "-mx-0.5" },
      s
    );
    i.appendChild(r), this.appendChild(i);
  }
}
class je extends o {
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
    const e = this.combineClassNames(
      "w-9 text-center text-sm/6 font-semibold select-none text-zinc-950",
      this.className
    );
    this.innerHTML = "";
    const t = this.createElement(
      "span",
      { "aria-hidden": "true", class: e },
      "…"
    );
    this.appendChild(t);
  }
}
l("ui-pagination", Te);
l("ui-pagination-previous", Me);
l("ui-pagination-next", Se);
l("ui-pagination-list", _e);
l("ui-pagination-page", He);
l("ui-pagination-gap", je);
const De = {
  // Hero banners
  "/assets/media/images/blue-green-waves-brown-beach.webp": L,
  "/assets/media/images/top-down-view-of-rocky-beach.webp": $,
  "/assets/media/images/birds-eye-view-of-coastal-town.webp": G
  // TODO: Uncomment once placeholder images are created:
  // "/assets/media/images/placeholder-jason.webp": placeholderJason,
  // "/assets/media/images/placeholder-avatar.webp": placeholderAvatar,
};
function T(a) {
  return De[a] || a;
}
const j = "/assets/media/images/placeholder-avatar.webp";
class Ie extends o {
  static get observedAttributes() {
    return ["name", "title", "image", "image-alt", "align", "variant"];
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback(e, t, s) {
    t !== s && this.isConnected && this.render();
  }
  /**
   * Renders the compact variant (for grid layouts)
   * @returns {HTMLElement} Compact card element
   */
  #e() {
    const e = this.getAttribute("name") || "Name", t = this.getAttribute("title") || "", s = this.getAttribute("image"), i = T(s || j), r = this.getAttribute("image-alt") || e, n = Array.from(this.childNodes);
    return this.h(
      "div",
      {
        class: this.clsx(
          "flex flex-col items-center text-center",
          "rounded-xl p-6 ring-1 transition-shadow"
        )
      },
      // Avatar
      this.h("img", {
        src: i,
        alt: r,
        class: this.clsx("w-32 h-32 rounded-full object-cover mb-4", "ring-4")
      }),
      // Name
      this.h(
        "h3",
        {
          class: "text-lg font-bold mb-1"
        },
        e
      ),
      // Title
      t && this.h(
        "p",
        {
          class: "text-sm font-semibold mb-4"
        },
        t
      ),
      // Bio content
      n.length > 0 && this.h(
        "div",
        {
          class: "text-sm text-left w-full"
        },
        ...n
      )
    );
  }
  /**
   * Renders the default variant (side-by-side layout)
   * @returns {HTMLElement} Default card element
   */
  #t() {
    const e = this.getAttribute("name") || "Name", t = this.getAttribute("title") || "", s = this.getAttribute("image"), i = T(s || j), r = this.getAttribute("image-alt") || e, n = this.getAttribute("align") || "left", h = Array.from(this.childNodes), c = this.clsx(
      "flex flex-col gap-8",
      "md:flex-row md:items-start md:gap-12",
      n === "right" && "md:flex-row-reverse",
      n === "center" && "md:flex-col md:items-center md:text-center"
    );
    return this.h(
      "div",
      { class: c },
      // Image container (40% width on desktop)
      this.h(
        "div",
        {
          class: this.clsx(
            "w-full shrink-0",
            n === "center" ? "md:w-64" : "md:w-2/5"
          )
        },
        this.h("img", {
          src: i,
          alt: r,
          class: this.clsx(
            "w-full rounded-lg shadow-xl object-cover",
            n === "center" ? "aspect-square" : "aspect-[4/5]"
          )
        })
      ),
      // Content container (60% width on desktop)
      this.h(
        "div",
        {
          class: this.clsx(
            "w-full",
            n === "center" ? "md:w-full" : "md:w-3/5"
          )
        },
        // Name
        this.h(
          "h3",
          {
            class: "text-3xl font-bold mb-3"
          },
          e
        ),
        // Title
        t && this.h(
          "p",
          {
            class: "text-xl font-semibold mb-6"
          },
          t
        ),
        // Bio content with prose styling
        h.length > 0 && this.h(
          "div",
          {
            class: this.clsx("prose prose-zinc", "prose-headings")
          },
          ...h
        )
      )
    );
  }
  render() {
    const e = this.getAttribute("variant") || "default", t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = e === "compact" ? this.#e() : this.#t();
    this.appendChild(s);
    const i = s.querySelector(
      e === "compact" ? ".text-left" : ".prose"
    );
    if (i) {
      i.innerHTML = "";
      for (const r of t)
        i.appendChild(r.cloneNode(!0));
    }
  }
}
l("profile-card", Ie);
class Oe extends o {
  static get observedAttributes() {
    return ["quote", "author", "role", "avatar"];
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback(e, t, s) {
    t !== s && this.isConnected && this.render();
  }
  /**
   * Creates the quote icon SVG
   * @returns {SVGElement} Quote icon
   */
  #e() {
    return this.svg(
      "svg",
      {
        class: "w-12 h-12 mb-4",
        fill: "currentColor",
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      },
      this.svg("path", {
        d: "M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
      })
    );
  }
  render() {
    const e = this.getAttribute("quote") || "", t = this.getAttribute("author") || "", s = this.getAttribute("role") || "", i = this.getAttribute("avatar"), r = this.h(
      "div",
      {
        class: this.clsx(
          "rounded-xl shadow-lg p-8",
          "ring-1 ring-zinc-950/5",
          "transition-shadow",
          "h-full flex flex-col"
        )
      },
      // Quote icon
      this.#e(),
      // Quote text
      e && this.h(
        "blockquote",
        {
          class: "text-lg mb-6 italic flex-grow"
        },
        `"${e}"`
      ),
      // Author section
      (t || s) && this.h(
        "div",
        {
          class: "flex items-center gap-4 mt-auto"
        },
        // Avatar (if provided)
        i && this.h("img", {
          src: i,
          alt: t,
          class: "w-12 h-12 rounded-full object-cover ring-2 ring-cyan-500/20"
        }),
        // Author info
        this.h(
          "div",
          {},
          t && this.h(
            "p",
            {
              class: "font-semibold"
            },
            t
          ),
          s && this.h(
            "p",
            {
              class: "text-sm"
            },
            s
          )
        )
      )
    );
    this.innerHTML = "", this.appendChild(r);
  }
}
l("quote-card", Oe);
class Be extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the sidebar container
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames(
      "flex h-full min-h-0 flex-col",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "nav",
      { class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class Pe extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the sidebar header section
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames(
      "flex flex-col border-b border-soft p-4",
      "[&>[data-slot=section]+[data-slot=section]]:mt-2.5",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "div",
      { class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class Ve extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the sidebar body section
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames(
      "flex flex-1 flex-col overflow-y-auto p-4",
      "[&>[data-slot=section]+[data-slot=section]]:mt-8",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "div",
      { class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class Re extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the sidebar footer section
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames(
      "flex flex-col border-t border-soft p-4",
      "[&>[data-slot=section]+[data-slot=section]]:mt-2.5",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "div",
      { class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class Fe extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the sidebar section container
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames(
      "flex flex-col gap-0.5",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "div",
      { "data-slot": "section", class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class Ge extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the sidebar divider element
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames(
      "my-4 border-t border-soft lg:-mx-4",
      this.className
    );
    this.innerHTML = "";
    const t = this.createElement("hr", { class: e });
    this.appendChild(t);
  }
}
class $e extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the sidebar spacer element
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames("mt-8 flex-1", this.className);
    this.innerHTML = "";
    const t = this.createElement("div", {
      "aria-hidden": "true",
      class: e
    });
    this.appendChild(t);
  }
}
class We extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the sidebar heading element
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames(
      "mb-1 px-2 text-xs/6 font-medium text-muted",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "h3",
      { class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class Ke extends o {
  #e = null;
  static get observedAttributes() {
    return ["href", "current"];
  }
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render(), this.initializeHoverStateTracking(this.#e);
  }
  /**
   * Called when observed attributes change
   * @returns {void}
   */
  attributeChangedCallback() {
    this.isConnected && this.render();
  }
  /**
   * Renders the sidebar item element
   * @returns {void}
   */
  render() {
    const e = this.getAttribute("href"), t = this.hasAttribute("current"), s = this.combineClassNames("relative", this.className), i = this.combineClassNames(
      "flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-canvas sm:py-2 sm:text-sm/5",
      "[&_[data-slot=icon]]:size-6 [&_[data-slot=icon]]:shrink-0 [&_[data-slot=icon]]:fill-zinc-500 sm:[&_[data-slot=icon]]:size-5",
      "[&:last-child_[data-slot=icon]]:ml-auto [&:last-child_[data-slot=icon]]:size-5 sm:[&:last-child_[data-slot=icon]]:size-4",
      "[&_[data-slot=avatar]]:-m-0.5 [&_[data-slot=avatar]]:size-7 sm:[&_[data-slot=avatar]]:size-6",
      "[&[data-hover]]:bg-depth-1 [&[data-hover]_[data-slot=icon]]:fill-zinc-950",
      "[&[data-active]_[data-slot=icon]]:fill-zinc-950",
      "[&[data-current]_[data-slot=icon]]:fill-zinc-950",
      !e && "cursor-default"
    ), r = Array.from(this.childNodes);
    this.innerHTML = "";
    const n = this.createElement("span", {
      class: s
    });
    if (t) {
      const c = this.createElement("span", {
        class: "absolute inset-y-2 -left-4 w-0.5 rounded-full bg-zinc-950"
      });
      n.appendChild(c);
    }
    const h = this.createInteractiveElement(
      e,
      {
        class: i,
        "data-current": t ? "true" : void 0,
        ref: (c) => {
          this.#e = c;
        }
      },
      this.createElement("span", {
        class: "absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden",
        "aria-hidden": "true"
      }),
      ...r
    );
    n.appendChild(h), this.appendChild(n);
  }
}
class Ue extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the sidebar label element
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames("truncate", this.className), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "span",
      { class: e },
      ...t
    );
    this.appendChild(s);
  }
}
l("ui-sidebar", Be);
l("ui-sidebar-header", Pe);
l("ui-sidebar-body", Ve);
l("ui-sidebar-footer", Re);
l("ui-sidebar-section", Fe);
l("ui-sidebar-divider", Ge);
l("ui-sidebar-spacer", $e);
l("ui-sidebar-heading", We);
l("ui-sidebar-item", Ke);
l("ui-sidebar-label", Ue);
function Ye() {
  const a = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  return a.setAttribute("data-slot", "icon"), a.setAttribute("viewBox", "0 0 20 20"), a.setAttribute("aria-hidden", "true"), a.innerHTML = '<path d="M2 6.75C2 6.33579 2.33579 6 2.75 6H17.25C17.6642 6 18 6.33579 18 6.75C18 7.16421 17.6642 7.5 17.25 7.5H2.75C2.33579 7.5 2 7.16421 2 6.75ZM2 13.25C2 12.8358 2.33579 12.5 2.75 12.5H17.25C17.6642 12.5 18 12.8358 18 13.25C18 13.6642 17.6642 14 17.25 14H2.75C2.33579 14 2 13.6642 2 13.25Z" />', a;
}
function Ze() {
  const a = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  return a.setAttribute("data-slot", "icon"), a.setAttribute("viewBox", "0 0 20 20"), a.setAttribute("aria-hidden", "true"), a.innerHTML = '<path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />', a;
}
class Xe extends o {
  constructor() {
    super(), this._isOpen = !1, this._focusTrap = null;
  }
  connectedCallback() {
    this.render(), this._setupKeyboardClose();
  }
  disconnectedCallback() {
    this._focusTrap?.deactivate(), document.removeEventListener("keydown", this._handleEscape);
  }
  _setupKeyboardClose() {
    this._handleEscape = (e) => {
      e.key === "Escape" && this._isOpen && this.closeSidebar();
    }, document.addEventListener("keydown", this._handleEscape);
  }
  openSidebar() {
    this._isOpen = !0, this._updateMobileSidebar(), this.emit("sidebar-open");
  }
  closeSidebar() {
    this._isOpen = !1, this._updateMobileSidebar(), this.emit("sidebar-close");
  }
  _updateMobileSidebar() {
    const e = this._mobileSidebar, t = this._backdrop, s = this._panel;
    !e || !t || !s || (this._isOpen ? (e.classList.remove("hidden"), e.setAttribute("aria-hidden", "false"), requestAnimationFrame(() => {
      t.classList.remove("opacity-0"), s.classList.remove("-translate-x-full");
    }), this._focusTrap = new q(s), this._focusTrap.activate(), document.body.style.overflow = "hidden") : (t.classList.add("opacity-0"), s.classList.add("-translate-x-full"), setTimeout(() => {
      e.classList.add("hidden"), e.setAttribute("aria-hidden", "true");
    }, 200), this._focusTrap?.deactivate(), this._focusTrap = null, document.body.style.overflow = ""));
  }
  render() {
    const e = this.querySelector('[slot="sidebar"]'), t = this.querySelector('[slot="navbar"]'), s = Array.from(this.childNodes).filter(
      (u) => !u.slot || u.slot !== "sidebar" && u.slot !== "navbar"
    );
    this.innerHTML = "";
    const i = this.h("div", {
      class: "relative isolate flex min-h-svh w-full max-lg:flex-col lg:bg-zinc-100"
    }), r = this.h("div", {
      class: "fixed inset-y-0 left-0 w-64 max-lg:hidden overflow-y-auto"
    });
    if (e) {
      const u = e.cloneNode(!0);
      u.removeAttribute("slot"), r.appendChild(u);
    }
    i.appendChild(r);
    const n = this.h("div", {
      class: "lg:hidden hidden",
      role: "dialog",
      "aria-modal": "true",
      "aria-hidden": "true",
      ref: (u) => {
        this._mobileSidebar = u;
      }
    }), h = this.h("div", {
      class: "fixed inset-0 transition-opacity duration-300 ease-out opacity-0",
      ref: (u) => {
        this._backdrop = u;
      },
      onClick: () => this.closeSidebar()
    });
    n.appendChild(h);
    const c = this.h("div", {
      class: "fixed inset-y-0 w-full max-w-80 p-2 transition-transform duration-300 ease-in-out -translate-x-full",
      ref: (u) => {
        this._panel = u;
      }
    }), m = this.h("div", {
      class: "flex h-full flex-col rounded-lg shadow-sm ring-1 ring-zinc-950/5 bg-white"
    }), b = this.h("div", { class: "-mb-3 px-4 pt-3" }), p = document.createElement("ui-navbar-item");
    if (p.setAttribute("aria-label", "Close navigation"), p.appendChild(Ze()), p.addEventListener("click", () => this.closeSidebar()), b.appendChild(p), m.appendChild(b), e) {
      const u = e.cloneNode(!0);
      u.removeAttribute("slot"), m.appendChild(u);
    }
    c.appendChild(m), n.appendChild(c), i.appendChild(n);
    const f = this.h("header", {
      class: "flex items-center px-4 lg:hidden"
    }), x = this.h("div", { class: "py-2.5" }), g = document.createElement("ui-navbar-item");
    g.setAttribute("aria-label", "Open navigation"), g.appendChild(Ye()), g.addEventListener("click", () => this.openSidebar()), x.appendChild(g), f.appendChild(x);
    const v = this.h("div", { class: "min-w-0 flex-1" });
    if (t) {
      const u = t.cloneNode(!0);
      u.removeAttribute("slot"), v.appendChild(u);
    }
    f.appendChild(v), i.appendChild(f);
    const w = this.h("main", {
      class: "flex flex-1 flex-col pb-2 lg:min-w-0 lg:pt-2 lg:pr-2 lg:pl-64"
    }), y = this.h("div", {
      class: "grow p-6 lg:rounded-lg lg:p-10 lg:shadow-sm lg:ring-1 lg:ring-zinc-950/5 lg:bg-white"
    }), C = this.h("div", { class: "mx-auto max-w-6xl" });
    for (const u of s)
      C.appendChild(u);
    y.appendChild(C), w.appendChild(y), i.appendChild(w), this.appendChild(i);
  }
}
l("ui-sidebar-layout", Xe);
const D = {
  "dark/zinc": "[--switch-bg-ring:theme(colors.zinc.950/90%)] [--switch-bg:theme(colors.zinc.900)]",
  "dark/white": "[--switch-bg-ring:theme(colors.zinc.950/90%)] [--switch-bg:theme(colors.zinc.900)]",
  zinc: "[--switch-bg-ring:theme(colors.zinc.700/90%)] [--switch-bg:theme(colors.zinc.600)]",
  white: "[--switch-bg-ring:theme(colors.black/15%)] [--switch-bg:white]",
  red: "[--switch-bg-ring:theme(colors.red.700/90%)] [--switch-bg:theme(colors.red.600)]",
  orange: "[--switch-bg-ring:theme(colors.orange.600/90%)] [--switch-bg:theme(colors.orange.500)]",
  amber: "[--switch-bg-ring:theme(colors.amber.500/80%)] [--switch-bg:theme(colors.amber.400)]",
  yellow: "[--switch-bg-ring:theme(colors.yellow.400/80%)] [--switch-bg:theme(colors.yellow.300)]",
  lime: "[--switch-bg-ring:theme(colors.lime.400/80%)] [--switch-bg:theme(colors.lime.300)]",
  green: "[--switch-bg-ring:theme(colors.green.700/90%)] [--switch-bg:theme(colors.green.600)]",
  emerald: "[--switch-bg-ring:theme(colors.emerald.600/90%)] [--switch-bg:theme(colors.emerald.500)]",
  teal: "[--switch-bg-ring:theme(colors.teal.700/90%)] [--switch-bg:theme(colors.teal.600)]",
  cyan: "[--switch-bg-ring:theme(colors.cyan.400/80%)] [--switch-bg:theme(colors.cyan.300)]",
  sky: "[--switch-bg-ring:theme(colors.sky.600/80%)] [--switch-bg:theme(colors.sky.500)]",
  blue: "[--switch-bg-ring:theme(colors.blue.700/90%)] [--switch-bg:theme(colors.blue.600)]",
  indigo: "[--switch-bg-ring:theme(colors.indigo.600/90%)] [--switch-bg:theme(colors.indigo.500)]",
  violet: "[--switch-bg-ring:theme(colors.violet.600/90%)] [--switch-bg:theme(colors.violet.500)]",
  purple: "[--switch-bg-ring:theme(colors.purple.600/90%)] [--switch-bg:theme(colors.purple.500)]",
  fuchsia: "[--switch-bg-ring:theme(colors.fuchsia.600/90%)] [--switch-bg:theme(colors.fuchsia.500)]",
  pink: "[--switch-bg-ring:theme(colors.pink.600/90%)] [--switch-bg:theme(colors.pink.500)]",
  rose: "[--switch-bg-ring:theme(colors.rose.600/90%)] [--switch-bg:theme(colors.rose.500)]"
};
class Je extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the switch group container
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames(
      "space-y-3 [&_[data-slot=label]]:font-normal",
      "[&:has([data-slot=description])]:space-y-6",
      "[&:has([data-slot=description])_[data-slot=label]]:font-medium",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "div",
      { "data-slot": "control", class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class Qe extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the switch field container
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames(
      "grid grid-cols-[1fr_auto] gap-x-8 gap-y-1 sm:grid-cols-[1fr_auto]",
      "[&>[data-slot=control]]:col-start-2 [&>[data-slot=control]]:self-start sm:[&>[data-slot=control]]:mt-0.5",
      "[&>[data-slot=label]]:col-start-1 [&>[data-slot=label]]:row-start-1",
      "[&>[data-slot=description]]:col-start-1 [&>[data-slot=description]]:row-start-2",
      "[&:has([data-slot=description])_[data-slot=label]]:font-medium",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "div",
      { "data-slot": "field", class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class et extends o {
  #e = null;
  #t = null;
  static get observedAttributes() {
    return ["color", "name", "checked", "disabled"];
  }
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render(), this.#s();
  }
  /**
   * Called when observed attributes change
   * @returns {void}
   */
  attributeChangedCallback() {
    this.isConnected && this.render();
  }
  /**
   * Gets the checked state of the switch
   * @returns {boolean} Whether switch is on
   */
  get checked() {
    return this.#e?.checked || !1;
  }
  /**
   * Sets the checked state of the switch
   * @param {boolean} value - New checked state
   */
  set checked(e) {
    this.#e && (this.#e.checked = e, this.#i());
  }
  /**
   * Sets up click and keyboard event listeners
   * @returns {void}
   */
  #s() {
    this.addEventListener("click", (e) => {
      if (this.hasAttribute("disabled")) {
        e.preventDefault();
        return;
      }
      this.checked = !this.checked, this.dispatchEvent(new Event("change", { bubbles: !0 }));
    }), this.addEventListener("keydown", (e) => {
      (e.key === " " || e.key === "Enter") && !this.hasAttribute("disabled") && (e.preventDefault(), this.checked = !this.checked, this.dispatchEvent(new Event("change", { bubbles: !0 })));
    });
  }
  /**
   * Synchronizes the visual state with the input state
   * @returns {void}
   */
  #i() {
    this.#e?.checked ? this.#t?.setAttribute("data-checked", "") : this.#t?.removeAttribute("data-checked");
  }
  /**
   * Renders the switch element
   * @returns {void}
   */
  render() {
    const e = this.getAttribute("color") || "dark/zinc", t = this.getAttribute("name"), s = this.hasAttribute("checked"), i = this.hasAttribute("disabled"), r = this.combineClassNames(
      "group relative isolate inline-flex h-6 w-10 cursor-pointer rounded-full p-[3px] sm:h-5 sm:w-8",
      "transition duration-0 ease-in-out",
      "ring-1 ring-black/5 ring-inset bg-zinc-200",
      "[&[data-checked]]:bg-[var(--switch-bg)] [&[data-checked]]:ring-[var(--switch-bg-ring)]",
      i && "opacity-50 cursor-not-allowed [&[data-checked]]:[&[data-checked]]:ring-black/5",
      D[e] || D["dark/zinc"]
    ), n = this.combineClassNames(
      "pointer-events-none relative inline-block size-[1.125rem] rounded-full sm:size-3.5",
      "translate-x-0 transition duration-200 ease-in-out",
      "border border-transparent",
      "shadow-sm ring-1 ring-black/5",
      "[.group[data-checked]_&]:bg-[var(--switch)] [.group[data-checked]_&]:shadow-[var(--switch-shadow)] [.group[data-checked]_&]:ring-[var(--switch-ring)]",
      "[.group[data-checked]_&]:translate-x-4 sm:[.group[data-checked]_&]:translate-x-3",
      i && "[.group[data-checked]_&]:[.group[data-checked]_&]:shadow-sm [.group[data-checked]_&]:ring-black/5"
    );
    this.innerHTML = "";
    const h = this.createElement("input", {
      type: "checkbox",
      name: t || void 0,
      checked: s || void 0,
      disabled: i || void 0,
      class: "sr-only",
      ref: (b) => {
        this.#e = b;
      }
    });
    h.addEventListener(
      "focus",
      () => this.#t?.classList.add("focus-visible")
    ), h.addEventListener(
      "blur",
      () => this.#t?.classList.remove("focus-visible")
    );
    const c = this.createElement("span", {
      "aria-hidden": "true",
      class: n
    }), m = this.createElement(
      "button",
      {
        "data-slot": "control",
        type: "button",
        role: "switch",
        "aria-checked": s ? "true" : "false",
        "aria-disabled": i ? "true" : void 0,
        "data-checked": s ? "" : void 0,
        "data-disabled": i ? "" : void 0,
        class: r,
        disabled: i || void 0,
        ref: (b) => {
          this.#t = b;
        }
      },
      h,
      c
    );
    this.appendChild(m);
  }
}
l("ui-switch-group", Je);
l("ui-switch-field", Qe);
l("ui-switch", et);
const tt = [
  "relative isolate flex size-[1.125rem] items-center justify-center rounded-[0.3125rem] sm:size-4",
  "before:absolute before:inset-0 before:-z-10 before:rounded-[calc(0.3125rem-1px)] before:bg-white before:shadow-sm",
  "[.group[data-checked]_&]:before:bg-[var(--checkbox-checked-bg)]",
  "border border-zinc-950/15 [.group[data-checked]_&]:border-transparent",
  "[.group[data-checked]_&]:bg-[var(--checkbox-checked-border)]",
  "after:absolute after:inset-0 after:rounded-[calc(0.3125rem-1px)] after:shadow-[inset_0_1px_theme(colors.white/15%)]",
  "[.group[data-disabled]_&]:opacity-50",
  "[.group[data-disabled]_&]:border-zinc-950/25 [.group[data-disabled]_&]:bg-zinc-950/5",
  "[.group[data-disabled]_&]:[--checkbox-check:theme(colors.zinc.950/50%)] [.group[data-disabled]_&]:before:bg-transparent"
].join(" "), I = {
  "dark/zinc": "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.zinc.900)] [--checkbox-checked-border:theme(colors.zinc.950/90%)]",
  "dark/white": "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.zinc.900)] [--checkbox-checked-border:theme(colors.zinc.950/90%)]",
  white: "[--checkbox-check:theme(colors.zinc.900)] [--checkbox-checked-bg:white] [--checkbox-checked-border:theme(colors.zinc.950/15%)]",
  zinc: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.zinc.600)] [--checkbox-checked-border:theme(colors.zinc.700/90%)]",
  red: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.red.600)] [--checkbox-checked-border:theme(colors.red.700/90%)]",
  orange: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.orange.500)] [--checkbox-checked-border:theme(colors.orange.600/90%)]",
  amber: "[--checkbox-check:theme(colors.amber.950)] [--checkbox-checked-bg:theme(colors.amber.400)] [--checkbox-checked-border:theme(colors.amber.500/80%)]",
  yellow: "[--checkbox-check:theme(colors.yellow.950)] [--checkbox-checked-bg:theme(colors.yellow.300)] [--checkbox-checked-border:theme(colors.yellow.400/80%)]",
  lime: "[--checkbox-check:theme(colors.lime.950)] [--checkbox-checked-bg:theme(colors.lime.300)] [--checkbox-checked-border:theme(colors.lime.400/80%)]",
  green: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.green.600)] [--checkbox-checked-border:theme(colors.green.700/90%)]",
  emerald: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.emerald.600)] [--checkbox-checked-border:theme(colors.emerald.700/90%)]",
  teal: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.teal.600)] [--checkbox-checked-border:theme(colors.teal.700/90%)]",
  cyan: "[--checkbox-check:theme(colors.cyan.950)] [--checkbox-checked-bg:theme(colors.cyan.300)] [--checkbox-checked-border:theme(colors.cyan.400/80%)]",
  sky: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.sky.500)] [--checkbox-checked-border:theme(colors.sky.600/80%)]",
  blue: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.blue.600)] [--checkbox-checked-border:theme(colors.blue.700/90%)]",
  indigo: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.indigo.500)] [--checkbox-checked-border:theme(colors.indigo.600/90%)]",
  violet: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.violet.500)] [--checkbox-checked-border:theme(colors.violet.600/90%)]",
  purple: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.purple.500)] [--checkbox-checked-border:theme(colors.purple.600/90%)]",
  fuchsia: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.fuchsia.500)] [--checkbox-checked-border:theme(colors.fuchsia.600/90%)]",
  pink: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.pink.500)] [--checkbox-checked-border:theme(colors.pink.600/90%)]",
  rose: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.rose.500)] [--checkbox-checked-border:theme(colors.rose.600/90%)]"
};
class st extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the checkbox group container
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames(
      "space-y-3",
      "[&:has([data-slot=description])]:space-y-6",
      "[&:has([data-slot=description])_[data-slot=label]]:font-medium",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "div",
      { "data-slot": "control", class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class it extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the checkbox field container
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames(
      "grid grid-cols-[1.125rem_1fr] gap-x-4 gap-y-1 sm:grid-cols-[1rem_1fr]",
      "[&>[data-slot=control]]:col-start-1 [&>[data-slot=control]]:row-start-1 [&>[data-slot=control]]:mt-[3px] sm:[&>[data-slot=control]]:mt-1",
      "[&>[data-slot=label]]:col-start-2 [&>[data-slot=label]]:row-start-1",
      "[&>[data-slot=description]]:col-start-2 [&>[data-slot=description]]:row-start-2",
      "[&:has([data-slot=description])_[data-slot=label]]:font-medium",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "div",
      { "data-slot": "field", class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class at extends o {
  #e = null;
  #t = null;
  static get observedAttributes() {
    return ["color", "name", "value", "checked", "indeterminate", "disabled"];
  }
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render(), this.#s();
  }
  /**
   * Called when observed attributes change
   * @returns {void}
   */
  attributeChangedCallback() {
    this.isConnected && this.render();
  }
  /**
   * Gets the checked state of the checkbox
   * @returns {boolean} Whether checkbox is checked
   */
  get checked() {
    return this.#e?.checked || !1;
  }
  /**
   * Sets the checked state of the checkbox
   * @param {boolean} value - New checked state
   */
  set checked(e) {
    this.#e && (this.#e.checked = e, this.#i());
  }
  /**
   * Sets up click and keyboard event listeners
   * @returns {void}
   */
  #s() {
    this.addEventListener("click", (e) => {
      if (this.hasAttribute("disabled")) {
        e.preventDefault();
        return;
      }
      (e.target === this || e.target === this.#t) && this.#e?.click();
    }), this.addEventListener("keydown", (e) => {
      e.key === " " && !this.hasAttribute("disabled") && (e.preventDefault(), this.#e?.click());
    });
  }
  /**
   * Synchronizes the visual state with the input state
   * @returns {void}
   */
  #i() {
    const e = this.#e?.checked, t = this.#e?.indeterminate;
    e ? this.#t?.setAttribute("data-checked", "") : this.#t?.removeAttribute("data-checked"), t ? this.#t?.setAttribute("data-indeterminate", "") : this.#t?.removeAttribute("data-indeterminate");
  }
  /**
   * Renders the checkbox element
   * @returns {void}
   */
  render() {
    const e = this.getAttribute("color") || "dark/zinc", t = this.getAttribute("name"), s = this.getAttribute("value"), i = this.hasAttribute("checked"), r = this.hasAttribute("indeterminate"), n = this.hasAttribute("disabled"), h = this.combineClassNames(
      "group inline-flex cursor-pointer",
      n && "cursor-not-allowed"
    ), c = this.combineClassNames(
      tt,
      I[e] || I["dark/zinc"]
    );
    this.innerHTML = "";
    const m = this.createElement("input", {
      type: "checkbox",
      name: t || void 0,
      value: s || void 0,
      checked: i || void 0,
      disabled: n || void 0,
      class: "sr-only",
      ref: (f) => {
        this.#e = f, r && (f.indeterminate = !0);
      }
    });
    m.addEventListener(
      "change",
      () => this.#i()
    ), m.addEventListener(
      "focus",
      () => this.#t?.classList.add("focus-visible")
    ), m.addEventListener(
      "blur",
      () => this.#t?.classList.remove("focus-visible")
    );
    const b = this.createElement(
      "span",
      { class: c },
      this.createSVGElement(
        "svg",
        {
          class: "size-4 stroke-[var(--checkbox-check)] opacity-0 sm:h-3.5 sm:w-3.5",
          viewBox: "0 0 14 14",
          fill: "none"
        },
        this.createSVGElement("path", {
          class: "opacity-100 [.group[data-indeterminate]_&]:opacity-0",
          d: "M3 8L6 11L11 3.5",
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }),
        this.createSVGElement("path", {
          class: "opacity-0 [.group[data-indeterminate]_&]:opacity-100",
          d: "M3 7H11",
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        })
      )
    ), p = this.createElement(
      "span",
      {
        "data-slot": "control",
        class: h,
        tabindex: n ? void 0 : "0",
        role: "checkbox",
        "aria-checked": i ? "true" : r ? "mixed" : "false",
        "aria-disabled": n ? "true" : void 0,
        "data-checked": i ? "" : void 0,
        "data-indeterminate": r ? "" : void 0,
        "data-disabled": n ? "" : void 0,
        ref: (f) => {
          this.#t = f;
        }
      },
      m,
      b
    );
    this.appendChild(p);
  }
}
l("ui-checkbox-group", st);
l("ui-checkbox-field", it);
l("ui-checkbox", at);
class rt extends o {
  connectedCallback() {
    this.render();
  }
  render() {
    const e = this.clsx(
      "grid grid-cols-1 text-base/6",
      "sm:grid-cols-[min(50%,20rem)_auto] sm:text-sm/6",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.h("dl", { class: e }, ...t);
    this.appendChild(s);
  }
}
class nt extends o {
  connectedCallback() {
    this.render();
  }
  render() {
    const e = this.clsx(
      "col-start-1 border-t pt-3 text-zinc-500",
      "first:border-none",
      "sm:border-t sm:py-3",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.h("dt", { class: e }, ...t);
    this.appendChild(s);
  }
}
class ot extends o {
  connectedCallback() {
    this.render();
  }
  render() {
    const e = this.clsx(
      "pt-1 pb-3 text-zinc-950",
      "sm:border-t sm:py-3 sm:[&:nth-child(2)]:border-none",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.h("dd", { class: e }, ...t);
    this.appendChild(s);
  }
}
l("ui-description-list", rt);
l("ui-description-term", nt);
l("ui-description-details", ot);
const O = {
  xs: "sm:max-w-xs",
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
  "3xl": "sm:max-w-3xl",
  "4xl": "sm:max-w-4xl",
  "5xl": "sm:max-w-5xl"
};
class lt extends o {
  #e = !1;
  #t = null;
  #s = null;
  #i = null;
  #r = null;
  #a = null;
  static get observedAttributes() {
    return ["size", "open"];
  }
  /**
   * Creates a new UIDialog instance
   */
  constructor() {
    super(), this.#a = this.#l.bind(this);
  }
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render(), this.#n(), this.hasAttribute("open") && this.open();
  }
  /**
   * Called when element is disconnected from the DOM
   * @returns {void}
   */
  disconnectedCallback() {
    this.#t?.deactivate(), document.removeEventListener("keydown", this.#a);
  }
  /**
   * Called when observed attributes change
   * @param {string} name - Attribute name
   * @param {string} oldValue - Previous value
   * @param {string} newValue - New value
   * @returns {void}
   */
  attributeChangedCallback(e, t, s) {
    e === "open" ? s !== null ? this.open() : this.close() : this.isConnected && this.render();
  }
  /**
   * Sets up keyboard listener for Escape key to close dialog
   * @returns {void}
   */
  #n() {
    document.addEventListener("keydown", this.#a);
  }
  /**
   * Handles Escape key press to close dialog
   * @param {KeyboardEvent} event - Keyboard event
   * @returns {void}
   */
  #l(e) {
    e.key === "Escape" && this.#e && this.close();
  }
  /**
   * Opens the dialog
   * @returns {void}
   */
  open() {
    this.#e || (this.#e = !0, this.#o(), this.emit("dialog-open"));
  }
  /**
   * Closes the dialog
   * @returns {void}
   */
  close() {
    this.#e && (this.#e = !1, this.#o(), this.emit("dialog-close"));
  }
  /**
   * Updates the visual state of the dialog based on open/closed status
   * @returns {void}
   */
  #o() {
    const e = this.#s, t = this.#i, s = this.#r;
    !e || !t || !s || (this.#e ? (e.classList.remove("hidden"), e.setAttribute("aria-hidden", "false"), requestAnimationFrame(() => {
      t.classList.remove("opacity-0"), s.classList.remove(
        "translate-y-12",
        "opacity-0",
        "scale-95"
      );
    }), this.#t = new q(s), this.#t.activate(), document.body.style.overflow = "hidden") : (t.classList.add("opacity-0"), s.classList.add("translate-y-12", "opacity-0"), setTimeout(() => {
      e.classList.add("hidden"), e.setAttribute("aria-hidden", "true");
    }, 100), this.#t?.deactivate(), this.#t = null, document.body.style.overflow = "", this.removeAttribute("open")));
  }
  /**
   * Renders the dialog element
   * @returns {void}
   */
  render() {
    const e = this.getAttribute("size") || "lg", t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement("div", {
      class: "hidden",
      role: "dialog",
      "aria-modal": "true",
      "aria-hidden": "true",
      ref: (c) => {
        this.#s = c;
      }
    }), i = this.createElement("div", {
      class: this.combineClassNames(
        "fixed inset-0 flex w-screen justify-center overflow-y-auto",
        "px-2 py-2 transition duration-100 ease-out",
        "opacity-0",
        "sm:px-6 sm:py-8 lg:px-8 lg:py-16",
        "bg-zinc-950/25"
      ),
      ref: (c) => {
        this.#i = c;
      },
      onClick: (c) => {
        c.target === c.currentTarget && this.close();
      }
    }), r = this.createElement("div", {
      class: "fixed inset-0 w-screen overflow-y-auto pt-6 sm:pt-0"
    }), n = this.createElement("div", {
      class: "grid min-h-full grid-rows-[1fr_auto] justify-items-center sm:grid-rows-[1fr_auto_3fr] sm:p-4"
    }), h = this.createElement("div", {
      class: this.combineClassNames(
        O[e] || O.lg,
        "row-start-2 w-full min-w-0 rounded-t-3xl bg-canvas p-8 shadow-lg",
        "ring-1 border-soft sm:mb-auto sm:rounded-2xl",
        "transition duration-100 will-change-transform translate-y-12 opacity-0",
        "sm:translate-y-0 sm:scale-95"
      ),
      ref: (c) => {
        this.#r = c;
      }
    });
    for (const c of t)
      h.appendChild(c);
    n.appendChild(h), r.appendChild(n), s.appendChild(i), s.appendChild(r), this.appendChild(s);
  }
}
class ct extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the dialog title element
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames(
      "text-lg/6 font-semibold text-balance text-canvas sm:text-base/6",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "h2",
      { class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class dt extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the dialog description element
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames(
      "mt-2 text-pretty text-base/6 text-muted sm:text-sm/6",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "p",
      { class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class ht extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the dialog body element
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames("mt-6", this.className), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "div",
      { class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class mt extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the dialog actions element
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames(
      "mt-8 flex flex-col-reverse items-center justify-end gap-3",
      "[&>*]:w-full sm:flex-row sm:[&>*]:w-auto",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "div",
      { class: e },
      ...t
    );
    this.appendChild(s);
  }
}
l("ui-dialog", lt);
l("ui-dialog-title", ct);
l("ui-dialog-description", dt);
l("ui-dialog-body", ht);
l("ui-dialog-actions", mt);
class ut extends o {
  static get observedAttributes() {
    return ["disabled"];
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.isConnected && this.render();
  }
  render() {
    const e = this.hasAttribute("disabled"), t = this.clsx(
      "[&>*[data-slot=text]]:mt-1",
      "[&>*+[data-slot=control]]:mt-6",
      this.className
    ), s = Array.from(this.childNodes);
    this.innerHTML = "";
    const i = this.h(
      "fieldset",
      {
        class: t,
        disabled: e || void 0,
        "data-disabled": e ? "" : void 0
      },
      ...s
    );
    this.appendChild(i);
  }
}
class bt extends o {
  connectedCallback() {
    this.render();
  }
  render() {
    const e = this.clsx(
      "text-base/6 font-semibold text-canvas",
      "[fieldset[data-disabled]_&]:opacity-50",
      "sm:text-sm/6",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.h(
      "legend",
      { "data-slot": "legend", class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class pt extends o {
  connectedCallback() {
    this.render();
  }
  render() {
    const e = this.clsx("space-y-8", this.className), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.h(
      "div",
      { "data-slot": "control", class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class ft extends o {
  static get observedAttributes() {
    return ["disabled"];
  }
  connectedCallback() {
    this.render(), this._connectLabelToControl();
  }
  attributeChangedCallback() {
    this.isConnected && this.render();
  }
  _connectLabelToControl() {
    const e = this.querySelector("ui-label"), t = this.querySelector(
      "ui-input, ui-select, ui-textarea, ui-checkbox, ui-radio, ui-switch"
    );
    if (e && t) {
      const s = t.id || Z("field"), i = t.querySelector("input, select, textarea") || t._input || t._select || t._textarea;
      i && !i.id && (i.id = s);
      const r = e.querySelector("label");
      r && i && r.setAttribute("for", i.id);
    }
  }
  render() {
    const e = this.hasAttribute("disabled"), t = this.clsx(
      "[&>[data-slot=label]+[data-slot=control]]:mt-3",
      "[&>[data-slot=label]+[data-slot=description]]:mt-1",
      "[&>[data-slot=description]+[data-slot=control]]:mt-3",
      "[&>[data-slot=control]+[data-slot=description]]:mt-3",
      "[&>[data-slot=control]+[data-slot=error]]:mt-3",
      "[&>*[data-slot=label]]:font-medium",
      this.className
    ), s = Array.from(this.childNodes);
    this.innerHTML = "";
    const i = this.h(
      "div",
      {
        class: t,
        "data-disabled": e ? "" : void 0
      },
      ...s
    );
    this.appendChild(i);
  }
}
class gt extends o {
  connectedCallback() {
    this.render();
  }
  render() {
    const e = this.clsx(
      "text-base/6 text-canvas select-none",
      "[*[data-disabled]_&]:opacity-50",
      "sm:text-sm/6",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.h(
      "label",
      { "data-slot": "label", class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class xt extends o {
  connectedCallback() {
    this.render();
  }
  render() {
    const e = this.clsx(
      "text-base/6 text-muted",
      "[*[data-disabled]_&]:opacity-50",
      "sm:text-sm/6",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.h(
      "p",
      { "data-slot": "description", class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class vt extends o {
  connectedCallback() {
    this.render();
  }
  render() {
    const e = this.clsx(
      "text-base/6 text-red-600",
      "[*[data-disabled]_&]:opacity-50",
      "sm:text-sm/6",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.h(
      "p",
      { "data-slot": "error", class: e },
      ...t
    );
    this.appendChild(s);
  }
}
l("ui-fieldset", ut);
l("ui-legend", bt);
l("ui-field-group", pt);
l("ui-field", ft);
l("ui-label", gt);
l("ui-description", xt);
l("ui-error-message", vt);
class is extends o {
  static get observedAttributes() {
    return ["level"];
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.isConnected && this.render();
  }
  render() {
    const e = parseInt(this.getAttribute("level") || "1", 10), t = `h${Math.min(Math.max(e, 1), 6)}`, s = this.clsx(
      "text-2xl/8 font-semibold text-canvas sm:text-xl/8",
      this.className
    ), i = Array.from(this.childNodes);
    this.innerHTML = "";
    const r = this.h(t, { class: s });
    for (const n of i)
      r.appendChild(n);
    this.appendChild(r);
  }
}
class as extends o {
  static get observedAttributes() {
    return ["level"];
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.isConnected && this.render();
  }
  render() {
    const e = parseInt(this.getAttribute("level") || "2", 10), t = `h${Math.min(Math.max(e, 1), 6)}`, s = this.clsx(
      "text-base/7 font-semibold text-canvas sm:text-sm/6",
      this.className
    ), i = Array.from(this.childNodes);
    this.innerHTML = "";
    const r = this.h(t, { class: s });
    for (const n of i)
      r.appendChild(n);
    this.appendChild(r);
  }
}
l("ui-heading", UIHeading);
l("ui-subheading", UISubheading);
const Ct = ["date", "datetime-local", "month", "time", "week"];
class yt extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the input group container
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames(
      "relative isolate block",
      "[&:has([data-slot=icon]:first-child)_input]:pl-10 [&:has([data-slot=icon]:last-child)_input]:pr-10",
      "sm:[&:has([data-slot=icon]:first-child)_input]:pl-8 sm:[&:has([data-slot=icon]:last-child)_input]:pr-8",
      "[&>[data-slot=icon]]:pointer-events-none [&>[data-slot=icon]]:absolute [&>[data-slot=icon]]:top-3 [&>[data-slot=icon]]:z-10 [&>[data-slot=icon]]:size-5",
      "sm:[&>[data-slot=icon]]:top-2.5 sm:[&>[data-slot=icon]]:size-4",
      "[&>[data-slot=icon]:first-child]:left-3 sm:[&>[data-slot=icon]:first-child]:left-2.5",
      "[&>[data-slot=icon]:last-child]:right-3 sm:[&>[data-slot=icon]:last-child]:right-2.5",
      "[&>[data-slot=icon]]:text-muted"
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "span",
      { "data-slot": "control", class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class wt extends o {
  #e = null;
  static get observedAttributes() {
    return [
      "type",
      "name",
      "placeholder",
      "disabled",
      "invalid",
      "value",
      "required"
    ];
  }
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render(), this.#t();
  }
  /**
   * Called when observed attributes change
   * @returns {void}
   */
  attributeChangedCallback() {
    this.isConnected && this.render();
  }
  /**
   * Sets up focus delegation to inner input element
   * @returns {void}
   */
  #t() {
    this.addEventListener("focus", (e) => {
      e.target === this && this.#e?.focus();
    });
  }
  /**
   * Gets the current input value
   * @returns {string} Current value
   */
  get value() {
    return this.#e?.value || "";
  }
  /**
   * Sets the input value
   * @param {string} newValue - New value to set
   */
  set value(e) {
    this.#e && (this.#e.value = e);
  }
  /**
   * Renders the input element
   * @returns {void}
   */
  render() {
    const e = this.getAttribute("type") || "text", t = this.getAttribute("name"), s = this.getAttribute("placeholder"), i = this.hasAttribute("disabled"), r = this.hasAttribute("invalid"), n = this.getAttribute("value"), h = this.hasAttribute("required"), c = Ct.includes(e), m = this.combineClassNames(
      "relative block w-full",
      "before:absolute before:inset-px before:rounded-[calc(var(--radius-lg,0.5rem)-1px)] before:before:shadow-sm",
      "after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset",
      i && "opacity-50 before:before:shadow-none"
    ), b = this.combineClassNames(
      c && [
        "[&::-webkit-datetime-edit-fields-wrapper]:p-0",
        "[&::-webkit-date-and-time-value]:min-h-[1.5em]",
        "[&::-webkit-datetime-edit]:inline-flex",
        "[&::-webkit-datetime-edit]:p-0",
        "[&::-webkit-datetime-edit-year-field]:p-0",
        "[&::-webkit-datetime-edit-month-field]:p-0",
        "[&::-webkit-datetime-edit-day-field]:p-0",
        "[&::-webkit-datetime-edit-hour-field]:p-0",
        "[&::-webkit-datetime-edit-minute-field]:p-0",
        "[&::-webkit-datetime-edit-second-field]:p-0",
        "[&::-webkit-datetime-edit-millisecond-field]:p-0",
        "[&::-webkit-datetime-edit-meridiem-field]:p-0"
      ],
      "relative block w-full appearance-none rounded-lg",
      "px-[calc(var(--spacing,0.25rem)*3.5-1px)] py-[calc(var(--spacing,0.25rem)*2.5-1px)]",
      "sm:px-[calc(var(--spacing,0.25rem)*3-1px)] sm:py-[calc(var(--spacing,0.25rem)*1.5-1px)]",
      "text-base/6 text-canvas placeholder:text-muted sm:text-sm/6",
      "border border-zinc-950/10 bg-transparent",
      "focus:outline-none focus:ring-2 focus:ring-blue-500",
      r && "border-red-500",
      i && "opacity-50 cursor-not-allowed"
    );
    this.innerHTML = "";
    const p = this.createElement(
      "span",
      { "data-slot": "control", class: m },
      this.createElement("input", {
        type: e,
        name: t || void 0,
        placeholder: s || void 0,
        disabled: i || void 0,
        "data-invalid": r ? "" : void 0,
        "data-disabled": i ? "" : void 0,
        value: n || void 0,
        required: h || void 0,
        class: b,
        ref: (f) => {
          this.#e = f;
        }
      })
    );
    this.appendChild(p);
  }
}
l("ui-input-group", yt);
l("ui-input", wt);
const kt = [
  "relative isolate flex size-[1.1875rem] shrink-0 rounded-full sm:size-[1.0625rem]",
  "before:absolute before:inset-0 before:-z-10 before:rounded-full before:shadow-sm before:bg-white",
  "[.group[data-checked]_&]:before:bg-[var(--radio-checked-bg)]",
  "border border-zinc-950/15 [.group[data-checked]_&]:border-transparent",
  "after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_1px_theme(colors.white/15%)]",
  "[--radio-indicator:transparent] [.group[data-checked]_&]:[--radio-indicator:var(--radio-checked-indicator)]",
  "[.group[data-disabled]_&]:opacity-50",
  "[.group[data-disabled]_&]:bg-zinc-950/5"
].join(" "), B = {
  "dark/zinc": "[--radio-checked-bg:theme(colors.zinc.900)] [--radio-checked-border:theme(colors.zinc.950/90%)] [--radio-checked-indicator:white]",
  "dark/white": "[--radio-checked-bg:theme(colors.zinc.900)] [--radio-checked-border:theme(colors.zinc.950/90%)] [--radio-checked-indicator:white]",
  white: "[--radio-checked-bg:white] [--radio-checked-border:theme(colors.zinc.950/15%)] [--radio-checked-indicator:theme(colors.zinc.900)]",
  zinc: "[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.zinc.600)] [--radio-checked-border:theme(colors.zinc.700/90%)]",
  red: "[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.red.600)] [--radio-checked-border:theme(colors.red.700/90%)]",
  orange: "[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.orange.500)] [--radio-checked-border:theme(colors.orange.600/90%)]",
  amber: "[--radio-checked-bg:theme(colors.amber.400)] [--radio-checked-border:theme(colors.amber.500/80%)] [--radio-checked-indicator:theme(colors.amber.950)]",
  yellow: "[--radio-checked-bg:theme(colors.yellow.300)] [--radio-checked-border:theme(colors.yellow.400/80%)] [--radio-checked-indicator:theme(colors.yellow.950)]",
  lime: "[--radio-checked-bg:theme(colors.lime.300)] [--radio-checked-border:theme(colors.lime.400/80%)] [--radio-checked-indicator:theme(colors.lime.950)]",
  green: "[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.green.600)] [--radio-checked-border:theme(colors.green.700/90%)]",
  emerald: "[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.emerald.600)] [--radio-checked-border:theme(colors.emerald.700/90%)]",
  teal: "[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.teal.600)] [--radio-checked-border:theme(colors.teal.700/90%)]",
  cyan: "[--radio-checked-bg:theme(colors.cyan.300)] [--radio-checked-border:theme(colors.cyan.400/80%)] [--radio-checked-indicator:theme(colors.cyan.950)]",
  sky: "[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.sky.500)] [--radio-checked-border:theme(colors.sky.600/80%)]",
  blue: "[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.blue.600)] [--radio-checked-border:theme(colors.blue.700/90%)]",
  indigo: "[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.indigo.500)] [--radio-checked-border:theme(colors.indigo.600/90%)]",
  violet: "[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.violet.500)] [--radio-checked-border:theme(colors.violet.600/90%)]",
  purple: "[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.purple.500)] [--radio-checked-border:theme(colors.purple.600/90%)]",
  fuchsia: "[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.fuchsia.500)] [--radio-checked-border:theme(colors.fuchsia.600/90%)]",
  pink: "[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.pink.500)] [--radio-checked-border:theme(colors.pink.600/90%)]",
  rose: "[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.rose.500)] [--radio-checked-border:theme(colors.rose.600/90%)]"
};
class Et extends o {
  static get observedAttributes() {
    return ["name"];
  }
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render(), this.#e();
  }
  /**
   * Called when observed attributes change
   * @returns {void}
   */
  attributeChangedCallback() {
    this.isConnected && this.render();
  }
  /**
   * Sets up keyboard navigation for arrow keys within the group
   * @returns {void}
   */
  #e() {
    this.addEventListener("keydown", (e) => {
      const t = Array.from(
        this.querySelectorAll("ui-radio:not([disabled])")
      ), s = t.findIndex((r) => r.checked);
      let i = s;
      e.key === "ArrowDown" || e.key === "ArrowRight" ? (e.preventDefault(), i = (s + 1) % t.length) : (e.key === "ArrowUp" || e.key === "ArrowLeft") && (e.preventDefault(), i = (s - 1 + t.length) % t.length), i !== s && t[i] && (t[i].checked = !0, t[i].focus());
    });
  }
  /**
   * Renders the radio group container
   * @returns {void}
   */
  render() {
    const e = this.getAttribute("name"), t = this.combineClassNames(
      "space-y-3 [&_[data-slot=label]]:font-normal",
      "[&:has([data-slot=description])]:space-y-6",
      "[&:has([data-slot=description])_[data-slot=label]]:font-medium",
      this.className
    ), s = Array.from(this.childNodes);
    this.innerHTML = "";
    const i = this.createElement(
      "div",
      {
        "data-slot": "control",
        role: "radiogroup",
        class: t
      },
      ...s
    );
    this.appendChild(i), e && this.querySelectorAll("ui-radio").forEach((r) => {
      r.setAttribute("name", e);
    });
  }
}
class At extends o {
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Renders the radio field container
   * @returns {void}
   */
  render() {
    const e = this.combineClassNames(
      "grid grid-cols-[1.125rem_1fr] gap-x-4 gap-y-1 sm:grid-cols-[1rem_1fr]",
      "[&>[data-slot=control]]:col-start-1 [&>[data-slot=control]]:row-start-1 [&>[data-slot=control]]:mt-[3px] sm:[&>[data-slot=control]]:mt-1",
      "[&>[data-slot=label]]:col-start-2 [&>[data-slot=label]]:row-start-1",
      "[&>[data-slot=description]]:col-start-2 [&>[data-slot=description]]:row-start-2",
      "[&:has([data-slot=description])_[data-slot=label]]:font-medium",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement(
      "div",
      { "data-slot": "field", class: e },
      ...t
    );
    this.appendChild(s);
  }
}
class Nt extends o {
  #e = null;
  #t = null;
  static get observedAttributes() {
    return ["color", "name", "value", "checked", "disabled"];
  }
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render(), this.#s();
  }
  /**
   * Called when observed attributes change
   * @returns {void}
   */
  attributeChangedCallback() {
    this.isConnected && this.render();
  }
  /**
   * Gets the checked state of the radio
   * @returns {boolean} Whether radio is checked
   */
  get checked() {
    return this.#e?.checked || !1;
  }
  /**
   * Sets the checked state of the radio
   * @param {boolean} value - New checked state
   */
  set checked(e) {
    if (this.#e && (this.#e.checked = e, this.#i(), e)) {
      const t = this.closest("ui-radio-group");
      t && t.querySelectorAll("ui-radio").forEach((s) => {
        s !== this && (s.#e.checked = !1, s.#i());
      }), this.dispatchEvent(new Event("change", { bubbles: !0 }));
    }
  }
  /**
   * Focuses the radio element
   * @returns {void}
   */
  focus() {
    this.#t?.focus();
  }
  /**
   * Sets up click and keyboard event listeners
   * @returns {void}
   */
  #s() {
    this.addEventListener("click", (e) => {
      if (this.hasAttribute("disabled")) {
        e.preventDefault();
        return;
      }
      this.checked = !0;
    }), this.addEventListener("keydown", (e) => {
      e.key === " " && !this.hasAttribute("disabled") && (e.preventDefault(), this.checked = !0);
    });
  }
  /**
   * Synchronizes the visual state with the input state
   * @returns {void}
   */
  #i() {
    this.#e?.checked ? this.#t?.setAttribute("data-checked", "") : this.#t?.removeAttribute("data-checked");
  }
  /**
   * Renders the radio element
   * @returns {void}
   */
  render() {
    const e = this.getAttribute("color") || "dark/zinc", t = this.getAttribute("name"), s = this.getAttribute("value"), i = this.hasAttribute("checked"), r = this.hasAttribute("disabled"), n = this.combineClassNames(
      "group inline-flex cursor-pointer",
      r && "cursor-not-allowed"
    ), h = this.combineClassNames(
      kt,
      B[e] || B["dark/zinc"]
    );
    this.innerHTML = "";
    const c = this.createElement("input", {
      type: "radio",
      name: t || void 0,
      value: s || void 0,
      checked: i || void 0,
      disabled: r || void 0,
      class: "sr-only",
      ref: (p) => {
        this.#e = p;
      }
    });
    c.addEventListener(
      "change",
      () => this.#i()
    ), c.addEventListener(
      "focus",
      () => this.#t?.classList.add("focus-visible")
    ), c.addEventListener(
      "blur",
      () => this.#t?.classList.remove("focus-visible")
    );
    const m = this.createElement(
      "span",
      { class: h },
      this.createElement("span", {
        class: "size-full rounded-full border-[4.5px] bg-[var(--radio-indicator)] bg-clip-padding"
      })
    ), b = this.createElement(
      "span",
      {
        "data-slot": "control",
        class: n,
        tabindex: r ? void 0 : "0",
        role: "radio",
        "aria-checked": i ? "true" : "false",
        "aria-disabled": r ? "true" : void 0,
        "data-checked": i ? "" : void 0,
        "data-disabled": r ? "" : void 0,
        ref: (p) => {
          this.#t = p;
        }
      },
      c,
      m
    );
    this.appendChild(b);
  }
}
l("ui-radio-group", Et);
l("ui-radio-field", At);
l("ui-radio", Nt);
class Lt extends o {
  #e = null;
  static get observedAttributes() {
    return ["name", "multiple", "disabled", "invalid"];
  }
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render(), this.#t();
  }
  /**
   * Called when observed attributes change
   * @returns {void}
   */
  attributeChangedCallback() {
    this.isConnected && this.render();
  }
  /**
   * Sets up focus delegation to inner select element
   * @returns {void}
   */
  #t() {
    this.addEventListener("focus", (e) => {
      e.target === this && this.#e?.focus();
    });
  }
  /**
   * Gets the current select value
   * @returns {string} Current value
   */
  get value() {
    return this.#e?.value || "";
  }
  /**
   * Sets the select value
   * @param {string} newValue - New value to set
   */
  set value(e) {
    this.#e && (this.#e.value = e);
  }
  /**
   * Renders the select element
   * @returns {void}
   */
  render() {
    const e = this.getAttribute("name"), t = this.hasAttribute("multiple"), s = this.hasAttribute("disabled"), i = this.hasAttribute("invalid"), r = Array.from(
      this.querySelectorAll("option, optgroup")
    ), n = this.combineClassNames(
      "group relative block w-full",
      "before:absolute before:inset-px before:rounded-[calc(var(--radius-lg,0.5rem)-1px)] before:before:shadow-sm",
      "after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset",
      s && "opacity-50 before:before:shadow-none"
    ), h = this.combineClassNames(
      "relative block w-full appearance-none rounded-lg",
      "py-[calc(var(--spacing,0.25rem)*2.5-1px)] sm:py-[calc(var(--spacing,0.25rem)*1.5-1px)]",
      t ? "px-[calc(var(--spacing,0.25rem)*3.5-1px)] sm:px-[calc(var(--spacing,0.25rem)*3-1px)]" : "pr-[calc(var(--spacing,0.25rem)*10-1px)] pl-[calc(var(--spacing,0.25rem)*3.5-1px)] sm:pr-[calc(var(--spacing,0.25rem)*9-1px)] sm:pl-[calc(var(--spacing,0.25rem)*3-1px)]",
      "[&_optgroup]:font-semibold",
      "text-base/6 text-canvas placeholder:text-muted sm:text-sm/6",
      "border border-zinc-950/10 bg-transparent",
      "focus:outline-none focus:ring-2 focus:ring-blue-500",
      i && "border-red-500",
      s && "opacity-100 cursor-not-allowed"
    );
    this.innerHTML = "";
    const c = this.createElement("span", {
      "data-slot": "control",
      class: n
    }), m = this.createElement("select", {
      name: e || void 0,
      multiple: t || void 0,
      disabled: s || void 0,
      "data-invalid": i ? "" : void 0,
      "data-disabled": s ? "" : void 0,
      "data-focus": void 0,
      class: h,
      ref: (b) => {
        this.#e = b;
      }
    });
    m.addEventListener(
      "focus",
      () => m.setAttribute("data-focus", "")
    ), m.addEventListener(
      "blur",
      () => m.removeAttribute("data-focus")
    ), m.addEventListener(
      "mouseenter",
      () => m.setAttribute("data-hover", "")
    ), m.addEventListener(
      "mouseleave",
      () => m.removeAttribute("data-hover")
    );
    for (const b of r)
      m.appendChild(b);
    if (c.appendChild(m), !t) {
      const b = this.createElement("span", {
        class: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
      }), p = this.createSVGElement(
        "svg",
        {
          class: "size-5 stroke-muted group-has-[:disabled]:stroke-zinc-600 sm:size-4",
          viewBox: "0 0 16 16",
          "aria-hidden": "true",
          fill: "none"
        },
        this.createSVGElement("path", {
          d: "M5.75 10.75L8 13L10.25 10.75",
          "stroke-width": "1.5",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }),
        this.createSVGElement("path", {
          d: "M10.25 5.25L8 3L5.75 5.25",
          "stroke-width": "1.5",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        })
      );
      b.appendChild(p), c.appendChild(b);
    }
    this.appendChild(c);
  }
}
l("ui-select", Lt);
class zt extends o {
  static get observedAttributes() {
    return ["bleed", "dense", "grid", "striped"];
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.isConnected && this.render();
  }
  get tableOptions() {
    return {
      bleed: this.hasAttribute("bleed"),
      dense: this.hasAttribute("dense"),
      grid: this.hasAttribute("grid"),
      striped: this.hasAttribute("striped")
    };
  }
  render() {
    const { bleed: e } = this.tableOptions, t = "-mx-[var(--gutter,1.5rem)] overflow-x-auto whitespace-nowrap", s = this.clsx(
      "inline-block min-w-full align-middle",
      !e && "sm:px-[var(--gutter,1.5rem)]"
    ), i = "min-w-full text-left text-sm/6 text-zinc-950", r = Array.from(this.childNodes);
    this.innerHTML = "";
    const n = this.h(
      "div",
      { class: "flow-root" },
      this.h(
        "div",
        { class: t },
        this.h(
          "div",
          { class: s },
          this.h("table", { class: i }, ...r)
        )
      )
    );
    this.appendChild(n), this._propagateOptions();
  }
  _propagateOptions() {
    const e = this.tableOptions;
    this.querySelectorAll(
      "ui-table-head, ui-table-body, ui-table-row, ui-table-header, ui-table-cell"
    ).forEach((t) => {
      t._tableOptions = e, t.updateFromTable && t.updateFromTable();
    });
  }
}
class qt extends o {
  connectedCallback() {
    this.render();
  }
  render() {
    const e = "text-zinc-500", t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.h("thead", { class: e }, ...t);
    this.appendChild(s);
  }
}
class Tt extends o {
  connectedCallback() {
    this.render();
  }
  render() {
    const e = Array.from(this.childNodes);
    this.innerHTML = "";
    const t = this.h("tbody", {}, ...e);
    this.appendChild(t);
  }
}
class Mt extends o {
  static get observedAttributes() {
    return ["href", "target", "title"];
  }
  _tableOptions = { bleed: !1, dense: !1, grid: !1, striped: !1 };
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.isConnected && this.render();
  }
  updateFromTable() {
    this.isConnected && this.render();
  }
  render() {
    const e = this.getAttribute("href"), { striped: t } = this._tableOptions, s = this.clsx(
      e && [
        "has-[[data-row-link]:focus-visible]:outline-2 has-[[data-row-link]:focus-visible]:-outline-offset-2 has-[[data-row-link]:focus-visible]:outline-blue-500"
      ],
      t && "even:bg-zinc-950/[2.5%]"
    ), i = Array.from(this.childNodes);
    this.innerHTML = "";
    const r = this.h("tr", { class: s }, ...i);
    this.appendChild(r), this.querySelectorAll("ui-table-cell").forEach((n) => {
      n._rowOptions = {
        href: this.getAttribute("href"),
        target: this.getAttribute("target"),
        title: this.getAttribute("title")
      }, n.updateFromRow && n.updateFromRow();
    });
  }
}
class St extends o {
  _tableOptions = { bleed: !1, dense: !1, grid: !1, striped: !1 };
  connectedCallback() {
    this.render();
  }
  updateFromTable() {
    this.isConnected && this.render();
  }
  render() {
    const { bleed: e, grid: t } = this._tableOptions, s = this.clsx(
      "border-b border-b-zinc-950/10 px-4 py-2 font-medium",
      "first:pl-[var(--gutter,0.5rem)] last:pr-[var(--gutter,0.5rem)]",
      t && "border-l border-l-zinc-950/5 first:border-l-0",
      !e && "sm:first:pl-1 sm:last:pr-1",
      this.className
    ), i = Array.from(this.childNodes);
    this.innerHTML = "";
    const r = this.h("th", { class: s }, ...i);
    this.appendChild(r);
  }
}
class _t extends o {
  _tableOptions = { bleed: !1, dense: !1, grid: !1, striped: !1 };
  _rowOptions = { href: null, target: null, title: null };
  connectedCallback() {
    this.render();
  }
  updateFromTable() {
    this.isConnected && this.render();
  }
  updateFromRow() {
    this.isConnected && this.render();
  }
  render() {
    const { bleed: e, dense: t, grid: s, striped: i } = this._tableOptions, { href: r, target: n, title: h } = this._rowOptions, c = this.clsx(
      "relative px-4 first:pl-[var(--gutter,0.5rem)] last:pr-[var(--gutter,0.5rem)]",
      !i && "border-b border-zinc-950/5",
      s && "border-l border-l-zinc-950/5 first:border-l-0",
      t ? "py-2.5" : "py-4",
      !e && "sm:first:pl-1 sm:last:pr-1",
      this.className
    ), m = Array.from(this.childNodes);
    this.innerHTML = "";
    const b = this.h("td", { class: c });
    if (r) {
      const p = this.parentElement?.querySelector("ui-table-cell") === this, f = this.h("a", {
        "data-row-link": "",
        href: r,
        target: n || void 0,
        "aria-label": h || void 0,
        tabindex: p ? "0" : "-1",
        class: "absolute inset-0"
      });
      b.appendChild(f);
    }
    for (const p of m)
      b.appendChild(p);
    this.appendChild(b);
  }
}
l("ui-table", zt);
l("ui-table-head", qt);
l("ui-table-body", Tt);
l("ui-table-row", Mt);
l("ui-table-header", St);
l("ui-table-cell", _t);
class Ht extends o {
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
    const e = this.combineClassNames(
      "text-base/6 text-muted sm:text-sm/6",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement("p", {
      "data-slot": "text",
      class: e
    });
    for (const i of t)
      s.appendChild(i);
    this.appendChild(s);
  }
}
class jt extends o {
  static get observedAttributes() {
    return ["href"];
  }
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render(), this.#e();
  }
  /**
   * Called when observed attributes change
   * @returns {void}
   */
  attributeChangedCallback() {
    this.isConnected && this.render();
  }
  /**
   * Sets up hover state event listeners
   * @returns {void}
   */
  #e() {
    this.addEventListener("mouseenter", () => {
      this.innerElement?.setAttribute("data-hover", "");
    }), this.addEventListener("mouseleave", () => {
      this.innerElement?.removeAttribute("data-hover");
    });
  }
  /**
   * Renders the link element
   * @returns {void}
   */
  render() {
    const e = this.getAttribute("href") || "#", t = this.combineClassNames(
      "text-canvas underline decoration-zinc-950/50",
      "[&[data-hover]]:decoration-zinc-950",
      this.className
    ), s = Array.from(this.childNodes);
    this.innerHTML = "";
    const i = this.createElement("a", { href: e, class: t });
    for (const r of s)
      i.appendChild(r);
    this.appendChild(i), this.innerElement = i;
  }
}
class Dt extends o {
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
    const e = this.combineClassNames(
      "font-medium text-canvas",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement("strong", {
      class: e
    });
    for (const i of t)
      s.appendChild(i);
    this.appendChild(s);
  }
}
class It extends o {
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
    const e = this.combineClassNames(
      "rounded-sm border bg-zinc-950/[2.5%] px-0.5 text-sm font-medium text-canvas",
      "sm:text-[0.8125rem]",
      this.className
    ), t = Array.from(this.childNodes);
    this.innerHTML = "";
    const s = this.createElement("code", { class: e });
    for (const i of t)
      s.appendChild(i);
    this.appendChild(s);
  }
}
l("ui-text", Ht);
l("ui-text-link", jt);
l("ui-strong", Dt);
l("ui-code", It);
class Ot extends o {
  #e = null;
  static get observedAttributes() {
    return ["name", "placeholder", "rows", "resizable", "disabled", "invalid"];
  }
  /**
   * Called when element is connected to the DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render(), this.#t();
  }
  /**
   * Called when observed attributes change
   * @returns {void}
   */
  attributeChangedCallback() {
    this.isConnected && this.render();
  }
  /**
   * Sets up focus delegation to inner textarea element
   * @returns {void}
   */
  #t() {
    this.addEventListener("focus", (e) => {
      e.target === this && this.#e?.focus();
    });
  }
  /**
   * Gets the current textarea value
   * @returns {string} Current value
   */
  get value() {
    return this.#e?.value || "";
  }
  /**
   * Sets the textarea value
   * @param {string} newValue - New value to set
   */
  set value(e) {
    this.#e && (this.#e.value = e);
  }
  /**
   * Renders the textarea element
   * @returns {void}
   */
  render() {
    const e = this.getAttribute("name"), t = this.getAttribute("placeholder"), s = this.getAttribute("rows") || "3", i = !this.hasAttribute("resizable") || this.getAttribute("resizable") !== "false", r = this.hasAttribute("disabled"), n = this.hasAttribute("invalid"), h = this.combineClassNames(
      "relative block w-full",
      "before:absolute before:inset-px before:rounded-[calc(var(--radius-lg,0.5rem)-1px)] before:before:shadow-sm",
      "after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset",
      r && "opacity-50 before:before:shadow-none"
    ), c = this.combineClassNames(
      "relative block h-full w-full appearance-none rounded-lg",
      "px-[calc(var(--spacing,0.25rem)*3.5-1px)] py-[calc(var(--spacing,0.25rem)*2.5-1px)]",
      "sm:px-[calc(var(--spacing,0.25rem)*3-1px)] sm:py-[calc(var(--spacing,0.25rem)*1.5-1px)]",
      "text-base/6 text-canvas placeholder:text-muted sm:text-sm/6",
      "border border-zinc-950/10 bg-transparent",
      "focus:outline-none focus:ring-2 focus:ring-blue-500",
      n && "border-red-500",
      r && "opacity-50 cursor-not-allowed",
      i ? "resize-y" : "resize-none"
    );
    this.innerHTML = "";
    const m = this.createElement(
      "span",
      { "data-slot": "control", class: h },
      this.createElement("textarea", {
        name: e || void 0,
        placeholder: t || void 0,
        rows: s,
        disabled: r || void 0,
        "data-invalid": n ? "" : void 0,
        "data-disabled": r ? "" : void 0,
        class: c,
        ref: (b) => {
          this.#e = b;
        }
      })
    );
    this.appendChild(m);
  }
}
l("ui-textarea", Ot);
const Bt = `
    <template id="footer">
        <footer class="bg-secondary" role="contentinfo">
            <div class="mx-auto max-w-7xl px-6 pt-20 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
                <div class="flex flex-wrap w-full justify-center gap-8 pb-12">
                    <div class="flex flex-wrap w-full md:w-2/3 justify-between gap-x-4 gap-y-4">
                        <div class="w-max md:w-1/5">
                            <h3 class="text-sm font-semibold text-white">Company</h3>
                            <ul role="list" class="mt-6 space-y-4">
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Careers</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Blog</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">About</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Team</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Partners</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Contact</a>
                                </li>
                            </ul>
                        </div>
                        <div class="w-max md:w-1/3">
                            <h3 class="text-sm font-semibold text-white">Services</h3>
                            <ul role="list" class="mt-6 space-y-4">
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Pulmonary Oversight</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Eating Disorder Monitoring</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">IV Infusion Therapy</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Mental Health Services</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Pain Management</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Post-operation Recovery</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Addiction Rehabilitation</a>
                                </li>
                            </ul>
                        </div>
                        <div class="w-max md:w-1/3">
                            <h3 class="text-sm font-semibold text-white">Conditions</h3>
                            <ul role="list" class="mt-6 space-y-4">
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Amyotrophic Lateral Sclerosis</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Alzheimer's</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Dementia</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Diabetes</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Heart Disease</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Multiple Sclerosis</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Oncology</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Ostomy</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Parkinson's</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Stroke Recovery</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Traumatic Brain Injury</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="w-max md:w-1/4 ms-8">
                        <h3 class="" aria-describedby="newsletter-description">Newsletter</h3>
                        <p id="newsletter-description" class="sr-only">Subscribe to our newsletter for the latest news, articles, and resources, sent to your inbox weekly.</p>
                        <form class="flex max-w-md">
                            <label for="email-address" class="sr-only">Enter your email address</label>
                            <input id="email-address" type="email" name="email-address" required placeholder="e.g. email@address.com" autocomplete="email" class="w-full min-w-max rounded-none px-2 pt-4 leading-none border-0 border-b-2 text-sm placeholder:text-gray-300" />
                            <div class="mt-2 ml-0">
                                <button type="submit" class="flex w-full items-center justify-center px-3 py-3 text-sm font-semibold border-0 border-b-2 shadow-xs">
                                Subscribe</button>
                            </div>
                        </form>
						<nav class="mt-6 flex gap-6">
							<a href="##"><svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true" class="size-6">
								<path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" fill-rule="evenodd" />
							</svg></a>
							<a href="##"><svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true" class="size-6">
								<path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" fill-rule="evenodd" />
							</svg></a>
							<a href="##"><svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true" class="size-6">
								<path d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clip-rule="evenodd" fill-rule="evenodd" /></svg></a>
							</nav>
						</div>
                    </div>
					<div class="flex m-max justify-start align-center mx-auto my-4 p-8">
						<svg class="w-24 mx-auto mt-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 232 195">
							<defs>
								<filter id="smooth">
									<feGaussianBlur stdDeviation="0.2" />
								</filter>
							</defs>
							<path filter="url(#smooth)" fill="#fff" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M141.07 124.63q.26-.04.44.16.14.21.1.44-.01.23-.15.48c-1.66 3.2-2.4 4.4-4.4 6.6-12.49 13.75-28.3 17.3-45.1 15.45a1.6 1.6 0 0 1-1.4-1.34l-.74-4.85a1.76 1.76 0 0 1 2-2c14.68 2.25 28.24 2.55 41.08-7.64 2.3-1.84 3.85-3.64 6.37-6.05l.02-.01c.18-.17.77-.66 1.31-1.04q.24-.17.47-.2ZM41.63.25h.15a1.54 1.54 0 0 1 .02 3.08c-1.24.16-2.62.38-3.74.7q-.84.24-1.38.55t-.6.62v.1l-.03.32-.03 1.13a2642 2642 0 0 0-.15 18.17c-.05 11.58-.1 26.9-.12 42.17L35.7 109v19q.01.27.1.4.06.08.16.12l.08.02h.02l.05.02.2.04.75.16 2.83.61 9.63 2.08 25.16 5.45c.77.17 1.33.82 1.39 1.6q.18 2.4.54 4.98c.07.53-.1 1-.43 1.29-.34.3-.82.38-1.33.23-5.77-1.73-25.34-7.5-43.15-10.72-11.5-2.08-21.96.31-28.03 2.93h-.01l-1.3.5c-.83.3-1.58.03-1.92-.52q-.27-.42-.15-.94t.66-.91c5.9-4.2 12.9-5.8 20.4-6.59.4-.04 1.5-.17 2.5-.35.5-.1.97-.2 1.32-.31q.26-.09.38-.16l.04-.03V5.12q-.05-.42-.63-.76-.62-.35-1.58-.56a28 28 0 0 0-3.99-.51 1.5 1.5 0 0 1-1.4-1.5c0-.85.7-1.54 1.54-1.54zm45.7 139.51v.1l.04.26.12.84.36 2.43.36 2.37.12.77.03.22v.06h.01l.29 1.42c3.09 14.3 10.32 26.85 21.44 33.33l.55.32a50.2 50.2 0 0 0 38.9 5.66c4.03-1.01 8.54-3.48 13.24-6.72s9.59-7.22 14.36-11.27c4.78-4.05 9.45-8.16 13.71-11.6 4.26-3.45 8.14-6.25 11.34-7.7a29.6 29.6 0 0 1 12.9-2.68c6.4.18 10.44 2.2 12.11 3.32l.03.01c.84.57 1.93 1.78 2.8 2.82a48 48 0 0 1 1.43 1.8l.09.11.02.04a.25.25 0 0 1-.38.32l-.02-.02-.4-.4q-.43-.42-1.23-1.08c-1-.82-2.42-1.83-4.15-2.67l-.34-.17c-2.6-1.2-6.14-1.76-9-1.85-2.14-.07-4.61.48-6.95 1.28s-4.53 1.83-6.1 2.7c-2.12 1.15-5.6 3.86-9.88 7.34-4.27 3.47-9.32 7.71-14.54 11.9a230 230 0 0 1-15.61 11.69c-4.98 3.32-9.56 5.83-13.15 6.7-7.85 2.87-18.47 3.4-27.71 2.1-24.58-3.45-38.74-23.43-42.83-46.34-4.1-22.9 1.84-48.81 17.52-64.22 14.63-14.38 37.34-14.73 53.54-3.82a44 44 0 0 1 2.42 1.98c.4-.03.8-.32 1.15-1.02q.56-1.1.87-3.4a1.36 1.36 0 0 1 2.71.21c-.2 4.6-.3 14.24-.31 23.41a1.28 1.28 0 0 1-1.45 1.27 1.1 1.1 0 0 1-1.08-1l-.02-.14-.18-2.09c-.18-1.71-.38-3.3-.7-4.7l-.08-.4c-2.27-9.36-9.52-14.34-17.83-16.08s-17.64-.22-23.98 3.38c-18.9 10.75-26.84 35.99-24.55 59.15z" shape-rendering="geometricPrecision" style="transform: scale(0.96)" tansform-origin="center" />
						</svg>
					</div>
					<div class="border-t pt-4 md:flex md:items-center md:justify-between">
						<p class="mt-8 mr-auto text-sm/6 md:mt-0 text-gray-300" data-copyright></p>
						<nav class="flex gap-6" aria-label="Legal links">
							<a href="#" class="text-sm/6 text-gray-300">Privacy Policy</a>
							<a href="#" class="text-sm/6 text-gray-300">Terms of Service</a>
							<a href="#" class="text-sm/6 text-gray-300"><abbr title="Health Insurance Portability and Accountability Act (1996)">HIPAA</abbr></a>
						</nav>
					</div>
				</div>
			</div>
        </footer>
    </template>
`;
class Pt extends o {
  static get observedAttributes() {
    return ["copyright", "company"];
  }
  constructor() {
    super(), this._templateInjected = !1;
  }
  connectedCallback() {
    this._injectTemplate(), this.render(), this._setupNewsletterForm();
  }
  attributeChangedCallback(e, t, s) {
    t !== s && this.isConnected && this._updateCopyright();
  }
  _injectTemplate() {
    if (document.getElementById("footer-template-styles")) return;
    const e = document.createElement("style");
    e.id = "footer-template-styles", e.textContent = `
			content-info { display: block }
			content-details { display: block }
		`, document.head.appendChild(e);
  }
  _setupNewsletterForm() {
    this.querySelector("form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const t = this.querySelector('[type="email"]')?.value;
      t && this.emit("newsletter-submit", { email: t });
    });
  }
  _updateCopyright() {
    const e = this.querySelector("[data-copyright]");
    e && (e.textContent = this._getCopyrightText());
  }
  _getCopyrightText() {
    const e = this.getAttribute("copyright") || (/* @__PURE__ */ new Date()).getFullYear(), t = this.getAttribute("company") || "Legacy Concierge";
    return `© ${e} ${t}`;
  }
  render() {
    this.querySelector("[slot]") ? this._renderWithSlots() : this._renderDefaultTemplate();
  }
  _renderWithSlots() {
    const e = this.h("div", { class: "ui-footer-container" }), t = this.h(
      "footer",
      {
        class: "bg-secondary",
        role: "contentinfo"
      },
      this.h(
        "div",
        {
          class: [
            "mx-auto",
            "max-w-7xl",
            "px-6",
            "pt-20",
            "pb-8",
            "sm:pt-24",
            "lg:px-8",
            "lg:pt-32"
          ].join(" ")
        },
        this.h(
          "div",
          { class: ["xl:grid", "xl:grid-cols-3", "xl:gap-8"].join(" ") },
          this.h("slot", { name: "links" }),
          this.h("slot", { name: "newsletter" })
        ),
        this.h(
          "div",
          {
            class: [
              "mt-16",
              "border-t",
              "border-gray-900/10",
              "pt-8",
              "sm:mt-20",
              "md:flex",
              "md:items-center",
              "md:justify-between",
              "lg:mt-24"
            ].join(" ")
          },
          this.h(
            "div",
            { class: ["flex", "gap-x-6", "md:order-2"].join(" ") },
            this.h("slot", { name: "social" })
          ),
          this.h(
            "p",
            {
              class: [
                "mt-8",
                "text-sm/6",
                "text-muted",
                "md:order-1",
                "md:mt-0"
              ].join(" "),
              "data-copyright": ""
            },
            this._getCopyrightText()
          )
        )
      )
    );
    e.appendChild(t);
    const s = Array.from(this.children);
    this.innerHTML = "", this.appendChild(e);
    for (const i of s)
      this.appendChild(i);
  }
  _renderDefaultTemplate() {
    const e = document.createElement("div");
    e.innerHTML = Bt;
    const t = e.querySelector("template");
    if (t) {
      const s = t.content.cloneNode(!0), i = s.querySelector(
        "footer > div > div:last-child > p"
      );
      i && (i.textContent = this._getCopyrightText(), i.setAttribute("data-copyright", "")), this.innerHTML = "", this.appendChild(s);
    }
  }
}
class Vt extends o {
  static get observedAttributes() {
    return ["heading"];
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback(e, t, s) {
    t !== s && this.isConnected && this.render();
  }
  render() {
    const e = this.getAttribute("heading") || "", t = Array.from(this.querySelectorAll("a")), s = this.h(
      "div",
      {},
      this.h(
        "h3",
        {
          class: [""].join(" ")
        },
        e
      ),
      this.h(
        "ul",
        { role: "list", class: "mt-6 space-y-4" },
        ...t.map((n) => {
          const h = this.h("li", {}), c = n.cloneNode(!0);
          return c.className = ["text-sm/6", "text-muted", "", ""].join(" "), h.appendChild(c), h;
        })
      )
    ), i = t.map((n) => n.cloneNode(!0));
    this.innerHTML = "", this.appendChild(s);
    const r = this.h("div", { hidden: !0 });
    for (const n of i)
      r.appendChild(n);
    this.appendChild(r);
  }
}
l("global-footer", Pt);
l("content-info", Vt);
const R = !1, rs = !R, ns = () => `
    <template id="banner">
        <header class="relative isolate overflow-hidden py-24 sm:py-32">
			<div class="mx-auto max-w-7xl px-6 pt-20 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
				<video autoplay loop muted playsinline class="absolute inset-0 -z-10 size-full object-cover object-right md:object-center" poster="${L}">
					<source src="${P}" type="video/mp4">
					<source src="${V}" type="video/webm">
					<img role="presentation" src="${L}" alt="Scenic beach with blue-green waves and a brown sandy shore" class="size-full object-cover object-right md:object-center" />
				</video>

				<div aria-hidden="true" class="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl">
					<div style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" class="aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"></div>
				</div>

				<div aria-hidden="true" class="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:-top-112 sm:ml-16 sm:translate-x-0">
					<div style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" class="aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"></div>
				</div>

				<div class="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
					<h1 class="tracking-tight sm:text-4xl">Your health, Our Purpose.</h1>
					<p class="mt-6 text-lg/8 text-pretty text-white">Refining Private Nursing with Expertise, Discretion, and Unparalleled Personalized Care at Home.</p>

					<div class="text-canvas mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
						<a href="#" class="rounded-md px-3.5 py-2.5 text-sm font-semibold no-underline shadow-xs"> Call for more details&hellip; </a>
						<a href="#" class="text-sm/6 font-semibold text-white">
							Learn more
							<span aria-hidden="true">→</span>
						</a>
					</div>
				</div>
			</div>
        </header>
    </template>
`;
class Rt extends o {
  static get observedAttributes() {
    return [
      "heading",
      "description",
      "image",
      "image-alt",
      "video",
      "video-type",
      "no-video",
      "primary-cta",
      "primary-href",
      "secondary-cta",
      "secondary-href",
      "align"
    ];
  }
  connectedCallback() {
    this._injectStyles(), this.render();
  }
  attributeChangedCallback(e, t, s) {
    t !== s && this.isConnected && this.render();
  }
  /**
   * Injects component styles
   */
  _injectStyles() {
    if (document.getElementById("banner-template-styles")) return;
    const e = document.createElement("style");
    e.id = "banner-template-styles", e.textContent = `
			hero-banner {
				display: block;
			}
			hero-banner > header::before {
				content: '';
				width: 100%;
				height: 100%;
				background: linear-gradient(160deg, #0128 56%, #0000 80%);
				left: 0;
				top: 0;
				position: absolute;
				z-index: -5;
			}
			@keyframes bounce-scroll {
				0%, 100% {
					transform: translateY(0);
					opacity: 1;
				}
				50% {
					transform: translateY(0.5rem);
					opacity: 0.7;
				}
			}
			.scroll-indicator {
				animation: bounce-scroll 2s ease-in-out infinite;
			}
		`, document.head.appendChild(e);
  }
  /**
   * Formats the heading to make "Our Purpose" italic when it appears after a comma.
   * Handles the default heading "Your health, Our Purpose." specially.
   * @param {string} heading - The heading text
   * @returns {Array} Array of text nodes and elements for the h() helper
   */
  _formatHeading(e) {
    const t = e.indexOf(",");
    if (t === -1)
      return [e];
    const s = e.slice(0, t + 1), i = e.slice(t + 1);
    return [s, this.h("span", { class: "italic" }, i)];
  }
  /**
   * Creates the gradient blur decorative elements
   */
  _createGradientBlurs() {
    const e = "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)";
    return [
      this.h(
        "div",
        {
          "aria-hidden": "true",
          class: "hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        },
        this.h("div", {
          style: `clip-path: ${e}`,
          class: "aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        })
      ),
      this.h(
        "div",
        {
          "aria-hidden": "true",
          class: "absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:-top-112 sm:ml-16 sm:translate-x-0"
        },
        this.h("div", {
          style: `clip-path: ${e}`,
          class: "aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        })
      )
    ];
  }
  render() {
    const e = this.getAttribute("heading") || "Your health, Our Purpose.", t = this.getAttribute("description") || "Refining Private Nursing with Expertise, Discretion, and Unparalleled Personalized Care at Home.", s = this.getAttribute("image"), i = s ? T(s) : L, r = this.getAttribute("image-alt") || "", n = this.getAttribute("primary-cta"), h = d(this.getAttribute("primary-href") || "#"), c = this.getAttribute("secondary-cta"), m = d(
      this.getAttribute("secondary-href") || "#"
    ), b = this.getAttribute("align"), p = this.children.length > 0 && !this._rendered, f = [];
    n && f.push(
      this.h(
        "a",
        {
          href: h,
          class: "text-white bg-secondary/32 px-6 py-4 text-lg text-[clamp(1rem,1.5vw,1.25rem)] font-bold text-shadow-lg tracking-wider shadow-xs border-1 rounded-xl no-underline"
        },
        n
      )
    ), c && f.push(
      this.h(
        "a",
        {
          href: m,
          class: "text-white text-lg/6 text-[clamp(0.92rem,1.32vw,1.15rem)] font-semibold text-shadow-lg tracking-wide no-underline"
        },
        c,
        this.h("span", { "aria-hidden": "true" }, " →")
      )
    ), f.length === 0 && !p && f.push(
      this.h(
        "a",
        {
          href: "#",
          class: "rounded-md px-6 py-4 text-md font-semibold text-shadow-lg shadow-xs no-underline"
        },
        "Call for more details…"
      ),
      this.h(
        "a",
        {
          href: "#",
          class: "text-sm/6 font-semibold text-shadow-lg no-underline"
        },
        "Learn more",
        this.h("span", { "aria-hidden": "true" }, " →")
      )
    );
    const x = b === "center" ? "text-center" : "text-left lg:text-left", g = b === "center" ? "justify-center" : "justify-start lg:justify-start";
    this.hasAttribute("no-video");
    const v = this.getAttribute("video");
    v ? this.h("source", {
      src: v,
      type: this.getAttribute("video-type") || "video/mp4"
    }) : [
      { src: P, type: "video/mp4" },
      { src: V, type: "video/webm" }
    ].map(
      (u) => this.h("source", { src: u.src, type: u.type })
    );
    const y = this.h(
      "header",
      {
        class: "text-white relative isolate overflow-hidden min-h-dvh"
      },
      // Background video with image fallback (video is default unless no-video attribute is set)
      this.h("img", {
        role: "presentation",
        src: i,
        alt: r,
        class: "absolute inset-0 -z-10 size-full object-cover object-right md:object-center"
      }),
      // Container wrapper
      this.h(
        "div",
        {
          class: "mx-auto max-w-6xl px-6 min-h-dvh flex items-center transform translate-y-[-24dvh] lg:translate-y-[-12dvh]"
        },
        ...this._createGradientBlurs(),
        // Content
        this.h(
          "div",
          {
            class: `items-center mr-auto w-full lg:w-2/3 ${x} lg:mx-0 lg:flex-auto`
          },
          this.h(
            "h1",
            {
              class: "text-[#fff] font-serif text-6xl md:text-7xl tracking-normal leading-tight"
            },
            ...this._formatHeading(e)
          ),
          this.h(
            "p",
            {
              class: "mt-6 text-[clamp(1.125rem,3vw,1.75rem)] text-pretty font-medium text-shadow-lg leading-relaxed w-4/5 lg:w-2/3"
            },
            t
          ),
          this.h(
            "div",
            {
              class: `mt-10 flex items-center ${g} gap-x-6`
            },
            ...f
          )
        )
      )
    ), C = this.h(
      "button",
      {
        type: "button",
        class: "absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator rounded-full p-4 cursor-pointer transition-colors",
        "aria-label": "Scroll to content",
        onclick: () => {
          const u = this.querySelector("header");
          u?.nextElementSibling ? u.nextElementSibling.scrollIntoView({
            behavior: "smooth"
          }) : window.scrollTo({
            top: u?.offsetHeight || window.innerHeight,
            behavior: "smooth"
          });
        }
      },
      this.svg(
        "svg",
        {
          class: "size-8 text-white/70",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "2",
          stroke: "currentColor"
        },
        this.svg("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          d: "M19 9l-7 7-7-7"
        })
      )
    );
    y.appendChild(C), this.innerHTML = "", this.appendChild(y), this._rendered = !0;
  }
}
l("hero-banner", Rt);
const os = `
    <template id="navbar">
		<div class="mx-auto max-w-9xl px-6 lg:px-8">
			<nav role="navigation" aria-label="Global" class="flex items-center justify-between py-6">
			<div class="flex">
				<a href="#" class="-m-1.5 p-1.5">
					<span class="sr-only">Legacy Concierge</span>
					<img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="" class="h-8 w-auto 
					<img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="" class="h-8 w-auto not-
				</a>
			</div>
			<div class="flex lg:hidden">
				<button type="button" command="show-modal" commandfor="mobile-menu" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 
					<span class="sr-only">Open main menu</span>
					<svg fill="none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6">
						<path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</button>
			</div>
			<div class="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-12">
				<a href="#" class="text-sm/6 font-semibold 
				<a href="##" class="text-sm/6 font-semibold 
				<a href="##" class="text-sm/6 font-semibold 
				<a href="##" class="text-sm/6 font-semibold 
				<a href="##" class="text-sm/6 font-semibold 
			</div>
			<div class="hidden lg:flex lg:ml-8">
				<button type="button" command="show-modal" commandfor="search-dialog" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 
					<span class="sr-only">Search</span>
					<svg fill="currentColor" width="18" height="18" aria-hidden="true" role="img" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" name="icon-search">
						<title>Search</title>
						<desc>Icon</desc>
						<path d="M16.32 14.9l1.1 1.1c.4-.02.83.13 1.14.44l3 3a1.5 1.5 0 0 1-2.12 2.12l-3-3a1.5 1.5 0 0 1-.44-1.14l-1.1-1.1a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
					</svg>
				</button>
			</div>
			</nav>
		</div>
		<dialog id="search-dialog" class="backdrop:p-0 w-full max-w-lg rounded-xl fixed top-[87px] left-auto right-0 ml-6">
			<div class="bg-canvas rounded-xl shadow-2xl ring-1 border-soft">
				<form method="dialog" class="relative">
					<svg fill="currentColor" width="18" height="18" aria-hidden="true" role="img" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" name="icon-search" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
						<title>Search</title>
						<desc>Icon</desc>
						<path d="M16.32 14.9l1.1 1.1c.4-.02.83.13 1.14.44l3 3a1.5 1.5 0 0 1-2.12 2.12l-3-3a1.5 1.5 0 0 1-.44-1.14l-1.1-1.1a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
					</svg>
					<input type="search" name="search" placeholder="Search..." autofocus class="w-full rounded-xl border-0 py-4 pl-12 pr-4 placeholder:sm:text-sm/6" />
					<button type="button" command="close" commandfor="search-dialog" class="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-medium 
						ESC
					</button>
				</form>
			</div>
		</dialog>
		<el-dialog>
			<dialog id="mobile-menu" class="backdrop:lg:hidden">
				<div tabindex="0" class="fixed inset-0">
					<el-dialog-panel class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 
						<div class="flex items-center justify-between">
							<a href="#" class="-m-1.5 p-1.5">
								<span class="sr-only">Your Company</span>
								<img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="" class="h-8 w-auto 
								<img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="" class="h-8 w-auto not-
							</a>
							<button type="button" command="close" commandfor="mobile-menu" class="-m-2.5 rounded-md p-2.5 
								<span class="sr-only">Close menu</span>
								<svg fill="none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6">
								<path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
								</svg>
							</button>
						</div>
						<div class="mt-6 flow-root">
							<div class="-my-6 divide-y divide-gray-500/10 
								<div class="space-y-2 py-6">
									<a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold 
									<a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold 
									<a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold 
									<a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold 
								</div>
								<div class="py-6">
									<a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold 
								</div>
							</div>
						</div>
					</el-dialog-panel>
				</div>
			</dialog>
		</el-dialog>
    </template>
`;
class Ft extends o {
  static get observedAttributes() {
    return [
      "logo",
      "logo-dark",
      "logo-alt",
      "brand",
      "cta-text",
      "cta-href",
      "fixed",
      "transparent"
    ];
  }
  #e = !1;
  #t = null;
  #s = null;
  #i = null;
  #r = null;
  connectedCallback() {
    this.#o(), this.render(), this.#b();
  }
  disconnectedCallback() {
    this.#t?.deactivate(), this.#s && document.removeEventListener("keydown", this.#s), this.#i && this.#a && this.#a.removeEventListener(
      "click",
      this.#i
    ), this.#r && window.removeEventListener("resize", this.#r);
  }
  attributeChangedCallback(e, t, s) {
    t !== s && this.isConnected && (this.render(), this.#b());
  }
  #a = null;
  #n = null;
  #l = null;
  /**
   * Injects component-specific styles into the document head
   * @returns {void}
   */
  #o() {
    if (document.getElementById("navbar-template-styles")) return;
    const e = document.createElement("style");
    e.id = "navbar-template-styles", e.textContent = `
			ui-navbar {
				display: block;
			}
			ui-navbar .mobile-menu-backdrop {
				transition: opacity 0.3s ease-out;
			}
			ui-navbar .mobile-menu-panel {
				transition: transform 0.3s ease-in-out;
			}
			ui-navbar .mobile-menu-backdrop.hidden {
				opacity: 0;
				pointer-events: none;
			}
			ui-navbar .mobile-menu-panel.hidden {
				transform: translateX(100%);
			}
		`, document.head.appendChild(e);
  }
  /**
   * Opens the mobile navigation menu
   * @fires menu-open
   * @returns {void}
   */
  openMenu() {
    this.#e = !0, this.#c(), this.emit("menu-open");
  }
  /**
   * Closes the mobile navigation menu
   * @fires menu-close
   * @returns {void}
   */
  closeMenu() {
    this.#e = !1, this.#c(), this.emit("menu-close");
  }
  /**
   * Opens the search dialog modal
   * @fires search-open
   * @returns {void}
   */
  openSearch() {
    this.#a && (this.#a.showModal(), this.#a.addEventListener(
      "click",
      this.#i
    ), this.emit("search-open"));
  }
  /**
   * Closes the search dialog modal
   * @fires search-close
   * @returns {void}
   */
  closeSearch() {
    this.#a && (this.#a.removeEventListener(
      "click",
      this.#i
    ), this.#a.close(), this.emit("search-close"));
  }
  /**
   * Toggles the mobile menu open/closed state
   * @returns {void}
   */
  toggleMenu() {
    this.#e ? this.closeMenu() : this.openMenu();
  }
  /**
   * Updates mobile menu visibility and manages focus trap
   * @returns {void}
   */
  #c() {
    const e = this.#n, t = this.#l;
    !e || !t || (this.#e ? (e.classList.remove("hidden"), t.classList.remove("hidden"), document.body.style.overflow = "hidden", this.#t = new q(t), this.#t.activate()) : (e.classList.add("hidden"), t.classList.add("hidden"), document.body.style.overflow = "", this.#t?.deactivate(), this.#t = null));
  }
  /**
   * Handles escape key press to close mobile menu
   * @param {KeyboardEvent} event - The keyboard event
   * @returns {void}
   */
  #d(e) {
    e.key === "Escape" && this.#e && this.closeMenu();
  }
  /**
   * Handles click on search dialog backdrop to close it
   * @param {MouseEvent} event - The mouse event
   * @returns {void}
   */
  #g(e) {
    e.target === this.#a && this.closeSearch();
  }
  /**
   * Initializes event listeners for keyboard and click interactions
   * @returns {void}
   */
  #b() {
    this.#s = this.#d.bind(this), this.#i = this.#g.bind(this), document.addEventListener("keydown", this.#s), document.addEventListener("click", (e) => {
      e.target.closest(
        ".relative:has(> .dropdown-menu)"
      ) || this.querySelectorAll(".dropdown-menu").forEach((s) => {
        this.#h(s);
      });
    }), this.#r = () => {
      this.querySelectorAll(".dropdown-menu:not(.hidden)").forEach((e) => {
        this.#p(e);
      });
    }, window.addEventListener("resize", this.#r);
  }
  /**
   * Resets all positioning and scroll styles on a dropdown menu
   * @param {HTMLElement} menu - The dropdown menu element
   * @returns {void}
   */
  #h(e) {
    e.classList.add("hidden", "opacity-0", "translate-y-1"), e.classList.remove("opacity-100", "translate-y-0"), e.style.left = "", e.style.right = "", e.style.transform = "";
    const t = e.querySelector(":scope > div");
    t && (t.style.maxHeight = "", t.style.overflowY = "", t.style.scrollBehavior = "", t.style.scrollbarWidth = "");
  }
  /**
   * Positions a dropdown menu to ensure it stays within the viewport
   * and opens toward the center of the page with a 25% offset from trigger
   * @param {HTMLElement} menu - The dropdown menu element
   * @returns {void}
   */
  #p(e) {
    e.style.left = "", e.style.right = "", e.style.transform = "";
    const t = window.innerWidth, s = t / 2, i = 16, n = e.previousElementSibling?.getBoundingClientRect(), h = n ? n.left + n.width / 2 : 0, b = e.offsetWidth * 0.25;
    h > s ? (e.style.left = "auto", e.style.right = `-${b}px`) : (e.style.left = `-${b}px`, e.style.right = "auto");
    const f = e.getBoundingClientRect();
    if (f.right > t - i) {
      const k = f.right - (t - i);
      e.style.transform = `translateX(-${k}px)`;
    }
    const x = e.getBoundingClientRect();
    if (x.left < i) {
      const k = i - x.left, S = e.style.transform;
      if (S) {
        const F = Number.parseFloat(
          S.replace(/translateX\((-?\d+\.?\d*)px\)/, "$1")
        ) || 0;
        e.style.transform = `translateX(${F + k}px)`;
      } else
        e.style.transform = `translateX(${k}px)`;
    }
    const g = e.querySelector(".dropdown-grid");
    g && (t < 640 ? g.style.gridTemplateColumns = "1fr" : g.style.gridTemplateColumns = "");
    const v = window.innerHeight, w = e.getBoundingClientRect().top, C = v - w - 32, u = e.querySelector(":scope > div");
    u && (u.scrollHeight > C ? (u.style.maxHeight = `${C}px`, u.style.overflowY = "auto", u.style.scrollBehavior = "smooth", u.style.scrollbarWidth = "thin") : (u.style.maxHeight = "", u.style.overflowY = "", u.style.scrollBehavior = "", u.style.scrollbarWidth = ""));
  }
  /**
   * Creates a mobile dropdown accordion menu
   * @param {string} label - The dropdown button label
   * @param {Array} items - Array of {href, text} objects
   * @returns {HTMLElement} The mobile dropdown element
   */
  #m(e, t) {
    return `${e.toLowerCase().replace(/\s+/g, "-")}`, this.h(
      "div",
      { class: "-mx-3" },
      this.h(
        "button",
        {
          type: "button",
          class: "flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-canvas",
          "aria-expanded": "false",
          onClick: (s) => {
            const i = s.currentTarget.nextElementSibling, r = s.currentTarget.querySelector("svg");
            !i.classList.contains("hidden") ? (i.classList.add("hidden"), r.style.transform = "rotate(0deg)") : (i.classList.remove("hidden"), r.style.transform = "rotate(180deg)");
          }
        },
        e,
        this.svg(
          "svg",
          {
            viewBox: "0 0 20 20",
            fill: "currentColor",
            "aria-hidden": "true",
            class: "size-5 flex-none transition-transform duration-200",
            style: "transform: rotate(0deg)"
          },
          this.svg("path", {
            d: "M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z",
            "clip-rule": "evenodd",
            "fill-rule": "evenodd"
          })
        )
      ),
      this.h(
        "div",
        { class: "hidden mt-2 space-y-2" },
        ...t.map(
          (s) => this.h(
            "a",
            {
              href: s.href,
              class: "block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-canvas",
              onClick: () => this.closeMenu()
            },
            s.text
          )
        )
      )
    );
  }
  /**
   * Creates a dropdown menu with items
   * @param {string} label - The dropdown button label
   * @param {string} mainHref - The main page URL
   * @param {Array} items - Array of {href, text, desc, icon} objects
   * @param {Object} action - Optional action section {title, badge, description}
   * @returns {HTMLElement} The dropdown element
   */
  #u(e, t, s, i = null) {
    return `${e.toLowerCase().replace(/\s+/g, "-")}`, this.h(
      "div",
      { class: "relative" },
      this.h(
        "button",
        {
          type: "button",
          class: "inline-flex items-center gap-x-1 text-sm/6 font-semibold text-canvas",
          "aria-expanded": "false",
          "aria-haspopup": "true",
          onClick: (r) => {
            const n = r.currentTarget.nextElementSibling, h = n.classList.contains("opacity-100");
            this.querySelectorAll(".dropdown-menu").forEach((c) => {
              c !== n && this.#h(c);
            }), h ? this.#h(n) : (n.classList.remove("hidden", "opacity-0", "translate-y-1"), n.classList.add("opacity-100", "translate-y-0"), requestAnimationFrame(() => {
              this.#p(n);
            }));
          }
        },
        this.h("span", {}, e),
        this.svg(
          "svg",
          {
            viewBox: "0 0 20 20",
            fill: "currentColor",
            "aria-hidden": "true",
            class: "size-5"
          },
          this.svg("path", {
            d: "M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z",
            "clip-rule": "evenodd",
            "fill-rule": "evenodd"
          })
        )
      ),
      this.h(
        "div",
        {
          class: "dropdown-menu absolute left-0 z-10 mt-5 hidden w-screen max-w-max overflow-visible px-4 transition duration-200 ease-out opacity-0 translate-y-1",
          style: "max-width: min(calc(100vw - 2rem), 48rem);"
        },
        this.h(
          "div",
          {
            class: "w-full flex-auto overflow-hidden rounded-3xl bg-canvas text-sm/6 shadow-lg outline-1 border-soft",
            style: "max-width: min(calc(100vw - 2rem), 48rem);"
          },
          this.h(
            "div",
            {
              class: "dropdown-grid grid grid-cols-1 gap-x-6 gap-y-1 p-4 lg:grid-cols-2",
              "data-slot": "dropdown-content"
            },
            ...s.map(
              (r) => this.h(
                "div",
                {
                  class: "group relative flex gap-x-6 rounded-lg p-4"
                },
                this.h(
                  "div",
                  {
                    class: "mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-depth-1"
                  },
                  r.icon || this.#x()
                ),
                this.h(
                  "div",
                  {},
                  this.h(
                    "a",
                    {
                      href: r.href,
                      class: "font-semibold text-canvas no-underline"
                    },
                    r.text,
                    this.h("span", {
                      class: "absolute inset-0",
                      "aria-hidden": "true"
                    })
                  ),
                  this.h("p", { class: "mt-1 text-muted" }, r.desc)
                )
              )
            )
          ),
          i && this.h(
            "div",
            { class: "bg-depth-1 px-8 py-6" },
            this.h(
              "div",
              { class: "flex items-center gap-x-3" },
              this.h(
                "h3",
                { class: "text-sm/6 font-semibold text-canvas" },
                i.title
              ),
              i.badge && this.h(
                "p",
                {
                  class: "rounded-full bg-brand/10 px-2.5 py-1.5 text-xs font-semibold text-brand"
                },
                i.badge
              )
            ),
            this.h(
              "p",
              { class: "mt-2 text-sm/6 text-muted" },
              i.description
            )
          )
        )
      )
    );
  }
  /**
   * Creates a placeholder icon for dropdown items
   * @returns {SVGElement} The placeholder icon
   */
  #x() {
    return this.svg(
      "svg",
      {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5",
        "aria-hidden": "true",
        class: "size-6 text-muted"
      },
      this.svg("path", {
        d: "M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }),
      this.svg("path", {
        d: "M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      })
    );
  }
  /**
   * Creates the hamburger menu icon SVG element
   * @returns {SVGElement} The hamburger menu icon
   */
  #v() {
    return this.svg(
      "svg",
      {
        fill: "none",
        viewBox: "0 0 24 24",
        "stroke-width": "1.5",
        stroke: "currentColor",
        "aria-hidden": "true",
        class: "size-6"
      },
      this.svg("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      })
    );
  }
  /**
   * Creates the close button icon SVG element
   * @returns {SVGElement} The close button icon
   */
  #C() {
    return this.svg(
      "svg",
      {
        fill: "none",
        viewBox: "0 0 24 24",
        "stroke-width": "1.5",
        stroke: "currentColor",
        "aria-hidden": "true",
        class: "size-6"
      },
      this.svg("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M6 18 18 6M6 6l12 12"
      })
    );
  }
  /**
   * Creates the brand logo SVG element
   * @param {string} className - CSS class names to apply to the SVG
   * @returns {SVGElement} The brand logo SVG
   */
  #f(e = "h-8 w-auto") {
    return this.svg(
      "svg",
      {
        "aria-label": "Brand",
        width: 280,
        height: 32,
        viewBox: "0 0 657 56",
        xmlns: "http://www.w3.org/2000/svg",
        class: e
      },
      this.svg(
        "defs",
        {},
        this.svg("title", {}, "Legacy Concierge"),
        this.svg("desc", {}, "Brand Logo Full (inline)"),
        this.svg(
          "filter",
          { id: "smooth" },
          this.svg("feGaussianBlur", { stdDeviation: "0.2" })
        )
      ),
      this.svg(
        "g",
        {
          filter: "url(#smooth)",
          "shape-rendering": "geometricPrecision",
          fill: "currentColor",
          stroke: "currentColor",
          "stroke-width": ".4",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        },
        this.svg("path", {
          d: "M17.2 4.45q-2.43.14-3.54.54t-1.52 1.56q-.4 1.14-.4 3.7v33.47q0 2.56.4 3.7.4 1.16 1.52 1.53 1.11.37 3.54.37h4.93q4.18 0 6.37-1.18a7 7 0 0 0 3.2-3.81q1.02-2.64 1.5-7.63h1.54q-.2 2.1-.2 5.54 0 3.84.47 8.63-4.58-.2-15.45-.2-12.95 0-19.56.2v-1.35q2.43-.14 3.54-.54a2.4 2.4 0 0 0 1.52-1.55q.4-1.15.4-3.71V10.26q0-2.57-.4-3.71a2.4 2.4 0 0 0-1.52-1.56A14 14 0 0 0 0 4.45V3.11q2.84.2 8.63.2 5.4 0 8.57-.2zm78.63 31.07c5.23-3.54 11.57-5.77 17.98-5.05 15.64 1.93 30.15 9.6 45.9 3.58 2.15-.82 4.47-1.58 5.72-3.61.4-.64.58-1.46.25-2.2 1.38 3.25-3.26 5.54-5.67 6.55-5.12 2.2-10.79 2.98-16.34 2.9-10.24-.47-20.01-4.44-30-6.06-6.2-.94-12.4.89-17.84 3.9M74.68 50.87q-4.58-.2-15.45-.2-12.95 0-19.56.2v-1.35q2.43-.14 3.54-.54a2.4 2.4 0 0 0 1.52-1.55q.4-1.15.4-3.71V10.25q0-2.55-.4-3.7a2.4 2.4 0 0 0-1.52-1.56 14 14 0 0 0-3.54-.54V3.1q6.6.2 19.56.2 9.91 0 14.1-.2a76 76 0 0 0-.47 7.96q0 2.64.2 4.18h-1.55a32 32 0 0 0-1.22-6.5 5.5 5.5 0 0 0-2.5-3.1q-1.74-.99-5.32-.99h-5.6q-2.43 0-3.55.38-1.1.37-1.51 1.51t-.4 3.71v15.93h4.44q2.37 0 3.65-1.12a5.5 5.5 0 0 0 1.72-2.63q.44-1.52.7-3.81l.2-1.35h1.56q-.2 2.83-.2 6.34v3.24q0 3.45.4 9.58h-1.55l-.4-3.27q-.34-2.8-1.86-4.22-1.52-1.41-4.22-1.41H51.4v16.19q0 2.56.4 3.7.41 1.16 1.52 1.52 1.12.38 3.55.38h4.92q4.19 0 6.38-1.12a6.7 6.7 0 0 0 3.2-3.57q1.01-2.46 1.48-7.25h1.56q-.2 1.82-.2 4.85 0 3.85.47 8.64"
        }),
        this.svg("path", {
          d: "M120.52 31.94a.7.7 0 0 1-.38-.26h-.1q-1.5-.31-3.02-.43c-1.05-.1-2.13-.1-3.17-.27a.7.7 0 0 1-.5-.43l-3.84-.07-.07.07a2 2 0 0 1-1.24.25q-.5 0-1 .05l-.68.12v.74q3.04.14 4.39.6 1.35.48 1.89 1.76t.54 4.11v6.48a5 5 0 0 1-.37 2.13 4.4 4.4 0 0 1-1.59 1.58 12 12 0 0 1-7.02 2.1q-8.3 0-12.17-5.64-3.88-5.63-3.88-17.78 0-7.14 1.82-12.51 1.83-5.37 5.2-8.26a11.6 11.6 0 0 1 7.82-2.9q3.45 0 6.58 1.41a13.6 13.6 0 0 1 5.1 3.85 12 12 0 0 1 2.08 4.08q.68 2.33 1.28 5.9h1.56q0-11.14.27-15.52h-1.56q-.4 4.12-1.68 4.12-.48 0-1.35-.67a32 32 0 0 0-5.6-3.28 17 17 0 0 0-6.55-1.1 20.4 20.4 0 0 0-11.2 3.13 21 21 0 0 0-7.72 8.97q-2.8 5.84-2.8 13.53 0 7.48 2.63 12.88a19 19 0 0 0 7.6 8.26q4.95 2.88 11.9 2.87 3.1 0 5.63-.91 2.54-.9 4.9-2.73 1-.75 1.41-.95t.81-.2q.81 0 1.28 1.25.48 1.25.54 2.6h1.35V37.5q0-2.55.24-3.71.23-1.14.94-1.55.17-.1.38-.17zM163.6 45.2 147.13 2.77h-1.07L130.2 43.65q-1.95 5.06-5.33 5.87v1.35a52 52 0 0 1 5.06-.2q3.92 0 7.76.2v-1.35q-2.97-.07-4.42-1.01t-1.45-3.04q0-1.89 1.35-5.53l11-28.67 7.55 20.17.54 1.35 4.11 11.06q.81 2.02.81 3.17 0 1.35-1.1 1.86-1.12.5-3.69.64v1.35q2.84-.2 8.64-.2 4.52 0 7.22.2v-1.35q-3.03-.14-4.66-4.32m35.49-41.9q2.83 1.15 5.53 3.25.74.6 1.28.6 1.35 0 1.76-4.05h1.55q-.27 4.4-.27 15.52h-1.55q-.75-4.39-1.35-6.3-.6-1.93-2.02-3.68a12.5 12.5 0 0 0-5.16-3.95 17 17 0 0 0-6.78-1.32q-4.4 0-7.66 2.9-3.28 2.91-5.1 8.27a39 39 0 0 0-1.82 12.58q0 7.35 1.96 12.62 1.95 5.26 5.43 7.99a12.4 12.4 0 0 0 7.86 2.73q3.38 0 6.54-1.28a11 11 0 0 0 5-3.85q1.35-1.88 1.95-4.04t1.15-6.62h1.55q0 11.61.27 16.2h-1.55a12 12 0 0 0-.58-3.08q-.38-.9-1.04-.9-.55 0-1.42.53a29 29 0 0 1-5.8 3.28 18 18 0 0 1-6.68 1.1q-6.4 0-11.23-2.9a19.4 19.4 0 0 1-7.49-8.4q-2.66-5.49-2.66-13.11 0-7.42 2.73-13.16a21 21 0 0 1 7.62-8.9 20 20 0 0 1 11.1-3.17q4.05 0 6.88 1.15m54.17-.21v1.35q-1.35.34-2.63 1.72a20 20 0 0 0-2.77 4.29l-10.59 20.98v12.28q0 2.55.4 3.7t1.52 1.56 3.55.54v1.35q-3.1-.2-8.57-.2-5.8 0-8.64.2v-1.35q2.43-.14 3.54-.54a2.4 2.4 0 0 0 1.52-1.55q.4-1.15.4-3.71V33.6L217.3 8.3a11 11 0 0 0-2.12-3q-.9-.78-1.79-.78V3.11q2.63.2 5.94.2 6.53 0 9.44-.2v1.41q-4.72 0-4.72 2.57 0 1 .67 2.36l11.2 21.52 8.64-17.14q1.82-3.57 1.82-5.8 0-1.89-1.49-2.7-1.48-.8-4.45-.88V3.11q3.84.2 7.76.2 3.03 0 5.06-.2m58.54 15.51h-1.48q.4-2.63.4-4.65 0-3.24-1.07-5.33a9 9 0 0 0-3.61-3.88 10.3 10.3 0 0 0-5.23-1.38q-5.6 0-10.82 5.26a40 40 0 0 0-8.47 13.25 41 41 0 0 0-3.24 15.49q0 6.47 2.57 9.85a8.4 8.4 0 0 0 7.08 3.37q2.97 0 6.27-1.38t5.74-3.88a18 18 0 0 0 3.03-4.08 69 69 0 0 0 3.04-6.58h1.48q-3.17 11.67-3.98 16.19h-1.48q.2-1.41.2-2.3 0-1.74-.81-1.75-.47 0-1.42.6a36 36 0 0 1-6.13 3.35q-2.63 1.05-6.62 1.04-7.49 0-11.6-4.05t-4.11-11.8 3.88-15.65a36 36 0 0 1 10.65-13.02 24 24 0 0 1 14.88-5.13q3.9 0 5.97 1.11 2.06 1.12 4.08 3.28.47.6 1.01.6.6 0 1.25-.98.64-.97 1.45-3.07h1.42q-2.23 5.8-4.32 15.52m8.7 1.55a34.4 34.4 0 0 1 10.02-12.92q6.44-5.1 14.54-5.09 7.55 0 11.74 4.25 4.17 4.25 4.18 12 0 7.64-3.61 15.42a34.6 34.6 0 0 1-10.09 12.89 23 23 0 0 1-14.5 5.1q-7.5 0-11.67-4.26-4.2-4.24-4.19-11.94 0-7.62 3.58-15.45m14.13-11.94q-4.76 4.87-7.65 12.58a44 44 0 0 0-2.9 15.69q0 6.54 2.56 10.32t6.75 3.78q5.06 0 9.81-4.86t7.66-12.58a44 44 0 0 0 2.9-15.69q0-6.54-2.56-10.32t-6.75-3.78q-5.05 0-9.82 4.86m79.58-6.81a5.4 5.4 0 0 1 4.38 2.04v-.02q0-1.54-.95-2.5-.94-.93-3.1-.94-4.31 0-7.28 4.32-2.91 4.18-5.67 13.66a368 368 0 0 0-5.67 22.43L383.18 3.1q-2.36.2-5.46.2a69 69 0 0 1-6-.2l-.35 1.34q3.04.14 4.12.64 1.08.51 1.08 2.13 0 1.08-.4 3.03a439 439 0 0 1-5.88 26.45q-2.7 10.26-5.2 14.23-2.15 3.45-5.59 3.51h-.2c-2.38.06-2.96-.46-4.35-1.64q.25 3.05 4.01 3.06 2.43 0 4.08-1.15t3.14-3.1q2.7-3.58 5.63-15.25a560 560 0 0 0 6.24-28.6l15.38 43.44h1.49q4.12-19.43 7.35-30.66 3.24-11.23 6.2-15.68 2.24-3.38 5.54-3.44zm40.54 17.2h-1.49q.42-2.63.41-4.65 0-3.24-1.08-5.33a9 9 0 0 0-3.6-3.88 10.3 10.3 0 0 0-5.24-1.38q-5.6 0-10.82 5.26a40 40 0 0 0-8.47 13.25 41 41 0 0 0-3.24 15.49q0 6.47 2.57 9.85a8.4 8.4 0 0 0 7.08 3.37q2.97 0 6.27-1.38t5.74-3.88a18 18 0 0 0 3.04-4.08 69 69 0 0 0 3.03-6.58h1.49q-3.17 11.67-3.99 16.19h-1.48q.2-1.41.2-2.3 0-1.74-.8-1.75-.48 0-1.42.6a36 36 0 0 1-6.14 3.35q-2.63 1.05-6.62 1.04-7.48 0-11.6-4.05t-4.11-11.8 3.88-15.65a36 36 0 0 1 10.66-13.02 24 24 0 0 1 14.87-5.13q3.9 0 5.97 1.11 2.06 1.12 4.08 3.28.47.6 1.01.6.6 0 1.25-.98.64-.97 1.45-3.07h1.42q-2.23 5.8-4.32 15.52m12.08 28.4q0 1.42.98 1.9.97.45 3.6.6l-.27 1.35q-3.1-.2-8.56-.2-5.67 0-8.57.2l.34-1.35q2.36-.14 3.54-.54a3.5 3.5 0 0 0 1.89-1.59q.7-1.17 1.38-3.67l8.9-33.46q.54-2.3.54-3.24 0-1.49-.98-1.96t-3.54-.6l.34-1.35q2.76.2 8.57.2 5.4 0 8.63-.2l-.34 1.34q-2.5.14-3.67.54-1.18.41-1.9 1.56-.7 1.14-1.37 3.7l-8.9 33.47a19 19 0 0 0-.61 3.3M522.56 3.1a95 95 0 0 0-2.56 7.97 24 24 0 0 0-.95 4.18h-1.55q.6-3.91.6-5.4 0-2.9-1.48-4.05-1.48-1.14-5.33-1.14h-4.92q-2.44 0-3.61.37-1.18.37-1.93 1.52-.74 1.14-1.41 3.7l-4.25 15.93h4.45q2.36 0 3.92-1.12a9 9 0 0 0 2.42-2.6q.88-1.47 1.76-3.77.2-.67.54-1.42h1.55q-1.42 4.46-2.36 8.03l-.4 1.55q-.96 3.58-2.17 9.58h-1.55l.2-1.34q.08-.48.2-1.49.14-1.01.14-1.75 0-2.02-1.05-3.17t-3.6-1.15h-4.46l-4.31 16.19q-.61 2.1-.61 3.3 0 1.42 1.01 1.86t3.57.44h4.93q4.18 0 6.68-1.11a9.7 9.7 0 0 0 4.15-3.58 35 35 0 0 0 3.4-7.25h1.56a46 46 0 0 0-1.49 4.86 70 70 0 0 0-1.82 8.63q-4.58-.2-15.45-.2-12.94 0-19.5.2l.34-1.35q2.43-.14 3.61-.54a3.7 3.7 0 0 0 1.92-1.55q.75-1.14 1.42-3.71l8.97-33.46q.6-2.16.6-3.3 0-1.42-.97-1.9-.98-.46-3.54-.6l.33-1.35q6.61.2 19.57.2 9.45 0 13.42-.2m37.79 39.59h1.55l-.27.88q-1.21 4.26-3.07 6.24a6.5 6.5 0 0 1-4.96 2q-3.17 0-4.72-1.9a6.2 6.2 0 0 1-1.35-4.58l.54-7.56q.06-.81.07-2.16 0-2.84-1.02-4.38-1.01-1.57-3.67-2.26-2.66-.7-7.73-.78l-4.11 15.52q-.6 2.03-.6 3.3 0 1.35.97 1.9.98.53 3.61.6l-.27 1.35q-3.1-.2-8.36-.2a137 137 0 0 0-8.78.2l.27-1.35q2.43-.14 3.65-.54a3.5 3.5 0 0 0 1.92-1.55q.7-1.15 1.38-3.71l8.9-33.46q.61-2.3.61-3.17 0-1.42-1-2-1.02-.57-3.58-.64l.33-1.34q2.7.2 8.3.2 3.24 0 4.86-.07l5-.07q6.6 0 10.01 2.53a8.2 8.2 0 0 1 3.4 6.98q0 5.54-4.78 9.58-4.8 4.05-12.82 5.4.87.07 2.36.34 3.97.74 5.73 2.36t1.76 5.2q0 .87-.07 1.34l-.54 6.88q-.07.48-.07 1.42 0 4.11 2.16 4.11 1.14 0 2.1-1.38.93-1.38 1.95-4.28zm-24.22-15.85h2.02q9.1 0 13.19-3.98t4.08-10.6q0-3.96-2.02-5.9-2.02-1.91-6.55-1.92-2.02 0-3.17.51a4 4 0 0 0-1.85 1.72q-.7 1.21-1.32 3.58zm54.61 23.01q1.98-.6 3.47-1.49a6 6 0 0 0 2.02-1.82q.67-1 1.08-2.43l1.56-5.94q.6-2.22.6-3.5 0-1.7-1.21-2.26-1.22-.57-4.46-.71l.34-1.35a174 174 0 0 0 16.53 0l-.34 1.35a7 7 0 0 0-2.4.54q-.77.4-1.34 1.51-.57 1.13-1.25 3.75l-3.58 13.36h-1.34q.2-.81.2-1.76 0-2.1-1.01-2.09-.41 0-.91.2-.51.2-1.66.95a28 28 0 0 1-5.6 2.7q-2.76.93-5.87.94-8.23 0-12.61-4.01-4.4-4.02-4.39-11.44 0-7.83 3.81-15.78 3.82-7.96 10.6-13.2a24.2 24.2 0 0 1 15.14-5.22q4.05 0 6.44 1.11 2.4 1.12 4.63 3.27.6.6 1.14.61.68 0 1.32-.94.64-.95 1.38-3.1h1.48q-2.22 5.79-4.31 15.51h-1.49q.34-2.9.34-5.06 0-3.1-.95-4.92a9.6 9.6 0 0 0-4.18-3.88 14 14 0 0 0-6.2-1.38q-6.96 0-12.18 5.86a40 40 0 0 0-7.96 14.17q-2.74 8.3-2.74 15.18 0 6.08 2.87 8.97t8.8 2.9q2.24 0 4.22-.6M656.06 3.1a96 96 0 0 0-2.56 7.97 24 24 0 0 0-.94 4.18H651q.6-3.91.61-5.4 0-2.9-1.48-4.05-1.5-1.14-5.33-1.14h-4.93q-2.43 0-3.6.37a3.5 3.5 0 0 0-1.93 1.52q-.75 1.14-1.42 3.7l-4.25 15.93h4.46q2.36 0 3.91-1.12a9 9 0 0 0 2.43-2.6q.88-1.47 1.75-3.77.21-.67.54-1.42h1.56a168 168 0 0 0-2.37 8.03l-.4 1.55q-.94 3.58-2.16 9.58h-1.55l.2-1.34.2-1.49q.14-1.01.14-1.75 0-2.02-1.05-3.17t-3.6-1.15h-4.46l-4.32 16.19q-.6 2.1-.6 3.3 0 1.42 1 1.86 1.02.44 3.58.44h4.93q4.17 0 6.67-1.11a9.7 9.7 0 0 0 4.15-3.58 35 35 0 0 0 3.41-7.25h1.55q-.75 1.95-1.48 4.86a70 70 0 0 0-1.82 8.63q-4.59-.2-15.45-.2-12.96 0-19.5.2l.34-1.35q2.43-.14 3.6-.54a3.7 3.7 0 0 0 1.93-1.55q.75-1.14 1.41-3.71l8.98-33.46q.6-2.16.6-3.3 0-1.42-.98-1.9-.98-.46-3.54-.6l.34-1.35q6.6.2 19.56.2 9.45 0 13.43-.2"
        })
      )
    );
  }
  render() {
    const e = this.getAttribute("brand") || "Legacy Concierge";
    this.hasAttribute("fixed");
    const t = this.hasAttribute("transparent"), s = Array.from(this.querySelectorAll(":scope > a")).map(
      (m) => ({
        href: m.getAttribute("href") || "#",
        text: m.textContent
      })
    );
    s.length > 0;
    const i = this.clsx(
      "fixed",
      "inset-x-0 top-0 z-50",
      !t && "bg-canvas/92 backdrop-blur-sm"
    ), r = this.h(
      "header",
      { class: i, role: "banner" },
      // Container wrapper
      this.h(
        "div",
        { class: "card-shadow mx-auto max-w-7xl px-6 lg:px-8" },
        // Main nav
        this.h(
          "nav",
          {
            role: "navigation",
            "aria-label": "Global",
            class: "flex items-center justify-between py-6"
          },
          // Logo
          this.h(
            "div",
            { class: "flex" },
            this.h(
              "a",
              {
                href: "/",
                class: "-m-1.5 p-1.5 text-canvas"
              },
              this.h("span", { class: "sr-only" }, e),
              this.#f("h-8 w-auto")
            )
          ),
          // Mobile menu button
          this.h(
            "div",
            { class: "flex lg:hidden" },
            this.h(
              "button",
              {
                type: "button",
                class: "-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted",
                "aria-label": "Open main menu",
                onClick: () => this.openMenu()
              },
              this.#v()
            )
          ),
          // Desktop nav links
          this.h(
            "div",
            { class: "hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-12" },
            this.#u(
              "Home",
              d("/"),
              [
                {
                  href: d("/pages/about"),
                  text: "About Legacy",
                  desc: "Learn about our mission and values"
                },
                {
                  href: d("/pages/team/careers"),
                  text: "Careers",
                  desc: "Join our team of healthcare professionals"
                },
                {
                  href: d("/pages/partners"),
                  text: "Partners",
                  desc: "Our healthcare partnerships"
                },
                {
                  href: d("/pages/locations"),
                  text: "Locations",
                  desc: "Find a location near you"
                }
              ],
              {
                title: "Company",
                badge: "We're Hiring",
                description: "Join our team of dedicated healthcare professionals making a difference."
              }
            ),
            this.#u(
              "Treatments",
              d("/pages/treatments"),
              [
                {
                  href: d("/pages/treatments/cardiac"),
                  text: "Cardiac Care",
                  desc: "Comprehensive cardiac recovery and monitoring"
                },
                {
                  href: d("/pages/treatments/eating"),
                  text: "Eating Support",
                  desc: "Nutrition and dietary management"
                },
                {
                  href: d("/pages/treatments/iv"),
                  text: "IV Therapy",
                  desc: "Hydration and medication infusions"
                },
                {
                  href: d("/pages/treatments/neurological"),
                  text: "Neurological Care",
                  desc: "Specialized neurological support"
                },
                {
                  href: d("/pages/treatments/oncology"),
                  text: "Oncology Care",
                  desc: "Cancer treatment and recovery support"
                },
                {
                  href: d("/pages/treatments/pain"),
                  text: "Pain Management",
                  desc: "Advanced pain relief strategies"
                },
                {
                  href: d("/pages/treatments/palliative"),
                  text: "Palliative Care",
                  desc: "Comfort-focused end-of-life support"
                },
                {
                  href: d("/pages/treatments/post-op"),
                  text: "Post-Operative Care",
                  desc: "Surgical recovery and wound care"
                },
                {
                  href: d("/pages/treatments/respiratory"),
                  text: "Respiratory Care",
                  desc: "Breathing support and oxygen therapy"
                },
                {
                  href: d("/pages/treatments/wellness"),
                  text: "Wellness Programs",
                  desc: "Preventive care and health optimization"
                }
              ],
              {
                title: "Medical Services",
                badge: "24/7",
                description: "Expert care available around the clock for your peace of mind."
              }
            ),
            this.#u(
              "Expertise",
              d("/pages/services"),
              [
                {
                  href: d("/pages/services/als"),
                  text: "ALS Care",
                  desc: "Compassionate ALS patient support"
                },
                {
                  href: d("/pages/services/alzheimers"),
                  text: "Alzheimer's Care",
                  desc: "Memory care and cognitive support"
                },
                {
                  href: d("/pages/services/dementia"),
                  text: "Dementia Care",
                  desc: "Dementia-specific care strategies"
                },
                {
                  href: d("/pages/services/diabetes"),
                  text: "Diabetes Management",
                  desc: "Blood sugar monitoring and insulin support"
                },
                {
                  href: d("/pages/services/heart-disease"),
                  text: "Heart Disease",
                  desc: "Cardiovascular disease management"
                },
                {
                  href: d("/pages/services/ms"),
                  text: "Multiple Sclerosis",
                  desc: "MS symptom management and support"
                },
                {
                  href: d("/pages/services/oncology"),
                  text: "Oncology Services",
                  desc: "Cancer care coordination"
                },
                {
                  href: d("/pages/services/ostomy"),
                  text: "Ostomy Care",
                  desc: "Ostomy management and education"
                },
                {
                  href: d("/pages/services/parkinsons"),
                  text: "Parkinson's Care",
                  desc: "Parkinson's disease support"
                },
                {
                  href: d("/pages/services/stroke"),
                  text: "Stroke Recovery",
                  desc: "Post-stroke rehabilitation"
                },
                {
                  href: d("/pages/services/tbi"),
                  text: "Traumatic Brain Injury",
                  desc: "TBI recovery and cognitive rehabilitation"
                }
              ],
              {
                title: "Specialized Care",
                badge: "New",
                description: "Advanced treatments tailored to your unique health needs."
              }
            ),
            this.h(
              "a",
              {
                href: d("/pages/team"),
                class: "text-sm/6 font-semibold text-canvas text-uppercase"
              },
              "Team"
            ),
            this.h(
              "a",
              {
                href: d("/pages/contact"),
                class: "text-sm/6 font-semibold text-canvas text-uppercase"
              },
              "Contact"
            )
          ),
          // Desktop Search Button
          this.h(
            "div",
            { class: "hidden lg:flex lg:ml-8" },
            this.h(
              "button",
              {
                type: "button",
                class: "-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted",
                "aria-label": "Search",
                onClick: () => this.openSearch()
              },
              this.svg(
                "svg",
                {
                  fill: "currentColor",
                  width: "18",
                  height: "18",
                  "aria-hidden": "true",
                  role: "img",
                  xmlns: "http://www.w3.org/2000/svg",
                  "xmlns:xlink": "http://www.w3.org/1999/xlink",
                  viewBox: "0 0 24 24",
                  name: "icon-search"
                },
                this.svg("title", {}, "Search"),
                this.svg("desc", {}, "Icon"),
                this.svg("path", {
                  d: "M16.32 14.9l1.1 1.1c.4-.02.83.13 1.14.44l3 3a1.5 1.5 0 0 1-2.12 2.12l-3-3a1.5 1.5 0 0 1-.44-1.14l-1.1-1.1a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                })
              )
            )
          )
        )
      )
    ), n = this.h(
      "dialog",
      {
        class: "backdrop:p-0 w-full max-w-lg rounded-xl fixed top-[87px] right-[6px] left-auto m-0 z-50",
        ref: (m) => {
          this.#a = m;
        }
      },
      this.h(
        "div",
        {
          class: "bg-canvas rounded-xl shadow-2xl ring-1 border-soft"
        },
        this.h(
          "form",
          { method: "dialog", class: "relative" },
          this.svg(
            "svg",
            {
              fill: "none",
              width: "18",
              height: "18",
              "aria-hidden": "true",
              role: "img",
              xmlns: "http://www.w3.org/2000/svg",
              "xmlns:xlink": "http://www.w3.org/1999/xlink",
              viewBox: "0 0 24 24",
              name: "icon-search",
              class: "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            },
            this.svg("title", {}, "Search"),
            this.svg("desc", {}, "Icon"),
            this.svg("path", {
              fill: "currentColor",
              d: "M16.32 14.9l1.1 1.1c.4-.02.83.13 1.14.44l3 3a1.5 1.5 0 0 1-2.12 2.12l-3-3a1.5 1.5 0 0 1-.44-1.14l-1.1-1.1a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
            })
          ),
          this.h("input", {
            type: "search",
            name: "search",
            placeholder: "Search...",
            autofocus: !0,
            class: "w-full rounded-xl border-0 py-4 pl-12 pr-4 input-fg placeholder-muted sm:text-sm/6"
          }),
          this.h(
            "button",
            {
              type: "button",
              class: "absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-medium text-muted",
              onClick: () => this.closeSearch()
            },
            "ESC"
          )
        )
      )
    ), h = this.h("div", {
      class: "mobile-menu-backdrop fixed inset-0 lg:hidden hidden z-40",
      onClick: () => this.closeMenu(),
      ref: (m) => {
        this.#n = m;
      }
    }), c = this.h(
      "div",
      {
        class: "mobile-menu-panel fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-canvas p-6 sm:max-w-sm sm:ring-1 border-soft lg:hidden hidden",
        role: "dialog",
        "aria-modal": "true",
        ref: (m) => {
          this.#l = m;
        }
      },
      // Mobile header
      this.h(
        "div",
        { class: "flex items-center justify-between" },
        this.h(
          "a",
          { href: "/", class: "-m-1.5 p-1.5 text-canvas" },
          this.h("span", { class: "sr-only" }, e),
          this.#f("h-8 w-auto")
        ),
        this.h(
          "button",
          {
            type: "button",
            class: "-m-2.5 rounded-md p-2.5 text-muted",
            "aria-label": "Close menu",
            onClick: () => this.closeMenu()
          },
          this.#C()
        )
      ),
      // Mobile nav content
      this.h(
        "div",
        { class: "mt-6 flow-root" },
        this.h(
          "div",
          {
            class: "-my-6 divide-y border-soft"
          },
          this.h(
            "div",
            { class: "space-y-2 py-6" },
            this.#m("Home", [
              { href: d("/pages/about"), text: "About Legacy" },
              { href: d("/pages/team/careers"), text: "Careers" },
              { href: d("/pages/partners"), text: "Partners" },
              { href: d("/pages/locations"), text: "Locations" }
            ]),
            this.#m("Treatments", [
              {
                href: d("/pages/treatments/cardiac"),
                text: "Cardiac Care"
              },
              {
                href: d("/pages/treatments/eating"),
                text: "Eating Support"
              },
              { href: d("/pages/treatments/iv"), text: "IV Therapy" },
              {
                href: d("/pages/treatments/neurological"),
                text: "Neurological Care"
              },
              {
                href: d("/pages/treatments/oncology"),
                text: "Oncology Care"
              },
              {
                href: d("/pages/treatments/pain"),
                text: "Pain Management"
              },
              {
                href: d("/pages/treatments/palliative"),
                text: "Palliative Care"
              },
              {
                href: d("/pages/treatments/post-op"),
                text: "Post-Operative Care"
              },
              {
                href: d("/pages/treatments/respiratory"),
                text: "Respiratory Care"
              },
              {
                href: d("/pages/treatments/wellness"),
                text: "Wellness Programs"
              }
            ]),
            this.#m("Expertise", [
              { href: d("/pages/services/als"), text: "ALS Care" },
              {
                href: d("/pages/services/alzheimers"),
                text: "Alzheimer's Care"
              },
              {
                href: d("/pages/services/dementia"),
                text: "Dementia Care"
              },
              {
                href: d("/pages/services/diabetes"),
                text: "Diabetes Management"
              },
              {
                href: d("/pages/services/heart-disease"),
                text: "Heart Disease"
              },
              {
                href: d("/pages/services/ms"),
                text: "Multiple Sclerosis"
              },
              {
                href: d("/pages/services/oncology"),
                text: "Oncology Services"
              },
              {
                href: d("/pages/services/ostomy"),
                text: "Ostomy Care"
              },
              {
                href: d("/pages/services/parkinsons"),
                text: "Parkinson's Care"
              },
              {
                href: d("/pages/services/stroke"),
                text: "Stroke Recovery"
              },
              {
                href: d("/pages/services/tbi"),
                text: "Traumatic Brain Injury"
              }
            ]),
            this.h(
              "a",
              {
                href: d("/pages/team"),
                class: "-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-canvas text-uppercase",
                onClick: () => this.closeMenu()
              },
              "TEAM"
            ),
            this.h(
              "a",
              {
                href: d("/pages/contact"),
                class: "-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-canvas text-uppercase",
                onClick: () => this.closeMenu()
              },
              "CONTACT"
            )
          ),
          this.h(
            "div",
            { class: "py-6" },
            this.h(
              "button",
              {
                type: "button",
                class: "-mx-3 flex items-center gap-3 rounded-lg px-3 py-2.5 text-base/7 font-semibold text-canvas",
                onClick: () => {
                  this.closeMenu(), this.openSearch();
                }
              },
              this.svg(
                "svg",
                {
                  fill: "none",
                  width: "18",
                  height: "18",
                  "aria-hidden": "true",
                  role: "img",
                  xmlns: "http://www.w3.org/2000/svg",
                  "xmlns:xlink": "http://www.w3.org/1999/xlink",
                  viewBox: "0 0 24 24",
                  name: "icon-search"
                },
                this.svg("title", {}, "Search"),
                this.svg("desc", {}, "Icon"),
                this.svg("path", {
                  fill: "currentColor",
                  d: "M16.32 14.9l1.1 1.1c.4-.02.83.13 1.14.44l3 3a1.5 1.5 0 0 1-2.12 2.12l-3-3a1.5 1.5 0 0 1-.44-1.14l-1.1-1.1a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                })
              ),
              "Search"
            )
          )
        )
      )
    );
    this.innerHTML = "", this.appendChild(r), this.appendChild(n), this.appendChild(h), this.appendChild(c);
  }
}
l("global-nav", Ft);
export {
  te as Avatar,
  se as AvatarButton,
  ns as BANNER_TEMPLATE,
  ie as Badge,
  ae as BadgeButton,
  Yt as Button,
  Xt as Card,
  ts as CardBody,
  es as CardDescription,
  ss as CardFooter,
  Jt as CardHeader,
  Qt as CardTitle,
  at as Checkbox,
  it as CheckboxField,
  st as CheckboxGroup,
  It as Code,
  Vt as ContentInfo,
  xt as Description,
  ot as DescriptionDetails,
  rt as DescriptionList,
  nt as DescriptionTerm,
  lt as Dialog,
  mt as DialogActions,
  ht as DialogBody,
  dt as DialogDescription,
  ct as DialogTitle,
  ne as Divider,
  oe as Drawer,
  he as DrawerBody,
  de as DrawerDescription,
  me as DrawerFooter,
  le as DrawerHeader,
  ce as DrawerTitle,
  ue as Dropdown,
  be as DropdownButton,
  we as DropdownDescription,
  Ce as DropdownDivider,
  ge as DropdownHeader,
  ve as DropdownHeading,
  fe as DropdownItem,
  ye as DropdownLabel,
  pe as DropdownMenu,
  xe as DropdownSection,
  vt as ErrorMessage,
  Bt as FOOTER_TEMPLATE,
  ft as Field,
  pt as FieldGroup,
  ut as Fieldset,
  Pt as GlobalFooter,
  rs as HERO_VIDEO_DISABLED,
  R as HERO_VIDEO_ENABLED,
  is as Heading,
  Rt as HeroBanner,
  wt as Input,
  yt as InputGroup,
  gt as Label,
  bt as Legend,
  ke as LocationCard,
  os as NAVBAR_TEMPLATE,
  Ee as Navbar,
  Ae as NavbarDivider,
  ze as NavbarItem,
  qe as NavbarLabel,
  Ne as NavbarSection,
  Le as NavbarSpacer,
  Te as Pagination,
  je as PaginationGap,
  _e as PaginationList,
  Se as PaginationNext,
  He as PaginationPage,
  Me as PaginationPrevious,
  Ie as ProfileCard,
  Oe as QuoteCard,
  Nt as Radio,
  At as RadioField,
  Et as RadioGroup,
  re as RoleCard,
  Lt as Select,
  Be as Sidebar,
  Ve as SidebarBody,
  Ge as SidebarDivider,
  Re as SidebarFooter,
  Pe as SidebarHeader,
  We as SidebarHeading,
  Ke as SidebarItem,
  Ue as SidebarLabel,
  Xe as SidebarLayout,
  Fe as SidebarSection,
  $e as SidebarSpacer,
  Dt as Strong,
  as as Subheading,
  et as Switch,
  Qe as SwitchField,
  Je as SwitchGroup,
  zt as Table,
  Tt as TableBody,
  _t as TableCell,
  qt as TableHead,
  St as TableHeader,
  Mt as TableRow,
  Ht as Text,
  jt as TextLink,
  Ot as Textarea,
  Zt as TouchTarget
};
