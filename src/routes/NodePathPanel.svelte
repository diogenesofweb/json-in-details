<script>
	import { Btn, Icon, snack_error, snack_new } from '@kazkadien/svelte';
	import { storage } from '$utils/local_storage';

	export let title = '$';

	function handle_copy() {
		console.log({ title });

		navigator.clipboard
			.writeText(title)
			.then(() => {
				snack_new('Copied to clipboard !');
			})
			.catch((err) => {
				snack_error(err);
			});
	}
</script>

<div class="path beta" class:sticky={storage.sticky.value === 2}>
	<div class=" panel path-panel f-system">
		<div id="path" class="val" title="Path">{title}</div>
		<Btn id="copy-path" iconOnly variant="custom" on:click={handle_copy} title="Copy path">
			<Icon name="content_copy" />
		</Btn>
	</div>
</div>

<style>
	.path {
		color: var(--__fg);
	}

	/* .path-panel { */
	/**/
	/* 	border-bottom: 4px solid var(--bg0); */
	/* 	box-shadow: 0px 8px 6px -4px var(--bg0); */
	/**/
	/* } */
</style>
