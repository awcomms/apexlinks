<script>
  /*
  join
    
  */
  export let getUrl = "txts",
    dm = false,
    text = "",
    user = null,
    hideUser = false,
    page = 1,
    total = 0,
    labelText = "",
    pages = 1,
    txt = null,
    items = [],
    leaveText = "Leave this txt",
    joinText = "Join this txt";

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
  import LoadingButton from "$lib/components/LoadingButton.svelte";

  const socket = io();

  $: if (sort && !(sort === "tag" && tags.length < 1)) get();

  $: if (deleteTxt) ondeleteTxt();

  let tags = [],
    room = txt ? String(txt.id) : "home",
    getLoading = false,
    deleteTxt,
    deleteLoading = false,
    joinLeaveLoading = false,
    deleteOpen = false,
    sameUser = user && user.id === $session.user.id,
    value,
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
    if (!txt) return;
    joinLeaveLoading = true;
    const res = await api
      .put(`join/${txt.id}`)
      .finally(() => (joinLeaveLoading = false));
    if (!res.OK) {
      console.log("fetch PUT `join/${txt.id} res: ", res);
    }
    txt.joined = res.joined;
  };

  const leave = async () => {
    if (!txt) return;
    joinLeaveLoading = true;
    const res = await api
      .put(`leave/${txt.id}`)
      .finally(() => (joinLeaveLoading = false));
    if (!res.OK) {
      console.log("leave PUT res: ", res);
    }
    txt.joined = res.joined;
    socket.emit("leave", room);
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
    } else if (sort === "old") {
      url = url.concat(`&reverse`);
    }
    if (older && page) url = url.concat(`&page=${page - 1}`);
    const res = await api.get(url).finally(() => (getLoading = false));
    if (!res.OK) {
      console.log(`txt fetch get response`, res);
      return;
    }
    ({ items, total, page, pages } = res);
    console.log(
      "time sort",
      items.sort(
        (a, b) => new Date(a.time).valueOf() - new Date(b.time).valueOf()
      )
    );
  };

  const send = async () => {
    let data = { value };
    if (txt) data.txt = txt.id;
    if (dm) data.dm = true;
    await api
      .post(`txts?include=${JSON.stringify(["user", "value"])}`, data)
      .then((res) => {
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
        <p>
          replies to
          <Link href="{routes.txts}/{txt.id}">
            <Truncate>
              txt {txt.id}: {txt.value}
            </Truncate>
          </Link>
        </p>
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
            <Link href={routes.user(user.id)}>
              {sameUser ? "self" : `${user.username}`}
            </Link>
          </p>
        {/if}
        {#if text}
          <p>{text}</p>
        {/if}
        {#if txt}
          <LoadingButton
            size="small"
            loading={joinLeaveLoading}
            on:click={() => (txt.joined ? leave() : join())}
            >{txt.joined ? leaveText : joinText}</LoadingButton
          >
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
        <RadioButton labelText="new" value="new" />
        <RadioButton labelText="old" value="old" />
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
  {#if sort === ("new" || "old") && pages > 1}
    <Row noGutter>
      <Column>
        <Button size="small" on:click={() => get(true)}>Load more</Button>
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
