<script context="module">
  import { api } from "$lib/utils";
  import { routes } from "$lib/utils";
  export const load = async ({ params, session }) => {
    let { user } = session;
    if (!user) {
      return {
        status: 302,
        redirect: routes.login,
      };
    }
    const { id } = params;
    const room = await api.get(`rooms/${id}`);
    const res = await api.get(`messages?id=${id}`);
    let {items, total, page, pages} = res
    if (!Array.isArray(items)) items = [];
    return {
      props: {
        page,
        pages,
        room,
        items,
        total,
        user,
      },
    };
  };
</script>

<script>
  export let room, items, total, user, page, pages;
  import Message from "$lib/components/Message.svelte";
  import { io } from "socket.io-client";

  const socket = io();

  const send = async (detail) => {
    await api
      .post("messages", detail)
      .then((message) => {socket.emit("msg", message)});
  };
</script>

<Message
  on:send={(e) => send(e.detail)}
  bind:room
  {items}
  {total}
  {user}
  bind:page
  {pages}
/>

<svelte:head>
  <title>{room.name}</title>
</svelte:head>
