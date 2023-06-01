<script>
	import AppHomeLink from './AppHomeLink.svelte';
	// console.log('x')
</script>

<footer>
	<section lang="en">
		More:
		<a href="https://hotatap.pages.dev/app" target="_blank" class="btn text">
			<span>Web client for REST API testing</span>
		</a>
	</section>

	<nav class="fsb g1">
		<AppHomeLink />

		<a href={PKG['homepage']} target="_blank" rel="noopener noreferrer" class="btn text">
			Github
		</a>
	</nav>
</footer>

<style>
	footer {
		padding-block: 10vh;
		padding-inline: var(--sx-m);
		border-top: 3px double var(--bga1);
		background: var(--bg0);
	}

	section {
		margin-bottom: 2em;
	}
</style>
