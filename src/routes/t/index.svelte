<script context="module">
  import { api } from "$lib/utils";
  import { post } from "$lib/utils/fetch";
  export const load = async ({ url, fetch, session }) => {
    let { user: authUser } = session;
    let getUrl = `txts?`;
    let user = url.searchParams.get("user");
    let joined = typeof url.searchParams.get("joined") === "string";

    let res, items, total, page, pages;

    if (user) {
      user = await api.get(`users/${user}`, fetch);
      if (!user.OK) {
        return {
          status: Number(user.STATUS),
          error: user.error,
        };
      }
      getUrl = getUrl.concat(`user=${user.id}`);
    }
    if (joined) {
      getUrl = getUrl.concat(`&joined`);
      res = await post(
        "/send",
        { path: "txts?joined", method: "POST", data: { user: authUser.id } },
        fetch
      );
    } else {
      res = await api.get(getUrl, fetch);
    }
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
        getUrl,
      },
    };
  };
</script>

<script>
  export let items, page, pages, total, getUrl;
  import Txt from "$lib/components/Txt.svelte";
</script>

<Txt labelText="Add a new txt" {getUrl} {items} {page} {pages} {total} />
