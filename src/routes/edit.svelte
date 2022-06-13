<script context="module">
  import { routes } from "$lib/utils";
  export  const load = async({ session }) => {
    let user = session.user;
    if (!user) {
      return {
        status: 302,
        redirect: routes.login,
      };
    }
    // let { schema } = await send({ method: "GET", path: "users/schema" });
    return {
      props: {
        user,
        // items: schema,
      },
    };
  }
</script>

<script>
  export let user;

  import { api } from "$lib/utils";
  import currentLocation from "$lib/utils/currentLocation";
  import { goto } from "$app/navigation";
  import {
    InlineLoading,
    FluidForm,
    Checkbox,
    Button,
    Column,
    Row,
  } from "carbon-components-svelte";
  import Input from "$lib/components/Input/Input.svelte";
  import Tag from "$lib/components/Tag/Tags.svelte";
  import { session } from "$app/stores";
  import { onMount } from "svelte";
  import {
    PAYSTACK_TEST,
    PAYSTACK_TEST_KEY,
    PAYSTACK_LIVE_KEY,
  } from "$lib/env";

  let editLocation = true

  let config = {
    key: PAYSTACK_TEST === "true" ? PAYSTACK_TEST_KEY : PAYSTACK_LIVE_KEY,
    email: user.email, // TODO
    metadata: {
      id: user.id,
    },
    amount: 3000,
    currency: "NGN",
    embed: false,
    value: "Pay",
    callback: () => {
      api.put("users/activate", { id: user.id });
    },
  };

  let username = user.username;
  let hidden = user.hidden;
  let image = user.image;
  let tags = user.tags || [];

  let usernameInvalid;
  let usernameError;

  let loading;

  const keydown = (e) => {
    switch (e.keyCode) {
      case 13:
        if (e.ctrlKey) {
          edit();
        }
    }
  };

  const edit = async () => {
    loading = true;
    if (!username) {
      usernameInvalid = true;
      usernameError = "Empty";
      loading = false;
      return;
    }
    if (username !== user.username) {
      if (await api.get(`check_username/${username}`).then((r) => !r.res)) {
        usernameInvalid = true;
        usernameError = "Username taken";
        loading = false;
        return;
      }
    }

    let dt = {
      username,
      hidden,
      image,
      tags,
    };
    let res = await api.put("users", dt).finally((r) => {
      loading = false;
      return r;
    });
    if (res.id) {
      $session.user = res;
      goto(`/u/${res.id}`);
    }
  };
</script>

<svelte:window on:keydown={keydown} />

<Row noGutter>
  <Column>
    <h1>Edit your profile</h1>
  </Column>
</Row>

<br />

<Row noGutter>
  <Column>
    <Checkbox
      on:change={edit}
      bind:checked={hidden}
      labelText="Hide profile from public"
    />
  </Column>
</Row>

<Tag hidable={true} bind:tags />

<Row noGutter>
  <Column>
    <FluidForm>
      <Input
        bind:invalidText={usernameError}
        bind:invalid={usernameInvalid}
        bind:value={username}
        labelText="Username"
      />
    </FluidForm>
  </Column>
</Row>

<br />
<Row noGutter>
  <Column>
  </Column>
</Row>
<br />

<Row noGutter>
  <Column>
    <Button as let:props>
      <div on:click={edit} {...props}>
        <p>Edit</p>
        {#if loading}
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
