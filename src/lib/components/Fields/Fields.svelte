<script>
  $: fields = $storeFields

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
  let container;
  
  currentLabelKeydown = (e, field) => {
    if (e.key == 'Enter') {
      if (field.edit) {
        field.edit = false
      } else {
        add()
      }
    }
  }

  currentValueKeydown = (e) => {
    if (e.key == 'Enter') {
      add()
    }
  }

  const fieldLabelKeydown = (e) => {
    if (e.key == 'Enter') {
      let field = $storeFields.find(f => f.id !== field.id && f.label === field.label)
      if (field) {
        field.ref.focus()
        return
      }
      if (field.new) {
        field.new = false
      }
      field.edit = false
    }
  }

  const fieldValueKeydown = (e, field) => {
    if (e.key == 'Enter') {
      field.edit = !field.edit
    }
  }

  const del = (field) => {
    $storeFields = $storeFields.filter(f => f !== field);
  };

  const add = () => {
    $storeFields.forEach((field) => {
      field.focused = false;
    });
    let field = {
      id,
      pinned: false,
      type: "text",
      label: currentField.label,
      value: currentField.value,
      invalid: false,
      error: false,
    };
    $storeFields = [...$storeFields, field];
    currentField.edit = true
    currentField.value = ''
    currentField.label = ''
    currentFieldRef.focus()
    id++
  };
</script>

<Field
  on:valueKeydown={(e)=>{if (e.detail.code === 'Enter') add()}}
  bind:ref={currentFieldRef}
  on:labelKeydown={(e)=>{currentLabelKeydown(e, currentField)}}
  on:labelKeydown={(e)=>{currentValueKeydown(e, currentField)}}
  bind:field={currentField}
  deleteButton={false}
  label={prompt}
/>

<div class="container" bind:this={container}>
  {#each $storeFields as field}
    <div bind:this={field.cotainerRef}>
      <Field
        {combobox}
        {items}
        on:labelKeydown={(e)=>{fieldLabelKeydown(e, field)}}
        on:valueKeydown={(e)=>{fieldValueKeydown(e, field)}}
        on:del={()=>{del(field)}}
        bind:ref={field.ref}
        bind:field
        {pin}
      >
        <Button
          iconDescription="Go to 'Add new field'"
          hasIconOnly
          kind='ghost'
          size='small'
          icon={ArrowUp16}
          on:click={()=>{currentFieldRef.focus()}}
        />
      </Field>
    </div>
  {/each}
</div>