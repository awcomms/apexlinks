<script lang="ts">
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
    showInput = true,
    leaveText = "Leave this txt",
    joinText = "Join this txt";

  items = items.map((i) => {
    return { ...i, ref: null, contextMenu: true };
  });

  import { api, routes } from "$lib/util";
  import { TxtInput } from "$lib/components";
  import {
    Button,
    ButtonSet,
    // RadioButtonGroup,
    // RadioButton,
    ContextMenu,
    ContextMenuOption,
    InlineLoading,
    Loading,
    Row,
    Column,
    Truncate,
    Link,
  } from "carbon-components-svelte";
  import { onMount } from "svelte";
  import { session } from "$app/stores";
  import { Edit } from "$lib/components/Txt";
  import { io } from "socket.io-client";
  import { txtEditModalOpen } from "$lib/store";
  import { browser } from "$app/env";
  import LoadingButton from "$lib/components/LoadingButton.svelte";
import { allTxtAttributes } from "$lib/var";

  const socket = io();

  $: if (sort && !(sort === "tag" && tags.length < 1)) get();

  const include = `include=${JSON.stringify(["user", "value", "joined"])}`;

  let tags = [],
    room = txt ? String(txt.id) : "home",
    getLoading = false,
    deleteTxt,
    deleteLoading = false,
    joinLeaveLoading = false,
    deleteOpen = false,
    sameUser = user && user.id === $session.user.id,
    value = "",
    existing = false,
    selectedId,
    editTxt,
    ref,
    sort;

  $: if (selectedId > -1) {
    console.log(selectedId);
    add();
  }

  if (typeof showInput !== "boolean") {
    showInput = $session.user ? true : false;
    if (txt && txt.user && txt.self) {
      if (txt.user?.id === $session.user?.id) {
        showInput = true;
      } else {
        showInput = false;
      }
    }
  }

  onMount(async () => {
    if (txt) await api.put(`seen?id=${txt.id}`);
    window.scrollTo({ left: 0, top: document.body.scrollHeight });
    if (ref) ref.focus();
  });

  const edit = async (item) => {
    let include = `&include=${JSON.stringify(allTxtAttributes)}`
    editTxt = await api.get(`txts/${item.id}?${include}`);
    $txtEditModalOpen = true;
  };

  const join = async (item = null) => {
    let i = item ? item : txt;
    if (!i) return;
    console.log(i);
    if (item) {
      item.joinLeaveLoading = true;
    } else {
      joinLeaveLoading = true;
    }
    const res = await api.put(`join/${i.id}`).finally(() => {
      if (item) {
        item.joinLeaveLoading = false;
      } else {
        joinLeaveLoading = false;
      }
    });
    if (!res.OK) {
      console.log("fetch PUT `join` res: ", res);
    }
    console.log(res);
    i.joined = res.joined;
  };

  const leave = async (item = null) => {
    let i = item ? item : txt;
    if (!i) return;
    if (item) {
      item.joinLeaveLoading = true;
    } else {
      joinLeaveLoading = true;
    }
    const res = await api.put(`leave/${i.id}`).finally(() => {
      if (item) {
        item.joinLeaveLoading = false;
      } else {
        joinLeaveLoading = false;
      }
    });
    if (!res.OK) {
      console.log("leave PUT res: ", res);
    }
    i.joined = res.joined;
  };

  socket.on("connect", () => {
    socket.emit("join", room);
  });

  socket.on("txt", async (obj) => {
    if (txt) await api.put(`seen?id=${txt.id}`, {});
    items = [...items, obj];
    updateScroll();
  });

  const add = async () => {
    console.log(selectedId)
    await api
      .put(`txts?${include}`, { id: selectedId, reply: [txt.id] })
      .then(async(r) => {
        if (!r.OK) {
          console.log("res:", r);
          return;
        }

        items = [...items, r];
        socket.emit("txt", { data: r, room });
        // await get({append: true})
      });
  };

  type GetOptions = {
    older?: boolean;
    append?: boolean
  }

  const get = async (options: GetOptions={older: false, append: false}) => {
    const {older, append} = options
    getLoading = true;
    let url = getUrl;
    if (sort === "tag") {
      url = url.concat(`&tags=${JSON.stringify(tags)}`);
    } else if (sort === "old") {
      url = url.concat(`&reverse`);
    }

    let queryPage = older && page ? page - 1 : page ? page : 'last'
    url = url.concat(`&page=${queryPage}`);
    if (append) url = url.concat(`&append`)
    const res = await api.get(url).finally(() => (getLoading = false));
    if (!res.OK) {
      console.log(`txt fetch get response`, res);
      return;
    }
    ({ total, page, pages } = res);
    ({ items } = res);
  };

  type SendTxt = {
    value: string;
    state: "done" | "sending" | "failed";
    txt?: number;
    dm: boolean;
  };

  type Txt = {
    value: string;
    id: number;
  };

  const resend = async (item: SendTxt) => {
    await api
      .post(`txts?${include}`, item)
      .then((res) => {
        if (!res.OK) {
          item.state = "failed";
          console.log("txt POST response: ", res);
          return;
        }
        item.state = "done";
        socket.emit("txt", { data: res, room });
      })
      .catch(() => (item.state = "failed"));
  };

  const send = async () => {
    let data: SendTxt = {
      value,
      dm,
      txt: txt ? txt.id : null,
      state: "sending",
    };
    let index = items.length;
    items = [...items, data];
    value = "";
    await api
      .post(`txts?${include}`, data)
      .then((res) => {
        if (!res.OK) {
          data.state = "failed";
          console.log("txt POST response: ", res);
          return;
        }
        items[index] = res;
        socket.emit("txt", { data: res, room });
      })
      .catch(() => (data.state = "failed"));
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

{#if editTxt}
  <Edit on:delete={()=>goto(`${routes.txt}?user=${$session.user.id}`)} bind:open={$txtEditModalOpen} txt={editTxt} />
{/if}

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

  <!-- <Row noGutter>
    <Column>
      <RadioButtonGroup legendText="Sort txts by" bind:selected={sort}>
        <RadioButton labelText="tag search score" value="tag" />
        <RadioButton labelText="new" value="new" />
        <RadioButton labelText="old" value="old" />
      </RadioButtonGroup>
    </Column>
  </Row> -->

  <br />

  <!-- {#if sort === "tag"}
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
  {/if} -->
</div>

<div class="scroll">
  <Row noGutter>
    <Column>
      <p>total: {total}</p>
    </Column>
  </Row>
  {#if pages > 1}
    <Row noGutter>
      <Column>
        <Button size="small" on:click={() => get({older: true, append: true})}>Load more</Button>
      </Column>
    </Row>
  {/if}

  <br />

  <div class="con">
    {#each items as item}
      <div bind:this={item.ref}>
        {#if $session.user}
          <ContextMenu bind:target={item.userRef}>
            {#if item.state === "failed"}
              <ContextMenuOption
                labelText="Retry"
                on:click={() => resend(item)}
              />
            {/if}
            <!-- <ContextMenuOption disabled={item.joinLeaveLoading} on:click={()=>item.joined ? leave(item) : join(item)} labelText={item.joined ? "Leave" : "Join"}>
              <div slot='shortcutText'>
                {#if item.joinLeaveLoading}
                  <InlineLoading />
                {/if}
              </div>
            </ContextMenuOption> -->
            {#if $session.user.id === item.user?.id}
              <ContextMenuOption on:click={() => edit(item)} labelText="Edit" />
            {/if}
            <!-- <ContextMenuOption
              on:click={() => {
                item.contextMenu = true;
                item.ref.dispatchEvent(
                  new CustomEvent("contextmenu", {
                    bubbles: true,
                    cancelable: false,
                    view: window,
                    button: 2,
                    buttons: 0,
                    clientX: item.ref.getBoundingClientRect().x,
                    clientY: item.ref.getBoundingClientRect().y,
                  })
                );
              }}
              labelText="Open native context menu"
            /> -->
          </ContextMenu>
        {/if}
        <Row noGutter>
          <Column>
            {#if !user || (user && $session.user.id !== user.id)}
              <Link href={routes.user(item.user?.id)}>
                <p class="small pointer">
                  {item.user?.username}
                </p>
              </Link>
            {/if}

            <div bind:this={item.userRef}>
              {#if item.state && item.state !== "done"}
                <p class={`${item.state} not-done`}>{item.value}</p>
              {:else}
                <Link href={routes.txtReplies(item.id)}>
                  {item.value}
                </Link>
              {/if}
            </div>
          </Column>
        </Row>
      </div>
    {/each}

    {#if showInput}
      <br />
      <TxtInput
        {txt}
        {labelText}
        on:send={send}
        on:add={add}
        bind:selectedId
        bind:value
        bind:existing
        bind:ref
      />
    {/if}
  </div>
</div>

<style lang="sass">
  @use '@carbon/type'
  
  .not-done
    @include type.type-style('body-compact-01')

  .failed 
    color: red
  .sending 
    color: grey
  .stick 
    position: sticky
  .scroll 
    display: grid
  .con 
    /* overflow-y:scroll */
    display: grid
    row-gap: 0.37rem
    width: 100%
  .pointer 
    cursor: pointer
  .small 
    color: grey
    font-size: 0.75rem
  .head-space 
    height: 0.5rem
</style>
