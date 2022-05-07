<script>
  export let inputEventDelay = 0;
  export let warning = false;
  export let filter
  export let value = "";
  export let type = "cool-gray"
  export let editable = false;
  export let ref

  import { Button, Tag } from "carbon-components-svelte";
  import WarningAlt from "carbon-icons-svelte/lib/WarningAlt.svelte";
  import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";

  import { onMount, createEventDispatcher } from "svelte";

  // $: shI(input)

  // const shI = () => input ? input.size = input.value.length || 1 : {}

  $: if (warning && input) {
    input.focus();
  }

  onMount(() => {
    input ? input.focus() : {};
    context = document.createElement('canvas').getContext('2d')
    context.font = `0.75rem "IBM Plex Mono"` // TODO-verify
  });

  let context;

  const dispatch = createEventDispatcher();

  let input;
  let delayId;

  const inputEvent = () => {
    let {width} = context.measureText(input.value) + 1
    if (input) input.style.width = `${width}px`

    typeof delayId === 'number' ? clearTimeout(delayId) : {}
    delayId = setTimeout(() => {
      dispatch("input");
    }, inputEventDelay);
  };
</script>

<Tag bind:ref {type} {filter} on:close on:click>
  {#if editable}
    <input
      on:input={inputEvent}
      on:keydown={()=>dispatch('keydown')}
      on:blur={() => dispatch("blur")}
      bind:this={input}
      bind:value
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
  {:else}
    {value}
    <slot />
  {/if}
</Tag>

<style lang="sass">
  @use '@carbon/type'

  input
    @include type.type-style('code-01')
    margin: 0 0
    outline: none
    appearance: none
    font-family: monospace
    border: none
    background-color: rgba(0, 0, 0, 0)

  input:focus
    outline: none
    appearance: none
    border: none
</style>
