/**
 * Table Element Templates
 * Tailwind CSS Plus / Catalyst-style table templates
 *
 * @module elements/table
 */

import { clsx, createElement } from "../../utilities/dom.js";

/**
 * Table wrapper styles
 * @type {string}
 */
export const TABLE_WRAPPER = "flow-root";

/**
 * Table outer container styles (scrollable)
 * @type {string}
 */
export const TABLE_OUTER = "-mx-[--gutter] overflow-x-auto whitespace-nowrap";

/**
 * Table inner container styles
 * @type {string}
 */
export const TABLE_INNER =
	"inline-block min-w-full align-middle sm:px-[--gutter]";

/**
 * Table inner container styles (no bleed)
 * @type {string}
 */
export const TABLE_INNER_NO_BLEED =
	"inline-block min-w-full align-middle sm:px-[--gutter]";

/**
 * Base table styles
 * @type {string}
 */
export const TABLE_BASE = "min-w-full text-left text-sm/6 text-canvas";

/**
 * Table head styles
 * @type {string}
 */
export const TABLE_HEAD = "text-muted";

/**
 * Table header cell styles
 * @type {string}
 */
export const TABLE_HEADER = [
	"border-b border-b-zinc-950/10 px-4 py-2 font-medium",
	"first:pl-[--gutter] last:pr-[--gutter]",
	"dark:border-b-white/10",
].join(" ");

/**
 * Table header cell styles (no bleed)
 * @type {string}
 */
export const TABLE_HEADER_NO_BLEED = "sm:first:pl-2 sm:last:pr-2";

/**
 * Table header cell styles (grid mode)
 * @type {string}
 */
export const TABLE_HEADER_GRID =
	"border-l border-l-zinc-950/5 first:border-l-0 dark:border-l-white/5";

/**
 * Table row styles
 * @type {string}
 */
export const TABLE_ROW = "";

/**
 * Table row styles (striped)
 * @type {string}
 */
export const TABLE_ROW_STRIPED =
	"even:bg-zinc-950/[2.5%] dark:even:bg-white/[2.5%]";

/**
 * Table row styles (clickable)
 * @type {string}
 */
export const TABLE_ROW_CLICKABLE = [
	"has-[[data-row-link]:focus-visible]:outline-2 has-[[data-row-link]:focus-visible]:-outline-offset-2 has-[[data-row-link]:focus-visible]:outline-blue-500",
].join(" ");

/**
 * Table cell styles
 * @type {string}
 */
export const TABLE_CELL = [
	"relative px-4 first:pl-[--gutter] last:pr-[--gutter]",
	"border-b border-zinc-950/5",
	"dark:border-white/5",
].join(" ");

/**
 * Table cell styles (no bleed)
 * @type {string}
 */
export const TABLE_CELL_NO_BLEED = "sm:first:pl-2 sm:last:pr-2";

/**
 * Table cell styles (grid mode)
 * @type {string}
 */
export const TABLE_CELL_GRID =
	"border-l border-l-zinc-950/5 first:border-l-0 dark:border-l-white/5";

/**
 * Table cell styles (dense mode)
 * @type {string}
 */
export const TABLE_CELL_DENSE = "py-2.5";

/**
 * Table cell styles (normal mode)
 * @type {string}
 */
export const TABLE_CELL_NORMAL = "py-4";

/**
 * Table cell styles (striped, no bottom border)
 * @type {string}
 */
export const TABLE_CELL_STRIPED = "border-b-0";

/**
 * Creates a table container with Tailwind CSS Plus styling
 *
 * @param {Object} options - Table configuration
 * @param {boolean} [options.bleed=false] - Allow content to bleed to edges
 * @param {boolean} [options.dense=false] - Use compact row spacing
 * @param {boolean} [options.grid=false] - Show grid lines between cells
 * @param {boolean} [options.striped=false] - Show alternating row colors
 * @param {string} [options.className] - Additional classes
 * @param {Object} [options.attributes] - Additional HTML attributes
 * @returns {HTMLDivElement} Table wrapper containing table structure
 */
