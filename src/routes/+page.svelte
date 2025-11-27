<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import CustomImage from '$lib/components/CustomImage.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import type { MardkdownData } from '$lib/types/MarkdownData';
	import SvelteMarkdown, { type HtmlRenderers } from '@humanspeak/svelte-markdown';
	import { fade } from 'svelte/transition';
	let { data }: MardkdownData = $props();

	const tabs = new Map([
		['skills', data.skills],
		['experience', data.experiences],
		['projects', data.projects]
	]);

	let activeTab = $state('skills');
</script>

<div class="max-w-6xl mx-auto p-6">
	<div class="flex justify-between items-center mb-6">
		<div></div>
		<ThemeToggle />
	</div>
	<div class="grid md:grid-cols-3 gap-6">
		<div class="[&_p]:m-0">
			<Card>
				<img
					src="https://avatars.githubusercontent.com/u/53040044"
					class="rounded-2xl object-cover mb-6 shadow-lg"
					alt="profile"
				/>
				<SvelteMarkdown source={data.contacts.text} />
			</Card>
		</div>
		<div class="md:col-span-2 flex">
			<Card>
				<SvelteMarkdown source={data.intro.text} />
			</Card>
		</div>
	</div>

	<div class="flex justify-around p-6 pt-10 font-semibold text-lg">
		{#each tabs.keys() as field (field)}
			<div class="col text-center flex flex-col items-center">
				<button class="cursor-pointer" onclick={() => (activeTab = field)}>
					{field.toUpperCase()}
				</button>
				{#if activeTab === field}
					<span
						class="flex size-2 justify-center items-center relative"
						transition:fade={{ duration: 300 }}
					>
						<span
							class="inline-flex h-full w-full rounded-full bg-gray-600 dark:bg-gray-100"
							transition:fade={{ duration: 200 }}
						>
						</span>
					</span>
				{/if}
			</div>
		{/each}
	</div>

	<div class="space-y-8">
		{#each tabs.get(activeTab) as item (`${activeTab}-${item.id}`)}
			<Card duration={250 * item.id}>
				<SvelteMarkdown
					source={item.text}
					renderers={{
						image: CustomImage
					}}
				/>
			</Card>
		{/each}
	</div>
</div>
