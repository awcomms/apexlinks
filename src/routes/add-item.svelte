<script context="module">
  export const load = async ({ session }) => {
    const { user } = session;
    if (!user) {
      return {
        status: 302,
        redirect: "/",
      };
    }
    return {};
  };
</script>

<script>
  import Image from "$lib/components/Image.svelte";
  import Tag from "$lib/components/Tag.svelte";
  import Fields from "$lib/components/Fields/Fields.svelte";
  import {
    Row,
    Button,
    Column,
    Checkbox,
    TextInput,
    ButtonSet,
    FluidForm,
  } from "carbon-components-svelte";
  import { goto } from "$app/navigation";
  import { api } from "$lib/api";

  $: link && link.contains("youtube.com") ? yt() : {};

  let nameInvalid;

  let link;
  let fields = [
    {
      name: "",
    },
  ];
  let redirect;

  let tags = [];
  let loading;
  let image;
  let embed;
  let options = [];

  const yt = () => {
    embed = link.split("watch?v=")[1];
  };

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
      embed,
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

<Image bind:image setPrompt="Set thumbnail" />

<Tag bind:tags bind:options useOptions={true} editableOptions={true} />

<Row noGutter>
  <Column>
    <FluidForm>
      <TextInput labelText="Link" bind:value={link} />
      <Checkbox
        bind:checked={redirect}
        labelText="Let the item's listing redirect to the link"
      />
      <!-- {#if yt}
        <Checkbox
          bind:checked={embed}
          labelText="Embed the video in this item's page"
        />
      {/if} -->

      <br />
      <Fields bind:fields />
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
