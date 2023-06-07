<script>
	import './jid.css';
	import { get_path } from '$lib/stuff';
	import { generate_HTML } from '$lib';
	import { createEventDispatcher } from 'svelte';
	import { storage } from '$utils/local_storage';
	import { handle_keymaps } from '$lib/keymaps';
	import { addSnack, notifyError } from '$utils/Snacks.svelte';

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

	/** @param {KeyboardEvent} ev */
	function on_key(ev) {
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
					.then(() => addSnack('Copied to clipboard !'))
					.catch((err) => notifyError(err));
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

<div
	class="jid dark2"
	class:preline
	on:keydown={on_key}
	on:focusin={(ev) => {
		const path = get_path(ev);
		dispatch('path_change', path);
	}}
>
	{@html html}
</div>

<style>
	/* div { */
	/* 	border: 1px solid var(--bga); */
	/* } */
</style>
