<script>
	import { my_json } from '$utils/stores';
	import { Btn, snack_error } from '@kazkadien/svelte';
	import CodeLayout from './CodeLayout.svelte';

	/** @type {HTMLDialogElement} */
	let dialog;
	/** @type {string[] } */
	let formatted = [];
	/** @type {string} */
	let code_text;

	let is_cached = false;
	/** @type {any} */
	let json;

	my_json.subscribe((v) => {
		// console.log(v);
		json = v;
		is_cached = false;
	});

	/** @param {MouseEvent} [_ev] */
	async function on_open(_ev) {
		// const dtl = _ev.target.closest('details');
		// if (dtl) dtl.open = false;
		//
		if (is_cached) {
			// console.log('cache');
			return dialog.showModal();
		}

		try {
			const json2ts = (await import('json-to-ts')).default;
			// console.log({ json });
			const vals = json2ts(json);
			code_text = vals.reduce((c, p) => p + '\n\n' + c, '');
			// console.log(vals);
			formatted = vals.map((v) => {
				return v
					.split('\n')
					.map((el, i) => {
						if (i === 0) {
							const s = el.split('interface');
							return `<b>interface</b>${s[1]}`;
						}

						const s = el.split(': ');
						if (s.length === 2) {
							return `<span>${s[0]}</span>: ${s[1]}`;
						} else {
							return el;
						}
					})
					.join('\n');
			});

			is_cached = true;
			dialog.showModal();
		} catch (err) {
			snack_error(err);
		}
	}
</script>

<Btn variant="text" title="Generate TypeScript interfaces from JSON" on:click={on_open}>
	Typescript Interfaces
</Btn>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	class="alpha"
	id="json-ts"
	bind:this={dialog}
	on:click={(ev) => ev.target === dialog && dialog.close()}
>
	<CodeLayout {code_text} {formatted} />
</dialog>
