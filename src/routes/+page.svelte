<script>
	import { Dtl, Icon } from '@kazkadien/svelte';
	import JsonInDetails from './JsonInDetails.svelte';
	import FilterPanel from './FilterPanel.svelte';
	import NodePathPanel from './NodePathPanel.svelte';
	import Manage from './Manage.svelte';
	import { my_json } from '$utils/stores';
	import { onDestroy } from 'svelte';

	let path = '';

	const unsub = my_json.subscribe(() => (path = '?'));
	onDestroy(() => unsub());
</script>

<svelte:head>
	<title>JSON Viewer</title>
	<meta
		name="description"
		content="Free online JSON viewer, reader, formatter and converter. Explore formatted JSON data in a browser. Convert JSON to JSON Schema, Typescript interfaces, Golang structs"
	/>
	<link rel="canonical" href="https://json-viewer.delphic.top/" />
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

		<Dtl heading="Keymaps (Vim inspired)">
			<p><b>h</b> | ArrowLeft - move focus to the parent node</p>
			<p><b>j</b> | ArrowDown - move focus to the next sibling node</p>
			<p><b>k</b> | ArrowUp - move focus to the previous sibling node</p>
			<p><b>l</b> | ArrowRight - move focus to the child node</p>

			<p><b>c</b> - fold all child nodes</p>
			<p><b>e</b> - unfold all child nodes</p>

			<p><b>y</b> - copy node content</p>
			<p><b>p</b> - copy node path</p>
		</Dtl>

		<Dtl heading="Convert JSON">
			<p>
				Converting JSON to
				<a href="https://json-schema.org/">JSON Schema</a>
				is done with
				<a href="https://github.com/aspecto-io/genson-js">genson-js</a>.
			</p>

			<p>
				Converting JSON to
				<a href="https://www.typescriptlang.org/">Typescript</a>
				interfaces is done with
				<a href="https://github.com/MariusAlch/json-to-ts">json-to-ts</a>.
			</p>

			<p>
				Converting JSON to
				<a href="https://go.dev/">Golang</a>
				structs is done with
				<a href="https://github.com/mholt/json-to-go">json-to-go</a>.
			</p>
		</Dtl>

		<Dtl heading="What is JSON ?">
			<p>
				JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for
				humans to read and write, and easy for machines to parse and generate. It is based on a
				subset of the JavaScript Programming Language Standard and is completely language
				independent. JSON is built on two structures: a collection of name/value pairs and an
				ordered list of values. It can be used with various programming languages and supports
				objects, arrays, strings, numbers, true/false, and null values. JSON is widely supported and
				can be used for data interchange between different programming languages.
			</p>
		</Dtl>
	</section>

	<a id="to-top" href="#start" title="scroll to top" class="btn icon-only outlined">
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
	p > b {
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

	.tips {
		margin-block: 3em;
		display: grid;
		gap: 1em;
	}
</style>
