<svelte:window on:keydown={keydown} />

<script context="module">
    export async function load({ session }) {
        let user = await api.get('user', session.token)
        console.log(user)
        if (!user) {
            return {
                status: 302,
                redirect: 'login'
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
    export let user = {}
    import {initialCaps} from '$lib/utils'
    import Image from '$lib/components/Image.svelte'
    import Tag from '$lib/components/Tag.svelte'
    import Input from '$lib/components/Input/Input.svelte'
    import {
        Row,
        Button,
        Column,
        Checkbox,
        TextArea,
        TextInput,
        ButtonSet,
        FluidForm,
    } from 'carbon-components-svelte'
    import { goto } from '$app/navigation'
    import { session } from '$app/stores'
    import * as api from '$lib/api'

    $: itype = initialCaps(itype)

    let nameInvalid

    let link
    let name
    let price
    let itext
    let itype
    let redirect

    let tags = []
    let loading
    let image

    const keydown = (e) => {
        switch(e.keyCode){
            case 13:
                if (e.ctrlKey){
                    add()
                }
        }
    }

    const add=async()=>{
        loading = true
        let data = {
            tags,
            name,
            image,
            price,
            itype,
            itext
        }
        let res = await api.post('items', data, $session.token).finally(
            (r)=>{
                loading=false
                return r
            }
        )
        if (res.nameError) {
            nameInvalid = true
        }
        if (res.id) {
            goto(`/item/${res.id}`)
        }
    }
</script>

<svelte:head>
    <title>Add Item</title>
</svelte:head>

<Image bind:image />

<Tag bind:tags />

<Row noGutter>
    <Column>
        <FluidForm>
            <Input
                bind:invalid={nameInvalid}
                invalidText='Name taken'
                labelText="Name"
                bind:value={name} 
            />
            <!-- <TextInput labelText="Item Type" bind:value={itype} /> -->
            <Checkbox bind:checked={redirect} 
                labelText="Let the item's listing redirect to a link" />
            {#if redirect}
                <TextInput labelText="Link" bind:value={link} />
            {/if}
            {#if !redirect}
                <TextArea placeholder='Description(Markdown)' labelText="Description(markdown)" bind:value={itext} />
            {/if}
        </FluidForm>
    </Column>
</Row>

<Row noGutter>
    <Column>     
        <ButtonSet stacked>
            <Button on:click={add}>Add</Button>
        </ButtonSet>
    </Column>
</Row>