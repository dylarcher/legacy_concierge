/**
 * Vanilla JS Web Components Library
 *
 * A dependency-free component library built with Web Components and Tailwind CSS.
 * Converted from React/JSX Catalyst components.
 */

export * from "../elements/base.js";
export * from "./avatar.js";
export * as badge from "./badge.js";
export * as button from "./button.js";
export * from "./button-call-to-action.js";
export * from "./button-service.js";
export * from "./button-tel-mail.js";
export * from "./card-location.js";
export * from "./card-treatment.js";
export * from "./dialog/main.js";
export * from "./dialog-treatment.js";
export * from "./divider.js";
export * from "./dropdown.js";
export * from "./fieldset/main.js";
export { checkbox, input, radio, select, textarea } from "./forms/main.js";
export * from "./heading/main.js";
export * from "./heading-divided.js";
export { descriptionList as dlist } from "./lists/main.js";
export * from "./section-callout-image.js";
export * from "./table/main.js";
export * from "./team-member.js";
export * from "./text/main.js";

/**
 * Initializes all UI components
 * Components auto-register when imported via defineElement
 * @returns {void}
 */
export function initializeComponents() {}
