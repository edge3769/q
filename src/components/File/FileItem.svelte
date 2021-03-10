<script>
    
    import Uploading from './Uploading.svelte'
    import Complete from './Complete.svelte'
    import Edit from './Edit.svelte'
    export let status
    export let name

    let current = Complete

    $: if (status == 'uploading'){
        current = Uploading
    } else if (status == 'edit'){
        current = Edit
    } else if (status == 'complete'){
        current = Complete
    }
</script>

<svelte:component this={current} disableLabelChanges {name} />