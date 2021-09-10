<script>
  export let color
  export let icon_path
  export let heading
  export let body
</script>

<div class="main">
  <div class="icon-container">
    <div style="background-color: {color};" class="icon">
      <img src={icon_path} alt='small icon for a step to book ticket'>
    </div>
  </div>
  <div class="text">
    <p class="heading">{heading}</p>
    <p class="body">{body}</p>
  </div>
</div>

<style>
  @font-face {
    font-family: Poppins;
    src: url('poppins.ttf');
    font-weight: 400;
    line-height: 124.5%;
  }
  :global(body) {
    font-family: Poppins;
  }

  .icon {
    box-sizing: border-box;
    border-radius: 13px;
    height: 37px;
    width: 37px;
    height: auto;
    padding: 0.3rem;
    text-align: center;
  }
  p {
    margin: 0;
  }

  .main {
    width: auto;
    display: flex;
    flex-direction: row;
    gap: 1rem 1rem;
    align-items: stretch;
  }

  .text {
    display: flex;
    flex-direction: column;
    /* align-items: flex-start; */
  }
</style>