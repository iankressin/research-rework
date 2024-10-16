<script>
	import { ArrowUp } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let visible = false;

	onMount(() => {
		const handleScroll = () => {
			visible = window.scrollY > 100;
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

{#if visible}
	<button
		on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
		aria-label="Scroll to top"
		class="fixed bottom-0 right-0 mr-8 mb-8 border rounded-full p-2 h-10 w-10 flex items-center
				justify-center group-hover:bg-primary group-hover:text-accent group-hover:translate-y-1
				transition-transform duration-300"
	>
		<ArrowUp size="16px" />
	</button>
{/if}
