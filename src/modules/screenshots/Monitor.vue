<template>
  <div>
    <div class="monitor">
      <div class="embed-responsive embed-responsive-16by9">
        <img :src="image" class="screenshot embed-responsive-item" />
      </div>
    </div>

    <div class="stand" />
  </div>
</template>

<script>
export default {
  name: 'monitor-screenshot',
  props: {
    image: String
  }
}
</script>

<style lang="scss" scoped>
  .monitor {
    background: #333;
    padding: 2%;
    border: solid 1px #111;
    border-radius: 1%/1.7%;
    box-shadow: 0 1px 2px black;
  }

  .stand {
    left: 40%;
    margin: 0 auto;
    width: 20%;
    height: 32px;
    background: #2c2c2c;
    border: solid 1px #111;
    border-top: none;
    border-bottom: none;
  }
</style>
