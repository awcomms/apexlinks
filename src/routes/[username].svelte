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

<svelte:head>
    <meta name=keywords content={
        (()=>{
           let stringOfTags = ''
           user.tags.forEach((t, i, a) => {
               let tagString = i === a.length-1 ? t : `${t}, `
               stringOfTags = stringOfTags.concat(tagString)
           })
           return stringOfTags
        })()
    }>
    <meta name=description content="{user.name}'s Apexlinks page">
    <title>/{user.username} - Apexlinks</title>
    <script id=ld type="application/ld+json"></script>
</svelte:head>

<script>
    export let user
    import {
        Column,
        Link,
        Row
    } from 'carbon-components-svelte'
    import {parseMarkdown} from '$lib/utils/parseMarkdown'
    import { onMount } from 'svelte';

    let tagLabels = []
    let tagsString = ''

    onMount(()=>{
        let ld = {
            '@context': 'https://schema.org',
            '@type': 'Organization',
        }
        user.fields.forEach(field => {
            if (!(field.label in ld)) ld[field.label] = field.value
        })
        document.getElementById('ld').innerText = JSON.stringify(ld)
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
    {#if user.username}
        <div>
            <span class='heading'><span class=username-slash>/</span>{user.username}</span>
        </div>
    {/if}
</Row>

<br />

{#each user.fields as field}
    <p class="heading">{field.label}</p>
    {#if field.link}
        <Link href={field.value}>{field.value}</Link>
    {:else}
        <p>{field.value}</p>
    {/if}
{/each}

<style>
    .heading {
        font-weight: 600;
    }
    .username-slash {
        color: blue;
    }   
</style>