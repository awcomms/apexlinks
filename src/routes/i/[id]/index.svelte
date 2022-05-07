<script context="module">
  import { api } from "$lib/api";
  export const load = async ({ session, params }) => {
    let user = session.user;
    let { id } = params;
    let item = await api.get(`items/${id}`);
    if (item.error) {
      return {
        status: item.status,
        error: item.error,
      };
    }
    return {
      props: {
        user,
        item,
      },
    };
  };
</script>

<script>
  export let user;
  export let item;
  import { goto } from '$app/navigation'
  import { Tabs, Tab, TabContent, Tag, Row, Link, Column } from "carbon-components-svelte";
  import { parseMarkdown } from "$lib/utils/parseMarkdown";
import Items from "$lib/components/Items/Items.svelte";

  item.fields = item.fields || [];

  let itext;
  if (item.itext) {
    itext = parseMarkdown(item.itext);
  }

  const go = async (item) => {
      goto(`/i/${item.id}`);
  };
</script>

<Row noGutter>
  {#if item.image}
    <Column lg={2} sm={2} md={2} xlg={2}>
      <img width="100%" alt="item display _image" src={item.image} />
    </Column>
  {/if}
  <Column lg={4} sm={4} md={4} xlg={4}>
    {#if item.name}
      {#if item.redirect && item.link}
        <p class="bold">
          <a class="blank-link" href={item.link || ""}>{item.name}</a>
        </p>
      {:else}
        <p class="bold">{item.name}</p>
      {/if}
    {/if}
    <Link href="/u/{item.user?.username}">Item's user</Link>
    {#if user && user.username == item.user?.username}
      <Link href="/i/{item.id}/edit">Edit item</Link>
    {/if}
  </Column>
</Row>

<br />

<Row no Gutter>
  <Column>
    {#each item.fields as field}
      <div>
        <div class="bold">{field.label}</div>
        {#if field.type === "text"}
          <div>{field.value}</div>
        {:else if field.type === "number"}
          <div>{field.num}</div>
        {:else if field.type === "range"}
          <div>{field.min} - {field.num}</div>
        {/if}
      </div>
    {/each}
  
    {#if !item.redirect && itext}
          <div>{@html itext}</div>
    {/if}
  
    id: {item.id}
    <!-- <p>Tags</p>
    {#each (item.tags || []) as tag}
      <Tag>{tag.value}</Tag>
    {/each} -->
  
    {#if item.embed}
      <div class="embed">
        <iframe
          width="426"
          height="240"
          src="https://www.youtube.com/embed/{item.embed}"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>
    {/if}
  </Column>
</Row>

<style>
  .bold {
    font-weight: 600;
  }
  .blank-link {
    text-decoration: none;
  }
  .blank-link:hover {
    cursor: pointer;
    color: rgb(50, 50, 211);
  }
</style>
