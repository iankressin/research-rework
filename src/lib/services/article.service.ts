import { ArticleListResponseSchema, ArticleDetailResponseSchema, type ArticleListItem, type ArticleDetail } from '$lib/types/article';

export const fetchArticles = async (): Promise<ArticleListItem[]> => {
	const res = await fetch('https://cms.2077.xyz/api/articles');
	const body = await res.json();
	return ArticleListResponseSchema.parse(body);
};

export const fetchArticleBySlug = async (slug: string): Promise<ArticleDetail> => {
	try {
		const res = await fetch(`https://cms.2077.xyz/api/articles/${slug}`);

		if (!res.ok) {
			throw new Error(`Error fetching article: ${res.statusText}`);
		}

		const body = await res.json();
		const parsedResponse = ArticleDetailResponseSchema.parse(body);
		return parsedResponse.data;
	} catch (error) {
		console.error('Error in fetchArticleBySlug:', error);
		throw new Error('Failed to fetch the article. Please try again later.');
	}
};