<script>
	import { ArrowUp } from 'lucide-svelte';
</script>

<button
    on:click={() => window.scrollTo(0, 0)}
>
    <ArrowUp size="16px" />
</button>
