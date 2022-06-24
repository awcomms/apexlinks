<script context='module'>
    import { api } from "$lib/utils"
    export const load = async ({params, fetch}) => {
        const {id} = params
        const txt = api.get(`txts/${id}`, fetch)
        if (!txt.OK) {
            return {
                error: txt.error,
                status: Number(txt.STATUS)
            }
        }
        return {
            props: {
                txt
            }
        }
    }
</script>

<script>
    export let txt;

    import {
        Row,
        Column,
    } from 'carbon-components-svelte'
    import {Tags} from "$lib/components"

    let {tags} = txt;
</script>

<Row noGutter>
    <Column>
        <p>txt {txt.id}</p>
        <p>{txt.value}</p>
        <Tags bind:tags editable={false} />
    </Column>
</Row>