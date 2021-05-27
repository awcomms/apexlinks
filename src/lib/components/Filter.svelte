<script>
    export let fields = []

    import {
        Modal,
    } from 'carbon-components-svelte'
    import Fields from './Fields/Fields.svelte'

    let open
</script>

<Modal
    bind:open
/>

<Fields bind:fields />
