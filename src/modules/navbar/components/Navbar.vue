<template>
  <div class="bg-dark mb-4">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbar">
          <ul class="navbar-nav mr-auto">
            <navbar-link to="/">{{$t('navbar.dashboard')}}</navbar-link>
            <navbar-link to="/browse">{{$t('navbar.browse')}}</navbar-link>
            <navbar-link to="/queue">{{$t('navbar.queue')}}</navbar-link>
            <navbar-link to="/history">{{$t('navbar.history')}}</navbar-link>
          </ul>

          <search />

          <authentication />
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
  import NavbarLink from './NavbarLink';
  import Authentication from './Authentication';
  import Search from './Search';

  export default {
    name: 'navbar',
    components: {
      NavbarLink,
      Authentication,
      Search
    }
  }
</script>

<style lang="scss" scoped>
  .navbar {
    padding: 0;
  }
</style>
