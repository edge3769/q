<script>
    export let href
    export let text
    import { isSideNavOpen } from '../stores.js'
    import { SideNavLink } from 'carbon-components-svelte'

    const click=()=>{
        $isSideNavOpen=false
    }
</script>

<SideNavLink on:click on:click={click} bind:href bind:text />