<template>
  <li class="nav-item">
    <router-link :to="to" class="nav-link" active-class="active" :exact="exact"><slot></slot></router-link>
  </li>
</template>

<script>
export default {
  name: 'navbar-link',
  props: {
    to: String,
    exact: Boolean
  }
}
</script>

<style lang="scss" scoped>
  @import 'scss/_variables';

  .nav-item > .nav-link {
    padding: 12px;
    border-bottom: solid 2px transparent;
    transition: border-bottom-color 0.1s linear;
  }

  .nav-item > .nav-link:hover {
    border-bottom-color: $primary / 1.5;
    background: rgba(255, 255, 255, 0.03);
  }

  .nav-item > .nav-link.active {
    border-bottom-color: $primary;
  }
</style>
