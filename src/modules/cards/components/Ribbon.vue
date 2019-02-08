<template>
  <div class="ribbon"></div>
</template>

<script>
  export default {
    name: 'Ribbon'
  }
</script>

<style lang="scss" scoped>
  $width: 20px;
  $height: 35px;

  .ribbon {
    width: 0px;
    height: $height;
    background-color: transparent;
    position: absolute;
    right: 10px;
    border: solid ($width / 2) #B13A22;
    border-bottom: solid ($width / 2) transparent;
    transition: all 0.2s;
  }
</style>
