<script>
  import { Content, Grid } from "carbon-components-svelte";
  import { afterNavigate } from "$app/navigation"
  import { onMount } from "svelte";
  import { session } from '$app/stores'
  import { api } from '$lib/utils'
  import { previousPage, newUser } from "$lib/stores";
  import "carbon-components-svelte/css/all.css";
  import Header from "$lib/components/Nav/Header.svelte";
  import Theme from "$lib/components/Theme.svelte";

  $newUser = false;

  afterNavigate(navigation => $previousPage = navigation.from?.pathname)

  const getSub = () => {
    navigator.serviceWorker.ready
      .then(async(registration) => {
        console.log('ready')
        return registration.pushManager.getSubscription().then(async (sub) => {
          if (sub) {
            return sub;
          }

          let int8VapidKey = url8(VAPID);
          const options = {
            userVisibleOnly: true,
            applicationServerKey: int8VapidKey,
          };
          return registration.pushManager.subscribe(options);
        });
      })
      .then((sub) => {
        api.post("subs", { id: $session.user.id, sub: sub });
      });
  };

  onMount(()=>{
    console.log('layout mount')
    if (navigator && navigator.serviceWorker && $session.user) {
      console.log('hmm')
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