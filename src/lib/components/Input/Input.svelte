<script>
    export let ref
    export let value = ''
    export let invalid = false
    export let autoValidate = true

    import Invalid from './Invalid.svelte'
    import Valid from './Valid.svelte'

    let current = Valid
    let selectionStart

    $: if (invalid) {
        current = Invalid
    } else {
        current = Valid
    }
</script>

<svelte:component 
    this={current}
    {...$$restProps}
    bind:selectionStart
    bind:autoValidate
    bind:invalid
    bind:ref 
    bind:value 
/>