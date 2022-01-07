<script>
  export let model = 'user'
  export let item = {};
  import { api } from "$lib/api";
  import Save16 from "carbon-icons-svelte/lib/Save16";
  import { Button } from "carbon-components-svelte";

  const toggle = async () => {
    const param = `unsave_${type}s`;
    const data = {}
    data[param] = [id]
    const res = await api.put(`/${model}`, data);
    if (res.error) {
      console.log('saved error', res.error);
    } else {
      item.saved = res[`${item.type}s_save_toggled`].find(i => i.id === item.id)
      return true;
    }
  };
</script>

<div class:negative={item.saved === false}>
  <Button hasIconOnly icon={Save16} on:click={toggle} />
</div>

<style>
    .negative {
        opacity: 1;
    }
</style>
