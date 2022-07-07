<script>
  export let loading=false, size='small';
  import { Button, InlineLoading } from "carbon-components-svelte";
</script>

<Button {size} as let:props>
  <div on:click {...props}>
    <slot />
    {#if loading}
      <div class="right">
        <InlineLoading />
      </div>
    {/if}
  </div>
</Button>
