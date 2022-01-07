<script context="module">
    export  const load = async({ session }) => {
        let user = session.user
        console.log(user)
        if (!user) {
            return {
                status: 302,
                redirect: '/'
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
    import Input from '$lib/components/Input/Input.svelte'
    import Tag from '$lib/components/Tag.svelte'
    import {
        Row,
        Button,
        Column,
        ButtonSet,
        FluidForm,
        InlineLoading
    } from 'carbon-components-svelte'
    import {
        browser
    } from '$app/env'
    import {
        open,
        context,
        username
    } from '$lib/stores'
    import { goto } from '$app/navigation'
    import { api } from '$lib/api'

    let nameInvalid
    let userInvalid
    let nameError
    let userError
    let loading
    let name
    let tags

    $: if(browser && $username) {
        setTimeout(checkUser, 123)
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

    const add = async function() {
        loading = true
        if (!name){
            nameInvalid = true
            nameError = 'Empty'
            loading = false
            return
        }
        if (!$username){
            userInvalid = true
            userError = 'Empty'
            loading = false
            return
        }
        let data = {
            username: $username,
            // open: $open,
            name,
            tags,
        }
        let res = await api.post('rooms', data).finally((r)=>{
            loading = false
            console.log(r)
        })
        if (res.nameError) {
            nameError = res.nameError
            nameInvalid = true
            loading = false
        } else if (res.userError) {
            userError = res.userError
            userInvalid = true
            loading = false
        } else if (res.id) {
            $context=name
            loading=false
            goto(`/room/${res.id}`)
        }
    }
</script>

<svelte:head>
    <title>Add Room</title>
</svelte:head>

<!-- <Row noGutter>
    <Column>
        <Checkbox bind:checked={$open} labelText={openLabel} />
    </Column>
</Row> -->

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
                    {#if loading}
                        <InlineLoading />
                    {/if}
                </div>
            </Button>
        </ButtonSet>
    </Column>
</Row>