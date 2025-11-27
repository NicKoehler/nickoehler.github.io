<script lang="ts">
	import { languageStore } from '$lib/stores/language';
</script>

<select
	id="language"
	aria-label="language"
	bind:value={$languageStore}
	class="p-3 pr-4 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-800 cursor-pointer"
>
	{#each [['en', 'English'], ['it', 'Italiano']] as [code, lang] (code)}
		<option value={code}>{lang}</option>
	{/each}
</select>
