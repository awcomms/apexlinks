<script>
  export let text = ''
  export let href = ''
  import { page } from "$app/stores";
  $: console.log($page.url)
  export let isSelected = $page.url.pathname == href ? true : false
  import { isSideNavOpen } from "$lib/stores";
  import { SideNavLink } from "carbon-components-svelte";

  $: !href && href !== null ? href = `/${text.toLowerCase().replace(" ", "-")}`: {};

  const click = () => {
    $isSideNavOpen = false;
  };
</script>

<SideNavLink
  {isSelected}
  {...$$restProps}
  on:click
  on:click={click}
  bind:href
  bind:text
/>
