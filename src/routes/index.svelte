<script context='module'>
    export async function load({session}){
        let user = session.user
        if (!user){
            return {
                status: 302,
                redirect: '/login'
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
    export let user
    import {
        Row,
        Column,
        PaginationNav,
    } from 'carbon-components-svelte'
    import { api } from '$lib/api'
    import {
        users,
        newUser,
        userTags
    } from '$lib/stores'
    import Tag from '$lib/components/Tag.svelte'
    import {goto} from '$app/navigation'

    $: if (got) get(page)

    $users = []
    let page = 0
    let total = 0
    let pages = 0

    let got

    const get = async function(){
        let tagString = JSON.stringify($userTags)
        let url = `users?tags=${tagString}&page=${page+1}`
        let res = await api.get(url)
        console.log('r.i', res.items)
        if(Array.isArray(res.items)){
            $users = res.items
            total = res.total
            pages = res.pages
            got = true
        }
    }
</script>

<svelte:head>
    <title>Apexlinks</title>
</svelte:head>

<Tag
    bind:tags={$userTags}
    placeholder='Search'
    on:change={get}
/>

<!-- {#if !got && !user}
    <Row noGutter>
        <Column>
            <p>This is a global business directory</p>
            <p on:click={()=>{$newUser = true; goto('/login')}} style="color: blue; cursor: pointer;">Click here if you'd like to list your business, products and services here</p>
        </Column>
    </Row>
{/if} -->

{#each $users as user}
    <br />
    <Row noGutter>
        <Column lg={4} sm={4} md={4} xlg={4}>
            <div on:click={goto(`/${user.username}`)} class='pointer user'>
                {#if user.image}
                    <img style='vertical-align: top;' height='52px' width='52px' alt='profile pic' src={user.image}>
                {:else}
                    <img style='vertical-align: top;' height='52px' width='52px' alt='profile pic' src='/placeholder.png'>
                {/if}
                <div class='label'>
                    <h4>{user.username}</h4>
                    {#if user.username}
                        <p class='bx--link--sm'>{user.username}</p>
                    {/if}
                </div>
            </div>
        </Column>
    </Row>
{/each}

{#if got && total < 1}
    <Row noGutter>
        <Column>
            <p>There doesn't seem to be any results</p>        
        </Column>
    </Row>
{/if}

{#if total>10}
    <Row noGutter>
        <Column>
            <PaginationNav loop bind:page bind:total={pages}/>
        </Column>
    </Row>
{/if}

<style>
    .label {
        padding-left: 0.5rem
    }
    .user {
        display: flex;
        flex-direction: row;
    }
    .pointer:hover {
        cursor: pointer;
    }
</style>