<script>
  export let text = ''
<<<<<<< HEAD
  export let href = ''
=======
  export let href = null
>>>>>>> 3ff98b0ab9c6934a76a11777efad186bed52aeda
  export let isSelected
  import { page } from "$app/stores";
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
