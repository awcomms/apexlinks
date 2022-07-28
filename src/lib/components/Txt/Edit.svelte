<script lang='ts'>
  export let txt

  import { Modal, Checkbox, TextInput, TextArea, Button, InlineLoading } from "carbon-components-svelte";
  import { txtEditModalOpen } from '$lib/store'
  import {Tags} from '$lib/components/Tag'
  import { Delete } from '$lib/components/Txt'
  import { api } from '$lib/util'

  let deleteOpen, deleteLoading, editLoading
  let {anon, text, value, self, tags, personal} = txt

  if (!tags) tags = []

  const edit = async () => {
    editLoading = true;
    const res = await api
      .put("txts", { value, tags, text, self, personal, anon, id: txt.id })
      .finally(() => (editLoading = false));
    if (!res.OK) {
      console.log("txt PUT res: ", res);
    }
    $txtEditModalOpen = false
  };
</script>

<Delete {txt} bind:open={deleteOpen} bind:loading={deleteLoading} />

<Modal bind:open={$txtEditModalOpen}>
  {#if !txt.dm}
      <Checkbox bind:checked={anon} labelText="let all replies to this txt be anonymous" />
      <Checkbox bind:checked={self} labelText="disable public replies" />
      <Checkbox
        bind:checked={personal}
        labelText="personal - only you can view this txt"
      />
    {/if}
    <Tags text="edit this txt's tags" bind:tags />
    <br />
    <TextInput bind:value labelText="txt value" />
    <br />
    <TextArea
      bind:value={text}
      labelText="description text about this txt"
      helperText="works with markdown"
    />
    <br />
    <Button on:click={()=>{$txtEditModalOpen = false}}>Cancel</Button>
    <Button as let:props>
      <div on:click={edit} {...props}>
        <p>Edit</p>
        {#if editLoading}
          <div class="right">
            <InlineLoading />
          </div>
        {/if}
      </div>
    </Button>
    <Button as let:props>
      <div on:click={() => (deleteOpen = true)} {...props}>
        <p>Delete</p>
        {#if deleteLoading}
          <div class="right">
            <InlineLoading />
          </div>
        {/if}
      </div>
    </Button>
</Modal>
