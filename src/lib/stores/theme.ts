import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
	if (browser && localStorage.getItem('theme')) {
		return localStorage.getItem('theme') as Theme;
	}
	if (typeof window !== 'undefined') {
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}
	return 'light';
}

export const theme = writable<Theme>(getInitialTheme());

theme.subscribe((value) => {
	if (browser) {
		document.documentElement.classList.toggle('dark', value === 'dark');
		localStorage.setItem('theme', value);
	}
});
