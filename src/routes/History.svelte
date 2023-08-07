<script>
	import { my_json } from '$utils/stores';
	import { Btn, BtnIcon, snack_error } from '@kazkadien/svelte';
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
			.catch((e) => snack_error(e));
	}

	function on_open() {
		is_loading = true;
		dialog.showModal();
		idb
			.getAll()
			.then((v) => {
				/** @type {IOne[] } */
				const x = [];
				v.forEach((el) => x.unshift({ name: el.name, date: el.date }));
				arr = x;
			})
			.catch((e) => snack_error(e))
			.finally(() => (is_loading = false));
	}
</script>

<Btn accent="alpha" variant="filled" text="History" on:click={on_open} />
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	class="alpha"
	id="recent-entries"
	bind:this={dialog}
	on:close={() => (arr = [])}
	on:click={(ev) => ev.target === dialog && dialog.close()}
>
	{#if is_loading}
		<span class="loader" />
	{:else}
		<section>
			<div class="btns">
				<!-- <Btn accent="danger" text="close" on:click={() => dialog.close()} /> -->
				<BtnIcon
					title="close"
					iconName="close"
					variant="text"
					accent="danger"
					on:click={() => dialog.close()}
				/>
			</div>

			<ul>
				{#each arr as el}
					<li>
						<BtnIcon
							title="delete"
							iconName="delete"
							variant="text"
							accent="danger"
							colored
							on:click={() => on_del(el.date)}
						/>
						<div class="time f-mono">
							<!-- <time>{el.date.toLocaleDateString('fr-CA')}</time> -->
							<time>
								{el.date.toLocaleTimeString('en', {
									hour: 'numeric',
									minute: 'numeric',
									hourCycle: 'h24',
									month: '2-digit',
									day: '2-digit'
								})}
							</time>
						</div>

						<button class="btn text alpha" on:click={() => on_select(el.date)}>
							{el.name}
						</button>
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
		padding-block: 0 2em;
		border-radius: 1em;
		background-color: var(--bg);
		/* max-width: 100ch; */
	}

	.btns {
		/* position: sticky; */
		/* z-index: 100; */
		/* top: 0px; */

		background-color: var(--bg);

		display: flex;
		justify-content: flex-end;

		/* border-bottom: var(--border); */
		padding-block: 1ch;
		margin-bottom: 1em;
	}

	li {
		padding-block: 6px;
		display: grid;
		grid-template-columns: auto auto 1fr;
		align-items: center;
	}

	button.btn {
		line-height: 1.4;
		justify-content: start;
		text-align: left;
		white-space: normal;
		word-break: break-all;
	}

	.time {
		/* font-size: 14px; */
		line-height: 1;
		text-align: right;
		color: var(--fg2);
		color: var(--fg-beta);
		opacity: 0.75;
	}

	li:not(:last-child) {
		border-bottom: 1px solid var(--fl);
	}
</style>
