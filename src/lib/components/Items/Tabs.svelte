<script>
  export let add = false;
  export let height = "";
  export let sameUser = false;
  export let user = {};
  export let options = [{
    name: '',
    options: []
  }];
  import { Tabs, Tab, TabContent, Button } from "carbon-components-svelte";
  import Items from "$lib/components/Items/Items.svelte";
  let tabsRef;

  export let parents = [];
  export let children = [];

  let parentsVisible;
  let childrenVisible;

  const tabsHeight = 210;

  const toggleParent = (item) => {
    parents.find((i) => i.id === item.id)
      ? (parents = parents.filter((c) => c !== item))
      : (parents = [...parents, item]);
  };

  const toggleChild = (item) => {
    children.includes(item.id)
      ? (children = children.filter((c) => c !== item))
      : (children = [...children, item]);
  };
</script>

<Tabs>
  <Tab label="Search results" />
  <Tab label="Set Parents" />
  <Tab label="Set Sub Items" />
  <svelte:fragment slot="content">
    <div bind:this={tabsRef}>
      <TabContent>
        <Items
          bind:add
          on:click
          {sameUser}
          bind:options
          {user}
          bind:children
          bind:parents
        />
      </TabContent>
      <TabContent>
        {#if parents.length > 0}
          <Button on:click={() => (parentsVisible = !parentsVisible)}
            >{parentsVisible ? "Hide parents" : "Show parents"}</Button
          >
          {#if parentsVisible}
            <p>Parents</p>
            {#each parents as parent}
              <p>
                id: {parent.id}; {parent.fields.find((f) => f.label === "name")
                  .value}
              </p>
            {/each}
          {/if}
        {/if}

        <Items
              bind:add
          on:click={(e) => toggleParent(e.detail)}
          {user}
          {height}
          {sameUser}
        /></TabContent
      >
      <TabContent>
        {#if children.length > 0}
          <Button on:click={() => (childrenVisible = !childrenVisible)}
            >{childrenVisible ? "Hide children" : "Show children"}</Button
          >
          {#if childrenVisible}
            <p>Children</p>
            {#each children as child}
              <p>
                id: {child.id}; {child.fields.find((f) => f.label === "name")
                  .value}
              </p>
            {/each}
          {/if}
        {/if}<Items
        bind:add
          on:click={(e) => toggleChild(e.detail)}
          {user}
          {height}
          {sameUser}
        /></TabContent
      >
    </div>
  </svelte:fragment>
</Tabs>
