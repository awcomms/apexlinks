<script>
    export let field

    import {
        Button
    } from 'carbon-components-svelte'
    import Input from '$lib/components/Input/Input.svelte'    
    import Edit16 from 'carbon-icons-svelte/lib/Edit16'

    import {
        onMount
    } from 'svelte'

    onMount(()=>{
        if(ref) ref.focus()
        field.focused = true
    })

    let ref
</script>

<Input
    bind:ref
    labelText={field.label}
    bind:value={field.value}
    bind:invalid={field.invalid}
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