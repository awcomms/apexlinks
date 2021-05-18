<script>
    import Input from '$lib/components/Input/Input.svelte'
    let invalid
</script>

<input type='checkbox' bind:checked={invalid} />

<Input bind:invalid invalidText='yoooo' helperText='help' />