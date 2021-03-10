<script>
    export let lon
    export let lat
    export let zoom

    import { onMount } from 'svelte'
    import { mapbox } from 'mapbox'

    let container
    let map

    onMount(() => {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/mapbox-gl/dist/mapbox-gl.css'

        link.onload = () => {
            map = new mapbox.Map({
                container,
                style: 'mapbox://styles/mapbox/streets-v9',
                center: [lon, lat],
                zoom
            })
            document.head.appendChild(link)

            return () => {
                map.remove()
                link.parentNode.removeChild(link)
            }
        }
    })
</script>

<style>
    div {
        width: 100%;
        height: 100%;
    }
</style>

<div bind:this={container}>
    {#if map}
        <slot />
    {/if}
</div>