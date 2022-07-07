<script>
    export let size='small', loading = false

    import {LoadingButton} from "$lib/components";
    import {Row, Column} from 'carbon-components-svelte'
</script>

    <Row noGutter>
      <Column>
        <LoadingButton {loading} {size} on:click>Load more</LoadingButton>
      </Column>
    </Row>