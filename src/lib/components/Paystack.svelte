<script>
  export let config = {}
  import { onMount } from "svelte"

  $: if (mounted && config.open) pay()

  let mounted = false

  onMount(() => {
    mounted = true
  })

  function pay() {
    let handler = PaystackPop.setup(config)
    handler.openIframe()
  }
</script>

<svelte:head>
  <script src="https://js.paystack.co/v1/inline.js"></script>
</svelte:head>