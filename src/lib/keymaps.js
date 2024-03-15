/**
 * @param {KeyboardEvent} ev
 */
export function handle_keymaps(ev) {
  // console.log(ev.key);
  if (
    ![
      "h",
      "j",
      "k",
      "l",
      "c",
      "e",
      "ArrowLeft",
      "ArrowRight",
      "ArrowDown",
      "ArrowUp",
    ].includes(ev.key)
  ) {
    return;
  }

  // ev.preventDefault();

  // console.log(ev);
  const el = ev.target;

  if (!(el instanceof HTMLElement)) return;

  if (ev.key === "e" || ev.key === "c") {
    // console.log('e');
    if (el.parentNode instanceof HTMLDetailsElement) {
      el.parentNode.querySelectorAll("details").forEach((d) => {
        // console.log(d);
        d.open = ev.key === "e" ? true : false;
      });
    }
    return;
  }

  if (ev.key === "l" || ev.key === "ArrowRight") {
    // console.log(el);
    if (el.tagName === "SUMMARY") {
      const dtl = el.parentElement;
      if (dtl instanceof HTMLDetailsElement) dtl.open = true;

      let next = el.nextElementSibling?.firstElementChild || null;

      while (next) {
        // console.log(ns);
        if (next.style.display === "none") {
          next = next.nextElementSibling;
        } else {
          break;
        }
      }

      return focus(next);
    }

    // if (el.tagName === 'DIV') {
    // 	// console.log(el);
    // 	let sub = el.nextElementSibling;
    // 	while (sub) {
    // 		// console.log(sub);
    // 		if (sub instanceof HTMLDetailsElement) {
    // 			sub.open = true;
    // 			const l = sub.querySelector('.jid--block > :first-child');
    // 			return focus(l);
    // 		}
    // 		sub = sub.nextElementSibling;
    // 	}
    // }

    return;
  }

  const parent = el.closest("div.jid--block");
  if (!parent) {
    // console.warn('no parent');
    return;
  }
  // console.log('children: ' + parent.children.length);

  if (
    (ev.key === "h" || ev.key === "ArrowLeft") &&
    parent.previousElementSibling
  ) {
    return focus(parent.previousElementSibling);
  }

  if (parent.children.length < 1) {
    // console.log('only one elem');
    return;
  }

  if (ev.key === "j" || ev.key === "ArrowDown") {
    /** @type {Element | null } */
    let next = null;
    if (el instanceof HTMLDivElement) {
      next = el.nextElementSibling;
    } else {
      next = el.parentElement?.nextElementSibling || null;
    }
    // console.log(next);

    while (next) {
      // console.log(ns);
      if (next.style.display === "none") {
        next = next.nextElementSibling;
      } else {
        break;
      }
    }

    if (!next) {
      for (const child of parent.children) {
        if (child.style.display !== "none") {
          return focus(child);
        }
      }
    }

    return focus(next);
  } else if (ev.key === "k" || ev.key === "ArrowUp") {
    /** @type {Element | null } */
    let prev = null;
    if (el instanceof HTMLDivElement) {
      prev = el.previousElementSibling;
    } else {
      prev = el.parentElement?.previousElementSibling || null;
    }

    while (prev) {
      // console.log(ns);
      if (prev.style.display === "none") {
        prev = prev.previousElementSibling;
      } else {
        break;
      }
    }
    // console.log(prev);

    if (!prev) {
      const arr = [...parent.children].reverse();
      for (const child of arr) {
        // console.log(child);
        if (child.style.display !== "none") {
          return focus(child);
        }
      }
    }

    return focus(prev);
  }
}

/**
 * @param {Element | null} el
 */
function focus(el) {
  if (!el) return;

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
