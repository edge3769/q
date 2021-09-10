<script>
  import Step from '$lib/components/Step.svelte'

  let steps = [
    {
      color: '#F0BB1F',
      path: 'select.png',
      heading: 'Choose Destination',
      text: 'Select your vacation/baecation trip to your next destination',

    },
    {
      color: '#F15A2B',
      path: 'sail.png',
      heading: 'Make Payment',
      text: 'Select your mode of payment to your preferred location with the most securred payment gateway',

    },
    {
      color: '#006380',
      path: 'taxi.png',
      heading: 'Reach Airport, Train or Bus Station on Selected Date',
      text: 'Get to your airport, train  and or bus sation on your selected date and enjoy your trip.',

    }
  ]
</script>

<div class="main">
  {#each steps as step}
    <Step color={step.color} icon_path={step.path} heading={step.heading} body={step.text} />
  {/each}
</div>

<style>
  .main {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  }
</style>

