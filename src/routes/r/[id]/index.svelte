<script context="module">
  import { api } from "$lib/utils";
  import { routes } from "$lib/utils";
  export const load = async ({ url, params, fetch }) => {
    const m = url.searchParams.get('m') !== null
    const { id } = params;
    let roomUrl = m ? `messages?model=message&id=${id}&mode=single` : `rooms/${id}`;
    let room = await api.get(roomUrl, fetch);
    if (!room.OK) {
      return {
        status: room.STATUS,
        error: room.error
      }
    }
    let messagesUrl = `messages?id=${id}`
    if (m) {
      messagesUrl = messagesUrl.concat(`&model=message&mode=replies`)
    }
    const res = await api
      .get(messagesUrl, fetch)
    if (!res.OK) {
      return {
        error: res.error,
        status: res.STATUS
      }
    }
    let { items, total, page, pages } = res;
    return {
      props: {
        page,
        pages,
        room,
        items,
        total,
      },
    };
  };
</script>

<script>
  export let room, items, total, user, page, pages;
  import Message from "$lib/components/Message.svelte";
  import { io } from "socket.io-client";
  import { goto } from "$app/navigation";

  const socket = io();

  const connect = async () => {
    await api.put(`join/${room.id}`).then((res) => {
      if (!res.OK) {
        console.log(res);
        return;
      }
      socket.emit("join", room);
    });
  };

  const send = async ({ detail: value }) => {
    let data = { value, room: room.id };
    await api.post("messages", data).then((message) => {
      socket.emit("msg", message);
      items = [...items, message]
    });
  };
</script>

<Message
  on:itemClick={({ detail: item }) => goto(`${routes.messages}/${item.id}`)}
  on:titleClick={() => {
    goto(`${routes.rooms}/${room.id}/about`)
  }}
  on:connect={connect}
  on:send={send}
  title={room.name}
  bind:room
  bind:items
  {total}
  {user}
  bind:page
  {pages}
/>

<svelte:head>
  <title>{room.name}</title>
</svelte:head>
