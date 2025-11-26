import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
	if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
		return localStorage.getItem('theme') as Theme;
	}

	if (typeof window !== 'undefined') {
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	return 'light';
}

export const theme = writable<Theme>(getInitialTheme());

theme.subscribe((value) => {
	if (typeof document !== 'undefined') {
		document.documentElement.classList.toggle('dark', value === 'dark');
	}

	if (typeof localStorage !== 'undefined') {
		localStorage.setItem('theme', value);
	}
});
