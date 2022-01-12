<script>
  import SideNavLink from "./SideNavLink.svelte";
  import SideNavMenuItem from "./SideNavMenuItem.svelte";
  import { api } from "$lib/api";
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
  href="/users"
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
          href=''
          text="Add To Homescreen"
        />
      {/if}
      <SideNavLink isSelected={$page.url.pathname === '/login'} text="Login" href="/" />
    {/if}
    <!-- <SideNavMenu text='Rooms'>
      {#if $session.user}
        <SideNavMenuItem isSelected={$page.url.pathname === '/add-room'} href='add-room' text="Add room" />
        <SideNavMenuItem
          text="My rooms"
          href="/rooms?username={$session.user.username}"
          isSelected={$page.url.searchParams.get('username') ===
            $session.user.username}
        />
      {/if}
      <SideNavMenuItem text='All rooms' href='/rooms' isSelected={$page.url.pathname === '/rooms'} />
    </SideNavMenu> -->
    <SideNavMenu text="Items">
      {#if $session.user}
        <SideNavMenuItem isSelected={$page.url.pathname === '/add-item'} href='/add-item' text="Add item" />
        <SideNavMenuItem
          text="My items"
          href="/items?username={$session.user.username}"
          isSelected={$page.url.pathname === '/items' && $page.url.searchParams.get('username') ===
            $session.user.username}
        />
      {/if}
      <SideNavMenuItem
        isSelected={$page.url.pathname === '/items' && !$page.url.searchParams.get('username')}
        text="Search all items"
        href="/items"
      />
    </SideNavMenu>
    {#if $session.user}
      <SideNavLink isSelected={$page.url.pathname === `/u/${$session.user.username}`} text="Me" href="/u/{$session.user.username}" />
      <SideNavLink isSelected={$page.url.pathname === '/edit'} href="/edit" text="Edit Profile" />
      <SideNavLink text="Exit" href='' on:click={exit} />
    {/if}
  </SideNavItems>
</SideNav>
