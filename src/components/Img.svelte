<script>
    export let urls
    export let open
    import FSBox from './FSBox.svelte'

    let url = urls[0]

    const up = () => {
        url = urls[urls.indexOf(url)+1]
    }

    const down = () => {
        url = urls[urls.indexOf(url)-1]
    }
</script>

<FSBox
    bind:url
    bind:open
    on:up={up}
    on:down={down}
/>