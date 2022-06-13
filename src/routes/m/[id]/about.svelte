<script context="module">
  export const load = async ({ params, fetch }) => {
    let { id } = params;
    const message = await api.get(
      `messages?model=message&id=${id}&mode=single`, fetch
    );
    return { props: { message } };
  };
</script>

<script>
  export let message;
  import { Row, Column } from "carbon-components-svelte";
  import { parseMarkdown } from "$lib/utils/parseMarkdown";

  let about = message.about.markdown ? parseMarkdown(message.about) : message.about;
</script>

<Row noGutter>
  <Column>{@html about}</Column>
</Row>
