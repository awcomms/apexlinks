<script>
  export let valid;
  export let editable = false;
  export let selectable = false;
  export let optEvent = false;
  export let selected = () => false;
  export let option = {
    label: "",
    options: [],
  };

  $: valid = !option.label === "";

  option.options = option.options || [];

  import { Button } from "carbon-components-svelte";
  import WarningAlt from "carbon-icons-svelte/lib/WarningAlt.svelte";
  import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import Opt from "$lib/components/Options/Opt.svelte";
  import { createEventDispatcher, onMount } from "svelte";

  const dispatch = createEventDispatcher();

  onMount(() => {
    inputRef ? inputRef.focus() : {};
  });

  let inputRef;

  let id = 0;

  let labelInputDelaying;
  const labelInput = () => {
    if (labelInputDelaying) return;
    labelInputDelaying = true;
    setTimeout(() => {
      dispatch("labelInput", option.label);
      labelInputDelaying = false;
    });
  };

  const input = (opt) => {
    if (
      option.options.find(
        ((o) => o.value === opt.value && o.id !== opt.id) || opt.value === ""
      )
    ) {
      opt.invalid = true;
    } else {
      opt.invalid = false;
    }
  };

  const del = (opt) => {
    option.options = option.options.filter((o) => {
      return o.value !== opt.value;
    });
  };

  const add = () => {
    // if (option.options.find((o) => o.value === "")) return;
    option.options = [
      ...option.options,
      {
        id,
        value: "",
        invalid: false,
        selected: false,
        editing: false,
      },
    ];
    id++;
  };
</script>

<div class="container">
  {#if editable}
    <input
      on:input={labelInput}
      bind:this={inputRef}
      bind:value={option.label}
    />
    <Button
      on:click={() => dispatch("del")}
      hasIconOnly
      icon={TrashCan}
      iconDescription="Delete this option set"
      size="small"
      kind="ghost"
    />
    {#if option.invalid}
      <WarningAlt />
    {/if}
  {:else}
    <p class='label'>{option.label}: </p>
  {/if}
  <!-- <div class="options"> -->
  {#if editable}
    <Button
      iconDescription="Add an option to this option set"
      kind="ghost"
      size="small"
      hasIconOnly
      icon={Add}
      on:click={add}
    />
  {/if}

  <div class="opts">
    {#each option.options as opt}
      <Opt
        {optEvent}
        {selected}
        on:input={() => input(opt)}
        on:del={() => del(opt)}
        bind:opt
        bind:editable
        bind:selectable
        on:action
        on:click
        bind:valid
      />
    {/each}
  </div>
  <!-- </div> -->
</div>

<style lang="sass">
  @use '@carbon/type'

  .label
    @include type.type-style('label-01')
    
  .container
    display: grid
    grid-template-columns: min-content 1fr
    align-items: center
    margin-left: 1rem

  input
    size: 0
    border: none
    background-color: rgba(0, 0, 0, 0)

  input:focus 
    border: none
</style>
