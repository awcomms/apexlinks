<script>
  export let controls = { selectable: true, editable: false };
  import { Row, Column, Button } from "carbon-components-svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import { createEventDispatcher } from "svelte";
  import Option from "./Option.svelte";

  export let title = true;
  export let options = [];

  const dispatch = createEventDispatcher();
</script>

<div>
  {#if options.length > 1 && title}
    <p>Options</p>
  {/if}
  {#if controls.editable}
    <Button
      iconDescription="Add an option set"
      icon={Add}
      size="small"
      on:click={() => {
        options = [
          ...options,
          {
            name: "",
            options: [],
          },
        ];
      }}>Add an option set</Button
    >
  {/if}
  {#each options as option}
    <Option
      on:action={(e) => {
        dispatch("action", { name: option.name, option: e.detail });
      }}
      bind:option
      bind:controls
    />
  {/each}
</div>
