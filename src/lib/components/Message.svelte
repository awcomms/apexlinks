<script>
  export let message, room, items, user, id;

  import { api, routes } from "$lib/utils";
  import { goto } from "$app/navigation";
  import { Row, Column, TextArea, Truncate, Link } from "carbon-components-svelte";
  import io from "socket.io-client";
  import { createEventDispatcher, onMount } from "svelte";
  import { parse } from "cookie";

  const dispatch = createEventDispatcher();

  let auth;
  const socket = io();
  let mounted;
  let value;
  let ref;

  onMount(() => {
    ({ token: auth } = parse(document.cookie));
    window.scrollTo({ left: 0, top: document.body.scrollHeight });
    mounted = true;
    ref.focus();
  });

  socket.on("connect", () => {
    socket.emit("join", { auth, room: room.id });
  });

  socket.on("msg", async (obj) => {
    await api.put(`seen?id=${id}`, {});
    items = [...items, obj];
    updateScroll();
  });

  const keydown = (e) => {
    switch (e.keyCode) {
      case 13:
        (async () => await send())();
    }
  };

  const exit = async () => {
    socket.emit("leave", { room: room.id });
    goto("/");
  };

  const go = () => {
    if (room.user == user.username) {
      goto(`/edit/${room.id}`);
    }
  };

  const goUser = (user) => {
    goto(user);
  };

  const send = async () => {
    if (!value) return;
    let obj = { user: user.id };
    if (message) {
      obj = {
        ...obj,
        message: message.id,
        reply: true,
      };
    } else {
      obj.value = value;
      obj.room = room.id;
    }
    dispatch("send", obj);
    updateScroll();
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
      <div on:click={go} class="head">
        <!-- <Link href='{routes.rooms}/{room.id' -->
        <Truncate clamp="end">{message?.value || room?.name}</Truncate>
      </div>
      <p on:click={exit} class="pointer">Leave room</p>
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

{#each items as item}
  <Row noGutter>
    <Column>
      <a href="/m/{item.id}">
        <p on:click={goUser(item.user)} class="small pointer">{item.user}</p>
        <p class="message">{item.value}</p>
      </a>
    </Column>
  </Row>
{/each}

<Row noGutter>
  <Column>
    <TextArea on:keydown={keydown} rows={2} bind:ref bind:value />
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
