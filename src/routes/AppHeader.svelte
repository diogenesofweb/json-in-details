<script>
	import { Icon } from '@kazkadien/svelte';
	import { dev } from '$app/environment';
	import AppHomeLink from './AppHomeLink.svelte';
	import AppSettings from './AppSettings.svelte';
</script>

<header class="alpha">
	<div class="fsb">
		<nav class="fsb g1">
			<AppHomeLink />

			{#if dev}
				<a href="/_draft" class="btn text"><b>Draft</b></a>
			{/if}
		</nav>

		<a
			href="https://github.com/diogenesofweb/fjv"
			target="_blank"
			class="btn text icon-only"
			title="Chrome Extension"
		>
			<Icon name="extension" />
		</a>

		<!-- svelte-ignore missing-declaration -->
		<a
			href={PKG['homepage']}
			target="_blank"
			rel="noopener noreferrer"
			class="btn text icon-only"
			title="Code Repo"
		>
			<Icon name="github" />
		</a>

		<AppSettings />
	</div>
</header>

<style>
	header {
		z-index: 100;
		background: var(--bg);
		/* padding-inline: var(--sx-m); */
	}
	nav {
		flex-grow: 1;
	}

	div {
		/* background-color: var(--bg); */
		padding-inline: var(--sx-m);
		padding-block: 0.75em;
		padding-block: 0.5em;

		/* border: var(--border); */
		border-bottom: 1px solid var(--fl);
		/* border-top: none; */
	}
	b {
		text-transform: none;
	}
</style>
