<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse container" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <navbar-link to="/">Dashboard</navbar-link>
        <navbar-link to="/browse">Browse</navbar-link>
        <navbar-link to="/queue">Queue</navbar-link>
      </ul>

      <search />

      <authentication />
    </div>
  </nav>
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
