<script context="module">
  import { send } from '$lib/send'
  export async function load({ session }) {
    let user = session.user;
    if (!user) {
      return {
        status: 302,
        redirect: "/login",
      };
    }
    let {schema} = await send({method: 'GET', path: 'users/schema'})
    console.log('items: ', schema)
    return {
      props: {
        user,
        items:schema
      },
    };
  }
</script>

<script>
  export let user, items;

  import { api } from "$lib/api.js";
  import { goto } from "$app/navigation";
  import {
    InlineLoading,
    FluidForm,
    Checkbox,
    TextArea,
    Button,
    Column,
    Row,
  } from "carbon-components-svelte";
  import Fields from "$lib/components/Fields/Fields.svelte";
  import Paystack from "$lib/components/Paystack.svelte";
  import Input from "$lib/components/Input/Input.svelte";
  import Image from "$lib/components/Image.svelte";
  import Tag from "$lib/components/Tag.svelte";
  import { session } from "$app/stores";
  import {
    PAYSTACK_TEST,
    PAYSTACK_TEST_KEY,
    PAYSTACK_LIVE_KEY,
  } from "$lib/env";
  import { checkEmail } from "$lib/utils/checkEmail";
  import { abslink } from "$lib/utils/abslink";

  // console.log('PAYSTACK_TEST', PAYSTACK_TEST, typeof(PAYSTACK_TEST))
  // console.log('PAYSTACK_TEST_KEY', PAYSTACK_TEST, typeof(PAYSTACK_TEST_KEY))
  // console.log('PAYSTACK_LIVE_KEY', PAYSTACK_LIVE_KEY, typeof(PAYSTACK_LIVE_KEY))

  let config = {
    key: PAYSTACK_TEST === "true" ? PAYSTACK_TEST_KEY : PAYSTACK_LIVE_KEY,
    email: user.email,
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

  let show_email = user.show_email;
  let username = user.username;
  let hidden = user.hidden;
  let address = user.address;
  let website = user.website;
  let image = user.image;
  let email = user.email;
  let phone = user.phone;
  let about = user.about;
  let data = user.data;
  let name = user.name;
  let fields = user.fields || [];
  let tags = user.tags || [];

  let usernameInvalid;
  let usernameError;

  let websiteError =
    'Add a url scheme to the start of the link, "http://" or "https://"';
  let websiteInvalid;

  let emailInvalid;
  let emailError;

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
    let req_fields = fields.map((f) => {
      return { label: f.label, value: f.value };
    });
    loading = true;
    if (website && !abslink.test(website)) {
      websiteInvalid = true;
      loading = false;
      return;
    }
    if (!email) {
      emailInvalid = true;
      emailError = "Empty";
      loading = false;
      return;
    }
    if (!checkEmail(email)) {
      emailInvalid = true;
      emailError = "Unaccepted";
      loading = false;
      return;
    }
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
    if (checkEmail(username)) {
      usernameInvalid = true;
      usernameError = "Unaccepted";
      loading = false;
      return;
    }
    let dt = {
      show_email,
      username,
      hidden,
      website,
      address,
      email,
      phone,
      about,
      fields: req_fields,
      image,
      data,
      tags,
      name,
    };
    let res = await api.put("users", dt).finally((r) => {
      loading = false;
      return r;
    });
    if (res.id) {
      $session.user = res;
      goto(`/${res.username}`);
    }
  };
</script>

<svelte:window on:keydown={keydown} />

<Paystack {config} />

<Image bind:image>
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
</Image>

<Row noGutter>
  <Column>
    <Checkbox bind:checked={hidden} labelText="Hide profile from public" />
  </Column>
</Row>

<Tag helperText="Users can use tags to find you" bind:tags />

<br />
<Row noGutter>
  <Column>
    <Fields combobox={true} {items} pin bind:fields />
  </Column>
</Row>
<br />

<Row noGutter>
  <Column>
    <FluidForm>
      <Input
        bind:invalidText={usernameError}
        bind:invalid={usernameInvalid}
        bind:value={username}
        labelText="Username"
      />
      <Input
        invalid={websiteInvalid}
        invalidText={websiteError}
        labelText="External link - could be a website"
        bind:value={website}
      />
      <TextArea rows={11} placeholder="About (Markdown)" bind:value={about} />
    </FluidForm>
  </Column>
</Row>

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
