<script>
	import Ex1 from './Ex1.svelte';
	import Ex2 from './Ex2.svelte';

	let q = 'https://bank.com.ua/api/uk/v1/rest-ui/find-branch-course?date';
	q = '';
	function run() {
		fetch('/api?' + new URLSearchParams({ q }))
			.then((v) => v.json())
			.then((v) => console.log(v))
			.catch((e) => {
				console.error(e);
			});
	}
</script>

<button on:click={run}>run</button>

<Ex1 />

<Ex2 />
