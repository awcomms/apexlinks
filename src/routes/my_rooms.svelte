<script context='module'>
    import { api } from '$lib/api'
    export async function load({session}){
        let user = session.user
        if(!user){
            return {
                status: 302,
                redirect: '/index'
            }
        }
        let rooms
        let {items, total, page} = await api.get('xrooms') || {}
        if (Array.isArray(items)) {
            rooms = items
        } else {
            rooms = []
        }
        return {
            props: {
                rooms,
                total,
                page,
                user
            }
        }
    }
</script>

<script>
    export let rooms
    export let total
    export let page
    import {
        Row,
        Column,
    } from 'carbon-components-svelte'
    import Tag from '$lib/components/Tag.svelte'
    import { goto } from '$app/navigation'

    let tags

    $: if(typeof document != 'undefined' && total>100 && document.body.scrollTop==document.body.scrollHeight){
        page++
        get()
    }

    let go=(room)=>{
        goto(`/room/${room.id}`)
    }

    let get=async()=>{
        let tagString = JSON.stringify(tags)
        let res = await api.get(`xrooms?tags=${tagString}&page=${page}`)
        rooms = res.items
        total = res.total
    }
</script>

<Tag on:change={get} bind:tags />

{#each rooms as room}
    <br />
    <Row noGutter>
        <Column>
            <p class:unseen={room.unseen} class='item' on:click={go(room)}>{room.name}</p>
        </Column>
    </Row>
{/each}

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