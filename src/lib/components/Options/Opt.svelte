<script>
    export let opt = {value: '', invalid: false, focused: false}
    export let valid = true
    export let editable = false
    export let selectable = false
    import ETag from '$lib/components/Tag/_Tag.svelte'
      import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  $: valid = !opt.invalid
</script>

<ETag
      inputEventDelay={1500}
      on:input
      on:del
      bind:warning={opt.invalid}
      bind:text={opt.value}
      bind:editable
      focused={opt.focused}
      type={opt.selected ? "cyan" : "gray"}
      on:click={() => {
        console.log('sel', selectable)
        if (!selectable) return;
        opt.selected = !opt.selected;
        dispatch("action", opt);
      }}
    />