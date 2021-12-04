<script>
    import {
        Button
    } from 'carbon-components-svelte'
    import Image from '$lib/components/Image.svelte'
    let image = 'l'

    import {
    PAYSTACK_TEST,
    PAYSTACK_TEST_KEY,
    PAYSTACK_LIVE_KEY,
  } from "$lib/env";

  let config = {
    key: PAYSTACK_TEST === "true" ? PAYSTACK_TEST_KEY : PAYSTACK_LIVE_KEY,
    email: 'edge37@outlook.com', // TODO
    metadata: {
      id: 1,
    },
    amount: 3000,
    currency: "NGN",
    embed: false,
    value: "Pay",
    callback: () => console.log('paid')
    }
</script>

<Image bind:image>
    <Button
      on:click={() => {
        config.open = true;
      }}
      size="small"
    >
      Subscribe
    </Button>
</Image>
