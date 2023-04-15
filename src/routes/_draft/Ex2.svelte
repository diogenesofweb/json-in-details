<script>
	import '$lib/styles.css';
	import init from '$lib';

	let path = '?';

	const container_id = 'my-jid';
	const container_selector = `#${container_id}`;

	const { collapse, expand, filter, get_path, generate_HTML } = init(container_selector);

	const json_object = JSON.parse('{"hello":"world","foo":{"bar":123}}');
	const html = generate_HTML(json_object, { escape_HTML: true, show_newline_chars: false });
</script>

<button on:click={collapse}>collapse all</button>
<button on:click={expand}>expand all</button>

<label class="field">
	<span>Filter</span>
	<input type="text" on:input={(ev) => filter(ev.currentTarget.value)} />
</label>

<p>Path: {path}</p>

<div id={container_id} class="jid" on:focusin={(ev) => (path = get_path(ev))}>
	{@html html}
</div>
