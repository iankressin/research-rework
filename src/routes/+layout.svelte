<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import DarkModeToggle from '$lib/components/DarkModeToggle.svelte';

	const { children } = $props();

	onMount(() => {
		const darkMode = localStorage.getItem('darkMode');
		if (darkMode === 'true') {
			document.documentElement.classList.add('dark');
		}
	});
</script>

<div class="p-3 md:p-12 transition-colors duration-300">
	<DarkModeToggle />
	{@render children()}
</div>

<style>
	:global(html) {
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}
</style>
