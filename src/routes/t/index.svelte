<script context="module">
  import { api } from "$lib/utils";
  import { post } from "$lib/utils/fetch";
  export const load = async ({ url, fetch, session }) => {
    let res,
      items,
      total,
      page,
      pages,
      include = ["user", "value", "time", "joined", "seen"],
      getUrl = `txts?`,
      user = url.searchParams.get("user"),
      joined = typeof url.searchParams.get("joined") === "string",
      to = typeof url.searchParams.get("to") === "string",
      id = url.searchParams.get("id"),
      props = {};

    if (id) {
      const txt = await post(
        "/send",
        {
          path: `txts/${id}?include=${JSON.stringify(["value", "joined"])}`,
          method: "GET",
        },
        fetch
      );
      if (!txt.OK) {
        return {
          error: txt.error,
          status: Number(txt.STATUS),
        };
      }
      props.txt = txt;
      include.push("joined");
      getUrl = getUrl.concat(`&id=${txt.id}`);
      if (to) {
        props.to = true
        getUrl = getUrl.concat(`&to`)
      }
    }

    if (user) {
      user = await api.get(
        `users/${user}?include=${JSON.stringify(["username"])}`,
        fetch
      );
      if (!user.OK) {
        return {
          status: Number(user.STATUS),
          error: user.error,
        };
      }
      getUrl = getUrl.concat(`&user=${user.id}`);
    }

    if (joined) {
      if (!session.user) {
        return {
          error: JSON.stringify({
            message:
              "query argument `join` was specified in url but no logged in user",
            guide: {
              message: "Click here to login",
              route: `${routes.login}`,
            },
          }),
          status: 400,
        };
      }
      props.joined = true;
      getUrl = getUrl.concat(`&joined`);
    }

    if (to) {
      getUrl = getUrl.concat(`&to`)
    }

    getUrl = getUrl.concat(`&include=${JSON.stringify(include)}`);
    res = await post("/send", { path: getUrl, method: "GET" }, fetch);
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
  export let txt, items, page, pages, total, getUrl;
  import Txt from "$lib/components/Txt/Txt.svelte";
</script>

<Txt
  labelText={txt ? "Reply to this txt" : "Add a new txt"}
  {txt}
  {getUrl}
  {items}
  {page}
  {pages}
  {total}
/>
