<script>
    export let ref
    export let field = {}

    import {
        NumberInput,
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
</script>

{#if field.type === 'text'}
    <Input
    bind:ref
    labelText={field.label}
    bind:value={field.value}
    bind:invalid={field.invalid}
    invalidText={field.invalidText}
    />
{:else if field.type === 'number'}
    <NumberInput 
        placeholder={field.label}
        bind:value={field.number}
    />
{:else if field.type === 'range'}
    <NumberInput label='Minimum value' bind:value={field.min} />
    <NumberInput label='Maximum value' bind:value={field.max} />
{:else}
    <Input
        bind:ref
        labelText={field.label}
        bind:value={field.value}
        bind:invalid={field.invalid}
        invalidText={field.invalidText}
    />
{/if}

<Button
    iconDescription='Edit'
    hasIconOnly
    kind='ghost'
    size='field'
    icon={Edit16}
    on:click={()=>{field.dirty=field; field.edit=true}}
/>