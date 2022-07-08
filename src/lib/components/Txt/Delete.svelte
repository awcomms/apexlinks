<script>
  import { api } from "$lib/utils";
  import { session } from "$app/stores";
  import { createEventDispatcher } from "svelte";
  import { Modal, Truncate } from "carbon-components-svelte";
  export let open = false,
    txt = null,
    loading = false;

  const dispatch = createEventDispatcher();

  const del = async () => {
    if (!$session.user?.id) return;
    loading = true;
    const res = await api
      .del(`txts/${txt.id}`)
      .finally(() => (loading = false));
    if (!res.OK) {
      console.log("fetch DELETE response: ", res);
    }
    dispatch("del", txt);
    open = false;
  };
</script>

{#if txt}
  <Modal
    danger
    bind:open
    modalHeading='Are you sure you want to delete txt {txt.id}'
    primaryButtonText="Delete"
    secondaryButtonText="Cancel"
    on:click:button--secondary={() => (open = false)}
    on:click:button--primary={del}
  >
    <p>Delete txt: <Truncate>{txt.value}</Truncate></p>
  </Modal>
{/if}
