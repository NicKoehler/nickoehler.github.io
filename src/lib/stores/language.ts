import { writable } from 'svelte/store';

function getLanguage(): string {
	if (localStorage.getItem('language')) {
		return localStorage.getItem('language') ?? 'en';
	}
	return navigator.language === 'it-IT' ? 'it' : 'en';
}

export const languageStore = writable(getLanguage());

languageStore.subscribe((value) => {
	if (value) {
		localStorage.setItem('language', value);
	}
});
