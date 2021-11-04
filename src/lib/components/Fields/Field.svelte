<script>
    export let editable = true
    export let autoAccept = false
    export let acceptKey = 'Enter'
    export let label
    export let combobox
    export let items
    export let valueItems
    export let deletable = true
    export let field = {}
    export let ref = null

    import {
        Button
    } from 'carbon-components-svelte'
    import Delete16 from 'carbon-icons-svelte/lib/Delete16'
    import Input from '$lib/components/Fields/Input.svelte'
    import Edit from '$lib/components/Fields/Edit.svelte'
    import { createEventDispatcher } from 'svelte'

    let current

    $: if (field.edit && editable) {
        current = Edit
    } else {
        current = Input
    }

    const labelAccept = () => {
        if (autoAccept) {
            field.edit = false
        }
    }

    const valueAccept = () => {
        if (autoAccept) {
            field.edit = true
        }
    }

    const dispatch = createEventDispatcher()
</script>

<svelte:component
    bind:acceptKey
    {label}
    bind:combobox
    bind:items
    bind:valueItems
    this={current}
    on:labelAccept={labelAccept}
    on:labelAccept
    on:valueAccept={valueAccept}
    on:valueAccept
    on:cancel
    on:edit
    on:del
    on:helperClick
    bind:field
    bind:ref
/>

{#if deletable}
    <Button
        iconDescription='Delete'
        hasIconOnly
        kind='ghost'
        size='small'
        icon={Delete16}
        on:click={()=>{dispatch('del')}}
    />
{/if}

<slot name='cba' />