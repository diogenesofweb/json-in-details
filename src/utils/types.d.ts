import type { Accent, AlertIcon } from '@kazkadien/svelte/types';

export interface Snack {
	id: number;
	body: string;
	icon?: AlertIcon;
	accent?: Accent;
}
