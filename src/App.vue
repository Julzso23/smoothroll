<template>
  <main id="app">
    <navbar />

    <div class="container">
      <router-view />
    </div>

    <app-footer />
  </main>
</template>

<script>
  import Navbar from 'modules/navbar/components/Navbar';
  import AppFooter from 'modules/footer/components/Footer';

  export default {
    name: 'app',
    components: {
      Navbar,
      AppFooter
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
