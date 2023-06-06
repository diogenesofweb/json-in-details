<script>
	import { storage } from '$utils/local_storage';
	import { Btn, Field, Icon } from '@kazkadien/svelte';

	/** @type {HTMLDialogElement} */
	let dialog;
	export function on_open() {
		dialog.showModal();
	}

	const opts = [
		[0, 'No'],
		[1, 'String starts with "/" or "http(s)://"'],
		[2, 'String starts with "http(s)://"'],
		[3, 'String a valid URL']
	];
</script>

<Btn iconOnly variant="text" on:click={() => dialog.showModal()}>
	<Icon name="settings" />
</Btn>

<dialog bind:this={dialog}>
	<form class="form v2" on:submit|preventDefault>
		<Field label="Escape HTML">
			<select
				value={storage.escape_HTML.value}
				on:change={(ev) => {
					const v = ev.currentTarget.value === 'true' ? true : false;
					storage.escape_HTML.set(v);
				}}
			>
				{#each [true, false] as el}
					<option>{el}</option>
				{/each}
			</select>
		</Field>

		<Field label="Show newline chars">
			<select
				value={storage.show_newline_char.value}
				on:change={(ev) => {
					const v = ev.currentTarget.value === 'true' ? true : false;
					storage.show_newline_char.set(v);
				}}
			>
				{#each [true, false] as el}
					<option>{el}</option>
				{/each}
			</select>
		</Field>

		<Field label="Clickable links">
			<select
				value={storage.clickable_links.value}
				on:change={(ev) => {
					// console.log(storage.clickable_links.value);
					const v = +ev.currentTarget.value;
					// console.log(v);
					storage.clickable_links.set(v);
				}}
			>
				{#each opts as el}
					<option value={el[0]}>{el[1]}</option>
				{/each}
			</select>
		</Field>
	</form>
</dialog>

<style>
	form {
		background: var(--bg2);
		padding-inline: var(--sx-m);
		padding-block: var(--sy-l);

		border-radius: 1em;
		width: clamp(300px, 80vw, 90ch);

		display: grid;
		gap: 2em;
	}
</style>
