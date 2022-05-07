<script>
    import O from './O.svelte'
    const a = [1,2,3]
</script>

<O ii={(v) => a.find(q => q === v)} i={1} />