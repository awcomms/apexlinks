<script>
  export let valid;
  export let title = false;
  export let options = [];
  export let editable = false;
  export let selectable = false;
  export let selections = [];
  export let selected = () => false;
  import { Row, Column, Button } from "carbon-components-svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import { createEventDispatcher } from "svelte";
  import Option from "./Option.svelte";

  const dispatch = createEventDispatcher();

  const labelInput = ({ detail }) => {
    let option = options.find((o) => o.name === detail);
    if (option) {
      valid = false;
      option.invalid = true;
    }
  };

  const add = () => {
    options = [
      ...options,
      {
        label: "",
        invalid: false,
        options: [],
      },
    ];
  };

  const del = (option) => {
    options = options.filter((o) => o.name !== option.label);
  };
</script>

<div>
  {#if options.length > 1 && title}
    <p>Options</p>
  {/if}
  {#if editable}
    <Button
      iconDescription="Add an option set"
      icon={Add}
      size="small"
      on:click={add}>Add an option set</Button
    >
  {/if}
  {#each options as option}
    <Option
      {selections}
      {selected}
      on:del={() => del(option)}
      on:labelInput={labelInput}
      on:action={(e) => {
        dispatch("action", { label: option.label, option: e.detail });
      }}
      bind:valid
      bind:option
      bind:selectable
      bind:editable
    />
  {/each}
</div>
