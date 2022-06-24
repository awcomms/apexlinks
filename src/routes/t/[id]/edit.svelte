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
        Button
    } from 'carbon-components-svelte'
    import {Tags} from "$lib/components"

    let {tags, about} = txt;

    const edit = () => {
        const res = api.put('txts', {tags, about})
        if (!res.OK) {
            console.log('txt PUT res: ', res)
        }
        goto(`${routes.txts}/${txt.id}`)
    }
</script>

<Row noGutter>
    <Column>
        <Tags bind:tags />
        <Button on:click={edit}>Edit</Button>
    </Column>
</Row>