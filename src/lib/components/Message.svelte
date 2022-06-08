<script>
  export let page, pages, message, room, items;

  import { api, routes } from "$lib/utils";
  import { goto } from "$app/navigation";
  import {
    Row,
    Column,
    TextInput,
    Truncate,
    Link,
  } from "carbon-components-svelte";
  import io from "socket.io-client";
  import { createEventDispatcher, onMount } from "svelte";
  import { parse } from "cookie";

  const dispatch = createEventDispatcher();

  const socket = io();
  let value;
  let ref;

  onMount(() => {
    window.scrollTo({ left: 0, top: document.body.scrollHeight });
    ref.focus();
  });

  socket.on("connect", () => {
    if (room) api.put(`join/${room.id}`);
    let id = room ? room.id : `m-${message?.id}`
    socket.emit("join", id);
  });

  socket.on("msg", async (obj) => {
    if (room) await api.put(`seen?id=${room.id}`, {});
    items = [...items, obj];
    updateScroll();
  });

  const keydown = (e) => {
    switch (e.key) {
      case "Enter":
        dispatch('send')
    }
  };

  const exit = async () => {
    await api.put(`leave/${room.id}`)
    socket.emit("leave", room.id);
    goto(routes.rooms);
  };

  const goUser = (user) => {
    goto(user);
  };

  const get = async () => {
    await api.get(`messages?${message ? 'model=message&mode=replies' : ''}&page=${page - 1}`).then((r) => {
      page = r.page;
      pages = r.pages
      items = [r.items, ...items];
    });
  };

  const send = async () => {
    if (!value) return;
    dispatch("send", value);
    value = "";
  };

  const updateScroll = () => {
    setTimeout(() => {
      window.scrollTo({ left: 0, top: document.body.scrollHeight });
    }, 0);
  };
</script>

<Row noGutter>
  <Column>
    <span>
      <div on:click={() => dispatch('titleClick')} class="head">
        <Truncate clamp="end">{message?.value || room?.name}</Truncate>
      </div>
      {#if room}
      <p on:click={exit} class="pointer">Leave room</p>
      {/if}
      <br />
    </span>
    <div class="head-space" />
  </Column>
</Row>

{#if message}
  <Truncate clamp="front">
    {message.value}
  </Truncate>
{/if}

{#if pages > 1}
  <p on:click={get}>Get older messages</p>
{/if}

{#each items as item}
  <Row noGutter>
    <Column>
        <p on:click={goUser(item.user)} class="small pointer">
          {item.user.username}
        </p>
        <Link href="/m/{item.id}" class="message">{item.value}</Link>
    </Column>
  </Row>
{/each}

<Row noGutter>
  <Column>
    <TextInput on:keydown={keydown} rows={2} bind:ref bind:value />
  </Column>
</Row>

<style>
  .pointer {
    cursor: pointer;
  }
  .small {
    color: grey;
    font-size: 0.75rem;
  }
  .message {
    overflow-wrap: break-word;
  }
  .head-space {
    height: 0.5rem;
  }
  .head-link {
    cursor: pointer;
  }
  .head {
    font-size: 0.875rem;
    line-height: 1.125em;
    font-weight: 600;
    letter-spacing: 0.16px;
  }
</style>
