<script>
	import './jid.css';
	import { get_path } from '$lib/stuff';
	import { generate_HTML } from '$lib';
	import { createEventDispatcher } from 'svelte';
	import { storage } from '$utils/local_storage';
	import { handle_keymaps } from '$lib/keymaps';
	import { snack_error, snack_new } from '@kazkadien/svelte';
	import { browser } from '$app/environment';

	const dispatch = createEventDispatcher();

	/** @type {any} */
	export let json;

	let preline = false;

	$: html = generate_HTML(json, {
		// @ts-ignore
		clickable_link: storage.clickable_links.value,
		escape_HTML: storage.escape_HTML.value,
		show_newline_chars: storage.show_newline_char.value
	});

	/** @type {(ev: KeyboardEvent) => void} */
	let on_key;

	if (storage.keymaps.value) {
		on_key = on_keydown;
	}

	/** @param {KeyboardEvent} ev */
	function on_keydown(ev) {
		// console.log(ev.key);
		if (ev.key === 'y') {
			if (ev.target instanceof HTMLElement) {
				// console.log(ev);

				let node_text = '';
				if (ev.target.tagName === 'SUMMARY') {
					node_text = ev.target.parentElement.innerText;
				} else {
					node_text = ev.target.innerText;
				}
				node_text = node_text.replace(/,$/, '');

				navigator.clipboard
					.writeText(node_text)
					.then(() => snack_new('Copied to clipboard !'))
					.catch((err) => snack_error(err));
			}

			return;
		}

		if (ev.key === 'p') {
			document.getElementById('copy-path')?.click();
			return;
		}

		handle_keymaps(ev);
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<code
	id="jid"
	class="jid"
	class:preline
	class:dark={browser && document.documentElement.classList.contains('dark')}
	on:keydown={on_key}
	on:focusin={(ev) => {
		const path = get_path(ev);
		dispatch('path_change', path);
	}}
>
	{@html html}
</code>

<style>
	code {
		display: block;
	}
</style>
