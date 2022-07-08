<script>
  import { Content, Grid } from "carbon-components-svelte";
  import { afterNavigate } from "$app/navigation"
  import { onMount } from "svelte";
  import { session } from '$app/stores'
  import {VAPID } from '$lib/env'
  import { api, url8 } from '$lib/utils'
  import { previousPage, newUser } from "$lib/stores";
  import "carbon-components-svelte/css/all.css";
  import Header from "$lib/components/Nav/Header.svelte";
  import Theme from "$lib/components/Theme.svelte";

  $newUser = false;

  afterNavigate(navigation => $previousPage = navigation.from?.pathname)

  const getSub = () => {
    navigator.serviceWorker.ready
      .then(async(registration) => {
        return registration.pushManager.getSubscription().then(async (sub) => {
          if (sub) {
            console.log('1sub', sub)
            return sub;
          }

          let int8VapidKey = url8(VAPID);
          const options = {
            userVisibleOnly: true,
            applicationServerKey: int8VapidKey,
          };
          let s = await registration.pushManager.subscribe(options).catch(e => console.dir(e));
          return s.toJSON()
        });
      })
      .then(async (sub) => {
        if (sub) await api.post("subs", { sub });
      });
  };

  onMount(()=>{
    if (navigator && navigator.serviceWorker && $session.user) {
      getSub();
    }
  })
</script>

<Theme persist theme="g10">
  <Header />
  <Content style="background: none; padding: 1rem">
    <Grid>
      <slot />
    </Grid>
  </Content>
</Theme>