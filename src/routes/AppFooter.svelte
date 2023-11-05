<script>
	// import AppHomeLink from './AppHomeLink.svelte';
	// console.log('x')
	const my_projects = [
		{
			url: 'https://hotatap.delphic.top/app',
			name: 'HoTaTaP',
			title: 'Test and dubug REST API in the browser'
		},
		{
			url: 'https://tabulamax.delphic.top',
			name: 'Tabulamax',
			title: 'Design DB tables, generate SQL and KnexJS migraions, TS interfaces, GO structs.'
		},

		{
			url: 'https://icons.delphic.top',
			name: 'Icon Explorer',
			title:
				'Easily search, copy, download SVG icons from free libraries (Bootstrap, Material and more). Group icons in collections and generate SVG sprites.'
		},

		{
			name: 'TimerOne',
			title: 'Collection of online timers (pomodoro, countdown, stopwatch) and date calculators.',
			url: 'https://www.timerone.com'
		}
	];
</script>

<footer class="alpha">
	<section class="top">
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

		<div>
			<a href={PKG['homepage']} class="btn text"> Github </a>
			<a href="https://www.npmjs.com/package/json-in-details" class="btn text"> NPM </a>
		</div>
	</section>

	<!-- <section> -->
	<!-- 	<a href={PKG['homepage']} class="btn text"> Github </a> -->
	<!-- 	<a href="https://www.npmjs.com/package/json-in-details" class="btn text"> NPM </a> -->
	<!-- </section> -->

	<section class="projects">
		<div class="hh">Related Projects</div>
		<nav class="ext">
			{#each my_projects as el}
				<a href={el.url}>
					<b>{el.name}</b>
					<span>{el.title}</span>
				</a>
			{/each}
		</nav>
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
	.top {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 1em;
	}

	.hh {
		margin-bottom: 1em;
	}
	nav {
		max-width: 80ch;
		display: grid;
		gap: 1em;
	}
	.ext a {
		display: grid;
		gap: 0.25em;
		text-decoration: none;
		color: var(--fg1);

		& > b {
			color: var(--__fg);
		}

		&:is(:hover, :focus-visible) {
			color: var(--__fg);
			background: var(--bg3);
			outline: 0.75em solid var(--bg3);
			/* border-radius: 0.5em; */
		}
	}
</style>
