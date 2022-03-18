<script>
  export let helperText = "";
  export let tags = [];
  export let is_focused = false;
  import { createEventDispatcher } from "svelte";
  import {
    Row,
    Tag,
    Column,
    TextInput,
    ContextMenu,
    ContextMenuOption,
  } from "carbon-components-svelte";

  $: if (ref && is_focused) ref.focus();

  const dispatch = createEventDispatcher();

  let tagGroup = false;
  let focused;
  let value;
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

  const toggleTagGroup = () => {
    tagGroup = !tagGroup;
  };

  const initCreate = () => {
    return;
  };

  const add = () => {
    if (value && !tags.find((t) => t.value === value)) {
      // if (value && !tags.includes(value)){
      tags = [...tags, { value, target: null, exact: false }];
      open = true;
      value = "";
    }
    dispatch("change");
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

<Row noGutter>
  <Column xlg={4} lg={4} md={4} sm={4}>
    <TextInput
      bind:ref
      on:focus={focus}
      on:blur={blur}
      bind:value
      bind:helperText
      placeholder={tags.length > 0
        ? `${tags.length} ${tags.length > 1 ? "tags" : "tag"}`
        : "Add tag"}
      {...$$restProps}
    />
    <slot />
  </Column>
</Row>

{#if open}
  <Row noGutter>
    <Column xlg={4} lg={4} md={4} sm={4}>
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
        <ContextMenu target={tag.target}>
          <ContextMenuOption
            labelText="Exact"
            bind:selected={tag.exact}
            on:click={() => {
              tag.exact = !tag.exact;
              console.log(tag.exact);
            }}
          />
        </ContextMenu>

        <Tag bind:ref={tag.target} filter on:click={del(tag)}>{tag.value}</Tag>
      {/each}
    </Column>
  </Row>
{/if}
