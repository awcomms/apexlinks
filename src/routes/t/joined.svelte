<script context="module">
  import { api } from "$lib/utils";
  export const load = async ({ url, fetch }) => {
    let txtsUrl = `txts`
    let user = url.searchParams.get("user");

    if (user) {
      user = await api.get(`users/${user}`, fetch)
      if (!res.OK) {
        return {
          status: Number(res.STATUS),
          error: res.error
        }
      }
      txtsUrl = txtsUrl.concat(`user=${user.id}`);
    }
    let res = await api.get(txtsUrl, fetch);
    if (!res.OK) {
      return {
        status: Number(res.STATUS),
        error: res.error,
      };
    }
    let { items, total, page, pages } = res;

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