export function createTable(options = {}) {
	const { bleed = false, className = "", attributes = {} } = options;

	// Store options for child elements to access
	const tableOptions = { ...options };

	const tableElement = createElement("table", {
		class: clsx(TABLE_BASE, className),
		...attributes,
	});

	// Store options on table for reference by child creation functions
	tableElement._tableOptions = tableOptions;

	const innerContainer = createElement(
		"div",
		{
			class: clsx(TABLE_INNER, !bleed && "sm:px-[--gutter]"),
		},
		tableElement,
	);

	const outerContainer = createElement(
		"div",
		{
			class: TABLE_OUTER,
		},
		innerContainer,
	);

	const wrapper = createElement(
		"div",
		{
			class: TABLE_WRAPPER,
			style: "--gutter: 1.5rem",
		},
		outerContainer,
	);

	// Expose table element for adding rows
	wrapper._table = tableElement;
	wrapper._tableOptions = tableOptions;

	return wrapper;
}

/**
 * Creates a table head element
 *
 * @param {Object} options - Table head configuration
 * @param {string} [options.className] - Additional classes
 * @returns {HTMLTableSectionElement} Table head element
 */
export function createTableHead(options = {}) {
	const { className = "" } = options;

	return createElement("thead", {
		class: clsx(TABLE_HEAD, className),
	});
}

/**
 * Creates a table body element
 *
 * @param {Object} options - Table body configuration
 * @param {string} [options.className] - Additional classes
 * @returns {HTMLTableSectionElement} Table body element
 */
export function createTableBody(options = {}) {
	const { className = "" } = options;

	return createElement("tbody", {
		class: className,
	});
}

/**
 * Creates a table row element
 *
 * @param {Object} options - Table row configuration
 * @param {string} [options.href] - Link URL for clickable row
 * @param {boolean} [options.striped=false] - Apply striped styling
 * @param {string} [options.className] - Additional classes
 * @returns {HTMLTableRowElement} Table row element
 */
export function createTableRow(options = {}) {
	const { href, striped = false, className = "" } = options;

	return createElement("tr", {
		class: clsx(
			TABLE_ROW,
			striped && TABLE_ROW_STRIPED,
			href && TABLE_ROW_CLICKABLE,
			className,
		),
	});
}

/**
 * Creates a table header cell element
 *
 * @param {Object} options - Table header cell configuration
 * @param {boolean} [options.bleed=false] - Allow content to bleed
 * @param {boolean} [options.grid=false] - Show grid lines
 * @param {string} [options.className] - Additional classes
 * @returns {HTMLTableCellElement} Table header cell element
 */
export function createTableHeader(options = {}) {
	const { bleed = false, grid = false, className = "" } = options;

	return createElement("th", {
		class: clsx(
			TABLE_HEADER,
			!bleed && TABLE_HEADER_NO_BLEED,
			grid && TABLE_HEADER_GRID,
			className,
		),
	});
}

/**
 * Creates a table data cell element
 *
 * @param {Object} options - Table cell configuration
 * @param {boolean} [options.bleed=false] - Allow content to bleed
 * @param {boolean} [options.dense=false] - Use compact spacing
 * @param {boolean} [options.grid=false] - Show grid lines
 * @param {boolean} [options.striped=false] - Remove bottom border for striped tables
 * @param {string} [options.className] - Additional classes
 * @returns {HTMLTableCellElement} Table data cell element
 */
export function createTableCell(options = {}) {
	const {
		bleed = false,
		dense = false,
		grid = false,
		striped = false,
		className = "",
	} = options;

	return createElement("td", {
		class: clsx(
			TABLE_CELL,
			!bleed && TABLE_CELL_NO_BLEED,
			dense ? TABLE_CELL_DENSE : TABLE_CELL_NORMAL,
			grid && TABLE_CELL_GRID,
			striped && TABLE_CELL_STRIPED,
			className,
		),
	});
}

/**
 * Creates a table template element
 *
 * @param {Object} options - Table configuration
 * @returns {HTMLTemplateElement} Template containing table markup
 */
export function createTableTemplate(options = {}) {
	const template = document.createElement("template");
	const table = createTable(options);
	template.content.appendChild(table);
	return template;
}

/**
 * Pre-defined table templates for common use cases
 */
export const tableTemplates = {
	/** Basic table */
	basic: () => createTable(),

	/** Striped table */
	striped: () => createTable({ striped: true }),

	/** Dense/compact table */
	dense: () => createTable({ dense: true }),

	/** Grid table */
	grid: () => createTable({ grid: true }),

	/** Full-width table (bleed) */
	bleed: () => createTable({ bleed: true }),
};
