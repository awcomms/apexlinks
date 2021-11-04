<script>
    export let open = false
    export let fields = []

    export let extraFields = []

    import {
        Modal
    } from 'carbon-components-svelte'
    import Fields from '$lib/components/Fields/Fields.svelte'
    import Field from '$lib/components/Fields/Field.svelte'
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()
</script>

<Modal
    modalHeading='Filters'
    primaryButtonText='Search'
    secondaryButtonText='Cancel'
    on:click:button--secondary  ={()=>{open=false}}
    on:submit={()=>{open=false; dispatch('search')}}
    on:close={()=>{dispatch('search')}}
    shouldSubmitOnEnter={false}
    hasScrollingContent
    hasForm
    bind:open
>

    <!-- {#each extraFields as extraField}
        <Field
            autoAccept
            bind:field={extraField}
            deletable={false}
            acceptKey='Enter'
        />
    {/each} -->

    <Fields
        on:enter={()=>{open=false; dispatch('search')}}
        prompt='Add Filter'
        bind:fields
    >
        <slot slot='customFields' name='customFields' />
    </Fields>
</Modal>