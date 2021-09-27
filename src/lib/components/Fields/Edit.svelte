<script>
    export let field = {}

    import {
        SelectItem,
        Select,
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

    const types = [
        {
            value: 'text',
            text: 'Text'
        },
        {
            value: 'number',
            text: 'Number'
        },
        // {
        //     value: 'color',
        //     text: 'Color'
        // },
        {
            value: 'range',
            text: 'Range'
        }
    ]

    let ref
</script>

<Input
    bind:ref
    labelText='Label'
    bind:value={field.label}
    bind:invalid={field.invalid}
    invalidText={field.invalidText}
/>

<Select labelText='Filter type' bind:selected={field.type}>
    {#each types as type}
        <SelectItem value={type.value} text={type.text} />
    {/each}
</Select>

{#if !field.new}
    <Button
        iconDescription='Cancel'
        hasIconOnly
        kind='ghost'
        size='field'
        icon={Close16}
        on:click={()=>{field.edit=false; field=field.dirty}}
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
