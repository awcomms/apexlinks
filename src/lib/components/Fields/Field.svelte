<script>
    export let pin
    export let field

    import Input from '$lib/components/Fields/EditState/Input.svelte'
    import Edit from '$lib/components/Fields/EditState/Edit.svelte'
    import Pin from '$lib/components/Pin/Pin.svelte'

    let current

    $: if (field.edit) {
        current = Edit
    } else {
        current = Input
    }
</script>

<svelte:component this={current} on:startEdit on:cancel on:edit on:del bind:field />
{#if pin}
    <Pin
        bind:pinned={field.pinned}
        on:click={()=>{field.pinned = !field.pinned}}
    />
{/if}