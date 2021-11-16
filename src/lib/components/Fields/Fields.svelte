<script>
  export let prompt = "Add new field";
  export let pin = false;
  export let fields = [];
  export let combobox;
  export let items;

  import {
    Button
  } from 'carbon-components-svelte'
  // import BButton from "$lib/components/BButton/B.svelte";
  import View16 from 'carbon-icons-svelte/lib/View16'
  import ViewOff16 from 'carbon-icons-svelte/lib/ViewOff16'
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

  let offText='Make this field visible'
  let hiddenFirst = {
    icon: ViewOff16,
    text: offText
  }

  let onText='Hide this field. Field will still be used to rank you in search and SEO'
  let hiddenSecond = {
    icon: View16,
    text: onText
  }

  let currentFieldRef
  let currentField = {
    value: '',
    label: '',
    edit: true,
    new: true
  }

  let id = Math.max(fields.map(f => f.id))

  $storeFields = fields
  $: fields = $storeFields

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

  const del = async(field) => {
    await new Promise((res)=>{
      $storeFields = $storeFields.filter(f => f !== field);
      res()
    })
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
    $storeFields = [field, ...$storeFields];
    id++
  };
</script>

<Field
  bind:ref={currentFieldRef}
  on:labelAccept={currentLabelAccept}
  on:valueAccept={currentValueAccept}
  bind:field={currentField}
  deletable={false}
  label={prompt}
  acceptKey='Enter'
/>

<slot name='customFields' />

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
        <!-- <BButton
          bind:control={field.hidden}
          first={hiddenFirst}
          second={hiddenSecond}
        /> -->
        <Button
          iconDescription="Go to 'Add new field'"
          hasIconOnly
          kind='ghost'
          size='small'
          icon={ArrowUp16}
          on:click={()=>{currentFieldRef.focus()}}
        />
      </svelte:fragment>
    </Field>
{/each}