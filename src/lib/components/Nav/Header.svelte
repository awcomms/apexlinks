<script>
  import SideNavLink from "./SideNavLink.svelte";
  import SideNavMenuItem from "./SideNavMenuItem.svelte";
  import { page } from "$app/stores";
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
  import { iterLength, routes } from "$lib/utils";

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

  const exit = () => {
    $session.user = null;
    post("/auth/exit");
    goto(routes.login);
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
    <SideNavLink isSelected={$page.url.pathname === routes.users} text="Users" href={routes.users} />
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
          isSelected={false}
        />
      {/if}
      <SideNavMenuItem text='All txts' href={routes.txts} isSelected={false} />
    </SideNavMenu>
    {#if $session.user}
      <SideNavLink isSelected={$page.url.pathname === `/u/${$session.user.username}`} text="Me: {$session.user.username}" href="/u/{$session.user.id}" />
      <SideNavLink isSelected={$page.url.pathname === '/edit'} href="/edit" text="Edit Profile" />
      <SideNavLink text="Exit" href={null} on:click={exit} />
    {/if}
  </SideNavItems>
</SideNav>
