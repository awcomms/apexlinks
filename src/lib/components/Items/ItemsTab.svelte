<script>
  let sp = "id";
  export { sp as selectProperty };

  export let sameUser = false;
  export let optEvent = false;
  export let optSelected = (o) => false;
  export let selected = [];
  export let items = [];
  export let user = {};
  export let tags = [];
  export let labelText = "";
  export let showOptions = false;
  export let type = "";
  export let name = "selected";
  export let add = false;

  import { Button } from "carbon-components-svelte";
  import { Items } from "$lib/components";

  let visible;

  console.log(sp);

  const toggleSelected = (item) => {
    items.find((i) => i[sp] === item[sp])
      ? (items = items.filter((i) => i.id !== item.id))
      : (items = [...items, item]);
  };
</script>

{#if selected.length > 0}
  <Button size="small" on:click={() => (visible = !visible)}>
    {visible ? `Hide ${name}` : `Show ${name}`}
  </Button>

  {#if visible}
    {#each selected as select}
      <p on:click={() => toggleSelected(select)}>
        {select.id}
      </p>
    {/each}
  {/if}
{/if}

<Items
  {type}
  {add}
  {user}
  {sameUser}
  {optEvent}
  {labelText}
  {showOptions}
  {optSelected}
  bind:selected
  bind:items
  bind:tags
  on:click={({ detail }) => toggleSelected(detail)}
  on:add
  on:action
/>
