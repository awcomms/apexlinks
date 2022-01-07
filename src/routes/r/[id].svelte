<script context="module">
  import { api } from "$lib/api";
  export  const load = async({ params, session }) => {
    let user = session.user;
    if (!user) {
      return {
        status: 302,
        redirect: "/",
      };
    }
    const { id } = params;
    const room = await api.get(`rooms/${id}`);
    // if(!room.open && !room.users.includes(user.username)){
    //     this.error('Unauthorized')
    // }
    let items, total;
    let res = await api.get(`messages?id=${id}`);
    console.log(res);
    items = res.items;
    // page = res.page
    total = res.total;
    if (!Array.isArray(items)) items = [];
    return {
      props: {
        room,
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
  export let room, items, total, user, id, page;
  import Message from "$lib/components/Message.svelte";

  const send = async (detail) => {
    if (!detail.value) return;
    value = value.trim();
    let obj = { user: user.id, id, value };
    items = [...items, detail.obj];
    socket.emit("msg", detail.obj);
  };
</script>

<Message on:send={(e)=>send(e.detail)} bind:room bind:items bind:total bind:user bind:id bind:page />

<svelte:head>
  <title>{room.name}</title>
</svelte:head>
