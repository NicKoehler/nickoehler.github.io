import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
	if (localStorage.getItem('theme')) {
		return localStorage.getItem('theme') as Theme;
	}
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export const theme = writable<Theme>(getInitialTheme());

theme.subscribe((value) => {
	document.documentElement.classList.toggle('dark', value === 'dark');
	localStorage.setItem('theme', value);
});
