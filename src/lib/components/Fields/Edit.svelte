<script>
  $: (() => {
    if (combobox) {
      if (field.label) {
        items.forEach((i) => {
          i.score = ratio(i.label, field.label);
        });
        items.sort((a, b) => b.score - a.score);
      } else {
        items.sort((a, b) => {
          let aLabel = a.label.toLowerCase();
          let bLabel = b.label.toLowerCase();
          return aLabel < bLabel ? -1 : 1;
        });
      }
    }
  })();

  export let combobox;
  export let items;
  export let ref = null;
  export let field = {};

  import {
    ComboBox,
    SelectItem,
    Select,
    Button,
  } from "carbon-components-svelte";
  import { ratio } from "fuzzball";
  import Input from "$lib/components/Input/Input.svelte";
  import Close16 from "carbon-icons-svelte/lib/Close16";
  import Checkmark16 from "carbon-icons-svelte/lib/Checkmark16";
  import { onMount, createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher()
  let selectedIndex;
  let qLabel = field.label

  onMount(() => {
    if (ref) {
      ref.value = qLabel
      ref.focus()
    };
    field.focused = true;
  });

  const types = [
    {
      value: "text",
      text: "Text",
    },
    {
      value: "number",
      text: "Number",
    },
    {
      value: "link",
      text: "Link",
    },
    {
      value: "range",
      text: "Range",
    },
  ];
</script>

{#if combobox}
  <ComboBox
    titleText="Label"
    bind:items
    bind:ref
    bind:selectedIndex
    on:keydown={(e)=>{dispatch(`label-kd-${e.keyCode}`)}}
    bind:value={field.label}
  />
{:else}
  <Input
    labelText="Label"
    bind:ref
    bind:value={field.label}
    bind:invalid={field.invalid}
    bind:helperText={field.helperText}
    bind:invalidText={field.invalidText}
    on:helperClick
    on:keydown
  />
{/if}

{#if !field.new}
  <Button
    iconDescription="Cancel"
    hasIconOnly
    kind="ghost"
    size="field"
    icon={Close16}
    on:click={() => {
      field = field.dirty;
      field.edit = false;
    }}
  />
{/if}

<Button
  iconDescription="Accept"
  hasIconOnly
  kind="ghost"
  size="field"
  icon={Checkmark16}
  on:click={()=>{dispatch('edit')}}
/>
