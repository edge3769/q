<script>

</script>

<div class="main">
  <div>
    <img src="jalingo.png">
  </div>
  <div class="details">
    <p class="purple">Ongoing</p>
    <p>Trip to Jalingo</p>
    <p>40% Completed</p>
    <progress class="progress" max="100" value="40"></progress>
  </div>
</div>

<style>
  .progress {
    color: rgb(164, 37, 196);
  }

  .progress::-webkit-progress-bar {
    border: none;
    /* color: rgb(164, 37, 196); */
  }

  .progress::-webkit-progress-value {
    background-color: rgb(164, 37, 196);
  }

  .progress::-moz-progress-value {
    background-color: rgb(164, 37, 196);
  }

  .progress::-moz-progress-bar {
    /* color: rgb(164, 37, 196); */
  }

  .purple {
    color: rgb(164, 37, 196);
  }
  .main {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-radius: 4px;
    padding: 10px;
    background-color: white;
    border-radius: 18px;
    display: flex;
    flex-direction: row;
    column-gap: 1rem;
  }
</style>