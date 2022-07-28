<script context="module">
  import { api, routes } from "$lib/util";
  import { post } from "$lib/util/fetch";

  export const load = async ({ params, session, fetch }) => {
    const { id } = params;
    const include = JSON.stringify(['username'])
    const user = await api.get(`users/${id}?include=${include}`, fetch);
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
    let getUrl = `txts?id=${txt.id}`
    let { items, total, page, pages } = await api.get(getUrl);
    console.log(items?.length)
    return {
      props: {
        txt,
        items,
        getUrl,
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
    getUrl = '',
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
  leaveText={null}
  joinText={null}
  hideUser={sameUser}
  {user}
  {txt}
  {getUrl}
  dm={true}
  bind:items
  bind:total
  bind:page
  bind:pages
/>
