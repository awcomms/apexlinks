<script context="module">
  import { api, routes } from "$lib/utils";
  import { post } from "$lib/utils/fetch";

  export const load = async ({ params, session, fetch }) => {
    const { id } = params;
    const user = await api.get(`users/${id}`, fetch);
    if (!user.OK) {
      return {
        status: user.STATUS,
        error: user.error,
      };
    }
    if (!session.user) {
      return {
        status: 302,
        redirect: `${routes.users}/${id}/about`,
      };
    }
    const room = await post(
      "/send",
      { path: "rooms/users", method: "POST", data: { user: id } },
      fetch
    );
    if (!room.OK) {
      return {
        status: room.STATUS,
        error: room.error,
      };
    }
    let { items, total, page, pages } = await api.get(`messages?id=${room.id}`);
    return {
      props: {
        room,
        items,
        total,
        page,
        pages,
        user,
      },
    };
  };
</script>

<script>
  export let items = [],
    total,
    page,
    pages,
    room,
    user;
  import Message from "$lib/components/Message.svelte";
  import { goto } from "$app/navigation";
  import { socket } from "$lib/utils";

  const connect = () => {
    socket.emit("join", room.id);
  };

  const send = async ({ detail: value }) => {
    const data = { room: room.id, value };
    await api.post(`messages`, data).then((res) => {
      console.log(res);
      if (!res.OK) {
        console.log('not ok - ', res);
        return;
      }
      socket.emit("msg", res, r => console.log('on:msg r', r));
    });
  };
</script>

<Message
  leaveText='Stop receiving messages from this user'
  on:itemClick={({ detail: item }) => goto(`${routes.messages}/${item.id}`)}
  on:titleClick={() => goto(`${routes.users}/${user.id}`)}
  on:connect={connect}
  on:send={send}
  bind:title={user.username}
  bind:room
  bind:items
  bind:total
  bind:page
  bind:pages
/>
