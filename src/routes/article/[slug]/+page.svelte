<!-- TODO: Add links to share buttons -->
<script lang="ts">
	import type { Article } from '$lib/types/article';
	import { ArrowLeft } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import Prism from 'prismjs';
	import 'prismjs/themes/prism.css';
	import 'prismjs/components/prism-javascript';
	import TableOfContents from '$lib/components/ui/TableOfContents.svelte';

	// Supported languages
	// Import language support
	import 'prismjs/components/prism-python';
	import 'prismjs/components/prism-json';
	import 'prismjs/components/prism-rust';
	import 'prismjs/components/prism-javascript';
	import 'prismjs/components/prism-typescript';
	import 'prismjs/components/prism-latex';
	import 'prismjs/components/prism-sql';
	import 'prismjs/components/prism-c';
	import 'prismjs/components/prism-markup';
	import 'prismjs/components/prism-solidity';

	let currentURL = '';

	async function loadPrismLanguages(languages: string[]) {
		const promises = languages.map((lang) => import(`prismjs/components/prism-${lang}`));
		await Promise.all(promises);
	}

	const { data }: { data: PageData } = $props();

	onMount(async () => {
		currentURL = window.location.href;
		const languageMatches = data.article.content.match(/language-([a-zA-Z-]+)/g) || [];
		const requiredLanguages = [
			...new Set(languageMatches.map((match) => match.replace('language-', '')))
		];

		await loadPrismLanguages(requiredLanguages);

		Prism.highlightAll();
	});
</script>

<div class="flex flex-col gap-14">
	{@render header(data.article)}
	<img src={data.article.thumb} alt={data.article.title} class="w-full h-full object-cover" />
	{@render body(data.article)}
</div>

{#snippet header(article: Article)}
	<header
		class="flex justify-between flex-col p-10 border-b max-md:px-5 bg-gradient-to-b from-gray-100 to-transparent dark:from-secondary dark:to-transparent"
	>
		<a
			href="/"
			aria-label="Back to Home"
			class="flex gap-2 justify-center items-center px-2 w-10 h-10 border border-solid rounded-full mb-32 md:mb-44"
		>
			<ArrowLeft class="w-6 h-6" />
		</a>
		<div class="flex flex-col max-w-full tracking-tight w-[888px]">
			<section class="flex flex-col pb-8 w-full">
				<h1
					class="font-soehne text-6xl font-medium leading-[70px] max-md:max-w-full max-md:text-4xl max-md:leading-[52px] break-words"
				>
					{article.title}
				</h1>
				<p class="mt-4 text-2xl leading-9 max-md:max-w-full">
					{article.summary}
				</p>
			</section>
			<div class="flex flex-col self-start pb-6 mt-4 max-md:max-w-full">
				<div class="flex gap-1.5 items-start self-start">
					<span>By</span>
					<div class="flex items-center gap-1">
						{#each article.authors as author, index}
							<a
								href={author.twitterUsername
									? `https://twitter.com/${author.twitterUsername}`
									: null}
								target="_blank"
								rel="noopener noreferrer"
								class="gap-1 self-stretch my-auto border-b"
							>
								{author.fullName}
							</a>
							{#if index < article.authors.length - 2}
								<span class="self-stretch my-auto">,</span>
							{:else if index < article.authors.length - 1}
								<span class="self-stretch my-auto">and</span>
							{/if}
						{/each}
					</div>
				</div>
				<div class="flex flex-wrap gap-1.5 items-start mt-1 max-md:max-w-full">
					<span>Special thanks to</span>
					<span>.</span>
				</div>
			</div>
			<div
				class="flex flex-wrap gap-10 justify-between items-start mt-6 w-full tracking-tight max-md:max-w-full"
			>
				<time datetime={article.scheduledPublishTime} class="text-gray-500">
					Published on {article.scheduledPublishTime}
				</time>
				<nav class="flex gap-1.5 items-center min-w-[240px]">
					<span class="self-stretch my-auto">Share on</span>
					<a href="#" class="gap-1 self-stretch my-auto border-b border-neutral-950">X</a>
					<span class="self-stretch my-auto">,</span>
					<a href="#" class="gap-1 self-stretch my-auto border-b">Facebook</a>
					<span class="self-stretch my-auto">or</span>
					<a href="#" class="gap-1 self-stretch my-auto border-b">Linkedin</a>
				</nav>
			</div>
		</div>
	</header>

	<style>
		:global(builder-component) {
			max-width: none !important;
		}
	</style>
{/snippet}

{#snippet body(article: Article)}
	<div class="flex flex-col md:flex-row gap-10">
		<div class="w-full md:w-1/5">
			<TableOfContents tableOfContents={article.tableOfContents} />
		</div>
		<div
			class="pb-20 text-primary w-full md:w-3/5 max-w-screen-md leading-8 flex flex-col
			[&>h1]:text-5xl [&>h1]:font-medium [&>h1]:mb-6 [&>h1]:mt-16 [&_h1]:leading-58 [&_h1]:tracking-tighter
            [&>h2]:text-3xl [&>h2]:font-medium [&>h2]:mt-8 [&>h2]:mb-4 [&_h2]:leading-9 [&_h2]:tracking-tight
            [&>h3]:text-2xl [&>h3]:font-medium [&>h3]:mt-6 [&>h3]:mb-4 [&_h3]:leading-7 [&_h3]:tracking-tight
            [&>h4]:text-xl [&>h4]:font-medium [&>h4]:mb-3
			[&>p]:text-base md:[&>p]:text-lg [&_p]:leading-7 [&_p]:tracking-normal [&_p]:mb-4
			[&_p:has(img)]:mb-2.5 [&_p:has(img)]:text-center [&_p:has(img):has(em)]:text-center [&_p:has(img)]:text-xs [&_p:has(img)]:text-gray-400
			[&_a]:underline [&_a]:underline-offset-4
			[&_strong]:font-semibold [&_strong]:leading-6 [&_strong]:tracking-normal [&_strong]:text-base
			[&_table]:mb-6 md:[&_table]:mb-8 [&_table]:w-full md:[&_table]:w-2/3
			[&_em]:leading-6 [&_em]:italic
			[&_ol]:flex [&_ol]:flex-col [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:leading-7 [&_ol]:tracking-normal
			[&_ul]:flex [&_ul]:flex-col [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:leading-7 [&_ul]:tracking-normal [&_ul]:text-base
            [&>li]:leading-8
			[&>a]:underline
			[&_img]:mx-auto [&_img]:block [&_img]:pb-2.5
			[&_blockquote]:border-l-4 [&_blockquote]:border-gray-500 [&_blockquote]:pl-4
			[&_blockquote]:mb-4 [&_blockquote]:italic
			[&_pre]:overflow-x-auto [&_code]:overflow-x-auto [&_code:not(pre_>_code)]:text-[#0312BF]
            "
		>
			{@html article.content}
		</div>
	</div>
{/snippet}
