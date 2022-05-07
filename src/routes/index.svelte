<script context="module">
  import { api } from "$lib/api";
  export const load = async ({ url }) => {
    let parents = url.searchParams.get("p");
    parents = parents ? idArgs(parents) : [];

    let children = url.searchParams.get("c");
    children = children ? idArgs(children) : [];

    let username = url.searchParams.get("username");
    const user = await api.get(`users/${username}`);

    // props.countries = await api.get("countries").then((r) => r.items);
    // // let markets = await api.get('markets').then(r => r.items)
    // props.states = await api.get("states").then((r) => r.items);
    // props.cities = await api.get("cities").then((r) => r.items);
    return {
      props: { user: user.error ? null : user, children, parents },
    };
  };
</script>

<script>
  let childrenArgs = [];
  let parentArgs = [];

  export let user;

  export { childrenArgs as children };
  export { parentArgs as parent };

  import Tabs from "$lib/components/Items/Tabs.svelte";
  import { goto } from "$app/navigation";
  import { idArgs, idEqual, ids } from "$lib/utils";
  import { io } from "socket.io-client";
  import {
    children,
    childItems,
    parentItems,
    parents,
    items,
  } from "$lib/stores";

  const socket = io('ws://localhost:5000');

  $children = [...$children, ...childrenArgs];
  $parents = [...$parents, ...parentArgs];

  socket.on("add", (data) => {
    parentsEqual = idEqual(data.children, $items);
    childrenEqual = idEqual(data.parents, $items);
    itemsEqual =
      idEqual(data.parents, $parentItems) &&
      idEqual(data.children, $childItems);
    if (idEqual(data.children, children) && idEqual(data.parents, parents))
      $items = [...$items, data];
  });

  const add = async ({ detail }) => {
    let params = {
      tags: [
        {
          label: "name",
          value: detail.value,
        },
      ],
    };
    switch (detail.type) {
      case "result":
        params.parents = ids($parents);
        params.children = ids($children);
        break;
      case "parent":
        params.children = ids($items);
        break;
      case "child":
        params.parents = ids($items);
    }
    api.post("items", params);
  };

  const go = async (item) => {
    goto(`/i/${item.id}`);
  };
</script>

<!-- TODO-multiple : add -->
<Tabs on:add={add} on:click={({ detail }) => go(detail)} {user} />
