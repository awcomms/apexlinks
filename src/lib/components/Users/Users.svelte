<script>
  export const selected = {};
  export let showSelected = false;
  import {
    Row,
    Column,
    PaginationNav,
    Loading,
    // RadioButtonGroup,
    // RadioButton,
    // Slider,
  } from "carbon-components-svelte";
  // import currentLocation from "$lib/util/currentLocation";
  // import Save from "$lib/components/Save.svelte";
  import { api } from "$lib/util";
  import { selectedUsers, users, userTags } from "$lib/store";
  // import UpDown from "$lib/components/UpDown.svelte";
  import Tag from "$lib/components/Tag/Tags.svelte";
  // import { goto } from "$app/navigation";
  import { createEventDispatcher } from "svelte";

  // $: get(sort);
  $: if (got) get(page);

  const dispatch = createEventDispatcher();

  let loading;
  // let changeLimitInterval;
  // let sort = "tag";
  $users = [];
  let page = 0;
  // let step = 1;
  // let limit;
  let total = 0;
  let pages = 0;
  // let min = 0;
  // let max = 0;

  let got;

  // $: sliderLabelUnit = sort == "tag" ? "km" : "points";

  // const startChangeLimit = (detail) => {
  //   // if (changeLimitInterval) return
  //   changeLimitInterval = setInterval(() => {
  //     detail ? (limit += step) : (limit -= step);
  //   }, 1000);
  // };

  // const stopChangeLimit = () => {
  //   clearInterval(changeLimitInterval);
  //   changeLimitInterval = null;
  // };

  const get = async () => {
    loading = true;
    let tagString = JSON.stringify(
      $userTags.map((t) => {
        return { value: t.value };
      })
    );
    let include = JSON.stringify(['username', 'online'])
    let url = `users?&tags=${tagString}&page=${page + 1}&include=${include}`;
    let res = await api.get(url).finally(() => (loading = false));
    if (Array.isArray(res.items)) {
      $users = res.items;
      total = res.items.length;
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

<Row noGutter>
  <Column>
    <Tag
      text="Add tags to search for users"
      open={true}
      bind:tags={$userTags}
      on:change={get}
    />
  </Column>
</Row>

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
      <div
        class:selected={showSelected &&
          $selectedUsers.find((s) => s.id === user?.id)}
        on:click={() => {
          if (user.id) dispatch("click", user);
        }}
        class="pointer user"
      >
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
      <div class="actions">
        <!-- <Save bind:item={user} /> -->
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
  .selected {
    background-color: gray;
  }
  .actions {
    margin-right: 1rem;
  }
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
