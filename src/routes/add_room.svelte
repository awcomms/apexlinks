<script context="module">
    export async function load({ session }) {
        const user = session.user
        if (!user) {
            return {
                status: 302,
                redirect: 'enter'
            }
        }
        return { props: {user} }
    }
</script>

<script>
    export let user
    import Input from '$lib/components/Input/Input.svelte'
    import Tag from '$lib/components/Tag.svelte'
    import {
        Row,
        Button,
        Column,
        Checkbox,
        ButtonSet,
        FluidForm,
        InlineLoading
    } from 'carbon-components-svelte'
    import Exit from 'carbon-icons-svelte/lib/Exit'
    import {open, username, context} from '$lib/stores'
    import { goto } from '$app/navigation'
    import {api} from '$lib/utils/api'

    let nameInvalid
    let userInvalid
    let nameError
    let userError
    let openLabel
    let adding

    $: if(!$open){
        openLabel = 'Personal'
    } else {
        openLabel = 'Open'
    }

    $: change($username)

    $: if(process.browser && $username) {
        setTimeout(checkUser, 123)
    }

    let change=()=>{
        if($username){
            name = `${user.username}.${$username}`
        }
    }

    const checkUser=async()=>{
        if($username == '') return
        let res = await api.get(`users/${$username}`) || {}
        if(res.id){
            userInvalid = false
        } else {
            userInvalid = true
            userError = 'Not found'
        }
    }
    
    let name
    let tags

    const add = async function() {
        adding = true
        if (!name){
            nameInvalid = true
            nameError = 'Empty'
            adding = false
            return
        }
        if (!$username){
            userInvalid = true
            userError = 'Empty'
            adding = false
            return
        }
        let data = {
            username: $username,
            open: $open,
            name,
            tags,
        }
        let res = await api.post('rooms', data, user.token)
        if (res.nameError) {
            nameError = res.nameError
            nameInvalid = true
            adding = false
        } else if (res.userError) {
            userError = res.userError
            userInvalid = true
            adding = false
        } else if (res.id) {
            $context=name
            adding=false
            goto(`room/${res.id}`)
        }
    }
</script>

<svelte:head>
    <title>Add Room</title>
</svelte:head>

<Row noGutter>
    <Column>
        <Checkbox bind:checked={$open} labelText={openLabel} />
    </Column>
</Row>

{#if $open}
    <Tag bind:tags />
{/if}

<Row noGutter>
    <Column>
        <FluidForm>
            <Input
                bind:invalid={nameInvalid}
                invalidText={nameError}
                labelText="Name"
                bind:value={name} 
            />
            {#if !$open}
                <Input
                    bind:invalid={userInvalid}
                    invalidText={userError}
                    labelText='User'
                    bind:value={$username}
                />
            {/if}
        </FluidForm>
    </Column>
</Row>

<Row noGutter>
    <Column>     
        <ButtonSet stacked>
            <Button as let:props>
                <div on:click={add} {...props}>
                    <p>Add</p>
                    {#if adding}
                        <InlineLoading />
                    {/if}
                </div>
            </Button>
        </ButtonSet>
    </Column>
</Row>