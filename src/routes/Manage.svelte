<script>
	import NewEntry from './NewEntry.svelte';
	import History from './History.svelte';
	import Json2ts from './Json2ts.svelte';
	import Json2schema from './Json2schema.svelte';
</script>

<section>
	<div class="fsb gg">
		<div class="fsb gg">
			<NewEntry />
			<History />
		</div>

		<div class="fsb gg">
			<Json2ts />
			<Json2schema />
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
