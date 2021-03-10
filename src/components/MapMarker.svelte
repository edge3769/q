<script>
    import { getContext } from 'svelte'
    import { mapbox, key } from 'mapbox'

    const { getMap } = getContext(key)
    const map = getMap()

    export let lat
    export let lon

    const marker = new mapbox.Marker()
        .setLngLat([lon, lat])
        .addTo(map)
</script>