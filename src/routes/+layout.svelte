<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import DarkModeToggle from '$lib/components/ui/DarkModeToggle.svelte';
	import Nav from '$lib/components/ui/Nav.svelte';

	const { children } = $props();

	onMount(() => {
		const darkMode = localStorage.getItem('darkMode');
		if (darkMode === 'true') {
			document.documentElement.classList.add('dark');
		}
	});
</script>

<div>
	<Nav />
	<div class="px-3 md:px-12 transition-colors duration-300">
		{@render children()}
	</div>
</div>

<style>
	:global(html) {
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}
</style>
