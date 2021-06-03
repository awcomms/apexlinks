<script>
    export let prompt = 'Add Custom Field'
    export let pin = false
    export let fields = []

    import {
        Button,
        Column,
        Row,
    } from 'carbon-components-svelte'
    import Field from './Field.svelte'

    const cancel=(field)=>{
        field = field.dirty
    }

    const edit=(field)=>{
        if (fields.find(f => f.label == field.label && f !== field)) {
            field.invalid = true
            field.invalidText = 'A field with that label already exists'
            return
        }
        field.new = false
        field.edit = false
    }

    const del=(field)=>{
        fields = fields.filter(f => f.id != field.id)
    }

    const add=()=>{
        fields.forEach((field)=>{
            field.focused = false
        })
        let field = {
            pinned: false,
            type: 'text',
            ref: null,
            new: true,
            label: '',
            value: '',
            edit: true
        }
        fields = [...fields, field]
    }
</script>

{#each fields as field}
    <Field
        on:del={del(field)}
        bind:field
        on:enter
        {pin}
    />
{/each}

<div>
    <Button on:click={add}>{prompt}</Button>
</div>