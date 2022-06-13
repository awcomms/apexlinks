<script>
  export let text = "";
  export let showUseOptions = false;
  export let useOptions = false;
  export let options = [];
  export let editable = false;
  export let selectable = false;
  export let hidable = false;
  export let open = false;
  export let tags = [];
  export let focusLast = false;

  import { notify } from "$lib/stores";
  import Tag from "$lib/components/Tag/Tag.svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import { onMount, createEventDispatcher } from "svelte";
  import {
    Button,
    Checkbox,
    ContextMenu,
    ContextMenuOption,
  } from "carbon-components-svelte";

  $: if (ref && is_focused) ref.focus();

  const dispatch = createEventDispatcher();

  onMount(() => {
    if (focusLast) tags[tags.length - 1]?.ref.focus();
  });

  let tagGroup = false;
  let focused;
  let visible;
  // let value;
  let ref;

  const focus = () => {
    focused = true;
    if (tags.length > 0) open = true;
  };

  const blur = () => {
    focused = false;
    add();
  };

  const keydown = (e) => {
    switch (e.keyCode) {
      case 13:
        if (focused) {
          add();
        }
    }
  };

  const toggleOpen = () => {
    open = !open;
  };

  const toggleTagGroup = () => {
    tagGroup = !tagGroup;
  };

  const initCreate = () => {
    return;
  };

  const add = () => {
    if (tags.find((t) => t.value === "")) {
      let timeout = 2000;
      $notify = {
        kind: "warning",
        timeout,
        title: "Tag not added because of presence of empty tag in tags",
        subtitle: "Remove or edit the empty tag before trying adding a new one",
      };
    }
    tags = [
      ...tags,
      { label: "", value: "", inputRef: null, ref: null, exact: false },
    ];
    // }
  };

  const del = (tag) => {
    tags = tags.filter((t) => t != tag);
    dispatch("change");
  };

  const clear = () => {
    tags = [];
    open = false;
  };
</script>

<svelte:window on:keydown={keydown} />

{#if text}<p>{text}</p>{/if}
<div class="head">
  <p class="title" on:click={toggleOpen}>
    {tags.length}
    {`${tags.length === 1 ? "tag" : "tags"}`}
  </p>
  <Button
    kind="ghost"
    size="small"
    hasIconOnly
    icon={Add}
    on:click={() => {
      add();
      if (!open) toggleOpen();
    }}
    iconDescription="Add a tag"
  />
</div>
<slot />

{#if showUseOptions}
  <Checkbox bind:checked={useOptions} labelText="Use options" />
{/if}

{#if open}
  {#if tags.length > 0}
    <Tag on:click on:click={clear} type="magenta">Clear</Tag>
  {/if}
  {#each tags as tag}
    {#if hidable}
      <ContextMenu target={tag.ref}>
        <ContextMenuOption selectable labelText="Hide" bind:selected={tag.hide} />
      </ContextMenu>
    {/if}

    <Tag
      inputEventDelay={2100}
      on:input={() => dispatch("change")}
      on:enter={add}
      bind:label={tag.label}
      bind:value={tag.value}
      bind:inputRef={tag.inputRef}
      bind:ref={tag.ref}
      filter
      focusOnMount
      editable
      bind:focused
      on:close={del(tag)}
    />
  {/each}
{/if}

<style>
  .head {
    display: grid;
    grid-template-columns: repeat(2, min-content);
  }

  .title {
    width: max-content;
  }
</style>
