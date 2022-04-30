<script>
  export let editable = false;
  import { Row, Column, Button } from "carbon-components-svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import Option from "./Option.svelte";

  export let options;
</script>

<div>
  <Row>
    <Column>
      <p>Options</p>
      {#if editable}
      <Button
        iconDescription='Add an option set'
        hasIconOnly
        kind='ghost'
        icon={Add}
        size='small'
        on:click={() => {
          options = [...options, {
            name: "ex1",
            options: [],
          }]
        }}
      />
      {/if}
    </Column>
  </Row>
  {#each options as option}
    <Option bind:option bind:editable />
  {/each}
</div>
