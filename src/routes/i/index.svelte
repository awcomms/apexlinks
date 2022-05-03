<script context="module">
  import { api } from '$lib/api';
  export const load = async ({ url, session }) => {
    let props = {};
    if (session.user) props.user = session.user
    let username = url.searchParams.get("username");
    const _user = await api.get(`users/${username}`);
    if (!_user.error) {
      props._user = _user;
    }
    // props.countries = await api.get("countries").then((r) => r.items);
    // // let markets = await api.get('markets').then(r => r.items)
    // props.states = await api.get("states").then((r) => r.items);
    // props.cities = await api.get("cities").then((r) => r.items);
    return {
      props,
    };
  };
</script>

<script>
  export let user, _user
  import Tabs from '$lib/components/Items/Tabs.svelte'
  import { goto } from '$app/navigation'

  const go = async (item) => {
      goto(`/i/${item.id}`);
  };
</script>

<Tabs add on:click={({detail})=>go(detail)} {user} sameUser={user && _user && user.id === _user.id} />