<script>
  export let text = "",
    user = null,
    hideUser = false,
    page = 1,
    pages = 1,
    txt = null,
    items = [],
    leaveText = "Remove this txt from your list",
    joinText = "Add this txt to your list";

  import { api, routes } from "$lib/utils";
  import { goto } from "$app/navigation";
  import { TxtInput } from "$lib/components";
  import { Row, Column, Truncate, Link } from "carbon-components-svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import { socket } from "$lib/utils";
  import { session } from "$app/stores";
  import { Tags } from "$lib/components";
  // import { io } from "socket.io-client";
  import { browser } from "$app/env";

  let tags = [];
  let room = txt ? String(txt.id) : "home";

  const dispatch = createEventDispatcher();

  let { user: authUser } = session;

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

  socket.on("connect", () => {
    socket.emit("join", room);
  });

  socket.on("txt", async (obj) => {
    if (txt) await api.put(`seen?id=${txt.id}`, {});
    items = [...items, obj];
    updateScroll();
  });

  const get = async () => {
    const res = await api.get(`txts?tags=${JSON.stringify(tags)}&id=${txt.id}`);
    if (!res.OK) {
      console.log(`txt fetch response`, res);
      return;
    }
    ({ items, total, page, pages } = res);
  };

  const send = async () => {
    let data = { value };
    if (txt) data.txt = txt.id;
    await api.post(`txts`, data).then((res) => {
      if (!res.OK) {
        console.log("txt POST response: ", res);
        return;
      }
      socket.emit("txt", { data: res, room });
    });
  };

  const updateScroll = () => {
    if (!browser) return;
    setTimeout(() => {
      window.scrollTo({ left: 0, top: document.body.scrollHeight });
    }, 0);
  };
</script>

<Row noGutter>
  <Column>
    <Tags on:change={get} prefix="search " bind:tags />
  </Column>
</Row>

{#if !user && txt}
  <Row noGutter>
    <Column>
      <Link href="{routes.txts}/{txt.id}/txt">
        <Truncate>
          txt {txt.id}: {txt.value}
        </Truncate>
      </Link>
    </Column>
  </Row>
{/if}

{#if txt && authUser.id === txt.user.id}
  <Row noGutter>
    <Column>
      <Link href="{routes.txts}/{txt.id}/edit">Edit this txt</Link>
    </Column>
  </Row>
{/if}

<Row noGutter>
  <Column>
    <span>
      {#if user && !hideUser}
        <Link href="{routes.users}/{user.id}/about">
          <Truncate clamp="end">{user.username}</Truncate>
        </Link>
      {/if}
      {#if text}
        <p>{text}</p>
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
