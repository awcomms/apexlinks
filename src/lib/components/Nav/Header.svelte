<script>
  import SideNavLink from "./SideNavLink.svelte";
  import SideNavMenuItem from "./SideNavMenuItem.svelte";
  import { api } from "$lib/utils";
  import { page } from "$app/stores";
  import url8 from "$lib/url8";
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
      .then((registration) => {
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

  if (typeof window != "undefined") {
    if (navigator && navigator.serviceWorker && $session.user) {
      getSub();
    }
  }


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
    <SideNavMenu text="Rooms">
      {#if $session.user}
        <SideNavMenuItem isSelected={$page.url.pathname === `${routes.rooms}/add`} href='{routes.rooms}/add' text="Add room" />
        <SideNavMenuItem
          text="My rooms"
          href="{routes.rooms}?user={$session.user.id}"
          isSelected={$page.url.pathname === routes.rooms && $page.url.searchParams.get('user') ===
            $session.user.id}
        />
      {/if}
      <SideNavMenuItem text='All rooms' href='/r' isSelected={$page.url.pathname === routes.rooms} />
    </SideNavMenu>
    <SideNavMenu text="Items">
      {#if $session.user}
        <SideNavMenuItem isSelected={$page.url.pathname === '/i/add'} href='/i/add' text="Add item" />
        <SideNavMenuItem
          text="My items"
          href="{routes.items}?user={$session.user.id}"
          isSelected={$page.url.pathname === routes.items && $page.url.searchParams.get('user') ===
            $session.user.id}
        />
      {/if}
    </SideNavMenu>
    {#if $session.user}
      <SideNavLink isSelected={$page.url.pathname === `/u/${$session.user.username}`} text="Me" href="/u/{$session.user.username}" />
      <SideNavLink isSelected={$page.url.pathname === '/edit'} href="/edit" text="Edit Profile" />
      <SideNavLink text="Exit" href={null} on:click={exit} />
    {/if}
  </SideNavItems>
</SideNav>
