<script context='module'>
    import { api } from '$lib/api'
    export async function load({ page, session }){
        let user = session.user
        let {id} = page.params
        let room = await api.get(`rooms/${id}`)
        if (!user){
            return {
                status: 302,
                redirect: '/login',
            }
        }
        if (!(room.user == user.username)){
            return {
                error: "You're not authorized to edit this room",
                status: "401"
            }
        }
        return {
            props: {
                room,
                user
            }
        }
    }
</script>

<script>
    export let room, user
    import {context} from '$lib/stores'
    import { goto } from '$app/navigation'
    import {
        FluidForm,
        ButtonSet,
        Column,
        Button,
        Modal,
        Row,
    } from 'carbon-components-svelte'
    import Tag from '$lib/components/Tag.svelte'
    import Input from '$lib/components/Input/Input.svelte'

    let nameInvalid

    let name = room.name
    let tags = room.tags
    let delOpen

    let del = async function(){
        let res = await api.del(`rooms/${room.id}`)
        if (res.yes){
            goto(`/rooms/${user.id}`)
        }
    }

    let edit = async function(){
        let data = {
            id: room.id,
            name,
            tags,
        }
        let res = await api.put('rooms', data)
        if (res.nameError) {
            nameInvalid = true
        }
        if (res.id){
            $context=name
            goto(`/room/${room.id}`)
        }
    }
</script>

<Modal
    bind:open={delOpen}
    modalHeading='Delete room'
    primaryButtonText='Delete'
    secondaryButtonText='Cancel'
    on:click:button--secondary={() => (delOpen=false)}
    on:submit={del}
>
    <p>Sure you want to delete this room?</p>
</Modal>

<svelte:head>
    <title>Edit Room</title>
</svelte:head>

{#if room.open}
    <Tag bind:tags />
{/if}

<Row noGutter>
    <Column>
        <FluidForm>
            <Input 
                labelText="Name" 
                bind:value={name}
                bind:invalid={nameInvalid}
                invalidText='Name taken'
            />
        </FluidForm>
    </Column>
</Row>

<Row noGutter>
    <ButtonSet stacked>
        <Button on:click={() => (delOpen=true)}>Delete</Button>
        <Button on:click={edit}>Edit</Button>
    </ButtonSet>
</Row>