import { hc } from './generateJSONView.js';
// console.log(cc.block);

// FOLD
/**
 * @param {boolean} open
 * @param {string} selector
 */
function toggle_fold(selector, open) {
	document
		.querySelector(`${selector} > details`)
		?.querySelectorAll('details')
		?.forEach((el) => {
			// console.log(el.open);
			el.open = open;
		});
}
/**
 * @param {string} selector
 */
export function collapse_all(selector) {
	toggle_fold(selector, false);
}
/**
 * @param {string} selector
 */
export function expand_all(selector) {
	toggle_fold(selector, true);
}
// FOLD

// FILTER
//
// https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
/** @param {string} string */
function escapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

// https://stackoverflow.com/questions/874709/converting-user-input-string-to-regular-expression
function stringToRegex(str) {
	const match = str.match(/^([\/~@;%#'])(.*?)\1([gimsuy]*)$/);
	return match
		? new RegExp(
				match[2],
				match[3]
					.split('')
					.filter((char, pos, flagArr) => flagArr.indexOf(char) === pos)
					.join('')
			)
		: new RegExp(str);
}

let is_filtered = false;

/**
 * @param {string} str
 * @param {string} selector
 */
export function filter_by(selector, str, is_regex = false) {
	if (str.length < 2) {
		if (is_filtered) {
			clear_filter(selector);
			is_filtered = false;
			// console.log('reset')
		}
		return;
	}

	const el = document.querySelector(`${selector} > details > .${hc.block}`);
	if (!el) return;

	const regex = is_regex ? stringToRegex(str) : new RegExp(escapeRegExp(str), 'i');

	filter_block(el, regex);
	is_filtered = true;
}

/**
 * @param {Element} elem
 * @param {RegExp} regex
 */
function filter_block(elem, regex) {
	for (let i = 0; i < elem.children.length; i++) {
		const child = elem.children[i];

		if (!(child instanceof HTMLElement)) return;

		// console.log(child);
		// console.log(child.tagName);
		const is_in = regex.test(child.textContent || '');

		if (!is_in) {
			child.style.display = 'none';
			continue;
		}

		if (child.style.display === 'none') {
			child.style.display = '';
		}

		if (child.tagName === 'DETAILS') {
			const block_elem = child.querySelector(`.${hc.block}`);
			if (block_elem) filter_block(block_elem, regex);
		}
	}
}

/**
 * @param {string} selector
 */
function clear_filter(selector) {
	// console.log({selector})
	const container = document.querySelector(selector);
	// console.log({ container });

	if (!container) {
		throw new Error('container missing');
	}
	const list = container?.querySelectorAll(`.${hc.block} > :where(div, details)`);
	// console.log(list);
	list.forEach((el) => {
		// console.log(el.tagName);
		// console.log(el.style.display);
		if (el.style.display === 'none') {
			el.style.display = '';
		}
	});
}
// FILTER

// PATH
/** @param {Event} ev */
export function get_path(ev) {
	// console.log(ev);
	// console.log(ev.target);
	const el = ev?.target;
	/** @type {string } */
	let t = el?.title || '';

	if (!t) {
		const parent = el.closest('[title]');
		// console.log(parent);
		t = parent?.title;
	}

	return t;
}
