<script>
  export let text = ''
  export let href = null
  export let isSelected
  console.log('is', isSelected)
  import { page } from "$app/stores";
  import { isSideNavOpen } from "$lib/stores";
  import { SideNavMenuItem } from "carbon-components-svelte";

  // if (!href) {
  //   console.log('nhr')
  //   href = `/${text.toLowerCase().replace(" ", "-")}`;
  // }

  // if (!isSelected) {
  //   console.log('nis', $page, href)
  //   isSelected = $page.url.pathname === href
  // }

  // $: isSelected = isSelected || $page.url.pathname === href
  // $: href = href || `/${text.toLowerCase().replace(" ", "-")}`;
  $: console.log('pup', isSelected, $page.url.pathname, href)
  $: console.log($page.url.searchParams.get('username'));

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
