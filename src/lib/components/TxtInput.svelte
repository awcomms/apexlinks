<script>
  export let ref,
    value = "";
  import { session } from "$app/stores";
  import { routes } from "$lib/utils";
  import { Row, Column, Link, TextInput } from "carbon-components-svelte";
</script>

<div class="input">
  <Row noGutter>
    <Column>
      {#if $session.user}
        <TextInput on:keydown rows={2} bind:ref bind:value />
      {:else}
        <div class="login-prompt">
          <Link href={routes.login}>Login to send txts to this txt</Link>
        </div>
      {/if}
    </Column>
  </Row>
</div>
