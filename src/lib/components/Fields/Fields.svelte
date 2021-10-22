<script>
  export let prompt = "Add new field";
  export let pin = false;
  export let fields = [];
  export let combobox;
  export let items;

  import {
    Button
  } from 'carbon-components-svelte'
  import ArrowUp16 from 'carbon-icons-svelte/lib/ArrowUp16'
  import Field from "./Field.svelte";

  import {
    storeFields
  } from './store'
  import {
    onMount
  } from 'svelte'

  onMount(()=>{
    currentFieldRef.focus()
  })

  let currentFieldRef
  let currentField = {
    value: '',
    label: '',
    edit: true,
    new: true
  }

  let id = Math.max(fields.map(f => f.id))

  $storeFields = fields

  const getDuplicateLabel = (field) => {
    let duplicate
    if (typeof field.id === 'number') {
      duplicate = $storeFields.find(f => f.id !== field.id && f.label === field.label)
    } else {
      duplicate = $storeFields.find(f => f.label === field.label)
    }
    return duplicate
  }

  const resolveDuplicateLabel = (field) => {
    let duplicate = getDuplicateLabel(field)
    if (duplicate) {
      duplicate.ref.focus()
      return true
    }
  }
  
  const currentLabelAccept = () => {
    if (resolveDuplicateLabel(currentField)) {
        return
      }
    currentField.edit = false
  }

  const currentValueAccept = () => {
    add()
    currentField.edit = true
    currentField.label = ''
    currentField.value = ''
    currentFieldRef.focus()
  }

  const fieldlabelAccept = (field) => {
      if (resolveDuplicateLabel(field)) {
        return
      }
      if (field.new) {
        field.new = false
      }
      field.edit = false
  }

  const fieldvalueAccept = (field) => {
      field.edit = !field.edit
  }

  const del = (field) => {
    $storeFields = $storeFields.filter(f => f.id !== field.id);
  };

  const add = () => {
    let field = {
      id,
      hidden: false,
      type: "text",
      label: currentField.label,
      value: currentField.value,
      invalid: false,
      error: false,
    };
    $storeFields = [...$storeFields, field];
    id++
  };
</script>

<Field
  bind:ref={currentFieldRef}
  on:labelAccept={currentLabelAccept}
  on:valueAccept={currentValueAccept}
  bind:field={currentField}
  deleteButton={false}
  label={prompt}
  acceptKey='Enter'
/>

{#each $storeFields as field}
    <Field
      {combobox}
      {items}
      on:labelAccept={()=>{fieldlabelAccept(field)}}
      on:valueAccept={()=>{fieldvalueAccept(field)}}
      on:del={()=>{del(field)}}
      bind:ref={field.ref}
      bind:field
      {pin}
    >
      <svelte:fragment slot='cba'>
        <Button
          iconDescription="Go to 'Add new field'"
          hasIconOnly
          kind='ghost'
          size='field'
          icon={ArrowUp16}
          on:click={()=>{currentFieldRef.focus()}}
        />
      </svelte:fragment>
    </Field>
{/each}