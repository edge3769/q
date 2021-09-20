<script>
  export let color;
  export let icon_path;
  export let heading;
  export let body;
</script>

<div class="step">
  <div style="background-color: {color};" class="icon">
    <img src={icon_path} alt="small icon for a step to book ticket" />
  </div>
  <p class="heading">{heading}</p>
  <p class="body">{body}</p>
</div>
