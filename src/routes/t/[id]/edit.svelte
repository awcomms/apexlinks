<script context='module'>
    import { api } from "$lib/utils"
    export const load = async ({params, fetch}) => {
        const {id} = params
        const txt = await api.get(`txts/${id}`, fetch)
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
        Button,
        Checkbox,
        TextInput,TextArea
    } from 'carbon-components-svelte'
    import {Tags} from "$lib/components"

    let {value, tags, about, self, personal} = txt;

    const edit = async () => {
        // editLoading = true
        const res = await api.put('txts', {value, tags, about})
        // .finally(() => editLoading = false);
        if (!res.OK) {
            console.log('txt PUT res: ', res)
        }
        goto(`${routes.txts}/${txt.id}`)
    }

    const del = async() => {
        const res = await api.del(`txts/${txt.id}`)
        console.log('fetch DELETE response: ', res)
    }
</script>

<Row noGutter>
    <Column>
        <Checkbox bind:checked={self} labelText='disable public replies' />
        <Checkbox bind:checked={personal} labelText='personal - only you can view this txt' />
        <Tags text="Edit this txt's tags" bind:tags />
        <br />
        <TextInput bin:value labelText='Txt value' />
        <br />
        <TextArea bind:value={about} labelText='About this txt' helperText='Works with markdown' />
        <br />
        <Button on:click={edit}>Edit</Button>
        <Button on:click={del}>Delete</Button>
    </Column>
</Row>