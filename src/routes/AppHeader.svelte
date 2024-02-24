<script>
	// import { dev } from '$app/environment';
	import MyIcon from '$utils/MyIcon.svelte';
	import AppHomeLink from './AppHomeLink.svelte';
	import AppSettings from './AppSettings.svelte';
</script>

<header class="alpha">
	<div class="fsb">
		<nav class="">
			<AppHomeLink />

			<!-- {#if dev} -->
			<!-- 	<a href="/_draft" class="btn text"><b>Draft</b></a> -->
			<!-- {/if} -->

			<a
				href="https://github.com/diogenesofweb/fjv"
				class="btn text icon-only"
				title="Chrome Extension"
			>
				<MyIcon name="extension" />
			</a>

			<!-- svelte-ignore missing-declaration -->
			<a href={PKG['homepage']} class="btn text icon-only" title="Code Repo">
				<MyIcon name="github" />
			</a>
		</nav>

		<AppSettings />
	</div>
</header>

<style>
	header {
		/* z-index: 100; */
		background: var(--bg);
		/* padding-inline: var(--sx-m); */
	}
	nav {
		flex-grow: 1;
		display: flex;
		justify-content: end;
		& > :first-child {
			/* outline: 1px solid hsl(0 100% 50% / 50%); */
			margin-right: auto;
		}
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
