import { writable } from 'svelte/store';
// console.log({ j: PKG });
// console.log(PKG['license']);

// @ts-ignore
export const my_json = writable(PKG);
// export const my_json = writable({
// 	"hello '": '<i>italic</i>',
// 	arr: ['<b>bold</b>', 'http://example.com/']
// });
//
