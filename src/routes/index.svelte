<script>
  import { Row, Column, Accordion, AccordionItem } from "carbon-components-svelte";

  let items = [
    {title: 'Tag Sorting', description: 'Tags can be used to search'},
    {title: 'Txts', description: 'Txts are items that can be replied to, replies are also txts'},
  ]
</script>

<Row noGutter>
  <Column>
    <pre>
    This is primarily a forum site
    </pre>
  </Column>
</Row>

<Row noGutter>
    <Column>
        <Accordion>
            {#each items as item}
                <AccordionItem title={item.title}>
                    <p>{item.description}</p>
                </AccordionItem>
            {/each}
        </Accordion>
    </Column>
</Row>
