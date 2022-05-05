<script>
  export let valid
  export let editable = false
  export let selectable = false
  import { Row, Column, Button } from "carbon-components-svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import { createEventDispatcher } from "svelte";
  import Option from "./Option.svelte";

  export let title = true;
  export let options = [];

  const dispatch = createEventDispatcher();

  const nameInput = ({detail}) => {
    let option = options.find(o => o.name === detail)
    if (option) {
      valid = false
      option.invalid = true
    }
  }

  const del = (option) => {
    options = options.filter(o => o.name !== option.name)
  }
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
      on:click={() => {
        options = [
          ...options,
          {
            name: "",
            invalid: false,
            options: [],
          },
        ];
      }}>Add an option set</Button
    >
  {/if}
  {#each options as option}
    <Option
      on:del={()=>del(option)}
      on:nameInput={nameInput}
      on:action={(e) => {
        dispatch("action", { name: option.name, option: e.detail });
      }}
      bind:valid
      bind:option
      bind:selectable
      bind:editable
    />
  {/each}
</div>
