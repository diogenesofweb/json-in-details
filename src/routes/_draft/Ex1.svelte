<script>
	import '$lib/styles.css';
	import { generate_HTML } from '$lib';

	const json_object = JSON.parse('{"hello":"world"}');
	const html = generate_HTML(json_object, { escape_HTML: true, show_newline_chars: false });
</script>

<h2>Simple usage</h2>
<div class="jid">
	{@html html}
</div>
