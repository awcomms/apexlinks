<script>
    $: console.log(field.label)

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
    import { createEventDispatcher, onMount } from 'svelte'

    let current

    $: if (field.edit) {
        current = Edit
    } else {
        current = Input
    }

    const valueKeydown = (e) => {
        console.log('ck e', e)
        if (e.detail.shiftKey) {
            if (e.detail.code === 'Enter') {
                console.log('ck Enter')
                field.edit = !field.edit
            }
        }
    }

    const labelKeydown = (e) => {
        console.log('ck e', e)
        if (e.detail.code === 'Enter') {
            console.log('ck Enter')
            field.edit = !field.edit
        }
    }

    const dispatch = createEventDispatcher()

    const fieldKeydown=(e)=>{
        dispatch(`kd-${e.keyCode}`, field.id)
    }

    onMount(()=>{
        // field.offsetTop = field.containerRef.offsetTop
    })
</script>

<svelte:component
    {label}
    bind:combobox
    bind:items
    this={current}
    on:labelKeydown
    on:labelKeydown={labelKeydown}
    on:valueKeydown
    on:valueKeydown={valueKeydown}
    on:cancel
    on:edit
    on:del
    on:label-kd-13={fieldKeydown}
    on:helperClick
    bind:field
    bind:ref
/>

{#if deleteButton}
    <Button
        iconDescription='Delete'
        hasIconOnly
        kind='ghost'
        size='field'
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

<slot />