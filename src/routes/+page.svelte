<script lang="ts">
	import ArticleSpotlight from '$lib/components/ui/ArticleSpotlight.svelte';
	import ArticleList from '$lib/components/ui/ArticleList.svelte';
	import NewsletterBanner from '$lib/components/ui/NewsletterBanner.svelte';
	import Footer from '$lib/components/ui/Footer.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const articles = $derived(data.articles);
	const articleCategories = $derived(data.articleCategories);
</script>

<div class="flex flex-col gap-14">
	<!-- These heights are arbitrary and never repeated throughout the website, that's why they're not in tailwind config -->
	<div
		class="h-[420px] md:h-[714px] bg-gray-100 relative gradient border-b border-black flex flex-col justify-end"
	>
		<h1 class="font-sohne text-3xl md:text-6xl font-medium leading-tight max-w-4xl mb-12 px-10">
			Comprehensive and insightful research within the Ethereum and broader crypto landscape.
		</h1>
	</div>

	<ArticleSpotlight article={articles[0]} />
	<ArticleList {articles} {articleCategories} />
	<NewsletterBanner />
	<Footer />
</div>

<style scoped>
	.gradient {
		background: linear-gradient(180deg, #eef0f2 0%, rgba(238, 240, 242, 0) 80%);
	}

	h1 {
		font-family: 'Soehne', sans-serif;
	}
</style>
