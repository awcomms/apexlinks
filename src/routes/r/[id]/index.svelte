<script context="module">
  import { api } from "$lib/utils";
  import { routes } from "$lib/utils";
  export const load = async ({ params, session }) => {
    let user = session.user;
    if (!user) {
      return {
        status: 302,
        redirect: routes.login,
      };
    }
    const { id } = params;
    const room = await api.get(`rooms/${id}`);
    let items, total;
    let res = await api.get(`messages?id=${id}`);
    items = res.items;
    total = res.total;
    if (!Array.isArray(items)) items = [];
    return {
      props: {
        room,
        items,
        total,
        user,
        id,
      },
    };
  };
</script>

<script>
  export let room, items, total, user, id, page;
  import Message from "$lib/components/Message.svelte";
  import { io } from "socket.io-client";
  import { parse } from "cookie";

  const socket = io();

  const send = async (detail) => {
    const { token: auth } = parse(document.cookie);
    api.post('messages', detail)
    socket.emit("msg", detail);
  };
</script>

<Message
  on:send={(e) => send(e.detail)}
  bind:room
  bind:items
  bind:total
  bind:user
  bind:id
  bind:page
/>

<svelte:head>
  <title>{room.name}</title>
</svelte:head>
