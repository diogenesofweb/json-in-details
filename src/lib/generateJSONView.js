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
// CSS classes
const cc = {
	// string: 'string',
	// number: 'number',
	// boolean: 'boolean',
	null: `${cp}null`,
	empty: `${cp}empty`,

	ok: `${cp}obj-key`,
	block: `${cp}block`,
	item: `${cp}item`
};

/**
 * @param {string} key
 * @param {string | number | boolean | null} val
 * @param {string} class_type
 * @param {string} path
 */
function make_obj_entry(key, val, class_type, ends_with = '', path) {
	// console.log({ doEscapeHTML });
	if (typeof val === 'string' && do_escape_HTML) {
		val = escape_HTML(val);
	}

	const x = `tabindex="0" class="${cc.item}" ${t(path)}`;

	return `<div ${x}><span class="${cc.ok}">"${key}":</span> <span class="${cp}${class_type}">${val}</span>${ends_with}</div>`;
}
/**
 * @param {any} val
 * @param {string} ends_with
 * @param {string} class_type
 * @param {string} path
 */
function make_array_entry(val, class_type, ends_with, path) {
	const x = `tabindex="0" class="${cc.item} ${cp}${class_type}" ${t(path)}`;
	return `<div ${x}><span>${val}</span>${ends_with}</div>`;
}

function fm(/** @type {any} */ v) {
	if (do_stringify) {
		return typeof v === 'string' ? JSON.stringify(v) : v;
	}

	return typeof v === 'string' ? `"${v}"` : v;
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
			html += handle_object(k, v, is_last, path);
		} else {
			// console.log({ v });
			// const my_class = v === null ? cc.empty : typeof v;
			const my_class = v === null ? cc.null : typeof v;
			html += make_obj_entry(k, fm(v), my_class, ends_with, path);
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
			html += handle_object('', v, last, path);
		} else {
			html += make_array_entry(fm(v), typeof v, ends_with, path);
		}
	}

	return html;
}

/**
 * @param {string} key
 * @param {string | number | boolean} val
 * @param {string} ends_with
 * @param {string} prev_path
 */
function make_empty_entry(key, val, ends_with, prev_path) {
	if (key) {
		return make_obj_entry(key, val, cc.empty, ends_with, prev_path);
	} else {
		return make_array_entry(val, cc.empty, ends_with, prev_path);
	}
}

/**
 * @param {string} key
 * @param {{[s: string]: any;} | ArrayLike<any>} value
 * @param {boolean} is_last
 * @param {string} prev_path
 */
function handle_object(key, value, is_last, prev_path) {
	const ends_with = is_last ? '' : ',';
	let brakets;
	// let brakets = { ...braketsArr };
	const path = prev_path || key;
	let elems = '';

	if (value instanceof Array) {
		brakets = { ...brakets_4_array };

		if (value.length === 0) {
			return make_empty_entry(key, '[]', ends_with, path);
		}

		elems += make_from_array(value, path);

		brakets.closed = `[ ... ${value.length} ]${ends_with}`;
	} else {
		// } else if (value instanceof Object) {
		brakets = { ...brakets_4_object };

		const entries = Object.entries(value);

		if (entries.length === 0) {
			return make_empty_entry(key, '{}', ends_with, path);
		}

		elems += make_from_object(entries, path);

		brakets.closed = `{ ... ${entries.length} }${ends_with}`;
	}

	const withKey = key ? `<span class="${cc.ok}">"${key}":</span>` : '';

	const result = `
<details class="${cp}dtl" open>
  <summary ${t(path)}>
    ${withKey}
    <span class="on-open">${brakets.start}</span>
    <span class="on-closed">${brakets.closed}</span>
  </summary>
  <div class="${cc.block}">${elems}</div>
  <div>${brakets.end}${ends_with}</div>
</details>
`;

	return result;
}

let do_stringify = false;
let do_escape_HTML = true;

/** @param {Object} json */
export default function generate_HTML(json, { show_newline_chars = false, escape_HTML = true }) {
	if (json === null) {
		return 'null';
	}

	if (typeof json !== 'object' || !json) {
		return json;
	}

	// display \r\n
	do_stringify = show_newline_chars;
	do_escape_HTML = escape_HTML;

	return handle_object('', json, true, '$');
}
