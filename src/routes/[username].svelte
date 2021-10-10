<script context='module'>
    import { send } from '$lib/send'
    export async function load({page}){
        let {username} = page.params
        
        let user = await send({method: 'GET', path: `users/${username}`})
        if (user.error){
            return {
                status: user.status,
                error: user.error
            }
        }
        return {
            props: {
                user
            }
        }
    }
</script>

<script>
    export let user = {}
    
    import {
        userTags
    } from '$lib/stores'
    import {
        Column,
        Row
    } from 'carbon-components-svelte'
    import {parseMarkdown} from '$lib/utils/parseMarkdown'

    let tagLabels = []

    $userTags.forEach(t => {
        if (t) {
            let label = t.split(':')[0]
            if (label) tagLabels = [...tagLabels, label]
        }
    })

    let about
    if (user.about) about = parseMarkdown(user.about)
</script>

<Row>
    {#if user.image}
        <Column lg={2} sm={2} md={2} xlg={2}>
            <img style='width: 100%;' alt='user display _image' src={user.image}>
        </Column>
    {/if}
    <Column lg={4} sm={4} md={4} xlg={4}>
        {#if user.username}
            <div>
                <span class='heading'><span class=username-slash>/</span>{user.username}</span>
            </div>
        {/if}
    </Column>
</Row>

<br />

{#if user.name}
    <p>User: name: {user.name}</p>
{/if}
{#if user.email}
    <p>User: email: {user.email}</p>
{/if}
{#if user.phone}
    <p>User: phone: {user.phone}</p>
{/if}
{#if user.website}
    <p>User: external link: <a href={user.website}>{user.website}</a></p>
{/if}

<br />

<!-- {#each field as user.fields}
    {#if tagLabels.contains(field.label)}
        <p>{field.label}: {field.value}</p>
    {/if}
{/each} -->

<Row>
    <Column lg={6} sm={6} md={6} xlg={6}>
        {#if about}
            <p>{@html about}</p>
        {/if}
    </Column>
</Row>

<style>
    .heading {
        font-weight: 600;
    }
    .username-slash {
        color: blue;
    }   
</style>