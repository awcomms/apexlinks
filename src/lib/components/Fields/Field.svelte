<svelte:window on:keydown={keydown} />

<script>
    export let combobox
    export let items
    export let pin = false
    export let field = {}
    export let ref

    import {
        Button
    } from 'carbon-components-svelte'
    import Delete16 from 'carbon-icons-svelte/lib/Delete16'
    import Input from '$lib/components/Fields/Input.svelte'
    import Edit from '$lib/components/Fields/Edit.svelte'
    import Pin from '$lib/components/Pin/Pin.svelte'
    import { createEventDispatcher, onMount } from 'svelte'

    $: if (field.edit) {
        current = Edit
    } else if (!field.edit) {
        current = Input
    }

    const dispatch = createEventDispatcher()

    let current

    const keydown=(e)=>{
        switch(e.keyCode){
            case 13:
                if (field.focused){
                    if(field.edit){
                        field.edit = false
                    } else if(!field.edit) {
                        dispatch('enter')
                    }
                }
        }
    }

    onMount(()=>{
        // field.offsetTop = field.containerRef.offsetTop
        // console.log('foffsetTop: ', field.offsetTop)
    })
</script>

<svelte:component
    bind:combobox
    bind:items
    this={current}
    on:cancel
    on:edit
    on:del
    on:accept
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