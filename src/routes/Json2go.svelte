<script>
	import { my_json } from '$utils/stores';
	import { Btn, snack_error } from '@kazkadien/svelte';
	import CodeLayout from './CodeLayout.svelte';
	// import jsonToGo from './json-to-go';

	/** @type {HTMLDialogElement} */
	let dialog;
	/** @type {string} */
	let code_text;
	/** @type {string[] } */
	let formatted = [];

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
		if (is_cached) {
			// console.log('cache');
			return dialog.showModal();
		}

		try {
			const jsonToGo = (await import('./json-to-go.js')).default;

			// console.log({ json });
			const res = jsonToGo(JSON.stringify(json));
			// console.log(res);

			if (res.error) throw res.error;
			code_text = res.go;

			const sep0 = 'type ';
			formatted = code_text
				.split(sep0)
				.filter(Boolean)
				.map((v) => {
					// console.log(v);
					const sep1 = '/n';
					const block = v
						.split(sep1)
						.map((el) => {
							const sep2 = '\n\t';
							// return el;
							return el
								.split(sep2)
								.map((x, i) => {
									const s = x.split(' ');

									if (s.length === 3) {
										if (i === 0) {
											return `${s[0]} <b>${s[1]}</b> ${s[2]}`;
										}
										return `${s[0]} <b>${s[1]}</b> <span>${s[2]}</span>`;
									} else {
										return el;
									}
								})
								.join(sep2)
								.replace('{', '<span>{</span>');
						})
						.join(sep1);

					// return block;
					return `<b>${sep0}</b>` + block;
				});
			// console.log(formatted);

			is_cached = true;

			dialog.showModal();
		} catch (err) {
			snack_error(err);
		}
	}
</script>

<Btn variant="text" title="Generate Golang structs from JSON" on:click={on_open}>Go</Btn>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	class="alpha"
	id="json-go"
	bind:this={dialog}
	on:click={(ev) => ev.target === dialog && dialog.close()}
>
	<CodeLayout {code_text} {formatted} />
</dialog>
