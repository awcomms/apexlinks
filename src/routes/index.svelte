<script context='module'>
    export async function load({page, session}){
        let token = session.token
        let notify = page.query.notify
        return {notify}
    }
</script>

<script>
    export let token
    export let notify

    import {
        Row,
        Column,
        PaginationNav,
    } from 'carbon-components-svelte'
    import * as api from '$lib/api'
    import {
        itemTags
    } from '$lib/stores'
    import ResetSuccess from '$lib/components/Notifications/ResetSuccess.svelte'
    import Tag from '$lib/components/Tag.svelte'
    import {goto} from '$app/navigation'

    $: if (got) get(page)

    let items = []
    let page = 0
    let total = 0
    let pages = 0

    let got

    const get = async function(){
        let tagString = JSON.stringify($itemTags)
        let url = `items?tags=${tagString}&page=${page+1}`
        let res = await api.get(url)
        if(Array.isArray(res.items)){
            items = res.items
            total = res.total
            pages = res.pages
            got = true
        }
    }
</script>

{#if notify == 'resetSuccess'}
    <ResetSuccess />
{/if}

<svelte:head>
    <title>Apexlinks</title>
</svelte:head>

<Tag on:change={get} placeholder='Search' bind:tags={$itemTags} />    

{#each items as item}
    <br />
    <Row noGutter>
        <Column lg={1} sm={1} md={1} xlg={1}>
            <div on:click={goto(`/item/${item.id}`)} class='pointer item'>
                {#if item.image}
                    <img style='vertical-align: top;' height='52px' width='52px' alt='profile pic' src={item.image}>
                {:else}
                    <img style='vertical-align: top;' height='52px' width='52px' alt='profile pic' src='/placeholder.png'>
                {/if}
                <div class='label'>
                    <h4>{item.name}</h4>
                    {#if item.user}
                        <p class='bx--link--sm'>{item.user}</p>
                    {/if}
                    <!-- {#if item.itype}
                        <p class='bx--link--sm'>{item.itype}</p>
                    {/if} -->
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
    .item {
        display: flex;
        flex-direction: row;
    }
    .pointer:hover {
        cursor: pointer;
    }
</style>