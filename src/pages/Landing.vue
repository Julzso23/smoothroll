<template>
  <div class="text-light">
    <div class="row mb-4">
      <div class="col-md-6">
        <h1 class="display-5">{{$t('landing.welcome')}}</h1>
        <p>{{$t('landing.description')}}</p>
        <p>{{$t('landing.instructions')}}</p>
      </div>

      <div class="col-md-6">
        <monitor :image="require('images/screenshots/desktop/media.webp')" />
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-lg-3 col-md-5 offset-md-1 col-6">
        <phone :image="require('images/screenshots/mobile/series.webp')" />
      </div>

      <div class="col-6 pt-4">
        <p>{{$t('landing.mobile')}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Monitor from 'modules/screenshots/Monitor'
import Phone from 'modules/screenshots/Phone'

export default {
  name: 'landing',
  components: {
    Monitor,
    Phone
  }
}
</script>
