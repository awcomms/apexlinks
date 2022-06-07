<script>
  export let model = 'user'
  export let item = {};
  import { api } from "$lib/utils";
  import Save from "carbon-icons-svelte/lib/Save.svelte";
  import { Button } from "carbon-components-svelte";

  const toggle = async () => {
    const param = `save_toggle_${item.type}s`;
    const data = {}
    data[param] = [item.id]
    const res = await api.put(`${model}s`, data);
    if (res.error) {
    } else {
      item.saved = res[`${item.type}s_save_toggled`].find(i => i.id === item.id).saved
    }
  };
</script>

<div class:negative={item.saved === false}>
  <Button kind='ghost' size='small' hasIconOnly icon={Save} on:click={toggle} />
</div>

<style>
    .negative {
        opacity: 1;
    }
</style>
