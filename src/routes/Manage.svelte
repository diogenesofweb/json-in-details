<script>
	import { addSnack, notifyError } from '$utils/Snacks.svelte';
	import { my_json } from '$utils/stores';
	import { Btn } from '@kazkadien/svelte';
	import NewEntry from './NewEntry.svelte';
	import History from './History.svelte';

	/** @type {History} */
	let history_comp;
	/** @type {NewEntry} */
	let new_entry_comp;

	async function handle_copy() {
		// const data = { a: 1 };
		const data = $my_json;

		try {
			const str = JSON.stringify(data, null, '\t');
			await navigator.clipboard.writeText(str);
			const msg = 'Copied to clipboard !';
			addSnack(msg);
		} catch (error) {
			notifyError(error);
		}
	}

	// https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
	/**
	 * @param {string} filename
	 * @param {any} dataObjToWrite
	 */
	function saveTemplateAsFile(filename, dataObjToWrite) {
		const blob = new Blob([JSON.stringify(dataObjToWrite)], { type: 'text/json' });
		const link = document.createElement('a');

		link.download = filename;
		link.href = window.URL.createObjectURL(blob);
		link.dataset.downloadurl = ['text/json', link.download, link.href].join(':');

		const evt = new MouseEvent('click', {
			view: window,
			bubbles: true,
			cancelable: true
		});

		link.dispatchEvent(evt);
		link.remove();
	}
	function on_save() {
		saveTemplateAsFile('my.json', $my_json);
	}
</script>

<NewEntry bind:this={new_entry_comp} />
<History bind:this={history_comp} />

<section class="fsb g1">
	<div class="btns">
		<Btn
			accent="gamma"
			variant="outlined"
			colored
			text="New"
			on:click={() => {
				new_entry_comp.on_open();
			}}
		/>
		<Btn
			accent="alpha"
			variant="outlined"
			text="History"
			on:click={() => {
				history_comp.on_open();
			}}
		/>
	</div>

	<div class="btns">
		<Btn
			accent="base"
			variant="filled"
			text="Copy"
			title="Copy JSON content to clipboard"
			on:click={handle_copy}
		/>
		<Btn
			accent="base"
			variant="filled"
			text="Save"
			title="Save JSON content to file"
			on:click={on_save}
		/>
	</div>
</section>

<style>
	section {
		--x: var(--sx-s);
		margin-bottom: 2em;
		background: var(--bg);
		padding-inline: var(--x);
		padding-block: var(--x);
	}

	.btns {
		display: flex;
		gap: var(--x);
	}
</style>
