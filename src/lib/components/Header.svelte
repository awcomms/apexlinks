<script context='module'>
  import * as api from '$lib/api'
  export async function load({session}){
    console.log('z')
    const token = session.token
    let user
    if(token){
      const res = await api.get('user', token)
      console.log('sl', res)
      if(res){
        user = res
      }
    }
    console.log(user)
    return {
      props: {
        user
      }
    }
  }
</script>

<svelte:window on:appinstalled={installed} on:beforeinstallprompt={before} />

<script>
  export let user = null
  import url8 from '$lib/url8'
  import { post } from '$lib/utils.js'
  import { goto } from '$app/navigation'
  import {
    navigating,
    page
  } from '$app/stores'
  import SideNavLink from './SideNavLink.svelte'
  import { isSideNavOpen } from '$lib/stores'
  import {
    InlineLoading,
    SkipToContent,
    SideNavMenu,
    SideNavItems,
    SideNav,
    Header,
  } from "carbon-components-svelte"

  console.log('us', user)

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

  const prompt=()=>{
    window.addEventListener('beforeInstallPrompt', (e)=>{
      e.preventDefault()
      deferredPrompt = e
      deferredPrompt.prompt()
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
      api.post('subs', {id: user.id, sub: sub})
    })
  }

/*
  if(typeof window != 'undefined'){
    if(navigator && navigator.serviceWorker && user){
      getSub()  
    }
  }*/

  const exit=async()=>{
    await post('/auth/exit')
    goto('/login')
  }
</script>

<Header 
  persistentHamburgerMenu={true}
  company="Apexlinks"
  platFormName=''
  bind:isSideNavOpen={$isSideNavOpen}
  href='/'
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
    {#if !user}
      {#if show}
        <SideNavLink bind:ref={installRef} on:click={install} href='' text='Add To Homescreen'/>
      {/if}
      <SideNavLink isSelected={$page.path.split('/')[1] == 'login' ? true : false}  text='Login' href='/login'/>
    {/if}
    {#if user}
      <SideNavMenu text='Rooms'>
        <SideNavLink isSelected={$page.path.split('/')[1] == 'rooms' ? true : false} href='/rooms' text='All rooms'/>
        <SideNavLink isSelected={$page.path.split('/')[1] == 'my_rooms' ? true : false} href='/my_rooms' text='My rooms'/>
        <SideNavLink isSelected={$page.path.split('/')[1] == 'add_room' ? true : false} href='/add_room' text='Add room'/>
      </SideNavMenu>
      <SideNavLink isSelected={$page.path.split('/')[1] == 'add_item' ? true : false} href='/add_item' text='Add Item'/>
      <SideNavLink isSelected={$page.path.split('/')[1] == 'items' ? true : false}  href='/items/{user.id}' text='My Items'/>
      <SideNavLink isSelected={$page.path.split('/')[1] == 'edit' ? true : false}  href='/edit' text='Edit'/>
      <SideNavLink text='Exit' href='' on:click={exit} />
    {/if}
  </SideNavItems>
</SideNav>