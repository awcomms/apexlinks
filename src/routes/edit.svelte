<script context="module">
    import { api } from '$lib/api.js';
    export async function load({ session }) {
        let user = session.user
        if(!user){
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

<svelte:window on:keydown={keydown} />

<script>
    export let user
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
    import Fields from '$lib/components/Fields/Fields.svelte'
    import Paystack from '$lib/components/Paystack.svelte'
    import Input from '$lib/components/Input/Input.svelte'
    import Image from '$lib/components/Image.svelte'
    import Tag from '$lib/components/Tag.svelte'
    import {
        browser
    } from '$app/env'
    import {
        session
    } from '$app/stores'
    import {
        PAYSTACK_TEST,
        PAYSTACK_TEST_KEY,
        PAYSTACK_LIVE_KEY
    } from '$lib/env'
    import { 
        checkEmail,
    } from '$lib/utils/checkEmail'
    import {
        abslink 
    } from '$lib/utils/abslink'

    // console.log('PAYSTACK_TEST', PAYSTACK_TEST, typeof(PAYSTACK_TEST))
    // console.log('PAYSTACK_TEST_KEY', PAYSTACK_TEST, typeof(PAYSTACK_TEST_KEY))
    // console.log('PAYSTACK_LIVE_KEY', PAYSTACK_LIVE_KEY, typeof(PAYSTACK_LIVE_KEY))

    let config = {
        key: PAYSTACK_TEST === 'true' ? PAYSTACK_TEST_KEY : PAYSTACK_LIVE_KEY,
        email: user.email,
        metadata: {
            id: user.id
        },
        amount: 3000,
        currency: "NGN",
        embed: false,
        value: "Pay",
        callback: () => {
            api.put('/users/activate', {id: user.id})
        }
    }

    let show_email = user.show_email
    let username = user.username
    let hidden = user.hidden
    let address = user.address
    let website = user.website
    let image = user.image
    let email = user.email
    let phone = user.phone
    let about = user.about
    let data = user.data
    let name = user.name
    let fields = user.fields || []
    console.log('after user.fields', fields)
    let tags = user.tags || []

    let usernameInvalid
    let usernameError

    let websiteError = 'Add a url scheme to the start of the link, "http://" or "https://"'
    let websiteInvalid

    let emailInvalid
    let emailError

    let loading

    const keydown=(e)=>{
        switch(e.keyCode){
            case 13:
                if (e.ctrlKey){
                    edit()
                }
        }
    }

    const edit=async()=>{
        let req_fields = fields.map((f) => {
            return {label: f.label, value: f.value}
        })
        loading = true
        if(website && !abslink.test(website)){
            console.log('website err')
            websiteInvalid = true
            loading = false
            return
        }
        if (!email){
            console.log('not email err')
            emailInvalid = true
            emailError = 'Empty'
            loading = false
            return
        }
        if (!checkEmail(email)){
            console.log('check email err')
            emailInvalid = true
            emailError = 'Unaccepted'
            loading = false
            return 
        }
        if (!username){
            console.log('username err')
            usernameInvalid = true
            usernameError = 'Empty'
            loading = false
            return
        }
        if(username !== user.username){
            if(await api.get(`check_username/${username}`).then(r => !r.res)){
                console.log('api check_username err')
                usernameInvalid = true
                usernameError = 'Username taken'
                loading = false
                return
            }
        }
        if (checkEmail(username)){
            console.log('check email username err')
            usernameInvalid = true
            usernameError = 'Unaccepted'
            loading = false
            return
        }
        let dt = {
            show_email,
            username,
            hidden,
            website,
            address,
            email,
            phone,
            about,
            fields: req_fields,
            image,
            data,
            tags,
            name,
        } 
        let res = await api.put('users', dt).finally(
            (r)=>{
                console.log('edit res: ', r)
                loading = false
                return r
            }
        )
        if (res.id) {
            $session.user = res
            goto(`/${res.username}`)
        }
    }
</script>

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
        <Checkbox bind:checked={hidden} labelText='Hide profile from public'/>
    </Column>
</Row>

<Tag
    helperText = 'Users can use tags to find you'
    bind:tags
/>

<br />
<Row noGutter>
    <Column>
        <Fields pin bind:fields />
    </Column>
</Row>
<br />

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
                labelText='External link - could be a website' 
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