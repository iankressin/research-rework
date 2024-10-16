<script lang="ts">
	import type { TableOfContents } from '$lib/types/article';
	import { onMount } from 'svelte';

	const { tableOfContents }: { tableOfContents: TableOfContents } = $props();

	let currentHash = $state('');
	let selectedItemIndex = $state(0);

	onMount(() => {
		currentHash = window.location.hash.slice(1);
		window.addEventListener('hashchange', () => {
			currentHash = window.location.hash.slice(1);
		});

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const id = entry.target.id;
						if (id && id !== currentHash) {
							currentHash = id;
							history.replaceState(null, '', `#${id}`);
							updateSelectedIndex(id);
						}
					}
				});
			},
			{ threshold: 1 }
		);

		document.querySelectorAll('h1, h2').forEach((heading) => {
			if (heading.id) {
				observer.observe(heading);
			}
		});

		return () => {
			observer.disconnect();
		};
	});

	function updateSelectedIndex(id: string) {
		const index = tableOfContents.findIndex((item) => item.id === id);

		if (index === -1) {
			const parentIndex = tableOfContents.findIndex((item) =>
				item.children.some((child) => child.id === id)
			);
			if (parentIndex !== -1) {
				selectedItemIndex = parentIndex;
			}
		} else {
			selectedItemIndex = index;
		}
	}
</script>

<nav class="sticky top-0 pt-8 hidden md:block">
	<ul class="space-y-4 text-sm">
		{#each tableOfContents as item, index}
			<li>
				<a
					href={`#${item.id}`}
					class={`block transition-colors duration-200 ${selectedItemIndex === index ? 'font-medium' : 'font-normal'}`}
					style="opacity: {1 - Math.abs(selectedItemIndex - index) / tableOfContents.length}"
				>
					{item.title}
				</a>
				{#if item.children.length > 0 && (currentHash === item.id || item.children.some((child) => child.id === currentHash))}
					<ul class="mt-2 space-y-1">
						{#each item.children as subItem}
							<li class={`border-l-2 pl-3  ${currentHash === subItem.id ? '' : 'border-subtle'}`}>
								<a
									href={`#${subItem.id}`}
									class={currentHash === subItem.id ? 'font-medium' : 'font-normal'}
								>
									{subItem.title}
								</a>
							</li>
						{/each}
					</ul>
				{/if}
			</li>
		{/each}
	</ul>
</nav>
