<script>
    $: console.log('map', center)
    export let open

    let lat
    let lon
    export let zoom
    export let center

    import { createEventDispatcher } from 'svelte'

    import {
        Button
    } from 'carbon-components-svelte'
    import Close16 from 'carbon-icons-svelte/lib/Close16'
    import { onMount } from 'svelte'
    import { mapbox } from 'mapbox'

    let dispatch = createEventDispatcher()

    let container
    let map

    let toggle = function(){
        open=!open
        dispatch('toggle', open)
    }


    /*$: if (marker && marker.getPosition) setPosition()

    let setPosition = function(){
        center = marker.getPosition().toJSON()
    }
    onMount(async() => {
        const options = {
            zoom,
            center,
            styles: [
                { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                {
                    featureType: "administrative.locality",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#d59563" }],
                },
                {
                    featureType: "poi",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#d59563" }],
                },
                {
                    featureType: "poi.park",
                    elementType: "geometry",
                    stylers: [{ color: "#263c3f" }],
                },
                {
                    featureType: "poi.park",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#6b9a76" }],
                },
                {
                    featureType: "road",
                    elementType: "geometry",
                    stylers: [{ color: "#38414e" }],
                },
                {
                    featureType: "road",
                    elementType: "geometry.stroke",
                    stylers: [{ color: "#212a37" }],
                },
                {
                    featureType: "road",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#9ca5b3" }],
                },
                {
                    featureType: "road.highway",
                    elementType: "geometry",
                    stylers: [{ color: "#746855" }],
                },
                {
                    featureType: "road.highway",
                    elementType: "geometry.stroke",
                    stylers: [{ color: "#1f2835" }],
                },
                {
                    featureType: "road.highway",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#f3d19c" }],
                },
                {
                    featureType: "transit",
                    elementType: "geometry",
                    stylers: [{ color: "#2f3948" }],
                },
                {
                    featureType: "transit.station",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#d59563" }],
                },
                {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{ color: "#17263c" }],
                },
                {
                    featureType: "water",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#515c6d" }],
                },
                {
                    featureType: "water",
                    elementType: "labels.text.stroke",
                    stylers: [{ color: "#17263c" }],
                }
            ]
        }

        map = new google.maps.Map(container, options)
        marker = new google.maps.Marker({
            draggable: true,
            location: center,
            map: map
        })

        map.addListener('click', (e) => {
            mark(e.latLng, map)
        })

        function mark(latLng, map){
            center = latLng
            marker.setPosition(latLng)
            map.panTo(latLng)
        }

        map.setCenter()
    })*/

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

<style lang='css'>
    div {
        width: 100%;
        height: 100%;
    }
    .map{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 500px;
    }
</style>

<Button
    kind='ghost'
    hasIconOnly
    icon={Close16}
    on:click={toggle}
    iconDescription='Close map'
    tooltipAlignment='center'
    tooltipPosition='bottom'
    style='location: absolute; top: 0; right: 0;'
/>

<div bind:this={container}>
    {#if map}
        <slot />
    {/if}
</div>

<!--<div>
    <div style='location: fixed;' class='map' bind:this={container}></div>
</div>-->