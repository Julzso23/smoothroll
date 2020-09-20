<template>
  <main id="app">
    <navbar />
    <div class="alert alert-primary alert-dismissible fade show" role="alert">
      It's quite possible the video player might not work right now. Hopefully I'll make a more elegant solution at a later date, but for now please download the source from <a href="https://github.com/Julzso23/smoothroll/archive/master.zip">here</a>, then head to the url: <b>chrome://extensions/</b>, enable <b>Developer mode</b>, press <b>Load unpacked</b>, then select the <b>extension</b> folder from the source you downloaded
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

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
  beforeCreate () {
    this.$store.commit('locale/setLocale', window.localStorage.getItem('locale') || 'enUS')
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
