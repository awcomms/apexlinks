<script>
  // export let deleteButton = false;
  export let clearOnEnter = false;
  export let items = [];
  export let tags = [];
  export let optEvent = false;
  export let optSelected = () => false;
  export let showOptionsControl = false;
  export let showOptions = false;
  export let add = false;
  export let labelText = "Add a new item";
  export let options = [];
  export let children = [];
  export let parents = [];
  export let height;
  export let user;
  export let type = "";
  //   export let countries, /* markets, */ states, cities;

  import {
    Loading,
    TextInput,
    PaginationNav,
    Checkbox,
    Row,
    Button,
  } from "carbon-components-svelte";
  import { api } from "$lib/utils";
  import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";
  import Tag from "$lib/components/Tag/Tags.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import { ids } from "$lib/utils";
  import { session } from "$app/stores";
  import Options from "../Options/Options.svelte";

  $: if (container) {
    container.style.height = `${height ? `${height}px` : "null"}`;
  }

  let container;
  let value;

  // onMount(() => {
  //   container.style.height = `${height ? `${height}px` : "100%"}`;
  // });

  const dispatch = createEventDispatcher();

  $: sameUser = $session.user?.id === user?.id;
  $: get(saved, page, children, parents, user);

  let loading;
  let page = 0;
  let pages = 0;

  let saved;

  let got;

  const addInputKeydown = (e) => {
    if (e.key === "Enter") {
      dispatch("add", { value });
      if (clearOnEnter) value = "";
    }
  };

  const get = async () => {
    loading = true;
    let tagArg = JSON.stringify(tags);
    let url = `items?tags=${tagArg}&page=${page + 1}`;
    if (user) url = url.concat(`&user-id=${user.id}`);
    if (type) url = url.concat(`&${type}`);
    if (children.length > 0)
      url = url.concat(`&children=${JSON.stringify(ids(children))}`);
    if (parents.length > 0)
      url = url.concat(`&parents=${JSON.stringify(ids(parents))}`);
    if (saved) url = url.concat(`&saved`);
    // url.concat(`&country=country`);
    let res = await api.get(url).finally(() => (loading = false));
    if (Array.isArray(res.items)) {
      items = res.items;
      pages = res.pages;
      !got ? (got = true) : {};
    }
  };
</script>

<svelte:head>
  <title>Apexlinks</title>
</svelte:head>

<div class="container" bind:this={container}>
  {#if loading}
    <Loading withOverlay={false} />
  {/if}

  <Tag
    bind:tags
    bind:options
    selectable={true}
    editable={false}
    on:change={get}
  />

  {#if sameUser}
    <Checkbox labelText="Only saved items" bind:checked={saved} />

    {#if showOptionsControl}
      <Checkbox labelText="Show options" bind:checked={showOptions} />
    {/if}
  {/if}

  {#each items as item}
    <br />
    <div
      on:click={() => {
        dispatch("click", item);
      }}
      class="pointer item"
    >
      {#if item.image}
        <img
          style="vertical-align: top;"
          height="52px"
          width="52px"
          alt="profile pic"
          src={item.image}
        />
      {:else}
        <img
          style="vertical-align: top;"
          height="52px"
          width="52px"
          alt="profile pic"
          src="/placeholder.png"
        />
      {/if}
      <div class="label">
        <p>
          {item?.tags?.find((f) => f.label === "name")?.value || item.id}
        </p>
        {#if !sameUser && item.user?.username}
          <p class="bx--link--sm">{item.user.username}</p>
        {/if}
      </div>
      {#if $session.user?.id === item?.user?.id}
        <div on:click|stopPropagation>
          <Button
            size="field"
            kind="ghost"
            hasIconOnly
            icon={TrashCan}
            iconDescription="Delete"
            on:click={() => dispatch("del", item)}
          />
        </div>
      {/if}
    </div>

    {#if showOptions === true || (showOptions === "selected" && item.selected)}
      <Options
        {optEvent}
        selected={optSelected}
        on:action
        selectable={true}
        options={item.options}
      />
    {/if}
    <div class="actions">
      <!-- <Save bind:item /> -->
    </div>
  {/each}

  {#if got && items.length < 1}
    <!-- <Row noGutter> -->
    <!-- <Column> -->
    <p>There don't seem to be any results</p>
    <!-- </Column> -->
    <!-- </Row> -->
  {/if}

  {#if add}
    <Row>
      <TextInput on:input on:keydown={addInputKeydown} bind:value {labelText} />
      <!-- <Button
          hasIconOnly
          icon={User}
          disabled={anonymous}
          iconDescription="add item anonymously"
          on:click={() => (anonymous = !anonymous)}
        /> -->
    </Row>
    <!-- TODO -->
  {/if}

  {#if items.length > 10}
    <!-- <Row noGutter> -->
    <!-- <Column> -->
    <PaginationNav loop bind:page bind:total={pages} />
    <!-- </Column> -->
    <!-- </Row> -->
  {/if}
</div>

<style>
  /* .container {
    width: 100%;
    overflow-y: scroll;
    overflow-x: visible;
  } */
  .actions {
    margin-right: 1rem;
  }
  .label {
    padding-left: 0.5rem;
  }
  .item {
    display: grid;
    grid-template-columns: repeat(3, min-content);
    align-items: center;
  }
  .pointer:hover {
    cursor: pointer;
  }
</style>
