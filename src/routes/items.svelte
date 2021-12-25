<script context="module">
  export const load = async () => {
    let countries = await api.get("countries").then((r) => r.items);
    // let markets = await api.get('markets').then(r => r.items)
    let states = await api.get("states").then((r) => r.items);
    let cities = await api.get("cities").then((r) => r.items);
    return {
      props: {
        countries,
        // markets,
        states,
        cities,
      },
    };
  };
</script>

<script>
  export let countries, /* markets, */ states, cities;

  import { Row, Column, Button, PaginationNav } from "carbon-components-svelte";
  import { api } from "$lib/api";
  import { itemFields, itemTags, notify } from "$lib/stores";
  import { extraFields } from "$lib/_stores/items";
  import Tag from "$lib/components/Tag.svelte";
  import { goto } from "$app/navigation";
  import Field from "$lib/components/Fields/Field.svelte";
  import Filters from "$lib/components/Filters.svelte";

  // get value via label from extra fields
  const g = (label) => {
    return $extraFields.find((e) => e.label === label).value;
  };

  $extraFields = [];

  /*
    $: (async ($extraFields) => {
        if (!Array.isArray(extraFields)) return
        let country = g('country')
        let state = g('state')
        console.log('.q', country, state)
        // let marketsUrl = 'markets?'
        // marketsUrl.concat(`&country=${g('country')}`)
        // marketsUrl.concat(`&state=${g('state')}`)
        // marketsUrl.concat(`&city=${g('city')}`)
        // $extraFields.find(e => e.label===url).items = await api.get(url).then(r => r.res)
        
        if (country) {
            let statesUrl = 'states?'
            statesUrl.concat(`&country=${value}`)
            $extraFields.find(e => e.label===statesUrl).items = await api.get(url).then(r => r.res)
        }
        
        if (state) {
        console.log('a', country, state)
            let citiesUrl = 'cities?'
            citiesUrl.concat(`&country=${g('country')}`)
            citiesUrl.concat(`&state=${g('state')}`)
            $extraFields.find(e => e.label===citiesUrl).items = await api.get(url).then(r => r.res)
        }
    })()
    */

  $extraFields = [
    {
      items: countries,
      label: "country",
      value: "",
    },
    {
      items: states,
      label: "state",
      value: "",
    },
    {
      items: cities,
      label: "city",
      value: "",
    },
    // {
    //     items: markets,
    //     label: 'market',
    //     value: ''
    // }
  ];

  $: if (got) get(page);

  let filtersOpen;

  let items = [];
  let page = 0;
  let total = 0;
  let pages = 0;

  let got;

  const go = async (item) => {
    item = await api.get(`items/${item.id}`);
    if (!item || item.error) {
      $notify = {
        title: error,
      };
      return;
    } else {
      goto(`/item/${item.id}`);
    }
  };

  const get = async () => {
    let tagArg = JSON.stringify($itemTags);
    let fieldArg = JSON.stringify($itemFields);
    let extraFieldsArg = JSON.stringify($extraFields);
    let url = `items?extraFields=${extraFieldsArg}&fields=${fieldArg}&tags=${tagArg}&page=${
      page + 1
    }`;
    url.concat(`&country=country`);
    let res = await api.get(url);
    if (Array.isArray(res.items)) {
      items = res.items;
      total = res.total;
      pages = res.pages;
      got = true;
    }
  };
</script>

<svelte:head>
  <title>Apexlinks</title>
</svelte:head>

<Tag bind:tags={$itemTags} placeholder="Search" on:change={get} />

{#each items as item}
  <br />
  <Row noGutter>
    <Column lg={1} sm={1} md={1} xlg={1}>
      <div on:click={go} class="pointer item">
        {#if item.image}
          <img
            style="vertical-align: top;"
            height="52px"
            width="52px"
            alt="profile pic"
            src={item.image}
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
          <h4>{item.name}</h4>
          {#if item.user}
            <p class="bx--link--sm">{item.user}</p>
          {/if}
          {#if item.itype}
            <p class="bx--link--sm">{item.itype}</p>
          {/if}
        </div>
      </div>
    </Column>
  </Row>
{/each}

{#if got && total < 1}
  <Row noGutter>
    <Column>
      <p>There doesn't seem to be any results</p>
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
  .item {
    display: flex;
    flex-direction: row;
  }
  .pointer:hover {
    cursor: pointer;
  }
</style>
