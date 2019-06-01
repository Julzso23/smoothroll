<template>
  <div class="phone">
    <div class="screen">
      <div class="embed-responsive embed-responsive-9by18">
        <img :src="image" class="embed-responsive-item" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'phone-screenshot',
  props: {
    image: String
  }
}
</script>

<style lang="scss" scoped>
  .phone {
    margin: 10px;
    padding: 2% 2% 4% 2%;
    background-color: #333;
    border: 1px solid #111;
    border-radius: 8%/4%;
    box-shadow: 0 1px 2px black;
  }

  .screen {
    border-radius: 8%/4%;
    overflow: hidden;
  }
</style>
