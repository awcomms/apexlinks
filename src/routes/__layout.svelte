<script>
  import { ToastNotification, Content, Grid } from "carbon-components-svelte";
  import { notify, newUser } from "$lib/stores";
  import "carbon-components-svelte/css/all.css";
  import Header from "$lib/components/Nav/Header.svelte";
  import Theme from "$lib/components/Theme.svelte";
  // Import the functions you need from the SDKs you need
  // import { initializeApp } from "firebase/app";
  // import { getAnalytics } from "firebase/analytics";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBxx5PtRIFpeefbpZE3SlHsMKIyzasRQjE",
    authDomain: "apexlinks-e45e6.firebaseapp.com",
    projectId: "apexlinks-e45e6",
    storageBucket: "apexlinks-e45e6.appspot.com",
    messagingSenderId: "522440061287",
    appId: "1:522440061287:web:d6af1e0bb99f0177f23fc2",
    measurementId: "G-2VKWX9JRLR",
  };

  // Initialize Firebase
  // const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);

  $newUser = false;

  let notifyOpen;
  $: if ($notify) notifyOpen = true;
</script>

<Theme persist theme="g10">
  <!-- {#if notifyOpen}
    <div class="notify">
      <ToastNotification
        kind={$notify.kind}
        title={$notify.title}
        subtitle={$notify.subtitle}
        caption={$notify.caption}
      />
    </div>
  {/if} -->
  <Header />
  <Content style="background: none; padding: 1rem">
    <Grid>
      <slot />
    </Grid>
  </Content>
</Theme>

<style>
  .notify {
    position: absolute;
  }
</style>
