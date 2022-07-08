<script>
  import { Row, Column, Accordion, AccordionItem } from "carbon-components-svelte";

  let items = [
    {title: 'Tag Sorting', description: 'Tags can be used to search'},
    {title: 'Txts', description: `A txt has a title (its value) and a body and can be replied to. Every reply is a txt`},
    {title: 'Users', description: "Users can be found using tags. A `dm` txt can be created which is viewable only be the creator and another user"},
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
