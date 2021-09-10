<script>
  import Trip from "$lib/components/Trip.svelte";
  import Ongoing from "$lib/components/Ongoing.svelte";
</script>

<div class="ongoing">
  <Ongoing />
</div>
<Trip />

<style>
  .ongoing {
    position: absolute;
    top: 200px;
    right: 20px;
  }
</style>