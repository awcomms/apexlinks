<script>
  export let vertical = false
  export let useOptions = false;
  export let options = [];
  export let optionControls = {};
  // export let helperText = "";
  export let tags = [];
  export let is_focused = false;
  import EditTag from "$lib/components/Tag/EditTag.svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import Options from "$lib/components/Options/Options.svelte";
  import { createEventDispatcher } from "svelte";
  import {
    Tag,
    Button,
    Checkbox,
    ContextMenu,
    ContextMenuOption,
  } from "carbon-components-svelte";

  // $: if (options) {
  //   // options.forEach((option) => {
  //   //   option.options.forEach((opt) => {
  //   //     if (opt.selected) {
  //   //       tags.push({
  //   //         value: opt.value,
  //   //         exact: true,
  //   //       });
  //   //     }
  //   //   });
  //   // });
  // }

  $: if (ref && is_focused) ref.focus();

  const dispatch = createEventDispatcher();

  let tagGroup = false;
  let focused;
  let visible;
  // let value;
  let open;
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
    if (tags.find(t => t.value === '')) return
    // if (value && !tags.find((t) => t.value === value)) {
    // if (value && !tags.includes(value)){
    tags = [...tags, { value: "", inputRef: null, ref: null, exact: false }];
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

<!-- <TextInput
  bind:ref
  on:focus={focus}
  on:blur={blur}
  bind:value
  bind:helperText
  placeholder={tags.length > 0
    ? `${tags.length} ${tags.length > 1 ? "tags" : "tag"}`
    : "Add tag"}
  {...$$restProps}
/> -->
<p on:click={toggleOpen}>{tags.length} tags</p>
<span
  ><Button
    kind="ghost"
    size="small"
    hasIconOnly
    icon={Add}
    on:click={()=> {add(); if (!open) toggleOpen()}}
    iconDescription="Add a new tag"
  /></span
>
<slot />
<Checkbox bind:checked={useOptions} labelText="Use options" />

{#if open}
  {#if tags.length > 0}
    <Tag on:click on:click={clear} type="magenta">Clear</Tag>
  {/if}
  <!-- {#if tagGroup}
                <Tag on:click={initCreate} type='magenta'>
                    All tag groups
                </Tag>
                <Tag on:click={initCreate} type='magenta'>
                    New tag group
                </Tag>
            {/if} -->
  {#each tags as tag}
    <ContextMenu target={tag.ref}>
      <ContextMenuOption
        labelText="Exact"
        bind:selected={tag.exact}
        on:click={() => {
          tag.exact = !tag.exact;
        }}
      />
    </ContextMenu>

    <EditTag
      inputEventDelay={2000}
      on:input={() => dispatch("change")}
      bind:value={tag.value}
      bind:inputRef={tag.inputRef}
      bind:ref={tag.ref}
      filter
      bind:focused
      on:close={del(tag)}
    />
  {/each}
{/if}

{#if useOptions}
  <Options bind:options bind:controls={optionControls} />
{/if}
