<script>
    import { createEventDispatcher } from 'svelte'
    import {
        Button,
        Row
    } from 'carbon-components-svelte'
    import FavoriteFilled16 from 'carbon-icons-svelte/lib/FavoriteFilled16'

    const dispatch = createEventDispatcher()
</script>

<Button
    {...$$restProps}
    iconDescription='Unsave'
    tooltipAlignment='center'
    tooltipPosition='bottom'
    on:click={() => (dispatch('toggle'))}
    kind='ghost'
    hasIconOnly
    icon={FavoriteFilled16}/>