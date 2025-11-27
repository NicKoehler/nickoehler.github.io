<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import CustomImage from '$lib/components/CustomImage.svelte';
	import LanguageToggle from '$lib/components/LanguageToggle.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { loadData } from '$lib/LoadData';
	import { languageStore } from '$lib/stores/language';
	import type { Item, MarkdownData } from '$lib/types/MarkdownData';
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
	import { fade } from 'svelte/transition';
	let data: MarkdownData | undefined = $state();
	let tabs: Item[] | undefined = $state();
	let activeTab = $state(0);
	languageStore.subscribe(async (lang) => {
		if (lang) {
			data = await loadData(lang);
			tabs = [data.skills, data.experiences, data.projects];
		}
	});
</script>

{#if data && tabs}
	<div class="max-w-6xl mx-auto p-6">
		<div class="flex justify-end items-center mb-6 space-x-6">
			<LanguageToggle />
			<ThemeToggle />
		</div>
		<div class="grid md:grid-cols-3 gap-6">
			<div class="[&_p]:m-0 flex">
				<Card>
					<img
						src="https://avatars.githubusercontent.com/u/53040044"
						class="rounded-2xl object-cover mb-6 shadow-lg"
						alt="profile"
					/>
					{#if data !== undefined}
						<SvelteMarkdown source={data.contacts} />
					{/if}
				</Card>
			</div>
			<div class="md:col-span-2 flex">
				<Card>
					<SvelteMarkdown source={data.intro} />
				</Card>
			</div>
		</div>

		<div class="flex justify-around p-6 pt-10 font-semibold text-lg">
			{#each tabs as field, index (field.label)}
				<div class="col text-center flex flex-col items-center">
					<button class="cursor-pointer" onclick={() => (activeTab = index)}>
						{field.label}
					</button>
					{#if activeTab === index}
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
			{#each tabs[activeTab].data as item (`${activeTab}-${item.id}`)}
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
{/if}
