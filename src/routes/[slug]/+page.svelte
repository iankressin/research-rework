<script lang="ts">
	import { onMount } from 'svelte';
	import type { ArticleDetail } from '$lib/types/article';
	import NewsletterBanner from '$lib/components/ui/NewsletterBanner.svelte';
	import Footer from '$lib/components/ui/Footer.svelte';
	import SocialShare from '$lib/components/ui/SocialShare.svelte';
	import { ArrowLeft } from 'lucide-svelte';
	import Prism from 'prismjs';
	import 'prismjs/themes/prism.css';

	// Import language support
	import 'prismjs/components/prism-python';
	import 'prismjs/components/prism-javascript';
	import 'prismjs/components/prism-c';
	import 'prismjs/components/prism-markup';
	import 'prismjs/components/prism-solidity';

	export let data: { article: ArticleDetail };

	let articleContent = '';
	let currentURL = '';

	onMount(() => {
		currentURL = window.location.href;
		articleContent = data.article.content;

		Prism.highlightAll();
	});

	// Watch for changes to the content and trigger Prism highlighting
	$: if (articleContent) {
		Prism.highlightAll();
	}

	type TableOfContentsItem = {
		title: string;
		id: string;
		children?: TableOfContentsItem[];
	};

	function generateTocLinks(items?: TableOfContentsItem[]): string {
		// If items are undefined, return an empty string
		if (!items || items.length === 0) {
			return '';
		}

		return items
			.map((item) => {
				const childrenLinks =
					item.children && item.children.length
						? `<ul>${generateTocLinks(item.children)}</ul>`
						: '';

				return `<li><a href="#${item.id}">${item.title}</a>${childrenLinks}</li>`;
			})
			.join('');
	}

	// Get the table of contents from the article data
	let tableOfContents = generateTocLinks(data.article.table_of_contents ?? []);
</script>

<main class="flex flex-col gap-14">
	<!-- These heights are arbitrary and never repeated throughout the website, that's why they're not in tailwind config -->

	<div
		class="font-soehne h-[714px] relative border-b flex flex-col gap-4 justify-end bg-gradient-to-b from-gray-100 to-transparent dark:from-secondary dark:to-transparent px-4 md:px-10 pt-4 pb-6"
	>
		<div
			class="absolute top-0 mt-8 border rounded-full p-2 h-10 w-10 flex items-center justify-center group-hover:bg-primary group-hover:text-accent group-hover:translate-y-1 transition-transform duration-300"
		>
			<ArrowLeft class="h-10 w-10 rounded-full" style="stroke-width: 1.4" />
		</div>
		<!-- leading-[69px] is arbitrary and never repeated throughout the website, that's why it's not in tailwind config -->
		<h1 class="font-soehne text-3xl md:leading-[69px] md:text-6xl font-medium max-w-[888px]">
			{data.article.title}
		</h1>
		<div class="font-inter">
			<p class="pb-8 leading-7 dark:text-white text-xl md:text-2xl max-w-[888px]">
				{data.article.summary}
			</p>

			<div class="flex flex-col gap-1">
				<div class="flex gap-1">
					<p>
						<span>By</span>
						<span class="underline underline-offset-4"
							>{data.article.authors.map((author) => author.full_name).join(', ')}</span
						>, Head of Research, 2077 Collective
					</p>
				</div>
				<div class="[&_a]:underline [&_a]:underline-offset-4">
					<p>{@html data.article.acknowledgement}</p>
				</div>
			</div>
		</div>
		<div class="font-inter flex flex-col md:flex-row md:justify-between gap-1">
			<p class="text-gray-400">
				Published on {new Date(data.article.scheduled_publish_time).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</p>
			<p class="flex gap-2">Share on <SocialShare title={data.article.title} url={currentURL} /></p>
		</div>
	</div>

	<div class="aspect-w-16 aspect-h-9 w-full">
		<img
			src={data.article.thumb}
			alt={data.article.title}
			class="w-full h-full object-cover mb-4"
		/>
	</div>
	<div
		class="font-inter text-base leading-[24px] prose max-w-full
		[&_h1]:text-5xl [&_h1]:font-medium [&_h1]:leading-10 [&_h1]:tracking-tightest [&_h1]:pt-10 [&_h1]:pb-5
		[&_h2]:text-3xl [&_h2]:font-medium [&_h2]:leading-9 [&_h2]:tracking-tighter [&_h2]:py-5
		[&_h3]:text-2xl [&_h3]:font-medium [&_h3]:leading-7 [&_h3]:tracking-tighter md:[&_h3]:text-3xl md:[&_h3]:py-4
		[&_h4]:text-xl [&_h4]:font-medium [&_h4]:py-3
		[&_p]:text-base [&_p]:font-regular [&_p]:leading-6 [&_p]:tracking-tight [&_p]:pb-4
		[&_img]:mx-auto [&_img]:block [&_img]:pb-2.5
		[&_ol]:flex [&_ol]:flex-col [&_ol]:py-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:leading-6 [&_ol]:tracking-tight
		[&_ul]:flex [&_ul]:flex-col [&_ul]:py-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:leading-6 [&_ul]:tracking-tight
		[&_a]:underline [&_a]:underline-offset-4
		[&_table]:mb-8 [&_table]:w-2/3
		[&_strong]:font-semibold [&_strong]:leading-[24px]
		[&_em]:text-base [&_em]:font-regular [&_em]:leading-[24px]
		[&_blockquote]:border-l-4 [&_blockquote]:border-gray-500 [&_blockquote]:pl-4
		[&_blockquote]:mb-4 [&_blockquote]:italic
		[&_em:has(img)]:text-xs [&_em:has(img)]:text-gray-400 [&_em:has(img)]:flex [&_em:has(img)]:flex-col
		[&_em:has(img)]:items-center [&_em:has(img)]:dark:text-gray-200
		[&_pre]:overflow-x-auto [&_code]:overflow-x-auto
        [&_p:has(img):has(em):has(a)]:text-gray-400 [&_p:has(img):has(em):has(a)]:text-center [&_p:has(img):has(em):has(a)]:text-center"
	>
		<div class="lg:flex flex-col lg:flex-row pb-[80px] max-w-[1344px] justify-center gap-2.5">
			<!-- Table of Contents Column -->
			<div class="hidden max-w-[240px] lg:block [&_ul]:pl-0">
				<nav>
					<div class="flex flex-col gap-1.5 items-start list-none text-sm space-y-2">
						{@html tableOfContents}
					</div>
				</nav>
			</div>

			<!-- Content Column -->
			<div class="flex-1 max-w-[740px] mx-auto">
				<div class="flex flex-col">
					{@html data.article.content}
				</div>
			</div>

			<div class="hidden lg:block"></div>
		</div>
	</div>

	<NewsletterBanner />
	<Footer />
</main>
