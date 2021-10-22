<script>
    import {
        Button
    } from 'carbon-components-svelte'
    import Pin16 from 'carbon-icons-svelte/lib/Pin16'
</script>

<Button
    iconDescription='Pin field'
    hasIconOnly
    kind='ghost'
    size='small'
    icon={Pin16}
    on:click
/>