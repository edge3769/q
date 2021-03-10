<script>
    export let ref
    import { createEventDispatcher } from 'svelte'

    let dispatch = createEventDispatcher()

    let wheel = (e) => {
        if (e.deltaX < 0){
            dispatch('scrollLeft')
        } else if (e.deltaX > 0){
            dispatch('scrollRight')
        }
        if (e.deltaY < 0){
            dispatch('scrollUp')
        } else if (e.deltaY > 0){
            dispatch('scrollDown')
        }
    }
</script>

<div on:wheel on:mousewheel={wheel} bind:this={ref} />