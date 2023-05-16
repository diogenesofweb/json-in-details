/** @type {import('./$types').RequestHandler} */
export async function GET(x) {
	const q = x.url.searchParams.get('q');

	if (!q) {
		return new Response(JSON.stringify({ message: 'No URL' }), { status: 400 });
	}

	try {
		const u = new URL(q);
		// console.log(u);
	} catch (error) {
		// console.error(error);
		return new Response(JSON.stringify({ message: 'Invalid URL' }), { status: 400 });
	}

	let status = 400;
	try {
		// throw new Error('Oops !!!');
		const p = await x.fetch(q);
		status = p.status;
		const data = await p.json();
		const res = JSON.stringify(data);
		return new Response(res);
	} catch (error) {
		return new Response(JSON.stringify(error?.message || error), { status });
	}
}
