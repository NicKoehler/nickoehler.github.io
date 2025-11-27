import type { Item, MarkdownData } from '$lib/types/MarkdownData';

import intro_it from '$lib/markdown/it/intro.md?raw';
import intro_en from '$lib/markdown/en/intro.md?raw';
import contacts_it from '$lib/markdown/it/contacts.md?raw';
import contacts_en from '$lib/markdown/en/contacts.md?raw';

export async function loadData(lang: string): Promise<MarkdownData> {
	let intro;
	let contacts;
	let skills: Item = { label: '', data: [] };
	let experiences: Item = { label: '', data: [] };
	let projects: Item = { label: '', data: [] };

	if (lang === 'it') {
		intro = intro_it;
		contacts = contacts_it;
		skills = {
			label: 'Abilità',
			data: await Promise.all(
				Object.entries(
					import.meta.glob('/src/lib/markdown/it/skills/*.md', {
						query: '?raw',
						import: 'default'
					})
				).map(async ([_, loader], index) => ({
					id: index + 1,
					text: (await loader()) as string
				}))
			)
		};

		projects = {
			label: 'Progetti',
			data: await Promise.all(
				Object.entries(
					import.meta.glob('/src/lib/markdown/it/projects/*.md', {
						query: '?raw',
						import: 'default'
					})
				).map(async ([_, loader], index) => ({
					id: index + 1,
					text: (await loader()) as string
				}))
			)
		};

		experiences = {
			label: 'Esperienze',
			data: await Promise.all(
				Object.entries(
					import.meta.glob('/src/lib/markdown/it/experiences/*.md', {
						query: '?raw',
						import: 'default'
					})
				).map(async ([_, loader], index) => ({
					id: index + 1,
					text: (await loader()) as string
				}))
			)
		};
	} else {
		intro = intro_en;
		contacts = contacts_en;
		skills = {
			label: 'Skills',
			data: await Promise.all(
				Object.entries(
					import.meta.glob('/src/lib/markdown/en/skills/*.md', {
						query: '?raw',
						import: 'default'
					})
				).map(async ([_, loader], index) => ({
					id: index + 1,
					text: (await loader()) as string
				}))
			)
		};
		projects = {
			label: 'Projects',
			data: await Promise.all(
				Object.entries(
					import.meta.glob('/src/lib/markdown/en/projects/*.md', {
						query: '?raw',
						import: 'default'
					})
				).map(async ([_, loader], index) => ({
					id: index + 1,
					text: (await loader()) as string
				}))
			)
		};
		experiences = {
			label: 'Experiences',
			data: await Promise.all(
				Object.entries(
					import.meta.glob('/src/lib/markdown/en/experiences/*.md', {
						query: '?raw',
						import: 'default'
					})
				).map(async ([_, loader], index) => ({
					id: index + 1,
					text: (await loader()) as string
				}))
			)
		};
	}

	return { intro, contacts, skills, experiences, projects };
}
