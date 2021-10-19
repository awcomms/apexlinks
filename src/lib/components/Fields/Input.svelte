<script>
    export let ref = null
    export let field = {}

    import {
        NumberInput,
        Button
    } from 'carbon-components-svelte'
    import Input from '$lib/components/Input/Input.svelte'    
    import Edit16 from 'carbon-icons-svelte/lib/Edit16'

    import {
        createEventDispatcher,
        onMount
    } from 'svelte'

  const dispatch = createEventDispatcher()
</script>

<Input
    bind:ref
    on:keydown
    labelText={field.label}
    bind:value={field.value}
    bind:invalid={field.invalid}
    on:keydown={(e)=>{dispatch('valueKeydown', e)}}
    invalidText={field.invalidText}
/>

<Button
    iconDescription='Edit'
    hasIconOnly
    kind='ghost'
    size='field'
    icon={Edit16}
    on:click={()=>{field.dirty=field; field.edit=true}}
/>