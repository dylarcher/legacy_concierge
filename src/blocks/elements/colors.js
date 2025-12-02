/**
 * Shared color definitions for UI components
 * @module colors
 */

/**
 * Button color variants with Tailwind CSS classes
 * @constant {Object.<string, string>}
 */
export const BUTTON_COLORS = {
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
};

/**
 * Checkbox color variants with CSS custom properties
 * @constant {Object.<string, string>}
 */
export const CHECKBOX_COLORS = {
	"dark/zinc":
		"[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.zinc.900)] [--checkbox-checked-border:theme(colors.zinc.950/90%)] dark:[--checkbox-checked-bg:theme(colors.zinc.600)]",
	"dark/white":
		"[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.zinc.900)] [--checkbox-checked-border:theme(colors.zinc.950/90%)] dark:[--checkbox-check:theme(colors.zinc.900)] dark:[--checkbox-checked-bg:white]",
	white:
		"[--checkbox-check:theme(colors.zinc.900)] [--checkbox-checked-bg:white] [--checkbox-checked-border:theme(colors.zinc.950/15%)]",
	dark: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.zinc.900)] [--checkbox-checked-border:theme(colors.zinc.950/90%)]",
	zinc: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.zinc.600)] [--checkbox-checked-border:theme(colors.zinc.700/90%)]",
	red: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.red.600)] [--checkbox-checked-border:theme(colors.red.700/90%)]",
	orange:
		"[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.orange.500)] [--checkbox-checked-border:theme(colors.orange.600/90%)]",
	amber:
		"[--checkbox-check:theme(colors.amber.950)] [--checkbox-checked-bg:theme(colors.amber.400)] [--checkbox-checked-border:theme(colors.amber.500/80%)]",
	yellow:
		"[--checkbox-check:theme(colors.yellow.950)] [--checkbox-checked-bg:theme(colors.yellow.300)] [--checkbox-checked-border:theme(colors.yellow.400/80%)]",
	lime: "[--checkbox-check:theme(colors.lime.950)] [--checkbox-checked-bg:theme(colors.lime.300)] [--checkbox-checked-border:theme(colors.lime.400/80%)]",
	green:
		"[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.green.600)] [--checkbox-checked-border:theme(colors.green.700/90%)]",
	emerald:
		"[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.emerald.600)] [--checkbox-checked-border:theme(colors.emerald.700/90%)]",
	teal: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.teal.600)] [--checkbox-checked-border:theme(colors.teal.700/90%)]",
	cyan: "[--checkbox-check:theme(colors.cyan.950)] [--checkbox-checked-bg:theme(colors.cyan.300)] [--checkbox-checked-border:theme(colors.cyan.400/80%)]",
	sky: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.sky.500)] [--checkbox-checked-border:theme(colors.sky.600/80%)]",
	blue: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.blue.600)] [--checkbox-checked-border:theme(colors.blue.700/90%)]",
	indigo:
		"[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.indigo.500)] [--checkbox-checked-border:theme(colors.indigo.600/90%)]",
	violet:
		"[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.violet.500)] [--checkbox-checked-border:theme(colors.violet.600/90%)]",
	purple:
		"[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.purple.500)] [--checkbox-checked-border:theme(colors.purple.600/90%)]",
	fuchsia:
		"[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.fuchsia.500)] [--checkbox-checked-border:theme(colors.fuchsia.600/90%)]",
	pink: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.pink.500)] [--checkbox-checked-border:theme(colors.pink.600/90%)]",
	rose: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.rose.500)] [--checkbox-checked-border:theme(colors.rose.600/90%)]",
};

/**
 * Radio button color variants with CSS custom properties
 * @constant {Object.<string, string>}
 */
export const RADIO_COLORS = {
	"dark/zinc":
		"[--radio-checked-bg:theme(colors.zinc.900)] [--radio-checked-border:theme(colors.zinc.950/90%)] [--radio-checked-indicator:white] dark:[--radio-checked-bg:theme(colors.zinc.600)]",
	"dark/white":
		"[--radio-checked-bg:theme(colors.zinc.900)] [--radio-checked-border:theme(colors.zinc.950/90%)] [--radio-checked-indicator:white] dark:[--radio-checked-bg:white] dark:[--radio-checked-indicator:theme(colors.zinc.900)]",
	white:
		"[--radio-checked-bg:white] [--radio-checked-border:theme(colors.zinc.950/15%)] [--radio-checked-indicator:theme(colors.zinc.900)]",
	dark: "[--radio-checked-bg:theme(colors.zinc.900)] [--radio-checked-border:theme(colors.zinc.950/90%)] [--radio-checked-indicator:white]",
	zinc: "[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.zinc.600)] [--radio-checked-border:theme(colors.zinc.700/90%)]",
	red: "[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.red.600)] [--radio-checked-border:theme(colors.red.700/90%)]",
	orange:
		"[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.orange.500)] [--radio-checked-border:theme(colors.orange.600/90%)]",
	amber:
		"[--radio-checked-bg:theme(colors.amber.400)] [--radio-checked-border:theme(colors.amber.500/80%)] [--radio-checked-indicator:theme(colors.amber.950)]",
	yellow:
		"[--radio-checked-bg:theme(colors.yellow.300)] [--radio-checked-border:theme(colors.yellow.400/80%)] [--radio-checked-indicator:theme(colors.yellow.950)]",
	lime: "[--radio-checked-bg:theme(colors.lime.300)] [--radio-checked-border:theme(colors.lime.400/80%)] [--radio-checked-indicator:theme(colors.lime.950)]",
	green:
		"[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.green.600)] [--radio-checked-border:theme(colors.green.700/90%)]",
	emerald:
		"[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.emerald.600)] [--radio-checked-border:theme(colors.emerald.700/90%)]",
	teal: "[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.teal.600)] [--radio-checked-border:theme(colors.teal.700/90%)]",
	cyan: "[--radio-checked-bg:theme(colors.cyan.300)] [--radio-checked-border:theme(colors.cyan.400/80%)] [--radio-checked-indicator:theme(colors.cyan.950)]",
	sky: "[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.sky.500)] [--radio-checked-border:theme(colors.sky.600/80%)]",
	blue: "[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.blue.600)] [--radio-checked-border:theme(colors.blue.700/90%)]",
	indigo:
		"[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.indigo.500)] [--radio-checked-border:theme(colors.indigo.600/90%)]",
	violet:
		"[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.violet.500)] [--radio-checked-border:theme(colors.violet.600/90%)]",
	purple:
		"[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.purple.500)] [--radio-checked-border:theme(colors.purple.600/90%)]",
	fuchsia:
		"[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.fuchsia.500)] [--radio-checked-border:theme(colors.fuchsia.600/90%)]",
	pink: "[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.pink.500)] [--radio-checked-border:theme(colors.pink.600/90%)]",
	rose: "[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.rose.500)] [--radio-checked-border:theme(colors.rose.600/90%)]",
};

/**
 * Array of all available color names
 * @constant {string[]}
 */
export const COLOR_NAMES = Object.keys(CHECKBOX_COLORS);

/**
 * Gets a color value from a color map with fallback
 * @param {Object.<string, string>} colorMap - The color map to search
 * @param {string} colorName - The color name to find
 * @param {string} fallback - The fallback color name if not found
 * @returns {string} The color value
 */
export function getColor(colorMap, colorName, fallback = "dark/zinc") {
	return colorMap[colorName] || colorMap[fallback];
}
