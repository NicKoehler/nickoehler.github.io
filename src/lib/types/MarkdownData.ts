export type MardkdownData = {
	intro: { text: string };
	contacts: { text: string };
	skills: [
		{
			id: number;
			text: string;
		}
	];
	experiences: [
		{
			id: number;
			text: string;
		}
	];
	projects: [
		{
			id: number;
			text: string;
		}
	];
};
