<script>
	import NewEntry from './NewEntry.svelte';
	import History from './History.svelte';
	import Json2ts from './Json2ts.svelte';
	import Json2schema from './Json2schema.svelte';
	import { Dropdown, Icon } from '@kazkadien/svelte';
	import Json2go from './Json2go.svelte';
</script>

<section>
	<div class="fsb gg">
		<div class="fsb gg">
			<NewEntry />
			<History />
		</div>

		<div class="fsb gg beta" style="z-index: 2;">
			<Dropdown grow overshadow>
				<svelte:fragment slot="dropbtn">
					<b>generate</b>
					<Icon name="code" />
				</svelte:fragment>
				<Json2ts />
				<Json2go />
				<Json2schema />
			</Dropdown>
			<!-- <Json2ts /> -->
			<!-- <Json2schema /> -->
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
