<script>
    export let field

    import {
        emailRegex,
        abslinkRegex
    } from '$lib/utils/regex'
    import {
        Link
    } from 'carbon-components-svelte'
</script>

{#if field.value}
    <p class="heading">{field.label}</p>
    {#if abslinkRegex.test(field.value)}
        <Link href={field.value}>{field.value}</Link>
    {:else if emailRegex.test(field.value)}
        <Link type='email' href={field.value}>{field.value}</Link>
    {:else}
        <p>{field.value}</p>
    {/if}
{/if}

<style>
    .heading {
        font-weight: 600;
    }
</style>