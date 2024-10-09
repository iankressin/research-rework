import { ArticleArraySchema, type Article } from '$lib/types/article';

export const fetchArticles = async (): Promise<Article[]> => {
	const res = await fetch('http://localhost:8000/api/articles');
	const body = await res.json();
	return ArticleArraySchema.parse(body);
};
