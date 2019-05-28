<template>
  <main id="app">
    <navbar />

    <div class="container" v-if="!$route.meta.disableContainer">
      <router-view />
    </div>
    <router-view v-else />

    <app-footer />
  </main>
</template>

<script>
import Navbar from 'modules/navbar/Navbar'
import AppFooter from 'modules/footer/Footer'

export default {
  name: 'app',
  components: {
    Navbar,
    AppFooter
  },
  beforeCreate() {
    this.$store.commit('locale/setLocale', window.localStorage.getItem('locale'))
  }
}
</script>

<style lang="scss">
  html, body, #app {
    height: 100%;
  }

  #app {
    display: flex;
    flex-direction: column;
  }
</style>
