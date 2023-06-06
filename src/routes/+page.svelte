<script>
	import { Dtl, Icon } from '@kazkadien/svelte';
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

	<section class="tips f-mono">
		<Dtl heading="Search" open>
			<div>
				press <i>COLLAPSE </i>icon {'->'} press <i>Ctrl+F</i>
				{'->'} type search <i>text</i>
			</div>
		</Dtl>

		<Dtl heading="Keymaps">
			<p>h - move focus left (parent node)</p>
			<p>j - move focus down (next sibling)</p>
			<p>k - move focus up (previous sibling)</p>
			<p>l - move focus right (child node)</p>

			<p>c - collapse all child nodes</p>
			<p>e - expand all child nodes</p>
		</Dtl>
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
		margin-block: 3em;
		display: grid;
		gap: 1em;
	}
</style>
