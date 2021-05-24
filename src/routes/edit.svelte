<svelte:window on:keydown={keydown} />

<script context="module">
    import * as api from '$lib/api.js';
    export async function load({ session }) {
        let token = session.token
        if (!token){
            return {
                status: 302,
                redirect: '/login'
            }
        }
        let user = await api.get('user', token)
        return {
            props: {
                user
            }
        }
    }
</script>
    
<script>
    export let user
    import {pk_test} from '$lib/vars'
    import { session } from '$app/stores'
    import { goto } from '$app/navigation';
    import {
        InlineLoading,
        FluidForm,
        TextInput,
        Checkbox,
        TextArea,
        Button,
        Column,
        Row,
    } from 'carbon-components-svelte'
    import Input from '$lib/components/Input/Input.svelte'
    import Image from '$lib/components/Image.svelte'
    import Tag from '$lib/components/Tag.svelte'
    import Paystack from '$lib/components/Paystack.svelte'
    import { 
        checkEmail,
        abslink 
    } from '$lib/utils'

    $: checkUsername(username)

    $: if(username) username = username.toLowerCase()
    $: if(email) email = email.toLowerCase()

    let config = {
        key: process.env.NODE_ENV === 'development' ? pk_test : process.env.PAYSTACK,
        email: user.email,
        metadata: {
            id: user.id
        },
        amount: 190233,
        currency: "NGN",
        embed: false,
        value: "Pay"
    }

    let show_email = user.show_email
    let username = user.username
    let visible = user.visible
    let address = user.address
    let website = user.website
    let image = user.image
    let email = user.email
    let phone = user.phone
    let about = user.about
    let token = user.token
    let name = user.name
    let tags = user.tags || []

    let usernameInvalid
    let usernameError

    let websiteInvalid
    let websiteError

    let emailInvalid
    let emailError

    let loading

    let linkError = 'Add a url scheme to the link, something like "http://, at the beginning'
    
    const keydown=(e)=>{
        switch(e.keyCode){
            case 13:
                if (e.ctrlKey){
                    edit()
                }
        }
    }

    const checkUsername=async()=>{
        if (username != user.username){
            usernameInvalid = await api.get(`check_username/${username}`).then(r => !r.res)
        }
    }

    const edit=async()=>{
        loading = true
        if(website && !abslink.test(website)){
            websiteInvalid = true
            editLoading = false
            return
        }
        if (!email){
            emailInvalid = true
            emailError = 'Empty'
            loading = false
            return
        }
        if (!checkEmail(email)){
            emailInvalid = true
            emailError = 'Unaccepted'
            loading = false
            return 
        }
        if (!username){
            usernameInvalid = true
            usernameError = 'Empty'
            loading = false
            return
        }
        if (checkEmail(username)){
            usernameInvalid = true
            usernameError = 'Unaccepted'
            loading = false
            return
        }
        let data = {
            show_email,
            username,
            visible,
            website,
            address,
            email,
            phone,
            about,
            image,
            tags,
            name,
        } 
        let res = await api.put('users', data, token).finally(
            (r)=>{
                loading = false
                return r
            }
        )
        if (res.id) {
            goto(`/${res.username}`)
        }
    }
</script>

<svelte:head>
    <title>Edit</title>
</svelte:head>

<Paystack {config} />
<Image bind:image>
    {#if user.paid}
        <Button
            on:click={()=>{config.open=true}}
            size='small'
        >
            Renew subscription
        </Button>
        <Button
            on:click={()=>{config.open=true; config.amount=3000; config.metadata.purpose='change_card'}}
            size='small'
        >
            Change card
        </Button>
    {:else}
        <Button
            on:click={()=>{config.open=true}}
            size='small'
        >
            Subscribe
        </Button>
    {/if}
</Image>

<Row noGutter>
    <Column>
        <Checkbox bind:checked={visible} labelText='Public'/>
    </Column>
</Row>

<Tag bind:tags />
    
<Row noGutter>
    <Column>
        <FluidForm>
            <Input
                bind:invalidText={usernameError}
                bind:invalid={usernameInvalid}
                bind:value={username}
                labelText="Username"
            />
            <Checkbox labelText='Show email in profile' bind:checked={show_email} />
            <TextInput labelText="Email" bind:value={email} />
            <TextInput labelText="Name" bind:value={name} />
            <TextInput labelText="Phone" bind:value={phone} />
            <TextInput labelText="Address" bind:value={address} />
            <Input 
                invalid={websiteInvalid}
                invalidText={websiteError}
                labelText='Link' 
                bind:value={website} 
            />
            <TextArea rows={11} placeholder='About (Markdown)' bind:value={about} />
        </FluidForm>
    </Column>
</Row>
    
<Row noGutter>
    <Column>
        <Button as let:props>
            <div on:click={edit} {...props}>
                <p>Edit</p>
                {#if loading}
                    <div class='right'>
                        <InlineLoading />
                    </div>
                {/if}
            </div>
        </Button>
    </Column>
</Row>

<style>
    .right {
        float: right;
    }
</style>