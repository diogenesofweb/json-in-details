<script>
	import './jid.css';
	import { get_path } from '$lib/stuff';
	import init from '$lib';
	const { generate_HTML } = init();

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	/** @type {any} */
	export let json;

	let preline = false;

	$: html = generate_HTML(json, {
		// links_as_tags: true
		escape_HTML: true,
		show_newline_chars: false
	});
</script>

<div
	class="jid dark2"
	class:preline
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
