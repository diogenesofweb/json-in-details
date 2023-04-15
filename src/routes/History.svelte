<script>
	import { notifyError } from '$utils/Snacks.svelte';
	import { my_json } from '$utils/stores';
	import { Btn, Icon } from '@kazkadien/svelte';
	import { idb } from './db';

	/** @type {HTMLDialogElement} */
	let dialog;
	let is_loading = false;
	/** @typedef {{name: string, date: Date}} IOne*/
	/** @type {IOne[] } */
	let arr = [];

	/** @param {Date} el */
	function on_del(el) {
		idb.del(el).then(() => {
			arr = arr.filter((v) => v.date != el);
		});
	}

	/** @param {Date} el */
	function on_select(el) {
		idb
			.get(el)
			.then((v) => {
				if (!v) throw new Error('Missing entry');
				const data = v.json;
				my_json.set(data);
				dialog.close();
			})
			.catch((e) => notifyError(e));
	}

	export function on_open() {
		dialog.showModal();
		idb.getAll().then((v) => {
			/** @type {IOne[] } */
			const x = [];
			v.forEach((el) => x.unshift({ name: el.name, date: el.date }));
			arr = x;
		});
	}
</script>

<dialog class="alpha" id="recent-entries" bind:this={dialog} on:close={() => (arr = [])}>
	{#if is_loading}
		<span class="loader" />
	{:else}
		<section>
			<ul>
				{#each arr as el}
					<li>
						<div>
							<button class="btn text alpha" on:click={() => on_select(el.date)}>
								{el.name}
							</button>
							<Btn variant="text" accent="danger" iconOnly on:click={() => on_del(el.date)}>
								<Icon name="delete" />
							</Btn>
						</div>
						<!-- <div class="time f-mono"> -->
						<!--   <time>{el.date.toLocaleDateString('fr-CA')}</time> -->
						<!--   <time> -->
						<!--     {el.date.toLocaleTimeString('fr', { hour: 'numeric', minute: 'numeric' })} -->
						<!--   </time> -->
						<!-- </div> -->
					</li>
				{:else}
					<p>no entries yet</p>
				{/each}
			</ul>
		</section>
	{/if}
</dialog>

<style>
	section {
		padding-inline: 1em;
		padding-block: 2em;
		border-radius: 1em;
		background-color: var(--bg);
		/* max-width: 100ch; */
	}

	li {
		padding-block: 6px;
	}

	li > :first-child {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 6px;
	}
	li > :first-child > button.btn {
		line-height: 1.4;
		justify-content: start;
		text-align: left;
		white-space: normal;
		word-break: break-all;
	}

	.time {
		font-size: 14px;
		line-height: 1;
		text-align: right;
		color: var(--fg2);
	}

	li:not(:last-child) {
		border-bottom: 1px solid var(--fga);
	}
</style>
