<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	let { children } = $props();
</script>

<svelte:head>
	<title>Nicola Grilli</title>
	<link rel="icon" href={favicon} /><script>
		document.documentElement.classList.toggle(
			'dark',
			localStorage.theme === 'dark' ||
				(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		);
	</script>
</svelte:head>
{@render children()}
<footer class="container mx-auto text-center m-100"></footer>
