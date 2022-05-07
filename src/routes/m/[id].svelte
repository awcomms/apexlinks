<script context="module">
  import { api } from "$lib/api";
  import { routes } from '$lib/utils'
  export  const load = async({ params, session }) => {
    let user = session.user;
    if (!user) {
      return {
        status: 302,
        redirect: routes.login,
      };
    }
    const { id } = params;
    const message = await api.get(`messages?model=message&id=${id}&mode=single`);
    // if(!room.open && !room.users.includes(user.username)){
    //     this.error('Unauthorized')
    // }
    let mode = 'replies'
    let items, total;
    let res = await api.get(`messages?model=message&id=${id}&mode=${mode}`);
    if (!Array.isArray(items)) items = [];
    items = res.items || [];
    // page = res.page
    total = res.total;
    return {
      props: {
        message,
        items,
        // page,
        total,
        user,
        id,
      },
    };
  }
</script>

<script>
  export let message, room, items, total, user, id, page;
  import Message from "$lib/components/Message.svelte";
</script>

<Message bind:message bind:room bind:items bind:total bind:user bind:id bind:page />

<svelte:head>
  <title>{message.value}</title>
</svelte:head>
