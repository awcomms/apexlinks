<script>
  export let text = "",
    user = null,
    hideUser = false,
    page = 1,
    labelText = "",
    pages = 0,
    txt = null,
    items = [],
    leaveText = "Remove this txt from your list",
    joinText = "Add this txt to your list";

  import { api, routes } from "$lib/utils";
  import { goto } from "$app/navigation";
  import { TxtInput } from "$lib/components";
  import {
    Button,
    RadioButtonGroup,
    RadioButton,
    Row,
    Column,
    Truncate,
    Link,
  } from "carbon-components-svelte";
  import { onMount } from "svelte";
  import { session } from "$app/stores";
  import { Tags } from "$lib/components";
  import { io } from "socket.io-client";
  import { browser } from "$app/env";

  const socket = io();

  $: if (sort === ("newest" || "oldest") || (sort === "tag" && tags.length > 0))
    get();

  let tags = [];
  let room = txt ? String(txt.id) : "home";

  let { user: authUser } = $session;

  let value;
  let total;
  let ref;

  let sort;

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

  const join = async () => {
    const res = await api.put(`join/${txt.id}`);
    if (!res.OK) {
      console.log("fetch PUT `join/${txt.id} res: ", res);
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

  const get = async (older) => {
    let url = `txts`;
    if (sort === "tag") {
      url = url.concat(`?tags=${JSON.stringify(tags)}`);
    } else if (sort === "oldest") {
      url = url.concat(`?reverse=1`);
    }
    if (older && page) url = url.concat(`&page=${page - 1}`);
    if (txt) url = url.concat(`&id=${txt.id}`);
    const res = await api.get(url);
    if (!res.OK) {
      console.log(`txt fetch response`, res);
      return;
    }
    ({ total, page, pages } = res);
    items = [...res.items, ...items];
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
      value = ""; //TODO-option
    });
  };

  const updateScroll = () => {
    if (!browser) return;
    setTimeout(() => {
      window.scrollTo({ left: 0, top: document.body.scrollHeight });
    }, 0);
  };
</script>

<div class="stick">
  <Row noGutter>
    <Column>
      <RadioButtonGroup legendText="Sort txts by" bind:selected={sort}>
        <RadioButton labelText="tag score" value="tag" />
        <RadioButton labelText="newest" value="newest" />
        <RadioButton labelText='oldest' value='oldest'/>
      </RadioButtonGroup>
    </Column>
  </Row>

  {#if sort === "tag"}
    <Row noGutter>
      <Column>
        <Tags
          text="Add tags to search for txts"
          on:change={get}
          prefix="search "
          bind:tags
        />
      </Column>
    </Row>
  {/if}

  {#if !user && txt}
    <Row noGutter>
      <Column>
        <Link href="{routes.txts}/{txt.id}">
          <Truncate>
            txt {txt.id}: {txt.value}
          </Truncate>
        </Link>
      </Column>
    </Row>
  {/if}

  {#if txt && authUser.id === txt.user?.id}
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
              <Button size="small" on:click={exit} class="pointer"
                >{leaveText}</Button
              >
            {/if}
          {:else if joinText}
            <Button size="small" on:click={join} class="pointer"
              >{joinText}</Button
            >
          {/if}
        {/if}
        <br />
      </span>
      <div class="head-space" />
    </Column>
  </Row>
</div>

<div class="scroll">
  {#if sort === ("newest" || "oldest") && pages > 1}
    <Row noGutter>
      <Column>
        <Button size="small" on:click={() => get(true)}>Get older txts</Button>
      </Column>
    </Row>
  {/if}

  <br />

  <div class="con">
    {#each items as item}
      <Row noGutter>
        <Column>
          <div>
            <Link href={routes.user(item.user?.id)}>
              <p class="small pointer">
                {item.user?.username}
              </p>
            </Link>
          </div>
          <Link href={routes.txtTxt(item.id)}>
            {item.value}
          </Link>
        </Column>
      </Row>
    {/each}

    <br />
    <TxtInput
      txt={txt ? true : false}
      {labelText}
      on:keydown={keydown}
      bind:value
      bind:ref
    />
  </div>
</div>

<style>
  .stick {
    position: sticky;
  }
  .scroll {
    display: grid;
  }
  .con {
    /* overflow-y:scroll; */
    display: grid;
    row-gap: 0.37rem;
    width: 100%;
  }
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
