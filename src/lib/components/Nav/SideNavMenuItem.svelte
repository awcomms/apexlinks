<script>
  export let text = ''
  export let href = null
  export let isSelected
  import { isSideNavOpen } from "$lib/stores";
  import { SideNavMenuItem } from "carbon-components-svelte";

  // if (!href) {
  //   href = `/${text.toLowerCase().replace(" ", "-")}`;
  // }

  // if (!isSelected) {
  //   isSelected = $page.url.pathname === href
  // }

  // $: isSelected = isSelected || $page.url.pathname === href
  // $: href = href || `/${text.toLowerCase().replace(" ", "-")}`;

  const click = () => {
    $isSideNavOpen = false;
  };
</script>

<SideNavMenuItem
  bind:isSelected
  {...$$restProps}
  on:click
  on:click={click}
  bind:href
  bind:text
/>
