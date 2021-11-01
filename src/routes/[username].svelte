<script context='module'>
    import { send } from '$lib/send'
    export async function load({page}){
        let {username} = page.params
        let user = await send({method: 'GET', path: `users/${username}`})
        if (!user) {
            return {
                status: 404,
                error: 'User not found'
            }
        } else if (user && user.error) {
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
        Row
    } from 'carbon-components-svelte'
    import DisplayField from '$lib/components/DisplayField.svelte'
    import {parseMarkdown} from '$lib/utils/parseMarkdown'
    import { onMount } from 'svelte';

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

{#if user.image}
    <Column lg={2} sm={2} md={2} xlg={2}>
        <img style='width: 100%;' alt='user display _image' src={user.image}>
    </Column>
{/if}
{#if user.username}
    <DisplayField field={{label: 'username', value: user.username}} />
{/if}

<br />

<DisplayField field={{label: 'id', value: user.id}} />

<br />

{#each user.fields as field}
    <DisplayField {field} />
{/each}

<style>
    .heading {
        font-weight: 600;
    }
    .username-slash {
        color: blue;
    }   
</style>