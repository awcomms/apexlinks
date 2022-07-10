<script>
  export let txt = null,
    ref = null,
    labelText = "",
    existing = false,
    value = "";
  import { session } from "$app/stores";
  import { routes, api } from "$lib/utils";
  import { createEventDispatcher } from "svelte";
  import {
    Row,
    Column,
    Link,
    TextInput,
    ContextMenu,
    ContextMenuOption,
    ComboBox,
    InlineLoading,
  } from "carbon-components-svelte";

  const dispatch = createEventDispatcher();

  let items = [],
    selectedId,
    searching = false,
    delayId,
    delay = 2000;

  $: if (searching) items = [{ value: "Loading", loading: true }];

  $: if (selectedId) (async () => await get())();

  $: if (value) startGet();

  const startGet = () => {
    if (typeof delayId === "number") clearTimeout(delayId);
    delayId = setTimeout(() => {
      get()
    }, delay);
  }

  const get = async () => {
    const include = `include=${JSON.stringify(["value"])}`;
    const url = `txts?user=${$session.user.id}&${include}&limit=5&page=1&tag`;
    await api.get(url).then((res) => {
      if (!res.OK) {
        console.log(res);
        return;
      }
      items = res.items;
    });
  };
</script>

{#if txt}
  <ContextMenu bind:target={ref}>
    <ContextMenuOption
      on:click={() => (existing = !existing)}
      labelText={existing ? "Create a new txt to reply with" : "Reply to this txt with an existing txt"}
    />
  </ContextMenu>
{/if}

<div class="input">
  <Row noGutter>
    <Column>
      {#if $session.user}
        {#if existing}
          <ComboBox
            bind:ref
            on:select={({ detail }) => dispatch("add", detail.selectedItem)}
            bind:value
            bind:selectedId
            bind:items
            titleText="Select a txt to reply with"
            let:item
          >
            <p>{item.value}</p>
            {#if item.loading}
              <InlineLoading />
            {/if}
          </ComboBox>
        {:else}
          <TextInput {labelText} on:keydown rows={2} bind:ref bind:value />
        {/if}
      {:else}
        <div class="login-prompt">
          <Link href={routes.login}
            >Login to {txt ? "reply to this" : "add a"} txt</Link
          >
        </div>
      {/if}
    </Column>
  </Row>
</div>
