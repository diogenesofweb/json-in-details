<script>
	import { generate_HTML, handle_keymaps } from '$lib';
	import { my_json } from '$utils/stores';
	import { Btn, BtnIcon, snack_error } from '@kazkadien/svelte';

	/** @type {HTMLDialogElement} */
	let dialog;
	/** @type {string} */
	let val = '';
	/** @type {any} */
	let schema;

	let is_cached = false;
	/** @type {any} */
	let json;

	my_json.subscribe((v) => {
		// console.log(v);
		json = v;
		is_cached = false;
	});

	async function on_open() {
		if (is_cached) {
			// console.log('cache');
			return dialog.showModal();
		}

		try {
			const json2schema = (await import('genson-js')).createSchema;
			schema = json2schema(json);
			// console.log(schema);
			const html = generate_HTML(schema, { escape_HTML: false, clickable_link: 0 });
			// console.log(html);
			val = html;
			is_cached = true;
			// console.log(formatted[0]);
			//
			dialog.showModal();
		} catch (err) {
			snack_error(err);
		}
	}

	// TODO:
	/** @param {string} val */
	function copy2clipboard(val) {
		navigator.clipboard
			.writeText(val)
			.then(() => {
				// snack_new('Copied to clipboard !');
			})
			.catch((err) => {
				console.log(err);
				// snack_error(err);
			});
	}
</script>

<Btn accent="base" variant="filled" text="schema" on:click={on_open} />
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	class="alpha"
	id="json-schema"
	bind:this={dialog}
	on:click={(ev) => ev.target === dialog && dialog.close()}
>
	<article>
		<div class="btns fsb">
			<Btn text="copy" on:click={() => copy2clipboard(JSON.stringify(schema, null, 2))} />

			<BtnIcon
				title="close"
				iconName="close"
				variant="text"
				accent="danger"
				on:click={() => dialog.close()}
			/>
		</div>

		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			on:keydown={handle_keymaps}
			class="jid"
			class:dark={document.documentElement.classList.contains('dark')}
		>
			{@html val}
		</div>
	</article>
</dialog>

<style>
	article {
		padding-inline: 1em;
		padding-block: 1em 2em;
		border-radius: 1em;
		min-width: min(90vw, 100ch);
	}
</style>
