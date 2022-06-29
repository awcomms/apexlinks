<script context="module">
  import { api } from "$lib/utils";
  import { post } from '$lib/utils/fetch'
  export const load = async ({ url, fetch, session }) => {
    let { user: authUser } = session;
    let txtsUrl = `txts?`;
    let user = url.searchParams.get("user");
    let joined = typeof url.searchParams.get("joined") === 'string';

    let items, total, page, pages;

    if (user) {
      user = await api.get(`users/${user}`, fetch);
      if (!user.OK) {
        return {
          status: Number(user.STATUS),
          error: user.error,
        };
      }
      txtsUrl = txtsUrl.concat(`user=${user.id}`);
    } else if (joined) {
      let res = await post(
        "/send",
        { path: "txts?joined", method: "POST", data: { user: authUser.id } },
        fetch
      );
      if (!res.OK) {
        return {
          status: Number(res.STATUS),
          error: res.error
        }
      }
      ({ items, total, page, pages } = res);
      return {
      props: {
        items,
        page,
        pages,
        total,
      }}
    }
    let res = await api.get(txtsUrl, fetch);
    if (!res.OK) {
      return {
        status: Number(res.STATUS),
        error: res.error,
      };
    }
    ({ items, total, page, pages } = res);

    return {
      props: {
        items,
        page,
        pages,
        total,
      },
    };
  };
</script>

<script>
  export let items, page, pages, total;
  import Txt from "$lib/components/Txt.svelte";
</script>

<Txt labelText="Add a new txt" {items} {page} {pages} {total} />
