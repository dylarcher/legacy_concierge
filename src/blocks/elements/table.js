import { BaseComponent, defineElement } from "./_base.js";

/**
 * Table component with configurable styles
 *
 * @element ui-table
 * @attr {boolean} bleed - Allow content to bleed to edges
 * @attr {boolean} dense - Use compact row spacing
 * @attr {boolean} grid - Show grid lines between cells
 * @attr {boolean} striped - Show alternating row colors
 *
 * @example
 * <ui-table striped>
 *   <ui-table-head>...</ui-table-head>
 *   <ui-table-body>...</ui-table-body>
 * </ui-table>
 */
export class Table extends BaseComponent {
	static get observedAttributes() {
		return ["bleed", "dense", "grid", "striped"];
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback() {
		if (this.isConnected) {
			this.render();
		}
	}

	get tableOptions() {
		return {
			bleed: this.hasAttribute("bleed"),
			dense: this.hasAttribute("dense"),
			grid: this.hasAttribute("grid"),
			striped: this.hasAttribute("striped"),
		};
	}

	render() {
		const { bleed } = this.tableOptions;

		const outerClasses =
			"-mx-[var(--gutter,1.5rem)] overflow-x-auto whitespace-nowrap";
		const innerClasses = this.clsx(
			"inline-block min-w-full align-middle",
			!bleed && "sm:px-[var(--gutter,1.5rem)]",
		);
		const tableClasses =
			"min-w-full text-left text-sm/6 text-zinc-950 dark:text-white";

		// Get existing children (ui-table-head, ui-table-body)
		const children = Array.from(this.childNodes);
		this.innerHTML = "";

		const wrapper = this.h(
			"div",
			{ class: "flow-root" },
			this.h(
				"div",
				{ class: outerClasses },
				this.h(
					"div",
					{ class: innerClasses },
					this.h("table", { class: tableClasses }, ...children),
				),
			),
		);

		this.appendChild(wrapper);

		// Propagate options to child elements
		this._propagateOptions();
	}

	_propagateOptions() {
		const options = this.tableOptions;
		this.querySelectorAll(
			"ui-table-head, ui-table-body, ui-table-row, ui-table-header, ui-table-cell",
		).forEach((el) => {
			el._tableOptions = options;
			if (el.updateFromTable) el.updateFromTable();
		});
	}
}

/**
 * Table head container
 *
 * @element ui-table-head
 */
export class TableHead extends BaseComponent {
	connectedCallback() {
		this.render();
	}

	render() {
		const classes = "text-zinc-500 dark:text-zinc-400";
		const children = Array.from(this.childNodes);
		this.innerHTML = "";

		const thead = this.h("thead", { class: classes }, ...children);
		this.appendChild(thead);
	}
}

/**
 * Table body container
 *
 * @element ui-table-body
 */
export class TableBody extends BaseComponent {
	connectedCallback() {
		this.render();
	}

	render() {
		const children = Array.from(this.childNodes);
		this.innerHTML = "";

		const tbody = this.h("tbody", {}, ...children);
		this.appendChild(tbody);
	}
}

/**
 * Table row component
 *
 * @element ui-table-row
 * @attr {string} href - Link URL for clickable row
 * @attr {string} target - Link target
 * @attr {string} title - Accessible title for row link
 */
export class TableRow extends BaseComponent {
	static get observedAttributes() {
		return ["href", "target", "title"];
	}

	_tableOptions = { bleed: false, dense: false, grid: false, striped: false };

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback() {
		if (this.isConnected) {
			this.render();
		}
	}

	updateFromTable() {
		if (this.isConnected) {
			this.render();
		}
	}

