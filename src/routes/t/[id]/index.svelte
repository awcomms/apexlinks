<script context="module">
  import { api } from "$lib/util";
  import { allTxtAttributes } from '$lib/var'
  export const load = async ({ params, fetch }) => {
    const { id } = params;
    const txt = await api.get(
      `txts/${id}?include=${JSON.stringify(allTxtAttributes)}`,
      fetch
    );
    if (!txt.OK) {
      return {
        error: txt.error,
        status: Number(txt.STATUS),
      };
    }
    return {
      props: {
        txt,
      },
    };
  };
</script>

<script lang="ts">
  export let txt;

  import { session } from "$app/stores";

  import { Row, Column, Link, Button } from "carbon-components-svelte";
  import { Tags } from "$lib/components";
  import { parseMarkdown } from "$lib/util";
  import { Edit } from "$lib/components/Txt";
  import { goto } from '$app/navigation'
  import { routes } from '$lib/util'

  let { tags, text } = txt,
    editOpen = false;
  if (!tags) tags = [];
  text = parseMarkdown(text);
</script>

<Edit bind:open={editOpen} {txt} />

{#if $session.user && $session.user?.id === txt.user?.id}
  <Row noGutter>
    <Column>
      <Button kind='ghost' size='small' on:click={()=>editOpen = !editOpen}>Edit this txt</Button>
    </Column>
  </Row>
{/if}

<Row noGutter>
  <Column>
    <Link href={routes.txtReplies(txt.id)}>Replies to this txt</Link>
  </Column>
</Row>

<Row noGutter>
  <Column>
    <Link href={`${routes.txt(txt.id)}/to`}>Txts this txt has replied to</Link>
  </Column>
</Row>

{#if txt.user}
  <Row noGutter>
    <Column>
      <Link href={routes.user(txt.user.id)}>Creator of this txt</Link>
    </Column>
  </Row>
{/if}

<Row noGutter>
  <Column>
    <p>txt {txt.id}</p>
    <p>{txt.value}</p>
    <Tags
      {tags}
      editable={false}
      hide={true}
      open={true}
      showHiddenCount={true}
    />
  </Column>
</Row>

<br />

<Row noGutter>
  <Column>
    {@html text}
  </Column>
</Row>
