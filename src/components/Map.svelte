<script>
    export let open
    export let zoom = 3.5
    import { location } from '../stores.js'
    import OMap from './OMap.svelte'
    import MapMarker from './MapMarker.svelte'

    import { createEventDispatcher } from 'svelte'
    import { Button } from 'carbon-components-svelte'
    import Close16 from 'carbon-icons-svelte/lib/Close16'

    let dispatch = createEventDispatcher()

    $: console.log('map', $location)

    $: lat = $location.lat
    $: lon = $location.lon

    let toggle = function(){
        open=!open
        dispatch('toggle', open)
    }
</script>

<OMap bind:lat bind:lon bind:zoom>
    <MapMarker bind:lat bind:lon />
</OMap>

<Button
    kind='ghost'
    hasIconOnly
    icon={Close16}
    on:click={toggle}
    iconDescription='Close map'
    tooltipAlignment='center'
    tooltipPosition='bottom'
    style='position: absolute; top: 0; right: 0;'
/>