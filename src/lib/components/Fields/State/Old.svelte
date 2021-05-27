<script>
    export let field

    import {
        Button
    } from 'carbon-components-svelte'
    import Input from '$lib/components/Input/Input.svelte'
    import Close16 from 'carbon-icons-svelte/lib/Close16'
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()
</script>

<Button
    hasIconOnly
    kind='ghost'
    size='field'
    icon={Close16}
    on:click={()=>{dispatch('cancel')}}
/>