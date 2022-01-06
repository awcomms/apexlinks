<script>
  import {
    Row,
    Column,
    PaginationNav,
    Loading,
    RadioButtonGroup,
    RadioButton,
    Slider,
  } from "carbon-components-svelte";
  import currentLocation from "$lib/utils/currentLocation";
  import { api } from "$lib/api";
  import { extraFields } from "$lib/_stores/users";
  import { users, userTags, userFields } from "$lib/stores";
  // import UpDown from "$lib/components/UpDown.svelte";
  import Tag from "$lib/components/Tag.svelte";
  import { goto } from "$app/navigation";

  $: get(sort);
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

  let loading
  let changeLimitInterval;
  let sort = "tag";
  $users = [];
  let page = 0;
  let step = 1;
  // let limit;
  let total = 0;
  let pages = 0;
  let min = 0;
  let max = 0;

  let got;

  $: sliderLabelUnit = sort == "tag" ? "km" : "points";

  const startChangeLimit = (detail) => {
    console.log("scl", changeLimitInterval);
    // if (changeLimitInterval) return
    changeLimitInterval = setInterval(() => {
      console.log(limit);
      detail ? (limit += step) : (limit -= step);
      console.log(limit);
    }, 1000);
  };

  const stopChangeLimit = () => {
    console.log("stcl", changeLimitInterval);
    clearInterval(changeLimitInterval);
    changeLimitInterval = null;
  };

  const get = async () => {
    loading = true
    let tagString = JSON.stringify($userTags);
    let fields = $userFields.map((uf) => ({
      label: uf.label,
      value: uf.value,
    }));
    let fieldString = JSON.stringify(fields);
    let extraString = JSON.stringify($extraFields);
    let loc = await currentLocation.then((l) => l).catch((e) => console.log(e));
    console.log("loc", loc);
    loc = JSON.stringify(loc);
    let url = `users?sort=${sort}&loc=${loc}&extraFields=${extraString}&fields=${fieldString}&tags=${tagString}&page=${
      page + 1
    }`;
    // if (limit) url.concat(`&limit=${limit}`)
    let res = await api.get(url).finally(()=>loading=false);
    console.log(res.error);
    if (Array.isArray(res.items)) {
      min = res.min;
      max = res.max;
      // limit = sorted == 'tag' ? min : max TODO-settings
      $users = res.items;
      total = res.total;
      pages = res.pages;
      got = true;
    }
  };
</script>

{#if loading}
  <Loading />
  {/if}

<!-- <Row noGutter>
  <Column>
    <div class="updown">
      <span>{limit}</span>
      <UpDown
        on:mouseup={(e) => stopChangeLimit(e.detail)}
        on:mousedown={(e) => startChangeLimit(e.detail)}
        bind:step
      />
    </div>
  </Column>
</Row> -->

<!-- <Row noGutter>
  <Column>
    <RadioButtonGroup legendText="Sort by" bind:selected={sort}>
      <RadioButton labelText="Tags" value="tag" />
      <RadioButton labelText="Distance" value="distance" />
    </RadioButtonGroup>
    <Slider
      labelText={`${
        sort === "tag" ? "Distance score" : sort === "tag" ? "Distance" : ""
      } cutoff`}
      bind:min
      bind:max
      bind:value={limit}
      maxLabel={`${max}${sliderLabelUnit}`}
      minLabel={`${min}${sliderLabelUnit}`}
    />
  </Column>
</Row> -->

<Tag bind:tags={$userTags} placeholder="Search" on:change={get} />

{#if total}
  <Row noGutter>
    <Column>
      <br />
      <p>{total} {total > 1 ? "results" : "result"}</p>
    </Column>
  </Row>
{/if}

{#each $users as user}
  <br />
  <Row noGutter>
    <Column lg={4} sm={4} md={4} xlg={4}>
      <div on:click={goto(`/u/${user.username}`)} class="pointer user">
        <!-- {#if user.image}
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
        {/if} -->
        <div class="label">
          {#if user.username}
            <h4>{user.username}</h4>
            <!-- <p class="bx--link--sm">{user.username}</p> -->
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
    color: rgb(52, 59, 204);
    cursor: pointer;
  }
</style>
