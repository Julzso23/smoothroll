<template>
  <div class="bg-dark mb-4 navbar-container">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <router-link to="/" class="navbar-brand"><img src="~images/logo.svg" alt="logo" /></router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbar">
          <ul class="navbar-nav mr-auto">
            <navbar-link to="/" exact>{{$t('navbar.dashboard')}}</navbar-link>
            <navbar-link to="/browse">{{$t('navbar.browse')}}</navbar-link>
            <navbar-link to="/queue">{{$t('navbar.queue')}}</navbar-link>
            <navbar-link to="/history">{{$t('navbar.history')}}</navbar-link>
          </ul>

          <search />

          <locale-picker />

          <authentication />
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import NavbarLink from './NavbarLink'
import Authentication from './Authentication'
import Search from './Search'
import LocalePicker from './LocalePicker'

export default {
  name: 'navbar',
  components: {
    NavbarLink,
    Authentication,
    Search,
    LocalePicker
  }
}
</script>

<style lang="scss" scoped>
  @import 'scss/_variables';

  .navbar-container {
    border-bottom: 1px solid $primary;
    box-shadow: 0px 1px 2px black;
  }

  .navbar {
    padding: 0;
  }
</style>
