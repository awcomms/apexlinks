<script>
  export let valueItems
    export let ref = null
    export let field = {}
    export let acceptKey

    import {
        Button, ComboBox
    } from 'carbon-components-svelte'
    import Input from '$lib/components/Input/Input.svelte'    
    import Edit16 from 'carbon-icons-svelte/lib/Edit16'

    import {
        createEventDispatcher,
        onMount
    } from 'svelte'

  const editClick = () => {
    field.dirty = {'label': field.label, 'value': field.value}
    field.edit=true
  }

  const dispatch = createEventDispatcher()
    
  onMount(()=>{
    if(ref) ref.focus()
    field.focused = true
})

const valueKeydown = (e) => {
    if (e.key === acceptKey) {
      dispatch('valueAccept')
    }
  }
</script>

{#if valueItems}
  <ComboBox
    bind:ref
    on:keydown
    bind:items={valueItems}
    on:keydown={valueKeydown}
    labelText={field.label}
    bind:value={field.value}
  />
{:else}
  <Input
      bind:ref
      on:keydown
      labelText={field.label}
      bind:value={field.value}
      on:keydown={valueKeydown}
  />
{/if}
<Button
    iconDescription='Edit'
    hasIconOnly
    kind='ghost'
    size='small'
    icon={Edit16}
    on:click={editClick}
/>