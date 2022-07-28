<script lang="ts">
  export let txt = null,
    selectedId: number = -1,
    ref = null,
    value: string = "";
  import { session } from "$app/stores";
  import { routes, api } from "$lib/util";
  import { onMount, createEventDispatcher } from "svelte";
  import {
    Row,
    Column,
    Link,
    ComboBox,
    Button,
    InlineLoading,
    TextInput,
  } from "carbon-components-svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import TextAlignJustify from "carbon-icons-svelte/lib/TextAlignJustify.svelte";

  const dispatch = createEventDispatcher();

  let items = [],
    searching = false,
    delayId,
    open = false,
    existing = false,
    newTxtPrompt = "Create a new txt to reply with",
    existingTxtPrompt = "Reply with an existing txt",
    delay = 2000;

  $: if (searching) items = [{ value: "loading results...", loading: true }];

  const startGet = async () => {
    if (typeof delayId === "number") clearTimeout(delayId);
    delayId = setTimeout(async () => {
      await get();
    }, delay);
  };

  let watch = 1;

  const keydown = async (e) => {
    if (e.key === "Enter" && !existing) {
      dispatch("send");
    } else if (txt && existing) {
      await startGet();
    }
  };

  const get = async () => {
    if (!value) return;
    if (!$session.user) return;
    searching = true;
    const include = `include=${JSON.stringify(["value"])}`;
    const tagsQuery = `tags=${JSON.stringify([{ value }])}`;
    const url = `txts?user=${$session.user.id}&${include}&limit=5&page=1&${tagsQuery}`;
    await api
      .get(url)
      .then((res) => {
        if (!res.OK) {
          console.log(res);
          return;
        }
        items = res.items;
      })
      .finally(() => (searching = false));
  };
</script>

<div class="input">
  <Row noGutter>
    <Button
      icon={existing ? Add : TextAlignJustify}
      iconDescription={existing ? newTxtPrompt : existingTxtPrompt}
      size="small"
      kind="ghost"
      on:click={() => (existing = !existing)}
    />
    <Column>
      {#if $session.user}
        {#if txt && existing}
          <ComboBox
            direction="top"
            bind:ref
            bind:open
            titleText={existingTxtPrompt}
            bind:value
            on:keydown={keydown}
            bind:selectedId
            bind:items
            let:item
          >
            <p>
              {#if !item.loading}{item.id}: {/if}{item.value}
            </p>
          </ComboBox>
        {:else}
          <TextInput on:keydown={keydown} bind:value labelText={newTxtPrompt} />
        {/if}
      {:else}
        <br />
        <div class="login-prompt">
          <Link href={routes.login}
            >Login to {txt ? "reply to this" : "add a"} txt</Link
          >
        </div>
      {/if}
    </Column>
  </Row>
</div>
