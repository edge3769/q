<script>
    export let value
    export let password

    import {
        PasswordInput,
        TextInput
    } from 'carbon-components-svelte'
    import { onMount } from 'svelte'

    let ref

    onMount(() => {
        ref.focus()
    })
</script>

{#if password}
<PasswordInput {...$$restProps} bind:ref invalid bind:value />
{:else}
<TextInput {...$$restProps} bind:ref invalid bind:value />
{/if}