<script>
  export let add = false;
  export let height = "";
  export let user = {};
  export let selected = 0;
  export let resultLabelText =
    "Add a new item having the current parents and children";
  export let parentLabelText =
    "Add a new item having the current results as its children";
  export let childLabelText =
    "Add a new item having the current results as its parents";
  export let options = [];

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

  const tabsHeight = 210;

  const optSelected = (opt) => $itemTags.find((i) => i.value === opt.value);

  const addTag = ({ detail }) => {
    const { label, option } = detail;
    $itemTags.find(
      (i) =>
        i.label === label && i.value === option.value && i.exact /*&& i.field*/
    )
      ? ($itemTags = $itemTags.filter(
          (i) => !(i.label === label && i.value === option.value && i.exact)
        ))
      : ($itemTags = [
          ...$itemTags,
          { label, value: option.value, exact: true, field: true },
        ]);
    optEvent = !optEvent;
  };
</script>

<Tabs bind:selected>
  <Tab label="Set user" />
  <Tab label="Search results" />
  <Tab label="Set Parents" />
  <Tab label="Set Sub Items" />
  <svelte:fragment slot="content">
    <div bind:this={tabsRef}>
      <!-- user -->
      <TabContent>
        <Users
          showSelected
          bind:selected={user}
          on:click={(e) => {
            user = e.detail;
            selected = 1;
          }}
        />
      </TabContent>

      <!-- results -->
      <TabContent>
        <Items
          {add}
          on:add={({ detail }) =>
            dispatch("add", { type: "result", value: detail.value })}
          labelText={resultLabelText}
          on:click
          {sameUser}
          bind:options
          {user}
          bind:items={$items}
          bind:children={$children}
          bind:parents={$parents}
          bind:tags={$itemTags}
        />
      </TabContent>

      <!-- parents -->
      <TabContent>
        <ItemsTab
          {add}
          {user}
          {sameUser}
          {optEvent}
          {optSelected}
          bind:selected={$parents}
          bind:items={$parentItems}
          bind:tags={$parentTags}
          on:add={({ detail }) =>
            dispatch("add", { type: "parent", value: detail.value })}
          on:action={addTag}
          labelText={parentLabelText}
          showOptions='selected'
          name='parents'
          type='parent'
        />
      </TabContent>

      <!-- children -->
      <TabContent>
        <ItemsTab
          {add}
          {user}
          {sameUser}
          {optEvent}
          {optSelected}
          bind:selected={$children}
          bind:items={$childItems}
          bind:tags={$childTags}
          on:add={({ detail }) =>
            dispatch("add", { type: "child", value: detail.value })}
          labelText={childLabelText}
          name='children'
          type='child'
        />
      </TabContent>
    </div>
  </svelte:fragment>
</Tabs>
