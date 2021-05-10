<script>
    export let ref
    export let value = ''
    export let focus = true
    export let password = ''

    import {
        PasswordInput,
        TextInput
    } from 'carbon-components-svelte'
    import { onMount } from 'svelte'

    onMount(()=>{
        if(focus) ref.focus()
    })
</script>

{#if password}
    <PasswordInput on:change bind:value bind:ref {...$$restProps} invalid />
{:else}
    <TextInput on:change bind:value bind:ref {...$$restProps} invalid />
{/if}