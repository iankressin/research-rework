<!-- TODO: Add links to share buttons -->
<script lang="ts">
	import type { Article } from '$lib/types/article';
	import { ArrowLeft } from 'lucide-svelte';
	import type { PageData } from './$types';

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
					<a href="#" class="gap-1 self-stretch my-auto whitespace-nowrap border-b">Facebook</a>
					<span class="self-stretch my-auto">or</span>
					<a href="#" class="gap-1 self-stretch my-auto whitespace-nowrap border-b">Linkedin</a>
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
	<div class="flex">
		<div class="w-1/5">
			<div class="sticky top-0">
				<ul>
					<li>Overview</li>
					<li>Fundamentals</li>
					<li>Architecture</li>
					<li>Technology</li>
					<li>Business</li>
					<li>Conclusion</li>
				</ul>
			</div>
		</div>
		<div
			class="w-3/5 max-w-screen-md leading-8 flex flex-col [&>h1]:text-5xl [&>h1]:font-medium [&>h1]:mb-6 [&>h1]:mt-16 text-secondary
            [&>h2]:text-3xl [&>h2]:font-medium [&>h2]:mt-8 [&>h2]:mb-4 [&>p]:text-lg [&>p]:mb-6
            [&>h3]:text-2xl [&>h3]:font-medium [&>h3]:mt-6 [&>h3]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2
            [&>ul]:text-lg [&>ul]:mb-6
            [&>li]:leading-8 [&>a]:underline
            [&>h4]:text-xl [&>h4]:font-medium [&>h4]:mb-3
            "
		>
			{@html article.content}
		</div>
	</div>
{/snippet}
