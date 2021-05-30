<script>
    export let pin
    export let field

    import {
        Button
    } from 'carbon-components-svelte'
    import Delete16 from 'carbon-icons-svelte/lib/Delete16'
    import Input from '$lib/components/Fields/Input.svelte'
    import Edit from '$lib/components/Fields/Edit.svelte'
    import Pin from '$lib/components/Pin/Pin.svelte'
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    let current

    $: if (field.edit) {
        current = Edit
    } else if (!field.edit) {
        current = Input
    }
</script>

<svelte:component this={current} on:startEdit on:cancel on:edit on:del bind:field />

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