const brakets_4_object = {
	closed: '{ ... }',
	start: '{',
	end: '}'
};
// Object.freeze(brakets_4_object);
const brakets_4_array = {
	closed: '[ ... ]',
	start: '[',
	end: ']'
};
// Object.freeze(brakets_4_array);

function escape_HTML(/** @type {string} */ unsafe) {
	return unsafe
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#039;');
}

/** @param {string} path */
function t(path) {
	return ` title="${path}" `;
}
// class prefix
const cp = 'jid--';
// html classes
export const hc = {
	// null: `${cp}null`,
	// empty: `${cp}empty`,

	null: `null`,
	empty: `empty`,

	link: `${cp}link`,
	ok: `${cp}obj-key`,
	block: `${cp}block`,
	item: `${cp}item`
};

/** @param {string | URL} str */
function is_valid_URL(str) {
	try {
		const _ = new URL(str);
		return true;
	} catch (e) {
		// console.warn(e);
		return false;
	}
}

/**
 * @param {string} val
 * @param {LinkOpts} opt
 */
function is_valid_link(val, opt) {
	switch (opt) {
		case 1:
			if (val.startsWith('/') || val.startsWith('http://') || val.startsWith('https://')) {
				return true;
			}
			break;

		case 2:
			if (val.startsWith('http://') || val.startsWith('https://')) {
				return true;
			}
			break;

		case 3:
			if (is_valid_URL(val)) {
				return true;
			}
			break;

		default:
			break;
	}

	return false;
}

const q = '&quot;';
// primitive types + [] + {}
/** @param {any} val */
function digest_val(val) {
	const typeof_ = typeof val;

	if (typeof_ === 'string') {
		if (do_escape_HTML) {
			val = escape_HTML(val);
		}

		if (do_check_links && is_valid_link(val, do_check_links)) {
			return `<a class="${hc.link}" href=${val.replaceAll(q, '"')}>"${val}"</a>`;
		}

		if (do_stringify) {
			val = JSON.stringify(val);
		} else {
			val = `"${val}"`;
		}

		return `<span class="${cp}${typeof_}">${val}</span>`;
	}

	let class_;

	// console.log(typeof val);
	if (typeof_ === 'object') {
		if (val === null) {
			class_ = hc.null;
		} else {
			class_ = hc.empty;

			if (val instanceof Array) {
				val = '[]';
			} else {
				val = '{}';
			}
		}
	} else {
		class_ = typeof_;
	}

	return `<span class="${cp}${class_}">${val}</span>`;
}

/**
 * @param {string} key
 * @param {any} val
 * @param {string} path
 */
function make_entry(key, val, ends_with = '', path) {
	// console.log({ doEscapeHTML });
	const el = digest_val(val);

	const attrs = `tabindex="0" class="${hc.item}" ${t(path)}`;

	if (key) {
		// is obj entry
		return `<div ${attrs}><span class="${hc.ok}">"${key}":</span> ${el}${ends_with}</div>`;
	} else {
		// is arr entry
		return `<div ${attrs}>${el}${ends_with}</div>`;
	}
}

/**
 * @param {[string, any][]} entries
 * @param {string} prev_path
 */
function make_from_object(entries, prev_path) {
	let html = '';

	for (let i = 0; i < entries.length; i++) {
		const [k, v] = entries[i];

		// const path = prev_path + '.' + k;
		const ek = k.replaceAll('"', '&quot;').replaceAll("'", '&#039;');
		const path = prev_path + `['${ek}']`;

		const is_last = i + 1 === entries.length;
		const ends_with = is_last ? '' : ',';
		// console.log([k, v]);
		if (typeof v == 'object' && v !== null) {
			html += handle_objectlike(k, v, is_last, path);
		} else {
			// console.log({ v });
			html += make_entry(k, v, ends_with, path);
		}
	}

	return html;
}

/**
 * @param {any[]} arr
 * @param {string} prev_path
 */
function make_from_array(arr, prev_path) {
	let html = '';

	for (let i = 0; i < arr.length; i++) {
		const v = arr[i];
		const path = prev_path + `[${i}]`;

		const last = i + 1 === arr.length;
		const ends_with = last ? '' : ',';

		if (typeof v == 'object' && v !== null) {
			html += handle_objectlike('', v, last, path);
		} else {
			html += make_entry('', v, ends_with, path);
		}
	}

	return html;
}

// objectlike = obj || arr
/**
 * @param {string} key
 * @param {{[s: string]: any;} | ArrayLike<any>} value
 * @param {boolean} is_last
 * @param {string} prev_path
 */
function handle_objectlike(key, value, is_last, prev_path) {
	const ends_with = is_last ? '' : ',';
	let brakets;
	// let brakets = { ...braketsArr };
	const path = prev_path || key;
	let elems = '';

	if (value instanceof Array) {
		brakets = { ...brakets_4_array };

		if (value.length === 0) {
			return make_entry(key, value, ends_with, path);
		}

		elems += make_from_array(value, path);

		brakets.closed = `[ ... ${value.length} ]${ends_with}`;
	} else {
		// } else if (value instanceof Object) {
		brakets = { ...brakets_4_object };

		const entries = Object.entries(value);

		if (entries.length === 0) {
			return make_entry(key, value, ends_with, path);
		}

		elems += make_from_object(entries, path);

		brakets.closed = `{ ... ${entries.length} }${ends_with}`;
	}

	const withKey = key ? `<span class="${hc.ok}">"${key}":</span>` : '';

	const result = `
<details class="${cp}dtl" open>
  <summary ${t(path)}>
    ${withKey}
    <span class="on-open">${brakets.start}</span>
    <span class="on-closed">${brakets.closed}</span>
  </summary>
  <div class="${hc.block}">${elems}</div>
  <div>${brakets.end}${ends_with}</div>
</details>
`;

	return result;
}

let do_stringify = false;
let do_escape_HTML = true;
/** @typedef { 0 | 1 | 2 | 3 } LinkOpts */
/** @type {LinkOpts} */
let do_check_links = 0;

/**
 * @param {{[s: string]: any;} | ArrayLike<any> | null} json
 * @param {{ show_newline_chars?: boolean | undefined; escape_HTML?: boolean | undefined; clickable_link?: LinkOpts | undefined; }} opts
 */
export default function generate_HTML(json, opts) {
	const { show_newline_chars = false, escape_HTML = true, clickable_link = 0 } = opts;

	if (json === null) {
		return 'null';
	}

	if (typeof json !== 'object' || !json) {
		return json;
	}

	// display \r\n
	do_stringify = show_newline_chars;
	do_escape_HTML = escape_HTML;
	do_check_links = clickable_link;

	return handle_objectlike('', json, true, '$');
}
