<script>
  export let method = "put";
  export let user;
  export let item = {
    link: "",
    fields: [
      {
        label: "name",
        value: "",
      },
    ],
    redirect: false,
    choices: [],
    options: [],
    embed: false,
    image: null,
    parents: [],
    children: [],
    tags: [],
  };
  export let prompt = "Edit Item";

  import Image from "$lib/components/Image.svelte";
  import Tag from "$lib/components/Tag/Tags.svelte";
  import Fields from "$lib/components/Fields/Fields.svelte";
  import {
    Tabs,
    Tab,
    TabContent,
    Button,
    Checkbox,
    TextInput,
    ButtonSet,
    FluidForm,
  } from "carbon-components-svelte";
  import { goto } from "$app/navigation";
  import { api } from "$lib/api";
  import Items from "$lib/components/Items/Items.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import Options from "../Options/Options.svelte";

  // const dispatch = createEventDispatcher();

  onMount(() => {
    defaultTabsRefDisplayStyle = tabsRef.style.display;
    tabsRef.style.display = "none";
  });

  // $: console.log("choices", choices);

  $: parents.forEach((p) => updateChoices(p, true));
  $: link && link.contains("youtube.com") ? yt() : {};

  let nameInvalid;

  const tabsHeight = 210;

  let choiceOptions;
  $: choiceOptions = choices.map((c) => c.options);

  const updateChoices = (parent, action) => {
    if (action) {
      choices = [...choices, { id: parent.id, options: parent.options }];
    } else {
      choices.filter((c) => c.id !== parent.id);
    }
  };

  let link = item.link;
  let fields = [
    {
      label: "Name",
      value: "",
    },
  ];
  let redirect;

  let choices = item.choices || [];

  let defaultTabsRefDisplayStyle;

  let tags = item.tags || [];
  let loading;
  let image = item.image;
  let embed = item.embed;
  let options = item.options || [];

  let tabsRef;

  let parents = item.parents || [];
  let children = item.children || [];

  let childrenVisible = false;
  let parentsVisible = false;

  const yt = () => {
    embed = link.split("watch?v=")[1];
  };

  const keydown = (e) => {
    switch (e.keyCode) {
      case 13:
        if (e.ctrlKey) {
          send();
        }
    }
  };

  const toggleChildrenVisible = () => {
    childrenVisible = !childrenVisible;
  };

  const toggleParentsVisible = () => {
    parentsVisible = !parentsVisible;
  };

  const toggleChoice = (choice) => {
    if (choice.selected) {
      if (!tags.find((t) => t.exact && t.value === choice.value)) {
        tags = [...tags, { exact: true, value: choice.value }];
      }
    } else {
      tags = tags.filter((t) => !(t.exact && t.value === choice.value));
    }
  };

  const toggleTabsVisible = () => {
    tabsRef.style.display === defaultTabsRefDisplayStyle
      ? (tabsRef.style.display = "none")
      : (tabsRef.style.display = defaultTabsRefDisplayStyle);
  };

  const toggleParent = (item) => {
    if (parents.find((i) => i.id === item.id)) {
      parents = parents.filter((c) => c !== item);
      updateChoices(item);
    } else {
      parents = [...parents, item];
      updateChoices(item, true);
    }
  };

  const toggleChild = (item) => {
    children.includes(item.id)
      ? (children = children.filter((c) => c !== item))
      : (children = [...children, item]);
  };

  const send = async () => {
    loading = true;

    let data = {
      id: item.id,
      options,
      parents: parents.map((p) => p.id),
      children: children.map((c) => c.id),
      "remove-parents": item.parents.reduce(
        (prev, id) => (parents.find((p) => p.id === id) ? prev : [...prev, id]),
        []
      ),
      "remove-children": item.children.reduce(
        (prev, id) => (children.find((c) => c.id === id) ? prev : [...prev, id]),
        []
      ),
      tags,
      fields,
      image,
      embed,
    };

    let res = await api[method]("items", data).finally((r) => {
      loading = false;
      return r;
    });
    console.log("edit res", res);
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

{#if parents.length > 0}
  <Button on:click={toggleParentsVisible}
    >{childrenVisible ? "Hide children" : "Show children"}</Button
  >
  {#if parentsVisible}
    <p>Parents</p>
    {#each parents as parent}
      <p>
        id: {parent.id}; {parent.fields?.find((f) => f.label === "name").value}
      </p>
    {/each}
  {/if}
{/if}

<br />

{#if children.length > 0}
  <Button on:click={toggleChildrenVisible}
    >{childrenVisible ? "Hide children" : "Show children"}</Button
  >
  {#if childrenVisible}
    <p>Children</p>
    {#each children as child}
      <p>
        id: {child.id};
        {child.fields.find((f) => f.label === "name").value}
      </p>
    {/each}
  {/if}
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

<br />

<Tag
  bind:tags
  bind:options
  useOptions={true}
  optionControls={{ editable: true, selectable: false }}
/>

<br />

{#if choices.length > 1}
  <p>Choices</p>
{/if}

<Options
  title={false}
  bind:options={choiceOptions}
  on:action={(e) => toggleChoice(e.detail)}
  controls={{ selectable: true, editable: false }}
/>

<br />
<FluidForm>
  <TextInput labelText="Link" bind:value={link} />
  <Checkbox
    bind:checked={redirect}
    labelText="Let the item's listing redirect to the link"
  />
  <!-- {#if yt}
        <Checkbox
          bind:checked={embed}
          labelText="Embed the video in this item's page"
        />
      {/if} -->

  <br />
  <Fields bind:fields />
</FluidForm>

<ButtonSet stacked>
  <Button on:click={send}>{prompt}</Button>
</ButtonSet>
