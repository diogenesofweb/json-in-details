<script>
	import AppHomeLink from './AppHomeLink.svelte';
	// console.log('x')
</script>

<footer class="alpha">
	<section class="fsb g1">
		<a
			href="https://chrome.google.com/webstore/detail/functional-json-viewer/cokkmplppnaigoodkkjopoblfaelibab"
			title="Install extension"
		>
			<img src="/cws.png" alt="Available in the Chrome Web Store" width="206" height="58" />
		</a>

		<div class="more">
			<div class="hh">More:</div>
			<div style="display: grid;">
				<a href="https://hotatap.pages.dev/app" class="btn text alpha">
					<span>Web client for REST API testing</span>
				</a>
			</div>
		</div>
	</section>

	<nav class="fsb g1">
		<div>
			<AppHomeLink />
		</div>

		<div class="fsb">
			<!-- svelte-ignore missing-declaration -->
			<a href={PKG['homepage']} class="btn text"> Github repo </a>
			<a href="https://www.npmjs.com/package/json-in-details" class="btn text"> NPM package </a>
		</div>
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
		gap: 2em;
	}

	:where(section, nav) > :first-child {
		flex-grow: 100;
	}
	.fsb,
	.more {
		flex-grow: 1;
		justify-self: end;
		/* background: gray; */
	}

	.hh {
		text-align: center;
	}

	/* nav { */
	/* 	background: gray; */
	/* } */

	nav a {
		/* background: gray; */
		flex-grow: 1;
	}
</style>
