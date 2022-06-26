<script>
  export let user,
    add,
    page,
    pages,
    txt,
    items,
    leaveText = "Remove this txt from your list",
    joinText = "Add this txt to your list";

  import { api, routes } from "$lib/utils";
  import { goto } from "$app/navigation";
  import { TxtInput } from "$lib/components";
  import { Row, Column, Truncate, Link } from "carbon-components-svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import { socket } from "$lib/utils";
  import { browser } from "$app/env";

  $: updateScroll(add);

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
    await api.get(`txts?page=${page - 1}`).then((r) => {
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
    if (!browser) return;
    setTimeout(() => {
      window.scrollTo({ left: 0, top: document.body.scrollHeight });
    }, 0);
  };
</script>

{#if txt}
  <Row noGutter>
    <Column>
      <Link href="{routes.txts}/{txt.id}/about">
        <Truncate>
          txt {txt.id}: {txt.value}
        </Truncate>
      </Link>
    </Column>
  </Row>
{/if}

<Row noGutter>
  <Column>
    <span>
      {#if user}
        <Link href="{routes.users}/{user.id}/about">
          <Truncate clamp="end">{user.username}</Truncate>
        </Link>
      {/if}
      {#if txt}
        {#if txt.joined}
          {#if leaveText}
            <p on:click={exit} class="pointer">{leaveText}</p>
          {/if}
        {:else if joinText}
          <p on:click={() => dispatch("join")} class="pointer">{joinText}</p>
        {/if}
      {/if}
      <br />
    </span>
    <div class="head-space" />
  </Column>
</Row>

{#if pages > 1}
  <p on:click={get}>Get older txts</p>
{/if}

<div class="con">
  {#each items as item}
    <Row noGutter>
      <Column>
        <Link href="{routes.users}/{item.user.id}">
          <p class="small pointer">
            {item.user?.username}
          </p>
        </Link>
        <Link href="{routes.txts}/{item.id}">
          <p>{item.value}</p>
        </Link>
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
</style>
