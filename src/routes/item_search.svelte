<script context='module'>
    export async function load({page, session}){
        return {
            props: {
            }
        }
    }
</script>

<script>
    import {
        Row,
        Column,
        PaginationNav,
    } from 'carbon-components-svelte'
    import { api } from '$lib/api'
    import {
        itemFields,
        itemTags,
        notify,
    } from '$lib/stores'
    import Filter16 from 'carbon-icons-svelte/lib/Filter16'
    import ResetSuccess from '$lib/components/Notifications/ResetSuccess.svelte'
    import Tag from '$lib/components/Tag.svelte'
    import {goto} from '$app/navigation'
    import Filters from '$lib/components/Filters.svelte';

    $: if (got) get(page)

    let filtersOpen

    let items = []
    let page = 0
    let total = 0
    let pages = 0

    let got

    const go=async(item)=>{
        item = await api.get(`items/${item.id}`)
        if(!item || item.error){
            $notify = {
                title: error
            }
            return
        } else {
            goto(`/item/${item.id}`)
        }
    }

    const get = async()=>{
        let tagString = JSON.stringify($itemTags)
        let fieldString = JSON.stringify($itemFields)
        let url = `items?fields=${fieldString}&$tags=${tagString}&page=${page+1}`
        let res = await api.get(url)
        if(Array.isArray(res.items)){
            items = res.items
            total = res.total
            pages = res.pages
            got = true
        }
    }
</script>

<svelte:head>
    <title>Apexlinks</title>
</svelte:head>

<Filters
    bind:fields={$itemFields}
    bind:open={filtersOpen}
    on:search={get}
/>

<Tag 
    on:iconClick={()=>{filtersOpen=!filtersOpen}} 
    bind:tags={$itemTags}
    placeholder='Search'
    icon={Filter16}
    on:change={get}
    button
/>    

{#each items as item}
    <br />
    <Row noGutter>
        <Column lg={1} sm={1} md={1} xlg={1}>
            <div on:click={go} class='pointer item'>
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
                    {#if item.itype}
                        <p class='bx--link--sm'>{item.itype}</p>
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
    .item {
        display: flex;
        flex-direction: row;
    }
    .pointer:hover {
        cursor: pointer;
    }
</style>