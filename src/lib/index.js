import generate_HTML from './generateJSONView.js';
import { handle_keymaps } from './keymaps.js';
import { collapse_all, expand_all, filter_by, get_path } from './stuff.js';

/** @type {string} default selector */
const DS = '.jid';

/**
 * @param {string} [selector] container selector, defaults to `.jid`
 */
export default function jid(selector = DS) {
	return {
		collapse: () => collapse_all(selector),
		expand: () => expand_all(selector),
		filter: (/** @type {string} */ str, is_regex = false) => filter_by(selector, str, is_regex)
	};
}

export { collapse_all, expand_all, filter_by, generate_HTML, get_path, handle_keymaps };
