<script context="module">
	import { Snackbar } from '@kazkadien/svelte';
	import { writable } from 'svelte/store';
	/** @type {import('$utils/types').Snack[] } */
	const arr = [];
	const snacks = writable(arr);

	/**
	 * @param {string} msg
	 * @param {import('@kazkadien/svelte/dist/types').Accent} accent
	 */
	export function addSnack(msg, accent = 'alpha') {
		snacks.update((v) => [...v, { id: performance.now(), body: msg, accent }]);
	}

	/** @param {Error | unknown} error */
	export function notifyError(error) {
		console.error(error);
		// @ts-ignore
		const msg = error.message || 'Something went wrong :(';
		addSnack(msg, 'danger');
	}
</script>

{#each $snacks as el, idx (el.id)}
	<Snackbar
		on:close={() => ($snacks = $snacks.filter((_, i) => i !== idx))}
		accent={el.accent || 'alpha'}
		iconName={el.icon || 'info'}
		filled
		closable
		autoclose={5000}
	>
		<p>{@html el.body}</p>
	</Snackbar>
{/each}

<style>
	/* your styles go here */
</style>
