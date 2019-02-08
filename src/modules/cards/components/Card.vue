<template>
  <div class="card bg-dark text-light">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'card'
  }
</script>

<style lang="scss" scoped>
  @import 'scss/_variables';

  .card {
    border: none;
    box-shadow: 0px 1px 2px black;
  }

  .card:hover {
    box-shadow: 0px 1px 4px black;
  }
</style>
