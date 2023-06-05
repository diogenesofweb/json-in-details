<script>
	import { Icon } from '@kazkadien/svelte';
	import JsonInDetails from './JsonInDetails.svelte';
	import FilterAndFold from './FilterAndFold.svelte';
	import ThePath from './ThePath.svelte';
	import Manage from './Manage.svelte';
	import { my_json } from '$utils/stores';
	import { onDestroy } from 'svelte';

	let path = '';

	const unsub = my_json.subscribe(() => (path = '?'));
	onDestroy(() => unsub());
</script>

<svelte:head>
	<title>JSON Viewer</title>
</svelte:head>

<article>
	<section>
		<Manage />
	</section>

	<section id="start" class="f-mono alpha">
		<FilterAndFold />
		<ThePath title={path} />
		<JsonInDetails json={$my_json} on:path_change={(ev) => (path = ev.detail)} />
	</section>

	<section class="tips">
		<b>Search: </b>
		<div>
			press <i>COLLAPSE </i>icon {'->'} press <i>Ctrl+F</i>
			{'->'} type search <i>text</i>
		</div>
	</section>

	<section class="tips">
		<b>Keyboard: </b>
		<div>h/j/k/l - move left/down/up/right</div>
		<div>c/e - collapse/expande inner nodes</div>
	</section>

	<a id="to-top" href="#start" class="btn icon-only outlined">
		<Icon name="keyboard_arrow_up" />
	</a>
</article>

<style>
	article {
		/* max-width: 120ch; */
		/* margin-inline: auto; */

		padding-inline: var(--sx-m);
		padding-block: 2em;
		background: var(--bg0);
	}

	#start {
		position: relative;
	}

	#to-top {
		position: fixed;
		bottom: 2em;
		right: var(--sx-m);
	}

	#to-top:not(:hover) {
		opacity: 0.3;
	}

	.tips {
		line-height: 1.6;
		margin-top: 2em;
		padding-inline: var(--sx-m);
		padding-block: 1em;
		background: var(--bg);
	}
</style>
