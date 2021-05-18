<script>
    export let href
    export let text
    import { isSideNavOpen } from '$lib/stores'
    import { SideNavLink } from 'carbon-components-svelte'

    const click=()=>{
        $isSideNavOpen=false
    }
</script>

<SideNavLink {...$$restProps} on:click on:click={click} bind:href bind:text />