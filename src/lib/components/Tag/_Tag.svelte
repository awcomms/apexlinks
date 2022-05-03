<script>
  export let inputEventDelay;
  export let warning = false;
  export let text = "";
  export let editable = false;
  export let editing = false;

  import { Button, Tag } from "carbon-components-svelte";
  import WarningAlt from "carbon-icons-svelte/lib/WarningAlt.svelte";
  import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";
  import Edit from "carbon-icons-svelte/lib/Edit.svelte";
  import Checkmark from "carbon-icons-svelte/lib/Checkmark.svelte";

  import { onMount, createEventDispatcher } from "svelte";

  $: if (warning && input) {
    input.focus();
  }

  onMount(() => {
    input ? input.focus() : {};
  });

  let input;

  const dispatch = createEventDispatcher();

  let throttling;

  const dispatchInput = () => {
    if (throttling) return;
    throttling = true
    setTimeout(() => {
      dispatch("input");
      throttling = false
    }, inputEventDelay);
  };

  const toggleEditing = () => {
    editing = !editing;
  };
</script>

<Tag {...$$restProps} on:click>
  {#if editable}
    <input
      on:input={dispatchInput}
      on:blur={() => dispatch("blur")}
      class="bx--tag__label"
      bind:this={input}
      bind:value={text}
    />
    <!-- {#if editing}
      <input class="bx--tag__label" bind:this={input} value={text} />
      <slot />
      <Button
        hasIconOnly
        icon={Checkmark}
        size="small"
        kind="ghost"
        on:click={() => {
          dispatch("accept", input.value);
          // toggleEditing();
        }}
      />
    {:else}
      {text}
      <slot />
      <Button
        hasIconOnly
        icon={Edit}
        size="small"
        kind="ghost"
        on:click={() => {
        //   input.focus();
          dispatch("edit");
          // toggleEditing();
        }}
      />
    {/if} -->
    {#if warning}
      <WarningAlt />
    {/if}
    <Button
      hasIconOnly
      icon={TrashCan}
      size="small"
      kind="ghost"
      on:click={() => {
        dispatch("del");
      }}
    />
  {:else}
    {text}
    <slot />
  {/if}
</Tag>

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
