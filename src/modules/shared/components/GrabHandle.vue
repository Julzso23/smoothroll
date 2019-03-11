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
  @import 'scss/_variables';
  $bg-color: $dark;
  $dot-color: #eee;
  $dot-size: 2px;
  $dot-space: 6px;

  .grab-handle {
    margin: auto;
    background:
      linear-gradient(90deg, $bg-color ($dot-space - $dot-size), transparent 1%) center,
      linear-gradient($bg-color ($dot-space - $dot-size), transparent 1%) center, $dot-color;
    background-size: $dot-space $dot-space;
  }
</style>
