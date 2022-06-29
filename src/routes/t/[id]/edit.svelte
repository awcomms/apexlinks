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
  import { Tags } from "$lib/components";

  let deleteLoading;
  let editLoading;

  let { value, tags, about, self, personal } = txt;

  const edit = async () => {
    // editLoading = true
    const res = await api.put("txts", { value, tags, about });
    // .finally(() => editLoading = false);
    if (!res.OK) {
      console.log("txt PUT res: ", res);
    }
    goto(`${routes.txts}/${txt.id}`);
  };

  const del = async () => {
    console.log('del')
    const res = await api.del(`txts/${txt.id}`);
    if (!res.OK){

    console.log("fetch DELETE response: ", res);
    }
    goto(`${routes.txts}`)

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
    <Checkbox bind:checked={self} labelText="disable public replies" />
    <Checkbox
      bind:checked={personal}
      labelText="personal - only you can view this txt"
    />
    <Tags text="Edit this txt's tags" bind:tags />
    <br />
    <TextInput bin:value labelText="Txt value" />
    <br />
    <TextArea
      bind:value={about}
      labelText="About this txt"
      helperText="Works with markdown"
    />
    <br />
    <Button on:click={edit}
      >Edit{#if editLoading}
        <InlineLoading />{/if}</Button
    >
    <Button on:click={()=>open = true}
      >Delete {#if deleteLoading}
        <InlineLoading />{/if}
    </Button>
  </Column>
</Row>
