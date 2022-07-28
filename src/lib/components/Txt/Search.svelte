<script>
    import { Modal, LocalStorage } from 'carbon-components-svelte'

    import { txtSearchTags } from '$lib/store'
    import { txtSearchModalOpen } from '$lib/store'
    import { Tags } from '$lib/Tag'

    let items = []

    /*
        joined
        user - mine
        txts
        parents - children - txts - radio buttons
    */
</script>

<LocalStorage key='txtSearchTags' bind:value={$txtSearchTags} />

<Modal bind:open={$txtSearchModalOpen}>
    <Tags bind:tags={$txtSearchTags} />

    {#each items as item}

    {/item}
</Modal>