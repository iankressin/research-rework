import { fetchArticleBySlug } from '$lib/services/article.service';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }: { params: { slug: string } }) => {
  try {
    const article = await fetchArticleBySlug(params.slug);
    if (!article) {
      throw error(404, 'Article not found');
    }
    return { article }; // Pass article to the page
  } catch (e) {
    if (e instanceof Error) {
      throw error(500, `Error fetching article: ${e.message}`);
    }
    throw error(500, 'Unknown error occurred while fetching the article');
  }
};
