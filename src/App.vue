<template>
  <main id="app">
    <div class="alert alert-primary fade show" id="boring-alert" role="alert" v-if="!warningDismissed">
      It's quite possible the video player might not work right now. Hopefully I'll make a more elegant solution at a later date, but for now please download the source from <a href="https://github.com/Julzso23/smoothroll/archive/master.zip">here</a>, then head to the url: <b>chrome://extensions/</b>, enable <b>Developer mode</b>, press <b>Load unpacked</b>, then select the <b>extension</b> folder from the source you downloaded
      <button type="button" class="close" aria-label="Close" @click="dismissWarning">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

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
  data: () => ({
    warningDismissed: false
  }),
  methods: {
    dismissWarning () {
      this.warningDismissed = true
      window.localStorage.setItem('warningDismissed', this.warningDismissed)
    }
  },
  mounted () {
    this.warningDismissed = window.localStorage.getItem('warningDismissed') || false
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

  #boring-alert {
    border-radius: 0;
    margin: 0;
    text-align: center;
  }
</style>
