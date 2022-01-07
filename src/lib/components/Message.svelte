<script>
  export let message, room, items, /*page,*/ total, user, id;
  import { goto } from "$app/navigation";
  import { context } from "$lib/stores";
  import { Row, Column, TextArea, Truncate } from "carbon-components-svelte";
  import io from "socket.io-client";
  import { createEventDispatcher, onMount } from "svelte";

  const dispatch = createEventDispatcher();

  // $context = room.name;
  const socket = io();
  // const socket = io("http://dev.localhost:5000")
  let mounted;
  let value;
  let ref;

  $: if (mounted && total > 100 && window.scrollY == 0) {
    get();
  }

  onMount(() => {
    window.scrollTo({ left: 0, top: document.body.scrollHeight });
    mounted = true;
    ref.focus();
  });

  socket.on("connect", () => {
    socket.emit("join", { user: user.id, room: room.id });
  });

  socket.on("msg", async (obj) => {
    await api.put(`seen?id=${id}`, {});
    items = [...items, obj];
    updateScroll();
  });

  const keydown = (e) => {
    switch (e.keyCode) {
      case 13:
        (async()=>await send())()
    }
  };

  const get = async () => {
    res = await api.get(`messages?id=${id}&page=${1}`);
    // res = await api.get(`messages?id=${id}&page=${page+1}`)
    items = res.items;
    total = res.total;
    // if (page) page++
  };

  const exit = async () => {
    socket.emit("leave", { user: user.id, room: room.id });
    await api.put("leave", { id: room.id });
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
    let obj = {user: user.id}
    if (message) {
      obj = {
        ...obj,
        message: message.id,
        reply: true
      }
    } else {
      obj.room = room.id
    }
    dispatch("send", obj);
    updateScroll()
    value = ''
  };

  const updateScroll = () => {
    setTimeout(() => {
      window.scrollTo({ left: 0, top: document.body.scrollHeight });
    }, 0);
  };
</script>

<svelte:window on:keydown={keydown} />

<Row noGutter>
  <Column>
    <span>
      <div on:click={go} class="head">
        <Truncate clamp="end">value: {message?.value || room?.name}</Truncate>
      </div>
      <p on:click={exit} class="pointer">Leave</p>
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
    <TextArea rows={2} bind:ref bind:value />
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
