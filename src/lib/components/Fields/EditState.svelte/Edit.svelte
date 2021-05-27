<script>
    export let field

    import {
        Button
    } from 'carbon-components-svelte'
    import New from '$lib/components/Fields/State/New.svelte'
    import Old from '$lib/components/Fields/State/Old.svelte'
    import Input from '$lib/components/Input/Input.svelte'  
    import Checkmark16 from 'carbon-icons-svelte/lib/Checkmark16'

    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    $: if (field.new) {
        current = New
    } else {
        current = Old
    }

    let current
</script>

<Input
    bind:ref={field.ref}
    labelText='Label'
    bind:value={field.label}
    bind:invalid={field.invalid}
    invalidText={field.invalidText}
/>

<Button
    hasIconOnly
    kind='ghost'
    size='field'
    icon={Checkmark16}
    on:click={()=>{dispatch('edit')}}
/>

<svelte:component this={current} on:del on:cancel bind:field />