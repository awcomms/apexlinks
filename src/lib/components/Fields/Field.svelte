<script>
    export let editable = true
    export let autoAccept = true
    export let acceptKey = 'Enter'
    export let label
    export let combobox
    export let items
    export let valueItems
    export let deletable = true
    export let field = {}
    export let ref

    import {
        Button
    } from 'carbon-components-svelte'
    import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte'
    import Input from '$lib/components/Fields/Input.svelte'
    import Edit from '$lib/components/Fields/Edit.svelte'
    import { createEventDispatcher, onMount } from 'svelte'

    onMount(()=>{
        ref = field.ref
    })

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
    bind:label
    bind:editable
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
        icon={TrashCan}
        on:click={()=>{dispatch('del')}}
    />
{/if}

<slot name='cba' />