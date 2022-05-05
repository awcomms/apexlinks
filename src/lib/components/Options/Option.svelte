<script>
  export let valid;
  export let editable = false
  export let selectable = false
  export let option = {
    name: "",
    options: [],
  };

  $: valid = !option.name === ""

  option.options = option.options || [];

  import { Button } from "carbon-components-svelte";
  import WarningAlt from "carbon-icons-svelte/lib/WarningAlt.svelte";
  import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import Opt from '$lib/components/Options/Opt.svelte'
  import ETag from "$lib/components/Tag/_Tag.svelte";
  import { createEventDispatcher, onMount } from "svelte";

  const dispatch = createEventDispatcher();

  onMount(() => {
    inputRef ? inputRef.focus() : {}
  });

  let inputRef;

  let id = 0;

  let nameInputDelaying;
  const nameInput = () => {
    if (nameInputDelaying) return;
    nameInputDelaying = true;
    setTimeout(() => {
      dispatch("nameInput", option.name);
      nameInputDelaying = false;
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

<div>
  {#if editable}
    <input on:input={nameInput} bind:this={inputRef} bind:value={option.name} />
    <Button
      on:click={() => dispatch("del")}
      hasIconOnly
      icon={TrashCan}
      iconDescription="Delete this option"
      size="small"
      kind="ghost"
    />
    {#if option.invalid}
      <WarningAlt />
    {/if}
  {:else}
    <p>{option.name}</p>
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
  {#each option.options as opt}
    <Opt
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
  <!-- </div> -->
</div>

<style>
  input {
    size: 0;
    border: none;
    background-color: rgba(0, 0, 0, 0);
  }

  input:focus {
    border: none;
  }
</style>
