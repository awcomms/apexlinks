<script>
    export let field

    import {
        Button
    } from 'carbon-components-svelte'
    import Delete16 from 'carbon-icons-svelte/lib/Delete16'
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()
</script>

<Button
    hasIconOnly
    kind='ghost'
    size='field'
    icon={Delete16}
    on:click={()=>{dispatch('del')}}
/>