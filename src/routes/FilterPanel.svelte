<script>
	import { Btn, snack_error, snack_new } from '@kazkadien/svelte';
	import init from '$lib';
	import { my_json } from '$utils/stores';
	import { onDestroy } from 'svelte';
	import { storage } from '$utils/local_storage';
	import MyIcon from '$utils/MyIcon.svelte';
	const { collapse, expand, filter } = init('#jid');

	let text = '';
	const unsub = my_json.subscribe(() => (text = ''));
	onDestroy(() => unsub());

	async function handle_copy() {
		// const data = { a: 1 };
		const data = $my_json;

		try {
			const str = JSON.stringify(data, null, '\t');
			await navigator.clipboard.writeText(str);
			const msg = 'Copied to clipboard !';
			snack_new(msg);
		} catch (error) {
			snack_error(error);
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
		saveTemplateAsFile('data.json', $my_json);
	}
</script>

<div class="base panel" class:sticky={storage.sticky.value === 1}>
	<div class="form v2 alpha">
		<label class="field">
			<input
				id="filter"
				type="text"
				placeholder="Filter {storage.is_regex.value ? 'with RegExp' : ''}"
				bind:value={text}
				on:input={(ev) => {
					const str = ev.currentTarget.value;
					console.log({ str, rg: storage.is_regex.value });
					filter(str, storage.is_regex.value);
				}}
			/>
		</label>
	</div>

	<div class="btns alpha">
		<Btn iconOnly variant="custom" title="Collapse all" on:click={collapse}>
			<MyIcon name="unfold_less_double" />
		</Btn>

		<Btn iconOnly variant="custom" title="Expand all" on:click={expand}>
			<MyIcon name="unfold_more_double" />
		</Btn>

		<Btn iconOnly variant="custom" title="Copy JSON content to clipboard" on:click={handle_copy}>
			<MyIcon name="copy_all" />
		</Btn>

		<Btn iconOnly variant="custom" title="Save JSON content to file" on:click={on_save}>
			<MyIcon name="file_save" />
		</Btn>
	</div>
</div>

<style>
	label,
	.form {
		border: none;
		background: transparent;
	}

	input:is(:hover, :focus-visible) {
		outline-offset: 0px;
		border-color: transparent;
		outline-color: var(--__fl);
	}

	.btns {
		display: flex;
		gap: var(--g);
	}
</style>
