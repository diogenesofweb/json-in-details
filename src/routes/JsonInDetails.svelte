<script>
	import './jid.css';
	import { get_path } from '$lib/stuff';
	import { generate_HTML } from '$lib';
	import { createEventDispatcher } from 'svelte';
	import { storage } from '$utils/local_storage';
	import { handle_keymaps } from '$lib/keymaps';

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
</script>

<div
	class="jid dark2"
	class:preline
	on:keydown={handle_keymaps}
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
