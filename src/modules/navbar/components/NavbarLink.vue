<template>
  <li class="nav-item">
    <router-link :to="to" class="nav-link"><slot></slot></router-link>
  </li>
</template>

<script>
  export default {
    name: 'navbar-link',
    props: {
      to: String
    }
  }
</script>

<style lang="scss" scoped>
  @import 'scss/_variables';

  .nav-item > .nav-link {
    padding: 12px;
  }

  .router-link-exact-active {
    border-bottom: solid 2px $primary;
  }
</style>
