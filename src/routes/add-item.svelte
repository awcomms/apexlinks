<!-- 
<script context="module">
    export  const load = async({ session }) => {
        const user = session.user
        if (!user) {
            return {
                status: 302,
                redirect: '/'
            }
        }
    }
</script> -->
<script>
  import Image from "$lib/components/Image.svelte";
  import Tag from "$lib/components/Tag.svelte";
  import Input from "$lib/components/Input/Input.svelte";
  import {
    Row,
    Button,
    Column,
    Checkbox,
    TextArea,
    TextInput,
    ButtonSet,
    FluidForm,
  } from "carbon-components-svelte";
  import { goto } from "$app/navigation";
  import { api } from "$lib/api";

  let nameInvalid;

  let link;
  let name;
  let fields;
  let redirect;

  let tags = [];
  let loading;
  let image;

  const keydown = (e) => {
    switch (e.keyCode) {
      case 13:
        if (e.ctrlKey) {
          add();
        }
    }
  };

  const add = async () => {
    loading = true;
    let data = {
      tags,
      fields,
      image,
    };
    let res = await api.post("items", data).finally((r) => {
      loading = false;
      return r;
    });
    if (res.nameError) {
      nameInvalid = true;
    }
    if (res.id) {
      goto(`/i/${res.id}`);
    }
  };
</script>

<svelte:window on:keydown={keydown} />


<svelte:head>
  <title>Add Item</title>
</svelte:head>

<Image bind:image />

<Tag bind:tags />

<Row noGutter>
  <Column>
    <FluidForm>
      <Input
        bind:invalid={nameInvalid}
        invalidText="Name taken"
        labelText="Name"
        bind:value={name}
      />
      <Checkbox
        bind:checked={redirect}
        labelText="Let the item's listing redirect to a link"
      />
      {#if redirect}
        <TextInput labelText="Link" bind:value={link} />
      {/if}
      {#if !redirect}
        <Row noGutter>
          <Column>
            <Fields bind:fields />
          </Column>
        </Row>
      {/if}
    </FluidForm>
  </Column>
</Row>

<Row noGutter>
  <Column>
    <ButtonSet stacked>
      <Button on:click={add}>Add</Button>
    </ButtonSet>
  </Column>
</Row>
