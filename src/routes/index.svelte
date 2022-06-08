<script>
  import Users from '$lib/components/Users/Users.svelte'
  import { goto } from "$app/navigation";

  const go = async (type, item) => {
    goto(`/${type}/${item.id}`);
  };
</script>

<Users on:click={({detail}) => go('u', detail)} />
