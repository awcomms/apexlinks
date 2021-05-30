<script>
    export let prompt = 'Add Custom Field'
    export let pin = false
    export let fields = []

    import {
        Button
    } from 'carbon-components-svelte'
    import Field from './Field.svelte'

    const cancel=(field)=>{
        field = field.dirty
    }

    const startEdit=(field)=>{
        field.edit = true
        field.dirty = field
    }

    const edit=(field)=>{
        if (fields.find(f => f.label == field.label && f !== field)) {
            console.log('find')
            field.invalid = true
            field.invalidText = 'A field with that label already exists'
            return
        }
        console.log('s')
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

<div>
    <Button on:click={add}>{prompt}</Button>
</div>