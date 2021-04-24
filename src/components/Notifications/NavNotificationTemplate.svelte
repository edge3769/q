<script>
    import ToastNotification from './ToastNotification.svelte'
</script>

<ToastNotification
    caption={new Date().toLocaleString()}
    {...$$restProps}
/>