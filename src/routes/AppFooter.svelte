<script>
	// import AppHomeLink from './AppHomeLink.svelte';
	// console.log('x')
</script>

<footer class="alpha">
	<section class="">
		<ul>
			<li>
				<a
					href="https://chrome.google.com/webstore/detail/functional-json-viewer/cokkmplppnaigoodkkjopoblfaelibab"
					title="Install extension"
				>
					<img src="/cws.png" alt="Available in the Chrome Web Store" width="206" height="58" />
				</a>
			</li>
		</ul>
	</section>

	<section>
		<p>Info:</p>

		<ul>
			<li>
				<!-- svelte-ignore missing-declaration -->
				<a href={PKG['homepage']} class="btn text"> Github repository </a>
			</li>

			<li>
				<a href="https://www.npmjs.com/package/json-in-details" class="btn text"> NPM package </a>
			</li>
		</ul>
	</section>

	<section>
		<p>Related projects:</p>

		<ul>
			<li>
				<a href="https://hotatap.delphic.top/app" class="btn text">
					Web client for REST API testing
				</a>
			</li>

			<li>
				<a href="https://tabulamax.delphic.top" class="btn text">
					Design DB tables, generate SQL and KnexJS migraions, TS interfaces, GO structs.
				</a>
			</li>
		</ul>
	</section>
</footer>

<style>
	footer {
		padding-block: 10vh;
		padding-inline: var(--sx-m);
		border-top: 3px double var(--fl0);
		background: var(--bg0);
	}

	section {
		padding-block: 1rem;
	}

	/* .links { */
	/* 	background: gray; */
	/* } */
</style>
