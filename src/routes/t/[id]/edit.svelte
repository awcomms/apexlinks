<script context="module">
  import { api } from "$lib/utils";
  export const load = async ({ params, fetch }) => {
    const { id } = params;
    const include = [ 'value', 'tags', 'txt', 'self', 'personal', 'dm']
    const txt = await api.get(`txts/${id}?include=${JSON.stringify(include)}`, fetch);
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
    Button,
    Checkbox,
    TextInput,
    TextArea,
    InlineLoading,
  } from "carbon-components-svelte";
  import { routes} from '$lib/utils'
  import { goto } from '$app/navigation'
  import { Delete } from '$lib/components/Txt'
  import { Tags } from "$lib/components";

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

</script>

<Delete {txt} bind:open bind:loading={deleteLoading} />

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
