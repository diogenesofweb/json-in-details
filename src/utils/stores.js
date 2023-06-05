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
// 		num: 123,
// 		em: null,
// 		o: {},
// 		o2: '{}',
// 		a: [],
// 		arr: ['<b>bold</b>', 'http://example.com/', 1, null, false, [], {}, [[[]]]]
// 	}
// ]);
