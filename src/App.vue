<template>
  <main>
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
