<script>
  export let text = ''
  export let href = ''
  import { page } from "$app/stores";
  import { isSideNavOpen } from "$lib/stores";
  import { SideNavMenuItem } from "carbon-components-svelte";

  $: href = href || `/${text.toLowerCase().replace(" ", "-")}`;

  const click = () => {
    $isSideNavOpen = false;
  };
</script>

<SideNavMenuItem
  isSelected={$page.path == href ? true : false}
  {...$$restProps}
  on:click
  on:click={click}
  bind:href
  bind:text
/>
