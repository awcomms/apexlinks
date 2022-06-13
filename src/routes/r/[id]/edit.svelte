<script context="module">
  import { api } from "$lib/utils";
  import { routes } from "$lib/utils";
  export const load = async ({ params, session, fetch }) => {
    let { user } = session;
    let { id } = params;
    if (!user) {
      return {
        status: 302,
        redirect: routes.login,
      };
    }
    let room = await api.get(`rooms/${id}`, fetch);
    if (!(room.user.id == user.id)) {
      return {
        error: "You're not authorized to edit this room",
        status: "401",
      };
    }
    return {
      props: {
        room,
        user,
      },
    };
  };
</script>

<script>
  export let room, user;
  import { context } from "$lib/stores";
  import { goto } from "$app/navigation";
  import {
    Form,
    ButtonSet,
    Column,
    Button,
    Modal,
    Row,
    TextArea,
  } from "carbon-components-svelte";
  import Tag from "$lib/components/Tag/Tags.svelte";
  import Input from "$lib/components/Input/Input.svelte";
  import Tags from "$lib/components/Tag/Tags.svelte";

  let nameInvalid;

  let about = room.about;
  let name = room.name;
  let tags = room.tags;
  let delOpen;

  let del = async function () {
    let res = await api.del(`rooms/${room.id}`);
    if (res.yes) {
      goto(`/rooms/${user.id}`);
    }
  };

  let edit = async function () {
    let data = {
      id: room.id,
      about,
      name,
      tags,
    };
    let res = await api.put("rooms", data);
    if (res.nameError) {
      nameInvalid = true;
    }
    console.log(about)
    if (res.id) {
      $context = name;
      goto(`${routes.rooms}/${room.id}/about`);
    }
  };
</script>

<Modal
  bind:open={delOpen}
  modalHeading="Delete room"
  primaryButtonText="Delete"
  secondaryButtonText="Cancel"
  on:click:button--secondary={() => (delOpen = false)}
  on:submit={del}
>
  <p>Sure you want to delete this room?</p>
</Modal>

<svelte:head>
  <title>Edit Room</title>
</svelte:head>

{#if room.open}
  <Tag bind:tags />
{/if}

<Row noGutter>
  <Column>
    <Form>
      <Tags bind:tags />
      <Input
        labelText="Name"
        bind:value={name}
        bind:invalid={nameInvalid}
        invalidText="Name taken"
      />
      <TextArea bind:value={about} labelText="About this room" />
    </Form>
  </Column>
</Row>

<Row noGutter>
  <ButtonSet stacked>
    <Button on:click={() => (delOpen = true)}>Delete</Button>
    <Button on:click={edit}>Edit</Button>
  </ButtonSet>
</Row>
