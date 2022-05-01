<script>
  export let controls = { selectable: true, editable: false };
  import { Row, Column, Button } from "carbon-components-svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import Option from "./Option.svelte";

  export let options;
</script>

<div>
  {#if options.length > 1}
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
      }}
    >Add an option set</Button>
  {/if}
  {#each options as option}
    <Option bind:option bind:controls />
  {/each}
</div>
