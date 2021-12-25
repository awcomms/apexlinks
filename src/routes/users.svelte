<script>
  import { Row, Column, PaginationNav, RadioButtonGroup, RadioButton, Slider } from "carbon-components-svelte";
  import currentLocation from "$lib/utils/currentLocation";
  import { api } from "$lib/api";
  import { extraFields } from "$lib/_stores/users";
  import { users, userTags, userFields } from "$lib/stores";
  import Tag from "$lib/components/Tag.svelte";
  import { goto } from "$app/navigation";

  $: if (got) get(page);

  $extraFields = [
    {
      label: "user ID",
      value: "",
    },
    {
      label: "username",
      value: "",
    },
  ];

  let sort = 'tag'
  $users = [];
  let page = 0;
  let total = 0;
  let pages = 0;

  let got;

  const get = async () => {
    let tagString = JSON.stringify($userTags);
    let fields = $userFields.map((uf) => ({
      label: uf.label,
      value: uf.value,
    }));
    let fieldString = JSON.stringify(fields);
    let extraString = JSON.stringify($extraFields);
    let loc = await currentLocation.then(l => l).catch(e => console.log(e))
    console.log('loc', loc)
    loc = JSON.stringify(loc);
    let url = `users?sort=${sort}&loc=${loc}&extraFields=${extraString}&fields=${fieldString}&tags=${tagString}&page=${
      page + 1
    }`;
    let res = await api.get(url);
    res.error ? console.log(res.error) : {}
    if (Array.isArray(res.items)) {
      $users = res.items;
      total = res.total;
      pages = res.pages;
      got = true;
    }
  };
</script>

<Row noGutter>
    <Column>
        <RadioButtonGroup legendText='Sort by' bind:selected={sort}>
            <RadioButton labelText='Tags' value='tag'/>
            <RadioButton labelText='Distance' value='distance'/>
        </RadioButtonGroup>
        <Slider />
    </Column>
</Row>

<Tag bind:tags={$userTags} placeholder="Search" on:change={get} />

{#each $users as user}
  <br />
  <Row noGutter>
    <Column lg={4} sm={4} md={4} xlg={4}>
      <div on:click={goto(`/${user.username}`)} class="pointer user">
        {#if user.image}
          <img
            style="vertical-align: top;"
            height="52px"
            width="52px"
            alt="profile pic"
            src={user.image}
          />
        {:else}
          <img
            style="vertical-align: top;"
            height="52px"
            width="52px"
            alt="profile pic"
            src="/placeholder.png"
          />
        {/if}
        <div class="label">
          <h4>{user.username}</h4>
          {#if user.username}
            <p class="bx--link--sm">{user.username}</p>
          {/if}
        </div>
      </div>
    </Column>
  </Row>
{/each}

{#if got && total < 1}
  <Row noGutter>
    <Column>
      <p>No results</p>
    </Column>
  </Row>
{/if}

{#if total > 10}
  <Row noGutter>
    <Column>
      <PaginationNav loop bind:page bind:total={pages} />
    </Column>
  </Row>
{/if}

<style>
  .label {
    padding-left: 0.5rem;
  }
  .user {
    display: flex;
    flex-direction: row;
  }
  .pointer:hover {
    cursor: pointer;
  }
</style>
