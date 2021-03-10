<script>
  import { post } from 'utils.js'
  import { stores, goto } from '@sapper/app'
  import {
    SkipToContent,
    SideNavItems,
    SideNavLink,
    SideNav,
    Header
  } from "carbon-components-svelte"

  let { session } = stores()

  let isSideNavOpen = false

  let exit = async function() {
    await post(`auth/exit`)
    delete $session.user
    goto('enter')
  }
</script>

<Header 
  persistentHamburgerMenu={true}
  company="Marketlinks"
  platFormName=''
  bind:isSideNavOpen
  href='/'
>
  <div slot="skip-to-content">
    <SkipToContent />
  </div>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    {#if $session.user}
      <SideNavLink href='add_item' text='Add Item'/>
      <SideNavLink href='items/{$session.user.id}' text='My Items'/>
      <SideNavLink href='edit' text='Edit'/>
      <SideNavLink text='Exit' href='' on:click={exit} />
    {/if}
    {#if !$session.user}
      <SideNavLink text='Enter' href='enter'/>
    {/if}
  </SideNavItems>
</SideNav>