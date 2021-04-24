<script>
    export let value = ''
    export let focus = true
    export let password = ''

    import {
        PasswordInput,
        TextInput
    } from 'carbon-components-svelte'
    import { onMount } from 'svelte'

    let ref

    onMount(()=>{
        if(focus) ref.focus()
    })
</script>

{#if password}
    <PasswordInput bind:value bind:ref {...$$restProps} invalid />
{:else}
    <TextInput bind:value bind:ref {...$$restProps} invalid />
{/if}