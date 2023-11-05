<script>
	import { Dtl, Icon } from '@kazkadien/svelte';
	import JsonInDetails from './JsonInDetails.svelte';
	import FilterPanel from './FilterPanel.svelte';
	import NodePathPanel from './NodePathPanel.svelte';
	// import Manage from './Manage.svelte';
	import { my_json } from '$utils/stores';
	import { onDestroy, onMount } from 'svelte';
	import MyIcon from '$utils/MyIcon.svelte';

	let path = '';

	const unsub = my_json.subscribe(() => (path = '?'));
	onDestroy(() => unsub());

	/** @type {typeof import("./Manage.svelte").default | null} */
	let comp = null;
	onMount(async () => {
		comp = (await import('./Manage.svelte')).default;
	});
</script>

<svelte:head>
	<title>Online JSON Viewer</title>
	<meta
		name="description"
		content="Free online JSON viewer, formatter and converter. Generate screenshots, JSON Schema, Typescript interfaces, Golang structs."
	/>
	<link rel="canonical" href="https://json-viewer.delphic.top" />
</svelte:head>

<article>
	{#if comp}
		<svelte:component this={comp} />
	{/if}
	<!-- <Manage /> -->

	<section id="start">
		<FilterPanel />
		<NodePathPanel title={path} />
		<JsonInDetails json={$my_json} on:path_change={(ev) => (path = ev.detail)} />
	</section>

	<h1>JSON Viewer</h1>
	<section class="tips f-mono">
		<Dtl heading="Search" open>
			<ul>
				<li>
					Press <i>COLLAPSE </i>icon
					<MyIcon name="unfold_less_double" />.
				</li>

				<li>Press <i>Ctrl+F</i>.</li>
				<li>Browser will auto expand matched nodes.</li>
			</ul>
		</Dtl>

		<Dtl heading="Keymaps (Vim inspired)">
			<ul>
				<li><b>h</b> | <b>ArrowLeft</b> - Move focus to the parent node.</li>
				<li><b>j</b> | <b>ArrowDown</b> - Move focus to the next sibling node.</li>
				<li><b>k</b> | <b>ArrowUp</b> - Move focus to the previous sibling node.</li>
				<li><b>l</b> | <b>ArrowRight</b> - Move focus to the child node.</li>

				<li><b>c</b> - Fold all child nodes.</li>
				<li><b>e</b> - Unfold all child nodes.</li>

				<li><b>y</b> - Copy node content.</li>
				<li><b>p</b> - Copy node path.</li>
			</ul>
		</Dtl>

		<Dtl heading="Convert JSON">
			<ul>
				<li>
					Converting JSON to
					<a href="https://json-schema.org/">JSON Schema</a>
					is done with
					<a href="https://github.com/aspecto-io/genson-js">genson-js</a>.
				</li>

				<li>
					Converting JSON to
					<a href="https://www.typescriptlang.org/">Typescript</a>
					interfaces is done with
					<a href="https://github.com/MariusAlch/json-to-ts">json-to-ts</a>.
				</li>

				<li>
					Converting JSON to
					<a href="https://go.dev/">Golang</a>
					structs is done with
					<a href="https://github.com/mholt/json-to-go">json-to-go</a>.
				</li>
			</ul>
		</Dtl>

		<Dtl heading="This App">
			<p>Elegant UI:</p>
			<ul>
				<li>Foldable and filterable and focusable nodes.</li>
				<li>Show node path on focus and hover.</li>
				<li>Configurable clickable links.</li>
				<li>Light and dark theme.</li>
			</ul>

			<p>Functionality:</p>

			<ul>
				<li>Filter nodes.</li>
				<li>Collapse all nodes.</li>
				<li>Expand all nodes.</li>
				<li>Save JSON.</li>
				<li>Copy JSON.</li>
				<li>Copy node.</li>
				<li>Copy node path.</li>
				<li>Switch between formatted and raw data.</li>

				<li>Sticky panels.</li>
				<li>Converting JSON.</li>
				<li>(Shift-)Tab navigation.</li>
				<li>Keymaps (Vim inspired).</li>
				<li>History.</li>
				<li>New JSON entry via file upload, fetch URL or insert JSON string.</li>
				<li>JSON screenshot (JSON to image .jpeg).</li>
			</ul>
		</Dtl>

		<Dtl heading="What is JSON ?">
			<p>
				<a href="https://www.json.org/">JSON</a>
				(JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans
				to read and write, and easy for machines to parse and generate. It is based on a subset of the
				JavaScript Programming Language Standard and is completely language independent. JSON is built
				on two structures: a collection of name/value pairs and an ordered list of values. It can be
				used with various programming languages and supports objects, arrays, strings, numbers, true/false,
				and null values. JSON is widely supported and can be used for data interchange between different
				programming languages.
			</p>
		</Dtl>
	</section>

	<a id="to-top" href="#start" title="Scroll to top" class="btn icon-only outlined">
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
		/* background: var(--bg0); */
	}
	li > b {
		color: var(--fg-gamma);
	}
	p > a {
		color: var(--fg-alpha);
		text-underline-offset: 3px;
		&:hover {
			color: var(--fg-beta);
		}
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

	h1 {
		margin-top: max(10vh, 4rem);
	}
	.tips {
		/* margin-block: 3em; */
		margin-bottom: max(10vh, 4rem);
		display: grid;
		gap: 1em;
	}
	li {
		padding-block: 0.5ch;
		list-style-position: inside;
		list-style-type: disc;
	}
</style>
