<script>
    export let ref
    export let value = ''
    export let focus = true
    export let password = ''
    export let invalid
    export let selectionStart
    export let autoValidate

    import {
        PasswordInput,
        TextInput
    } from 'carbon-components-svelte'
    import { onMount } from 'svelte'


    onMount(()=>{
        if(focus) ref.focus()
        console.log(ref.setSelectionRange)
        ref.setSelectionRange(selectionStart, selectionStart)
    })

    let set=(e)=>{
        if(autoValidate) invalid = false
        selectionStart = e.target.selectionStart
    }
</script>

{#if password}
    <PasswordInput on:input={set} on:change bind:value bind:ref {...$$restProps} invalid />
{:else}
    <TextInput on:input={set} on:change bind:value bind:ref {...$$restProps} invalid />
{/if}