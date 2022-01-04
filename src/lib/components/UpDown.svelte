<script>
  import { ChevronDownGlyph, ChevronUpGlyph } from "carbon-icons-svelte";
  import { createEventDispatcher } from "svelte";
  import IconButton from "$lib/components/IconButton.svelte";
  import { onMount  } from "svelte";

  let up;
  let down;

  onMount(() => {
    up.onmousedown = () => dispatch("mousedown", true);
    up.onmouseup = () => dispatch("mouseup", true);
    down.onmousedown = () => dispatch("mousedown", false);
    down.onmouseup = () => dispatch("mouseup", false);
  });
  const dispatch = createEventDispatcher();
</script>

<IconButton
  bind:ref={down}
  tooltipPosition="left"
  on:click={() => dispatch("click", false)}
  icon={ChevronDownGlyph}
/>
<IconButton
  bind:ref={up}
  tooltipPosition="right"
  on:click={() => dispatch("click", true)}
  icon={ChevronUpGlyph}
/>
