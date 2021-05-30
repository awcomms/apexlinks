<script>
    export let value = ''
    export let password = ''

    import {
        PasswordInput,
        TextInput
    } from 'carbon-components-svelte'
</script>

{#if password}
    <PasswordInput bind:value {...$$restProps} />
{:else}
    <TextInput bind:value {...$$restProps} />
{/if}