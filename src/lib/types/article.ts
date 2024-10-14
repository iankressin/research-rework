import { z } from 'zod';

// Define Zod schemas
const CategorySchema = z.object({
	name: z.string()
});

export const ArticleMetadaSchema = z.object({
	id: z.string(),
	title: z.string(),
	authors: z
		.array(
			z.object({
				username: z.string(),
				id: z.string(),
				full_name: z.string(),
				twitter_username: z.string().nullable()
			})
		)
		.optional(),
	content: z.string().optional(),
	views: z.number().optional(),
	summary: z.string(),
	categories: z.array(CategorySchema),
	thumb: z.string(),
	slug: z.string()
})

export const ArticleMetadataArraySchema = z.array(ArticleMetadaSchema);
export type ArticleMetadata = z.infer<typeof ArticleMetadaSchema>;

export const ArticleSchema = ArticleMetadaSchema.extend({
	content: z.string(),
	scheduled_publish_time: z.string(),
	authors: z.array(
		z
			.object({
				username: z.string(),
				full_name: z.string(),
				twitter_username: z.string().nullable()
			})
			.transform((author) => ({
				username: author.username,
				fullName: author.full_name,
				twitterUsername: author.twitter_username
			}))
	)
}).transform((article) => ({
	...article,
	scheduledPublishTime: article.scheduled_publish_time
}));
export type Article = z.infer<typeof ArticleSchema>;
