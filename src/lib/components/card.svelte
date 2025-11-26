<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';
	interface Props {
		children: Snippet;
		duration?: number;
	}
	const { children, duration = 0 }: Props = $props();
</script>

<div
	in:fade={{ duration: duration }}
	class="bg-gray-50 dark:bg-gray-600 shadow-2xl rounded-4xl p-8"
>
	{@render children?.()}
</div>
