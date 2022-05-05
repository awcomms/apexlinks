<script>
  export let inputEventDelay;
  export let inputRef;
  // export let filter
  export let ref;
  export let value;
  import { Tag } from "carbon-components-svelte";
import { createEventDispatcher } from "svelte";

  $: if (inputRef) inputRef.size = inputRef.value.length || 1

  let delaying;

  const dispatch = createEventDispatcher()

  const dispatchInput = () => {
    if (delaying) return;
    delaying = true;
    setTimeout(() => {
      dispatch("input");
      delaying = false;
    }, inputEventDelay);
  };
</script>

<Tag filter on:close bind:ref on:click
  ><input on:input={dispatchInput} bind:value bind:this={inputRef} /></Tag
>

<style>
  input {
    border: none;
    background-color: rgba(0, 0, 0, 0);
  }

  input:focus {
    border: none;
    appearance: none;
    outline: none;
  }
</style>
