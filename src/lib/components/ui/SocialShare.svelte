<script lang="ts">
	export let title: string = '';
	export let url: string;

	const facebookShare = () =>
		`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

	const twitterShare = () =>
		`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}${title ? `&text=${encodeURIComponent(title)}` : ''}`;

	const linkedinShare = () =>
		`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
</script>

{#if url}
	<span class="flex gap-1.5">
		<a
			href={twitterShare()}
			target="_blank"
			rel="noopener noreferrer"
			class="underline underline-offset-4"
			aria-label="Share on Twitter (opens in a new tab)"
		>
			X,
		</a>

		<a
			href={facebookShare()}
			target="_blank"
			rel="noopener noreferrer"
			class="underline underline-offset-4"
			aria-label="Share on Facebook (opens in a new tab)"
		>
			Facebook
		</a>
		or
		<a
			href={linkedinShare()}
			target="_blank"
			rel="noopener noreferrer"
			class="underline underline-offset-4"
			aria-label="Share on LinkedIn (opens in a new tab)"
		>
			LinkedIn
		</a>
	</span>
{/if}
