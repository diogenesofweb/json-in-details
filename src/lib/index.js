import generate_HTML from './generateJSONView.js';
import { handle_key_navigation } from './navigate.js';
import { collapse_all, expand_all, filter_by, get_path } from './stuff.js';

/** @type {string} default selector */
const DS = '.jid';

/**
 * @param {string} [selector] container selector, defaults to `.jid`
 */
export default function jid(selector = DS) {
	return {
		generate_HTML,
		handle_key_navigation,
		get_path,
		collapse: () => collapse_all(selector),
		expand: () => expand_all(selector),
		filter: (/** @type {string} */ str) => filter_by(selector, str)
	};
}

export { collapse_all, expand_all, filter_by, get_path, generate_HTML, handle_key_navigation };
