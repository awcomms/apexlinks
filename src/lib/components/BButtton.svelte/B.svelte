<script>
    $: current = control ? first : second

    import {
        Button
    } from 'carbon-components-svelte'
    export let control

    export let first
    export let second
</script>

<svelte:component
    this={Button}
    iconDescription={current.text}
    bind:icon={current.icon}
    hasIconOnly
    kind='ghost'
    size='small'
    on:click
/>