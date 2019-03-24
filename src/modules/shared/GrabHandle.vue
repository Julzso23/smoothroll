<template>
  <div class="grab-handle" :style="{width: dotsX * 6 + 'px', height: dotsY * 6 + 'px'}"></div>
</template>

<script>
export default {
  name: 'grab-handle',
  props: {
    dotsX: Number,
    dotsY: Number
  }
}
</script>

<style lang="scss" scoped>
  .grab-handle {
    background: url('~images/grabHandle.svg');
    background-repeat: repeat;
    transition: transform 100ms;
  }

  .card:hover .grab-handle {
    transform: scale((1 / 1.05));
  }
</style>
