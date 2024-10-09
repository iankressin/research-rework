<script lang="ts">
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const articles = $derived(data.articles);
</script>

<!-- These heights are arbitrary and never repeated throughout the website, that's why they're not in tailwind config -->
<div
	class="h-[420px] md:h-[714px] bg-gray-100 relative gradient border-b border-black flex flex-col justify-end"
>
	<h1 class="text-3xl md:text-6xl font-medium leading-tight max-w-4xl mb-12 px-10">
		Comprehensive and insightful research within the Ethereum and broader crypto landscape.
	</h1>
</div>

<style scoped>
	.gradient {
		background: linear-gradient(180deg, #eef0f2 0%, rgba(238, 240, 242, 0) 80%);
	}
</style>
