<template>
  <div>
    <ul class="nav nav-pills nav-fill mb-4">
      <li class="nav-item mr-1">
        <router-link class="nav-link text-light" exact-active-class="active" to="/browse">{{$t('navbar.browse')}}</router-link>
      </li>
      <li class="nav-item ml-1">
        <router-link class="nav-link text-light" active-class="active" to="/browse/categories">{{$t('media.categories')}}</router-link>
      </li>
    </ul>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'browse',
  mounted () {
    document.title = `${this.$t('navbar.browse')} ― Smoothroll`
  }
}
</script>

<style lang="scss" scoped>
  @import 'scss/_variables';

  .nav-link:hover,
  .nav-link.active {
    color: $light !important;
  }

  .nav-link:not(.active):hover {
    background-color: $secondary;
  }
</style>
