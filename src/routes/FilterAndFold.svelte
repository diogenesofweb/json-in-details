<script>
	import { Btn, Icon } from '@kazkadien/svelte';
	import init from '$lib';
	import { my_json } from '$utils/stores';
	import { onDestroy } from 'svelte';
	const { collapse, expand, filter } = init();

	let text = '';
	const unsub = my_json.subscribe(() => (text = ''));
	onDestroy(() => unsub());
</script>

<section class="alpha">
	<div class="form v2">
		<label class="field">
			<input
				type="text"
				placeholder="filter"
				bind:value={text}
				on:input={(ev) => {
					const str = ev.currentTarget.value;
					// console.log({ str });
					filter(str);
				}}
			/>
		</label>
	</div>

	<div class="btns">
		<Btn iconOnly colored accent="alpha" variant="text" title="Collapse All" on:click={collapse}>
			<Icon name="unfold_less_double" />
		</Btn>

		<Btn iconOnly colored accent="gamma" variant="text" title="Expand All" on:click={expand}>
			<Icon name="unfold_more_double" />
		</Btn>
		<!-- <Btn variant="text" text="Collapse" on:click={() => expand(false)} /> -->
		<!-- <Btn variant="text" text="Expand" on:click={() => expand(true)} /> -->
	</div>
</section>

<style>
	:is(section, label.field input) {
		background: var(--bg3);
	}

	section {
		padding-inline: var(--sx-s);
		/* padding-block: 2em; */
		padding-block: 0.5em;
		display: flex;
		gap: 1ch;
		/* align-items: flex-end; */
		align-items: center;
		flex-wrap: wrap;
	}
	.btns {
		display: flex;
	}

	.form {
		flex-grow: 1;
		line-height: 1.8;
	}
</style>
