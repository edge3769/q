<script>
    import {createEventDispatcher} from 'svelte'
    export let alt = 'item'
    export let open
    export let url
    let ref

    const dispatch = createEventDispatcher()

    $: if (ref && url){
        ref.src = url
    }
    $: if (open) fill()

    const keydown = (e) => {
        if (e.key === 'Escape'){
            close()
        }
    }

    const wheel = (e) => {
        if (e.deltaX < 0){
            dispatch('down')
        } else if (e.deltaX > 0){
            dispatch('up')
        }
        if (e.deltaY < 0){
            dispatch('up')
        } else if (e.deltaY > 0){
            dispatch('down')
        }
    }

    let options = {navigationUI: 'hide'}

    function fill() {
        if (ref){
            if (ref.requestFullScreen){
                ref.requestFullScreen(options)
            } else if (ref.mozRequestFullScreen){
                ref.mozRequestFullScreen(options)
            } else if (ref.msRequestFullScreen){
                ref.msRequestFullScreen(options)
            } else if (ref.webkitRequestFullScreen){
                ref.webkitRequestFullScreen(options)
            }
        }
    }

    function exit() {
        if (ref){
            if (ref.exitFullScreen){
                ref.exitFullScreen(options)
            } else if (ref.mozExitFullScreen){
                ref.mozExitFullScreen(options)
            } else if (ref.msExitFullScreen){
                ref.msExitFullScreen(options)
            } else if (ref.webkitExitFullScreen){
                ref.webkitExitFullScreen(options)
            }
        }
    }
</script>

<svelte:window on:keydown={keydown} />

{#if open}
    <img src='' on:wheel={wheel} bind:this={ref} alt={alt} width='100%' height='100%'>
{/if}