<script>
  export let getUrl = "txts",
    dm = false,
    text = "",
    user = null,
    getOnMount = false,
    hideUser = false,
    page = 1,
    labelText = "",
    pages = 0,
    txt = null,
    items = [],
    leaveText = "Remove this txt from your list",
    joinText = "Add this txt to your list";

  items = items.map((i) => {
    return { ...i, ref: null };
  });

  import { api, routes } from "$lib/utils";
  import { goto } from "$app/navigation";
  import { TxtInput } from "$lib/components";
  import {
    Button,
    ButtonSet,
    RadioButtonGroup,
    RadioButton,
    ContextMenu,
    ContextMenuOption,
    Loading,
    Row,
    Column,
    Truncate,
    Link,
  } from "carbon-components-svelte";
  import { onMount } from "svelte";
  import { session } from "$app/stores";
  import { Delete } from "$lib/components/Txt";
  import { Tags } from "$lib/components";
  import { io } from "socket.io-client";
  import { browser } from "$app/env";

  const socket = io();

  $: if (sort === ("newest" || "oldest") || (sort === "tag" && tags.length > 0))
    get();

  $: if (deleteTxt) ondeleteTxt();

  let tags = [],
    room = txt ? String(txt.id) : "home",
    getLoading,
    deleteTxt,
    deleteLoading,
    deleteOpen = false,
    sameUser = user && user.id === $session.user.id,
    value,
    total,
    ref,
    sort;

  let showInput = $session.user ? true : false;
  if (txt && txt.user && txt.self) {
    console.log("1");
    if (txt.user?.id === $session.user?.id) {
      console.log("2");
      showInput = true;
    } else {
      console.log("3");
      showInput = false;
    }
  }

  onMount(async () => {
    if (getOnMount) {
      console.log("-g", getUrl);
      get();
    }
    if (txt) await api.put(`seen?id=${txt.id}`);
    window.scrollTo({ left: 0, top: document.body.scrollHeight });
    if (ref) ref.focus();
  });

  const ondeleteTxt = () => (deleteOpen = true);

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
    getLoading = true;
    let url = getUrl;
    if (sort === "tag") {
      url = url.concat(`&tags=${JSON.stringify(tags)}`);
    } else if (sort === "oldest") {
      url = url.concat(`&reverse`);
    }
    if (older && page) url = url.concat(`&page=${page - 1}`);
    const res = await api.get(url).finally(() => (getLoading = false));
    if (!res.OK) {
      console.log(`txt fetch get response`, res);
      return;
    }
    ({ total, page, pages } = res);
    items = [...res.items, ...items];
  };

  const send = async () => {
    let data = { value };
    if (txt) data.txt = txt.id;
    if (dm) data.dm = true;
    await api.post(`txts`, data).then((res) => {
      if (!res.OK) {
        console.log("txt POST response: ", res);
        return;
      }
      socket.emit("txt", { data: res, room });
      value = "";
    });
  };

  const updateScroll = () => {
    if (!browser) return;
    setTimeout(() => {
      window.scrollTo({ left: 0, top: document.body.scrollHeight });
    }, 0);
  };

  const remove = (item) => {
    items = items.filter((t) => t.id !== item.id);
  };
</script>

{#if getLoading}
  <Loading />
{/if}

<Delete
  on:del={({ detail }) => remove(detail)}
  txt={deleteTxt}
  bind:open={deleteOpen}
  bind:loading={deleteLoading}
/>

<div class="stick">
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

  <Row noGutter>
    <Column>
      <ButtonSet stacked={true}>
        {#if txt && $session.user.id === txt.user?.id}
          <Link href="{routes.txts}/{txt.id}/edit">Edit this txt</Link>
        {/if}

        {#if user && !hideUser}
          <p>
            Txts to
              <Link href="{routes.user(user.id)}">
                {sameUser ? "self" : `${user.username}`}
              </Link>
          </p>
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
        <div class="head-space" />
      </ButtonSet>
    </Column>
  </Row>

  <Row noGutter>
    <Column>
      <RadioButtonGroup legendText="Sort txts by" bind:selected={sort}>
        <RadioButton labelText="tag search score" value="tag" />
        <RadioButton labelText="newest" value="newest" />
        <RadioButton labelText="oldest" value="oldest" />
      </RadioButtonGroup>
    </Column>
  </Row>

  <br />

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
</div>

<div class="scroll">
  {#if sort === ("newest" || "oldest") && pages > 1}
    <Row noGutter>
      <Column>
        <Button size="small" on:click={() => get(true)}
          >Get {sort === "newest" ? "older" : "newer"} txts</Button
        >
      </Column>
    </Row>
  {/if}

  <br />

  <div class="con">
    {#each items as item}
      {#if $session.user && $session.user.id === item.user?.id}
        <ContextMenu target={item.ref}>
          <Link href={routes.txtEdit(item.id)}>
            <ContextMenuOption labelText="Edit" />
          </Link>
          <ContextMenuOption
            on:click={() => (deleteTxt = item)}
            labelText="Delete"
          />
        </ContextMenu>
      {/if}
      <Row noGutter bind:ref={item.ref}>
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

    {#if showInput}
      <br />
      <TxtInput
        txt={txt ? true : false}
        {labelText}
        on:keydown={keydown}
        bind:value
        bind:ref
      />
    {/if}
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
