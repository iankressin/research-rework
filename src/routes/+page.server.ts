import { fetchArticles } from '$lib/services/article.service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		articles: await fetchArticles()
	};
};
