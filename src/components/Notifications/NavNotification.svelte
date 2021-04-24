<script>
    import { notify } from '../../stores'
    import InvalidLink from './InvalidLink.svelte'
    import ResetSuccess from './ResetSuccess.svelte'

    let n = $notify
</script>

<div class='fixed'>
    {#if n == 'invalid'}
        <InvalidLink />
    {:else if n == 'resetSuccess'}
        <ResetSuccess />
    {/if}
</div>

<style>
    .fixed {
        position: fixed;
        z-index: 1000000; /* To make sure it's always on top */
        top: 0;
        left: 0;
    }
</style>