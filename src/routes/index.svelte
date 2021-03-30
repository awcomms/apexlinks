<script>
    import {
        Row,
        Column,
        PaginationNav,
    } from 'carbon-components-svelte'
    import * as api from 'api'
    import {
        itemTags
    } from '../stores.js'
    import Tag from '../components/Tag.svelte'
    import {goto} from '@sapper/app'

    let items = []
    let page = 0
    let total = 0
    let pages = 0

    let got

    let addTag=()=>{
        if (tag != '' && !$itemTags.includes(tag)){
            $itemTags=[...$itemTags, tag]
            open=true
            tag=''
        }
    }

    let delTag=(tag)=>{
        $itemTags=$itemTags.filter(t => t != tag)
        get()
    }

    let clear = () => {
        $itemTags = []
        open = false
    }

    let get = async function(){
        let tagString = JSON.stringify($itemTags)
        let url = `items?tags=${tagString}&visible=1&page=${page+1}`
        let res = await api.get(url)
        items = res.items
        total = res.total
        pages = res.pages
        got = true

    }
</script>

<svelte:head>
    <title>Apexlinks</title>
</svelte:head>

<Tag on:change={get} placeholder='Search' bind:tags={$itemTags} />    

{#each items as item}
    <br />
    <Row noGutter>
        <div>
            {#if item.image}
            <span><img style='vertical-align: top;' height='37px' width='37px' alt='profile pic' src={item.image}></span>
            {:else}
                <span><img style='vertical-align: top;' height='37px' width='37px' alt='profile pic' src='/placeholder.png'></span>
            {/if}
            <h4 class='pointer' on:click={goto(`item/${item.id}`)}>{item.name}</h4>
            <p class='bx--link--sm'>{item.itype}</p>
        </div>
    </Row>
{/each}

<!--08168080932 - Whatsapp
    08032146531 - Normal -->

{#if got && total < 1}
    <Row noGutter>
        <Column>
            <p>There don't seem to be any results</p>        
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
    .pointer:hover {
        cursor: pointer;
    }
</style>