import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function getLanguage(): string {
	if (browser && localStorage.getItem('language')) {
		return localStorage.getItem('language') ?? 'en';
	}
	return navigator.language === 'it-IT' ? 'it' : 'en';
}

export const languageStore = writable(getLanguage());

languageStore.subscribe((value) => {
	if (browser && value) {
		localStorage.setItem('language', value);
	}
});
