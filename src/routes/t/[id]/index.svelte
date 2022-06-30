<script context='module'>
    import { api } from "$lib/utils"
    import { routes } from "$lib/utils"
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

    import { session } from '$app/stores'
    let {user} = $session

    import {
        Row,
        Column,
        Link
    } from 'carbon-components-svelte'
    import {Tags} from "$lib/components"
    import { parseMarkdown } from "$lib/utils";

    let {tags, text} = txt;
    text = parseMarkdown(text)
</script>

{#if user?.id === txt.user?.id}
<Row noGutter>
    <Column>
        <Link href='{routes.txtEdit(txt.id)}'>Edit this txt</Link>
    </Column>
</Row>
{/if}

<Row noGutter>
    <Column>
        <Link href='{routes.txtTxt(txt.id)}'>Replies to this txt</Link>
    </Column>
</Row>

{#if txt.user}
<Row noGutter>
    <Column>
        <Link href='{routes.user(txt.user.id)}'>Creator of this txt</Link>
    </Column>
</Row>
{/if}

<Row noGutter>
    <Column>
        <p>txt {txt.id}</p>
        <p>{txt.value}</p>
        <Tags {tags} editable={false} />
    </Column>
</Row>

<br />

<Row noGutter>
    <Column>
        {@html text}
    </Column>
</Row>