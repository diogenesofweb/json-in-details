/** @typedef { 0 | 1 | 2 | 3 } LinkOpts */
// /** @type {LinkOpts} */
// const cl = 0;

export const storage = {
	theme: setupStorage('theme', ''),
	sticky: setupStorage('sticky', 2),

	keymaps: setupStorage('escape_HTML', true),

	clickable_links: setupStorage('clickable_links', 0),
	escape_HTML: setupStorage('escape_HTML', true),
	show_newline_char: setupStorage('show_newline_char', false)
};

/**
 * @template T
 * @param {string} storageKey
 * @param {T} defaultsTo
 * @returns {{value: T, set: (val: T) => void}}
 */
function setupStorage(storageKey, defaultsTo) {
	const isBool = typeof defaultsTo === 'boolean';
	const isNum = typeof defaultsTo === 'number';

	function get() {
		const val = localStorage.getItem(storageKey);

		if (val) {
			if (isBool) return val === 'true' ? true : false;
			if (isNum) return Number(val);
			return val;
		}

		return defaultsTo;
	}

	const obj = {
		/** @param {T} val */
		set(val) {
			this.value = val;
			localStorage.setItem(storageKey, `${val}`);
		},

		value: get()
	};
	// @ts-ignore
	return obj;
}
