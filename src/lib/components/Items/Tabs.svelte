<script>
  export let add = false;
  export let user = {};
  export let selected = 0;
  export let resultLabelText =
    "Add a new item having the current parents and children";
  export let parentLabelText =
    "Add a new item having the current results as its children";
  export let childLabelText =
    "Add a new item having the current results as its parents";
  export let options = [];

  $: updateItems($items, $parentItems, $childItems);
  $: options = tabs.find((t) => t.type === "result")?.options;
  $: sameUser = $session?.user?.id === user?.id;

  import { session } from "$app/stores";
  import { Tabs, Tab, TabContent, Button } from "carbon-components-svelte";
  import { Items } from "$lib/components";
  import { ItemsTab } from "$lib/components";
  import {
    children,
    childItems,
    parentItems,
    parents,
    items,
    itemTags,
    childTags,
    parentTags,
  } from "$lib/stores";
  import { createEventDispatcher } from "svelte";
  import Users from "$lib/components/Users/Users.svelte";

  const dispatch = createEventDispatcher();

  // -events
  let parentSelectEvent;

  let optEvent = false;
  let tabsRef;
  let searchUser;
  let parentsVisible;
  let childrenVisible;

  const tabs = [
    // {
    //   options,
    //   type: "result",
    //   name: "results",
    //   items: $items,
    //   parents: $parents,
    //   children: $children,
    //   labelText: "Add a new item having the current parents and children",
    //   tags: $itemTags,
    //   onClick: () => dispatch("click"),
    // },
    {
      type: "parent",
      name: "parents",
      items: $parentItems,
      labelText: parentLabelText,
      showOptions: "selected",
      tags: $parentTags,
      selected: $parents,
      onClick: (item, run) => {
        if (item.selected) {
          item.open = true;
        } else {
          run(item);
        }
      },
      onAction: ({ detail }) => {
        const { label, option } = detail;
        $itemTags.find(
          (i) =>
            i.label === label &&
            i.value === option.value &&
            i.exact /*&& i.field*/
        )
          ? ($itemTags = $itemTags.filter(
              (i) => !(i.label === label && i.value === option.value && i.exact)
            ))
          : ($itemTags = [
              ...$itemTags,
              { label, value: option.value, exact: true, field: true },
            ]);
        optEvent = !optEvent;
      },
    },
    {
      type: "child",
      name: "children",
      items: $childItems,
      labelText: childLabelText,
      tags: $childTags,
      selected: $children,
      onClick: (item, run) => {
        if (item.selected) {
          item.open = true;
        } else {
          run(item);
        }
      },
    },
  ];

  const updateItems = () => {
    // tabs.find((t) => t.type === "result").items = $items;
    tabs.find((t) => t.type === "child").items = $childItems;
    tabs.find((t) => t.type === "parent").items = $parentItems;
  };

  const optSelected = (opt) => $itemTags.find((i) => i.value === opt.value);
</script>

<Users
  showSelected
  bind:selected={user}
  on:click={({detail}) => {
    dispatch('click', detail)
  }}
/>
