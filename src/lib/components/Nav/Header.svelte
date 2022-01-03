<svelte:window on:appinstalled={installed} on:beforeinstallprompt={before} />

<script>
  import SideNavLink from './SideNavLink.svelte'
  import SideNavMenuItem from './SideNavMenuItem.svelte'
  import { api } from '$lib/api'
  import url8 from '$lib/url8'
  import {
    post
  } from '$lib/utils/fetch/post'
  import {
    goto
  } from '$app/navigation'
  import {
    navigating,
    session,
  } from '$app/stores'
  import {
    isSideNavOpen
  } from '$lib/stores'
  import {
    InlineLoading,
    SkipToContent,
    SideNavMenu,
    SideNavItems,
    SideNav,
    Header,
  } from "carbon-components-svelte"

  let show
  let installRef
  let installPrompt
  $isSideNavOpen = false

  const installed=()=>{
    show=false
  }

  const before=(e)=>{
    show=true
    e.preventDefault()
    installPrompt = e
  }

  const install=()=>{
        installPrompt.prompt()
        installPrompt.userChoice.then((choice)=>{
          if(choice.outcome === 'accepted'){
            show = false
          }
        })
  }

  const getSub=()=>{
    navigator.serviceWorker.ready
    .then((registration)=>{
      return registration.pushManager.getSubscription()
      .then(async(sub)=>{
        if (sub){
          return sub
        }

        const response = await fetch(`get`)
        const vapidKey = await response.text()
        let int8VapidKey = url8(vapidKey)
        const options = {
          userVisibleOnly: true,
          applicationServerKey: int8VapidKey
        }
        return registration.pushManager.subscribe(options)
      })
    }).then((sub)=>{
      api.post('subs', {id: $session.user.id, sub: sub})
    })
  }

  if(typeof window != 'undefined'){
    if(navigator && navigator.serviceWorker && $session.user){
      getSub()  
    }
  }

  const exit=()=>{
    $session.user = null
    post('/auth/exit')
    goto('/')
  }
</script>

<Header 
  persistentHamburgerMenu={true}
  company='Apexlinks'
  bind:isSideNavOpen={$isSideNavOpen}
  href='/users'
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
        <SideNavLink bind:ref={installRef} on:click={install} href='' text='Add To Homescreen'/>
      {/if}
      <SideNavLink text='Login' href='/'/>
    {/if}
    <SideNavMenu text='Rooms'>
      <SideNavMenuItem text='Add room' />
      <SideNavMenuItem text='All rooms' href='rooms' />
    </SideNavMenu>
    {#if $session.user}
      <SideNavLink text='Me' />
      <SideNavLink text='Items' />
      <SideNavLink href='/edit' text='Edit Profile'/>
      <SideNavLink text='Exit' href='' on:click={exit} />
    {/if}
  </SideNavItems>
</SideNav>