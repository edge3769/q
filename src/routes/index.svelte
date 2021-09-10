<script>
  import Left from "$lib/components/Left.svelte";
  import Right from "$lib/components/Right.svelte";
</script>

<div class="main">
  <div class="left">
    <Left />
  </div>
  <div class="right">
    <Right />
  </div>
</div>

<style>
  .main {
    display: flex;
    flex-direction: row;
  }

  .left {
    width: 50%;
    padding-right: 5rem;
  }

  .right {
    padding-left: 2rem;
  }
</style>