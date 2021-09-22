<script>
  import Ongoing from "$lib/components/Ongoing.svelte";
</script>

<div class="trip">
  <div class="ongoing-container">
    <Ongoing />
  </div>
  <div class="image">
    <img class="img" src="calabar.png" alt="Calabar in an example of a booking">
  </div>
  <h3>Trip To Calabar</h3>
  <p class="grey">14th June | By Abayomi</p>
  <div class="button-row">
    <div class="icon">
      <img alt='leaf button icon in ui snapshot' src='leaf.png'>
    </div>
    <div class="icon">
      <img alt='map button icon in ui snapshot' src='map.png'>
    </div>
    <div class="icon">
      <img alt='navigation button icon in ui snapshot' src='navigation.png'>
    </div>
  </div>
  <div class="stats-row">
    <div class="building icon">
      <img alt="building button icon in ui snapshot" src="building.png">
    </div>
    <p class='grey passenger-count'>24 people going</p>
    <div class="icon heart">
      <img alt='heart button icon in ui snapshot' src="heart.png">
    </div>
  </div>
</div>