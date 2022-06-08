<script context="module">
  export const load = async ({ params }) => {
    let { id } = params;
    const message = await api.get(
      `messages?model=message&id=${id}&mode=single`
    );
    return { props: { message } };
  };
</script>

<script>
  export let message;
  import { Row, Column } from "carbon-components-svelte";
  import { parseMarkdown } from "$lib/utils/parseMarkdown";

  let text = message.text.markdown ? parseMarkdown(message.text) : message.text;
</script>

<Row noGutter>
  <Column>{@html text}</Column>
</Row>
