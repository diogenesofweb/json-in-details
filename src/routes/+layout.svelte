<script>
	import '$utils/app.css';
	import '$utils/kazkadien.css';
	import '$utils/dialog.css';
	import './panel.css';

	import { AppWrapper, AppSnacks } from '@kazkadien/svelte';
	import AppFooter from './AppFooter.svelte';
	import AppHeader from './AppHeader.svelte';
	import AppIcons from './AppIcons.svelte';
</script>

<AppWrapper>
	<AppIcons />

	<div id="app-container">
		<div id="view">
			<AppHeader />

			<div id="main">
				<slot />
			</div>

			<a
				id="ua"
				title="Support Ukraine"
				href="https://war.ukraine.ua/support-ukraine/"
				target="_blank"
				rel="noopener noreferrer">UA</a
			>
		</div>

		<AppFooter />
	</div>

	<AppSnacks />
</AppWrapper>

<style>
	/* #app-container { */
	/* 	position: relative; */
	/* } */
	#view {
		min-height: 100vh;
		display: grid;
		grid-template-rows: auto 1fr;
		/* grid-template-rows: 1fr auto; */
		/* backgjround-color: black; */
	}

	#main {
		border-bottom: var(--border2);
		border-top: var(--border2);
	}

	#ua {
		--blue: #0158b5;
		--yellow: #f6ce00;

		position: fixed;
		z-index: 2;
		bottom: 0;
		left: 0;
		width: 6vmin;
		height: 3vmin;
		color: transparent;

		transform: rotate(45deg) translate(-1vmin, 2vmin);

		background: linear-gradient(
			to bottom,
			var(--blue) 33%,
			var(--yellow) 33%,
			var(--yellow) 66%,
			transparent 66%
		);
	}
</style>
