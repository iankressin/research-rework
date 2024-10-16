<script lang="ts">
	export let title: string;
	export let url: string;

	const facebookShare = () =>
		`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
	const twitterShare = () =>
		`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
	const linkedinShare = () =>
		`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
</script>

{#if url}
	<span class="flex gap-1.5">
		<a href={twitterShare()} target="_blank" class="underline underline-offset-4">
			X,
		</a>
		<a href={facebookShare()} target="_blank" class="underline underline-offset-4">
			Facebook
		</a>
        or
		<a href={linkedinShare()} target="_blank" class="underline underline-offset-4">
			LinkedIn
		</a>
	</span>
{/if}
