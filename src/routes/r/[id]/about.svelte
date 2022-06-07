<script context="module">
  import { api } from "$lib/utils";
  import { routes } from "$lib/utils";
  import { parseMarkdown } from "$lib/utils/parseMarkdown";
  export const load = async ({ params, session }) => {
    let { user } = session;
    if (!user) {
      return {
        status: 302,
        redirect: routes.login,
      };
    }
    const { id } = params;
    const room = await api.get(`rooms/${id}`);
    return { props: { room } };
  };
</script>

<script>
  export let room;
  import { Row, Column, Button } from "carbon-components-svelte";
  import { goto } from "$app/navigation";
  import { session } from "$app/stores";

  let about = parseMarkdown(room.about);
</script>

<Row>
  <Column>
    {#if $session.user.id === room.user.id}
      <Button on:click={() => goto(`${routes.rooms}/${room.id}/edit`)}
        >Edit this room</Button
      >
    {/if}
    {@html about}
  </Column>
</Row>
