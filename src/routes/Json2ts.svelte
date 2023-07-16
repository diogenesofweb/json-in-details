<script>
	import { my_json } from '$utils/stores';
	import { Btn, BtnIcon, snack_error } from '@kazkadien/svelte';

	/** @type {HTMLDialogElement} */
	let dialog;
	/** @type {string[] } */
	let vals = [];
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

	async function on_open() {
		if (is_cached) {
			// console.log('cache');
			return dialog.showModal();
		}

		try {
			const json2ts = (await import('json-to-ts')).default;
			// console.log({ json });
			vals = json2ts(json);
			// console.log(vals);
			formatted = vals.map((v) => {
				return v
					.split('\n')
					.map((v, i) => {
						if (i === 0) {
							const s = v.split('interface');
							return `<i>interface</i>${s[1]}`;
						}

						const s = v.split(': ');
						if (s.length === 2) {
							return `<span>${s[0]}</span>: ${s[1]}`;
						} else {
							return s[0];
						}
					})
					.join('\n');
			});
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
				console.error(err);
				// snack_error(err);
			});
	}
</script>

<Btn accent="base" variant="filled" text="d.ts" on:click={on_open} />
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	class="alpha"
	id="json-ts"
	bind:this={dialog}
	on:click={(ev) => ev.target === dialog && dialog.close()}
>
	<section>
		<div class="btns fsb">
			<Btn
				accent=""
				text="copy all"
				on:click={() => copy2clipboard(vals.reduce((c, p) => p + '\n\n' + c, ''))}
			/>
			<!-- <Btn accent="danger" text="close" on:click={() => dialog.close()} /> -->
			<BtnIcon
				title="close"
				iconName="close"
				variant="text"
				accent="danger"
				on:click={() => dialog.close()}
			/>
		</div>

		{#each formatted as el, idx}
			<code>
				<pre class="f-mono">{@html el}</pre>
				<BtnIcon
					title="copy"
					variant="text"
					iconName="content_copy"
					on:click={() => copy2clipboard(vals[idx])}
				/>
			</code>
		{/each}
	</section>
</dialog>

<style>
	section {
		padding-inline: 1em;
		padding-block: 1em 2em;
		border-radius: 1em;
		background-color: var(--bg1);
		min-width: min(90vw, 80ch);
	}

	code {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 1em;
		border-radius: var(--btn-br);

		&:hover {
			background: var(--bg3);
		}
	}

	pre {
		padding: 1ch;
		margin: 0;

		tab-size: 2;
		word-break: break-all;
		white-space: pre-wrap;

		& span {
			color: var(--fg-alpha);
		}

		& i {
			color: var(--fg-beta);
		}
	}

	.btns {
		display: flex;
		padding-bottom: 3em;
	}
</style>
