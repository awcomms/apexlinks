<script>
  $: fields = $storeFields

  export let prompt = "Add new field";
  export let pin = false;
  export let fields = [];
  export let combobox;
  export let items;

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
  
  const scrollTo = (field) => {
    // container.scrollTop = field.offsetTop;
  };

  const edit = (e) => {
    let field = $storeFields.find(f => f.id === e.detail)
    if (!field) {
      return
    }
    if ($storeFields.find((f) => f.label === field.label && f !== field)) {
      field.invalid = true;
      field.invalidText = "A field with that label already exists";
      field.helperText = 'Click here to scroll to the already existing field' //TODO
      return;
    }
    field.new = false;
    field.edit = false;
  };

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
  label={prompt}
  bind:ref={currentFieldRef}
  bind:field={currentField}
  deleteButton={false}
  on:edit={add}
  on:valueKeydown={(e)=>{if (e.detail.code === 'Enter') add()}}
/>

<div class="container" bind:this={container}>
  {#each $storeFields as field}
    <div bind:this={field.cotainerRef}>
      <Field
        {combobox}
        {items}
        on:del={()=>{del(field)}}
        bind:field
        on:enter
        on:helperClick={()=>{scrollTo(field)}}
        bind:ref={field.ref}
        on:kd-13={edit}
        on:edit={()=>{field.edit = false; field.new = false;}}
        {pin}
      />
    </div>
  {/each}
</div>