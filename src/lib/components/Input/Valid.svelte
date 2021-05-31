<script>
    export let ref = null
    export let value = ''
    export let password = ''

    import {
        PasswordInput,
        TextInput
    } from 'carbon-components-svelte'
</script>

{#if password}
    <PasswordInput
        bind:ref
        bind:value
        {...$$restProps}
    />
{:else}
    <TextInput
        bind:ref
        bind:value
        {...$$restProps} 
    />
{/if}