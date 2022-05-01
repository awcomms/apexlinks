<script>
  export let controls = {
    editable: false,
    selectable: false
  };
  export let option = {
    name: "",
    options: [],
  };

  import { Button } from "carbon-components-svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import ETag from "$lib/components/_Tag.svelte";
  import { onMount} from 'svelte'

  onMount(()=>{
    inputRef.focus()
  })

  let inputRef

  let id = 0;

  const input = (opt) => {
    if (option.options.find(o => o.value === opt.value && o.id !== opt.id)) {
      console.log('found', opt)
      opt.warning = true
    } else {
      opt.warning = false
    }
  }

  const del = (opt) => {
    console.log("del", opt);
    option.options = option.options.filter((o) => {
      return o.value !== opt.value;
    });
    console.log(option.options);
  };

  const add = () => {
    // if (option.options.find((o) => o.value === "")) return;
    option.options = [
      ...option.options,
      {
        id,
        value: "",
        warning: false,
        selected: false,
        editing: false,
      },
    ];
    id++
  };
</script>

<div>
  <input bind:this={inputRef} bind:value={option.name} />
  <!-- <div class="options"> -->
  {#if controls.editable}
    <Button
      iconDescription="Add an option to this option set"
      kind="ghost"
      size="small"
      hasIconOnly
      icon={Add}
      on:click={add}
    />
  {/if}
  {#each option.options as opt}
    <ETag
      inputThrottle={1500}
      on:input={()=>input(opt)}
      on:del={() => del(opt)}
      bind:warning={opt.warning}
      bind:text={opt.value}
      editable={controls.editable}
      focused={opt.focused}
      type={opt.selected ? "cyan" : "gray"}
      on:edit={(e) => {
        opt.editing = true;
      }}
      on:accept={(e) => {
        if (option.options.find((o) => o.value === e.detail && o.id !== opt.id))
          return;
        opt.editing = false;
      }}
      on:click={() => {
        if (!controls.selectable) return
        opt.selected = !opt.selected;
      }}
    />
  {/each}
  <!-- </div> -->
</div>

<style>
  input {
    size: 0;
    border: none;
    background-color: rgba(0, 0, 0, 0);
  }

  input:focus {
    border: none;
  }
</style>