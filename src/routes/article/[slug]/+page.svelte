<!-- TODO: Add links to share buttons -->
<script lang="ts">
	import type { Article } from '$lib/types/article';
	import { ArrowLeft } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import TableOfContents from '$lib/components/ui/TableOfContents.svelte';

	const { data }: { data: PageData } = $props();
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
		<div
			class="flex gap-2 justify-center items-center px-2 w-10 h-10 border border-solid rounded-full mb-32 md:mb-44"
		>
			<ArrowLeft class="w-6 h-6" />
		</div>
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
			class="w-full md:w-3/5 max-w-screen-md leading-8 flex flex-col [&>h1]:text-5xl [&>h1]:font-medium [&>h1]:mb-6 [&>h1]:mt-16 text-primary
            [&>h2]:text-3xl [&>h2]:font-medium [&>h2]:mt-8 [&>h2]:mb-4 [&>p]:text-lg [&>p]:mb-6
            [&>h3]:text-2xl [&>h3]:font-medium [&>h3]:mt-6 [&>h3]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2
            [&>ul]:text-lg [&>ul]:mb-6
            [&>li]:leading-8 [&>a]:underline
            [&>h4]:text-xl [&>h4]:font-medium [&>h4]:mb-3
			font-inter text-base leading-[24px] prose max-w-full
			[&_h1]:text-5xl [&_h1]:font-medium [&_h1]:leading-10 [&_h1]:tracking-tightest [&_h1]:pt-10 [&_h1]:pb-5
			[&_h2]:text-3xl [&_h2]:font-medium [&_h2]:leading-9 [&_h2]:tracking-tighter [&_h2]:py-5
			[&_h3]:text-2xl [&_h3]:font-medium [&_h3]:leading-7 [&_h3]:tracking-tighter md:[&_h3]:text-3xl md:[&_h3]:py-4
			[&_h4]:text-xl [&_h4]:font-medium [&_h4]:py-3
			[&_p]:text-base [&_p]:font-regular [&_p]:leading-6 [&_p]:tracking-tight [&_p]:pb-4
			[&_img]:mx-auto [&_img]:block [&_img]:pb-2.5
			[&_ol]:flex [&_ol]:flex-col [&_ol]:py-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:leading-6 [&_ol]:tracking-tight
			[&_ul]:flex [&_ul]:flex-col [&_ul]:py-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:leading-6 [&_ul]:tracking-tight
			[&_a]:underline [&_a]:underline-offset-4
			[&_table]:mb-6 md:[&_table]:mb-8 [&_table]:w-full md:[&_table]:w-2/3
			[&_strong]:font-semibold [&_strong]:leading-[24px]
			[&_em]:font-regular [&_em]:leading-[24px]
			[&_blockquote]:border-l-4 [&_blockquote]:border-gray-500 [&_blockquote]:pl-4
			[&_blockquote]:mb-4 [&_blockquote]:italic
			[&_em:has(img)]:text-xs [&_em:has(img)]:text-gray-400 [&_em:has(img)]:flex [&_em:has(img)]:flex-col
			[&_em:has(img)]:items-center [&_em:has(img)]:dark:text-gray-200
			[&_pre]:overflow-x-auto [&_code]:overflow-x-auto
        	[&_p:has(img):has(em):has(a)]:text-gray-400 [&_p:has(img):has(em):has(a)]:text-center
            "
		>
			{@html article.content}
		</div>
	</div>
{/snippet}
