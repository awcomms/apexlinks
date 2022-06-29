<script>
  import SideNavLink from "./SideNavLink.svelte";
  import SideNavMenuItem from "./SideNavMenuItem.svelte";
  import { api } from "$lib/utils";
  import { page } from "$app/stores";
  import { url8 } from "$lib/utils";
  import { post } from "$lib/utils/fetch/post";
  import { goto } from "$app/navigation";
  import { navigating, session } from "$app/stores";
  import { isSideNavOpen } from "$lib/stores";
  import {
    InlineLoading,
    SkipToContent,
    SideNavMenu,
    SideNavItems,
    SideNav,
    Header,
  } from "carbon-components-svelte";
  import {onMount } from 'svelte'
  import { routes } from "$lib/utils";

  let show;
  let installRef;
  let installPrompt;
  $isSideNavOpen = false;

  const installed = () => {
    show = false;
  };

  const before = (e) => {
    show = true;
    e.preventDefault();
    installPrompt = e;
  };

  const install = () => {
    installPrompt.prompt();
    installPrompt.userChoice.then((choice) => {
      if (choice.outcome === "accepted") {
        show = false;
      }
    });
  };

  const getSub = () => {
    navigator.serviceWorker.ready
      .then(async(registration) => {
        return registration.pushManager.getSubscription().then(async (sub) => {
          if (sub) {
            return sub;
          }

          const response = await fetch(`get`);
          const vapidKey = await response.text();
          let int8VapidKey = url8(vapidKey);
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
    if (navigator && navigator.serviceWorker && $session.user) {
      getSub();
    }
  })

  const exit = () => {
    $session.user = null;
    post("/auth/exit");
    goto("/");
  };
</script>

<svelte:window on:appinstalled={installed} on:beforeinstallprompt={before} />

<Header
  persistentHamburgerMenu={true}
  company="Apexlinks"
  bind:isSideNavOpen={$isSideNavOpen}
  href={routes.index}
>
  {#if $navigating}
    <InlineLoading />
  {/if}
  <div slot="skip-to-content">
    <SkipToContent />
  </div>
</Header>

<SideNav bind:isOpen={$isSideNavOpen}>
  <SideNavItems>
    {#if !$session.user}
      {#if show}
        <SideNavLink
          bind:ref={installRef}
          on:click={install}
          href={null}
          text="Add To Homescreen"
        />
      {/if}
      <SideNavLink isSelected={$page.url.pathname === routes.login} text="Login" href={routes.login} />
    {/if}
    <SideNavMenu text="Txts">
      {#if $session.user}
        <SideNavMenuItem
          text="My txts"
          href="{routes.txts}?user={$session.user.id}"
          isSelected={$page.url.pathname === routes.txts && $page.url.searchParams.get('user') ===
            $session.user.id}
        />
        <SideNavMenuItem
          text="Joined txts"
          href="{routes.txts}?joined"
          isSelected={$page.url.pathname === routes.txts && typeof $page.url.searchParams.get('joined') ===
            'string'}
        />
      {/if}
      <SideNavMenuItem text='All txts' href={routes.txts} isSelected={$page.url.pathname === routes.txts} />
    </SideNavMenu>
    {#if $session.user}
      <SideNavLink isSelected={$page.url.pathname === `/u/${$session.user.username}`} text="Me: {$session.user.username}" href="/u/{$session.user.id}" />
      <SideNavLink isSelected={$page.url.pathname === '/edit'} href="/edit" text="Edit Profile" />
      <SideNavLink text="Exit" href={null} on:click={exit} />
    {/if}
  </SideNavItems>
</SideNav>
