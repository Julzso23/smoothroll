<template>
  <footer id="footer">
    <div class="container">
      <div class="row">
        <footer-item><a class="text-white-50" href="https://julians.website" target="_blank">{{$t('footer.madeBy', {name: 'Julian Bath'})}}</a></footer-item>
        <footer-item><a class="text-white-50" href="https://github.com/Julzso23/smoothroll" target="_blank">{{$t('footer.contribute')}}</a></footer-item>
        <footer-item>{{$t('footer.endorsement')}}</footer-item>
        <footer-item>{{$t('footer.dataNotice')}}</footer-item>
      </div>
    </div>
  </footer>
</template>

<script>
import FooterItem from './FooterItem'

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
