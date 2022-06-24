<script context="module">
  import { api } from "$lib/utils";
  export const load = async ({ url, fetch }) => {
    const id = url.searchParams.get("id");
    let txt;
    if (id) {
      txt = await api.get(`txts?id=${id}`, fetch);
      if (!txt.OK) {
        return {
          status: Number(txt.STATUS),
          error: txt.error,
        };
      }
    }
    let repliesUrl = id ? `txts?id=${id}` : `txts`;
    let res = await api.get(repliesUrl, fetch);
    if (!res.OK) {
      return {
        status: Number(res.STATUS),
        error: res.error,
      };
    }
    let { items, total, page, pages } = res;

    return {
      props: {
        txt,
        items,
        page,
        pages,
        total,
      },
    };
  };
</script>

<script>
  export let txt, items, total, page, pages;
  import { Row, Column } from 'carbon-components-svelte'
  import Txt from "$lib/components/Txt.svelte";
  import { Tags } from "$lib/components";
  import { routes } from "$lib/utils";
  import { goto } from "$app/navigation";
  import { io } from "socket.io-client";
  // import { socket } from "$lib/utils";

  let add = true;
  const socket = io();
  let tags;
  let room = txt ? String(txt.id) : "home";

  socket.on("connect", () => {
    connect();
  });

  socket.on("txt", async (obj) => {
    if (txt) await api.put(`seen?id=${txt.id}`, {});
    items = [...items, obj];
    // updateScroll()
    add = !add;
  });

  const join = () => {}

  const connect = () => {
    socket.emit("join", room);
  };

  const get = async () => {
    const res = await api.get(
      `txts?tags=${JSON.stringify(tags)}&id=${txt.id}`
    );
    if (!res.OK) {
      console.log(`txt fetch response`, res);
      return;
    }
    ({ items, total, page, pages } = res);
  };

  const send = async ({ detail }) => {
    let data = { value: detail };
    if (txt) data.txt = txt.id;
    await api.post(`txts`, data).then((res) => {
      if (!res.OK) {
        console.log("txt POST response: ", res);
        return;
      }
      socket.emit("txt", { data: res, room });
    });
  };
</script>

<Row noGutter>
  <Column>
    <Tags on:change={get} prefix="search " bind:tags />
  </Column>
</Row>

<Txt
  on:send={send}
  on:connect={connect}
  on:join={join}
  on:titleClick={() => {
    if (txt) goto(`${routes.txts}/${txt.id}/about`);
  }}
  {socket}
  {txt}
  {items}
  {total}
  {add}
  {pages}
  {page}
/>
