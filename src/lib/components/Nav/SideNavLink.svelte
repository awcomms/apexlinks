<script>
  export let text = ''
  export let href = ''
  export let custom
  import { page } from "$app/stores";
  import { isSideNavOpen } from "$lib/stores";
  import { SideNavLink } from "carbon-components-svelte";

  $: !custom ? href = `/${text.toLowerCase().replace(" ", "-")}`: {};

  const click = () => {
    $isSideNavOpen = false;
  };
</script>

<SideNavLink
  isSelected={$page.path == href ? true : false}
  {...$$restProps}
  on:click
  on:click={click}
  bind:href
  bind:text
/>
