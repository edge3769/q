<svelte:window on:appinstalled={installed} on:beforeinstallprompt={before} />

<script>
  import * as api from 'api'
  import url8 from 'url8'
  import { post } from 'utils.js'
  import { stores, goto } from '@sapper/app'
  import SideNavLink from './SideNavLink.svelte'
  import { isSideNavOpen, logged } from '../stores.js'
  import {
    SkipToContent,
    SideNavItems,
    SideNav,
    Header
  } from "carbon-components-svelte"

  let show
  let installRef
  let installPrompt
  $isSideNavOpen = false

  const { page, session } = stores()

  $: console.log($page.path.split('/')[1])

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

  if ($session.user){
    $logged = true
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
      api.post('subs', {id: $session.user.id, sub: sub})
    })
  }

  // if(typeof window != 'undefined'){
  //   if(navigator && navigator.serviceWorker && $session.user){
  //     getSub()  
  //   }
  // }

  const exit = async()=>{
    await post(`auth/exit`)
    delete $session.user
    $logged=false
    goto('login')
  }
</script>

<Header 
  persistentHamburgerMenu={true}
  company="Apexlinks"
  platFormName=''
  bind:isSideNavOpen={$isSideNavOpen}
  href='/'
>
  <div slot="skip-to-content">
    <SkipToContent />
  </div>
</Header>

<SideNav bind:isOpen={$isSideNavOpen}>
  <SideNavItems>
    {#if $session.user && $logged}
      {#if show}
        <SideNavLink bind:ref={installRef} on:click={install} href='' text='Add To Homescreen'/>
      {/if}
      <SideNavLink isSelected={$page.path.split('/')[1] == 'add_item' ? true : false} href='add_item' text='Add Item'/>
      <SideNavLink isSelected={$page.path.split('/')[1] == 'items' ? true : false}  href='items/{$session.user.id}' text='My Items'/>
      <SideNavLink isSelected={$page.path.split('/')[1] == 'edit' ? true : false}  href='edit' text='Edit'/>
      <SideNavLink text='Exit' href='' on:click={exit} />
    {/if}
    {#if !$session.user || !$logged}
      <SideNavLink isSelected={$page.path.split('/')[1] == 'login' ? true : false}  text='Login' href='login'/>
    {/if}
  </SideNavItems>
</SideNav>