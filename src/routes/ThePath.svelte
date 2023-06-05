<script>
	import { Btn, Icon } from '@kazkadien/svelte';
	import { addSnack, notifyError } from '$utils/Snacks.svelte';

	export let title = '$';

	function handle_copy() {
		console.log({ title });

		navigator.clipboard
			.writeText(title)
			.then(() => {
				addSnack('Copied to clipboard !');
			})
			.catch((err) => {
				notifyError(err);
			});
	}
</script>

<div class="path beta">
	<div class="path-panel f-system">
		<div class="val" title="Path">{title}</div>
		<Btn iconOnly variant="text" colored on:click={handle_copy} title="Copy path">
			<Icon name="content_copy" />
		</Btn>
	</div>
</div>

<style>
	.path {
		z-index: 1;
		top: 0;
		position: sticky;

		background: var(--bg3);
	}
	.path-panel {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 1ch;
		align-items: center;

		/* border-bottom: 4px solid var(--bg0); */
		box-shadow: 0px 8px 6px -4px var(--bg0);

		margin-block: 2em;
		padding-inline: var(--sx-s);
	}
	.val {
		padding-block: var(--sx-s);
		color: var(--__fg);
	}
</style>
