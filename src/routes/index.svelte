<script>
import { parseMarkdown } from "$lib/util";

  import { Row, Column, Accordion, AccordionItem } from "carbon-components-svelte";

  let items = [
    {title: 'Txts', description: `
      A txt has a title (its value) and a body and can be replied to. Every reply is a txt
      `},
    {title: 'Users', description: "Users can be found using tags. A `dm` txt can be created which is viewable only be the creator and another user"},
  ]
</script>

<Row noGutter>
  <Column>
    <pre>
    This is a forum site
    </pre>
  </Column>
</Row>

<Row noGutter>
    <Column>
        <Accordion>
            {#each items as {title, description}}
                <AccordionItem title={title}>
                    {@html parseMarkdown(description)}
                </AccordionItem>
            {/each}
        </Accordion>
    </Column>
</Row>
