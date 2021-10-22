<script>
    import {
        Button
    } from 'carbon-components-svelte'
    import PinFilled16 from 'carbon-icons-svelte/lib/PinFilled16'
</script>

<Button
    iconDescription='Unpin field'
    hasIconOnly
    kind='ghost'
    size='small'
    icon={PinFilled16}
    on:click
/>