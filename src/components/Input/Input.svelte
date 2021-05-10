<script>
    export let ref
    export let value = ''
    export let invalid = false

    import Invalid from './Invalid.svelte'
    import Valid from './Valid.svelte'

    let current = Valid

    $: if (invalid) {
        current = Invalid
    } else {
        current = Valid
    }
</script>

<svelte:component on:change this={current} {...$$restProps} bind:ref bind:value />