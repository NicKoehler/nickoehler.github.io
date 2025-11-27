<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		href?: string;
		title?: string;
		text?: string;
		lazy?: boolean; // Enable lazy loading (default: true)
		fadeIn?: boolean; // Enable fade-in effect (default: true)
	}

	const { href = '', title = undefined, text = '', lazy = true, fadeIn = true }: Props = $props();

	let img: HTMLImageElement;
	let loaded = $state(false);
	let visible = $state(!lazy); // If not lazy, visible immediately
	let error = $state(false);
	onMount(() => {
		if (!lazy) {
			// Not lazy loading - show immediately
			return;
		}

		// Environments without IntersectionObserver: show immediately
		if (typeof IntersectionObserver === 'undefined') {
			visible = true;
			return;
		}

		// Use IntersectionObserver for lazy loading
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting) {
					visible = true;
					observer.disconnect();
				}
			},
			{
				rootMargin: '50px' // Start loading 50px before visible
			}
		);

		if (img) {
			observer.observe(img);
		}

		return () => {
			observer?.disconnect();
		};
	});

	const handleLoad = () => {
		// Don't override error state if error already occurred
		if (error) return;
		loaded = true;
	};

	const handleError = () => {
		error = true;
		loaded = true;
	};
</script>

<div class="flex justify-center">
	<div class="bg-gray-50 rounded-4xl shadow-2xl">
		<img
			class="p-6 size-40"
			bind:this={img}
			src={visible ? href : undefined}
			data-src={href}
			{title}
			alt={text}
			loading={lazy ? 'lazy' : 'eager'}
			class:fade-in={fadeIn && loaded && !error}
			class:visible={!fadeIn && loaded && !error}
			class:error
			onload={handleLoad}
			onerror={handleError}
		/>
	</div>
</div>

<style>
	img.fade-in {
		opacity: 1;
		transition: opacity 0.3s ease-in-out;
	}

	img.visible {
		opacity: 1;
		transition: none;
	}

	img.error {
		opacity: 0.5;
		filter: grayscale(100%);
	}
</style>
