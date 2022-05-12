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

  const socket = io("http://localhost:5000");

  $children = [...$children, ...childrenArgs];
  $parents = [...$parents, ...parentArgs];

  const del = async ({detail}) => {
    console.log($items)
    console.log('.i', detail.item)
    const res = await api.del(`items/${detail.item.id}`)
    switch (detail.type) {
        case "result":
          console.log($items)
          $items = $items.filter(i => i.id !== detail.item.id);
          break;
        case "parent":
          $parentItems = $parentItems.filter(i => i.id !== detail.item.id);
          break;
        case "child":
          $childItems = $childItems.filter(i => i.id !== detail.item.id);
      }
  }

  socket.on("add", (data) => {
    console.log("11add");
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
    let type = null;
    let dict = {
      parent: $parentItems,
      child: $childItems,
      result: $items,
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
    const res = await api.post("items", params);
    console.log(res.id, res.tags);
    if (res.id) {
      switch (detail.type) {
        case "result":
          $items = [...$items, res];
          break;
        case "parent":
          $parentItems = [...$parentItems, res];
          break;
        case "child":
          $childItems = [...$childItems, res];
      }
    }
  };

  const go = async (type, item) => {
    goto(`/${type}/${item.id}`);
  };
</script>

<!-- TODO-multiple : add -->
<Tabs add on:del={del} on:add={add} on:click={({ detail }) => go('u', detail)} {user} />
