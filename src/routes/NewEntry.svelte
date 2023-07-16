<script>
	import { my_json } from '$utils/stores';
	import { Alert, Btn, Field, snack_error, snack_new } from '@kazkadien/svelte';
	import { idb } from './db';

	/** @type {HTMLDialogElement} */
	let dialog;
	export function on_open() {
		dialog.showModal();
	}
	let url = '';
	// url = 'https://api.oschadbank.ua/pages/currency-rate'; // no CORS err
	// url = 'https://bank.com.ua/api/uk/v1/rest-ui/find-branch-course?date'; // CORS err
	let is_loading = false;

	async function on_url() {
		console.log({ url });

		is_loading = true;

		try {
			let is_possibly_CORS_error = false;

			let res = await fetch(url).catch((e) => {
				console.error(e);
				if (e instanceof TypeError) {
					is_possibly_CORS_error = true;
				} else {
					throw e;
				}
			});

			if (is_possibly_CORS_error) {
				res = await fetch('/api?' + new URLSearchParams({ q: url }));
			}

			if (!res) {
				throw new Error(`Failed to Fetch`);
			}

			const res_ok = res.ok;
			if (!res_ok) {
				const msg = `HTTP Response Code:: [${res.status}]`;
				snack_new(msg, 'danger');
			}

			let data = await res.json();

			if (!res_ok) {
				data = { message: data };
			}

			console.log(data);

			my_json.set(data);

			idb.set({
				name: url,
				src: 'url',
				json: data,
				date: new Date()
			});

			url = '';
		} catch (e) {
			snack_error(e);
			my_json.set({});
		} finally {
			is_loading = false;
			dialog.close();
		}
	}

	/** @param {Event & { currentTarget: EventTarget & HTMLInputElement; }} ev */
	function processInputFile(ev) {
		console.log('processInputFile');
		/** @type {File} */
		// @ts-ignore
		const file = ev.currentTarget.files[0];
		// let file = ev.target.files[0];
		// console.log(file.name);
		if (file.type !== 'application/json') {
			console.warn('not json');
		}
		const reader = new FileReader();

		reader.onload = (ev) => {
			// console.log(ev);
			// console.log(ev.target);
			try {
				const str = ev.target?.result;

				if (!str) {
					throw new Error('ops');
				}

				const json = JSON.parse(str.toString());
				// console.log('string', str);
				// console.log('json', json);
				my_json.set(json);

				idb.set({
					name: file.name,
					src: 'file',
					json,
					date: new Date()
				});
			} catch (error) {
				// console.error(error);
				snack_error(error);
			} finally {
				dialog.close();
			}
		};

		reader.readAsText(file);
	}

	let alert = '';
	let text = '';

	function handle_text() {
		// console.log(text);

		try {
			const json = JSON.parse(text);
			// console.log('string', str);
			// console.log('json', json);
			my_json.set(json);

			idb.set({
				name: text.length < 100 ? text : text.substring(0, 100),
				src: 'form',
				json,
				date: new Date()
			});

			alert = '';
			dialog.close();
		} catch (error) {
			// console.error(error);
			// snack_error(error);
			alert = error.message || 'Invalid JSON string';
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog id="new-entry" bind:this={dialog} on:click={(ev) => ev.target === dialog && dialog.close()}>
	{#if is_loading}
		<span class="loader alpha" />
	{:else}
		<article class="alpha">
			<form class="form v2" on:submit|preventDefault={on_url}>
				<Field label="URL">
					<input id="fetch-url" type="url" bind:value={url} />
				</Field>
			</form>

			<div class="tac">~ ~ ~</div>

			<form class="form v2" on:submit|preventDefault>
				<Field label="Upload JSON file">
					<input type="file" accept="application/json" on:change={processInputFile} />
				</Field>
			</form>

			<div class="tac">~ ~ ~</div>

			<form class="form v2 text" on:submit|preventDefault={handle_text}>
				<Field label="JSON string">
					<textarea bind:value={text} cols="30" rows="10" />
				</Field>

				{#if alert}
					<Alert body={alert} closable={false} accent="danger" />
				{/if}

				<Btn type="submit" text="submit" />
			</form>
		</article>
	{/if}
</dialog>

<style>
	article {
		background: var(--bg);
		padding-inline: var(--sx-m);
		padding-block: var(--sy-l);

		border-radius: 1em;
		width: clamp(300px, 90vw, 90ch);

		display: grid;
		gap: 1em;
	}

	.loader {
		font-size: clamp(1rem, 5vw, 5rem);
		display: block;
		margin: 2em;
	}

	form.text {
		display: grid;
		gap: 2em;
	}
</style>
