<script>
	import { Dtl, Icon } from '@kazkadien/svelte';
	import JsonInDetails from './JsonInDetails.svelte';
	import FilterPanel from './FilterPanel.svelte';
	import NodePathPanel from './NodePathPanel.svelte';
	import Manage from './Manage.svelte';
	import { my_json } from '$utils/stores';
	import { onDestroy } from 'svelte';
	import './panel.css';

	let path = '';

	const unsub = my_json.subscribe(() => (path = '?'));
	onDestroy(() => unsub());
</script>

<svelte:head>
	<title>JSON Viewer</title>
</svelte:head>

<article>
	<Manage />

	<section id="start" class="">
		<FilterPanel />
		<NodePathPanel title={path} />
		<JsonInDetails json={$my_json} on:path_change={(ev) => (path = ev.detail)} />
	</section>

	<section class="tips f-mono">
		<Dtl heading="Search" open>
			<ol>
				<li>
					Press <i>COLLAPSE </i>icon
					<Icon name="unfold_less_double" />
				</li>

				<li>Press <i>Ctrl+F</i></li>
				<li>Browser will auto expand matched nodes</li>
			</ol>
		</Dtl>

		<Dtl heading="Keymaps">
			<p>h - move focus left (parent node)</p>
			<p>j - move focus down (next sibling)</p>
			<p>k - move focus up (previous sibling)</p>
			<p>l - move focus right (child node)</p>

			<p>c - collapse all child nodes</p>
			<p>e - expand all child nodes</p>

			<p>y - copy node</p>
			<p>p - copy node path</p>
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
		--g: var(--btn-br, 0.5em);
		padding-inline: var(--sx-m);
		padding-block: 1em;
		background: var(--bg0);
	}

	#start {
		position: relative;
		scroll-margin-block-start: var(--g);
	}

	#to-top {
		position: fixed;
		bottom: 2em;
		right: var(--sx-m);
	}

	#to-top:not(:hover) {
		opacity: 0.6;
	}

	.tips {
		margin-block: 3em;
		display: grid;
		gap: 1em;
	}
</style>
