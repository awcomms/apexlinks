<script>
    export let field

    import {
        Button
    } from 'carbon-components-svelte'
    import Input from '$lib/components/Input/Input.svelte'  
    import Close16 from 'carbon-icons-svelte/lib/Close16'
    import Checkmark16 from 'carbon-icons-svelte/lib/Checkmark16'

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
    labelText='Label'
    bind:value={field.label}
    bind:invalid={field.invalid}
    invalidText={field.invalidText}
/>

{#if !field.new}
    <Button
        iconDescription='Cancel'
        hasIconOnly
        kind='ghost'
        size='field'
        icon={Close16}
        on:click={()=>{field=field.dirty}}
    />
{/if}

<Button
    iconDescription='Accept'
    hasIconOnly
    kind='ghost'
    size='field'
    icon={Checkmark16}
    on:click={()=>{if(field.new)field.new=false; field.edit=false}}
/>
