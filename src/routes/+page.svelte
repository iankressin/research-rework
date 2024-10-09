<script lang="ts">
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const articles = $derived(data.articles);
</script>

<h1 class="font-menlo">2077 Research</h1>
