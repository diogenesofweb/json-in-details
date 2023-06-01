# JSON Viewer

## Web App

[live](https://json-in-details.pages.dev)

![sceeenshot](./Screenshot.png)

### Notes

- **Folding** is done with `<details />` element, no event listeners attached.
- **Collapse/Expand** - togging `<details />` _open_ attribute.
- **Filter** - toggling `display: none;`.

---

## Package

[source](./src/lib/) [npm](https://www.npmjs.com/package/json-in-details)

### Install

```bash
npm install json-in-details
# or
pnpm add json-in-details
```

### Usage

Examples in **svelte**

#### Example 1: view

```svelte
<script>
	// container element: add class `jid`
	import 'json-in-details/styles.css';

	import { generate_HTML } from 'json-in-details';

	const json_object = JSON.parse('{"hello":"world"}');
	const html = generate_HTML(json_object, { escape_HTML: true, show_newline_chars: false });
	// console.log(html)
</script>

<div class="jid">{@html html}</div>
```

#### Example 2: view with functionality

```svelte
<script>
	import 'json-in-details/styles.css';

	import init from 'json-in-details';

	let path = '?';

	const container_id = 'my-jid';
	const container_selector = `#${container_id}`;

	const { collapse, expand, filter, get_path, generate_HTML } = init(container_selector);

	const json_object = JSON.parse('{"hello":"world","foo":{"bar":123}}');
	const html = generate_HTML(json_object, { escape_HTML: true, show_newline_chars: false });
	// console.log(html)
</script>

<button on:click={collapse}>collapse</button>
<button on:click={expand}>expand</button>

<label>
	<span>Filter</span>
	<input type="text" on:input={(ev) => filter(ev.currentTarget.value)} />
</label>

<p>Path: {path}</p>

<div id={container_id} class="jid" on:focusin={(ev) => (path = get_path(ev))}>
	{@html html}
</div>
```

### Styling

1. Import `styles.css`, or just copy-past [its content](./src/lib/styles.css).
2. Add class `jid` to the container element.
3. Dark mode: add class `dark` to the container or to `<html>`.

```css
@import 'json-in-details/styles.css' layer(jid);

/* .jid {} */
/* :is(html.dark .jid, .jid.dark) {} */
```
