<script>
	import { storage } from '$utils/local_storage';
	import { BoxField, BoxFieldEntry, Btn, Field, Icon, ThemeFormSelect } from '@kazkadien/svelte';

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

	const panels = [
		[0, 'No'],
		[1, 'Filter'],
		[2, 'Node path']
	];
</script>

<Btn iconOnly variant="text" title="Settings" on:click={() => dialog.showModal()}>
	<Icon name="settings" />
</Btn>

<dialog bind:this={dialog}>
	<form class="form v2" on:submit|preventDefault>
		<ThemeFormSelect />

		<Field label="Sticky Panel">
			<select
				value={storage.sticky.value}
				on:change={(ev) => {
					// console.log(storage.clickable_links.value);
					const v = +ev.currentTarget.value;
					// console.log(v);
					storage.sticky.set(v);
				}}
			>
				{#each panels as el}
					<option value={el[0]}>{el[1]}</option>
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

		<BoxField rows>
			<BoxFieldEntry label="Escape HTML">
				<input
					type="checkbox"
					checked={storage.escape_HTML.value}
					on:change={(ev) => {
						// @ts-ignore
						const v = ev.target.checked;
						storage.escape_HTML.set(v);
					}}
				/>
			</BoxFieldEntry>

			<BoxFieldEntry label="Show newline chars `/n/r`">
				<input
					type="checkbox"
					checked={storage.show_newline_char.value}
					on:change={(ev) => {
						// @ts-ignore
						const v = ev.target.checked;
						storage.show_newline_char.set(v);
					}}
				/>
			</BoxFieldEntry>

			<BoxFieldEntry label="Enable keymaps">
				<input
					type="checkbox"
					checked={storage.keymaps.value}
					on:change={(ev) => {
						// @ts-ignore
						const v = ev.target.checked;
						storage.keymaps.set(v);
					}}
				/>
			</BoxFieldEntry>
		</BoxField>
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
