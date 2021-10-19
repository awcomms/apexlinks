<script>
    $: fields = $storeFields
  
    export let combobox;
    export let items;
    export let prompt = "Add Custom Field";
    export let pin = false;
    export let fields = [];
  
    import {
      Button
    } from "carbon-components-svelte";
    import Field from "./Field.svelte";
  
    import {
      storeFields
    } from './store'
  
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
        new: true,
        label: "",
        value: "",
        edit: true,
        invalid: false,
        error: false,
      };
      $storeFields = [...$storeFields, field];
      id++
    };
  </script>
  
  <Field
    bind:field={currentField}
    on:kd-13
  />
  
  <div bind:this={container}>
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
  
  <div>
    <Button on:click={add}>{prompt}</Button>
  </div>
  