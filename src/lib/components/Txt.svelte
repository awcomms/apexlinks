<script>
  export let title,
  add,
    page,
    pages,
    txt,
    items,
    // socket,
    leaveText = "Leave txt";

  import { api, routes } from "$lib/utils";
  import { goto } from "$app/navigation";
  import { TxtInput } from "$lib/components";
  import { Row, Column, Truncate } from "carbon-components-svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import { socket } from "$lib/utils";
  import { browser } from '$app/env';

  $: updateScroll(add)

  const dispatch = createEventDispatcher();

  let value;
  let ref;

  onMount(() => {
    window.scrollTo({ left: 0, top: document.body.scrollHeight });
    ref.focus();
  });

  const keydown = (e) => {
    switch (e.key) {
      case "Enter":
        send();
    }
  };

  const exit = async () => {
    await api.put(`leave/${txt.id}`);
    socket.emit("leave", txt.id);
    goto(routes.txts);
  };

  const get = async () => {
    await api.get(`txts?replies&page=${page - 1}`).then((r) => {
      page = r.page;
      pages = r.pages;
      items = [r.items, ...items];
    });
  };

  const send = () => {
    if (!value) return;
    dispatch("send", value);
    value = "";
  };

  const updateScroll = () => {
    if (!browser) return
    setTimeout(() => {
      window.scrollTo({ left: 0, top: document.body.scrollHeight });
    }, 0);
  };
</script>

<Row noGutter>
  <Column>
    <span>
      <div on:click={() => dispatch("titleClick")} class="head">
        <Truncate clamp="end">{title}</Truncate>
      </div>
      {#if txt}
        <p on:click={exit} class="pointer">{leaveText}</p>
      {/if}
      <br />
    </span>
    <div class="head-space" />
  </Column>
</Row>

{#if txt}
  <Truncate clamp="front">
    {txt.value}
  </Truncate>
{/if}

{#if pages > 1}
  <p on:click={get}>Get older txts</p>
{/if}

<div class="con">
  {#each items as item}
    <Row noGutter>
      <Column>
        <p
          on:click={() => goto(`${routes.users}/${item.user.id}`)}
          class="small pointer"
        >
          {item.user.username}
        </p>
        <p on:click={() => dispatch("itemClick", item)}>{item.value}</p>
      </Column>
    </Row>
  {/each}

  <TxtInput on:keydown={keydown} bind:value bind:ref />
</div>

<style>
  .pointer {
    cursor: pointer;
  }
  .small {
    color: grey;
    font-size: 0.75rem;
  }
  .head-space {
    height: 0.5rem;
  }
  .head {
    font-size: 0.875rem;
    line-height: 1.125em;
    font-weight: 600;
    letter-spacing: 0.16px;
  }
</style>
