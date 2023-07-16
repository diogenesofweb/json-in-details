<script>
	import { Btn } from '@kazkadien/svelte';
	import NewEntry from './NewEntry.svelte';
	import History from './History.svelte';
	import Json2ts from './Json2ts.svelte';

	/** @type {History} */
	let history_comp;
	/** @type {NewEntry} */
	let new_entry_comp;
</script>

<section>
	<NewEntry bind:this={new_entry_comp} />
	<History bind:this={history_comp} />

	<div class="fsb gg">
		<div class="fsb gg">
			<Btn
				accent="gamma"
				variant="filled"
				text="New"
				on:click={() => {
					new_entry_comp.on_open();
				}}
			/>
			<Btn
				accent="alpha"
				variant="filled"
				text="History"
				on:click={() => {
					history_comp.on_open();
				}}
			/>
		</div>

		<div class="fsb gg">
			<Json2ts />
		</div>
	</div>
</section>

<style>
	section {
		padding-bottom: var(--g);
	}

	.gg {
		gap: var(--g);
	}
</style>
