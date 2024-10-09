import { fetchArticles } from '$lib/stores/article.svelte';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		articles: await fetchArticles()
	};
};
