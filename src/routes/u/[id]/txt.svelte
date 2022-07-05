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
        redirect: `${routes.login}`,
      };
    }
    const txt = await post(
      "/send",
      { path: `txts/dm?user=${id}`, method: "GET"},
      fetch
    );
    if (!txt.OK) {
      return {
        status: txt.STATUS,
        error: txt.error,
      };
    }
    let { items, total, page, pages } = await api.get(`txts?id=${txt.id}`);
    console.log(items.length)
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

  import Txt from "$lib/components/Txt/Txt.svelte";

  let sameUser = authUser.id === user.id
</script>

<Txt
  leaveText={sameUser
    ? false
    : "Remove this user from dm list"}
  joinText = {
    sameUser ? false : "Add this user to dm list"
  }
  hideUser={sameUser}
  text={sameUser ? 'Txts to self' : `Txts to ${user.username}`}
  {user}
  {txt}
  dm={true}
  bind:items
  bind:total
  bind:page
  bind:pages
/>
