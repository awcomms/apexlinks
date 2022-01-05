<script>
  $: (() => {
    if (combobox && items) {
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

  export let label = 'Label'
  export let acceptKey = 'Enter'
  export let combobox;
  export let items;
  export let ref = null;
  export let field = {};

  import {
    ComboBox,
    Button,
  } from "carbon-components-svelte";
  import {ratio} from "fuzzball";
  import Input from "$lib/components/Input/Input.svelte";
  import Close16 from "carbon-icons-svelte/lib/Close16";
  import Checkmark16 from "carbon-icons-svelte/lib/Checkmark16";
  import { onMount, createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher()
  let selectedIndex;

  // used to keep label before field went to edit mode
  let qLabel = field.label

  onMount(() => {
    if (ref) {
      ref.value = qLabel
      field.label = ref.value
      ref.focus()
    };
    field.focused = true;
  });

  const editKeydown = (e) => {
    if (e.key === acceptKey) {
      dispatch('labelAccept')
    }
  }
</script>

{#if combobox}
  <ComboBox
    titleText={label}
    bind:items
    bind:ref
    bind:selectedIndex
    on:keydown={editKeydown}
    bind:value={field.label}
  />
{:else}
  <Input
    labelText={label}
    bind:ref
    bind:value={field.label}
    bind:invalid={field.invalid}
    bind:helperText={field.helperText}
    bind:invalidText={field.invalidText}
    on:keydown={editKeydown}
    on:helperClick
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
  on:click={()=>{dispatch('labelAccept')}}
/>
