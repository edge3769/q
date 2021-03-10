<script>
    export let obj

    import { createEventDispatcher } from 'svelte'
    import Saved from './Unsaved.svelte'
    import Unsaved from './Saved.svelte'

    const dispatch = createEventDispatcher()
    let current

    $: if (!obj.saved) {
            current = Unsaved
        } 
        else if (obj.saved) {
            current = Saved
        }
</script>

<svelte:component {...$$restProps} this={current} bind:obj on:toggle={() => (dispatch('toggle'))} />