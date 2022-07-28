<script context='module'>
    import { api } from "$lib/util"
    import { routes } from "$lib/util"
    export const load = async ({params, fetch}) => {
        const {id} = params
        const include = ['value', 'text', 'user', 'tags']
        const txt = await api.get(`txts/${id}?include=${JSON.stringify(include)}`, fetch)
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
    import { parseMarkdown } from "$lib/util";

    let {tags, text} = txt;
    if (!tags) tags = []
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

<Row noGutter>
    <Column>
        <Link href='{`${routes.txt(txt.id)}/to`}'>Txts this txt has replied to</Link>
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
        <Tags {tags} editable={false} hide={true} open={true} showHiddenCount={true} />
    </Column>
</Row>

<br />

<Row noGutter>
    <Column>
        {@html text}
    </Column>
</Row>