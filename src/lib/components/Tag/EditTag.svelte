<script>
  export let inputEventDelay;
  export let inputRef;
  export let filter
  export let ref;
  export let value;
  import { Tag } from "carbon-components-svelte";

  let throttling;

  const dispatchInput = () => {
    if (throttling) return;
    throttling = true;
    setTimeout(() => {
      dispatch("input");
      throttling = false;
    }, inputEventDelay);
  };
</script>

<Tag filter on:close bind:ref on:click><input bind:this={inputRef}>{value}</Tag>

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
