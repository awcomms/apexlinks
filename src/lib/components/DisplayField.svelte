<script>
    export let field

    import {
        abslink
    } from '$lib/utils/abslink'
    import {
        Link
    } from 'carbon-components-svelte'
</script>

{#if field.value}
    <p class="heading">{field.label}</p>
    {#if abslink.test(field.value)}
        <Link href={field.value}>{field.value}</Link>
    {:else}
        <p>{field.value}</p>
    {/if}
{/if}

<style>
    .heading {
        font-weight: 600;
    }
</style>