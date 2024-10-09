import { ArticleArraySchema, type Article } from '$lib/types/article';
import { cachedFetch } from '$lib/utils/cached-fetch';

let articles: Article[] = $state([]);

export const fetchArticles = async (): Promise<Article[]> => {
	const res = await fetch('https://cms.2077.xyz/api/articles');
	const body = await res.json();
	return ArticleArraySchema.parse(body);
};
