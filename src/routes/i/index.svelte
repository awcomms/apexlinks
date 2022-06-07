<script context="module">
  import { api } from "$lib/utils";
  export const load = async ({ url }) => {
    let user = url.searchParams.get("user");
    user = await api.get(`users/${user}`);
    if (user.error) {
      return {
        error: user.error,
        status: user.STATUS || 404,
      };
    }
    return { props: { user } };
  };
</script>

<script>
  export let user;
  import { itemTags } from "$lib/stores";
  import { Items } from "$lib/components";
</script>

<Items
  showOptionsControl
  bind:tags={$itemTags}
  {user}
  options={user.options}
  optSelected={(opt) => $itemTags.find((t) => t.value === opt.value)}
/>
