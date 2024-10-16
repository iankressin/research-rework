import { ArticleListResponseSchema, ArticleDetailResponseSchema, type ArticleListItem, type ArticleDetail } from '$lib/types/article';

export const fetchArticles = async (): Promise<ArticleListItem[]> => {
	try {
		const res = await fetch('https://cms.2077.xyz/api/articles');
		if (!res.ok) {
			throw new Error(`Error fetching articles: ${res.statusText}`);
		}
		const body = await res.json();
		return ArticleListResponseSchema.parse(body);
	} catch (error) {
		console.error('Error in fetchArticles:', error);
		throw new Error('Failed to fetch articles. Please try again later.');
	}
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