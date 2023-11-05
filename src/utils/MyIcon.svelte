<script>
	export let accent = '';

	/** @type {import("./vars").MyIconName } */
	export let name;

	export let fill = 'currentColor';
	// export let fill = 'red'
</script>

<svg
	height="24px"
	width="24px"
	viewBox="0 0 24 24"
	{fill}
	class={accent}
	style="width: 1.5em; height: auto; {accent && 'fill: var(--__fg);'}"
>
	<use href={`#${name}`} />
</svg>
