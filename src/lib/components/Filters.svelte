<script>
    export let open
    export let fields

    import {
        Modal
    } from 'carbon-components-svelte'
    import Fields from '$lib/components/Fields/Fields.svelte'
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()
</script>

<Modal
    modalHeading='Filters'
    primaryButtonText='Search'
    secondaryButtonText='Cancel'
    preventCloseOnClickOutside
    on:click:button--secondary  ={()=>{open=false}}
    on:submit={()=>{open=false; dispatch('search')}}
    hasScrollingContent
    hasForm
    bind:open
>
    <Fields
        prompt='Add Filter'
        bind:fields 
    />
</Modal>