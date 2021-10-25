<script>
  import {
    Content,
    Grid,
  } from "carbon-components-svelte"
  import {
    newUser
  } from '$lib/stores'
  import "carbon-components-svelte/css/all.css"
  import Header from "$lib/components/Header.svelte"
  import Theme from "$lib/components/Theme.svelte"

  $newUser = false
</script>

<Theme persist theme="g10">
  <Header />
  <Content style="background: none; padding: 1rem">
    <Grid>
      <slot />
    </Grid>
  </Content>
</Theme>