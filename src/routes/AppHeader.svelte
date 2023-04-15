<script>
	import { Dropdown, Icon } from '@kazkadien/svelte';
	import { ThemeSelect } from '@kazkadien/svelte';
	import { dev } from '$app/environment';
	import AppHomeLink from './AppHomeLink.svelte';
</script>

<header class="alpha">
	<div class="fsb">
		<nav class="fsb g1">
			<AppHomeLink />

			{#if dev}
				<a href="/draft" class="btn text"><b>Draft</b></a>
			{/if}
		</nav>

		<a
			href={PKG['homepage']}
			target="_blank"
			rel="noopener noreferrer"
			class="btn text icon-only"
			title="code repo"
		>
			<Icon name="code" />
		</a>

		<Dropdown variant="text" iconOnly align="right" overshadow>
			<Icon name="brightness_low" slot="dropbtn" />

			<ThemeSelect />
		</Dropdown>
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
		border-bottom: 3px double var(--bga1);
		/* border-top: none; */
	}
	b {
		text-transform: none;
	}
</style>
