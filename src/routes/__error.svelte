<script context='module'>
  export  const load = async({ error, status }) =>{
    return {
      props: {
        error,
        status
      }
    }
  }
</script>

<script>
  export let status = ''
  export let error = ''

  import { Row, Column } from "carbon-components-svelte";

  const dev = process.env.NODE_ENV === "development";
</script>

<Row noGutter>
  <Column lg="{16}">
    <h1>Error code: {status}</h1>
    <div>
      {error.txt || ''}
      <!-- <Link inline href="/">Return home</Link> -->
    </div>
    {#if error && dev && error.stack}
      <div>
        <pre>{error.stack}</pre>
      </div>
    {/if}
  </Column>
</Row>
