import { z } from 'zod';

// Define Zod schemas
const CategorySchema = z.object({
	name: z.string()
});

export const ArticleSchema = z.object({
	id: z.string(),
	title: z.string(),
	authors: z.array(z.object({ username: z.string() })).optional(),
	content: z.string().optional(),
	views: z.string().optional(),
	summary: z.string(),
	categories: z.array(CategorySchema),
	thumb: z.string(),
	slug: z.string()
});

export const ArticleArraySchema = z.array(ArticleSchema);
export type Article = z.infer<typeof ArticleSchema>;
