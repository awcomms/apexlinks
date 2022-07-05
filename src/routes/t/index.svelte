<script context="module">
  import { api } from "$lib/utils";
  import { post } from "$lib/utils/fetch";
  export const load = async ({ url, fetch, session }) => {
    let { user: authUser } = session;
    let getUrl = `txts?`;
    let user = url.searchParams.get("user");
    let joined = typeof url.searchParams.get("joined") === "string";

    let props = {}

    let id = url.searchParams.get("id");
    if (id) {
      const txt = await api.get(`txts/${id}`, fetch);
      if (!txt.OK) {
        return {
          error: txt.error,
          status: Number(txt.STATUS),
        };
      }
      props.getOnMount = true
      props.txt = txt
      getUrl = getUrl.concat(`id=${txt.id}`);
    }

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
      if (!session.user) {
        return {
          error: JSON.stringify({
            message: 'query argument `join` was specified in url but no logged in user',
            guide: {
              message: 'Click here to login',
              route: `${routes.login}`
            }
          }),
          status: 400
        }
      }
      getUrl = getUrl.concat(`&joined`);
      return {
        props: {getOnMount: true, getUrl}
      }
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
        ...props,
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
  export let txt, getOnMount, items, page, pages, total, getUrl;
  import Txt from "$lib/components/Txt/Txt.svelte";
</script>

<Txt labelText={txt ? "Reply to this txt" : "Add a new txt"} {txt} {getOnMount} {getUrl} {items} {page} {pages} {total} />
