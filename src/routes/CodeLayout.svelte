<script>
	import { Btn, BtnIcon } from '@kazkadien/svelte';
	/** @type {string[] } */
	export let formatted = [];

	/** @type {string} */
	export let code_text;

	const TIMEOUT = 1000;
	const btn_text_init = 'copy all';
	let btn_text = btn_text_init;

	function on_copy_all() {
		navigator.clipboard
			.writeText(code_text)
			.then(() => {
				btn_text = 'copied !!!';
				setTimeout(() => (btn_text = btn_text_init), TIMEOUT);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	/** @param {MouseEvent} ev */
	function on_copy_block(ev) {
		const elem = ev.currentTarget;
		const ok = elem instanceof HTMLElement;
		if (!ok) return;

		const text = elem.previousElementSibling?.textContent;
		if (!text) return console.warn('where is my text?');
		// console.log(text);

		navigator.clipboard
			.writeText(text)
			.then(() => {
				/** @type {HTMLElement } */
				// @ts-ignore
				const el = elem.querySelector('use');
				// console.log(el);
				if (!el) return;

				el.setAttribute('href', '#check');
				setTimeout(() => el.setAttribute('href', '#content_copy'), TIMEOUT);
			})
			.catch((err) => {
				console.error(err);
			});
	}
</script>

<section>
	<div class="btns fsb">
		<Btn text={btn_text} variant="outlined" on:click={on_copy_all} />
		<!-- <Btn accent="danger" text="close" on:click={() => dialog.close()} /> -->
		<BtnIcon
			title="close"
			iconName="close"
			variant="outlined"
			accent="danger"
			on:click={(ev) => ev.target.closest('dialog')?.close()}
		/>
	</div>

	{#each formatted as el}
		<code>
			<pre class="f-mono">{@html el}</pre>
			<BtnIcon title="copy" variant="text" iconName="content_copy" on:click={on_copy_block} />
		</code>
	{/each}
</section>

<style>
	section {
		padding-inline: 1em;
		padding-block: 1em 2em;
		border-radius: 1em;
		background-color: var(--bg);
		/* background-color: var(--bg1); */
		min-width: min(90vw, 80ch);
	}

	code {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 1em;
		border-radius: var(--btn-br);
		background-color: var(--bg1);
		margin-bottom: 1ch;

		&:hover {
			background: var(--bg3);
		}
	}

	pre {
		margin: 0;
		tab-size: 2;
		word-break: break-all;
		white-space: pre-wrap;
	}

	pre {
		padding: 1ch;

		& span {
			color: var(--fg-alpha);
		}

		& b {
			color: var(--fg-beta);
			font-weight: normal;
		}
	}

	.btns {
		display: flex;
		padding-bottom: 2em;
	}
</style>
