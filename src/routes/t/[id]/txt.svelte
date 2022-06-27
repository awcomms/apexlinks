<script context="module">
  import { api } from "$lib/utils";
  export const load = async ({ params, fetch }) => {
    const { id } = params;
    let txt;
    if (id) {
      txt = await api.get(`txts/${id}`, fetch);
      if (!txt.OK) {
        return {
          status: Number(txt.STATUS),
          error: txt.error,
        };
      }
    }
    if (txt.dm) {
      return {
        status: 401,
        error: `txt ${txt.id} not a public txt`,
      };
    }
    console.log(txt);
    let repliesUrl = id ? `txts?id=${id}` : `txts`;
    let res = await api.get(repliesUrl, fetch);
    if (!res.OK) {
      return {
        status: Number(res.STATUS),
        error: res.error,
      };
    }
    let { items, total, page, pages } = res;

    return {
      props: {
        txt,
        items,
        page,
        pages,
        total,
      },
    };
  };
</script>

<script>
  export let txt, items, total, page, pages;
  import Txt from "$lib/components/Txt.svelte";
</script>

<Txt labelText="Reply to this txt" {txt} {items} {total} {pages} {page} />
