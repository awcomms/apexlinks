<script context='module'> 
    import { api } from '$lib/api'
    export async function load({session}){
        let user = session.user
        if(!user){
            return {
                status: 302,
                redirect: '/login',
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
        Column
    } from 'carbon-components-svelte'
    import Tag from '$lib/components/Tag.svelte'
    import { goto } from '$app/navigation'
    import {
        roomTags
    } from '$lib/stores'

    let rooms = []
    let page = 0
    let total = 0
    let got

    let go=async(room)=>{
        await api.put('join', {id: room.id})
        goto(`/room/${room.id}`)
    }

    let get = async function(){
        let tagString = JSON.stringify($roomTags)
        let url = `rooms?tags=${tagString}&page=${page+1}`
        let res = await api.get(url)
        if(Array.isArray(res.items)){
            rooms = res.items
        }
        total = res.total
        got = true

    }
</script>

<svelte:head>
    <title>Apexlinks</title>
</svelte:head>

<Tag on:change={get} bind:tags={$roomTags} />

{#each rooms as room}
    <br />
    <Row noGutter>
        <Column>
            <p class:unseen={room.unseen} class='item' href='' on:click={go(room)}>{room.name}</p>
        </Column>
    </Row>
{/each}

{#if got && total < 1}
    <Row noGutter>
        <Column>
            <p>There don't seem to be any results</p>        
        </Column>
    </Row>
{/if}

<style>
    .item {
        cursor: pointer; 
    }
    .item:hover {
        color: grey;
    }
    .unseen {
        font-weight: 600;
    }    
</style>