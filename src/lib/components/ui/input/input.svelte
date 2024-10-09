<script lang="ts">
	import { cn } from '$lib/utils/ui-components';
	import type { Snippet } from 'svelte';

	const Variant = {
		regular: 'px-3 py-2 h-12',
		small: 'px-4 py-1 h-10',
		custom: ''
	} as const;

	let {
		class: className,
		id,
		name,
		type,
		value = $bindable(''),
		required = false,
		placeholder,
		min,
		disabled = false,
		variant = 'regular',
		icon,
		button
	}: {
		value?: string;
		class?: string;
		id?: string;
		name?: string;
		type?: string;
		required?: boolean;
		placeholder?: string;
		min?: string;
		disabled?: boolean;
		variant?: keyof typeof Variant;
		icon?: Snippet;
		button?: Snippet;
	} = $props();
</script>

{#if icon || button}
	<div
		class={cn(
			`flex flex-grow items-center gap-2 border border-black bg-white rounded-full focus:outline-none ${Variant[variant]}`,
			className,
			button && 'pr-1'
		)}
	>
		{#if icon}
			{@render icon()}
		{/if}
		<input
			type={type || 'text'}
			{id}
			{name}
			bind:value
			{required}
			{placeholder}
			{min}
			{disabled}
			class="flex-grow focus:outline-none placeholder-gray-400 disabled:text-gray disabled:bg-white"
		/>
		{#if button}
			{@render button()}
		{/if}
	</div>
{:else}
	<input
		type={type || 'text'}
		{id}
		{name}
		bind:value
		{required}
		{placeholder}
		{min}
		{disabled}
		class={cn(
			`${disabled ? 'text-gray-400 bg-white' : 'text-gray-700'} flex-grow ${Variant[variant]} border border-gray-300 rounded-lg`,
			className
		)}
	/>
{/if}
