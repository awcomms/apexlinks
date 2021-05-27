<script>
    export let pin = false
    export let fields

    import {
        Button
    } from 'carbon-components-svelte'
    import Field from './Field.svelte'

    const cancel=(field)=>{
        field = field.dirty
    }

    const startEdit=(field)=>{
        field.dirty = field
    }

    const edit=(field)=>{
        console.log(true)
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
        let field = {
            pinned: false,
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
    <Field on:startEdit={startEdit(field)} on:cancel={cancel(field)} on:del={del(field)} on:edit={edit(field)} {pin} bind:field />
{/each}

<Button on:click={add}>Add Custom Field</Button>