<script>
  export let loading=false, size='small';
  import { Button, InlineLoading } from "carbon-components-svelte";
</script>

<Button as let:props>
  <div on:click {size} {...props}>
    <slot />
    {#if loading}
      <div class="right">
        <InlineLoading />
      </div>
    {/if}
  </div>
</Button>
