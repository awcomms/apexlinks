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

  const toggleSelected = (item) => {
    if (selected.find((i) => i[sp] === item[sp])) {
      selected = selected.filter((i) => i[sp] !== item[sp]);
      items.find(i => i.id === item.id).selected = false
    } else {
      selected = [...selected, item];
      items.find(i => i.id === item.id).selected = true
    }
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
  clearOnEnter={true}
  deleteButton={true}
  {type}
  {add}
  {user}
  {sameUser}
  {optEvent}
  {labelText}
  {showOptions}
  {optSelected}
  bind:items
  bind:tags
  on:click={({ detail }) => toggleSelected(detail)}
  on:action
  on:del
  on:add
/>
