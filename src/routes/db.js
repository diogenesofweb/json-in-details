import { openDB } from 'idb';

const name = 'JSON';

/** @type {Promise<import('idb').IDBPDatabase<import('./types').MyDB>> } */
const db = openDB('J9', 1, {
	upgrade(db) {
		// console.log('upgrade');
		const s = db.createObjectStore(name, {
			keyPath: 'date'
		});
	}
});

export const idb = {
	set: async (/** @type {import("./types").IMyDBValue} */ one) => {
		return (await db).put(name, one);
	},
	get: async (/** @type {Date | IDBKeyRange} */ key) => {
		return (await db).get(name, key);
	},
	getAll: async () => {
		return (await db).getAll(name);
	},
	del: async (/** @type {Date | IDBKeyRange} */ key) => {
		return (await db).delete(name, key);
	},
	keys: async () => {
		return (await db).getAllKeys(name);
	}
};
