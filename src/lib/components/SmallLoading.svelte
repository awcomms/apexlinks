<script>
    let className = undefined;
    export let small = true;
    export { className as class };
    export let active = true;
    export let id = undefined;
    export let tabindex = undefined;
    export let focusable = false;
    export let title = undefined;
    export let style = undefined;

    $: ariaLabel = $$props['aria-label'];
    $: ariaLabelledBy = $$props['aria-labelledby'];
    $: labelled = ariaLabel || ariaLabelledBy || title;
    $: attributes = {
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
        'aria-hidden': labelled ? undefined : true,
        role: labelled ? 'img' : undefined,
        focusable: tabindex === '0' ? true : focusable,
        tabindex
    };
</script>

<div
aria-atomic="true"
aria-labelledby="{id}"
aria-live="{active ? 'assertive' : 'off'}"
class:bx--loading="{true}"
class:bx--loading--small="{small}"
class:bx--loading--stop="{!active}"
{...$$restProps}
>
<svg
    data-carbon-icon="Close20"
    class:bx--loading__svg="{true}"
    on:click
    on:mouseover
    on:mouseenter
    on:mouseleave
    on:keyup
    on:keydown
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"
    class={className}
    preserveAspectRatio="xMidYMid meet"
    {style}
    {id}
    {...attributes}
>
        <!-- <path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"></path> -->
        <circle
            class:bx--loading__background="{true}"
            cx="50%"
            cy="50%"
            r="{42}"
        >
        </circle>
        <circle
            class:bx--loading__stroke="{true}"
            cx="50%"
            cy="50%"
            r="{42}"
        >
        </circle>
        <slot>
            {#if title}
                <title>{title}</title>
            {/if}
        </slot>
</svg>
</div>