import { ArticleListResponseSchema, ArticleDetailResponseSchema, type ArticleListItem, type ArticleDetail } from '$lib/types/article';

// Function to handle fetching data from the API
const fetchFromApi = async <T>(url: string): Promise<T> => {
	try {
		const res = await fetch(url);
		if (!res.ok) {
			throw new Error(`Error fetching data: ${res.statusText}`);
		}
		return await res.json();
	} catch (error) {
		console.error('Error in fetchFromApi:', error);
		throw new Error('Failed to fetch data. Please try again later.');
	}
};

export const fetchArticles = async (): Promise<ArticleListItem[]> => {
	const body = await fetchFromApi('https://cms.2077.xyz/api/articles');
	return ArticleListResponseSchema.parse(body);
};

export const fetchArticleBySlug = async (slug: string): Promise<ArticleDetail> => {
	const body = await fetchFromApi(`https://cms.2077.xyz/api/articles/${slug}`);
	const parsedResponse = ArticleDetailResponseSchema.parse(body);
	return parsedResponse.data;
};