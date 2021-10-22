<script>
    export let ref = null
    export let field = {}
    export let acceptKey

    import {
        Button
    } from 'carbon-components-svelte'
    import Input from '$lib/components/Input/Input.svelte'    
    import Edit16 from 'carbon-icons-svelte/lib/Edit16'

    import {
        createEventDispatcher,
        onMount
    } from 'svelte'

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

<Input
    bind:ref
    on:keydown
    labelText={field.label}
    bind:value={field.value}
    bind:invalid={field.invalid}
    on:keydown={valueKeydown}
    invalidText={field.invalidText}
/>

<Button
    iconDescription='Edit'
    hasIconOnly
    kind='ghost'
    size='small'
    icon={Edit16}
    on:click={()=>{delete(field.dirty); field.dirty = field; field.edit=true}}
/>