<script>
	import { Btn, BtnIcon, snack_error } from '@kazkadien/svelte';
	import { toJpeg } from 'html-to-image';
	import { tick } from 'svelte';
	import { storage } from '$utils/local_storage';
	import MyIcon from '$utils/MyIcon.svelte';

	let is_running = false;

	async function on_click() {
		if (is_running) return;

		try {
			is_running = true;
			const jid = document.getElementById('jid');
			// console.log(jid);
			if (!jid) {
				throw new Error('#jid not found');
			}

			await tick();
			const bg = getComputedStyle(jid).getPropertyValue('--_bg');
			// console.log({ bg });

			const dataUrl = await toJpeg(jid, { quality: 0.92, backgroundColor: bg });
			img_src = dataUrl;

			if (storage.preview_screenshot.value) {
				dialog.showModal();
			} else {
				download_img();
			}
		} catch (error) {
			snack_error(error);
		} finally {
			is_running = false;
		}
	}

	let img_src = '';
	/** @type {HTMLDialogElement} */
	let dialog;

	function download_img() {
		const link = document.createElement('a');
		link.download = 'json.jpeg';
		link.href = img_src;
		link.click();
	}

	function on_download() {
		download_img();
		dialog.close();
	}
</script>

<Btn isLoading={is_running} disabled={is_running} variant="filled" title="" on:click={on_click}>
	<MyIcon name="screenshot_monitor" />
	<b>Screenshot</b>
</Btn>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	class="alpha"
	id="json-go"
	bind:this={dialog}
	on:click={(ev) => ev.target === dialog && dialog.close()}
>
	{#if img_src}
		<div class="wrap">
			<div class="btns fsb">
				<Btn variant="outlined" title="Download the screenshot" on:click={on_download}>
					<MyIcon name="file_save" />
					<b>Download</b>
				</Btn>

				<BtnIcon
					title="close"
					iconName="close"
					variant="outlined"
					accent="danger"
					on:click={() => dialog.close()}
				/>
			</div>

			<img src={img_src} alt="screenshot" />
		</div>
	{/if}
</dialog>

<style>
	.wrap {
		padding-inline: 0.5em;
		padding-block: 1em;
	}
	.btns {
		margin-bottom: 2em;
	}
	img {
		width: 100%;
		height: auto;
	}
</style>
