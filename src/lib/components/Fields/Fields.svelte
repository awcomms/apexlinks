<script>
  export let combobox;
  export let items;
  export let prompt = "Add Custom Field";
  export let pin = false;
  export let fields = [];

  let container;

  import { Button, Column, Row } from "carbon-components-svelte";
  import Field from "./Field.svelte";

  const scrollTo = (field) => {
    console.log('should scroll')
    // container.scrollTop = field.offsetTop;
  };

  const checkForDuplicate = (field) => {
    for (let f of fields) {
      if (f.label === field.label && f !== field) {
        return true;
      } else {
        console.log('different')
        return false;
      }
    }
  };

  const cancel = (field) => {
    field = field.dirty;
  };

  const edit = (field) => {
    if (fields.find((f) => f.label == field.label && f !== field)) {
      field.invalid = true;
      field.invalidText = "A field with that label already exists";
      return;
    }
    field.new = false;
    field.edit = false;
  };

  const del = (field) => {
    fields = fields.filter((f) => f.id != field.id);
  };

  const add = () => {
    fields.forEach((field) => {
      field.focused = false;
    });
    let field = {
      pinned: false,
      type: "text",
      new: true,
      label: "",
      value: "",
      edit: true,
      invalid: false,
      error: false,
    };
    fields = [...fields, field];
  };
</script>

<div bind:this={container}>
  {#each fields as field}
    <div bind:this={field.cotainerRef}>
      <Field
        {combobox}
        {items}
        on:del={del(field)}
        bind:field
        on:enter
        bind:ref={field.ref}
        {pin}
      />
    </div>
  {/each}
</div>

<div>
  <Button on:click={add}>{prompt}</Button>
</div>
