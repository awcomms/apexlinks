<script>
    export let pinned

    import Unpinned from '$lib/components/Pin/Unpinned.svelte'
    import Pinned from '$lib/components/Pin/Pinned.svelte'

    let current = Unpinned

    $: if (pinned){
        current = Pinned
    } else {
        current = Unpinned
    }
</script>

<svelte:component
    on:click
    this={current}
    {...$$restProps}
/>