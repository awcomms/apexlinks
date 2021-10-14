<script>
    $: console.log(field.label)

    export let combobox
    export let items
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

    const dispatch = createEventDispatcher()

    const fieldKeydown=(e)=>{
        dispatch(`kd-${e.keyCode}`, field.id)
    }

    onMount(()=>{
        // field.offsetTop = field.containerRef.offsetTop
    })
</script>

<svelte:component
    bind:combobox
    bind:items
    this={current}
    on:cancel
    on:edit
    on:del
    on:label-kd-13={fieldKeydown}
    on:helperClick
    bind:field
    bind:ref
/>

<Button
    iconDescription='Delete'
    hasIconOnly
    kind='ghost'
    size='field'
    icon={Delete16}
    on:click={()=>{dispatch('del')}}
/>

{#if pin}
    <Pin
        bind:pinned={field.pinned}
        on:click={()=>{field.pinned = !field.pinned}}
    />
{/if}