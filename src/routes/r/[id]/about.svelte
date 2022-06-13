<script context="module">
  import { api } from "$lib/utils";
  import { routes } from "$lib/utils";
  import { parseMarkdown } from "$lib/utils/parseMarkdown";
  export const load = async ({ params, session, fetch }) => {
    const m = url.searchParams.get("m") !== null;
    const { id } = params;
    let itemUrl = m
      ? `messages?model=message&id=${id}&mode=single`
      : `rooms/${id}`;
    let item = await api.get(itemUrl, fetch);
    if (!item.OK) {
      return {
        status: item.STATUS,
        error: item.error,
      };
    }
    return { props: { item, room: !m } };
  };
</script>

<script>
  export let item = {};
  export let room = false;
  import { Row, Column, Button, Tag } from "carbon-components-svelte";
  import { goto } from "$app/navigation";
  import { session } from "$app/stores";

  let about = parseMarkdown(item.about);
</script>

<Row noGutter>
  <Column>
    {#if $session.user.id === item.user.id}
      <Button
        size="small"
        on:click={() => goto(`${routes.rooms}/${item.id}/edit${room ? '': '?m'}`)}>Edit</Button
      >
    {/if}
    <Button size="small" on:click={() => goto(`${routes.rooms}/${item.id}`)}
      >{room ? 'Go to chat room' : 'Go to this messages replies'}</Button
    >
  </Column>
</Row>

<Row noGutter>
  <Column>
    <h1>{item.name}</h1>
  </Column>
</Row>

<Row noGutter>
  <Column>
    {#each item.tags as tag}
      <Tag>{tag.value}</Tag>
    {/each}
  </Column>
</Row>

<br />

<Row noGutter>
  <Column sm={8} md={8} lg={8} xlg={8}>
    {@html about}
  </Column>
</Row>
