<script>
    export let item
    export let user
    import { goto } from '$app/navigation'
    import {
        FluidForm,
        ButtonSet,
        Checkbox,
        TextArea,
        Column,
        Button,
        Modal,
        Row,
    } from 'carbon-components-svelte'
    import Tag from '$lib/components/Tag/Tags.svelte'
    import Image from '$lib/components/Image.svelte'
    import Fields from '$lib/components/Fields/Fields.svelte'
    import Input from '$lib/components/Input/Input.svelte'

    let nameInvalid

    let itext = item.itext
    let hidden = item.hidden
    let redirect = item.redirect
    let price = item.price
    let link = item.link
    let image = item.image
    let fields = item.fields || []
    let name = item.name
    let tags = item.tags

    let linkRef
    let linkInvalid
    let linkError = 'Add a url scheme to the link, something like "http://, at the beginning'

    let delOpen
    let delLoading
    let editLoading

    const keydown = (e) => {
        switch(e.keyCode){
            case 13:
                if (e.ctrlKey){
                    edit()
                }
        }
    }

    const del=async()=>{
        delLoading = true
        let res = await api.del(`items/${item.id}`).finally(
            (r)=>{
                delLoading = false
                return r
            }
        )
        if (res.yes){
            goto(`/items?username=${user.username}`)
        } //TODO else reload the page
    }

    const edit=async()=>{
        editLoading = true
        if(redirect && !abslinkRegex.test(link)){
            linkInvalid = true
            editLoading = false
            return
        }
        let data = {
            itext,
            image,
            link,
            redirect,
            hidden,
            fields,
            price,
            // itype,
            name,
            tags,
        }
        let res = await api.put(`items/${item.id}`, data).finally(
            (r)=>{
                editLoading = false
                return r
            }
        )
        if (res.nameError) {
            nameInvalid = true
            nameError = res.nameError
        }
        if (res.id){
            goto(`/i/${res.id}`)
        }
    }
</script>

<svelte:window on:keydown={keydown} />

<Modal
    bind:open={delOpen}
    modalHeading='Delete item'
    primaryButtonText='Delete'
    secondaryButtonText='Cancel'
    on:click:button--secondary={() => (delOpen=false)}
    on:submit={del}
>
    <p>Sure you want to delete this item?</p>
</Modal>

<svelte:head>
    <title>Edit Item</title>
</svelte:head>

<Image bind:image />

<Row noGutter>
    <Column>
        <Checkbox bind:checked={hidden} labelText='Hidden' />
    </Column>
</Row>

<Tag bind:tags />

<Row noGutter>
    <Column>
        <Fields pin bind:fields />
    </Column>
</Row>

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
        <FluidForm>
            <!-- <TextInput labelText="Item type" bind:value={itype} /> -->
            <Checkbox bind:checked={redirect} 
                labelText="Let the item's listing redirect to a link" />
            {#if redirect}
                <Input
                    on:input={()=>{linkInvalid=false; linkRef.focus()}}
                    bind:invalid={linkInvalid}
                    bind:invalidText={linkError}
                    bind:value={link}
                    labelText='Link'
                    bind:ref={linkRef}
                />
            {:else}
                <TextArea placeholder='Description(Markdown)' bind:value={itext} />
            {/if}
        </FluidForm>
    </Column>
</Row>

<Row noGutter>
    <ButtonSet stacked>
        <Button on:click={() => (delOpen=true)}>Delete Item</Button>
        <Button on:click={edit}>Edit</Button>
    </ButtonSet>
</Row>