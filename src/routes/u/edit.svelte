<script context="module">
  import { send } from "$lib/send";
  export  const load = async({ session }) => {
    let user = session.user;
    if (!user) {
      return {
        status: 302,
        redirect: "/",
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

  import { api } from "$lib/api.js";
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
  import Fields from "$lib/components/Fields/Fields.svelte";
  import Paystack from "$lib/components/Paystack.svelte";
  import Input from "$lib/components/Input/Input.svelte";
  // import Image from "$lib/components/Image.svelte";
  import Tag from "$lib/components/Tag/Tags.svelte";
  import { session } from "$app/stores";
  import { onMount } from "svelte";
  import {browser} from '$app/env'
  import {
    PAYSTACK_TEST,
    PAYSTACK_TEST_KEY,
    PAYSTACK_LIVE_KEY,
  } from "$lib/env";
  // import { checkEmail } from "$lib/utils/checkEmail";
  // import { abslinkRegex } from "$lib/utils/regex";

  onMount(async() => {
    location = await currentLocation.then(l => l).catch(e => console.log('currentLocation error:', e))
  });

  let editLocation = true
  let location = {}

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
  let fields = user.fields || [];
  let tags = user.tags || [];

  let usernameInvalid;
  let usernameError;

  // let emailInvalid;
  // let emailError;

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
    let req_fields = fields.map((f) => {
      return { label: f.label, value: f.value };
    });
    // if (!email) {
    //   emailInvalid = true;
    //   emailError = "Empty";
    //   loading = false;
    //   return;
    // }
    // if (!checkEmail(email)) {
    //   emailInvalid = true;
    //   emailError = "Unaccepted";
    //   loading = false;
    //   return;
    // }
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
    // if (checkEmail(username)) {
    //   usernameInvalid = true;
    //   usernameError = "Unaccepted";
    //   loading = false;
    //   return;
    // }

    let dt = {
      username,
      location: editLocation ? location: null,
      hidden,
      fields: req_fields,
      image,
      tags,
    };
    let res = await api.put("users", dt).finally((r) => {
      loading = false;
      return r;
    });
    if (res.id) {
      $session.user = res;
      goto(`/u/${res.username}`);
    }
  };
</script>

<svelte:window on:keydown={keydown} />

<Paystack {config} />

<Row noGutter>
  <Column>
    <h1>Edit your profile</h1>
  </Column>
</Row>

<br />

<!-- <Image bind:image>
  {#if user.paid}
    <Button
      on:click={() => {
        config.open = true;
      }}
      size="small"
    >
      Renew subscription
    </Button>
    <Button
      on:click={() => {
        config.open = true;
        config.amount = 3000;
        config.metadata.purpose = "change_card";
      }}
      size="small"
    >
      Change card
    </Button>
  {:else}
    <Button
      on:click={() => {
        config.open = true;
      }}
      size="small"
    >
      Subscribe
    </Button>
  {/if}
</Image> -->

<Row noGutter>
  <Column>
    <Checkbox
      on:change={edit}
      bind:checked={hidden}
      labelText="Hide profile from public"
    />
    <Checkbox
      bind:checked={editLocation}
      labelText="Edit Location"
    />
  </Column>
</Row>

<Tag bind:tags />

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
    <Fields bind:fields />
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
