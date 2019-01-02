<template>
  <main>
    <navbar />
    <div class="container">
      <router-view />
    </div>
  </main>
</template>

<script>
  import Navbar from 'modules/navbar/components/Navbar';

  export default {
    name: 'app',
    components: {
      Navbar
    }
  }
</script>

<style lang="scss" module>
</style>
