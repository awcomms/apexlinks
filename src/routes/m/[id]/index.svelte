<script context="module">
  import { api } from "$lib/utils";
  import { routes } from "$lib/utils";
  export const load = async ({ params, session }) => {
    const {user} = session
    const { id } = params;
    const message = await api.get(
      `messages?model=message&id=${id}&mode=single`
    );
    console.log(message);
    let mode = "replies";
    let items;
    let res = await api.get(`messages?model=message&id=${id}&mode=${mode}`);
    if (!Array.isArray(items)) {
      items = [];
    } else {
      items = res.items;
    } //TODO
    items = res.items || [];
    let { total, page, pages } = res;

    return {
      props: {
        message,
        user,
        items,
        page,
        pages,
        total,
      },
    };
  };
</script>

<script>
  export let message, items, total, page, pages;
  import Message from "$lib/components/Message.svelte";
  import { goto } from "$app/navigation";
  import { socket } from '$lib/utils'

  let id = `m-${message.id}`

  const send = ({detail}) => {
    let data = {value: detail, message: message.id}
    api.post(`messages`, data).then(message => {
      socket.emit("msg", {...message, room: id})
    })
  }
</script>

<Message
  on:send={send}
  on:titleClick={() => goto(`${routes.messages}/${message.id}/text`)}
  {message}
  {items}
  {total}
  {pages}
  {page}
/>

<svelte:head>
  <title>{message.value}</title>
</svelte:head>
