<script>
    export let ref
    export let iconDescription = ''
  export let tooltipAlignment = "center";
  export let tooltipPosition = "top";
  export let icon;
  export let kind = "ghost";
  import { Button } from "carbon-components-svelte";
</script>

<Button
  on:click
  bind:ref
  hasIconOnly
  {iconDescription}
  {kind}
  {icon}
  {tooltipPosition}
  {tooltipAlignment}
/>
