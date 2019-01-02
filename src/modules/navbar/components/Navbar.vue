<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav">
        <navbar-link to="/">Dashboard</navbar-link>
      </ul>
    </div>
  </nav>
</template>

<script>
  import NavbarLink from './NavbarLink';

  export default {
    name: 'navbar',
    components: {
      NavbarLink
    }
  }
</script>

<style lang="scss" module>
</style>