	render() {
		const href = this.getAttribute("href");
		const { striped } = this._tableOptions;

		const classes = this.clsx(
			href && [
				"has-[[data-row-link]:focus-visible]:outline-2 has-[[data-row-link]:focus-visible]:-outline-offset-2 has-[[data-row-link]:focus-visible]:outline-blue-500",
				"dark:focus-within:bg-white/[2.5%]",
			],
			striped && "even:bg-zinc-950/[2.5%] dark:even:bg-white/[2.5%]",
			href && striped && "hover:bg-zinc-950/5 dark:hover:bg-white/5",
			href && !striped && "hover:bg-zinc-950/[2.5%] dark:hover:bg-white/[2.5%]",
		);

		const children = Array.from(this.childNodes);
		this.innerHTML = "";

		const tr = this.h("tr", { class: classes }, ...children);
		this.appendChild(tr);

		// Pass row context to cells
		this.querySelectorAll("ui-table-cell").forEach((cell) => {
			cell._rowOptions = {
				href: this.getAttribute("href"),
				target: this.getAttribute("target"),
				title: this.getAttribute("title"),
			};
			if (cell.updateFromRow) cell.updateFromRow();
		});
	}
}

/**
 * Table header cell
 *
 * @element ui-table-header
 */
export class TableHeader extends BaseComponent {
	_tableOptions = { bleed: false, dense: false, grid: false, striped: false };

	connectedCallback() {
		this.render();
	}

	updateFromTable() {
		if (this.isConnected) {
			this.render();
		}
	}

	render() {
		const { bleed, grid } = this._tableOptions;

		const classes = this.clsx(
			"border-b border-b-zinc-950/10 px-4 py-2 font-medium",
			"first:pl-[var(--gutter,0.5rem)] last:pr-[var(--gutter,0.5rem)]",
			"dark:border-b-white/10",
			grid &&
				"border-l border-l-zinc-950/5 first:border-l-0 dark:border-l-white/5",
			!bleed && "sm:first:pl-1 sm:last:pr-1",
			this.className,
		);

		const children = Array.from(this.childNodes);
		this.innerHTML = "";

		const th = this.h("th", { class: classes }, ...children);
		this.appendChild(th);
	}
}

/**
 * Table data cell
 *
 * @element ui-table-cell
 */
export class TableCell extends BaseComponent {
	_tableOptions = { bleed: false, dense: false, grid: false, striped: false };
	_rowOptions = { href: null, target: null, title: null };

	connectedCallback() {
		this.render();
	}

	updateFromTable() {
		if (this.isConnected) {
			this.render();
		}
	}

	updateFromRow() {
		if (this.isConnected) {
			this.render();
		}
	}

	render() {
		const { bleed, dense, grid, striped } = this._tableOptions;
		const { href, target, title } = this._rowOptions;

		const classes = this.clsx(
			"relative px-4 first:pl-[var(--gutter,0.5rem)] last:pr-[var(--gutter,0.5rem)]",
			!striped && "border-b border-zinc-950/5 dark:border-white/5",
			grid &&
				"border-l border-l-zinc-950/5 first:border-l-0 dark:border-l-white/5",
			dense ? "py-2.5" : "py-4",
			!bleed && "sm:first:pl-1 sm:last:pr-1",
			this.className,
		);

		const children = Array.from(this.childNodes);
		this.innerHTML = "";

		const td = this.h("td", { class: classes });

		// Add row link if href is set
		if (href) {
			const isFirst =
				this.parentElement?.querySelector("ui-table-cell") === this;
			const link = this.h("a", {
				"data-row-link": "",
				href,
				target: target || undefined,
				"aria-label": title || undefined,
				tabindex: isFirst ? "0" : "-1",
				class: "absolute inset-0 focus:outline-none",
			});
			td.appendChild(link);
		}

		for (const child of children) {
			td.appendChild(child);
		}
		this.appendChild(td);
	}
}

defineElement("ui-table", UITable);
defineElement("ui-table-head", UITableHead);
defineElement("ui-table-body", UITableBody);
defineElement("ui-table-row", UITableRow);
defineElement("ui-table-header", UITableHeader);
defineElement("ui-table-cell", UITableCell);
