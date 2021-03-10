<script>
    export let obj

    import { createEventDispatcher } from 'svelte'
    import Unvisible from './Unvisible.svelte'
    import visibled from './visibled.svelte'

    const dispatch = createEventDispatcher()
    let current

    $: if (!obj.visible) {
            current = Unvisible
        } 
        else if (obj.visible) {
            current = visibled
        }
</script>

<svelte:component {...$$restProps} this={current} bind:obj on:toggle={() => (dispatch('toggle'))} />