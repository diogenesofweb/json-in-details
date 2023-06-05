import { writable } from 'svelte/store';
// console.log({ j: PKG });
// console.log(PKG['license']);

// @ts-ignore
export const my_json = writable(PKG);

// export const my_json = writable([
// 	{
// 		"hello '": '<i>italic</i>',
// 		url: 'https://example.com/',
// 		route: '/draft',
// 		bool: true,
// 		em: null,
// 		o: {},
// 		asd: { a: { b: { f: 1 }, f: { g: 4 } } },
// 		o22: { a: 5 },
// 		o22e: { a: 5, e: 4, t: 5, arr: [1, true, {}, { as: 32 }] },
// 		o2: '{}',
// 		a: [],
// 		arr: ['<b>bold</b>', 'http://example.com/', 1, null, false, [], {}, [[[]]]]
// 	}
// ]);
