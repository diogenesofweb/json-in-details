<script>
	import AppHomeLink from './AppHomeLink.svelte';
	// console.log('x')
</script>

<footer>
	<section class="fsb">
		<a
			href="https://chrome.google.com/webstore/detail/functional-json-viewer/cokkmplppnaigoodkkjopoblfaelibab"
			target="_blank"
			title="Install extension"
		>
			<img src="/cws.png" alt="Available in the Chrome Web Store" />
		</a>
		<div class="">
			<div class="hh">More:</div>
			<div>
				<a href="https://hotatap.pages.dev/app" target="_blank" class="btn text alpha">
					<span>Web client for REST API testing</span>
				</a>
			</div>
		</div>
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
		border-top: 3px double var(--fl0);
		background: var(--bg0);
	}

	section {
		display: flex;
		margin-bottom: 3em;
	}

	.hh {
		text-align: right;
	}
</style>
