<script>
    export let itype

    import {
        RadioButtonGroup,
        RadioButton
    } from 'carbon-components-svelte'
</script>

<RadioButtonGroup bind:selected={itype}>
    <RadioButton labelText='Products' value='product' />
    <RadioButton labelText='Services' value='service' />
</RadioButtonGroup>