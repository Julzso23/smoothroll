<template>
  <footer id="footer">
    <div class="container">
      <div class="row">
        <footer-item>Made by <a href="https://julians.website" target="_blank">Julian Bath</a>.</footer-item>
        <footer-item><a href="https://github.com/Julzso23/smoothroll" target="_blank">View the source and/or contribute to the project on GitHub.</a></footer-item>
        <footer-item>Smoothroll is not endorsed by or affiliated with Crunchyroll.</footer-item>
        <footer-item>Smoothroll does not store <b>any</b> of your data on its servers. It is simply an interface that sits on top of Crunchyroll.</footer-item>
      </div>
    </div>
  </footer>
</template>

<script>
  import FooterItem from './FooterItem';

  export default {
    name: 'app-footer',
    components: {
      FooterItem
    }
  }
</script>

<style lang="scss" scoped>
  @import 'scss/_variables';

  #footer {
    padding: 2em 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background: $dark;
    text-align: center;
    margin-top: auto;
  }
</style>
