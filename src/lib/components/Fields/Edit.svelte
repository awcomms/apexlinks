<script>
  $: ((selectedIndex) => {
    if (items && items[selectedIndex]) field.label = items[selectedIndex].text;
  })();

  $: (() => {
    if (combobox) {
      if (field.label) {
        items.forEach((i) => {
          console.log('item id', i)
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
  export let ref;
  export let field = {};

  items.forEach(i => console.log('i', i.id))

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
  import { createEventDispatcher } from "svelte";

  let selectedIndex;

  const dispatch = createEventDispatcher();

  import { onMount } from "svelte";

  onMount(() => {
    if (ref) ref.focus();
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

  const accept = (field) => {
    dispatch("accept", field);
  };
</script>

{#if combobox}
  <ComboBox
    titleText="Label"
    bind:items
    bind:selectedIndex
    bind:value={field.label}
  />
{:else}
  <Input
    bind:ref
    labelText="Label"
    bind:value={field.label}
    bind:invalid={field.invalid}
    invalidText={field.invalidText}
  />
{/if}

<Select labelText="Filter type" bind:selected={field.type}>
  {#each types as type}
    <SelectItem value={type.value} text={type.text} />
  {/each}
</Select>

{#if !field.new}
  <Button
    iconDescription="Cancel"
    hasIconOnly
    kind="ghost"
    size="field"
    icon={Close16}
    on:click={() => {
      field.edit = false;
      field = field.dirty;
    }}
  />
{/if}

<Button
  iconDescription="Accept"
  hasIconOnly
  kind="ghost"
  size="field"
  icon={Checkmark16}
  on:click={() => {
    accept(field);
  }}
/>
