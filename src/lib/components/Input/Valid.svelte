<script>
    export let ref
    export let value = ''
    export let focus = false
    export let selectionStart
    export let password = ''

    $: if(typeof window !== 'undefined') {
        if(ref && document.activeElement !== ref){
            ref.focus()
        }
    }

    let newValue

    import {
        PasswordInput,
        TextInput
    } from 'carbon-components-svelte'
    import { onMount } from 'svelte'

    onMount(()=>{
        if(focus) ref.focus()
        ref.setSelectionRange(selectionStart, selectionStart)
    })

    let set=(e)=>{
        selectionStart = e.target.selectionStart
    }
</script>

{#if password}
    <PasswordInput on:input={set} on:change bind:value bind:ref {...$$restProps} />
{:else}
    <TextInput on:input={set} on:change bind:value bind:ref {...$$restProps} />
{/if}