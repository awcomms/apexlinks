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
        Link,
    } from 'carbon-components-svelte'
    import Filter16 from 'carbon-icons-svelte/lib/Filter16'
    import { api } from '$lib/api'
    import {
        users,
        newUser,
        userTags,
        userFields
    } from '$lib/stores'
    import Filters from '$lib/components/Filters.svelte'
    import Tag from '$lib/components/Tag.svelte'
    import {goto} from '$app/navigation'

    $: if (got) get(page)

    let filtersOpen

    $users = []
    let page = 0
    let total = 0
    let pages = 0

    let got

    const gotoJoin = () => {
        $newUser = true
        goto('/login')
    }

    const get = async () => {
        let tagString = JSON.stringify($userTags)
        let url = `users?tags=${tagString}&page=${page+1}`
        let res = await api.get(url)
        if(Array.isArray(res.items)){
            $users = res.items
            total = res.total
            pages = res.pages
            got = true
        }
    }
</script>

<svelte:head>
    <title>Apexlinks - search for products, businesses and services</title>
    <meta
        name=keywords
        content='
            business directory,
            yellow pages,
            business catalogues
        '
    >
    <meta
        name=description
        content='Search apexlinks.org for products, services and businesses globally
        and near you using filters and tags'
    >
</svelte:head>

<Filters
    bind:fields={$userFields}
    bind:open={filtersOpen}
    on:search={get}
/>

<Tag 
    on:iconClick={()=>{filtersOpen=!filtersOpen}} 
    bind:tags={$userTags}
    placeholder='Search'
    icon={Filter16}
    on:change={get}
    button
/>  

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

{#if !(got && user)}
    <Row noGutter>
        <Column>
            <p>This is a global directory for products, businesses, and services</p>
            <Link
                href=''
                on:click={(e)=>{
                    e.preventDefault;
                    gotoJoin();
                }}
            >
                Click here to join
            </Link>
        </Column>
    </Row>
{/if}

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