import introText from '/src/lib/markdown/intro.md?raw';
import contactsText from '/src/lib/markdown/contacts.md?raw';

const skillFiles = import.meta.glob('/src/lib/markdown/skills/*.md', {
	query: '?raw',
	import: 'default'
});

const experiencesFiles = import.meta.glob('/src/lib/markdown/experiences/*.md', {
	query: '?raw',
	import: 'default'
});

const projectFiles = import.meta.glob('/src/lib/markdown/projects/*.md', {
	query: '?raw',
	import: 'default'
});

export async function load() {
	const intro = {
		text: introText
	};
	const contacts = {
		text: contactsText
	};
	const skills = await Promise.all(
		Object.entries(skillFiles).map(async ([_, loader], index) => ({
			id: index + 1,
			text: (await loader()) as string
		}))
	);

	const experiences = await Promise.all(
		Object.entries(experiencesFiles)
			.reverse()
			.map(async ([_, loader], index) => ({
				id: index + 1,
				text: (await loader()) as string
			}))
	);
	const projects = await Promise.all(
		Object.entries(projectFiles).map(async ([_, loader], index) => ({
			id: index + 1,
			text: (await loader()) as string
		}))
	);

	return { intro, contacts, skills, experiences, projects };
}
