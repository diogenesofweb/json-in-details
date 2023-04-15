<script>
	import AppHomeLink from './AppHomeLink.svelte';
	// console.log('x')
</script>

<footer>
	<nav class="fsb g1">
		<AppHomeLink />

		<section lang="en">
			<a href={PKG['homepage']} target="_blank" rel="noopener noreferrer" class="btn text">
				Github
			</a>
		</section>
	</nav>
</footer>

<style>
	footer {
		padding-block: 10vh;
		padding-inline: var(--sx-m);
		border-top: 3px double var(--bga1);
		background: var(--bg0);
	}
</style>
