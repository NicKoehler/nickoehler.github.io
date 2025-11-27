export type Item = {
	label: string;
	data: {
		id: number;
		text: string;
	}[];
};

export type MarkdownData = {
	intro: string;
	contacts: string;
	skills: Item;
	experiences: Item;
	projects: Item;
};
