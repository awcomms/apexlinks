<script lang="ts">
  export let open, txt, include, current;

  import {
    Modal,
    Checkbox,
    TextInput,
    TextArea,
    Button,
    InlineLoading,
  } from "carbon-components-svelte";
  // import { goto } from '$app/navigation'
  // import { session } from '$app/stores'
  import { Tags } from "$lib/components/Tag";
  import { api } from "$lib/util";
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  let deleteLoading = false, editLoading = false, deleteRequest = false, removeLoading = false;
  let { anon, text, value, self, tags, personal } = txt

  $: update(txt)

  if (!tags) tags = [];

  const update = (_: any) => {
    ({ anon, text, value, self, tags, personal } = _)
    deleteRequest = false
  }

  const remove = async() => {
    await api.put(`txts?${include}`, { id: txt.id, unreply: [current.id]}).then(res => {
      if (!res.OK){
        console.log('`remove as child` api response', res)
        return
      }
      dispatch('remove', txt.id)
    })
  }

  const edit = async () => {
    editLoading = true;
    const res = await api
      .put(`txts?${include}`, { value, tags, text, self, personal, anon, id: txt.id })
      .finally(() => (editLoading = false));
    if (!res.OK) {
      console.log("txt PUT res: ", res);
    }
    dispatch('edit', res)
    open = false;
  };

  const del = async () => {
    deleteLoading = true
    const res = await api.del(`txts/${txt.id}`).then(res => {
      if (!res.OK) {
        console.log('txt delete response: ', res)
        return
      }
      dispatch('del', txt.id)
      // goto(`${routes.txt}?user=${$session.user.id}`)
    }).finally(()=>deleteLoading = false)
  }
</script>

<Modal modalHeading='Edit txt {txt.id}' passiveModal bind:open>
  {#if !txt.dm}
    <Checkbox
      bind:checked={anon}
      labelText="let all replies to this txt be anonymous"
    />
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
  <Button
    on:click={() => {
      open = false;
    }}>Cancel</Button
  >
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
    <div on:click={remove} {...props}>
      <p>Remove as child</p>
      {#if removeLoading}
        <div class="right">
          <InlineLoading />
        </div>
      {/if}
    </div>
  </Button>
  {#if deleteRequest}
    <Button on:click={()=>deleteRequest=false}>Cancel delete</Button>
    <Button kind='danger' as let:props>
      <div on:click={del} {...props}>
        <p>if you're sure, confirm delete</p>
        {#if deleteLoading}
          <div class="right">
            <InlineLoading />
          </div>
        {/if}
      </div>
    </Button>
  {:else}
    <Button on:click={()=> deleteRequest = true}>
      Delete
    </Button>
  {/if}
</Modal>
