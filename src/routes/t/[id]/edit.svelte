<script context="module">
  import { api } from "$lib/utils";
  export const load = async ({ params, fetch }) => {
    const { id } = params;
    const txt = await api.get(`txts/${id}`, fetch);
    if (!txt.OK) {
      return {
        error: txt.error,
        status: Number(txt.STATUS),
      };
    }
    return {
      props: {
        txt,
      },
    };
  };
</script>

<script>
  export let txt;

  let open;

  import {
    Row,
    Column,
    Modal,
    Button,
    Checkbox,
    TextInput,
    TextArea,
    InlineLoading,
  } from "carbon-components-svelte";
  import { routes} from '$lib/utils'
  import { goto } from '$app/navigation'
  import { Tags } from "$lib/components";

  console.log(txt.self)
  $: console.log(self)

  let deleteLoading;
  let editLoading;

  let { value, tags, text, self, personal } = txt;
  if (!tags) tags = []

  const edit = async () => {
    editLoading = true;
    const res = await api
      .put("txts", { value, tags, text, self, personal, id: txt.id })
      .finally(() => (editLoading = false));
    if (!res.OK) {
      console.log("txt PUT res: ", res);
    }
    goto(`${routes.txts}/${txt.id}`);
  };

  const del = async () => {
    deleteLoading = true;
    console.log("del");
    const res = await api
      .del(`txts/${txt.id}`)
      .finally(() => (deleteLoading = false));
    if (!res.OK) {
      console.log("fetch DELETE response: ", res);
    }
    goto(`${routes.txts}`);
  };
</script>

<Modal
  danger
  bind:open
  modalHeading="Are you sure you want to delete this txt"
  primaryButtonText="Delete"
  secondaryButtonText="Cancel"
  on:click:button--secondary={() => (open = false)}
  on:click:button--primary={del}
/>

<Row noGutter>
  <Column>
    {#if !txt.dm}
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
      <div on:click={() => (open = true)} {...props}>
        <p>Delete</p>
        {#if deleteLoading}
          <div class="right">
            <InlineLoading />
          </div>
        {/if}
      </div>
    </Button>
  </Column>
</Row>

<style>
  .right {
    float: right;
  }
</style>
