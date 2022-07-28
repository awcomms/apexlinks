<script context="module">
  import { api } from "$lib/util";
  export const load = async ({ params, fetch }) => {
    const { id } = params;
    const include = [ 'value', 'tags', 'text', 'txt', 'self', 'personal', 'dm', 'anon']
    const txt = await api.get(`txts/${id}?include=${JSON.stringify(include)}`, fetch);
    if (!txt.OK) {
      return {
        error: txt.error,
        status: Number(txt.STATUS),
      };
    }
    return {
      props: {
        txt,
      },
    };
  };
</script>

<script>
  export let txt;

  let open;

  import {
    Row,
    Column,
    Button,
    Checkbox,
    TextInput,
    TextArea,
    InlineLoading,
  } from "carbon-components-svelte";
  import { previousPage } from '$lib/store'
  import { routes} from '$lib/util'
  import { goto } from '$app/navigation'
  import { Delete } from '$lib/components/Txt'
  import { Tags } from "$lib/components";

  let deleteLoading;
  let editLoading;

  let { value, tags, text, self, personal, anon } = txt;
  console.log(text)
  

</script>

<Row noGutter>
  <Column>
    
  </Column>
</Row>

<style>
  .right {
    float: right;
  }
</style>
