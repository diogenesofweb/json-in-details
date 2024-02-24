<script>
	import { Dropdown } from '@kazkadien/svelte';
	import NewEntry from './NewEntry.svelte';
	import History from './History.svelte';
	import Json2ts from './Json2ts.svelte';
	import Json2schema from './Json2schema.svelte';
	import Json2go from './Json2go.svelte';
	import Json2img from './Json2img.svelte';
	import MyIcon from '$utils/MyIcon.svelte';
</script>

<div class="wrap">
	<div class="fsb gg">
		<div class="fsb gg">
			<NewEntry />
			<History />
		</div>

		<div class="fsb gg beta" style="z-index: 2;">
			<Json2img />

			<Dropdown grow overshadow align="right">
				<svelte:fragment slot="dropbtn">
					<MyIcon name="code" />
					<b>convert to</b>
				</svelte:fragment>
				<Json2schema />
				<Json2ts />
				<Json2go />
			</Dropdown>
			<!-- <Json2ts /> -->
			<!-- <Json2schema /> -->
		</div>
	</div>
</div>

<style>
	.wrap {
		padding-bottom: var(--g);
	}

	.gg {
		gap: var(--g);
	}
</style>
