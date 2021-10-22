<script>
    export let acceptKey = 'Enter'
    export let label
    export let combobox
    export let items
    export let deleteButton = true
    export let pin = false
    export let field = {}
    export let ref = null

    import {
        Button
    } from 'carbon-components-svelte'
    import Delete16 from 'carbon-icons-svelte/lib/Delete16'
    import Input from '$lib/components/Fields/Input.svelte'
    import Edit from '$lib/components/Fields/Edit.svelte'
    import Pin from '$lib/components/Pin/Pin.svelte'
    import { createEventDispatcher } from 'svelte'

    let current

    $: if (field.edit) {
        current = Edit
    } else {
        current = Input
    }

    const dispatch = createEventDispatcher()
</script>

<svelte:component
    bind:acceptKey
    {label}
    bind:combobox
    bind:items
    this={current}
    on:labelAccept
    on:valueAccept
    on:cancel
    on:edit
    on:del
    on:helperClick
    bind:field
    bind:ref
/>

{#if deleteButton}
    <Button
        iconDescription='Delete'
        hasIconOnly
        kind='ghost'
        size='small'
        icon={Delete16}
        on:click={()=>{dispatch('del')}}
    />
{/if}

{#if pin}
    <Pin
        bind:pinned={field.pinned}
        on:click={()=>{field.pinned = !field.pinned}}
    />
{/if}

<slot name='cba' />