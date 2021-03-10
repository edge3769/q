<script>
    import { createEventDispatcher } from 'svelte'
    import {
        Button,
        Row
    } from 'carbon-components-svelte'
    import Favorite16 from 'carbon-icons-svelte/lib/Favorite16'

    const dispatch = createEventDispatcher()
</script>

<Button
    {...$$restProps}
    iconDescription='Save'
    tooltipAlignment='center'
    tooltipPosition='bottom'
    on:click={() => (dispatch('toggle'))}
    kind='ghost'
    hasIconOnly
    icon={Favorite16}/>