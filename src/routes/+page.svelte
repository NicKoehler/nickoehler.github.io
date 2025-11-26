<script lang="ts">
	import Card from '$lib/components/card.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import type { MardkdownData } from '$lib/types/MarkdownData';
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
	import { fade } from 'svelte/transition';
	export let data: MardkdownData;
	const tabs = new Map([
		['skills', data.skills],
		['experience', data.experiences],
		['projects', data.projects]
	]);

	let activeTab = 'skills';
</script>

<div class="max-w-6xl mx-auto p-6">
	<div class="flex justify-between items-center mb-6">
		<div></div>
		<ThemeToggle />
	</div>
	<div class="grid md:grid-cols-3 gap-6">
		<Card>
			<img
				src="https://avatars.githubusercontent.com/u/53040044"
				class="rounded-2xl object-cover mb-6"
				alt="profile"
			/>
			<div class="space-y-0 mb-0">
				<SvelteMarkdown source={data.contacts.text} />
			</div>
		</Card>
		<div class="md:col-span-2 flex">
			<Card>
				<SvelteMarkdown source={data.intro.text} />
			</Card>
		</div>
	</div>

	<div class="flex justify-around p-6 font-semibold text-lg">
		{#each tabs.keys() as field (field)}
			<div class="col text-center flex flex-col items-center">
				<button class="cursor-pointer" on:click={() => (activeTab = field)}>
					{field.toUpperCase()}
				</button>
				{#if activeTab === field}
					<span class="indicator" style="transform: translateX(calc(var(--activeIndex) * 100%));"
					></span>
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
				<SvelteMarkdown source={item.text} />
			</Card>
		{/each}
	</div>
</div>
