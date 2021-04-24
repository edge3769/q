<script>
    export let value = ''
    export let is_focused = false
    export let password = ''
    import {
        PasswordInput,
        TextInput
    } from 'carbon-components-svelte'
    import { onMount } from 'svelte'

    let ref

    onMount(()=>{
        if(is_focused) ref.focus()
    })
</script>

{#if password}
    <PasswordInput bind:value bind:ref {...$$restProps} />
{:else}
    <TextInput bind:value bind:ref {...$$restProps} />
{/if}