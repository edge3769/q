<script>
    import { InlineNotification } from 'carbon-components-svelte';
    export let errors;
</script>

{#if errors}
        {#each errors as error}
            <InlineNotification
                kind={error.kind}
                title={error.title}
                hideCloseButton/>
        {/each}
{/if}