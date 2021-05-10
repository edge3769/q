<script>
    export let ref
    export let value = ''
    export let is_focused = false
    export let password = ''
    import {
        PasswordInput,
        TextInput
    } from 'carbon-components-svelte'
    import { onMount } from 'svelte'

    onMount(()=>{
        if(is_focused) ref.focus()
    })
</script>

{#if password}
    <PasswordInput on:change bind:value bind:ref {...$$restProps} />
{:else}
    <TextInput on:change bind:value bind:ref {...$$restProps} />
{/if}