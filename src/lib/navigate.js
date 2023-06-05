/**
 * @param {KeyboardEvent} ev
 */
export function handle_key_navigation(ev) {
	if (!['h', 'j', 'k', 'l', 'c', 'e'].includes(ev.key)) {
		return;
	}

	// console.log(ev);
	const el = ev.target;

	const is_html_elem = el instanceof HTMLElement;
	if (!is_html_elem) return;

	if (ev.key === 'e' || ev.key === 'c') {
		// console.log('e');
		if (el.parentNode instanceof HTMLDetailsElement) {
			el.parentNode.querySelectorAll('details').forEach((d) => {
				// console.log(d);
				d.open = ev.key === 'e' ? true : false;
			});
		}
		return;
	}

	if (ev.key === 'l') {
		// console.log(el);
		if (el.tagName === 'SUMMARY') {
			const dtl = el.parentElement;
			if (dtl instanceof HTMLDetailsElement) dtl.open = true;

			const l = el.nextElementSibling?.firstElementChild || null;
			// console.log(l);
			focus(l);
		}

		if (el.tagName === 'DIV') {
			// console.log(el);

			let sub = el.nextElementSibling;

			while (sub) {
				// console.log(sub);
				if (sub instanceof HTMLDetailsElement) {
					sub.open = true;
					const l = sub.querySelector('.jid--block > :first-child');
					// console.log(l);
					focus(l);
					sub = null;
					break;
				}

				sub = sub.nextElementSibling;
			}
		}

		return;
	}

	const parent = el.closest('div.jid--block');
	if (!parent) {
		// console.warn('no parent');
		return;
	}
	// console.log('children: ' + parent.children.length);

	if (ev.key === 'h' && parent.previousElementSibling) {
		focus(parent.previousElementSibling);
		return;
	}

	if (parent.children.length < 1) {
		// console.log('only one elem');
		return;
	}

	if (ev.key === 'j') {
		/** @type {Element | null } */
		let next = null;
		if (el instanceof HTMLDivElement) {
			next = el.nextElementSibling;
		} else {
			next = el.parentElement?.nextElementSibling || null;
		}

		// console.log(next);

		if (!next) {
			focus(parent.children[0]);
			return;
		}
		focus(next);
		return;
	} else if (ev.key === 'k') {
		/** @type {Element | null } */
		let prev = null;
		if (el instanceof HTMLDivElement) {
			prev = el.previousElementSibling;
		} else {
			prev = el.parentElement?.previousElementSibling || null;
		}

		// console.log(prev);

		if (!prev) {
			focus(parent.children[parent.children.length - 1]);
			return;
		}

		focus(prev);
		return;
	}
}

/**
 * @param {Element | null} el
 */
function focus(el) {
	if (el instanceof HTMLDetailsElement) {
		el.firstElementChild.focus();
		return;
	} else {
		// } else (el instanceof HTMLElement) {
		// if (el.tagName === 'DIV' || el.tagName === 'SUMMARY') {
		el.focus();
		return;
		// }
		// console.log('nope :');
		// console.log(el);
	}
}
