<script lang="ts">
  import { LocalStorage, Link } from "carbon-components-svelte";

  import { txtSearchModalOpen } from "$lib/store";
  import { txtSearchTags } from "$lib/store";
  import { Tags } from "$lib/components/Tag";
  import { api, routes } from "$lib/util";

  let items = [], searching = false;

  const get = async () => {
    searching = true;
    const include = `include=${JSON.stringify(["value"])}`;
    const tagsQuery = `tags=${JSON.stringify($txtSearchTags)}`;
    const url = `txts?${include}&limit=7&page=1&${tagsQuery}`;
    await api
      .get(url)
      .then((res) => {
        if (!res.OK) {
          console.log(res);
          return;
        }
        items = res.items;
      })
      .finally(() => (searching = false));
  };

</script>

<LocalStorage key="txtSearchTags" bind:value={$txtSearchTags} />

<Tags on:change={get} bind:tags={$txtSearchTags} />

{#each items as item}
  <p>
    <!-- settings: close search modal after clicking on a result ? -->
      <Link href={routes.txtReplies(item.id)}>{item.id}: {item.value}</Link>
  </p>
{/each}
