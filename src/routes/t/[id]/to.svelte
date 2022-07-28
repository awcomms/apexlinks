<script context="module" lang="ts">
  import { post, get } from "$lib/util/fetch";
  export const load = async ({ params, fetch }) => {
    const { id } = params;
    const include = `&include=${JSON.stringify(["value", "user", "joined"])}`;
    const txt = await post(
      "/send",
      { path: `txts/${id}?${include}`, method: "GET" },
      fetch
    );
    if (!txt.OK) {
      return {
        error: txt.error,
        status: txt.STATUS,
      };
    }

    const getUrl = `txts/to?id=${id}`;

    const res = await post("/send", { path: getUrl, method: "GET" }, fetch);

    if (!res.OK) {
      return {
        error: res.error,
        status: txt.STATUS,
      };
    }

    const { items, page, pages, total } = res;

    console.log(res)

    return {
      props: {
        txt,
        getUrl,
        items,
        page,
        pages,
        total,
      },
    };
  };
</script>

<script lang="ts">
  export let items, page, pages, total, txt, getUrl;

  // import { session } from '$app/stores'
  // let {user} = $session

  import { Row, Column } from "carbon-components-svelte";
  import Txt from "$lib/components/Txt";
</script>

<Row noGutter>
  <Column>
    <Txt
      {txt}
      {getUrl}
      {items}
      {page}
      {pages}
      {total}
    />
  </Column>
</Row>
