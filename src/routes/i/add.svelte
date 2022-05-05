<script context="module">
  export const load = async ({ session }) => {
    const { user } = session;
    if (!user) {
      return {
        status: 302,
        redirect: "/",
      };
    }
    return { props: { user } };
  };
</script>

<script>
  export let user
  import { Row, Column} from 'carbon-components-svelte'
  import Edit from '$lib/components/Items/Edit.svelte'
</script>

<Row>
  <Column>
    <Edit method='post' {user} prompt='Add new item' />
  </Column>
</Row>

<!-- <script>
  let choices = []
  export let user;
  export let item = {
    link: '',
    fields: {
      label: 'name',
      value: ''
    },
    redirect: false,
    choices: [],
    options: [],
    embed: false,
    image: null,
    parents: [],
    children: [],
    tags: []
  }

  import Image from "$lib/components/Image.svelte";
  import Tag from "$lib/components/Tag.svelte";
  import Fields from "$lib/components/Fields/Fields.svelte";
  import {
    Tabs,
    Tab,
    TabContent,
    Row,
    Button,
    Column,
    Checkbox,
    TextInput,
    ButtonSet,
    FluidForm,
  } from "carbon-components-svelte";
  import { goto } from "$app/navigation";
  import { api } from "$lib/api";
  import Items from "$lib/components/Items/Items.svelte";
  import { onMount } from "svelte";

  onMount(() => {
    defaultTabsRefDisplayStyle = tabsRef.style.display;
  });

  $: updateChoices(parents)
  $: link && link.contains("youtube.com") ? yt() : {};

  let nameInvalid;

  const tabsHeight = 210;

  const updateChoices = () => {
    parents.forEach(p => {
      choices = [...choices, p.options]
    })
  }

  let link;
  let fields = [
    {
      label: "Name",
      value: ''
    },
  ];
  let redirect;


  let tabsVisible;
  let defaultTabsRefDisplayStyle;

  let tags = [];
  let loading;
  let image;
  let embed;
  let options = [];

  let tabsRef;

  let parents = [];
  let children = [];

  let childrenVisible = false;
  let parentsVisible = false;

  const yt = () => {
    embed = link.split("watch?v=")[1];
  };

  const keydown = (e) => {
    switch (e.keyCode) {
      case 13:
        if (e.ctrlKey) {
          add();
        }
    }
  };

  const toggleChildrenVisible = () => {
    childrenVisible = !childrenVisible;
  };

  const toggleParentsVisible = () => {
    parentsVisible = !parentsVisible;
  };

  const toggleTabsVisible = () => {
    tabsRef.style.display === defaultTabsRefDisplayStyle
      ? (tabsRef.style.display = "none")
      : (tabsRef.style.display = defaultTabsRefDisplayStyle);
  };

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

  const add = async () => {
    loading = true;

    let data = {
      parents: parents.map(p => p.id),
      children: children.map(c => c.id),
      options,
      tags,
      fields,
      image,
      embed,
    };
    let res = await api.post("items", data).finally((r) => {
      loading = false;
      return r;
    });
    if (res.nameError) {
      nameInvalid = true;
    }
    if (res.id) {
      goto(`/i/${res.id}`);
    }
  };
</script>

<svelte:window on:keydown={keydown} />

<svelte:head>
  <title>Add Item</title>
</svelte:head>

<Image bind:image setPrompt="Set this item's thumbnail image" />

<br />

<Row noGutter>
  <Column>
    {#if parents.length > 0}
      <p>Parents</p>
      {#each parents as parent}
        <p>
          id: {parent.id}; {parent.fields.find((f) => f.label === "name").value}
        </p>
      {/each}
    {/if}

    <br />

    {#if children.length > 0}
      <p>Children</p>
      {#each children as child}
        <p>
          id: {child.id}; {child.fields.find((f) => f.label === "name").value}
        </p>
      {/each}
    {/if}
    <Tabs>
      <Tab on:click={toggleTabsVisible} label="Add parent item" />
      <Tab on:click={toggleTabsVisible} label="Add child item" />
      <svelte:fragment slot="content">
        <div bind:this={tabsRef}>
          <TabContent
            ><Items
              on:click={(e) => toggleParent(e.detail)}
              {user}
              height={tabsHeight}
              sameUser={true}
            /></TabContent
          >
          <TabContent
            ><Items
              on:click={(e) => toggleChild(e.detail)}
              {user}
              height={tabsHeight}
              sameUser={true}
            /></TabContent
          >
        </div>
      </svelte:fragment>
    </Tabs>
  </Column>
</Row>

<br />

<Row noGutter>
  <Column>
    <Tag
      bind:tags
      bind:options
      useOptions={true}
      editable={true}
      selectable={false}
    />
    <br />
    <FluidForm>
      <TextInput labelText="Link" bind:value={link} />
      <Checkbox
        bind:checked={redirect}
        labelText="Let the item's listing redirect to the link"
      />
      {#if yt}
        <Checkbox
          bind:checked={embed}
          labelText="Embed the video in this item's page"
        />
      {/if} -->

      <!-- <br />
      <Fields bind:fields />
    </FluidForm>
  </Column>
</Row>

<Row noGutter>
  <Column>
    <ButtonSet stacked>
      <Button on:click={add}>Add</Button>
    </ButtonSet>
  </Column>
</Row> --> -->
