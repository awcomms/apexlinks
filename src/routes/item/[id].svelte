<script context='module'>
    import * as api from '$lib/api'
    export async function load({session, page}){
        let user
        let token = session.token
        if (token){
            user = await api.get('user', token)
        }
        let {id} = page.params
        let item = await api.get(`items/${id}`)
        if(item.error){
            return {
                status: item.status,
                error: item.error
            }
        }
        return {
            props: {
                user,
                item
            }
        }
    }
</script>

<script>
    export let user
    export let item
    import {
        Row,
        Link,
        Column,
    } from 'carbon-components-svelte'
    import {parseMarkdown} from '$lib/utils'
    
    let itext
    if(item.itext){
        itext = parseMarkdown(item.itext)
    }
</script>

<Row>
    {#if item.image}
        <Column lg={2} sm={2} md={2} xlg={2}>
                <img width=100% alt='item display _image' src={item.image}>
        </Column>
    {/if}
    <Column lg={4} sm={4} md={4} xlg={4}>
        {#if item.name}
            {#if item.redirect && item.link}
                <p style='font-weight: 600;'><a class='blank-link' href={item.link || ''}>{item.name}</a></p>
            {:else}
                <p style='font-weight: 600;'>{item.name}</p>
            {/if}
        {/if}
        <!-- {#if item.itype}
            <p>{item.itype}</p>
        {/if} -->
        <Link href='/{item.user}'>User</Link>
        {#if user && user.username == item.user}
            <Link href='/edit/{item.id}'>Edit</Link>
        {/if}
    </Column>
</Row>

<br />

{#if !item.redirect && itext}
    <Row>
        <Column lg={6} sm={6} md={6} xlg={6}>
            <div>{@html itext}</div>
        </Column>
    </Row>
{/if}

<style>
    .blank-link {
        text-decoration: none;
    }

    .blank-link:hover {
        cursor: pointer;
        color: rgb(50, 50, 211);
    }
</style>