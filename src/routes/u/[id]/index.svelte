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
    const txt = await post(
      "/send",
      { path: "txts/users", method: "POST", data: { user: id } },
      fetch
    );
    if (!txt.OK) {
      return {
        status: txt.STATUS,
        error: txt.error,
      };
    }
    let { items, total, page, pages } = await api.get(`txts?id=${txt.id}`);
    return {
      props: {
        txt,
        items,
        total,
        page,
        pages,
        user,
        authUser: session.user,
      },
    };
  };
</script>

<script>
  export let items = [],
    total,
    page,
    pages,
    txt,
    user,
    authUser;

  import Txt from "$lib/components/Txt.svelte";
  import { socket } from "$lib/utils";

  let sameUser = authUser.id === user.id

  const connect = () => {
    socket.emit("join", txt.id);
  };

  const send = async ({ detail: value }) => {
    const data = { txt: txt.id, value };
    await api.post(`txts`, data).then((res) => {
      console.log(res);
      if (!res.OK) {
        console.log("not ok - ", res);
        return;
      }
      socket.emit(
        "txt",
        res
      );
    });
  };
</script>

<Txt
  leaveText={sameUser
    ? false
    : "Remove this user from dm list"}
  on:connect={connect}
  joinText = {
    sameUser ? false : "Add this user to dm list"
  }
  on:send={send}
  {user}
  bind:txt
  bind:items
  bind:total
  bind:page
  bind:pages
/>
